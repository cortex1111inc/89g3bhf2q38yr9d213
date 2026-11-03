import { IDS, LAST_UPDATED, SAME_AS, SITE, SITE_URL, absoluteUrl } from '@/lib/site'
import { TEAM } from '@/lib/people'
import { SERVICES, LIFECYCLE, type Service } from '@/lib/services'
import type { WorkItem } from '@/lib/work'

type Json = Record<string, unknown>

const LOGO_URL = absoluteUrl('/blacklogo.svg')
const DEFAULT_IMAGE = absoluteUrl('/opengraph-image')

export const SPEAKABLE = {
  '@type': 'SpeakableSpecification',
  cssSelector: ['h1', '[data-speakable]'],
}

/* ---------------------------------------------------------------- entities */

export function personNodes(): Json[] {
  return TEAM.map((person) => ({
    '@type': 'Person',
    '@id': IDS.person(person.id),
    name: person.name,
    jobTitle: person.title,
    description: person.bio,
    url: absoluteUrl(`/about#${person.id}`),
    image: absoluteUrl(person.image),
    sameAs: [person.linkedin],
    worksFor: { '@id': IDS.organization },
    knowsAbout: ['Software development', 'Digital products', 'IT consulting'],
  }))
}

export function organizationNode(): Json {
  return {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': IDS.organization,
    name: SITE.legalName,
    legalName: SITE.legalName,
    alternateName: [SITE.name, 'Vanspire Innovations'],
    url: SITE_URL,
    logo: { '@type': 'ImageObject', '@id': IDS.logo, url: LOGO_URL, contentUrl: LOGO_URL, caption: SITE.name },
    image: DEFAULT_IMAGE,
    description:
      'Vanspire Innovations is a founder-led product and IT firm in Kerala, India. It builds custom software, AI and automation, mobile apps, web platforms, cloud and DevOps systems, provides IT consulting and runs digital marketing for clients in India and worldwide.',
    slogan: SITE.tagline,
    foundingDate: String(SITE.founded),
    founder: TEAM.map((p) => ({ '@id': IDS.person(p.id) })),
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'AdministrativeArea', name: 'Kerala' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: SITE.email,
        url: absoluteUrl('/contact'),
        availableLanguage: [...SITE.languages],
        areaServed: ['IN', 'Worldwide'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: SITE.email,
        availableLanguage: [...SITE.languages],
      },
    ],
    sameAs: SAME_AS,
    knowsAbout: [
      'Custom software development',
      'AI and business automation',
      'Mobile app development',
      'Web development',
      'Product design and UX',
      'Cloud and DevOps',
      'IT consulting',
      'ERP implementation',
      'Enterprise system integration',
      'Digital marketing and SEO',
      'Hospital management systems',
    ],
    knowsLanguage: ['en', 'ml', 'hi'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Vanspire services',
      itemListElement: SERVICES.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', '@id': IDS.service(service.slug), name: service.name, url: absoluteUrl(`/services/${service.slug}`) },
      })),
    },
  }
}

export function websiteNode(): Json {
  return {
    '@type': 'WebSite',
    '@id': IDS.website,
    url: SITE_URL,
    name: SITE.name,
    alternateName: SITE.legalName,
    description: SITE.description,
    inLanguage: SITE.locale,
    publisher: { '@id': IDS.organization },
  }
}

/** Site-wide graph rendered once in the root layout. */
export function rootGraph(): Json {
  return { '@context': 'https://schema.org', '@graph': [organizationNode(), websiteNode(), ...personNodes()] }
}

/* ------------------------------------------------------------------- pages */

export interface Crumb {
  name: string
  path?: string
}

export function breadcrumbList(crumbs: Crumb[]): Json {
  const all: Crumb[] = [{ name: 'Home', path: '/' }, ...crumbs]
  return {
    '@type': 'BreadcrumbList',
    itemListElement: all.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      ...(crumb.path && i < all.length - 1 ? { item: absoluteUrl(crumb.path) } : {}),
    })),
  }
}

interface WebPageInput {
  path: string
  name: string
  description: string
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'FAQPage' | 'ProfilePage'
  datePublished?: string
  dateModified?: string
  extra?: Json
}

export function webPageNode({ path, name, description, type = 'WebPage', datePublished, dateModified = LAST_UPDATED, extra }: WebPageInput): Json {
  return {
    '@type': type,
    '@id': IDS.page(path),
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: SITE.locale,
    isPartOf: { '@id': IDS.website },
    about: { '@id': IDS.organization },
    publisher: { '@id': IDS.organization },
    primaryImageOfPage: { '@type': 'ImageObject', url: DEFAULT_IMAGE },
    ...(datePublished ? { datePublished } : {}),
    dateModified,
    speakable: SPEAKABLE,
    ...extra,
  }
}

export function faqPageNode(items: { question: string; answer: string }[]): Json {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function itemListNode(name: string, items: { name: string; path: string }[]): Json {
  return {
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  }
}

export function serviceNode(service: Service): Json {
  return {
    '@type': 'Service',
    '@id': IDS.service(service.slug),
    name: service.name,
    serviceType: service.name,
    description: service.definition,
    url: absoluteUrl(`/services/${service.slug}`),
    image: absoluteUrl(`/img/${service.image}.webp`),
    provider: { '@id': IDS.organization },
    areaServed: [{ '@type': 'Country', name: 'India' }, { '@type': 'Place', name: 'Worldwide' }],
    audience: { '@type': 'BusinessAudience', audienceType: 'Startups, growing businesses and enterprises' },
    termsOfService: absoluteUrl('/terms'),
    keywords: service.tags.join(', '),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.name}: what's included`,
      itemListElement: service.includes.map((item) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: item } })),
    },
  }
}

export function workNode(item: WorkItem): Json {
  const base = {
    name: item.title,
    description: item.summary,
    url: absoluteUrl(`/work/${item.slug}`),
    image: absoluteUrl(`/img/${item.image}.webp`),
    inLanguage: SITE.locale,
    keywords: [item.category, ...item.stack].join(', '),
  }

  if (item.kind === 'Product') {
    return {
      '@type': 'SoftwareApplication',
      '@id': `${absoluteUrl(`/work/${item.slug}`)}#product`,
      ...base,
      applicationCategory: 'HealthApplication',
      applicationSubCategory: 'Hospital management system',
      operatingSystem: 'Web (cloud SaaS) and on-premise',
      author: { '@id': IDS.organization },
      publisher: { '@id': IDS.organization },
      featureList: item.capabilities,
    }
  }

  return {
    '@type': 'CreativeWork',
    ...base,
    about: item.category,
    creator: { '@id': IDS.organization },
    publisher: { '@id': IDS.organization },
  }
}

export function howToNode(): Json {
  return {
    '@type': 'HowTo',
    name: 'How Vanspire takes a project from idea to growth',
    description:
      'Vanspire runs every software, AI, mobile, web, IT and marketing project through five stages: discover, design, build, launch and grow.',
    step: LIFECYCLE.map((stage, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: stage.title,
      text: stage.description,
      url: absoluteUrl(`/process#${stage.title.toLowerCase()}`),
    })),
  }
}

interface ArticleInput {
  path: string
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  section: string
  keywords?: string[]
}

export function articleNode({ path, headline, description, image, datePublished, dateModified = LAST_UPDATED, section, keywords }: ArticleInput): Json {
  return {
    '@type': 'BlogPosting',
    '@id': `${absoluteUrl(path)}#article`,
    headline,
    description,
    image,
    datePublished,
    dateModified,
    articleSection: section,
    inLanguage: SITE.locale,
    ...(keywords ? { keywords: keywords.join(', ') } : {}),
    mainEntityOfPage: { '@id': IDS.page(path) },
    author: { '@id': IDS.organization },
    publisher: { '@id': IDS.organization },
    speakable: SPEAKABLE,
  }
}

/** Wrap one or more nodes into a single @graph document. */
export function graph(...nodes: (Json | undefined | false)[]): Json {
  return { '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) }
}
