import MotionWrapper from '@/components/ui/MotionWrapper'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import WorkCard from '@/components/sections/WorkCard'
import { WORK } from '@/lib/work'

export default function FeaturedWork() {
  const [flagship, ...rest] = WORK
  return (
    <section className="section-pad">
      <div className="container-site">
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <MotionWrapper className="max-w-2xl">
            <SectionLabel>Work & solutions</SectionLabel>
            <h2 className="text-display-md">Products we run and solutions we deliver.</h2>
          </MotionWrapper>
          <MotionWrapper delay={0.1}>
            <Button href="/work" variant="secondary">All work</Button>
          </MotionWrapper>
        </div>
        <div className="grid gap-4 lg:grid-cols-12">
          <MotionWrapper className="lg:col-span-7">
            <WorkCard item={flagship} size="large" />
          </MotionWrapper>
          <div className="grid gap-4 lg:col-span-5">
            {rest.slice(0, 2).map((item, i) => (
              <MotionWrapper key={item.slug} delay={0.08 * (i + 1)}>
                <WorkCard item={item} />
              </MotionWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
