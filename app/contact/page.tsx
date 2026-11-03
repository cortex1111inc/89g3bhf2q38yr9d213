import type { Metadata } from 'next'
import { Clock, Mail, MapPin, MessageSquare } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import ContactForm from '@/components/forms/ContactForm'
import FAQSection from '@/components/sections/FAQSection'
import MotionWrapper from '@/components/ui/MotionWrapper'
import { GENERAL_FAQS } from '@/lib/content'
import { SITE } from '@/lib/site'
import JsonLd from '@/components/seo/JsonLd'
import { buildMetadata } from '@/lib/seo'
import { IDS } from '@/lib/site'
import { graph, webPageNode } from '@/lib/schema'

const TITLE = 'Contact Us: Start Your Project'
const DESCRIPTION =
  'Talk to Vanspire about custom software, AI, mobile apps, web, cloud, IT consulting or marketing. We respond to every enquiry within two business days.'

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: '/contact' })

const details = [
  { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Clock, label: 'Response time', value: 'Within 2 business days' },
  { icon: MapPin, label: 'Based in', value: `${SITE.location}, working worldwide` },
]

const NEXT_STEPS = [
  'We read your message and reply within two business days.',
  'A short discovery call to understand goals, users and constraints.',
  'A clear proposal with scope, timeline and cost, with no obligation.',
]

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageNode({ path: '/contact', name: TITLE, description: DESCRIPTION, type: 'ContactPage', extra: { mainEntity: { '@id': IDS.organization } } }),
        )}
      />
      <PageHero
        eyebrow="Contact"
        breadcrumbs={[{ name: 'Contact' }]}
        title={
          <>
            Let&apos;s start with a <span className="text-accent">conversation</span>.
          </>
        }
        description="Tell us what you are building or trying to fix. Whether it is a new product, a stuck project or a system that has outgrown its tools, we would like to hear about it."
      />

      <section className="pb-20 md:pb-28">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-14">
          <MotionWrapper className="lg:col-span-7">
            <ContactForm />
          </MotionWrapper>

          <MotionWrapper delay={0.12} className="lg:col-span-5">
            <div className="space-y-4">
              <div className="rounded-5xl bg-white p-8">
                <ul className="space-y-6">
                  {details.map((item) => (
                    <li key={item.label} className="flex items-start gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-canvas">
                        <item.icon size={20} strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-label mb-1 text-ink/50">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="break-all text-[16px] font-semibold transition-colors hover:text-accent">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-[16px] font-semibold">{item.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-5xl bg-ink p-8 text-white">
                <p className="mb-6 flex items-center gap-3 text-[18px] font-semibold">
                  <MessageSquare size={20} className="text-accent" aria-hidden="true" />
                  What happens next
                </p>
                <ol className="space-y-5">
                  {NEXT_STEPS.map((step, i) => (
                    <li key={step} className="flex gap-4 text-[15px] leading-relaxed text-white/70">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-[12px] font-semibold text-white">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </section>

      <FAQSection items={GENERAL_FAQS.slice(0, 4)} showContact={false} title="Before you write" />
    </>
  )
}
