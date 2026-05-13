import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import MotionWrapper from '@/components/ui/MotionWrapper'
import SectionLabel from '@/components/ui/SectionLabel'
import CTASection from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'About Vanspire | Vision, Philosophy & The Team Behind the Brand',
  description:
    'Vanspire is a future-focused brand group built to last. Learn about our founding vision, long-term philosophy, structured growth model, and the team driving Vanspire forward.',
  keywords: [
    'about Vanspire',
    'brand group vision',
    'future-focused technology company India',
    'enterprise brand philosophy',
    'technology venture founders',
    'long-term business strategy',
  ],
  openGraph: {
    title: 'About Vanspire | Vision, Philosophy & Team',
    description:
      'A future-focused brand group built with discipline, vision, and long-term intent. Meet the people and philosophy behind Vanspire.',
    url: '/about',
    images: [{ url: '/ogimage.webp', width: 1200, height: 630, alt: 'About Vanspire' }],
  },
  alternates: { canonical: '/about' },
}

const team = [
  {
    name: 'Akshay Krishna',
    role: 'Venture Operations',
    linkedin: 'https://www.linkedin.com/in/akshay-krishna-20764723a/',
    bio: 'Focusing on structuring delivery systems and operational frameworks that support our growth.',
    image: '/akshay.png',
  },
  {
    name: 'Vyshnav M',
    role: 'Growth & Markets',
    linkedin: 'https://www.linkedin.com/in/vyshnavmancheri/',
    bio: 'Drives digital growth, market visibility, and strategic positioning across Vanspire initiatives.',
    image: '/vyshnav.webp',
  },
  {
    name: 'Sreehari S',
    role: 'Systems & Infra',
    linkedin: 'https://www.linkedin.com/in/sreehari-s-5a2a592b9/',
    bio: 'Focusing on building scalable systems and core technological foundations for Vanspire ventures.',
    image: '/sreehari.webp',
  },
  {
    name: 'Adithyan Dileep',
    role: 'Product & Innovation',
    linkedin: 'https://www.linkedin.com/in/adithyan-dileep/',
    bio: 'Focusing on shaping product direction and turning ideas into impactful digital solutions.',
    image: '/adithyan.webp',
  },
]

const growthStages = [
  { step: '01', title: 'Define the Thesis', desc: 'Every venture begins with a documented thesis - a clear articulation of the problem, the market, and the structural edge Vanspire brings.' },
  { step: '02', title: 'Build with Depth', desc: 'We develop full operational capability before launching. No half-built products. No premature scaling.' },
  { step: '03', title: 'Establish, Then Expand', desc: 'Once a venture reaches operational stability, group resources become available to seed the next. Each success funds the next beginning.' },
]

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Vanspire | Vision, Philosophy & The Team Behind the Brand",
    "description": "Vanspire is a future-focused brand group built to last. Learn about our founding vision, long-term philosophy, structured growth model, and the team driving Vanspire forward.",
    "url": "https://vanspire.in/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "Vanspire Innovations",
      "founder": team.map(t => ({
        "@type": "Person",
        "name": t.name,
        "jobTitle": t.role
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="pt-40 pb-24 md:pt-52 md:pb-32 bg-white">
        <div className="container-site">
          <MotionWrapper>
            <SectionLabel>Who We Are</SectionLabel>
          </MotionWrapper>
          <MotionWrapper delay={0.1}>
            <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-light tracking-[-0.04em] text-brand-black leading-[1.02] mt-4 mb-8 max-w-4xl">
              We built Vanspire<br />
              <em className="not-italic text-brand-muted">to last.</em>
            </h1>
          </MotionWrapper>
          <MotionWrapper delay={0.2}>
            <p className="text-[17px] font-light text-brand-muted max-w-2xl leading-[1.85]">
              Most companies are built to exit. Vanspire is built to endure. From the very
              first line of code written under this group, every decision has been made
              with permanence in mind - not short-term optics.
            </p>
          </MotionWrapper>
        </div>
      </section>

      <div className="divider" />

      {/* Vision Statement */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <MotionWrapper className="lg:col-span-4">
              <SectionLabel>Vision</SectionLabel>
              <h2 className="text-2xl md:text-3xl font-light tracking-tight text-brand-black mt-4">
                Where we are headed
              </h2>
            </MotionWrapper>

            <MotionWrapper delay={0.15} className="lg:col-span-8">
              <blockquote className="text-[clamp(1.4rem,2.5vw,2.2rem)] font-light text-brand-black leading-snug tracking-tight border-l-2 border-brand-black pl-8 mb-8">
                &ldquo;To become a multi-vertical brand group known for building
                technology-driven enterprises that stand the test of time.&rdquo;
              </blockquote>
              <p className="text-[16px] font-light text-brand-muted leading-[1.85] mb-5">
                Vanspire was founded on a single core thesis: the fundamental infrastructure of every major global business is increasingly digital. Organizations that intimately own and scale their digital infrastructure - rather than merely renting off-the-shelf software - will aggressively outperform their competitors and define the next era of their respective industries.
              </p>
              <p className="text-[16px] font-light text-brand-muted leading-[1.85] mb-5">
                We launched our technology venture first because it serves as the ultimate leverage point. By dominating software solutions, enterprise web development, and digital marketing integrations in India, we establish a robust technical chassis. Every subsequent venture we build or partner with operates on this ironclad foundation - ensuring that we never go to market with inferior systems.
              </p>
              <p className="text-[16px] font-light text-brand-muted leading-[1.85]">
                Our expansions into sectors like manufacturing, FinTech, and healthcare are driven by deep capability, not just speed-to-market. When Vanspire enters a space, we do so with unparalleled systemic relevance and absolute structural integrity.
              </p>
            </MotionWrapper>
          </div>

          {/* <MotionWrapper delay={0.2} className="mt-16">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
              alt="Vanspire vision - long-term enterprise thinking"
              className="w-full h-[320px] md:h-[420px] object-cover"
            />
          </MotionWrapper> */}
        </div>
      </section>

      <div className="divider" />

       {/* Team */}
      <section id="team" className="section-pad bg-brand-offwhite">
        <div className="container-site">
          <MotionWrapper className="mb-16">
            <SectionLabel>The Team</SectionLabel>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-light tracking-[-0.04em] text-brand-black mt-4 max-w-2xl leading-[1.1]">
              The People Behind Vanspire
            </h2>
          </MotionWrapper>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-8 2xl:gap-5">
            {team.map((member, i) => (
              <MotionWrapper key={member.name} delay={i * 0.12}>
                <div className="group">
                  <div className="overflow-hidden mb-6 relative w-full aspect-[2/2.5]">
                    <Image
                      src={member.image}
                      alt={`${member.name} - ${member.role} at Vanspire`}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-label !tracking-[0.05em] text-brand-muted mb-1">{member.role}</p>
                  <h3 className="text-[20px] font-light tracking-tight text-brand-black mb-3">{member.name}</h3>
                  <p className="text-[14px] font-light text-brand-muted leading-relaxed">{member.bio}</p>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Why Vanspire Exists */}
      <section className="section-pad bg-brand-offwhite">
        <div className="container-site">
          <MotionWrapper className="mb-16">
            <SectionLabel>Founding Philosophy</SectionLabel>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-light tracking-[-0.04em] text-brand-black mt-4 max-w-2xl leading-[1.08]">
              Why Vanspire Exists
            </h2>
          </MotionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-border">
            {[
              {
                title: 'Discipline over velocity',
                body: 'We do not sprint to the next opportunistic gap in the market. Every venture within the Vanspire group is engineered to be fully operational and stress-tested before the next division begins. This rigorous discipline is exactly how we ensure software quality compounds exponentially, avoiding the technical debt that cripples rapidly scaled startups.',
              },
              {
                title: 'Technology as structural infrastructure',
                body: 'Technology is never viewed as an extraneous service - it is the central nervous system of everything we build. Our first active vertical treats custom software development, cloud computing architectures, data ecosystems, and cybersecurity systems as the fundamental infrastructure required for an enterprise to endure generational shifts.',
              },
              {
                title: 'Enterprise-grade by absolute default',
                body: 'We build to institutional, Forture 500 standards from day zero. Whether we are architecting an MVP for an ambitious startup or overhauling legacy systems for a large corporation, our output is inherently production-grade, meticulously documented, maximally secure, and definitively built to last.',
              },
              {
                title: 'Compounding group value & IP',
                body: 'Each distinct venture within our ecosystem shares intellectual property, cloud resources, market reputation, and engineering principles with the broader group. As Vanspire expands into new verticals like healthcare or FinTech, every technological addition fundamentally strengthens the core capability of the whole - creating a deeply defensible moat against competitors.',
              },
            ].map((v, i) => (
              <MotionWrapper key={v.title} delay={i * 0.08}>
                <div className="bg-brand-offwhite p-10 md:p-12 h-full">
                  <h3 className="text-[18px] font-medium text-brand-black mb-4 tracking-tight">{v.title}</h3>
                  <p className="text-[15px] font-light text-brand-muted leading-relaxed">{v.body}</p>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Structured Growth Model */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <MotionWrapper className="lg:col-span-5">
              <SectionLabel>Growth Model</SectionLabel>
              <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-light tracking-[-0.04em] text-brand-black mt-4 mb-8 leading-[1.1]">
                Structured for<br />Deliberate Growth
              </h2>
              <p className="text-[15px] font-light text-brand-muted leading-[1.85] mb-6">
                Vanspire is structured as a group brand - similar in philosophy to how the
                world's most enduring conglomerates operate, but leaner, faster, and
                technology-native.
              </p>
              <p className="text-[15px] font-light text-brand-muted leading-[1.85]">
                Future verticals may include manufacturing, engineering, healthcare technology,
                financial infrastructure, and education - each selected based on where
                Vanspire's accumulated expertise creates the most defensible position.
              </p>
              <Link
                href="/ventures"
                className="inline-flex items-center gap-2 mt-8 text-[13px] font-medium text-brand-black border-b border-brand-black/20 pb-1 hover:border-brand-black transition-all"
              >
                Explore Our Ventures →
              </Link>
            </MotionWrapper>

            <div className="lg:col-span-7">
              <div className="space-y-0">
                {growthStages.map((s, i) => (
                  <MotionWrapper key={s.step} delay={i * 0.12}>
                    <div className="py-10 border-b border-brand-border first:border-t">
                      <div className="flex gap-8">
                        <span className="text-label text-brand-border w-8 flex-shrink-0 mt-1">{s.step}</span>
                        <div>
                          <h3 className="text-[18px] font-medium text-brand-black mb-2 tracking-tight">{s.title}</h3>
                          <p className="text-[15px] font-light text-brand-muted leading-relaxed">{s.desc}</p>
                        </div>
                      </div>
                    </div>
                  </MotionWrapper>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

     

      <CTASection />
    </>
  )
}
