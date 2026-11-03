import Image from 'next/image'
import { Boxes, LineChart, Rocket, ShieldCheck } from 'lucide-react'
import MotionWrapper from '@/components/ui/MotionWrapper'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'

const PILLARS = [
  { icon: Boxes, title: 'Product thinking', description: 'We start with users and outcomes, so what gets built is what moves the needle.' },
  { icon: ShieldCheck, title: 'Engineering depth', description: 'Secure, tested, documented systems built to run for years, not demos.' },
  { icon: Rocket, title: 'Launch & operate', description: 'Cloud, DevOps and support so your product stays fast, safe and online.' },
  { icon: LineChart, title: 'Growth built in', description: 'SEO, ads and analytics from the team that built the product.' },
]

export default function HomeIntro() {
  return (
    <section className="section-pad">
      <div className="container-site">
        <div className="mb-16 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <MotionWrapper className="lg:col-span-4">
            <SectionLabel>Who we are</SectionLabel>
            <div className="relative mt-4 hidden aspect-[4/3] overflow-hidden rounded-4xl lg:block">
              <Image src="/img/trio.webp" alt="A small team collaborating at a whiteboard" fill sizes="30vw" className="object-cover" />
            </div>
          </MotionWrapper>
          <MotionWrapper delay={0.1} className="lg:col-span-8">
            <h2 className="text-display-md mb-8">
              Most businesses juggle a design agency, a dev shop, an IT vendor and a marketing firm.{' '}
              <span className="text-ink/40">We are all of them, in one accountable team.</span>
            </h2>
            <p className="mb-8 max-w-2xl text-body text-ink/65">
              Vanspire started as a group of freelancers and has grown into a founder-led firm. We keep the speed and
              ownership of a small team, with the process and breadth of an agency, so your project has one team
              answering for it from the first workshop to the thousandth user.
            </p>
            <Button href="/about" variant="secondary">About Vanspire</Button>
          </MotionWrapper>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar, i) => (
            <MotionWrapper key={pillar.title} delay={i * 0.08}>
              <div className="h-full rounded-4xl bg-white p-7">
                <span className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-canvas">
                  <pillar.icon size={22} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="mb-2 text-[19px] font-semibold tracking-tight">{pillar.title}</h3>
                <p className="text-[15px] leading-relaxed text-ink/60">{pillar.description}</p>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
