import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Order Confirmed — Raz Photography',
  description: 'Your print order has been received.',
}

export default function PrintSuccessPage() {
  return (
    <section className="min-h-[calc(100vh-73px)] flex flex-col items-center justify-center px-6 text-center bg-[#F5F5F5]">
      <div className="max-w-md">
        {/* Checkmark */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-16 h-16 border border-[#111111] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        <h1 className="font-[family-name:var(--font-cormorant)] font-light text-4xl text-[#111111] tracking-wide mb-4">
          Order Confirmed
        </h1>

        <div className="w-8 h-px bg-[#888888] mx-auto mb-6" />

        <p className="text-sm text-[#888888] font-light leading-relaxed mb-2">
          Thank you for your order. Your print is on its way to production.
        </p>
        <p className="text-sm text-[#888888] font-light leading-relaxed mb-10">
          Prodigi will handle fulfillment and ship directly to you. You'll receive a confirmation email with tracking details.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/prints"
            className="inline-block border border-[#111111] px-8 py-3 text-[10px] tracking-[0.3em] uppercase text-[#111111] font-[family-name:var(--font-dm-sans)] font-light hover:bg-[#111111] hover:text-white transition-all duration-300"
          >
            Browse More Prints
          </Link>
          <Link
            href="/"
            className="inline-block px-8 py-3 text-[10px] tracking-[0.3em] uppercase text-[#888888] font-[family-name:var(--font-dm-sans)] font-light hover:text-[#111111] transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  )
}
