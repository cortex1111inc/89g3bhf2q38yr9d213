import { type MetadataRoute } from 'next'
import { SERVICES } from '@/lib/services'
import { WORK } from '@/lib/work'
import { LANDING_PAGES } from '@/lib/landing'
import { INSIGHTS } from '@/lib/content'
import { LAST_UPDATED, absoluteUrl } from '@/lib/site'

type Entry = MetadataRoute.Sitemap[number]

// lastModified is a stable content date (not "now"), so crawlers aren't told
// every URL changed on every build. Bump LAST_UPDATED in lib/site.ts on real edits.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(LAST_UPDATED)
  const entry = (path: string, changeFrequency: Entry['changeFrequency'], priority: number, date: Date = lastModified): Entry => ({
    url: absoluteUrl(path),
    lastModified: date,
    changeFrequency,
    priority,
  })

  return [
    entry('/', 'weekly', 1.0),
    entry('/about', 'monthly', 0.9),
    entry('/services', 'monthly', 0.95),
    ...SERVICES.map((s) => entry(`/services/${s.slug}`, 'monthly', 0.9)),
    entry('/work', 'monthly', 0.85),
    ...WORK.map((w) => entry(`/work/${w.slug}`, 'monthly', 0.75)),
    entry('/process', 'monthly', 0.8),
    entry('/insights', 'weekly', 0.8),
    ...INSIGHTS.map((post) => entry(post.href, 'monthly', 0.75, new Date(post.datePublished))),
    ...LANDING_PAGES.map((p) => entry(`/${p.slug}`, 'monthly', 0.85)),
    entry('/contact', 'yearly', 0.85),
    entry('/faq', 'monthly', 0.6),
    entry('/careers', 'monthly', 0.5),
    entry('/terms', 'yearly', 0.3),
    entry('/privacy', 'yearly', 0.3),
  ]
}
