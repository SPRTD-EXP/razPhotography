import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
    apiVersion: '2026-03-25.dahlia',
  })
}

export async function POST(req: NextRequest) {
  const stripe = getStripe()
  try {
    const { items } = await req.json() as { items: CartItem[] }

    if (!items?.length) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    const origin = req.headers.get('origin') || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: items.map((item) => ({
        price_data: {
          currency: 'usd',
          unit_amount: item.price,
          product_data: {
            name: `${item.photoTitle} — ${item.productLabel} (${item.sizeLabel})`,
            images: item.imageUrl.startsWith('http') ? [item.imageUrl] : [],
            metadata: {
              photoId: item.photoId,
              productId: item.productId,
              sizeId: item.sizeId,
              prodigiSku: item.prodigiSku,
            },
          },
        },
        quantity: item.quantity,
      })),
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'NL', 'SE', 'NO', 'DK'],
      },
      metadata: {
        items: JSON.stringify(items.map((i) => ({
          prodigiSku: i.prodigiSku,
          quantity: i.quantity,
          imageUrl: i.imageUrl,
          title: i.photoTitle,
        }))),
      },
      success_url: `${origin}/prints/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/prints`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}

// Define CartItem inline (avoids cross-file import issues in API routes)
interface CartItem {
  id: string
  photoId: string
  photoTitle: string
  imageUrl: string
  productId: string
  productLabel: string
  sizeId: string
  sizeLabel: string
  quantity: number
  price: number
  prodigiSku: string
}
