'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/bookings', label: 'Bookings' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-[family-name:var(--font-cormorant)] font-light text-sm tracking-[0.3em] uppercase text-[#111111] hover:text-[#888888] transition-colors duration-200"
        >
          RAZ PHOTOGRAPHY
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs tracking-widest uppercase text-[#111111] hover:text-[#888888] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          {/* TODO: Update href to Raz's actual Instagram URL */}
          <a
            href="https://instagram.com/razphotography"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-[#111111] hover:text-[#888888] transition-colors duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-1 text-[#111111]"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="3" y1="7" x2="21" y2="7"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="17" x2="21" y2="17"/>
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-xs tracking-widest uppercase text-[#111111] hover:text-[#888888] transition-colors duration-200 py-1"
            >
              {link.label}
            </Link>
          ))}
          {/* TODO: Update href to Raz's actual Instagram URL */}
          <a
            href="https://instagram.com/razphotography"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase text-[#111111] hover:text-[#888888] transition-colors duration-200 py-1"
          >
            Instagram
          </a>
        </div>
      )}
    </header>
  )
}
