'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'What We Brings', href: '/services' },
  { name: 'Insights', href: '/insights' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const darkHeroRoutes = ['/']
  const isDarkHeroRoute = darkHeroRoutes.includes(pathname)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [menuOpen])

  const isSolid = !isDarkHeroRoute || scrolled
  const navTextColor = isSolid ? 'text-brand-black hover:text-brand-muted' : 'text-white/80 hover:text-white'
  const logoSrc = isSolid ? '/blacklogo.svg' : '/whitelogo.svg'
  const ctaClasses = isSolid 
    ? 'bg-brand-black text-white border-brand-black hover:bg-white hover:text-brand-black'
    : 'bg-white text-brand-black border-white hover:bg-transparent hover:text-white hover:border-white'
  const mobileMenuIconColor = isSolid ? 'text-brand-black' : 'text-white'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolid
          ? 'bg-white border-b border-brand-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container-site flex items-center justify-between h-[75px] md:h-[85px]">
        {/* Logo */}
        <Link href="/" aria-label="Vanspire home" className="flex items-center">
          <Image
            src={logoSrc}
            alt="Vanspire"
            width={160}
            height={32}
            className="h-8 w-auto transition-all duration-300"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item, index) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            return (
              <Link
                key={index}
                href={item.href}
                className={`relative text-[14px] font-light transition-colors duration-300 group ${navTextColor} ${
                  isActive && item.href !== '/' ? 'opacity-100' : ''
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-current transition-all duration-300 ${
                    isActive && item.href !== '/' ? 'w-full opacity-40' : 'w-0 group-hover:w-full opacity-30'
                  }`}
                />
              </Link>
            )
          })}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className={`hidden lg:inline-flex items-center h-[42px] px-6 text-[13px] font-medium border transition-all duration-300 hover:scale-[0.98] ${ctaClasses}`}
        >
          Get in Touch
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          className="lg:hidden p-2"
        >
          <Menu
            size={22}
            className={`transition-colors duration-300 ${mobileMenuIconColor}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-300 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />

        <div
          id="mobile-navigation"
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white flex flex-col transform transition-transform duration-300 ease-out ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-6 h-[75px] border-b border-brand-border">
            <Image src="/blacklogo.svg" alt="Vanspire" width={160} height={32} className="h-8 w-auto" />
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X size={20} className="text-brand-black" />
            </button>
          </div>

          <nav className="flex flex-col flex-1 overflow-y-auto px-6 py-6 gap-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block py-4 text-[15px] font-light text-brand-black border-b border-brand-border hover:text-brand-muted transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="px-6 py-6 border-t border-brand-border">
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center h-[50px] leading-[50px] bg-brand-black text-white text-[14px] font-medium hover:bg-brand-muted transition-colors duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
