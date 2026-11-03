import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import ServiceIcon from '@/components/ui/ServiceIcon'
import type { Service } from '@/lib/services'

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col rounded-4xl bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-ink hover:text-white md:p-8"
    >
      <div className="mb-10 flex items-start justify-between">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-canvas text-ink transition-colors duration-500 group-hover:bg-accent group-hover:text-white">
          <ServiceIcon name={service.icon} size={26} strokeWidth={1.6} />
        </span>
        <span className="text-sm font-medium text-ink/30 transition-colors group-hover:text-white/40">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <h3 className="mb-3 text-[22px] font-semibold leading-tight tracking-tight">{service.name}</h3>
      <p className="mb-8 flex-1 text-[15px] leading-relaxed text-ink/60 transition-colors group-hover:text-white/65">
        {service.summary}
      </p>
      <span className="inline-flex items-center gap-2 text-[14px] font-semibold">
        Explore service
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-accent">
          <ArrowUpRight size={15} aria-hidden="true" />
        </span>
      </span>
    </Link>
  )
}
