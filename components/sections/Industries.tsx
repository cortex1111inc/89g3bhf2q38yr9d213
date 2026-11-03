import MotionWrapper from '@/components/ui/MotionWrapper'
import SectionLabel from '@/components/ui/SectionLabel'
import { INDUSTRIES } from '@/lib/content'

export default function Industries() {
  return (
    <section className="py-16 md:py-20">
      <div className="container-site">
        <MotionWrapper className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <SectionLabel>Industries</SectionLabel>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Experience across sectors that run on software.</h2>
          </div>
        </MotionWrapper>
        <MotionWrapper delay={0.1}>
          <ul className="flex flex-wrap gap-3">
            {INDUSTRIES.map((industry) => (
              <li
                key={industry}
                className="rounded-full border border-ink/10 bg-white px-5 py-2.5 text-[14px] font-medium transition-colors hover:border-ink hover:bg-ink hover:text-white"
              >
                {industry}
              </li>
            ))}
          </ul>
        </MotionWrapper>
      </div>
    </section>
  )
}
