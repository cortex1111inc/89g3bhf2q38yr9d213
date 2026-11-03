import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import FAQSection from '@/components/sections/FAQSection'
import CTASection from '@/components/sections/CTASection'
import { GENERAL_FAQS } from '@/lib/content'
import { SERVICES } from '@/lib/services'
import JsonLd from '@/components/seo/JsonLd'
import LastUpdated from '@/components/seo/LastUpdated'
import { buildMetadata } from '@/lib/seo'
import { graph, webPageNode } from '@/lib/schema'

const TITLE = 'FAQ: Working with Vanspire'
const DESCRIPTION =
  'Answers about Vanspire: who founded it, where it is based, who we work with, how projects run, pricing, ownership, support and our services.'

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: '/faq' })

export default function FAQPage() {
  const extra = [
    {
      question: 'Which services do you offer?',
      answer: `We offer ${SERVICES.map((s) => s.name).join(', ')}.`,
    },
    {
      question: 'What technologies do you work with?',
      answer:
        'Mostly TypeScript, React and Next.js on the web, React Native and Flutter on mobile, Node.js and Python on the back end, PostgreSQL for data, and AWS, Azure or Google Cloud for hosting. We choose the stack that suits your product and team, not the one we prefer.',
    },
    {
      question: 'Can we start small?',
      answer:
        'Yes. Many engagements begin with a short discovery or a small first release. It lets you see how we work before committing to a larger build.',
    },
  ]

  return (
    <>
      <JsonLd data={graph(webPageNode({ path: '/faq', name: TITLE, description: DESCRIPTION }))} />
      <PageHero
        eyebrow="FAQ"
        breadcrumbs={[{ name: 'FAQ' }]}
        title={
          <>
            Questions, <span className="text-accent">answered</span>.
          </>
        }
        description="How we work, what we build and what to expect. If your question is not here, just ask."
      />
      <FAQSection items={[...GENERAL_FAQS, ...extra]} title="Everything you might want to know" />
      <div className="container-site pb-6">
        <LastUpdated />
      </div>
      <CTASection />
    </>
  )
}
