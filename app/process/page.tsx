import type { Metadata } from 'next'
import { Check, CalendarCheck, ListChecks, UserRound, FileText } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import EngagementModels from '@/components/sections/EngagementModels'
import FAQSection from '@/components/sections/FAQSection'
import CTASection from '@/components/sections/CTASection'
import MotionWrapper from '@/components/ui/MotionWrapper'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { LIFECYCLE } from '@/lib/services'
import { GENERAL_FAQS } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Our Process | How Vanspire Takes Projects from Idea to Growth',
  description:
    'Discover, design, build, launch, grow. See how Vanspire runs software, AI, mobile, web and IT projects with short iterations, regular demos and clear communication.',
  alternates: { canonical: '/process' },
  openGraph: {
    title: 'Our Process | Vanspire',
    description: 'A five-stage path from idea to growth, run with short iterations and regular demos.',
    url: '/process',
    images: [{ url: '/ogimage.webp', width: 1200, height: 630, alt: 'Vanspire process' }],
  },
}

const STAGE_DETAILS: Record<string, { outputs: string[] }> = {
  Discover: { outputs: ['Stakeholder and user interviews', 'Goals, constraints and success measures', 'Risk list and recommended first phase'] },
  Design: { outputs: ['User journeys and clickable prototype', 'Technical architecture and stack choice', 'Scoped backlog with estimate and timeline'] },
  Build: { outputs: ['Working releases every one to two weeks', 'Automated tests and code review', 'Demo and feedback after each iteration'] },
  Launch: { outputs: ['Staging, load and security checks', 'Training, documentation and handover', 'Monitoring and a supported go-live'] },
  Grow: { outputs: ['Maintenance, hosting and support plans', 'SEO, ads and conversion improvements', 'Quarterly roadmap and performance review'] },
}

const COMMUNICATION = [
  { icon: UserRound, title: 'A named lead', description: 'One person who owns your project and answers your questions directly.' },
  { icon: ListChecks, title: 'A shared backlog', description: 'See what is planned, in progress and done at any time.' },
  { icon: CalendarCheck, title: 'Regular demos', description: 'A live walk-through every iteration so there are no surprises at the end.' },
  { icon: FileText, title: 'Written decisions', description: 'Key choices and trade-offs documented so everyone stays aligned.' },
]

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        breadcrumbs={[{ name: 'Process' }]}
        title={
          <>
            A clear path from <span className="text-accent">idea</span> to growth.
          </>
        }
        description="Every project runs through the same five stages. The details flex to your size and goals, but you always know where you are and what happens next."
      >
        <Button href="/contact" size="lg">Start with discovery</Button>
      </PageHero>

      <section className="pb-20 md:pb-28">
        <div className="container-site space-y-4">
          {LIFECYCLE.map((stage, i) => (
            <MotionWrapper key={stage.step}>
              <div className="grid gap-8 rounded-5xl bg-white p-7 md:p-10 lg:grid-cols-12 lg:gap-12">
                <div className="flex items-start gap-6 lg:col-span-5">
                  <span className="font-impact text-6xl leading-none text-accent md:text-7xl">{stage.step}</span>
                  <div>
                    <h2 className="mb-3 text-3xl font-semibold tracking-tight">{stage.title}</h2>
                    <p className="text-[15px] leading-relaxed text-ink/60">{stage.description}</p>
                  </div>
                </div>
                <div className="lg:col-span-7 lg:border-l lg:border-ink/10 lg:pl-12">
                  <p className="text-label mb-5 text-ink/50">What you get</p>
                  <ul className="space-y-3.5">
                    {STAGE_DETAILS[stage.title].outputs.map((output) => (
                      <li key={output} className="flex items-start gap-3 text-[16px]">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                          <Check size={12} strokeWidth={3} aria-hidden="true" />
                        </span>
                        {output}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </section>

      <section className="px-3 md:px-4">
        <div className="rounded-5xl bg-ink py-20 text-white md:py-28">
          <div className="container-site">
            <MotionWrapper className="mb-12 max-w-2xl">
              <SectionLabel light>Communication</SectionLabel>
              <h2 className="text-display-md">You will never wonder what is going on.</h2>
            </MotionWrapper>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {COMMUNICATION.map((item, i) => (
                <MotionWrapper key={item.title} delay={i * 0.07}>
                  <div className="h-full rounded-4xl bg-white/5 p-7">
                    <span className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent">
                      <item.icon size={22} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <h3 className="mb-2 text-xl font-semibold tracking-tight">{item.title}</h3>
                    <p className="text-[15px] leading-relaxed text-white/60">{item.description}</p>
                  </div>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </div>
      </section>

      <EngagementModels />
      <FAQSection items={GENERAL_FAQS} />
      <CTASection />
    </>
  )
}
