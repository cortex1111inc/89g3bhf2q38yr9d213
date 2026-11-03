import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Check } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import Lifecycle from '@/components/sections/Lifecycle'
import FAQSection from '@/components/sections/FAQSection'
import CTASection from '@/components/sections/CTASection'
import ServiceCard from '@/components/sections/ServiceCard'
import WorkCard from '@/components/sections/WorkCard'
import ServiceIcon from '@/components/ui/ServiceIcon'
import MotionWrapper from '@/components/ui/MotionWrapper'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { SERVICES, getService } from '@/lib/services'
import { WORK } from '@/lib/work'
import JsonLd from '@/components/seo/JsonLd'
import AnswerBox from '@/components/seo/AnswerBox'
import LastUpdated from '@/components/seo/LastUpdated'
import { buildMetadata } from '@/lib/seo'
import { graph, serviceNode, webPageNode } from '@/lib/schema'

type Params = { slug: string }

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    image: 'file',
    keywords: [service.name.toLowerCase(), ...service.tags.map((t) => t.toLowerCase()), 'Vanspire'],
  })
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const related = WORK.filter((item) => item.services.includes(service.slug)).slice(0, 3)
  const index = SERVICES.findIndex((s) => s.slug === service.slug)
  const others = [...SERVICES.slice(index + 1), ...SERVICES.slice(0, index)].slice(0, 4)

  return (
    <>
      <JsonLd
        data={graph(
          webPageNode({ path: `/services/${service.slug}`, name: service.metaTitle, description: service.metaDescription }),
          serviceNode(service),
        )}
      />

      <PageHero
        eyebrow="Service"
        breadcrumbs={[{ name: 'Services', href: '/services' }, { name: service.short }]}
        title={service.name}
        description={service.tagline}
      >
        <ul className="mb-8 flex flex-wrap gap-2.5">
          {service.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-ink/10 bg-white px-4 py-2 text-[13px] font-medium">
              {tag}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-4">
          <Button href="/contact" size="lg">Talk to us about this</Button>
          <Button href="/work" size="lg" variant="secondary">See related work</Button>
        </div>
      </PageHero>

      <section className="pb-10">
        <div className="container-site">
          <MotionWrapper>
            <div className="relative aspect-[16/9] overflow-hidden rounded-5xl md:aspect-[21/9]">
              <Image
                src={`/img/${service.image}.webp`}
                alt={service.imageAlt}
                fill
                priority
                sizes="(min-width: 1320px) 1250px, 92vw"
                className="object-cover"
              />
            </div>
          </MotionWrapper>
        </div>
      </section>

      <section className="pt-6">
        <div className="container-site">
          <MotionWrapper>
            <AnswerBox
              question={`What is ${service.name.toLowerCase()}?`}
              answer={service.definition}
              extraLabel="Who it is for:"
              extra={service.whoFor}
            />
          </MotionWrapper>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <MotionWrapper className="lg:col-span-7">
            <SectionLabel>Overview</SectionLabel>
            <h2 className="text-display-md mb-8">{service.summary}</h2>
            <div className="space-y-5 text-body text-ink/65">
              {service.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </MotionWrapper>
          <MotionWrapper delay={0.1} className="lg:col-span-5">
            <div className="rounded-5xl bg-white p-8 md:p-10">
              <h3 className="mb-6 text-xl font-semibold tracking-tight">What&apos;s included</h3>
              <ul className="space-y-3.5">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                      <Check size={12} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {item}
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
            <SectionLabel>How we approach it</SectionLabel>
            <h2 className="text-display-md">Built on four principles.</h2>
          </MotionWrapper>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.features.map((feature, i) => (
              <MotionWrapper key={feature.title} delay={i * 0.07}>
                <div className="h-full rounded-4xl bg-white p-7">
                  <span className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-canvas">
                    <ServiceIcon name={service.icon} size={22} strokeWidth={1.6} />
                  </span>
                  <p className="mb-2 text-sm font-medium text-ink/30">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mb-3 text-[19px] font-semibold leading-tight tracking-tight">{feature.title}</h3>
                  <p className="text-[15px] leading-relaxed text-ink/60">{feature.description}</p>
                </div>
              </MotionWrapper>
            ))}
          </div>

          <MotionWrapper delay={0.1} className="mt-10 rounded-4xl border border-ink/10 p-7 md:p-9">
            <p className="text-label mb-5 text-ink/50">Typical tools & technologies</p>
            <ul className="flex flex-wrap gap-2.5">
              {service.stack.map((tech) => (
                <li key={tech} className="rounded-full bg-white px-4 py-2 text-[14px] font-medium">
                  {tech}
                </li>
              ))}
            </ul>
          </MotionWrapper>
        </div>
      </section>

      <Lifecycle showCta={false} />

      {related.length > 0 && (
        <section className="section-pad">
          <div className="container-site">
            <MotionWrapper className="mb-12 max-w-2xl">
              <SectionLabel>Related work</SectionLabel>
              <h2 className="text-display-md">See how this comes together.</h2>
            </MotionWrapper>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item, i) => (
                <MotionWrapper key={item.slug} delay={i * 0.08}>
                  <WorkCard item={item} />
                </MotionWrapper>
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQSection
        items={service.faqs}
        eyebrow={`${service.short} FAQ`}
        title="Common questions"
      />

      <section className="pb-10">
        <div className="container-site">
          <MotionWrapper className="mb-10">
            <SectionLabel>More services</SectionLabel>
            <h2 className="text-display-md">Often combined with</h2>
          </MotionWrapper>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <MotionWrapper key={s.slug}>
                <ServiceCard service={s} index={SERVICES.findIndex((x) => x.slug === s.slug)} />
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      <div className="container-site pb-6">
        <LastUpdated />
      </div>

      <CTASection />
    </>
  )
}
