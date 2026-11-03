import { LAST_UPDATED, LAST_UPDATED_LABEL } from '@/lib/site'

/** Visible freshness stamp, backed by a machine-readable <time> element. */
export default function LastUpdated({ className = '' }: { className?: string }) {
  return (
    <p className={`text-[13px] text-ink/50 ${className}`}>
      Last updated: <time dateTime={LAST_UPDATED}>{LAST_UPDATED_LABEL}</time>
    </p>
  )
}
