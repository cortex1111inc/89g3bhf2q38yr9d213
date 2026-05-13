'use client'

import MotionWrapper from '@/components/ui/MotionWrapper'
import SectionLabel from '@/components/ui/SectionLabel'
import { useEffect, useState } from 'react'
import { type ContactSubmissionPayload } from '@/lib/contact'
import { flushQueuedSubmissions, queueSubmission } from '@/lib/contactQueue'

type FormState = {
  name: string
  email: string
  company: string
  message: string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'queued' | 'error'

const INITIAL_FORM: FormState = { name: '', email: '', company: '', message: '' }

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
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
      setInteractions((previous) =>
        previous.mouseMoved ? previous : { ...previous, mouseMoved: true },
      )
    const handleKeyDown = () =>
      setInteractions((previous) =>
        previous.keyPressed ? previous : { ...previous, keyPressed: true },
      )
    const handleClick = () =>
      setInteractions((previous) => ({ ...previous, clicks: previous.clicks + 1 }))

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

    const payload: ContactSubmissionPayload = {
      ...form,
      website: honeypot,
      extraData: {
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
      setForm(INITIAL_FORM)
      setHoneypot('')
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
      setForm(INITIAL_FORM)
      setHoneypot('')
    } catch (fetchError) {
      if (!navigator.onLine || fetchError instanceof TypeError) {
        queueSubmission(payload)
        setStatus('queued')
        setForm(INITIAL_FORM)
        setHoneypot('')
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

  return (
    <>
      <section className="pt-40 pb-24 md:pt-48 md:pb-28 bg-white">
        <div className="container-site">
          <MotionWrapper>
            <SectionLabel>Contact</SectionLabel>
          </MotionWrapper>
          <MotionWrapper delay={0.1}>
            <h1 className="text-display-lg text-brand-black max-w-3xl mt-4 mb-8">
              Let&apos;s start with a conversation.
            </h1>
          </MotionWrapper>
          <MotionWrapper delay={0.2}>
            <p className="text-body-lg text-brand-muted max-w-2xl">
              Whether you are exploring a technology partnership, seeking enterprise software
              solutions, or want to understand what Vanspire is building - we welcome serious
              enquiries. Use the form below and our team will respond within two business days.
            </p>
          </MotionWrapper>
        </div>
      </section>

      <div className="divider" />

      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <MotionWrapper className="lg:col-span-7">
              {status === 'success' || status === 'queued' ? (
                <div className="bg-brand-offwhite border border-brand-border p-12 text-center">
                  <h2 className="text-xl font-light tracking-tight text-brand-black mb-3">
                    {status === 'queued' ? 'Saved offline.' : 'Message received.'}
                  </h2>
                  <p className="text-[14px] font-light text-brand-muted">
                    {status === 'queued'
                      ? "Your enquiry is queued on this device and will sync automatically when you're back online."
                      : "Thank you. We'll review your enquiry and respond within two business days."}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-6 h-[48px] px-8 bg-brand-black text-white text-[14px] font-medium hover:bg-brand-muted transition-colors duration-300"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="text-label text-brand-muted block mb-2">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={`w-full h-[50px] px-4 border text-[14px] font-light bg-white text-brand-black placeholder-brand-border outline-none focus:border-brand-black transition-colors duration-200 ${
                          errors.name ? 'border-red-400' : 'border-brand-border'
                        }`}
                      />
                      {errors.name && <p className="text-red-400 text-[12px] mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="text-label text-brand-muted block mb-2">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={`w-full h-[50px] px-4 border text-[14px] font-light bg-white text-brand-black placeholder-brand-border outline-none focus:border-brand-black transition-colors duration-200 ${
                          errors.email ? 'border-red-400' : 'border-brand-border'
                        }`}
                      />
                      {errors.email && <p className="text-red-400 text-[12px] mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="company" className="text-label text-brand-muted block mb-2">
                      Company / Organisation *
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Company name"
                      className={`w-full h-[50px] px-4 border text-[14px] font-light bg-white text-brand-black placeholder-brand-border outline-none focus:border-brand-black transition-colors duration-200 ${
                        errors.company ? 'border-red-400' : 'border-brand-border'
                      }`}
                    />
                    {errors.company && <p className="text-red-400 text-[12px] mt-1">{errors.company}</p>}
                  </div>

                  <div className="mb-8">
                    <label htmlFor="message" className="text-label text-brand-muted block mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project, requirements, or enquiry..."
                      className={`w-full px-4 py-3 border text-[14px] font-light bg-white text-brand-black placeholder-brand-border outline-none focus:border-brand-black transition-colors duration-200 resize-none ${
                        errors.message ? 'border-red-400' : 'border-brand-border'
                      }`}
                    />
                    {errors.message && <p className="text-red-400 text-[12px] mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="h-[52px] px-10 bg-brand-black text-white text-[14px] font-medium hover:bg-brand-muted transition-colors duration-300 disabled:opacity-60"
                  >
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </MotionWrapper>

            <MotionWrapper delay={0.15} className="lg:col-span-5">
              <div className="space-y-10 pt-2">
                <div>
                  <p className="text-label text-brand-muted mb-3">Email</p>
                  <a href="mailto:hello@vanspire.in" className="text-[16px] font-light text-brand-black hover:text-brand-muted transition-colors">
                    hello@vanspire.in
                  </a>
                </div>

                <div>
                  <p className="text-label text-brand-muted mb-3">Response time</p>
                  <p className="text-[15px] font-light text-brand-black">Within 2 business days</p>
                </div>

                <div>
                  <p className="text-label text-brand-muted mb-3">Location</p>
                  <p className="text-[15px] font-light text-brand-black">India</p>
                </div>

                <div className="border-t border-brand-border pt-8">
                  <p className="text-[13px] font-light text-brand-muted leading-relaxed">
                    We work with organisations globally. Our Technology venture is fully
                    operational and accepting new engagements. Enterprise enquiries only.
                  </p>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </section>
    </>
  )
}
