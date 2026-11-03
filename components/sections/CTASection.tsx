import Image from 'next/image'
import Button from '@/components/ui/Button'
import Marquee from '@/components/ui/Marquee'
import MotionWrapper from '@/components/ui/MotionWrapper'
import { SITE } from '@/lib/site'

interface CTASectionProps {
  title?: React.ReactNode
  description?: string
  primaryLabel?: string
  primaryHref?: string
}

export default function CTASection({
  title = (
    <>
      Have an idea? <span className="text-accent">Let&apos;s build it</span> together.
    </>
  ),
  description = 'Tell us what you are working on. We will come back within one working day with honest thoughts, no sales pitch.',
  primaryLabel = 'Start a project',
  primaryHref = '/contact',
}: CTASectionProps) {
  return (
    <section className="px-3 pb-3 pt-6 md:px-4 md:pt-10">
      <div className="relative overflow-hidden rounded-5xl bg-ink text-white">
        <Image
          src="/img/ai-red-chip.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
          aria-hidden="true"
        />
        <div className="bg-dots absolute inset-0" aria-hidden="true" />
        <div className="relative z-10">
          <Marquee
            className="border-b border-white/10 py-6 font-impact text-[clamp(3rem,8vw,7rem)] uppercase leading-none tracking-wide text-white/80"
            itemClassName="text-outline"
            items={['Strategy', 'Design', 'Engineering', 'AI', 'Growth']}
            separator={<span className="mx-8 inline-block h-3 w-3 rounded-full bg-accent" />}
          />
          <div className="container-site py-20 text-center md:py-28">
            <MotionWrapper>
              <h2 className="text-display-lg mx-auto mb-6 max-w-4xl">{title}</h2>
              <p className="mx-auto mb-10 max-w-xl text-lg text-white/65">{description}</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button href={primaryHref} variant="accent" size="lg">{primaryLabel}</Button>
                <Button href={`mailto:${SITE.email}`} variant="ghost" size="lg" arrow={false}>
                  {SITE.email}
                </Button>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </div>
    </section>
  )
}
