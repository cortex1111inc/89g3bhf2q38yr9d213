import Link from 'next/link'
import { SERVICES } from '@/lib/services'
import { TEAM } from '@/lib/people'
import { SITE } from '@/lib/site'

/**
 * "Vanspire at a glance": the canonical, quotable facts about the company in
 * one place. Entity-dense and consistent with the Organization JSON-LD, so
 * search engines and AI assistants see the same facts in both.
 */
export default function FactSheet({ compact = false }: { compact?: boolean }) {
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: 'Company', value: `${SITE.legalName} (trading as ${SITE.name})` },
    {
      label: 'What it is',
      value: 'A founder-led product and IT firm: software, AI, mobile, web, cloud, IT consulting and digital marketing under one team.',
    },
    { label: 'Founded', value: String(SITE.founded) },
    { label: 'Based in', value: `${SITE.location}, serving clients in India and worldwide` },
    {
      label: 'Leadership',
      value: (
        <ul className="space-y-1">
          {TEAM.map((p) => (
            <li key={p.id}>
              <Link href={`/about#${p.id}`} className="font-semibold underline-offset-4 hover:underline">
                {p.name}
              </Link>
              <span className="text-ink/60"> · {p.role}</span>
            </li>
          ))}
        </ul>
      ),
    },
    ...(compact
      ? []
      : [
          {
            label: 'Services',
            value: SERVICES.map((s) => s.name).join(', '),
          },
          { label: 'Product', value: 'Vanspire HMS, a hospital management system (cloud SaaS or on-premise)' },
          { label: 'Languages', value: SITE.languages.join(', ') },
        ]),
    {
      label: 'Contact',
      value: (
        <a href={`mailto:${SITE.email}`} className="font-semibold underline-offset-4 hover:underline">
          {SITE.email}
        </a>
      ),
    },
  ]

  return (
    <dl data-speakable className="divide-y divide-ink/10 overflow-hidden rounded-4xl bg-white">
      {rows.map((row) => (
        <div key={row.label} className="grid gap-1 px-6 py-4 md:grid-cols-12 md:gap-6 md:px-8">
          <dt className="text-label text-ink/50 md:col-span-3 md:pt-1">{row.label}</dt>
          <dd className="text-[15px] leading-relaxed md:col-span-9">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}
