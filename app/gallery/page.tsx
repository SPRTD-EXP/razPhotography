import type { Metadata } from 'next'
import PhotoGrid from '@/components/PhotoGrid'

export const metadata: Metadata = {
  title: 'Gallery — Raz Photography',
  description: 'Browse nature, landscape, events and concerts photography by Raz.',
}

export interface Photo {
  _id: string
  title: string
  image: {
    asset: {
      _ref: string
      url?: string
    }
    hotspot?: { x: number; y: number }
  }
  category: 'Nature/Landscape' | 'Events/Concerts'
  order: number
  availableAsPrint?: boolean
  printTitle?: string
}

// Placeholder photos for dev (shown when Sanity is not connected)
const placeholderPhotos: Photo[] = [
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
  {
    _id: 'ph-4',
    title: 'Live Stage',
    image: { asset: { _ref: '', url: '/placeholder-4.svg' } },
    category: 'Events/Concerts',
    order: 4,
  },
  {
    _id: 'ph-5',
    title: 'Forest Path',
    image: { asset: { _ref: '', url: '/placeholder-5.svg' } },
    category: 'Nature/Landscape',
    order: 5,
  },
]

async function getPhotos(): Promise<Photo[]> {
  // If Sanity project ID is not set, return placeholder photos
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return placeholderPhotos
  }

  try {
    const { client } = await import('@/sanity/client')
    const photos = await client.fetch<Photo[]>(
      `*[_type == "photo"] | order(order asc) {
        _id,
        title,
        image {
          asset-> { _ref, url },
          hotspot
        },
        category,
        order
      }`
    )
    return photos.length > 0 ? photos : placeholderPhotos
  } catch {
    return placeholderPhotos
  }
}

export default async function GalleryPage() {
  const photos = await getPhotos()

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#888888] mb-4 font-light">
          Portfolio
        </p>
        <h1 className="font-[family-name:var(--font-cormorant)] font-light text-5xl md:text-6xl text-[#111111] tracking-wide leading-tight">
          Gallery
        </h1>
        <div className="w-12 h-px bg-[#888888] mt-8" />
      </div>

      <PhotoGrid photos={photos} />
    </section>
  )
}
