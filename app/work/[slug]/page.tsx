import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight, Check } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import CTASection from '@/components/sections/CTASection'
import WorkCard from '@/components/sections/WorkCard'
import MotionWrapper from '@/components/ui/MotionWrapper'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { WORK, getWork } from '@/lib/work'
import { getService } from '@/lib/services'

type Params = { slug: string }

export function generateStaticParams() {
  return WORK.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const item = getWork(slug)
  if (!item) return {}

  return {
    title: `${item.title} | Vanspire`,
    description: item.summary,
    alternates: { canonical: `/work/${item.slug}` },
    openGraph: {
      title: `${item.title} | Vanspire`,
      description: item.summary,
      url: `/work/${item.slug}`,
      images: [{ url: '/ogimage.webp', width: 1200, height: 630, alt: item.title }],
    },
  }
}

export default async function WorkDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const item = getWork(slug)
  if (!item) notFound()

  const index = WORK.findIndex((w) => w.slug === item.slug)
  const more = [...WORK.slice(index + 1), ...WORK.slice(0, index)].slice(0, 2)
  const relatedServices = item.services.map((s) => getService(s)).filter((s) => s !== undefined)

  return (
    <>
      <PageHero
        eyebrow={`${item.kind} · ${item.category}`}
        breadcrumbs={[{ name: 'Work', href: '/work' }, { name: item.title }]}
        title={item.title}
        description={item.summary}
      >
        <div className="flex flex-wrap gap-4">
          <Button href="/contact" size="lg">Discuss a similar project</Button>
          <Button href="/work" size="lg" variant="secondary">All work</Button>
        </div>
      </PageHero>

      <section className="pb-10">
        <div className="container-site">
          <MotionWrapper>
            <div className="relative aspect-[16/9] overflow-hidden rounded-5xl md:aspect-[21/9]">
              <Image src={`/img/${item.image}.webp`} alt={item.imageAlt} fill priority sizes="(min-width: 1320px) 1250px, 92vw" className="object-cover object-top" />
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.1} className="mt-4">
            <dl className="grid gap-px overflow-hidden rounded-4xl bg-ink/10 sm:grid-cols-3">
              <div className="bg-white p-6 md:p-8">
                <dt className="text-label mb-3 text-ink/50">Type</dt>
                <dd className="text-[17px] font-semibold">{item.kind}: {item.category}</dd>
              </div>
              <div className="bg-white p-6 md:p-8">
                <dt className="text-label mb-3 text-ink/50">Services</dt>
                <dd className="flex flex-wrap gap-x-4 gap-y-1">
                  {relatedServices.map((service) => (
                    <Link key={service.slug} href={`/services/${service.slug}`} className="inline-flex items-center gap-1 text-[15px] font-semibold hover:text-accent">
                      {service.short}
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </Link>
                  ))}
                </dd>
              </div>
              <div className="bg-white p-6 md:p-8">
                <dt className="text-label mb-3 text-ink/50">Technology</dt>
                <dd className="text-[15px] font-semibold leading-snug">{item.stack.join(' · ')}</dd>
              </div>
            </dl>
          </MotionWrapper>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <MotionWrapper className="lg:col-span-5">
            <SectionLabel>The problem</SectionLabel>
            <h2 className="text-display-md">What this is built to solve.</h2>
          </MotionWrapper>
          <MotionWrapper delay={0.1} className="lg:col-span-7">
            <p className="text-body-lg text-ink/70">{item.challenge}</p>
          </MotionWrapper>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-site">
          <MotionWrapper className="mb-12 max-w-2xl">
            <SectionLabel>Our approach</SectionLabel>
            <h2 className="text-display-md">How we deliver it.</h2>
          </MotionWrapper>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {item.approach.map((step, i) => (
              <MotionWrapper key={step.title} delay={i * 0.07}>
                <div className="h-full rounded-4xl bg-white p-7">
                  <span className="mb-10 block font-impact text-5xl leading-none text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mb-3 text-[19px] font-semibold leading-tight tracking-tight">{step.title}</h3>
                  <p className="text-[15px] leading-relaxed text-ink/60">{step.description}</p>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {item.modules && (
        <section className="px-3 md:px-4">
          <div className="rounded-5xl bg-ink py-20 text-white md:py-28">
            <div className="container-site">
              <MotionWrapper className="mb-12 max-w-2xl">
                <SectionLabel light>Modules</SectionLabel>
                <h2 className="text-display-md">Eight modules, one patient record.</h2>
              </MotionWrapper>
              <div className="grid gap-4 md:grid-cols-2">
                {item.modules.map((module, i) => (
                  <MotionWrapper key={module.title} delay={(i % 2) * 0.07}>
                    <div className="h-full rounded-4xl bg-white/5 p-7 md:p-9">
                      <h3 className="mb-3 text-2xl font-semibold tracking-tight">{module.title}</h3>
                      <p className="mb-6 text-[15px] leading-relaxed text-white/60">{module.description}</p>
                      <ul className="flex flex-wrap gap-2">
                        {module.features.map((feature) => (
                          <li key={feature} className="rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] text-white/80">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </MotionWrapper>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section-pad">
        <div className="container-site grid gap-4 lg:grid-cols-2">
          <MotionWrapper>
            <div className="h-full rounded-5xl bg-white p-8 md:p-10">
              <h3 className="mb-6 text-2xl font-semibold tracking-tight">Capabilities</h3>
              <ul className="space-y-3.5">
                {item.capabilities.map((capability) => (
                  <li key={capability} className="flex items-start gap-3 text-[15px]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                      <Check size={12} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {capability}
                  </li>
                ))}
              </ul>
            </div>
          </MotionWrapper>
          <MotionWrapper delay={0.08}>
            <div className="h-full rounded-5xl bg-accent p-8 text-white md:p-10">
              <h3 className="mb-6 text-2xl font-semibold tracking-tight">What it delivers</h3>
              <ul className="space-y-3.5">
                {item.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3 text-[16px]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-accent">
                      <Check size={12} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </MotionWrapper>
        </div>
      </section>

      <section className="pb-10">
        <div className="container-site">
          <MotionWrapper className="mb-10">
            <SectionLabel>More work</SectionLabel>
            <h2 className="text-display-md">Keep exploring</h2>
          </MotionWrapper>
          <div className="grid gap-4 md:grid-cols-2">
            {more.map((work) => (
              <MotionWrapper key={work.slug}>
                <WorkCard item={work} />
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
