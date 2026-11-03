import { type MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

// AI search / answer-engine crawlers we explicitly welcome. A bot-specific group
// overrides the "*" group, so each one repeats the disallow list.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Amazonbot',
  'DuckAssistBot',
  'MistralAI-User',
  'CCBot',
]

// Never block /_next/: Google needs those assets to render and evaluate pages.
const DISALLOW = ['/api/', '/offline']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/', disallow: DISALLOW })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
