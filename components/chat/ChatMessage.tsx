'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ReactNode } from 'react'

export interface Message {
  id: string
  role: 'user' | 'bot'
  text: string
  cta?: { label: string; href: string }
}

interface ChatMessageProps {
  message: Message
  index: number
}

function renderText(text: string): ReactNode[] {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }

    const label = match[1]
    const href = match[2]

    parts.push(
      <a
        key={match.index}
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="font-medium underline decoration-white/30 underline-offset-2 hover:decoration-white transition-all duration-200"
      >
        {label}
      </a>,
    )

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }

  return parts.length > 0 ? parts : [text]
}

export default function ChatMessage({ message, index }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[82%] ${
          isUser
            ? 'bg-white text-[#0a0a0a] rounded-2xl rounded-br-sm px-4 py-3'
            : 'bg-[#1e1e1e] text-[#e5e5e5] border border-[#5e5e5e] rounded-2xl rounded-bl-sm px-4 py-3'
        }`}
      >
        {message.text.split('\n\n').map((paragraph, paragraphIndex) => (
          <p
            key={paragraphIndex}
            className={`text-[13.5px] font-light leading-[1.7] ${
              paragraphIndex > 0 ? 'mt-2' : ''
            } ${isUser ? 'text-[#0a0a0a]' : 'text-[#d4d4d4]'}`}
          >
            {renderText(paragraph)}
          </p>
        ))}

        {!isUser && message.cta && (
          <Link
            href={message.cta.href}
            className="inline-flex items-center gap-1.5 mt-3 text-[12px] font-medium text-white border-b border-white/20 pb-0.5 hover:border-white transition-colors"
          >
            {message.cta.label} <span aria-hidden="true">-&gt;</span>
          </Link>
        )}
      </div>
    </motion.div>
  )
}
