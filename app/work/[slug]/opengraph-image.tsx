import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from '@/lib/og'
import { WORK, getWork } from '@/lib/work'

export const alt = 'Vanspire work'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
  return WORK.map((w) => ({ slug: w.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getWork(slug)
  return renderOgCard({
    eyebrow: item ? `${item.kind} · ${item.category}` : 'Vanspire work',
    title: item?.title ?? 'Vanspire work',
    subtitle: item?.summary,
  })
}
