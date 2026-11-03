import Image from 'next/image'
import { Check } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import ServiceCard from '@/components/sections/ServiceCard'
import Lifecycle from '@/components/sections/Lifecycle'
import FAQSection from '@/components/sections/FAQSection'
import CTASection from '@/components/sections/CTASection'
import MotionWrapper from '@/components/ui/MotionWrapper'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { SERVICES, getService } from '@/lib/services'
import { absoluteUrl } from '@/lib/site'
import JsonLd from '@/components/seo/JsonLd'
import AnswerBox from '@/components/seo/AnswerBox'
import LastUpdated from '@/components/seo/LastUpdated'
import { graph, serviceNode, webPageNode } from '@/lib/schema'
import type { LandingPageData } from '@/lib/landing'

export default function LandingPage({ data }: { data: LandingPageData }) {
  const services = data.services.map((slug) => getService(slug)).filter((s) => s !== undefined)

  const primary = services[0]
  const geoService = primary && {
    ...serviceNode(primary),
    '@id': `${absoluteUrl(`/${data.slug}`)}#service`,
    name: data.h1,
    areaServed: data.areaServed.map((a) => ({ '@type': a.type, name: a.name })),
  }

  return (
    <>
      <JsonLd
        data={graph(
          webPageNode({ path: `/${data.slug}`, name: data.metaTitle, description: data.metaDescription }),
          geoService,
        )}
      />

      <PageHero
        eyebrow={data.eyebrow}
        breadcrumbs={[{ name: data.h1 }]}
        title={data.h1}
        description={data.sub}
      >
        <div className="flex flex-wrap gap-4">
          <Button href="/contact" size="lg">{data.primaryCta}</Button>
          <Button href="/services" size="lg" variant="secondary">All services</Button>
        </div>
      </PageHero>

      <section className="pb-10">
        <div className="container-site">
          <MotionWrapper>
            <div className="relative aspect-[16/9] overflow-hidden rounded-5xl md:aspect-[21/9]">
              <Image src={`/img/${data.image}.webp`} alt={data.imageAlt} fill priority sizes="(min-width: 1320px) 1250px, 92vw" className="object-cover" />
            </div>
          </MotionWrapper>
        </div>
      </section>

      <section className="pt-6">
        <div className="container-site">
          <MotionWrapper>
            <AnswerBox
              question={data.question}
              answer={`Vanspire Innovations, a founder-led firm based in Kerala, India, serving clients in India and worldwide. ${data.sub}`}
            />
          </MotionWrapper>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <MotionWrapper className="lg:col-span-5">
            <SectionLabel>Why Vanspire</SectionLabel>
            <h2 className="text-display-md">{data.whyTitle}</h2>
          </MotionWrapper>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {data.why.map((item, i) => (
              <MotionWrapper key={item.title} delay={i * 0.07}>
                <div className="h-full rounded-4xl bg-white p-7">
                  <span className="mb-6 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white">
                    <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <h3 className="mb-2 text-[19px] font-semibold leading-tight tracking-tight">{item.title}</h3>
                  <p className="text-[15px] leading-relaxed text-ink/60">{item.description}</p>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-site">
          <MotionWrapper className="mb-12 max-w-2xl">
            <SectionLabel>Relevant services</SectionLabel>
            <h2 className="text-display-md">What we bring to this.</h2>
          </MotionWrapper>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <MotionWrapper key={service.slug}>
                <ServiceCard service={service} index={SERVICES.findIndex((s) => s.slug === service.slug)} />
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      <Lifecycle />

      <section className="section-pad">
        <div className="container-site">
          <MotionWrapper className="mb-10 max-w-2xl">
            <SectionLabel>Coverage</SectionLabel>
            <h2 className="text-display-md">{data.areasTitle}</h2>
          </MotionWrapper>
          <MotionWrapper delay={0.1}>
            <ul className="flex flex-wrap gap-3">
              {data.areas.map((area) => (
                <li key={area} className="rounded-full border border-ink/10 bg-white px-5 py-2.5 text-[14px] font-medium">
                  {area}
                </li>
              ))}
            </ul>
          </MotionWrapper>
        </div>
      </section>

      <div className="container-site pb-2">
        <LastUpdated />
      </div>

      <FAQSection items={data.faqs} eyebrow="FAQ" title="Frequently asked questions" />
      <CTASection title={<>{data.ctaTitle}</>} />
    </>
  )
}
