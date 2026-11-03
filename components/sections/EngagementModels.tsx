import { Check } from 'lucide-react'
import MotionWrapper from '@/components/ui/MotionWrapper'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { ENGAGEMENT_MODELS } from '@/lib/content'

export default function EngagementModels() {
  return (
    <section className="section-pad">
      <div className="container-site">
        <MotionWrapper className="mx-auto mb-14 max-w-2xl text-center">
          <SectionLabel>Ways to work together</SectionLabel>
          <h2 className="text-display-md">Flexible engagement, scoped to your goals.</h2>
          <p className="mt-5 text-ink/60">
            No off-the-shelf retainers and no standard price list. Every engagement is scoped individually after a
            short discovery conversation.
          </p>
        </MotionWrapper>

        <div className="grid gap-4 lg:grid-cols-3">
          {ENGAGEMENT_MODELS.map((model, i) => {
            const featured = i === 1
            return (
              <MotionWrapper key={model.name} delay={i * 0.08}>
                <div
                  className={`flex h-full flex-col rounded-5xl p-8 md:p-10 ${
                    featured ? 'bg-ink text-white' : 'bg-white'
                  }`}
                >
                  <p className={`text-label mb-4 ${featured ? 'text-accent' : 'text-ink/50'}`}>{model.best}</p>
                  <h3 className="mb-4 text-3xl font-semibold tracking-tight">{model.name}</h3>
                  <p className={`mb-8 text-[15px] leading-relaxed ${featured ? 'text-white/65' : 'text-ink/60'}`}>
                    {model.description}
                  </p>
                  <ul className="mb-10 flex-1 space-y-3">
                    {model.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-[15px]">
                        <Check size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Button href="/contact" variant={featured ? 'accent' : 'primary'}>Discuss this model</Button>
                </div>
              </MotionWrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
