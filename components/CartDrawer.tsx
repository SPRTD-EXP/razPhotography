'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { useCart } from '@/lib/cart-store'
import { formatPrice } from '@/lib/print-products'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQty, total } = useCart()
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const count = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (err) {
      console.error('Checkout error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 z-[100] transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-[101] w-full max-w-sm bg-white flex flex-col transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
          <div className="flex items-baseline gap-2">
            <span className="font-[family-name:var(--font-cormorant)] text-xl font-light tracking-wide text-[#111111]">
              Cart
            </span>
            <span className="text-xs text-[#888888]">({count} {count === 1 ? 'item' : 'items'})</span>
          </div>
          <button
            onClick={onClose}
            className="text-[#888888] hover:text-[#111111] transition-colors duration-200"
            aria-label="Close cart"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          {items.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-[#888888]">Your cart is empty.</p>
            </div>
          ) : (
            <ul>
              {items.map((item) => (
                <li key={item.id} className="relative flex gap-4 py-5 border-b border-gray-100 last:border-0">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden bg-[#F5F5F5]">
                    <Image
                      src={item.imageUrl}
                      alt={item.photoTitle}
                      fill
                      className="object-cover"
                      unoptimized={item.imageUrl.endsWith('.svg')}
                    />
                  </div>

                  {/* Remove × */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-4 right-0 text-[#888888] hover:text-[#111111] transition-colors duration-200"
                    aria-label="Remove item"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>

                  {/* Details */}
                  <div className="flex flex-col gap-1.5 flex-1 min-w-0 pr-5">
                    <p className="text-sm font-light text-[#111111] leading-snug">{item.photoTitle}</p>
                    <p className="text-xs text-[#888888] leading-relaxed">
                      {item.productLabel}<br />
                      {item.sizeLabel}
                    </p>

                    {/* Qty + price row */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQty(item.id, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 flex items-center justify-center text-[#888888] hover:text-[#111111] transition-colors border border-gray-200"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="text-sm text-[#111111] w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#888888] hover:text-[#111111] transition-colors border border-gray-200"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-light text-[#111111]">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm font-light text-[#111111]">Subtotal</span>
            <span className="text-sm text-[#111111]">{formatPrice(total)}</span>
          </div>
          <p className="text-[10px] text-[#888888] mt-1">Shipping calculated at checkout</p>
          <button
            onClick={handleCheckout}
            disabled={loading || items.length === 0}
            className="w-full mt-4 bg-[#111111] text-white text-[10px] tracking-[0.25em] uppercase py-3 hover:bg-[#333333] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Checkout'}
          </button>
        </div>
      </div>
    </>,
    document.body
  )
}
