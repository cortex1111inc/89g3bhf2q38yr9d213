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
import AnswerBox from '@/components/seo/AnswerBox'
import FactSheet from '@/components/seo/FactSheet'
import JsonLd from '@/components/seo/JsonLd'
import MotionWrapper from '@/components/ui/MotionWrapper'
import SectionLabel from '@/components/ui/SectionLabel'
import { buildMetadata } from '@/lib/seo'
import { graph, itemListNode, webPageNode } from '@/lib/schema'
import { SERVICES } from '@/lib/services'
import { FOUNDERS_SENTENCE } from '@/lib/people'

const TITLE = 'Vanspire | Software, AI & Digital Product Firm in India'
const DESCRIPTION =
  'Founder-led product and IT firm in Kerala, India. Custom software, AI and automation, mobile apps, web, cloud, IT consulting and digital marketing.'

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  absoluteTitle: true,
  description: DESCRIPTION,
  path: '/',
})

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageNode({ path: '/', name: TITLE, description: DESCRIPTION }),
          itemListNode('Vanspire services', SERVICES.map((s) => ({ name: s.name, path: `/services/${s.slug}` }))),
        )}
      />
      <HomeHero />
      <MarqueeBand />

      <section className="pb-4 pt-2 md:pb-10">
        <div className="container-site grid gap-4 lg:grid-cols-12 lg:items-start">
          <MotionWrapper className="lg:col-span-5">
            <SectionLabel>At a glance</SectionLabel>
            <AnswerBox
              question="What is Vanspire?"
              answer={`Vanspire (Vanspire Innovations) is a founder-led product and IT firm based in Kerala, India, founded in 2024 by ${FOUNDERS_SENTENCE}. It builds custom software, AI and automation, mobile apps, web platforms and cloud systems, provides IT consulting and runs digital marketing for clients in India and worldwide.`}
              extraLabel="Pricing:"
              extra="Every engagement is scoped individually after a short discovery conversation."
            />
          </MotionWrapper>
          <MotionWrapper delay={0.1} className="lg:col-span-7">
            <FactSheet compact />
          </MotionWrapper>
        </div>
      </section>

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
