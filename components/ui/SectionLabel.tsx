interface SectionLabelProps {
  children: React.ReactNode
  light?: boolean
  className?: string
}

export default function SectionLabel({ children, light = false, className = '' }: SectionLabelProps) {
  return (
    <p
      className={`text-label mb-4 inline-flex items-center gap-2.5 ${light ? 'text-white/60' : 'text-ink/60'} ${className}`}
    >
      <span className="h-2 w-2 rounded-[2px] bg-accent" aria-hidden="true" />
      {children}
    </p>
  )
}
