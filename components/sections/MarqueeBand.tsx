import Marquee from '@/components/ui/Marquee'
import { MARQUEE_WORDS } from '@/lib/content'

/** Tilted coral ticker placed under the hero, echoing the template's marquee band. */
export default function MarqueeBand() {
  return (
    <div className="relative z-10 overflow-hidden py-8 md:py-12" aria-hidden="true">
      <div className="-mx-6 -rotate-2 bg-accent py-4 text-white shadow-lg md:py-5">
        <Marquee
          className="text-[clamp(1.4rem,3vw,2.4rem)] font-semibold tracking-tight"
          items={MARQUEE_WORDS}
          separator={<span className="mx-6 text-white/60 md:mx-10">✦</span>}
        />
      </div>
      <div className="-mx-6 mt-[-1.1rem] rotate-1 bg-ink py-3 text-white md:mt-[-1.4rem] md:py-4">
        <Marquee
          reverse
          className="font-impact text-[clamp(1.2rem,2.4vw,1.9rem)] uppercase tracking-wider"
          items={[...MARQUEE_WORDS].reverse()}
          separator={<span className="mx-6 text-accent md:mx-10">/</span>}
        />
      </div>
    </div>
  )
}
