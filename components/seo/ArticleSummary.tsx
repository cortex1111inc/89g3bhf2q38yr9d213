import { ListChecks } from 'lucide-react'

interface ArticleSummaryProps {
  summary: string
  takeaways: string[]
}

/** "In short" block placed above the article body: a direct summary plus key takeaways. */
export default function ArticleSummary({ summary, takeaways }: ArticleSummaryProps) {
  return (
    <aside data-speakable aria-label="Article summary" className="mb-12 rounded-3xl border border-brand-border bg-brand-offwhite p-7 md:p-9">
      <p className="mb-3 flex items-center gap-2 text-label text-ink/50">
        <ListChecks size={14} className="text-accent" aria-hidden="true" />
        In short
      </p>
      <p className="mb-6 text-[17px] leading-relaxed text-ink/85">{summary}</p>
      <p className="mb-3 text-label text-ink/50">Key takeaways</p>
      <ul className="space-y-2.5">
        {takeaways.map((t) => (
          <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-ink/75">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            {t}
          </li>
        ))}
      </ul>
    </aside>
  )
}
