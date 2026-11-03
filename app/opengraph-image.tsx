import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from '@/lib/og'

export const alt = 'Vanspire: software, AI, mobile and digital product firm'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderOgCard({
    eyebrow: 'Product to IT. One firm.',
    title: 'We design, build and grow the digital products your business runs on.',
    subtitle: 'Custom software · AI & automation · Mobile · Web · Cloud · IT consulting · Marketing',
  })
}
