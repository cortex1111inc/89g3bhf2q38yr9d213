import { type MetadataRoute } from 'next'
import { SERVICES } from '@/lib/services'
import { WORK } from '@/lib/work'
import { LANDING_PAGES } from '@/lib/landing'
import { INSIGHTS } from '@/lib/content'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const entry = (
    path: string,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
    priority: number,
  ) => ({ url: `${SITE_URL}${path}`, lastModified, changeFrequency, priority })

  return [
    // Core pages
    entry('/', 'weekly', 1.0),
    entry('/about', 'monthly', 0.9),
    entry('/services', 'monthly', 0.95),
    entry('/work', 'monthly', 0.85),
    entry('/process', 'monthly', 0.8),
    entry('/insights', 'weekly', 0.8),
    entry('/contact', 'yearly', 0.85),
    entry('/careers', 'monthly', 0.5),
    entry('/faq', 'monthly', 0.6),

    // Services
    ...SERVICES.map((s) => entry(`/services/${s.slug}`, 'monthly', 0.9)),

    // Work
    ...WORK.map((w) => entry(`/work/${w.slug}`, 'monthly', 0.75)),

    // Insights
    ...INSIGHTS.map((post) => entry(post.href, 'monthly', 0.75)),

    // SEO landing pages
    ...LANDING_PAGES.map((p) => entry(`/${p.slug}`, 'monthly', 0.85)),

    // Legal
    entry('/terms', 'yearly', 0.3),
    entry('/privacy', 'yearly', 0.3),
  ]
}
