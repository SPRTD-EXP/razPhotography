import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import CalBooking from '@/components/CalBooking'

export const metadata: Metadata = {
  title: 'Bookings — Raz Photography',
  description: 'Book a photography session with Raz. Nature, landscape, events and concerts.',
}

export default function BookingsPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
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

      {/* Side-by-side on desktop, stacked on mobile */}
      <div className="flex flex-col md:flex-row md:gap-16 md:items-start">
        {/* Cal.com embed */}
        <div className="flex-1 mb-16 md:mb-0">
          <h2 className="font-[family-name:var(--font-cormorant)] font-light text-2xl text-[#111111] tracking-wide mb-6">
            Schedule a Time
          </h2>
          <CalBooking />
        </div>

        {/* Divider — horizontal on mobile, vertical on desktop */}
        <div className="flex md:flex-col items-center md:items-stretch gap-4 my-10 md:my-0">
          <div className="flex-1 h-px md:h-auto md:w-px bg-gray-100" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#888888] font-light whitespace-nowrap md:[writing-mode:vertical-lr] md:rotate-180">
            or reach out directly
          </span>
          <div className="flex-1 h-px md:h-auto md:w-px bg-gray-100" />
        </div>

        {/* Contact form */}
        <div className="md:w-80 lg:w-96">
          <h2 className="font-[family-name:var(--font-cormorant)] font-light text-2xl text-[#111111] tracking-wide mb-8">
            Send a Message
          </h2>
          <ContactForm simplified />
        </div>
      </div>
    </section>
  )
}
