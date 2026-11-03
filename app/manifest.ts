import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vanspire',
    short_name: 'Vanspire',
    description:
      'Vanspire is a product and IT firm building custom software, AI and automation, mobile apps, web platforms and digital marketing.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#f1f2f4',
    theme_color: '#101010',
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
