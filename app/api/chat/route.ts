import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'
import { AI_CONTEXT } from '@/lib/aiContext'
import { findBestMatch } from '@/lib/matchEngine'

export const runtime = 'nodejs'

function json(data: Record<string, unknown>, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}

function buildFallbackReply(message: string) {
  const match = findBestMatch(message)

  return {
    reply: match.response,
    cta: match.cta,
    source: 'local',
  }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const message = typeof body?.message === 'string' ? body.message.trim() : ''

  if (!message) {
    return json({ error: 'Message is required.' }, 400)
  }

  if (message.length > 1500) {
    return json({ error: 'Message is too long.' }, 400)
  }

  if (!process.env.GROQ_API_KEY) {
    return json(buildFallbackReply(message))
  }

  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    })

    const systemPrompt = `
You are Vanspire's AI assistant.

Your purpose is to help visitors understand Vanspire's services, solutions, and products.
You must only answer using the knowledge provided below.

If a question is unrelated to Vanspire or its services, politely guide the user back to topics related to:
- Digital Solutions
- ERP Implementation
- Hospital Management System
- Enterprise System Integration
- Cloud Infrastructure

Response style:
- Clear and professional
- Short paragraphs
- Avoid unnecessary technical jargon
- Suggest relevant Vanspire services where appropriate
- Format links when helpful (e.g. [Vanspire](https://vanspire.in/about), [Contact](https://vanspire.in/contact), [Services](https://vanspire.in/services)) using standard markdown text. Use absolute URLs starting with https://vanspire.in.

Knowledge Base:
${JSON.stringify(AI_CONTEXT, null, 2)}
`

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      temperature: 0.4,
      max_tokens: 1024,
    })

    const reply = completion.choices[0]?.message?.content?.trim()

    if (!reply) {
      return json(buildFallbackReply(message))
    }

    return json({
      reply,
      source: 'groq',
    })
  } catch (error) {
    console.error('Groq AI API Error:', error)
    return json(buildFallbackReply(message))
  }
}
