import type { Metadata } from 'next'
import CalBooking from '@/components/CalBooking'

export const metadata: Metadata = {
  title: 'Bookings — Raz Photography',
  description: 'Book a photography session with Raz. Nature, landscape, events and concerts.',
}

export default function BookingsPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24">
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

      {/* Cal.com Atoms Booker */}
      <CalBooking />
    </section>
  )
}
