import type { Metadata } from 'next'
import LandingPage from '@/components/sections/LandingPage'
import { getLanding } from '@/lib/landing'

const data = getLanding('iot-and-software-solutions')!

export const metadata: Metadata = {
  title: { absolute: data.metaTitle },
  description: data.metaDescription,
  alternates: { canonical: '/iot-and-software-solutions' },
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: '/iot-and-software-solutions',
    images: [{ url: '/ogimage.webp', width: 1200, height: 630, alt: data.h1 }],
  },
}

export default function Page() {
  return <LandingPage data={data} />
}
