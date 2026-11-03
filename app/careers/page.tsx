import type { Metadata } from 'next'
import Image from 'next/image'
import { Compass, Heart, Laptop, Rocket } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import CTASection from '@/components/sections/CTASection'
import MotionWrapper from '@/components/ui/MotionWrapper'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { SITE } from '@/lib/site'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Careers: Join the Vanspire Team',
  description:
    'Join Vanspire, a founder-led product and IT firm in Kerala. We are always interested in talented engineers, designers, marketers and consultants.',
  path: '/careers',
})

const PERKS = [
  { icon: Rocket, title: 'Real ownership', description: 'Own features and clients end to end instead of being one cog in a large machine.' },
  { icon: Compass, title: 'Range of work', description: 'Software, AI, mobile, cloud and marketing under one roof. Grow across disciplines.' },
  { icon: Laptop, title: 'Modern craft', description: 'Current tools, code review, automation and time to do things properly.' },
  { icon: Heart, title: 'Founder access', description: 'Work directly with the founders, with no layers between you and the decisions.' },
]

const ROLES = [
  'Full-stack and mobile engineers',
  'AI and automation engineers',
  'Product and UI/UX designers',
  'DevOps and cloud engineers',
  'Digital marketers and content writers',
  'Freelance specialists and consultants',
]

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        breadcrumbs={[{ name: 'Careers' }]}
        title={
          <>
            Build with a small team that <span className="text-accent">ships</span>.
          </>
        }
        description="We are a growing, founder-led firm. We do not always have a formal opening, but we are always interested in people who care about their craft."
      >
        <Button href={`mailto:${SITE.email}?subject=Introduction%20to%20Vanspire`} size="lg">Introduce yourself</Button>
      </PageHero>

      <section className="pb-20 md:pb-28">
        <div className="container-site grid gap-4 md:grid-cols-12">
          <MotionWrapper className="md:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden rounded-5xl">
              <Image src="/img/meeting-2.webp" alt="Team members discussing work over coffee" fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
            </div>
          </MotionWrapper>
          <MotionWrapper delay={0.1} className="md:col-span-5">
            <div className="flex h-full flex-col justify-center rounded-5xl bg-white p-8 md:p-10">
              <SectionLabel>Who we look for</SectionLabel>
              <h2 className="mb-6 text-3xl font-semibold tracking-tight">Roles we are interested in</h2>
              <ul className="space-y-3">
                {ROLES.map((role) => (
                  <li key={role} className="flex items-center gap-3 border-b border-ink/10 pb-3 text-[15px] last:border-b-0">
                    <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          </MotionWrapper>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-site">
          <MotionWrapper className="mb-12 max-w-2xl">
            <SectionLabel>Why Vanspire</SectionLabel>
            <h2 className="text-display-md">A place to do your best work.</h2>
          </MotionWrapper>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PERKS.map((perk, i) => (
              <MotionWrapper key={perk.title} delay={i * 0.07}>
                <div className="h-full rounded-4xl bg-white p-7">
                  <span className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-canvas">
                    <perk.icon size={22} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3 className="mb-2 text-[19px] font-semibold tracking-tight">{perk.title}</h3>
                  <p className="text-[15px] leading-relaxed text-ink/60">{perk.description}</p>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={
          <>
            Think you&apos;d fit? <span className="text-accent">Say hello.</span>
          </>
        }
        description="Send us a short intro, your work (GitHub, portfolio, LinkedIn) and what you would like to build."
        primaryLabel="Email us"
        primaryHref={`mailto:${SITE.email}?subject=Introduction%20to%20Vanspire`}
      />
    </>
  )
}
