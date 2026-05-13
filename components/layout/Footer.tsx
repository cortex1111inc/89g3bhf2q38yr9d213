'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Mail } from 'lucide-react'
import { flushQueuedSubmissions, queueSubmission } from '@/lib/contactQueue'

const footerLinks = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Ventures', href: '/ventures' },
    { name: 'Insights', href: '/insights' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'Software Platforms', href: '/ventures/technology/services/software-web-platforms' },
    { name: 'Application Development', href: '/ventures/technology/services/application-development' },
    { name: 'Cloud Architecture', href: '/ventures/technology/services/cloud-system-architecture' },
    { name: 'IoT Solutions', href: '/ventures/technology/services/iot-smart-solutions' },
    { name: 'Digital Transformation', href: '/ventures/technology/services/digital-transformation' },
  ],
  legal: [
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
}

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
    <footer className="bg-brand-black text-white">
      <div className="container-site py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-20">
          <div>
            <Link href="/" className="inline-block mb-8">
              <Image src="/whitelogo.svg" alt="Vanspire" width={160} height={32} className="h-8 w-auto" />
            </Link>
            <p className="text-white/50 font-light text-[15px] leading-relaxed max-w-sm mb-8">
              A future-focused brand group building technology-driven ventures.
              Structured for the long term.
            </p>

            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/40 text-[14px] font-light">
                <MapPin size={14} className="flex-shrink-0" />
                India
              </li>
              <li className="flex items-center gap-3 text-white/40 text-[14px] font-light">
                <Mail size={14} className="flex-shrink-0" />
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-white/30 mb-4">
              Stay informed
            </p>
            <h3 className="text-2xl md:text-3xl font-light tracking-tighter text-white mb-6 leading-tight">
              Thought leadership,<br />straight to your inbox.
            </h3>
            <form onSubmit={handleSubscribe} className="w-full sm:max-w-md">
              <div className="flex gap-0 w-full sm:ml-0">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    setError('')
                  }}
                  disabled={status === 'submitting'}
                  className="flex-1 px-3 sm:px-4 h-[48px] text-[14px] bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none focus:border-white/30 transition-colors font-light"
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="h-[48px] px-4 sm:px-6 bg-white text-brand-black text-[13px] font-medium hover:bg-white/90 transition-colors disabled:opacity-60 flex-shrink-0"
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
              <p className="mt-2 text-[13px] text-white/40" aria-live="polite">
                {status === 'queued'
                  ? "Saved offline. We'll submit this when you're back online."
                  : status === 'success'
                    ? "Thanks. We'll keep you posted."
                    : 'Occasional updates on technology, systems, and ventures.'}
              </p>
              {error && <p className="text-red-400 text-[13px] mt-2">{error}</p>}
            </form>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 pt-12 border-t border-white/10">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-white/30 mb-5">Company</p>
            <ul className="space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[14px] font-light text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <p className="text-[11px] uppercase tracking-widest text-white/30 mb-5">Services</p>
            <ul className="space-y-3">
              {footerLinks.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[14px] font-light text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-white/30 mb-5">Legal</p>
            <ul className="space-y-3">
              {footerLinks.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[14px] font-light text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col sm:flex-row justify-between items-center gap-4 py-6">
          <p className="text-[13px] text-white/30 font-light">
            Copyright {year} Vanspire. All rights reserved.
          </p>
          <p className="text-[13px] text-white/20 font-light">
            Building tomorrow&apos;s ventures, today.
          </p>
        </div>
      </div>
    </footer>
  )
}
