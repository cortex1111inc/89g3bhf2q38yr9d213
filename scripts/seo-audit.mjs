#!/usr/bin/env node
/**
 * SEO / AEO / GEO audit. Crawls every URL in the sitemap of a running server
 * and checks the things search engines and AI answer engines depend on.
 *
 *   npm run build && npm start        # in one terminal
 *   node scripts/seo-audit.mjs http://localhost:3000
 *
 * Exits non-zero if any error is found (warnings do not fail the run).
 */

const BASE = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '')
// Comma-separated terms that must never appear in any page or machine-readable file,
// e.g.  SEO_AUDIT_FORBIDDEN="term one,term two" node scripts/seo-audit.mjs ...
const FORBIDDEN = (process.env.SEO_AUDIT_FORBIDDEN || '').split(',').map((t) => t.trim().toLowerCase()).filter(Boolean)
const errors = []
const warnings = []
const err = (url, msg) => errors.push(`${url}  ${msg}`)
const warn = (url, msg) => warnings.push(`${url}  ${msg}`)

const get = async (path, init) => {
  const res = await fetch(path.startsWith('http') ? path : BASE + path, { redirect: 'manual', ...init })
  return { res, text: res.status < 300 || res.status >= 400 ? await res.text().catch(() => '') : '' }
}

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
const meta = (html, attr, name) => {
  const m = html.match(new RegExp(`<meta[^>]+${attr}="${name}"[^>]*>`, 'i'))
  const c = m && m[0].match(/content="([^"]*)"/i)
  return c ? decode(c[1]) : null
}

// ---- 1. Discover pages from the sitemap
const sitemap = await get('/sitemap.xml')
if (sitemap.res.status !== 200) {
  console.error('sitemap.xml not reachable')
  process.exit(1)
}
const pagePaths = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname)
console.log(`Auditing ${pagePaths.length} pages from sitemap at ${BASE}\n`)

const allLinks = new Set()
const seenTitles = new Map()
const seenDescriptions = new Map()
let jsonLdTypes = new Set()

for (const path of pagePaths) {
  const { res, text: html } = await get(path)
  const u = path
  if (res.status !== 200) {
    err(u, `HTTP ${res.status}`)
    continue
  }

  // lang
  if (!/<html[^>]+lang="en-IN"/i.test(html)) err(u, 'missing <html lang="en-IN">')

  // title
  const title = decode((html.match(/<title>([^<]*)<\/title>/i) || [])[1] || '')
  if (!title) err(u, 'missing <title>')
  else {
    if (title.length > 65) warn(u, `title ${title.length} chars (>65): "${title}"`)
    if (title.length < 20) warn(u, `title short (${title.length}): "${title}"`)
    seenTitles.set(title, [...(seenTitles.get(title) || []), u])
  }

  // description
  const desc = meta(html, 'name', 'description')
  if (!desc) err(u, 'missing meta description')
  else {
    if (desc.length > 165) warn(u, `description ${desc.length} chars (>165)`)
    if (desc.length < 70) warn(u, `description short (${desc.length})`)
    seenDescriptions.set(desc, [...(seenDescriptions.get(desc) || []), u])
  }

  // robots
  const robots = meta(html, 'name', 'robots') || ''
  if (/noindex/i.test(robots)) err(u, `page is noindex but is in the sitemap (${robots})`)

  // canonical must point to itself
  const canon = (html.match(/<link[^>]+rel="canonical"[^>]*href="([^"]+)"/i) || [])[1]
  if (!canon) err(u, 'missing canonical')
  else if (new URL(canon).pathname.replace(/\/$/, '') !== u.replace(/\/$/, '')) err(u, `canonical points elsewhere: ${canon}`)

  // hreflang
  if (!/hrefLang="en-IN"|hreflang="en-IN"/i.test(html)) warn(u, 'no hreflang en-IN alternate')

  // open graph / twitter
  for (const p of ['og:title', 'og:description', 'og:image', 'og:url', 'og:type', 'og:site_name']) {
    if (!meta(html, 'property', p)) err(u, `missing ${p}`)
  }
  for (const n of ['twitter:card', 'twitter:title', 'twitter:image']) {
    if (!meta(html, 'name', n)) err(u, `missing ${n}`)
  }

  // headings
  const h1s = (html.match(/<h1[\s>]/gi) || []).length
  if (h1s !== 1) err(u, `${h1s} <h1> elements (expected 1)`)

  // images without alt
  const imgs = html.match(/<img\b[^>]*>/gi) || []
  const noAlt = imgs.filter((i) => !/\balt=/i.test(i)).length
  if (noAlt) err(u, `${noAlt} <img> without alt attribute`)

  // JSON-LD
  const blocks = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1])
  if (!blocks.length) err(u, 'no JSON-LD')
  let faqCount = 0
  let hasBreadcrumb = false
  for (const raw of blocks) {
    let data
    try {
      data = JSON.parse(raw.replace(/\\u003c/g, '<'))
    } catch (e) {
      err(u, `invalid JSON-LD: ${e.message}`)
      continue
    }
    const nodes = data['@graph'] || [data]
    for (const n of nodes) {
      const types = [].concat(n['@type'] || [])
      types.forEach((t) => jsonLdTypes.add(t))
      if (types.includes('FAQPage')) faqCount++
      if (types.includes('BreadcrumbList')) hasBreadcrumb = true
    }
  }
  if (faqCount > 1) err(u, `${faqCount} FAQPage objects (expected at most 1)`)
  if (u !== '/' && !hasBreadcrumb) warn(u, 'no BreadcrumbList')

  // content hygiene
  for (const term of FORBIDDEN) if (html.toLowerCase().includes(term)) err(u, `contains forbidden text "${term}"`)
  if (/lorem ipsum/i.test(html)) err(u, 'contains lorem ipsum')

  // internal links
  for (const m of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)) {
    const h = decode(m[1])
    if (h.startsWith('/') && !h.startsWith('//')) allLinks.add(h.split('#')[0].split('?')[0] || '/')
  }
}

// ---- 2. duplicate titles / descriptions
for (const [t, urls] of seenTitles) if (urls.length > 1) warn(urls.join(', '), `duplicate title "${t}"`)
for (const [d, urls] of seenDescriptions) if (urls.length > 1) warn(urls.join(', '), 'duplicate meta description')

// ---- 3. broken internal links (follow redirects one hop)
for (const link of allLinks) {
  if (pagePaths.includes(link)) continue
  const { res } = await get(link)
  if (res.status >= 400) err(link, `broken internal link (HTTP ${res.status})`)
}

// ---- 4. machine-readable endpoints
const endpoints = [
  ['/robots.txt', 'text/plain', (t) => /User-Agent:\s*GPTBot/i.test(t) && /Sitemap:/i.test(t) && !/Disallow:\s*\/_next/i.test(t)],
  ['/llms.txt', 'text/plain', (t) => t.startsWith('# Vanspire') && t.includes('Adithyan Dileep') && t.includes('## Services')],
  ['/llms-full.txt', 'text/plain', (t) => t.length > 8000 && t.includes('Founding Director') && !FORBIDDEN.some((f) => t.toLowerCase().includes(f))],
  ['/feed.xml', 'application/rss+xml', (t) => t.includes('<rss') && t.includes('<item>')],
  ['/manifest.webmanifest', 'application/manifest+json', (t) => t.includes('"name"')],
  ['/opengraph-image', 'image/png', () => true],
  ['/twitter-image', 'image/png', () => true],
]
for (const [path, ct, check] of endpoints) {
  const { res, text } = await get(path)
  if (res.status !== 200) err(path, `HTTP ${res.status}`)
  else {
    if (!(res.headers.get('content-type') || '').includes(ct)) err(path, `content-type ${res.headers.get('content-type')} (expected ${ct})`)
    else if (ct.startsWith('text') || ct.includes('xml') || ct.includes('json')) if (!check(text)) err(path, 'content check failed')
  }
}

// 404 handling
const nf = await get('/this-page-does-not-exist')
if (nf.res.status !== 404) err('/this-page-does-not-exist', `expected 404, got ${nf.res.status}`)

// ---- report
console.log(`Schema.org types found: ${[...jsonLdTypes].sort().join(', ')}\n`)
if (warnings.length) {
  console.log(`WARNINGS (${warnings.length})`)
  warnings.forEach((w) => console.log('  - ' + w))
  console.log()
}
if (errors.length) {
  console.log(`ERRORS (${errors.length})`)
  errors.forEach((e) => console.log('  x ' + e))
  process.exit(1)
}
console.log(`PASS: ${pagePaths.length} pages, ${allLinks.size} internal links checked, no errors.`)
