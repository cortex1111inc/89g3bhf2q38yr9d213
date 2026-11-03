'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'

interface AccordionProps {
  items: { question: string; answer: string }[]
  dark?: boolean
}

export default function Accordion({ items, dark = false }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div
            key={item.question}
            className={`rounded-3xl transition-colors duration-300 ${
              dark ? (isOpen ? 'bg-white/10' : 'bg-white/5') : isOpen ? 'bg-white' : 'bg-white/60'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              id={`faq-trigger-${i}`}
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left md:px-8 md:py-6"
            >
              <span
                className={`text-[17px] font-semibold tracking-tight md:text-[19px] ${dark ? 'text-white' : 'text-ink'}`}
              >
                {item.question}
              </span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                  isOpen ? 'rotate-45 bg-accent text-white' : dark ? 'bg-white/10 text-white' : 'bg-ink text-white'
                }`}
              >
                <Plus size={16} aria-hidden="true" />
              </span>
            </button>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
              className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <p
                  className={`px-6 pb-6 text-[15px] leading-relaxed md:px-8 md:pb-8 md:text-base ${dark ? 'text-white/65' : 'text-ink/65'}`}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
