import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import MotionWrapper from '@/components/ui/MotionWrapper'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { INSIGHTS } from '@/lib/content'

export default function InsightsPreview() {
  return (
    <section className="section-pad">
      <div className="container-site">
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <MotionWrapper className="max-w-2xl">
            <SectionLabel>Insights</SectionLabel>
            <h2 className="text-display-md">Thinking from the team building it.</h2>
          </MotionWrapper>
          <MotionWrapper delay={0.1}>
            <Button href="/insights" variant="secondary">All insights</Button>
          </MotionWrapper>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {INSIGHTS.map((post, i) => (
            <MotionWrapper key={post.href} delay={i * 0.08}>
              <Link href={post.href} className="group block h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-4xl bg-white">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={post.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-7 md:p-9">
                    <div className="mb-4 flex items-center gap-3 text-[13px] text-ink/50">
                      <span className="rounded-full bg-canvas px-3 py-1 font-medium text-ink">{post.category}</span>
                      <span>{post.date} · {post.readTime}</span>
                    </div>
                    <h3 className="mb-3 text-2xl font-semibold leading-tight tracking-tight">{post.title}</h3>
                    <p className="mb-6 flex-1 text-[15px] leading-relaxed text-ink/60">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-2 text-[14px] font-semibold">
                      Read article
                      <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                    </span>
                  </div>
                </article>
              </Link>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
