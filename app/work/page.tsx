import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import WorkCard from '@/components/sections/WorkCard'
import CTASection from '@/components/sections/CTASection'
import MotionWrapper from '@/components/ui/MotionWrapper'
import { WORK } from '@/lib/work'
import JsonLd from '@/components/seo/JsonLd'
import LastUpdated from '@/components/seo/LastUpdated'
import { buildMetadata } from '@/lib/seo'
import { graph, itemListNode, webPageNode } from '@/lib/schema'

const TITLE = 'Our Work: Products & Solutions'
const DESCRIPTION =
  "Vanspire's hospital management platform and the ERP, integration, mobile, AI and marketing solutions we deliver for growing businesses."

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: '/work' })

export default function WorkPage() {
  const [flagship, ...rest] = WORK

  return (
    <>
      <JsonLd
        data={graph(
          webPageNode({ path: '/work', name: TITLE, description: DESCRIPTION, type: 'CollectionPage' }),
          itemListNode('Vanspire work and solutions', WORK.map((w) => ({ name: w.title, path: `/work/${w.slug}` }))),
        )}
      />
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
