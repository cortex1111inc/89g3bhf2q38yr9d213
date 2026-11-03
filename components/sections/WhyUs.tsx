import Image from 'next/image'
import { Check } from 'lucide-react'
import MotionWrapper from '@/components/ui/MotionWrapper'
import SectionLabel from '@/components/ui/SectionLabel'
import { WHY_US } from '@/lib/content'

export default function WhyUs() {
  return (
    <section className="section-pad">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <MotionWrapper className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-5xl">
              <Image src="/img/cowork-2.webp" alt="Designer and developer collaborating" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              <div className="absolute inset-x-4 bottom-4 rounded-3xl bg-white/95 p-5 backdrop-blur md:inset-x-6 md:bottom-6 md:p-6">
                <p className="text-[15px] font-semibold leading-snug">
                  &ldquo;The people who scope your project are the people who build it.&rdquo;
                </p>
                <p className="mt-2 text-[13px] text-ink/55">How Vanspire works</p>
              </div>
            </div>
          </MotionWrapper>

          <div className="lg:col-span-7">
            <MotionWrapper>
              <SectionLabel>Why Vanspire</SectionLabel>
              <h2 className="text-display-md mb-12">A firm you can hold accountable, without agency overhead.</h2>
            </MotionWrapper>
            <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {WHY_US.map((item, i) => (
                <MotionWrapper key={item.title} delay={i * 0.08}>
                  <div className="border-t border-ink/15 pt-6">
                    <span className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white">
                      <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    <h3 className="mb-2 text-[20px] font-semibold tracking-tight">{item.title}</h3>
                    <p className="text-[15px] leading-relaxed text-ink/60">{item.description}</p>
                  </div>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
