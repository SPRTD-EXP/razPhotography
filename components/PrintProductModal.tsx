'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { useCart } from '@/lib/cart-store'
import { PRODUCTS, formatPrice } from '@/lib/print-products'
import { getImageUrl } from './PhotoGrid'
import type { Photo } from '@/app/gallery/page'

interface PrintProductModalProps {
  photo: Photo
  onClose: () => void
}

export default function PrintProductModal({ photo, onClose }: PrintProductModalProps) {
  const { addItem } = useCart()
  const [activeProductId, setActiveProductId] = useState<string>(PRODUCTS[0].id)
  const [activeSizeId, setActiveSizeId] = useState<string>(PRODUCTS[0].sizes[0].id)
  const [quantity, setQuantity] = useState<number>(1)
  const [added, setAdded] = useState<boolean>(false)
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const activeProduct = PRODUCTS.find((p) => p.id === activeProductId)!
  const activeSize =
    activeProduct.sizes.find((s) => s.id === activeSizeId) ?? activeProduct.sizes[0]
  const imgUrl = getImageUrl(photo)

  const handleProductChange = (productId: string) => {
    setActiveProductId(productId)
    const product = PRODUCTS.find((p) => p.id === productId)!
    setActiveSizeId(product.sizes[0].id)
  }

  const handleAddToCart = () => {
    addItem({
      photoId: photo._id,
      photoTitle: photo.printTitle || photo.title || '',
      imageUrl: imgUrl,
      productId: activeProduct.id,
      productLabel: activeProduct.label,
      sizeId: activeSize.id,
      sizeLabel: activeSize.label,
      price: activeSize.price,
      prodigiSku: activeSize.prodigiSku,
    })
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      onClose()
    }, 1200)
  }

  if (!mounted) return null

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 z-50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div className="fixed bottom-0 left-0 right-0 md:inset-0 md:flex md:items-center md:justify-center z-50 pointer-events-none">
        <div
          className="pointer-events-auto bg-white max-h-[90vh] overflow-y-auto w-full md:max-w-3xl md:rounded-none flex flex-col md:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left: photo */}
          <div className="md:w-1/2 flex-shrink-0 bg-[#F5F5F5] relative min-h-[220px] md:min-h-0">
            <Image
              src={imgUrl}
              alt={photo.printTitle || photo.title || 'Print'}
              fill
              className="object-cover"
              unoptimized={imgUrl.endsWith('.svg')}
            />
          </div>

          {/* Right: controls */}
          <div className="md:w-1/2 flex flex-col p-6 relative">
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-5 text-[#888888] hover:text-[#111111] text-2xl font-light transition-colors duration-200 leading-none"
              aria-label="Close"
            >
              &times;
            </button>

            {/* Photo title */}
            <h2
              className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[#111111] pr-6 leading-snug"
            >
              {photo.printTitle || photo.title}
            </h2>

            {/* Category badge */}
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#888888] mt-1">
              {photo.category}
            </p>

            {/* Divider */}
            <div className="border-t border-[#F5F5F5] my-4" />

            {/* Product type */}
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#888888] mb-2">
              Product Type
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              {PRODUCTS.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductChange(product.id)}
                  className={`text-[10px] tracking-[0.2em] uppercase px-4 py-2 transition-colors duration-200 ${
                    activeProductId === product.id
                      ? 'bg-[#111111] text-white'
                      : 'border border-[#111111] text-[#111111] hover:bg-[#F5F5F5]'
                  }`}
                >
                  {product.label}
                </button>
              ))}
            </div>

            {/* Product description */}
            <p className="text-xs text-[#888888] font-light mt-2 mb-4">
              {activeProduct.description}
            </p>

            {/* Size */}
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#888888] mb-2">
              Size
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {activeProduct.sizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setActiveSizeId(size.id)}
                  className={`text-[10px] tracking-[0.2em] uppercase px-4 py-2 transition-colors duration-200 ${
                    activeSizeId === size.id
                      ? 'bg-[#111111] text-white'
                      : 'border border-[#111111] text-[#111111] hover:bg-[#F5F5F5]'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>

            {/* Price */}
            <p className="text-xl font-light text-[#111111] mb-4">
              {formatPrice(activeSize.price)}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-3 mb-6">
              <label
                htmlFor="print-quantity"
                className="text-[10px] tracking-[0.2em] uppercase text-[#888888]"
              >
                Quantity
              </label>
              <input
                id="print-quantity"
                type="number"
                min={1}
                max={10}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(10, Number(e.target.value))))}
                className="w-14 border border-[#F5F5F5] text-center text-sm text-[#111111] py-1 focus:outline-none focus:border-[#888888] transition-colors duration-200"
              />
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={added}
              className="w-full bg-[#111111] text-white text-[10px] tracking-[0.2em] uppercase py-3 transition-colors duration-200 hover:bg-[#333333] disabled:bg-[#888888] flex items-center justify-center gap-2"
            >
              {added ? (
                <>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Added!
                </>
              ) : (
                'Add to Cart'
              )}
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  )
}
