import Accordion from '@/components/ui/Accordion'
import MotionWrapper from '@/components/ui/MotionWrapper'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { GENERAL_FAQS } from '@/lib/content'

interface FAQSectionProps {
  items?: { question: string; answer: string }[]
  eyebrow?: string
  title?: string
  showContact?: boolean
}

export default function FAQSection({
  items = GENERAL_FAQS,
  eyebrow = 'FAQ',
  title = 'Questions we hear most often',
  showContact = true,
}: FAQSectionProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <section className="section-pad">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <MotionWrapper className="lg:col-span-5">
          <SectionLabel>{eyebrow}</SectionLabel>
          <h2 className="text-display-md mb-6">{title}</h2>
          {showContact && (
            <>
              <p className="mb-8 max-w-sm text-ink/65">
                Can&apos;t find what you are looking for? Talk to us directly and we will answer within one working day.
              </p>
              <Button href="/contact">Ask us anything</Button>
            </>
          )}
        </MotionWrapper>
        <MotionWrapper delay={0.1} className="lg:col-span-7">
          <Accordion items={items} />
        </MotionWrapper>
      </div>
    </section>
  )
}
