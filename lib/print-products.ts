export interface PrintSize {
  id: string
  label: string
  price: number // cents
  prodigiSku: string
}

export interface PrintProduct {
  id: string
  label: string
  description: string
  sizes: PrintSize[]
}

export const PRODUCTS: PrintProduct[] = [
  {
    id: 'fine-art',
    label: 'Fine Art Print',
    description: 'Giclée on premium archival paper',
    sizes: [
      { id: '8x10',  label: '8×10"',  price: 3500,  prodigiSku: 'GLOBAL-PHO-8x10' },
      { id: '12x16', label: '12×16"', price: 5500,  prodigiSku: 'GLOBAL-PHO-12x16' },
      { id: '18x24', label: '18×24"', price: 8500,  prodigiSku: 'GLOBAL-PHO-18x24' },
      { id: '24x36', label: '24×36"', price: 13000, prodigiSku: 'GLOBAL-PHO-24x36' },
    ],
  },
  {
    id: 'canvas',
    label: 'Canvas Print',
    description: 'Gallery-wrapped canvas, ready to hang',
    sizes: [
      { id: '12x16', label: '12×16"', price: 7500,  prodigiSku: 'GLOBAL-CAN-12x16' },
      { id: '18x24', label: '18×24"', price: 11000, prodigiSku: 'GLOBAL-CAN-18x24' },
      { id: '24x36', label: '24×36"', price: 16500, prodigiSku: 'GLOBAL-CAN-24x36' },
    ],
  },
  {
    id: 'framed',
    label: 'Framed Print',
    description: 'Fine art print in a black wood frame',
    sizes: [
      { id: '8x10',  label: '8×10"',  price: 7000,  prodigiSku: 'GLOBAL-FRP-8x10' },
      { id: '12x16', label: '12×16"', price: 10000, prodigiSku: 'GLOBAL-FRP-12x16' },
      { id: '18x24', label: '18×24"', price: 15000, prodigiSku: 'GLOBAL-FRP-18x24' },
    ],
  },
  {
    id: 'mug',
    label: 'Photo Mug',
    description: '11oz ceramic mug with your photo',
    sizes: [
      { id: '11oz', label: '11oz', price: 2200, prodigiSku: 'GLOBAL-MUG-11oz' },
    ],
  },
]

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}
