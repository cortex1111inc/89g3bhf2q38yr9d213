import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { WorkItem } from '@/lib/work'

interface WorkCardProps {
  item: WorkItem
  size?: 'default' | 'large'
}

export default function WorkCard({ item, size = 'default' }: WorkCardProps) {
  return (
    <Link href={`/work/${item.slug}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-4xl bg-white transition-transform duration-500 hover:-translate-y-1">
        <div className={`relative overflow-hidden ${size === 'large' ? 'aspect-[16/10] lg:aspect-auto lg:min-h-[22rem] lg:flex-1' : 'aspect-[4/3]'}`}>
          <Image
            src={`/img/${item.image}.webp`}
            alt={item.imageAlt}
            fill
            sizes={size === 'large' ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 33vw, 100vw'}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span
            className={`absolute left-4 top-4 rounded-full px-3.5 py-1.5 text-[12px] font-semibold ${
              item.kind === 'Product' ? 'bg-accent text-white' : 'bg-white text-ink'
            }`}
          >
            {item.kind}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6 md:p-8">
          <p className="text-label mb-3 text-ink/50">{item.category}</p>
          <h3 className={`mb-3 font-semibold leading-tight tracking-tight ${size === 'large' ? 'text-3xl' : 'text-[22px]'}`}>
            {item.title}
          </h3>
          <p className="mb-6 flex-1 text-[15px] leading-relaxed text-ink/60">{item.summary}</p>
          <span className="inline-flex items-center gap-2 text-[14px] font-semibold">
            View details
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-accent">
              <ArrowUpRight size={15} aria-hidden="true" />
            </span>
          </span>
        </div>
      </article>
    </Link>
  )
}
