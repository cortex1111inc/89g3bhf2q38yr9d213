import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import FAQSection from '@/components/sections/FAQSection'
import CTASection from '@/components/sections/CTASection'
import { GENERAL_FAQS } from '@/lib/content'
import { SERVICES } from '@/lib/services'

export const metadata: Metadata = {
  title: 'FAQ | Questions About Working with Vanspire',
  description:
    'Answers to common questions about working with Vanspire: who we work with, how projects run, pricing, ownership, support and our software, AI, mobile and marketing services.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ | Vanspire',
    description: 'Common questions about how Vanspire works, what we build and how projects are scoped.',
    url: '/faq',
    images: [{ url: '/ogimage.webp', width: 1200, height: 630, alt: 'Vanspire FAQ' }],
  },
}

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
      <CTASection />
    </>
  )
}
