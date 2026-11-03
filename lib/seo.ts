import type { Metadata } from 'next'
import { SITE, absoluteUrl } from '@/lib/site'

interface BuildMetadataInput {
  /** Page title WITHOUT the brand suffix (the layout template appends " | Vanspire"). */
  title: string
  description: string
  /** Path starting with "/", used for canonical, hreflang and og:url. */
  path: string
  keywords?: string[]
  /** Use the title exactly as given (no " | Vanspire" suffix). */
  absoluteTitle?: boolean
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  noindex?: boolean
  /**
   * Social image. Omit for the site-wide branded card. Pass "file" when the
   * route segment has its own opengraph-image file (services/[slug], work/[slug]),
   * because Next.js only inherits a parent's file image when a page does NOT
   * define its own openGraph block.
   */
  image?: { url: string; width?: number; height?: number; alt: string } | 'file'
}

const DEFAULT_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'Vanspire: software, AI, mobile and digital product firm',
}

/**
 * One place that produces every page's canonical, hreflang, Open Graph and
 * Twitter metadata so nothing is left half-configured.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  absoluteTitle = false,
  type = 'website',
  publishedTime,
  modifiedTime,
  noindex = false,
  image,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path)
  const resolvedImage = image === 'file' ? undefined : (image ?? DEFAULT_IMAGE)
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE.name}`

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: { [SITE.locale]: url, 'x-default': url },
    },
    openGraph: {
      type,
      url,
      title: socialTitle,
      description,
      siteName: SITE.name,
      locale: 'en_IN',
      ...(type === 'article' && { publishedTime, modifiedTime, authors: [SITE.legalName] }),
      ...(resolvedImage && { images: [resolvedImage] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      site: SITE.twitterHandle,
      creator: SITE.twitterHandle,
      ...(resolvedImage && { images: [resolvedImage.url] }),
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  }
}
