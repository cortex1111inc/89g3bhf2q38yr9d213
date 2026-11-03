import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import MotionWrapper from '@/components/ui/MotionWrapper'
import JsonLd from '@/components/seo/JsonLd'
import ArticleSummary from '@/components/seo/ArticleSummary'
import { INSIGHTS } from '@/lib/content'
import { LAST_UPDATED } from '@/lib/site'
import { buildMetadata } from '@/lib/seo'
import { articleNode, breadcrumbList, graph, webPageNode } from '@/lib/schema'

const post = INSIGHTS.find((p) => p.slug === 'building-scalable-digital-systems')!

export const metadata: Metadata = buildMetadata({
  title: post.title,
  absoluteTitle: true,
  description: post.summary.length > 160 ? `${post.summary.slice(0, 157).trimEnd()}...` : post.summary,
  path: post.href,
  type: 'article',
  publishedTime: post.datePublished,
  modifiedTime: LAST_UPDATED,
  keywords: post.keywords,
  image: { url: post.image, width: 1200, height: 800, alt: post.title },
})

export default function InsightArticle1() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageNode({ path: post.href, name: post.title, description: post.summary, datePublished: post.datePublished }),
          breadcrumbList([{ name: 'Insights', path: '/insights' }, { name: post.title }]),
          articleNode({
            path: post.href,
            headline: post.title,
            description: post.summary,
            image: post.image,
            datePublished: post.datePublished,
            section: post.category,
            keywords: post.keywords,
          }),
        )}
      />
      {/* Hero */}
      <section className="pt-40 pb-0 md:pt-52 bg-white overflow-hidden">
        <div className="container-site pb-16">
          <MotionWrapper>
            <div className="flex items-center gap-4 mb-8">
              <Link href="/insights" className="text-[11px] uppercase tracking-widest text-brand-muted hover:text-brand-black transition-colors">
                ← Insights
              </Link>
              <span className="text-brand-border">|</span>
              <span className="text-[11px] uppercase tracking-widest text-brand-muted font-medium border border-brand-border px-3 py-1">
                Systems Architecture
              </span>
              <span className="text-[12px] text-brand-muted font-light"><time dateTime="2026-02-01">February 2026</time> · 7 min read</span>
            </div>
          </MotionWrapper>
          <MotionWrapper delay={0.1}>
            <h1 className="text-[clamp(2.2rem,5vw,4.5rem)] font-light tracking-[-0.04em] text-brand-black leading-[1.05] max-w-4xl mb-8">
              Building Scalable Digital Systems for Long-Term Growth
            </h1>
          </MotionWrapper>
          <MotionWrapper delay={0.2}>
            <p className="text-[17px] font-light text-brand-muted max-w-2xl leading-[1.85]">
              Most enterprise software is built to ship, not to scale. The difference between
              the two approaches does not show itself immediately - it compounds, quietly,
              until the weight of architectural shortcuts becomes unsustainable.
            </p>
          </MotionWrapper>
        </div>
        <MotionWrapper delay={0.3} className="w-full relative h-[420px] md:h-[540px]">
          <Image
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2000&q=80"
            alt="Enterprise digital systems architecture"
            fill
            className="object-cover"
          />
        </MotionWrapper>
      </section>

      {/* Article body */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Main content */}
            <article className="lg:col-span-8 prose-vanspire">
              <ArticleSummary summary={post.summary} takeaways={post.takeaways} />
              <MotionWrapper>
                <div className="space-y-6 text-[16px] font-light text-brand-muted leading-[1.9]">

                  <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-light tracking-[-0.03em] text-brand-black mt-0 mb-4">
                    The fragility problem in enterprise software
                  </h2>
                  <p>
                    Walk into any mature organisation and ask the engineering team about their
                    oldest systems. The response is almost universally the same: a mixture of
                    reluctant familiarity and contained anxiety. These are systems that work -
                    until they don&apos;t. Systems that cannot be changed without risk, cannot be
                    understood without institutional knowledge, and cannot be replaced without
                    a programme of work that no one has the appetite to approve.
                  </p>
                  <p>
                    This fragility is not accidental. It is the accumulated result of thousands
                    of decisions made under constraint - time pressure, budget limits, unclear
                    requirements, and the relentless prioritisation of delivery over durability.
                    Each individual decision was defensible. The collective consequence was not.
                  </p>

                  <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-light tracking-[-0.03em] text-brand-black mt-10 mb-4">
                    What &quot;scalable&quot; actually means
                  </h2>
                  <p>
                    Scalability is one of the most misused terms in software engineering conversations.
                    In most contexts, it is used to mean &quot;the system can handle more traffic.&quot;
                    This is a narrow and ultimately misleading definition. A truly scalable system
                    has multiple dimensions:
                  </p>
                  <ul className="space-y-3 my-4">
                    {[
                      { t: 'Technical scalability', d: 'The ability to handle growing load - users, transactions, data volume - without disproportionate degradation in performance or cost.' },
                      { t: 'Operational scalability', d: 'The ability for a growing team to work on the system without increasing coordination overhead or deployment risk.' },
                      { t: 'Organisational scalability', d: 'The ability for new team members to understand, modify, and extend the system without extended onboarding periods.' },
                      { t: 'Commercial scalability', d: 'The ability to add features, change pricing models, enter new markets, or pivot business logic without fundamental rearchitecting.' },
                    ].map((item) => (
                      <li key={item.t} className="flex items-start gap-3">
                        <div className="w-1 h-1 rounded-full bg-brand-muted mt-[12px] flex-shrink-0" />
                        <span><strong className="font-medium text-brand-black">{item.t}:</strong> {item.d}</span>
                      </li>
                    ))}
                  </ul>
                  <p>
                    Most systems are optimised for the first dimension while neglecting the others.
                    The result is infrastructure that handles load but cannot change - which, in
                    practice, is a system that is scaling your technical debt rather than your business.
                  </p>

                  <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-light tracking-[-0.03em] text-brand-black mt-10 mb-4">
                    The five architectural decisions that determine longevity
                  </h2>
                  <p>
                    In our experience designing and building enterprise platforms, five architectural
                    decisions consistently determine whether a system ages well or ages into a liability:
                  </p>

                  <h3 className="text-[18px] font-medium text-brand-black mt-8 mb-3">1. Separation of concerns at the boundary level</h3>
                  <p>
                    Systems that blur the boundaries between their components - where business logic
                    lives in the presentation layer, where database queries are scattered through
                    service classes, where configuration is hardcoded into application code - accumulate
                    risk with every feature addition. Clear, enforced boundaries between system layers
                    is not an aesthetic preference. It is the mechanical requirement for long-term
                    maintainability.
                  </p>

                  <h3 className="text-[18px] font-medium text-brand-black mt-8 mb-3">2. Data model durability</h3>
                  <p>
                    The data model is the most expensive aspect of any system to change. A well-designed
                    data model - one that captures the genuine entities and relationships in the domain,
                    rather than the current implementation&apos;s convenient approximation - significantly
                    reduces the cost of future business changes. Data model shortcuts made during initial
                    development compound across every feature that depends on them.
                  </p>

                  <h3 className="text-[18px] font-medium text-brand-black mt-8 mb-3">3. API contract discipline</h3>
                  <p>
                    How a system exposes its capabilities - internally to other services and externally
                    to consumers - determines how much freedom engineers have to evolve its implementation.
                    Loosely defined APIs trap systems in their initial design. Well-designed APIs with
                    versioning strategies and explicit contracts allow internal architectures to evolve
                    without breaking dependent systems.
                  </p>

                  <h3 className="text-[18px] font-medium text-brand-black mt-8 mb-3">4. Observability as a first-class requirement</h3>
                  <p>
                    Systems that cannot be understood in production are systems that cannot be maintained
                    in production. Structured logging, distributed tracing, and meaningful metrics are
                    not operational nice-to-haves. They are the visibility infrastructure that allows
                    engineering teams to diagnose problems, understand performance profiles, and make
                    confident architectural decisions as the system evolves.
                  </p>

                  <h3 className="text-[18px] font-medium text-brand-black mt-8 mb-3">5. Deployment independence</h3>
                  <p>
                    Systems where every change requires a full deployment of the entire application,
                    or where deployments require multi-hour coordination windows, are systems that
                    cannot evolve at the pace of the business. Deployment architecture - the ability
                    to release changes safely, incrementally, and without service disruption - is
                    a product requirement as much as a technical one.
                  </p>

                  <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-light tracking-[-0.03em] text-brand-black mt-10 mb-4">
                    Designing for durability, not just delivery
                  </h2>
                  <p>
                    The tension between delivering value quickly and building for longevity is real.
                    It is not, however, irresolvable. The most effective approach we have seen is
                    not to choose between speed and quality - it is to make durability decisions
                    early, when they are cheap, and defer optimisation decisions until the system
                    generates the data needed to make them well.
                  </p>
                  <p>
                    Getting the data model right costs relatively little in the first sprint and
                    enormously more in the tenth. Getting the deployment pipeline right at the start
                    accelerates every subsequent delivery. Getting the observability layer in place
                    before problems occur means problems get diagnosed in minutes rather than days.
                  </p>
                  <p>
                    Long-term scalability is not a luxury that organisations earn after achieving
                    product-market fit. It is an engineering discipline that, applied at the right
                    level from the beginning, makes the journey to that point faster, not slower.
                  </p>

                  <div className="mt-12 pt-8 border-t border-brand-border">
                    <p className="text-[13px] text-brand-muted font-light italic">
                      Vanspire Technology builds enterprise web platforms, custom software, and cloud
                      infrastructure designed for long-term scalability. If you are evaluating your
                      current system architecture or planning a new platform, we would welcome a conversation.
                    </p>
                    <Link
                      href="/contact"
                      className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium text-brand-black border-b border-brand-black/20 pb-1 hover:border-brand-black transition-all"
                    >
                      Start a conversation with Vanspire →
                    </Link>
                  </div>
                </div>
              </MotionWrapper>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <MotionWrapper delay={0.15}>
                <div className="sticky top-28 space-y-8">
                  <div className="bg-brand-offwhite p-8">
                    <p className="text-label text-brand-muted mb-4">Key Themes</p>
                    <ul className="space-y-2">
                      {['Scalable Architecture', 'Enterprise Software', 'Technical Debt', 'Cloud Infrastructure', 'API Design', 'Observability'].map((t) => (
                        <li key={t} className="text-[13px] font-light text-brand-muted border-b border-brand-border pb-2 last:border-0">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-brand-offwhite p-8">
                    <p className="text-label text-brand-muted mb-4">Related Service</p>
                    <Link href="/services/custom-software-development" className="text-[14px] font-light text-brand-black hover:text-brand-muted transition-colors">
                      Software & Web Platforms →
                    </Link>
                    <p className="text-[12px] text-brand-muted mt-2 leading-relaxed">
                      See how we apply these principles in our enterprise platform engagements.
                    </p>
                  </div>

                  <div className="bg-brand-offwhite p-8">
                    <p className="text-label text-brand-muted mb-3">Also in Insights</p>
                    <Link href="/insights/future-ready-enterprise-technology-strategy" className="text-[14px] font-light text-brand-black hover:text-brand-muted transition-colors leading-snug block">
                      Designing Future-Ready Enterprise Technology Strategies →
                    </Link>
                  </div>
                </div>
              </MotionWrapper>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
