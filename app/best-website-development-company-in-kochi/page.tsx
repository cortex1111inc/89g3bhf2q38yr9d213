import type { Metadata } from 'next'
import LandingPage from '@/components/sections/LandingPage'
import { getLanding } from '@/lib/landing'

const data = getLanding('best-website-development-company-in-kochi')!

export const metadata: Metadata = {
  title: { absolute: data.metaTitle },
  description: data.metaDescription,
  alternates: { canonical: '/best-website-development-company-in-kochi' },
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: '/best-website-development-company-in-kochi',
    images: [{ url: '/ogimage.webp', width: 1200, height: 630, alt: data.h1 }],
  },
}

export default function Page() {
  return <LandingPage data={data} />
}
