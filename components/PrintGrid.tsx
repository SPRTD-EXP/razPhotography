'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PrintProductModal from './PrintProductModal'
import { getImageUrl } from './PhotoGrid'
import type { Photo } from '@/app/gallery/page'

gsap.registerPlugin(ScrollTrigger)

interface PrintGridProps {
  photos: Photo[]
}

export default function PrintGrid({ photos }: PrintGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [modalPhoto, setModalPhoto] = useState<Photo | null>(null)

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.print-card')

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            once: true,
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [photos.length])

  return (
    <>
      {/* Grid */}
      <div ref={gridRef} className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {photos.map((photo) => {
          const imgUrl = getImageUrl(photo)
          return (
            <div
              key={photo._id}
              className="print-card break-inside-avoid mb-4 group cursor-pointer opacity-0"
              onClick={() => setModalPhoto(photo)}
            >
              <div className="relative overflow-hidden bg-[#F5F5F5]">
                <Image
                  src={imgUrl}
                  alt={photo.printTitle || photo.title || 'Print'}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  unoptimized={imgUrl.endsWith('.svg')}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-400 flex items-center justify-center">
                  <span className="text-white text-[10px] tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Order Print
                  </span>
                </div>
              </div>
              <div className="pt-2 pb-1">
                <p className="text-xs text-[#888888] font-light">
                  {photo.printTitle || photo.title}
                </p>
                <p className="text-[10px] text-[#888888] tracking-wide">
                  Click to order
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {photos.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-[#888888] text-sm tracking-wider font-light">
            No prints available yet.
          </p>
        </div>
      )}

      {modalPhoto && (
        <PrintProductModal
          photo={modalPhoto}
          onClose={() => setModalPhoto(null)}
        />
      )}
    </>
  )
}
