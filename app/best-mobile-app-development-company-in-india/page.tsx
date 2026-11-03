import type { Metadata } from 'next'
import LandingPage from '@/components/sections/LandingPage'
import { getLanding } from '@/lib/landing'

const data = getLanding('best-mobile-app-development-company-in-india')!

export const metadata: Metadata = {
  title: { absolute: data.metaTitle },
  description: data.metaDescription,
  alternates: { canonical: '/best-mobile-app-development-company-in-india' },
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: '/best-mobile-app-development-company-in-india',
    images: [{ url: '/ogimage.webp', width: 1200, height: 630, alt: data.h1 }],
  },
}

export default function Page() {
  return <LandingPage data={data} />
}
