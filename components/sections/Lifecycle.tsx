import MotionWrapper from '@/components/ui/MotionWrapper'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { LIFECYCLE } from '@/lib/services'

export default function Lifecycle({ showCta = true }: { showCta?: boolean }) {
  return (
    <section className="px-3 md:px-4">
      <div className="relative overflow-hidden rounded-5xl bg-ink py-20 text-white md:py-28">
        <div className="bg-dots absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
        <div className="container-site relative grid gap-14 lg:grid-cols-12 lg:gap-20">
          <MotionWrapper className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionLabel light>How we work</SectionLabel>
              <h2 className="text-display-md mb-6">One continuous path from idea to growth.</h2>
              <p className="mb-8 max-w-md text-white/60">
                Five stages, one team. You never have to hand your project from a design agency to a dev shop to an
                IT vendor to a marketing firm and hope nothing is lost on the way.
              </p>
              {showCta && <Button href="/process" variant="light">Our process</Button>}
            </div>
          </MotionWrapper>

          <ol className="lg:col-span-7">
            {LIFECYCLE.map((stage, i) => (
              <MotionWrapper key={stage.step} delay={i * 0.06}>
                <li className="group flex gap-6 border-t border-white/10 py-8 first:border-t-0 first:pt-0 md:gap-10">
                  <span className="font-impact text-5xl leading-none text-white/20 transition-colors duration-300 group-hover:text-accent md:text-6xl">
                    {stage.step}
                  </span>
                  <div>
                    <h3 className="mb-2 text-2xl font-semibold tracking-tight">{stage.title}</h3>
                    <p className="max-w-lg text-[15px] leading-relaxed text-white/60">{stage.description}</p>
                  </div>
                </li>
              </MotionWrapper>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
