export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vanspire.in'

export const SITE = {
  name: 'Vanspire',
  legalName: 'Vanspire Innovations',
  tagline: 'Product to IT. One firm.',
  description:
    'Vanspire is a product and IT firm building custom software, AI and automation, mobile apps, web platforms, cloud systems and digital marketing for ambitious businesses.',
  email: 'vanspire.innovations@gmail.com',
  location: 'Kerala, India',
  founded: 2024,
  social: {
    linkedin: 'https://www.linkedin.com/company/vanspire-innovations/',
    instagram: 'https://www.instagram.com/vanspire.innovations/',
    twitter: 'https://twitter.com/vanspirein',
    youtube: 'https://www.youtube.com/@vanspire',
    facebook: 'https://www.facebook.com/vanspire',
  },
} as const

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services', mega: true },
  { name: 'Work', href: '/work' },
  { name: 'Process', href: '/process' },
  { name: 'Insights', href: '/insights' },
  { name: 'Contact', href: '/contact' },
] as const
