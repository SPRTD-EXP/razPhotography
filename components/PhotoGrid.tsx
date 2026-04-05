'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lightbox from './Lightbox'
import type { Photo } from '@/app/gallery/page'

gsap.registerPlugin(ScrollTrigger)

type Category = 'All' | 'Nature/Landscape' | 'Events/Concerts'

interface PhotoGridProps {
  photos: Photo[]
}

export function getImageUrl(photo: Photo): string {
  if (photo.image?.asset?.url) return photo.image.asset.url
  const ref = photo.image?.asset?._ref
  if (ref && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    const parts = ref.replace('image-', '').split('-')
    const format = parts.pop()
    const id = parts.join('-')
    return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}/${id}.${format}`
  }
  return '/placeholder-1.svg'
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const categories: Category[] = ['All', 'Nature/Landscape', 'Events/Concerts']
  const filtered =
    activeCategory === 'All'
      ? photos
      : photos.filter((p) => p.category === activeCategory)

  // Stagger animate cards when filtered set changes
  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.photo-card')
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'transform',
      }
    )
  }, [filtered.length, activeCategory])

  // ScrollTrigger for cards entering viewport
  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.photo-card')

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

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()) }
  }, [filtered.length])

  return (
    <>
      {/* Category filter */}
      <div className="flex gap-6 mb-10 border-b border-gray-100 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-[10px] tracking-[0.2em] uppercase pb-1 transition-all duration-200 ${
              activeCategory === cat
                ? 'text-[#111111] border-b border-[#111111]'
                : 'text-[#888888] hover:text-[#111111]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div ref={gridRef} className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {filtered.map((photo, idx) => {
          const imgUrl = getImageUrl(photo)
          return (
            <div
              key={photo._id}
              className="photo-card break-inside-avoid mb-4 group cursor-pointer opacity-0"
              onClick={() => setLightboxIndex(idx)}
            >
              <div className="relative overflow-hidden bg-[#F5F5F5]">
                <Image
                  src={imgUrl}
                  alt={photo.title || 'Raz Photography'}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  unoptimized={imgUrl.endsWith('.svg')}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-400 flex items-center justify-center">
                  <span className="text-white text-[10px] tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View
                  </span>
                </div>
              </div>
              <div className="pt-2 pb-1">
                {photo.title && (
                  <p className="text-xs text-[#888888] font-light mb-0.5">
                    {photo.title}
                  </p>
                )}
                <Link
                  href="/contact"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[10px] tracking-wide text-[#888888] hover:text-[#111111] transition-colors duration-200 hover:underline underline-offset-2"
                >
                  Interested in a print? Contact to inquire
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-[#888888] text-sm tracking-wider font-light">
            No photos in this category yet.
          </p>
        </div>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          photos={filtered}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
          getImageUrl={getImageUrl}
        />
      )}
    </>
  )
}
