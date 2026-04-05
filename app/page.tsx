'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function HomePage() {
  const razRef = useRef<HTMLSpanElement>(null)
  const photoRef = useRef<HTMLSpanElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Set initial states
    gsap.set([razRef.current, photoRef.current], { opacity: 0, y: 40 })
    gsap.set(dividerRef.current, { opacity: 0, scaleX: 0, transformOrigin: 'left center' })
    gsap.set([taglineRef.current, ctaRef.current], { opacity: 0, y: 16 })
    gsap.set(scrollRef.current, { opacity: 0 })

    // Animate in sequence
    tl.to(razRef.current, { opacity: 1, y: 0, duration: 1 })
      .to(photoRef.current, { opacity: 1, y: 0, duration: 0.9 }, '-=0.6')
      .to(dividerRef.current, { opacity: 1, scaleX: 1, duration: 0.7 }, '-=0.3')
      .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .to(scrollRef.current, { opacity: 0.4, duration: 0.5 }, '-=0.2')

    return () => { tl.kill() }
  }, [])

  return (
    <div className="relative min-h-[calc(100vh-73px)] flex flex-col items-center justify-center bg-[#F5F5F5] overflow-hidden">
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 20% 80%, #e2e2e2 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #e8e8e8 0%, transparent 60%)',
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <h1 className="font-[family-name:var(--font-cormorant)] font-light leading-none text-[#111111]">
          <span
            ref={razRef}
            className="block text-5xl sm:text-7xl md:text-8xl tracking-[0.35em] uppercase"
          >
            RAZ
          </span>
          <span
            ref={photoRef}
            className="block text-2xl sm:text-4xl md:text-5xl tracking-[0.5em] uppercase mt-2"
          >
            PHOTOGRAPHY
          </span>
        </h1>

        <div ref={dividerRef} className="w-16 h-px bg-[#888888] my-8" />

        {/* TODO: Update tagline if desired */}
        <p
          ref={taglineRef}
          className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[#888888] font-[family-name:var(--font-dm-sans)] font-light"
        >
          Nature &amp; Landscape &nbsp;&middot;&nbsp; Events &amp; Concerts
        </p>

        <Link
          ref={ctaRef}
          href="/gallery"
          className="mt-12 inline-block border border-[#111111] px-10 py-3 text-[10px] tracking-[0.3em] uppercase text-[#111111] font-[family-name:var(--font-dm-sans)] font-light hover:bg-[#111111] hover:text-white transition-all duration-300"
        >
          View Gallery
        </Link>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-0 animate-bounce"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#888888"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  )
}
