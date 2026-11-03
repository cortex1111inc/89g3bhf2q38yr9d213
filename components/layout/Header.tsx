'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import ServiceIcon from '@/components/ui/ServiceIcon'
import { NAV_LINKS } from '@/lib/site'
import { SERVICES } from '@/lib/services'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [menuOpen])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header className="fixed inset-x-0 top-3 z-50 md:top-4">
      <div className="container-site">
        <div
          className={`flex h-[64px] items-center justify-between rounded-full border px-4 pl-6 transition-all duration-300 md:h-[72px] md:pl-8 md:pr-3 ${
            scrolled
              ? 'border-ink/5 bg-white/90 shadow-[0_8px_30px_rgba(16,16,16,0.08)] backdrop-blur-xl'
              : 'border-white bg-white'
          }`}
        >
          <Link href="/" aria-label="Vanspire home" className="flex items-center">
            <Image src="/blacklogo.svg" alt="Vanspire" width={160} height={32} priority className="h-7 w-auto md:h-8" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href)
              const linkClasses = `relative flex items-center gap-1 rounded-full px-4 py-2 text-[14px] font-medium transition-colors duration-200 ${
                active ? 'bg-canvas text-ink' : 'text-ink/70 hover:bg-canvas hover:text-ink'
              }`

              if ('mega' in item && item.mega) {
                return (
                  <div key={item.name} className="group relative">
                    <Link href={item.href} className={linkClasses}>
                      {item.name}
                      <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden="true" />
                    </Link>
                    {/* Mega menu */}
                    <div className="invisible absolute left-1/2 top-full w-[720px] -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      <div className="grid grid-cols-2 gap-1 rounded-4xl border border-ink/5 bg-white p-3 shadow-[0_20px_60px_rgba(16,16,16,0.12)]">
                        {SERVICES.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            className="group/item flex items-start gap-4 rounded-3xl p-4 transition-colors hover:bg-canvas"
                          >
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-canvas text-ink transition-colors group-hover/item:bg-accent group-hover/item:text-white">
                              <ServiceIcon name={service.icon} size={20} strokeWidth={1.7} />
                            </span>
                            <span>
                              <span className="block text-[15px] font-semibold leading-tight">{service.short}</span>
                              <span className="mt-1 block text-[13px] leading-snug text-ink/55">{service.tagline}</span>
                            </span>
                          </Link>
                        ))}
                        <Link
                          href="/services"
                          className="col-span-2 mt-1 flex items-center justify-between rounded-3xl bg-ink px-6 py-4 text-[14px] font-semibold text-white transition-colors hover:bg-accent"
                        >
                          View all services
                          <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <Link key={item.name} href={item.href} className={linkClasses}>
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <Button href="/contact" size="md">Get a quote</Button>
            </div>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-300 ${menuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={`absolute right-0 top-0 flex h-full w-full max-w-sm transform flex-col bg-canvas transition-transform duration-300 ease-out ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-[72px] items-center justify-between border-b border-ink/10 px-6">
            <Image src="/blacklogo.svg" alt="Vanspire" width={160} height={32} className="h-7 w-auto" />
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col overflow-y-auto px-6 py-4" aria-label="Mobile">
            {NAV_LINKS.map((item) => {
              if ('mega' in item && item.mega) {
                return (
                  <div key={item.name} className="border-b border-ink/10">
                    <button
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      aria-expanded={mobileServicesOpen}
                      className="flex w-full items-center justify-between py-4 text-left text-[18px] font-semibold"
                    >
                      {item.name}
                      <ChevronDown size={18} className={`transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`grid transition-all duration-300 ${mobileServicesOpen ? 'grid-rows-[1fr] pb-3' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden">
                        <Link href="/services" className="block py-2 pl-3 text-[15px] font-medium text-accent">
                          All services
                        </Link>
                        {SERVICES.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            className="block py-2 pl-3 text-[15px] text-ink/70 hover:text-ink"
                          >
                            {service.short}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`border-b border-ink/10 py-4 text-[18px] font-semibold ${isActive(item.href) ? 'text-accent' : ''}`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="border-t border-ink/10 p-6">
            <Button href="/contact" size="lg" className="w-full justify-between">Get a quote</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
