import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vanspire',
    short_name: 'Vanspire',
    description:
      'Vanspire builds scalable digital systems, enterprise software, and cloud-ready platforms.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0a0a0a',
    orientation: 'portrait',
    lang: 'en-IN',
    categories: ['business', 'productivity', 'technology'],
    icons: [
      {
        src: '/icon-192.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icon-512.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/ogimage.webp',
        sizes: '1200x630',
        type: 'image/webp',
      },
    ],
  }
}
