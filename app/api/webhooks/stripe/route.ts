import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
    apiVersion: '2026-03-25.dahlia',
  })
}

interface ProdigiOrderItem {
  prodigiSku: string
  quantity: number
  imageUrl: string
  title: string
}

export async function POST(req: NextRequest) {
  const stripe = getStripe()
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      const items: ProdigiOrderItem[] = JSON.parse(session.metadata?.items ?? '[]')
      // shipping_details renamed in newer Stripe API versions — use customer_details as fallback
      const shipping = (session as unknown as Record<string, unknown>).shipping_details as
        | { name?: string; address?: { line1?: string; line2?: string; postal_code?: string; country?: string; city?: string; state?: string } }
        | null
        ?? (session as unknown as Record<string, unknown>).customer_details as
        | { name?: string; address?: { line1?: string; line2?: string; postal_code?: string; country?: string; city?: string; state?: string } }
        | null

      if (!items.length || !shipping?.address) {
        console.warn('No items or shipping address in session')
        return NextResponse.json({ received: true })
      }

      const prodigiOrder = {
        shippingMethod: 'Standard',
        recipient: {
          name: shipping.name ?? 'Customer',
          address: {
            line1: shipping.address.line1 ?? '',
            line2: shipping.address.line2 ?? undefined,
            postalOrZipCode: shipping.address.postal_code ?? '',
            countryCode: shipping.address.country ?? 'US',
            townOrCity: shipping.address.city ?? '',
            stateOrCounty: shipping.address.state ?? undefined,
          },
        },
        items: items.map((item, idx) => ({
          merchantReference: `item-${idx}`,
          sku: item.prodigiSku,
          copies: item.quantity,
          sizing: 'fillPrintArea',
          assets: [
            {
              printArea: 'default',
              url: item.imageUrl,
            },
          ],
        })),
      }

      // TODO: Replace sandbox URL with production when ready: https://api.prodigi.com/v4.0/orders
      const prodigiRes = await fetch('https://api.sandbox.prodigi.com/v4.0/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.PRODIGI_API_KEY ?? '',
        },
        body: JSON.stringify(prodigiOrder),
      })

      if (!prodigiRes.ok) {
        const errText = await prodigiRes.text()
        console.error('Prodigi order failed:', errText)
      } else {
        const prodigiData = await prodigiRes.json()
        console.log('Prodigi order created:', prodigiData.order?.id)
      }
    } catch (err) {
      console.error('Error processing Prodigi order:', err)
    }
  }

  return NextResponse.json({ received: true })
}
