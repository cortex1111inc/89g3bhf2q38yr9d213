export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://vanspire.in').replace(/\/$/, '')

export const absoluteUrl = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

/**
 * Bump when site content meaningfully changes. Drives sitemap <lastmod>,
 * schema dateModified and the visible "Last updated" stamps (freshness signal
 * for search and AI answer engines).
 */
export const LAST_UPDATED = '2026-11-03'
export const LAST_UPDATED_LABEL = 'November 2026'

export const SITE = {
  name: 'Vanspire',
  legalName: 'Vanspire Innovations',
  tagline: 'Product to IT. One firm.',
  description:
    'Vanspire is a product and IT firm building custom software, AI and automation, mobile apps, web platforms, cloud systems and digital marketing for ambitious businesses.',
  email: 'vanspire.innovations@gmail.com',
  location: 'Kerala, India',
  region: 'Kerala',
  regionCode: 'IN-KL',
  country: 'IN',
  founded: 2024,
  locale: 'en-IN',
  languages: ['English', 'Malayalam', 'Hindi'],
  twitterHandle: '@vanspirein',
  social: {
    linkedin: 'https://www.linkedin.com/company/vanspire-innovations/',
    instagram: 'https://www.instagram.com/vanspire.innovations/',
    twitter: 'https://twitter.com/vanspirein',
    youtube: 'https://www.youtube.com/@vanspire',
    facebook: 'https://www.facebook.com/vanspire',
  },
} as const

export const SAME_AS = Object.values(SITE.social)

/** Stable JSON-LD @id values shared by every page so entities connect into one graph. */
export const IDS = {
  organization: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
  logo: `${SITE_URL}/#logo`,
  person: (id: string) => `${SITE_URL}/about#${id}`,
  service: (slug: string) => `${SITE_URL}/services/${slug}#service`,
  page: (path: string) => `${SITE_URL}${path}#webpage`,
}

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services', mega: true },
  { name: 'Work', href: '/work' },
  { name: 'Process', href: '/process' },
  { name: 'Insights', href: '/insights' },
  { name: 'Contact', href: '/contact' },
] as const
