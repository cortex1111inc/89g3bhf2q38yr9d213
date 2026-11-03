import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import WorkCard from '@/components/sections/WorkCard'
import CTASection from '@/components/sections/CTASection'
import MotionWrapper from '@/components/ui/MotionWrapper'
import { WORK } from '@/lib/work'

export const metadata: Metadata = {
  title: 'Our Work | Products & Solutions by Vanspire',
  description:
    'Explore Vanspire\'s hospital management platform and the software, AI, mobile, integration, ERP and marketing solutions we deliver for growing businesses.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'Our Work | Vanspire',
    description: 'Products we run and solutions we deliver across software, AI, mobile, integration and marketing.',
    url: '/work',
    images: [{ url: '/ogimage.webp', width: 1200, height: 630, alt: 'Vanspire work' }],
  },
}

export default function WorkPage() {
  const [flagship, ...rest] = WORK

  return (
    <>
      <PageHero
        eyebrow="Our work"
        breadcrumbs={[{ name: 'Work' }]}
        title={
          <>
            Products we run and <span className="text-accent">solutions</span> we deliver.
          </>
        }
        description="Our own hospital management platform, plus the kinds of systems we most often build for clients: ERP rollouts, integration hubs, mobile apps, AI assistants and growth programmes."
      />

      <section className="pb-20 md:pb-28">
        <div className="container-site space-y-4">
          <MotionWrapper>
            <WorkCard item={flagship} size="large" />
          </MotionWrapper>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((item, i) => (
              <MotionWrapper key={item.slug} delay={(i % 3) * 0.07}>
                <WorkCard item={item} />
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={
          <>
            Got something similar in mind? <span className="text-accent">Let&apos;s talk.</span>
          </>
        }
      />
    </>
  )
}
