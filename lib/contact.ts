export type ContactIntent = 'contact' | 'newsletter'

type UnknownRecord = Record<string, unknown>

export interface ContactSubmissionPayload {
  intent?: 'contact'
  name: string
  email: string
  company: string
  message: string
  website?: string
  extraData?: UnknownRecord
}

export interface NewsletterSubmissionPayload {
  intent: 'newsletter'
  email: string
  website?: string
  extraData?: UnknownRecord
}

export type SubmissionPayload =
  | ContactSubmissionPayload
  | NewsletterSubmissionPayload

export type SubmissionDetails =
  | (ContactSubmissionPayload & { intent: 'contact' })
  | NewsletterSubmissionPayload

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function sanitizeSingleLine(value: unknown, maxLength: number) {
  if (typeof value !== 'string') {
    return ''
  }

  return value.replace(/\s+/g, ' ').trim().slice(0, maxLength)
}

function sanitizeMultiline(value: unknown, maxLength: number) {
  if (typeof value !== 'string') {
    return ''
  }

  return value
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, maxLength)
}

function asRecord(value: unknown): UnknownRecord | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return undefined
  }

  return value as UnknownRecord
}

export function getSubmissionDetails(raw: unknown):
  | { ok: true; data: SubmissionDetails }
  | { ok: false; error: string; status: number } {
  const body = asRecord(raw)

  if (!body) {
    return { ok: false, error: 'Invalid request body.', status: 400 }
  }

  const intent = body.intent === 'newsletter' ? 'newsletter' : 'contact'
  const email = sanitizeSingleLine(body.email, 160).toLowerCase()
  const website = sanitizeSingleLine(body.website, 200)
  const extraData = asRecord(body.extraData)

  if (!EMAIL_REGEX.test(email)) {
    return { ok: false, error: 'Invalid email address.', status: 400 }
  }

  if (intent === 'newsletter') {
    return {
      ok: true,
      data: {
        intent,
        email,
        website,
        extraData,
      },
    }
  }

  const name = sanitizeSingleLine(body.name, 120)
  const company = sanitizeSingleLine(body.company, 160)
  const message = sanitizeMultiline(body.message, 4000)

  if (!name || !company || !message) {
    return { ok: false, error: 'All fields are required.', status: 400 }
  }

  if (message.length < 20) {
    return {
      ok: false,
      error: 'Please provide more detail (minimum 20 characters).',
      status: 400,
    }
  }

  return {
    ok: true,
    data: {
      intent,
      name,
      email,
      company,
      message,
      website,
      extraData,
    },
  }
}

export function isLikelyBot(payload: SubmissionDetails) {
  const botScore =
    typeof payload.extraData?.botScore === 'number'
      ? payload.extraData.botScore
      : 0

  return Boolean(payload.website) || botScore >= 3
}
