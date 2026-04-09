'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/lib/cart-store'
import CartDrawer from './CartDrawer'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/bookings', label: 'Bookings' },
  { href: '/prints', label: 'Prints' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { items } = useCart()
  const count = items.reduce((sum, item) => sum + item.quantity, 0)

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
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-[#888888] hover:text-[#111111] transition-colors duration-200"
            aria-label="Open cart"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#111111] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

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
