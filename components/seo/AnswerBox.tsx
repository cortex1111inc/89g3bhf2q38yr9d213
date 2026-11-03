import { Sparkles } from 'lucide-react'

interface AnswerBoxProps {
  /** The question this block answers, shown as a label. */
  question: string
  /** Direct, self-contained answer (40-70 words ideal). */
  answer: string
  /** Optional second line, e.g. "Who it's for". */
  extraLabel?: string
  extra?: string
  dark?: boolean
}

/**
 * Answer-first block: a plain-language question and a direct answer placed
 * high on the page. Marked speakable so voice assistants and answer engines
 * can lift it verbatim.
 */
export default function AnswerBox({ question, answer, extraLabel, extra, dark = false }: AnswerBoxProps) {
  return (
    <aside
      data-speakable
      aria-label={question}
      className={`rounded-4xl p-6 md:p-8 ${dark ? 'bg-white/5 text-white' : 'bg-white'}`}
    >
      <p className={`mb-3 flex items-center gap-2 text-label ${dark ? 'text-white/60' : 'text-ink/50'}`}>
        <Sparkles size={14} className="text-accent" aria-hidden="true" />
        {question}
      </p>
      <p className={`text-[17px] leading-relaxed md:text-[19px] ${dark ? 'text-white/90' : 'text-ink/85'}`}>{answer}</p>
      {extra && (
        <p className={`mt-4 border-t pt-4 text-[15px] leading-relaxed ${dark ? 'border-white/10 text-white/60' : 'border-ink/10 text-ink/60'}`}>
          <strong className={dark ? 'text-white' : 'text-ink'}>{extraLabel}</strong> {extra}
        </p>
      )}
    </aside>
  )
}
