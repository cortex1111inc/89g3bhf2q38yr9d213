import type { Metadata } from 'next'
import LandingPage from '@/components/sections/LandingPage'
import { getLanding } from '@/lib/landing'
import { buildMetadata } from '@/lib/seo'

const data = getLanding('iot-and-software-solutions')!

export const metadata: Metadata = buildMetadata({
  title: data.metaTitle,
  absoluteTitle: true,
  description: data.metaDescription,
  path: '/iot-and-software-solutions',
  keywords: [data.h1.toLowerCase(), 'Vanspire'],
})

export default function Page() {
  return <LandingPage data={data} />
}
