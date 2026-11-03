import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import CTASection from '@/components/sections/CTASection'
import MotionWrapper from '@/components/ui/MotionWrapper'
import { INSIGHTS } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Insights | Software, Cloud & Digital Strategy from Vanspire',
  description:
    'Practical articles on software architecture, digital transformation, cloud, AI and growth from the Vanspire team. Written for leaders who build for the long term.',
  keywords: [
    'software architecture insights',
    'digital transformation articles',
    'cloud architecture blog',
    'technology strategy',
    'Vanspire insights',
  ],
  openGraph: {
    title: 'Vanspire Insights | Software, Cloud & Digital Strategy',
    description: 'Perspectives on software, systems thinking and digital transformation from the Vanspire team.',
    url: '/insights',
    images: [{ url: '/ogimage.webp', width: 1200, height: 630, alt: 'Vanspire Insights' }],
  },
  alternates: { canonical: '/insights' },
}

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        breadcrumbs={[{ name: 'Insights' }]}
        title={
          <>
            Thinking from the team <span className="text-accent">building it</span>.
          </>
        }
        description="Practical perspectives on software, systems and digital strategy, written for people who make technology decisions."
      />

      <section className="pb-20 md:pb-28">
        <div className="container-site grid gap-4 md:grid-cols-2">
          {INSIGHTS.map((post, i) => (
            <MotionWrapper key={post.href} delay={i * 0.08}>
              <Link href={post.href} className="group block h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-5xl bg-white">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={`${post.title} cover image`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7 md:p-10">
                    <div className="mb-5 flex flex-wrap items-center gap-3 text-[13px] text-ink/50">
                      <span className="rounded-full bg-canvas px-3 py-1 font-medium text-ink">{post.category}</span>
                      <span>{post.date} · {post.readTime}</span>
                    </div>
                    <h2 className="mb-4 text-2xl font-semibold leading-tight tracking-tight md:text-3xl">{post.title}</h2>
                    <p className="mb-8 flex-1 text-[15px] leading-relaxed text-ink/60">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-2 text-[14px] font-semibold">
                      Read article
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-accent">
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </span>
                    </span>
                  </div>
                </article>
              </Link>
            </MotionWrapper>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  )
}
