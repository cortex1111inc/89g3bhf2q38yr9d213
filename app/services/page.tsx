import type { Metadata } from 'next'
import Image from 'next/image'
import PageHero from '@/components/sections/PageHero'
import ServicesGrid from '@/components/sections/ServicesGrid'
import Lifecycle from '@/components/sections/Lifecycle'
import EngagementModels from '@/components/sections/EngagementModels'
import FAQSection from '@/components/sections/FAQSection'
import CTASection from '@/components/sections/CTASection'
import MotionWrapper from '@/components/ui/MotionWrapper'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { SERVICES } from '@/lib/services'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Services: Software, AI, Mobile, Web, Cloud, IT Consulting & Marketing',
  description:
    'Vanspire services: custom software development, AI and automation, mobile apps, web platforms, product design, cloud and DevOps, IT consulting and digital marketing, all from one team.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Vanspire Services | Product to IT, One Firm',
    description:
      'Custom software, AI, mobile, web, cloud, IT consulting and digital marketing delivered by one senior team.',
    url: '/services',
    images: [{ url: '/ogimage.webp', width: 1200, height: 630, alt: 'Vanspire services' }],
  },
}

export default function ServicesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Vanspire services',
    itemListElement: SERVICES.map((service, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: service.name,
      url: `${SITE_URL}/services/${service.slug}`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        eyebrow="Services"
        breadcrumbs={[{ name: 'Services' }]}
        title={
          <>
            One firm for the whole <span className="text-accent">product to IT</span> journey.
          </>
        }
        description="Eight connected service lines, so strategy, design, engineering, infrastructure and marketing are planned together and delivered by a single accountable team."
      >
        <div className="flex flex-wrap gap-4">
          <Button href="/contact" size="lg">Discuss your project</Button>
          <Button href="/process" size="lg" variant="secondary">How we work</Button>
        </div>
      </PageHero>

      <ServicesGrid showHeader={false} />

      <section className="py-10 md:py-16">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <MotionWrapper>
            <div className="relative aspect-[4/3] overflow-hidden rounded-5xl">
              <Image src="/img/cowork.webp" alt="Team working together in a shared office" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </MotionWrapper>
          <MotionWrapper delay={0.1}>
            <SectionLabel>Not sure where to start?</SectionLabel>
            <h2 className="text-display-md mb-6">Start with a conversation, not a contract.</h2>
            <p className="mb-8 text-body text-ink/65">
              Most clients come to us with a problem rather than a specification: &ldquo;our process is manual&rdquo;,
              &ldquo;we need an app&rdquo;, &ldquo;our site does not bring leads&rdquo;. A short discovery call is
              enough for us to tell you which services fit, what a sensible first phase looks like, and whether we
              are the right team at all.
            </p>
            <Button href="/contact" variant="accent">Book a discovery call</Button>
          </MotionWrapper>
        </div>
      </section>

      <Lifecycle />
      <EngagementModels />
      <FAQSection />
      <CTASection />
    </>
  )
}
