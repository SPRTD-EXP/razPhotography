import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Bookings — Raz Photography',
  description: 'Book a photography session with Raz. Nature, landscape, events and concerts.',
}

// TODO: Set NEXT_PUBLIC_CALENDLY_URL in your .env.local file
const calendlyUrl =
  process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/razphotography'

export default function BookingsPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="mb-12">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#888888] mb-4 font-light">
          Schedule
        </p>
        <h1 className="font-[family-name:var(--font-cormorant)] font-light text-5xl md:text-6xl text-[#111111] tracking-wide leading-tight">
          Book a Session
        </h1>
        <div className="w-12 h-px bg-[#888888] mt-8" />
      </div>

      {/* No payment notice */}
      <div className="bg-[#F5F5F5] border-l-2 border-[#888888] px-6 py-4 mb-10">
        <p className="text-xs tracking-wide text-[#888888] font-light leading-relaxed">
          No payment is taken on-site. Booking is for scheduling only.
          Payment details will be discussed after we connect.
        </p>
      </div>

      {/* Calendly embed */}
      <div className="mb-16">
        <h2 className="font-[family-name:var(--font-cormorant)] font-light text-2xl text-[#111111] tracking-wide mb-6">
          Schedule a Time
        </h2>
        {/* TODO: Set NEXT_PUBLIC_CALENDLY_URL=your-actual-url in .env.local */}
        <iframe
          src={calendlyUrl}
          width="100%"
          height="700"
          frameBorder="0"
          title="Schedule a session with Raz Photography"
          className="border border-gray-100"
        />
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 my-10">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#888888] font-light">
          or reach out directly
        </span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      {/* Fallback contact form */}
      <div>
        <h2 className="font-[family-name:var(--font-cormorant)] font-light text-2xl text-[#111111] tracking-wide mb-8">
          Send a Message
        </h2>
        <ContactForm simplified />
      </div>
    </section>
  )
}
