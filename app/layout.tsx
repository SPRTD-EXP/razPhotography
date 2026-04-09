import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { CartProvider } from '@/lib/cart-store'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Raz Photography',
  description: 'Nature, landscape, events & concerts photography by Raz.',
  openGraph: {
    title: 'Raz Photography',
    description: 'Nature, landscape, events & concerts photography by Raz.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable}`}
      style={{ colorScheme: 'light' }}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen flex flex-col bg-white text-[#111111] antialiased">
        <CartProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
