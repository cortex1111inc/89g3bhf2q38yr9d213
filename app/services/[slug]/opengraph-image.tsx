import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from '@/lib/og'
import { SERVICES, getService } from '@/lib/services'

export const alt = 'Vanspire service'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getService(slug)
  return renderOgCard({
    eyebrow: 'Vanspire service',
    title: service?.name ?? 'Vanspire services',
    subtitle: service?.tagline,
  })
}
