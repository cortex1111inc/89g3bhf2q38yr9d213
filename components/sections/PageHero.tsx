import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import MotionWrapper from '@/components/ui/MotionWrapper'
import SectionLabel from '@/components/ui/SectionLabel'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbList } from '@/lib/schema'

interface PageHeroProps {
  eyebrow: string
  title: React.ReactNode
  description?: React.ReactNode
  breadcrumbs?: { name: string; href?: string }[]
  children?: React.ReactNode // chips / buttons under the description
  aside?: React.ReactNode // optional right column content
}

export default function PageHero({ eyebrow, title, description, breadcrumbs, children, aside }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-36 pb-14 md:pt-44 md:pb-20">
      {breadcrumbs && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            ...breadcrumbList(breadcrumbs.map((c) => ({ name: c.name, path: c.href }))),
          }}
        />
      )}
      <div className="bg-dots-dark absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" aria-hidden="true" />
      <div className="container-site relative">
        {breadcrumbs && (
          <MotionWrapper>
            <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-[13px] text-ink/55">
              <Link href="/" className="hover:text-ink transition-colors">Home</Link>
              {breadcrumbs.map((crumb) => (
                <span key={crumb.name} className="flex items-center gap-1.5">
                  <ChevronRight size={13} aria-hidden="true" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-ink transition-colors">{crumb.name}</Link>
                  ) : (
                    <span className="text-ink" aria-current="page">{crumb.name}</span>
                  )}
                </span>
              ))}
            </nav>
          </MotionWrapper>
        )}

        <div className={`grid gap-10 ${aside ? 'lg:grid-cols-12 lg:items-end' : ''}`}>
          <div className={aside ? 'lg:col-span-8' : 'max-w-5xl'}>
            <MotionWrapper>
              <SectionLabel>{eyebrow}</SectionLabel>
            </MotionWrapper>
            <MotionWrapper delay={0.08}>
              <h1 className="text-display-lg mb-6">{title}</h1>
            </MotionWrapper>
            {description && (
              <MotionWrapper delay={0.16}>
                <p className="text-body-lg max-w-2xl text-ink/65">{description}</p>
              </MotionWrapper>
            )}
            {children && (
              <MotionWrapper delay={0.24} className="mt-8">
                {children}
              </MotionWrapper>
            )}
          </div>
          {aside && <div className="lg:col-span-4">{aside}</div>}
        </div>
      </div>
    </section>
  )
}
