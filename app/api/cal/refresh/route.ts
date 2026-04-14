import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const refreshToken = process.env.CAL_REFRESH_TOKEN
  const clientId = process.env.NEXT_PUBLIC_CAL_OAUTH_CLIENT_ID
  const clientSecret = process.env.CAL_OAUTH_CLIENT_SECRET

  if (!refreshToken || !clientId || !clientSecret) {
    return NextResponse.json({ error: 'Cal credentials not configured' }, { status: 500 })
  }

  try {
    const res = await fetch('https://api.cal.com/v2/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: 'Token refresh failed', details: data }, { status: 500 })
    }

    return NextResponse.json({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    })
  } catch (err) {
    console.error('Cal refresh error:', err)
    return NextResponse.json({ error: 'Refresh failed' }, { status: 500 })
  }
}
