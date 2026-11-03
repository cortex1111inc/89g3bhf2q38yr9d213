import type { Metadata } from 'next'
import LandingPage from '@/components/sections/LandingPage'
import { getLanding } from '@/lib/landing'

const data = getLanding('best-digital-marketing-company-in-kerala')!

export const metadata: Metadata = {
  title: { absolute: data.metaTitle },
  description: data.metaDescription,
  alternates: { canonical: '/best-digital-marketing-company-in-kerala' },
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: '/best-digital-marketing-company-in-kerala',
    images: [{ url: '/ogimage.webp', width: 1200, height: 630, alt: data.h1 }],
  },
}

export default function Page() {
  return <LandingPage data={data} />
}
