import Image from 'next/image'
import { Bot, Smartphone, Sparkles } from 'lucide-react'
import Button from '@/components/ui/Button'
import MotionWrapper from '@/components/ui/MotionWrapper'

const FACTS = [
  { value: '8', label: 'Service lines under one roof' },
  { value: 'Product → IT', label: 'Idea to infrastructure to growth' },
  { value: 'Founder-led', label: 'Senior people on every project' },
]

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="bg-dots-dark absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" aria-hidden="true" />
      <div className="container-site relative grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <MotionWrapper>
            <p className="mb-8 inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-1.5 pr-5 text-[13px] font-medium shadow-sm">
              <span className="flex h-7 items-center rounded-full bg-accent px-3 text-[11px] font-semibold uppercase tracking-wider text-white">
                New
              </span>
              Product, engineering, AI and marketing, one firm
            </p>
          </MotionWrapper>
          <MotionWrapper delay={0.08}>
            <h1 className="text-display-xl mb-8">
              We design, build and grow the{' '}
              <span className="relative inline-block text-accent">
                digital products
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M2 9C60 3 180 2 298 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>{' '}
              your business runs on.
            </h1>
          </MotionWrapper>
          <MotionWrapper delay={0.16}>
            <p className="text-body-lg mb-10 max-w-xl text-ink/65">
              Vanspire is a product and IT firm. Custom software, AI and automation, mobile apps, cloud systems and
              marketing, delivered by one senior team from first idea to long-term growth.
            </p>
          </MotionWrapper>
          <MotionWrapper delay={0.24} className="mb-14 flex flex-wrap items-center gap-4">
            <Button href="/contact" size="lg">Start a project</Button>
            <Button href="/work" size="lg" variant="secondary">See our work</Button>
          </MotionWrapper>
          <MotionWrapper delay={0.3}>
            <dl className="grid max-w-xl grid-cols-1 gap-6 border-t border-ink/10 pt-8 sm:grid-cols-3">
              {FACTS.map((fact) => (
                <div key={fact.value}>
                  <dt className="text-2xl font-semibold tracking-tight">{fact.value}</dt>
                  <dd className="mt-1 text-[13px] leading-snug text-ink/55">{fact.label}</dd>
                </div>
              ))}
            </dl>
          </MotionWrapper>
        </div>

        <MotionWrapper delay={0.2} className="lg:col-span-5">
          <div className="relative mx-auto max-w-md pb-10 pl-6 lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-5xl bg-ink">
              <Image
                src="/img/ai-phone.webp"
                alt="Smartphone showing an AI assistant interface"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </div>

            <div className="absolute -left-2 top-12 flex animate-float items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-xl">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-white">
                <Bot size={20} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[14px] font-semibold leading-tight">AI & Automation</span>
                <span className="text-[12px] text-ink/55">Assistants, workflows</span>
              </span>
            </div>

            <div className="absolute -right-2 top-1/2 hidden animate-float items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-xl [animation-delay:1.5s] sm:flex">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-white">
                <Smartphone size={20} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[14px] font-semibold leading-tight">Mobile Apps</span>
                <span className="text-[12px] text-ink/55">iOS & Android</span>
              </span>
            </div>

            <div className="absolute -bottom-0 left-0 w-44 overflow-hidden rounded-3xl border-4 border-canvas">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/img/dev-woman.webp"
                  alt="Engineer writing code"
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="absolute -right-3 -top-5 flex h-28 w-28 items-center justify-center rounded-full bg-accent text-white shadow-xl">
              <svg viewBox="0 0 120 120" className="absolute inset-0 animate-spin-slow" aria-hidden="true">
                <defs>
                  <path id="badge-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                </defs>
                <text fill="currentColor" fontSize="11" fontWeight="600" letterSpacing="3">
                  <textPath href="#badge-circle">PRODUCT · IT · GROWTH · </textPath>
                </text>
              </svg>
              <Sparkles size={24} aria-hidden="true" />
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
