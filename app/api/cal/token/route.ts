import { NextResponse } from 'next/server'

export async function GET() {
  const accessToken = process.env.CAL_ACCESS_TOKEN
  if (!accessToken) {
    return NextResponse.json({ accessToken: null })
  }
  return NextResponse.json({ accessToken })
}
