import type { Metadata } from 'next'
import LandingPage from '@/components/sections/LandingPage'
import { getLanding } from '@/lib/landing'
import { buildMetadata } from '@/lib/seo'

const data = getLanding('best-website-development-company-in-kochi')!

export const metadata: Metadata = buildMetadata({
  title: data.metaTitle,
  absoluteTitle: true,
  description: data.metaDescription,
  path: '/best-website-development-company-in-kochi',
  keywords: [data.h1.toLowerCase(), 'Vanspire'],
})

export default function Page() {
  return <LandingPage data={data} />
}
