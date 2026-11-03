'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin, ArrowUpRight, Linkedin, Instagram, Twitter, Youtube, Facebook } from 'lucide-react'
import { flushQueuedSubmissions, queueSubmission } from '@/lib/contactQueue'
import { SERVICES } from '@/lib/services'
import { SITE } from '@/lib/site'

const footerLinks = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Our work', href: '/work' },
    { name: 'How we work', href: '/process' },
    { name: 'Insights', href: '/insights' },
    { name: 'Careers', href: '/careers' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
}

const socials = [
  { name: 'LinkedIn', href: SITE.social.linkedin, Icon: Linkedin },
  { name: 'Instagram', href: SITE.social.instagram, Icon: Instagram },
  { name: 'X (Twitter)', href: SITE.social.twitter, Icon: Twitter },
  { name: 'YouTube', href: SITE.social.youtube, Icon: Youtube },
  { name: 'Facebook', href: SITE.social.facebook, Icon: Facebook },
]

type SubscribeStatus = 'idle' | 'submitting' | 'success' | 'queued' | 'error'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<SubscribeStatus>('idle')
  const [error, setError] = useState('')
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  useEffect(() => {
    const syncQueuedSubmissions = async () => {
      const result = await flushQueuedSubmissions()
      if (result.sentIntents.includes('newsletter')) {
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

  const handleSubscribe = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    const payload = {
      intent: 'newsletter' as const,
      email: email.trim(),
      extraData: {
        source: 'footer-newsletter',
      },
    }

    setStatus('submitting')
    setError('')

    if (!navigator.onLine) {
      queueSubmission(payload)
      setStatus('queued')
      setEmail('')
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        setStatus('error')
        setError(result.error || 'Could not save your email. Please try again.')
        return
      }

      setStatus('success')
      setEmail('')
    } catch (fetchError) {
      if (!navigator.onLine || fetchError instanceof TypeError) {
        queueSubmission(payload)
        setStatus('queued')
        setEmail('')
        return
      }

      setStatus('error')
      setError('Could not save your email. Please try again.')
    }
  }

  const year = new Date().getFullYear()

  return (
    <footer className="px-3 pb-3 md:px-4 md:pb-4" aria-label="Site footer">
      <div className="overflow-hidden rounded-5xl bg-ink text-white">
        <div className="container-site py-16 md:py-20">
          <div className="mb-16 grid gap-12 lg:grid-cols-2 lg:gap-24">
            <div>
              <Link href="/" className="mb-8 inline-block" aria-label="Vanspire home">
                <Image src="/whitelogo.svg" alt="Vanspire" width={160} height={32} className="h-8 w-auto" />
              </Link>
              <p className="mb-8 max-w-sm text-[15px] leading-relaxed text-white/60">
                A product and IT firm. We design, build and grow software, AI, mobile and web products, and the
                marketing that brings them to market.
              </p>
              <address className="mb-8 not-italic"><ul className="space-y-3 text-[14px] text-white/55">
                <li className="flex items-center gap-3">
                  <MapPin size={15} className="shrink-0 text-accent" aria-hidden="true" />
                  {SITE.location}
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={15} className="shrink-0 text-accent" aria-hidden="true" />
                  <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-white">
                    {SITE.email}
                  </a>
                </li>
              </ul></address>
              <div className="flex gap-2">
                {socials.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent"
                  >
                    <Icon size={16} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-4 text-[11px] uppercase tracking-widest text-white/40">Stay informed</p>
              <p className="mb-6 text-3xl font-semibold leading-tight tracking-tighter md:text-4xl">
                Practical thinking on tech,
                <br />
                straight to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="w-full sm:max-w-md" noValidate>
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <div className="flex w-full items-center rounded-full bg-white/10 p-1.5 focus-within:ring-2 focus-within:ring-accent">
                  <input
                    id="footer-email"
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value)
                      setError('')
                    }}
                    disabled={status === 'submitting'}
                    className="h-11 min-w-0 flex-1 bg-transparent px-4 text-[14px] text-white outline-none placeholder:text-white/40"
                  />
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="h-11 shrink-0 rounded-full bg-accent px-6 text-[13px] font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
                  >
                    {status === 'submitting'
                      ? 'Saving...'
                      : status === 'success'
                        ? 'Subscribed'
                        : status === 'queued'
                          ? 'Queued'
                          : 'Subscribe'}
                  </button>
                </div>
                <p className="mt-3 pl-4 text-[13px] text-white/45" aria-live="polite">
                  {status === 'queued'
                    ? "Saved offline. We'll submit this when you're back online."
                    : status === 'success'
                      ? "Thanks. We'll keep you posted."
                      : 'Occasional updates on software, AI and growth. No spam.'}
                </p>
                {error && <p className="mt-2 pl-4 text-[13px] text-red-400">{error}</p>}
              </form>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 border-t border-white/10 pt-12 md:grid-cols-4">
            <div className="col-span-2">
              <p className="mb-5 text-[11px] uppercase tracking-widest text-white/40">Services</p>
              <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {SERVICES.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group inline-flex items-center gap-1 text-[14px] text-white/60 transition-colors hover:text-white"
                    >
                      {service.short}
                      <ArrowUpRight size={12} className="opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-5 text-[11px] uppercase tracking-widest text-white/40">Company</p>
              <ul className="space-y-3">
                {footerLinks.company.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-[14px] text-white/60 transition-colors hover:text-white">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-5 text-[11px] uppercase tracking-widest text-white/40">Legal</p>
              <ul className="space-y-3">
                {footerLinks.legal.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-[14px] text-white/60 transition-colors hover:text-white">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container-site flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
            <p className="text-[13px] text-white/40">
              &copy; {year} {SITE.legalName}. All rights reserved.
            </p>
            <p className="text-[13px] text-white/30">Product to IT. One firm.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
