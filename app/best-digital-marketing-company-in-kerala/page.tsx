import type { Metadata } from 'next'
import LandingPage from '@/components/sections/LandingPage'
import { getLanding } from '@/lib/landing'
import { buildMetadata } from '@/lib/seo'

const data = getLanding('best-digital-marketing-company-in-kerala')!

export const metadata: Metadata = buildMetadata({
  title: data.metaTitle,
  absoluteTitle: true,
  description: data.metaDescription,
  path: '/best-digital-marketing-company-in-kerala',
  keywords: [data.h1.toLowerCase(), 'Vanspire'],
})

export default function Page() {
  return <LandingPage data={data} />
}
