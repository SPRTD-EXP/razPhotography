'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const bioColRef = useRef<HTMLDivElement>(null)
  const gearColRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header block: fade up in sequence
      gsap.set([eyebrowRef.current, headingRef.current, dividerRef.current], {
        opacity: 0,
        y: 24,
      })
      gsap.to([eyebrowRef.current, headingRef.current, dividerRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
      })

      // Bio column — scroll triggered
      gsap.fromTo(
        bioColRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bioColRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      )

      // Gear column — scroll triggered, slight delay after bio
      gsap.fromTo(
        gearColRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gearColRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="max-w-5xl mx-auto px-6 py-24">
      {/* Page heading */}
      <div className="mb-16">
        <p
          ref={eyebrowRef}
          className="text-[10px] tracking-[0.3em] uppercase text-[#888888] mb-4 font-light opacity-0"
        >
          The Photographer
        </p>
        <h1
          ref={headingRef}
          className="font-[family-name:var(--font-cormorant)] font-light text-5xl md:text-6xl text-[#111111] tracking-wide leading-tight opacity-0"
        >
          About Raz
        </h1>
        <div ref={dividerRef} className="w-12 h-px bg-[#888888] mt-8 opacity-0" />
      </div>

      {/* Two-column: Bio + Gear */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left: Bio */}
        <div ref={bioColRef} className="opacity-0">
          <h2 className="font-[family-name:var(--font-cormorant)] font-light text-2xl text-[#111111] tracking-wide mb-6">
            Bio
          </h2>
          {/* TODO: Replace with Raz's actual bio */}
          <p className="text-[#111111] leading-relaxed font-light text-sm mb-6">
            Raz is a passionate photographer based in [Location], specializing
            in the quiet drama of nature and landscape photography alongside the
            raw energy of live events and concerts. With an eye for light,
            moment, and emotion, each image tells a story that lingers long
            after the shutter clicks.
          </p>
          {/* TODO: Add second paragraph with more personal details */}
          <p className="text-[#888888] leading-relaxed font-light text-sm">
            Whether deep in a forest at golden hour or front-row at a sold-out
            show, Raz brings the same commitment to craft — chasing the
            extraordinary in everyday moments.
          </p>
        </div>

        {/* Right: Gear */}
        <div ref={gearColRef} className="opacity-0">
          <h2 className="font-[family-name:var(--font-cormorant)] font-light text-2xl text-[#111111] tracking-wide mb-6">
            Camera &amp; Gear
          </h2>
          {/* TODO: Update gear list with Raz's actual equipment */}
          <ul className="space-y-4">
            {[
              { category: 'Camera', item: 'Sony A7 IV' },
              { category: 'Lens', item: 'Sony 24-70mm f/2.8 GM II' },
              { category: 'Lens', item: 'Sony 70-200mm f/2.8 GM OSS II' },
              { category: 'Lens', item: 'Sony 85mm f/1.4 GM' },
              { category: 'Bag', item: 'Peak Design Everyday Backpack' },
              { category: 'Tripod', item: 'Peak Design Travel Tripod' },
            ].map((gear, i) => (
              <li
                key={i}
                className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0"
              >
                <span className="text-[10px] tracking-[0.15em] uppercase text-[#888888] font-light mt-0.5 w-14 shrink-0">
                  {gear.category}
                </span>
                <span className="text-sm text-[#111111] font-light">
                  {gear.item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
