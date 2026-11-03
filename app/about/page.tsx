import type { Metadata } from 'next'
import Image from 'next/image'
import { Linkedin, Eye, Target, Compass } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import CTASection from '@/components/sections/CTASection'
import Lifecycle from '@/components/sections/Lifecycle'
import MotionWrapper from '@/components/ui/MotionWrapper'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import FactSheet from '@/components/seo/FactSheet'
import AnswerBox from '@/components/seo/AnswerBox'
import JsonLd from '@/components/seo/JsonLd'
import LastUpdated from '@/components/seo/LastUpdated'
import { VALUES } from '@/lib/content'
import { TEAM, FOUNDERS_SENTENCE } from '@/lib/people'
import { buildMetadata } from '@/lib/seo'
import { graph, webPageNode } from '@/lib/schema'
import { IDS } from '@/lib/site'

const TITLE = 'About Vanspire: Founder-Led Product & IT Firm'
const DESCRIPTION =
  'Meet the founders of Vanspire: Akshay Krishna (CEO), Adithyan Dileep (Founding Director & COO), Vyshnav M and Sreehari S. A product and IT firm in Kerala, India.'

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/about',
  keywords: ['about Vanspire', 'Vanspire founders', 'Akshay Krishna CEO', 'Adithyan Dileep founding director COO', 'software company Kerala'],
})

const pillars = [
  {
    icon: Target,
    title: 'Our mission',
    body: 'To give growing businesses a single, dependable team for everything between a product idea and a product that earns: strategy, design, engineering, infrastructure and marketing.',
  },
  {
    icon: Eye,
    title: 'Our vision',
    body: 'To be the most trusted product and IT partner for ambitious businesses in India and beyond, known for software that lasts and relationships that outlast the project.',
  },
  {
    icon: Compass,
    title: 'Our approach',
    body: 'Small senior teams, plain language, short feedback loops and honest estimates. We would rather say no than overpromise.',
  },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageNode({
            path: '/about',
            name: TITLE,
            description: DESCRIPTION,
            type: 'AboutPage',
            extra: { mainEntity: { '@id': IDS.organization } },
          }),
        )}
      />

      <PageHero
        eyebrow="About us"
        breadcrumbs={[{ name: 'About' }]}
        title={
          <>
            A small firm with the range of a <span className="text-accent">full agency</span>.
          </>
        }
        description="Vanspire brings product thinking, engineering, cloud, AI and marketing together in one founder-led team, so your project has one group answering for it end to end."
      />

      <section className="pb-10">
        <div className="container-site">
          <div className="grid gap-4 md:grid-cols-12">
            <MotionWrapper className="md:col-span-8">
              <div className="relative aspect-[16/10] overflow-hidden rounded-5xl">
                <Image src="/img/cowork.webp" alt="The Vanspire team working together" fill priority sizes="(min-width: 768px) 65vw, 100vw" className="object-cover" />
              </div>
            </MotionWrapper>
            <MotionWrapper delay={0.1} className="md:col-span-4">
              <div className="relative h-full min-h-[260px] overflow-hidden rounded-5xl">
                <Image src="/img/cowork-3.webp" alt="Colleagues collaborating over a laptop" fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" />
              </div>
            </MotionWrapper>
          </div>
        </div>
      </section>

      <section className="pt-6">
        <div className="container-site grid gap-4 lg:grid-cols-12 lg:items-start">
          <MotionWrapper className="lg:col-span-5">
            <AnswerBox
              question="Who founded Vanspire?"
              answer={`Vanspire was founded in 2024 by four co-founders: ${FOUNDERS_SENTENCE}. It is a founder-led product and IT firm based in Kerala, India.`}
            />
          </MotionWrapper>
          <MotionWrapper delay={0.1} className="lg:col-span-7">
            <FactSheet />
          </MotionWrapper>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <MotionWrapper className="lg:col-span-5">
            <SectionLabel>Our story</SectionLabel>
            <h2 className="text-display-md">From a group of freelancers to a firm.</h2>
          </MotionWrapper>
          <MotionWrapper delay={0.1} className="space-y-6 text-body text-ink/65 lg:col-span-7">
            <p>
              Vanspire began in 2024 as a group of friends taking on software, web and digital projects together. We
              quickly learned that clients did not want four freelancers and a project manager; they wanted one team
              that cared about the outcome.
            </p>
            <p>
              Since then each of us has worked inside different teams and companies, building products, running
              infrastructure and growing businesses. We have brought that experience back into Vanspire and rebuilt
              it as a proper firm: more structure, a wider range of skills and the same founder-level ownership.
            </p>
            <p>
              Today we take on custom software, AI and automation, mobile and web products, cloud and IT consulting,
              and the digital marketing that helps products find their market. We stay deliberately small so the
              people you meet in the first call are the people doing the work.
            </p>
          </MotionWrapper>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-site grid gap-4 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <MotionWrapper key={pillar.title} delay={i * 0.08}>
              <div className="h-full rounded-4xl bg-white p-8 md:p-10">
                <span className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-white">
                  <pillar.icon size={24} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="mb-3 text-2xl font-semibold tracking-tight">{pillar.title}</h3>
                <p className="text-[15px] leading-relaxed text-ink/60">{pillar.body}</p>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </section>

      <Lifecycle showCta={false} />

      <section id="team" className="section-pad">
        <div className="container-site">
          <MotionWrapper className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <SectionLabel>The founders</SectionLabel>
              <h2 className="text-display-md">The people behind Vanspire.</h2>
            </div>
            <p className="max-w-sm text-ink/60">
              Four co-founders, four disciplines. Akshay Krishna leads as CEO and Adithyan Dileep is Founding Director
              and COO. You will work directly with us, not an account manager.
            </p>
          </MotionWrapper>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-6">
            {TEAM.map((member, i) => (
              <MotionWrapper key={member.name} delay={i * 0.1}>
                <div id={member.id} className="group scroll-mt-32">
                  <div className="relative mb-5 aspect-[2/2.5] w-full overflow-hidden rounded-4xl bg-white">
                    <Image
                      src={member.image}
                      alt={`${member.name} - ${member.role} at Vanspire`}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink opacity-0 shadow-lg transition-all duration-300 hover:bg-accent hover:text-white group-hover:opacity-100 focus-visible:opacity-100"
                    >
                      <Linkedin size={16} aria-hidden="true" />
                    </a>
                  </div>
                  <p className="text-label mb-1 !tracking-[0.08em] text-accent">{member.role}</p>
                  <h3 className="mb-2 text-[20px] font-semibold tracking-tight">{member.name}</h3>
                  <p className="text-[14px] leading-relaxed text-ink/60">{member.bio}</p>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-site">
          <MotionWrapper className="mb-12 max-w-2xl">
            <SectionLabel>What we value</SectionLabel>
            <h2 className="text-display-md">How we like to work.</h2>
          </MotionWrapper>
          <div className="overflow-hidden rounded-5xl bg-white">
            {VALUES.map((value, i) => (
              <MotionWrapper key={value.title} delay={i * 0.06}>
                <div className="grid gap-4 border-b border-ink/10 px-7 py-8 last:border-b-0 md:grid-cols-12 md:items-center md:px-10">
                  <span className="text-sm font-medium text-ink/30 md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-2xl font-semibold tracking-tight md:col-span-4">{value.title}</h3>
                  <p className="text-[15px] leading-relaxed text-ink/60 md:col-span-7">{value.description}</p>
                </div>
              </MotionWrapper>
            ))}
          </div>
          <MotionWrapper className="mt-10 flex flex-wrap gap-4">
            <Button href="/careers" variant="secondary">Join the team</Button>
            <Button href="/contact">Work with us</Button>
          </MotionWrapper>
        </div>
      </section>

      <div className="container-site pb-6">
        <LastUpdated />
      </div>

      <CTASection />
    </>
  )
}
