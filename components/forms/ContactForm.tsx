'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { type ContactSubmissionPayload } from '@/lib/contact'
import { flushQueuedSubmissions, queueSubmission } from '@/lib/contactQueue'
import { SERVICES } from '@/lib/services'

type FormState = {
  name: string
  email: string
  company: string
  message: string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'queued' | 'error'

const INITIAL_FORM: FormState = { name: '', email: '', company: '', message: '' }
const INTEREST_OPTIONS = [...SERVICES.map((s) => s.short), 'Not sure yet']

const fieldClasses = (hasError?: string) =>
  `w-full rounded-2xl border bg-white px-5 text-[15px] text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-ink ${
    hasError ? 'border-red-400' : 'border-ink/10'
  }`

export default function ContactForm({ source = 'contact' }: { source?: string }) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [interests, setInterests] = useState<string[]>([])
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [interactions, setInteractions] = useState({
    mouseMoved: false,
    keyPressed: false,
    clicks: 0,
  })
  const [loadTime, setLoadTime] = useState(0)
  const [honeypot, setHoneypot] = useState('')

  useEffect(() => {
    setLoadTime(Date.now())

    const handleMouseMove = () =>
      setInteractions((previous) => (previous.mouseMoved ? previous : { ...previous, mouseMoved: true }))
    const handleKeyDown = () =>
      setInteractions((previous) => (previous.keyPressed ? previous : { ...previous, keyPressed: true }))
    const handleClick = () => setInteractions((previous) => ({ ...previous, clicks: previous.clicks + 1 }))

    window.addEventListener('mousemove', handleMouseMove, { once: true })
    window.addEventListener('keydown', handleKeyDown, { once: true })
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  useEffect(() => {
    const syncQueuedSubmissions = async () => {
      const result = await flushQueuedSubmissions()
      if (result.sentIntents.includes('contact')) {
        setStatus('success')
      }
    }

    void syncQueuedSubmissions()

    const handleOnline = () => {
      void syncQueuedSubmissions()
    }

    window.addEventListener('online', handleOnline)
    return () => window.removeEventListener('online', handleOnline)
  }, [])

  const validate = () => {
    const nextErrors: Partial<FormState> = {}

    if (!form.name.trim()) nextErrors.name = 'Name is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Valid email required.'
    if (!form.company.trim()) nextErrors.company = 'Company name is required.'
    if (form.message.trim().length < 20) {
      nextErrors.message = 'Please provide more detail (minimum 20 characters).'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const resetForm = () => {
    setForm(INITIAL_FORM)
    setInterests([])
    setHoneypot('')
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!validate()) {
      return
    }

    setStatus('submitting')
    setErrors({})

    const timeOnPage = Date.now() - loadTime
    const clientNavigator = navigator as Navigator & {
      deviceMemory?: number
      doNotTrack?: string
    }

    let botScore = 0
    if (!interactions.mouseMoved) botScore += 1
    if (!interactions.keyPressed) botScore += 1
    if (timeOnPage < 2000) botScore += 1

    // The mail template only knows name / email / company / message, so selected
    // services are folded into the message body.
    const message = interests.length
      ? `Interested in: ${interests.join(', ')}\n\n${form.message.trim()}`
      : form.message.trim()

    const payload: ContactSubmissionPayload = {
      ...form,
      message,
      website: honeypot,
      extraData: {
        source,
        screen: {
          width: window.screen.width,
          height: window.screen.height,
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
          devicePixelRatio: window.devicePixelRatio,
        },
        environment: {
          userAgent: navigator.userAgent,
          language: navigator.language,
          platform: navigator.platform,
          hardwareConcurrency: navigator.hardwareConcurrency,
          deviceMemory: clientNavigator.deviceMemory || 'Unknown',
          cookieEnabled: navigator.cookieEnabled,
          doNotTrack: clientNavigator.doNotTrack || 'Unknown',
        },
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        interaction: {
          ...interactions,
          timeOnPage,
        },
        botScore,
      },
    }

    if (!navigator.onLine) {
      queueSubmission(payload)
      setStatus('queued')
      resetForm()
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrors({ message: data.error || 'Something went wrong. Please try again.' })
        setStatus('error')
        return
      }

      setStatus('success')
      resetForm()
    } catch (fetchError) {
      if (!navigator.onLine || fetchError instanceof TypeError) {
        queueSubmission(payload)
        setStatus('queued')
        resetForm()
        return
      }

      setErrors({ message: 'Network error. Please check your connection and try again.' })
      setStatus('error')
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '' })
  }

  const toggleInterest = (option: string) =>
    setInterests((current) => (current.includes(option) ? current.filter((i) => i !== option) : [...current, option]))

  if (status === 'success' || status === 'queued') {
    return (
      <div className="rounded-5xl bg-white p-10 text-center md:p-14" role="status">
        <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent">
          <CheckCircle2 size={30} aria-hidden="true" />
        </span>
        <h2 className="mb-3 text-3xl font-semibold tracking-tight">
          {status === 'queued' ? 'Saved offline.' : 'Message received.'}
        </h2>
        <p className="mx-auto max-w-md text-[15px] leading-relaxed text-ink/60">
          {status === 'queued'
            ? "Your enquiry is queued on this device and will sync automatically when you're back online."
            : "Thank you. We'll review your enquiry and respond within two business days."}
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-8 h-12 rounded-full bg-ink px-8 text-[14px] font-semibold text-white transition-colors hover:bg-accent"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-5xl bg-white p-6 sm:p-8 md:p-10">
      <div style={{ display: 'none' }} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <fieldset className="mb-8">
        <legend className="mb-3 text-[13px] font-semibold text-ink/70">I&apos;m interested in (optional)</legend>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((option) => {
            const selected = interests.includes(option)
            return (
              <button
                key={option}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleInterest(option)}
                className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                  selected ? 'border-ink bg-ink text-white' : 'border-ink/10 bg-canvas text-ink hover:border-ink/40'
                }`}
              >
                {option}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-[13px] font-semibold text-ink/70">
            Full name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            aria-invalid={Boolean(errors.name)}
            className={`${fieldClasses(errors.name)} h-14`}
          />
          {errors.name && <p className="mt-1.5 text-[12px] text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-[13px] font-semibold text-ink/70">
            Email address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            className={`${fieldClasses(errors.email)} h-14`}
          />
          {errors.email && <p className="mt-1.5 text-[12px] text-red-500">{errors.email}</p>}
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="company" className="mb-2 block text-[13px] font-semibold text-ink/70">
          Company / organisation *
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          value={form.company}
          onChange={handleChange}
          placeholder="Company name"
          aria-invalid={Boolean(errors.company)}
          className={`${fieldClasses(errors.company)} h-14`}
        />
        {errors.company && <p className="mt-1.5 text-[12px] text-red-500">{errors.company}</p>}
      </div>

      <div className="mb-8">
        <label htmlFor="message" className="mb-2 block text-[13px] font-semibold text-ink/70">
          Tell us about your project *
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={form.message}
          onChange={handleChange}
          placeholder="What are you building or trying to fix? Include goals, timeline and anything we should know."
          aria-invalid={Boolean(errors.message)}
          className={`${fieldClasses(errors.message)} resize-none py-4`}
        />
        {errors.message && <p className="mt-1.5 text-[12px] text-red-500" role="alert">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="group inline-flex h-14 items-center gap-3 rounded-full bg-ink pl-8 pr-1.5 text-[15px] font-semibold text-white transition-colors hover:bg-ink/90 disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending...' : 'Send message'}
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white">→</span>
      </button>
    </form>
  )
}
