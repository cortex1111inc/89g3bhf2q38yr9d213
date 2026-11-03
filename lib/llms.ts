import { SERVICES, LIFECYCLE } from '@/lib/services'
import { WORK } from '@/lib/work'
import { TEAM, FOUNDERS_SENTENCE } from '@/lib/people'
import { GENERAL_FAQS, ENGAGEMENT_MODELS, INSIGHTS, INDUSTRIES } from '@/lib/content'
import { LANDING_PAGES } from '@/lib/landing'
import { LAST_UPDATED, SITE, absoluteUrl } from '@/lib/site'

const SUMMARY =
  'Vanspire Innovations (Vanspire) is a founder-led product and IT firm based in Kerala, India, founded in 2024. It builds custom software, AI and automation, mobile apps, web platforms and cloud systems, provides IT consulting, and runs digital marketing, taking clients from product idea to infrastructure to growth. Clients are in India and worldwide.'

/** /llms.txt: concise, link-oriented map of the site for AI assistants (llmstxt.org format). */
export function buildLlmsTxt(): string {
  const lines: string[] = [
    `# ${SITE.legalName}`,
    '',
    `> ${SUMMARY}`,
    '',
    `Leadership: ${FOUNDERS_SENTENCE}. Contact: ${SITE.email}. Last updated: ${LAST_UPDATED}.`,
    'Pricing is scoped individually after a discovery conversation; no standard price list is published.',
    '',
    '## Company',
    `- [About Vanspire and its founders](${absoluteUrl('/about')}): who we are, the four co-founders, values and story`,
    `- [Process](${absoluteUrl('/process')}): how projects run from discovery to growth`,
    `- [FAQ](${absoluteUrl('/faq')}): who we work with, pricing approach, support, locations`,
    `- [Contact](${absoluteUrl('/contact')}): start a project`,
    `- [Careers](${absoluteUrl('/careers')})`,
    '',
    '## Services',
    ...SERVICES.map((s) => `- [${s.name}](${absoluteUrl(`/services/${s.slug}`)}): ${s.summary}`),
    '',
    '## Work and products',
    ...WORK.map((w) => `- [${w.title}](${absoluteUrl(`/work/${w.slug}`)}): ${w.summary}`),
    '',
    '## Insights',
    ...INSIGHTS.map((p) => `- [${p.title}](${absoluteUrl(p.href)}): ${p.excerpt}`),
    '',
    '## Location and keyword pages',
    ...LANDING_PAGES.map((p) => `- [${p.h1}](${absoluteUrl(`/${p.slug}`)}): ${p.metaDescription}`),
    '',
    '## Optional',
    `- [Full site content in one file](${absoluteUrl('/llms-full.txt')})`,
    `- [Sitemap](${absoluteUrl('/sitemap.xml')})`,
    `- [RSS feed](${absoluteUrl('/feed.xml')})`,
    '',
  ]
  return lines.join('\n')
}

/** /llms-full.txt: the substantive site content as markdown, so assistants can answer without crawling. */
export function buildLlmsFull(): string {
  const out: string[] = []
  const push = (...l: string[]) => out.push(...l)

  push(`# ${SITE.legalName} (Vanspire): full site content`, '', `> ${SUMMARY}`, '', `Last updated: ${LAST_UPDATED}. Canonical site: ${absoluteUrl('/')}`, '')

  push('## Company facts', '')
  push(
    `- Name: ${SITE.legalName}, trading as ${SITE.name}`,
    `- Founded: ${SITE.founded}`,
    `- Based in: ${SITE.location}; serves clients in India and worldwide`,
    `- Languages: ${SITE.languages.join(', ')}`,
    `- Email: ${SITE.email}`,
    `- Website: ${absoluteUrl('/')}`,
    `- Social: ${Object.values(SITE.social).join(', ')}`,
    '- Pricing: scoped individually after discovery; no standard price list',
    '',
  )

  push('## Founders and leadership', '', `Vanspire was founded in ${SITE.founded} by four co-founders.`, '')
  for (const p of TEAM) push(`### ${p.name}: ${p.title}`, '', p.bio, '', `LinkedIn: ${p.linkedin}`, `Profile: ${absoluteUrl(`/about#${p.id}`)}`, '')

  push('## Services', '')
  for (const s of SERVICES) {
    push(`### ${s.name}`, `URL: ${absoluteUrl(`/services/${s.slug}`)}`, '', s.definition, '', `Who it is for: ${s.whoFor}`, '', ...s.intro, '')
    push('What is included:', ...s.includes.map((i) => `- ${i}`), '')
    push('Approach:', ...s.features.map((f) => `- ${f.title}: ${f.description}`), '')
    push(`Typical tools: ${s.stack.join(', ')}`, '')
    push('Questions:', ...s.faqs.flatMap((f) => [`- Q: ${f.question}`, `  A: ${f.answer}`]), '')
  }

  push('## Process', '', ...LIFECYCLE.map((l) => `${l.step}. ${l.title}: ${l.description}`), '')
  push('## Engagement models', '', ...ENGAGEMENT_MODELS.map((m) => `- ${m.name} (${m.best}): ${m.description}`), '')
  push(`## Industries\n\n${INDUSTRIES.join(', ')}`, '')

  push('## Work and products', '')
  for (const w of WORK) {
    push(`### ${w.title} (${w.kind}, ${w.category})`, `URL: ${absoluteUrl(`/work/${w.slug}`)}`, '', w.summary, '', `Problem: ${w.challenge}`, '')
    push('Approach:', ...w.approach.map((a) => `- ${a.title}: ${a.description}`), '')
    push('Capabilities:', ...w.capabilities.map((c) => `- ${c}`), '')
    if (w.modules) push('Modules:', ...w.modules.map((m) => `- ${m.title}: ${m.description}`), '')
    push('Note: ' + (w.kind === 'Product' ? 'This is a Vanspire product.' : 'This is a solution playbook describing how Vanspire typically delivers this kind of engagement, not a named client case study.'), '')
  }

  push('## Insights', '')
  for (const p of INSIGHTS) push(`### ${p.title}`, `URL: ${absoluteUrl(p.href)} (${p.date}, ${p.category})`, '', p.summary, '', ...p.takeaways.map((t) => `- ${t}`), '')

  push('## Frequently asked questions', '')
  for (const f of GENERAL_FAQS) push(`### ${f.question}`, f.answer, '')

  return out.join('\n')
}
