import { type SubmissionPayload } from '@/lib/contact'

type QueueEntry = {
  id: string
  createdAt: string
  payload: SubmissionPayload
}

const STORAGE_KEY = 'vanspire:submission-queue'

function isBrowser() {
  return typeof window !== 'undefined'
}

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function readQueue(): QueueEntry[] {
  if (!isBrowser()) {
    return []
  }

  const rawValue = window.localStorage.getItem(STORAGE_KEY)

  if (!rawValue) {
    return []
  }

  try {
    const parsed = JSON.parse(rawValue) as QueueEntry[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeQueue(entries: QueueEntry[]) {
  if (!isBrowser()) {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function queueSubmission(payload: SubmissionPayload) {
  const nextQueue = [
    ...readQueue(),
    {
      id: createId(),
      createdAt: new Date().toISOString(),
      payload,
    },
  ]

  writeQueue(nextQueue)
  return nextQueue.length
}

export function getQueuedSubmissionCount() {
  return readQueue().length
}

async function sendSubmission(payload: SubmissionPayload) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Submission failed')
  }
}

export async function flushQueuedSubmissions() {
  if (!isBrowser()) {
    return { sent: 0, remaining: 0, sentIntents: [] as Array<'contact' | 'newsletter'> }
  }

  if (!navigator.onLine) {
    return {
      sent: 0,
      remaining: getQueuedSubmissionCount(),
      sentIntents: [] as Array<'contact' | 'newsletter'>,
    }
  }

  const queue = readQueue()

  if (queue.length === 0) {
    return { sent: 0, remaining: 0, sentIntents: [] as Array<'contact' | 'newsletter'> }
  }

  let sent = 0
  const sentIntents: Array<'contact' | 'newsletter'> = []
  const remaining: QueueEntry[] = []

  for (const entry of queue) {
    try {
      await sendSubmission(entry.payload)
      sent += 1
      sentIntents.push(entry.payload.intent === 'newsletter' ? 'newsletter' : 'contact')
    } catch {
      remaining.push(entry)
    }
  }

  writeQueue(remaining)

  return {
    sent,
    remaining: remaining.length,
    sentIntents,
  }
}
