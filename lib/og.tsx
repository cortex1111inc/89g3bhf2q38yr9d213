import { ImageResponse } from 'next/og'
import { SITE } from '@/lib/site'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

interface OgCardInput {
  title: string
  eyebrow?: string
  subtitle?: string
}

/** Branded 1200x630 share card (PNG), used for Open Graph and Twitter images. */
export function renderOgCard({ title, eyebrow, subtitle }: OgCardInput) {
  const titleSize = title.length > 60 ? 56 : title.length > 36 ? 68 : 84

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#101010',
          color: '#ffffff',
          padding: '64px 72px',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', right: -140, top: -140, width: 460, height: 460, borderRadius: 460, background: '#f14f44', opacity: 0.9, display: 'flex' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>
          <div style={{ width: 18, height: 18, borderRadius: 4, background: '#f14f44', display: 'flex' }} />
          {SITE.name}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 860 }}>
          {eyebrow && (
            <div style={{ fontSize: 26, letterSpacing: 4, textTransform: 'uppercase', color: '#f14f44', fontWeight: 600, display: 'flex' }}>
              {eyebrow}
            </div>
          )}
          <div style={{ fontSize: titleSize, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, display: 'flex' }}>{title}</div>
          {subtitle && <div style={{ fontSize: 30, color: 'rgba(255,255,255,0.65)', lineHeight: 1.3, display: 'flex' }}>{subtitle}</div>}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: 'rgba(255,255,255,0.55)' }}>
          <span>{SITE.tagline}</span>
          <span>vanspire.in</span>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  )
}
