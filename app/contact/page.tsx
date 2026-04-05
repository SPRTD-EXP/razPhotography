import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact — Raz Photography',
  description: 'Get in touch with Raz Photography for print inquiries, bookings, and more.',
}

export default function ContactPage() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="mb-12">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#888888] mb-4 font-light">
          Reach Out
        </p>
        <h1 className="font-[family-name:var(--font-cormorant)] font-light text-5xl md:text-6xl text-[#111111] tracking-wide leading-tight">
          Get in Touch
        </h1>
        <div className="w-12 h-px bg-[#888888] mt-8" />
      </div>

      <p className="text-sm text-[#888888] font-light leading-relaxed mb-12">
        Whether you&apos;re interested in a print, booking a session, or just
        want to connect — I&apos;d love to hear from you.
      </p>

      <ContactForm />

      {/* Direct email */}
      <div className="mt-12 pt-8 border-t border-gray-100">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#888888] font-light mb-2">
          Or email directly
        </p>
        {/* TODO: Replace with Raz's actual email address */}
        <a
          href="mailto:razphotography@email.com"
          className="text-sm text-[#111111] hover:text-[#888888] transition-colors duration-200 font-light tracking-wide"
        >
          razphotography@email.com
        </a>
      </div>
    </section>
  )
}
