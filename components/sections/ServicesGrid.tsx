import MotionWrapper from '@/components/ui/MotionWrapper'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import ServiceCard from '@/components/sections/ServiceCard'
import { SERVICES } from '@/lib/services'

interface ServicesGridProps {
  showHeader?: boolean
  exclude?: string
  limit?: number
}

export default function ServicesGrid({ showHeader = true, exclude, limit }: ServicesGridProps) {
  const list = SERVICES.filter((s) => s.slug !== exclude).slice(0, limit)

  return (
    <section className="section-pad bg-white/0">
      <div className="container-site">
        {showHeader && (
          <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <MotionWrapper className="max-w-2xl">
              <SectionLabel>What we do</SectionLabel>
              <h2 className="text-display-md">
                Everything from product idea to IT backbone to growth.
              </h2>
            </MotionWrapper>
            <MotionWrapper delay={0.1}>
              <Button href="/services" variant="secondary">All services</Button>
            </MotionWrapper>
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((service, i) => (
            <MotionWrapper key={service.slug} delay={(i % 4) * 0.07}>
              <ServiceCard service={service} index={SERVICES.findIndex((s) => s.slug === service.slug)} />
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
