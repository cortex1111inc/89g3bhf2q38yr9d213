import { NextRequest, NextResponse } from 'next/server'
import { getSubmissionDetails, isLikelyBot } from '@/lib/contact'

export const runtime = 'nodejs'

const CC_RECIPIENTS = ['hello@vanspire.in', 'adithyan.n.dileep@gmail.com']
const WEB3FORMS_URL = 'https://api.web3forms.com/submit'

function json(data: Record<string, unknown>, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}

function getTimestamp() {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(new Date())
}

function getRequestMetadata(req: NextRequest, extraData?: Record<string, unknown>) {
  const forwarded = req.headers.get('x-forwarded-for')
  const interaction =
    extraData && typeof extraData.interaction === 'object' && extraData.interaction
      ? (extraData.interaction as Record<string, unknown>)
      : undefined
  const screen =
    extraData && typeof extraData.screen === 'object' && extraData.screen
      ? (extraData.screen as Record<string, unknown>)
      : undefined
  const environment =
    extraData && typeof extraData.environment === 'object' && extraData.environment
      ? (extraData.environment as Record<string, unknown>)
      : undefined
  const botScore =
    extraData && typeof extraData.botScore === 'number' ? extraData.botScore : 0

  return {
    botScore,
    ipAddress:
      forwarded?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'Unknown',
    userAgent: req.headers.get('user-agent') || 'Unknown',
    referrer: req.headers.get('referer') || 'Direct/None',
    origin: req.headers.get('origin') || 'Unknown',
    secChUa: req.headers.get('sec-ch-ua') || 'Unknown',
    secChUaPlatform: req.headers.get('sec-ch-ua-platform') || 'Unknown',
    secChUaMobile: req.headers.get('sec-ch-ua-mobile') || 'Unknown',
    acceptLanguage: req.headers.get('accept-language') || 'Unknown',
    timeOnPageText:
      typeof interaction?.timeOnPage === 'number'
        ? `${(interaction.timeOnPage / 1000).toFixed(1)}s`
        : 'Unknown',
    mouseMoved: interaction?.mouseMoved ? 'Yes' : 'No',
    keyPressed: interaction?.keyPressed ? 'Yes' : 'No',
    clicks: String(
      typeof interaction?.clicks === 'number' ? interaction.clicks : 0,
    ),
    screenText: `${screen?.width ?? '?'}x${screen?.height ?? '?'} | TZ: ${
      typeof extraData?.timezone === 'string' ? extraData.timezone : '?'
    } | Cores: ${environment?.hardwareConcurrency ?? '?'} | Mem: ${
      environment?.deviceMemory ?? '?'
    }`,
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const parsed = getSubmissionDetails(body)

  if (!parsed.ok) {
    return json({ error: parsed.error }, parsed.status)
  }

  const submission = parsed.data

  if (!process.env.WEB3FORMS_KEY) {
    return json({ error: 'Server misconfiguration: Missing access key.' }, 500)
  }

  if (submission.website) {
    return json({ success: true, queued: false, ignored: true })
  }

  const metadata = getRequestMetadata(req, submission.extraData)
  const isPotentialBot = isLikelyBot(submission)

  const commonPayload = {
    access_key: process.env.WEB3FORMS_KEY,
    cc: CC_RECIPIENTS.join(','),
    'Submitted At': `${getTimestamp()} IST`,
    '--- Frontend Security Analysis ---': '-----------------------',
    'Bot Score': String(metadata.botScore),
    'Time on Page': metadata.timeOnPageText,
    'Mouse Moved': metadata.mouseMoved,
    'Key Pressed': metadata.keyPressed,
    Clicks: metadata.clicks,
    'Honeypot Triggered': submission.website ? 'Yes' : 'No',
    'Client Environment': metadata.screenText,
    '--- Server-side Meta Information ---': '-----------------------',
    'IP Address': metadata.ipAddress,
    'User-Agent': metadata.userAgent,
    Referrer: metadata.referrer,
    Origin: metadata.origin,
    Platform: metadata.secChUaPlatform.replace(/"/g, ''),
    Mobile:
      metadata.secChUaMobile === '?1'
        ? 'Yes'
        : metadata.secChUaMobile === 'Unknown'
          ? 'Unknown'
          : 'No',
    'Browser Info': metadata.secChUa,
    Language: metadata.acceptLanguage,
  }

  const formPayload =
    submission.intent === 'newsletter'
      ? {
          ...commonPayload,
          subject: `Newsletter signup from ${submission.email}${isPotentialBot ? ' [POTENTIAL SPAM]' : ''}`,
          from_name: 'Vanspire Website Newsletter',
          replyto: submission.email,
          Source: 'vanspire.in footer newsletter',
          Email: submission.email,
        }
      : {
          ...commonPayload,
          subject: `New enquiry from ${submission.name} - ${submission.company}${isPotentialBot ? ' [POTENTIAL SPAM]' : ''}`,
          from_name: 'Vanspire Contact Form',
          replyto: submission.email,
          Source: 'vanspire.in/contact',
          'Full Name': submission.name,
          Email: submission.email,
          'Company / Organisation': submission.company,
          Message: submission.message,
        }

  try {
    const response = await fetch(WEB3FORMS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'Mozilla/5.0 (Vanspire Serverless)',
        Origin: 'https://vanspire.in',
        Referer:
          submission.intent === 'newsletter'
            ? 'https://vanspire.in/'
            : 'https://vanspire.in/contact',
      },
      body: JSON.stringify(formPayload),
      signal: AbortSignal.timeout(10000),
      cache: 'no-store',
    })

    const text = await response.text()
    let result: Record<string, unknown> | null = null

    try {
      result = text ? (JSON.parse(text) as Record<string, unknown>) : null
    } catch {
      console.error('[Contact API] Invalid Web3Forms response:', text)
      return json({ error: 'Invalid response from the mail service.' }, 502)
    }

    if (!response.ok || result?.success === false) {
      console.error('[Contact API] Web3Forms error:', result)
      return json(
        {
          error:
            typeof result?.message === 'string'
              ? result.message
              : 'Failed to send message.',
        },
        502,
      )
    }

    return json({
      success: true,
      queued: false,
      intent: submission.intent,
    })
  } catch (error) {
    console.error('[Contact API] Unexpected error:', error)
    return json({ error: 'Something went wrong. Please try again.' }, 500)
  }
}
