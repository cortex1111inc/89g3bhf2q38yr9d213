#!/usr/bin/env node
/**
 * Pushes every sitemap URL to IndexNow (Bing, Copilot, ChatGPT search, Yandex...)
 * so new and changed pages are discovered in minutes instead of days.
 *
 * One-time setup:
 *   1. Generate a key (8-128 chars, letters/digits/dashes), e.g.  openssl rand -hex 16
 *   2. Create public/<key>.txt containing exactly the key, deploy it.
 *   3. Run:  INDEXNOW_KEY=<key> node scripts/indexnow.mjs https://vanspire.in
 */
const site = (process.argv[2] || 'https://vanspire.in').replace(/\/$/, '')
const key = process.env.INDEXNOW_KEY
if (!key) {
  console.error('Set INDEXNOW_KEY (see the header of this file).')
  process.exit(1)
}

const xml = await (await fetch(`${site}/sitemap.xml`)).text()
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (!urlList.length) {
  console.error('No URLs found in sitemap.')
  process.exit(1)
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${key}.txt`, urlList }),
})
console.log(`IndexNow: submitted ${urlList.length} URLs, HTTP ${res.status} ${res.statusText}`)
if (res.status >= 400) process.exit(1)
