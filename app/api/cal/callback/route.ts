import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  if (!code) {
    return NextResponse.json({ error: 'No code in callback' }, { status: 400 })
  }

  const clientId = process.env.NEXT_PUBLIC_CAL_OAUTH_CLIENT_ID
  const clientSecret = process.env.CAL_OAUTH_CLIENT_SECRET
  const origin = req.headers.get('origin') || 'http://localhost:3000'
  const redirectUri = `${origin}/api/cal/callback`

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'Cal OAuth credentials not set' }, { status: 500 })
  }

  const res = await fetch('https://api.cal.com/v2/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    return NextResponse.json({ error: 'Token exchange failed', details: data }, { status: 500 })
  }

  // Return an HTML page showing tokens to copy into .env.local
  const html = `
    <!DOCTYPE html>
    <html>
    <head><title>Cal.com Setup — Raz Photography</title>
    <style>body{font-family:monospace;max-width:700px;margin:40px auto;padding:20px;background:#F5F5F5;}
    h1{font-size:18px;color:#111;}pre{background:#fff;border:1px solid #ddd;padding:16px;word-break:break-all;white-space:pre-wrap;}
    p{color:#888;font-size:13px;}</style></head>
    <body>
    <h1>Cal.com Tokens — Copy into .env.local</h1>
    <p>Add these to your .env.local file and restart the dev server. Do not commit these values.</p>
    <pre>CAL_ACCESS_TOKEN=${data.access_token}
CAL_REFRESH_TOKEN=${data.refresh_token}</pre>
    <p>Setup complete. You can close this tab.</p>
    </body></html>
  `
  return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } })
}
