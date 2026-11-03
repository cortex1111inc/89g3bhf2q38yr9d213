'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const DEFAULT_SUGGESTED = [
  { id: 'q1', label: 'What services do you offer?' },
  { id: 'q2', label: 'Can you build AI and automation solutions?' },
  { id: 'q3', label: 'Do you build mobile apps?' },
  { id: 'q4', label: 'What is your Hospital Management System?' },
  { id: 'q5', label: 'How do I work with Vanspire?' },
]

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void
  questions?: { id: string; label: string }[]
}

export default function SuggestedQuestions({ onSelect, questions = DEFAULT_SUGGESTED }: SuggestedQuestionsProps) {
  // Use state to handle staggered animations consistently on mount
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="px-4 pb-4 pt-1">
      <p className="text-[10.5px] uppercase tracking-widest text-[#ffffff]/50 mb-3">
        Suggested questions
      </p>
      <div className="flex flex-col gap-1.5">
        {questions.map((q, i) => (
          <motion.button
            key={q.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.15 + i * 0.07, ease: 'easeOut' }}
            onClick={() => onSelect(q.label)}
            className="text-left text-[13px] font-light text-[#aaaaaa] border border-[#2a2a2a] px-3.5 py-2.5 rounded-lg hover:border-[#555555] hover:bg-[#1e1e1e] hover:text-white transition-all duration-200 leading-[1.4]"
          >
            {q.label}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

