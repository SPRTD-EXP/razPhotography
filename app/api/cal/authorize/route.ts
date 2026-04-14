import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const clientId = process.env.NEXT_PUBLIC_CAL_OAUTH_CLIENT_ID
  if (!clientId) {
    return NextResponse.json({ error: 'NEXT_PUBLIC_CAL_OAUTH_CLIENT_ID not set' }, { status: 500 })
  }

  const origin = req.headers.get('origin') || 'http://localhost:3000'
  const redirectUri = `${origin}/api/cal/callback`

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
  })

  return NextResponse.redirect(`https://app.cal.com/oauth2/authorize?${params.toString()}`)
}
