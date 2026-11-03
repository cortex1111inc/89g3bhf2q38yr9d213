import type { Metadata } from 'next'
import HomeHero from '@/components/sections/HomeHero'
import MarqueeBand from '@/components/sections/MarqueeBand'
import HomeIntro from '@/components/sections/HomeIntro'
import ServicesGrid from '@/components/sections/ServicesGrid'
import Lifecycle from '@/components/sections/Lifecycle'
import FeaturedWork from '@/components/sections/FeaturedWork'
import WhyUs from '@/components/sections/WhyUs'
import EngagementModels from '@/components/sections/EngagementModels'
import Industries from '@/components/sections/Industries'
import InsightsPreview from '@/components/sections/InsightsPreview'
import FAQSection from '@/components/sections/FAQSection'
import CTASection from '@/components/sections/CTASection'
import { SITE_URL } from '@/lib/site'

const TITLE = 'Software, AI, Mobile & Digital Product Firm in India | Vanspire'
const DESCRIPTION =
  'Vanspire is a product and IT firm in Kerala, India. We build custom software, AI and automation, mobile apps, web platforms, cloud systems and digital marketing, from first idea to long-term growth.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeHero />
      <MarqueeBand />
      <HomeIntro />
      <ServicesGrid />
      <Lifecycle />
      <FeaturedWork />
      <WhyUs />
      <EngagementModels />
      <Industries />
      <InsightsPreview />
      <FAQSection />
      <CTASection />
    </>
  )
}
