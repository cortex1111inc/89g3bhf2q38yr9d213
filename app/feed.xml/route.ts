import { INSIGHTS } from '@/lib/content'
import { SITE, absoluteUrl } from '@/lib/site'

export const dynamic = 'force-static'

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

export function GET() {
  const items = INSIGHTS.map(
    (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${absoluteUrl(p.href)}</link>
      <guid isPermaLink="true">${absoluteUrl(p.href)}</guid>
      <pubDate>${new Date(p.datePublished).toUTCString()}</pubDate>
      <category>${esc(p.category)}</category>
      <description>${esc(p.summary)}</description>
    </item>`,
  ).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE.name)} Insights</title>
    <link>${absoluteUrl('/insights')}</link>
    <atom:link href="${absoluteUrl('/feed.xml')}" rel="self" type="application/rss+xml" />
    <description>Practical perspectives on software, systems and digital strategy from the Vanspire team.</description>
    <language>en-in</language>
${items}
  </channel>
</rss>
`
  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600, s-maxage=86400' },
  })
}
