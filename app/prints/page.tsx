import type { Metadata } from 'next'
import PrintGrid from '@/components/PrintGrid'
import type { Photo } from '@/app/gallery/page'

export const metadata: Metadata = {
  title: 'Prints — Raz Photography',
  description: 'Order fine art prints, canvas prints, framed prints and mugs from Raz Photography.',
}

// Placeholder photos shown when Sanity is not connected
const placeholderPrints: Photo[] = [
  {
    _id: 'ph-1',
    title: 'Mountain Mist',
    image: { asset: { _ref: '', url: '/placeholder-1.svg' } },
    category: 'Nature/Landscape',
    order: 1,
  },
  {
    _id: 'ph-2',
    title: 'Concert Crowd',
    image: { asset: { _ref: '', url: '/placeholder-2.svg' } },
    category: 'Events/Concerts',
    order: 2,
  },
  {
    _id: 'ph-3',
    title: 'Golden Hour',
    image: { asset: { _ref: '', url: '/placeholder-3.svg' } },
    category: 'Nature/Landscape',
    order: 3,
  },
]

async function getPrintPhotos(): Promise<Photo[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return placeholderPrints
  }

  try {
    const { client } = await import('@/sanity/client')
    const photos = await client.fetch<Photo[]>(
      `*[_type == "photo" && availableAsPrint == true] | order(order asc) {
        _id,
        title,
        "printTitle": coalesce(printTitle, title),
        image {
          asset-> { _ref, url },
          hotspot
        },
        category,
        order
      }`
    )
    return photos.length > 0 ? photos : placeholderPrints
  } catch {
    return placeholderPrints
  }
}

export default async function PrintsPage() {
  const photos = await getPrintPhotos()

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#888888] mb-4 font-light">
          Shop
        </p>
        <h1 className="font-[family-name:var(--font-cormorant)] font-light text-5xl md:text-6xl text-[#111111] tracking-wide leading-tight">
          Prints
        </h1>
        <div className="w-12 h-px bg-[#888888] mt-8 mb-4" />
        <p className="text-xs text-[#888888] font-light max-w-md">
          Fine art prints, canvas, framed prints and mugs — fulfilled by Prodigi and shipped directly to you.
        </p>
      </div>

      <PrintGrid photos={photos} />
    </section>
  )
}
