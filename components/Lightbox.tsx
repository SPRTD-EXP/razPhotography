'use client'

import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import type { Photo } from '@/app/gallery/page'

interface LightboxProps {
  photos: Photo[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
  getImageUrl: (photo: Photo) => string
}

export default function Lightbox({
  photos,
  currentIndex,
  onClose,
  onNavigate,
  getImageUrl,
}: LightboxProps) {
  const photo = photos[currentIndex]
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < photos.length - 1

  const handlePrev = useCallback(() => {
    if (hasPrev) onNavigate(currentIndex - 1)
  }, [hasPrev, currentIndex, onNavigate])

  const handleNext = useCallback(() => {
    if (hasNext) onNavigate(currentIndex + 1)
  }, [hasNext, currentIndex, onNavigate])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, handlePrev, handleNext])

  const imgUrl = getImageUrl(photo)

  return createPortal(
    <div
      className="fixed inset-0 bg-black/92 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-6 text-white/60 hover:text-white text-3xl font-light transition-colors duration-200 z-10 leading-none"
        aria-label="Close"
      >
        &times;
      </button>

      {/* Prev */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            handlePrev()
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200 p-2 z-10"
          aria-label="Previous photo"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Next */}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleNext()
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200 p-2 z-10"
          aria-label="Next photo"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {/* Image + caption */}
      <div
        className="flex flex-col items-center gap-4 max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={imgUrl}
          alt={photo.title || 'Raz Photography'}
          width={1200}
          height={900}
          className="max-h-[80vh] max-w-[85vw] w-auto h-auto object-contain"
          unoptimized={imgUrl.endsWith('.svg')}
          priority
        />
        <div className="text-center">
          {photo.title && (
            <p className="text-white/80 text-sm font-light tracking-wider">
              {photo.title}
            </p>
          )}
          {photo.category && (
            <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase mt-1">
              {photo.category}
            </p>
          )}
          <Link
            href="/contact"
            className="mt-3 inline-block text-[11px] tracking-wider text-white/50 hover:text-white/80 transition-colors duration-200 underline underline-offset-4"
          >
            Interested in a print? Contact to inquire
          </Link>
        </div>
      </div>

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-[10px] tracking-widest">
        {currentIndex + 1} / {photos.length}
      </div>
    </div>,
    document.body
  )
}
