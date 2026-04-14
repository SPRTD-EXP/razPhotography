'use client'

import { useEffect, useState } from 'react'
// Import Cal Atoms CSS (Tailwind v4 version)
import '@calcom/atoms/globals.min.css'
import { CalOAuthProvider, Booker } from '@calcom/atoms'

export default function CalBooker() {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const clientId = process.env.NEXT_PUBLIC_CAL_OAUTH_CLIENT_ID ?? ''
  const username = process.env.NEXT_PUBLIC_CAL_USERNAME ?? ''
  const eventSlug = process.env.NEXT_PUBLIC_CAL_EVENT_SLUG ?? ''

  useEffect(() => {
    fetch('/api/cal/token')
      .then((r) => r.json())
      .then((data) => {
        setAccessToken(data.accessToken ?? null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // Show setup message if env vars not configured
  if (!clientId || !username || !eventSlug) {
    return (
      <div className="border border-gray-100 bg-[#F5F5F5] flex flex-col items-center justify-center py-16 px-8 text-center gap-3">
        <p className="text-xs text-[#888888] font-light tracking-wide">
          Cal.com Atoms not configured yet.
        </p>
        <p className="text-[10px] text-[#888888] font-light">
          Set <code className="bg-white px-1 text-[#111111]">NEXT_PUBLIC_CAL_OAUTH_CLIENT_ID</code>,{' '}
          <code className="bg-white px-1 text-[#111111]">NEXT_PUBLIC_CAL_USERNAME</code>, and{' '}
          <code className="bg-white px-1 text-[#111111]">NEXT_PUBLIC_CAL_EVENT_SLUG</code> in .env.local
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-6 h-6 border border-[#111111] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!accessToken) {
    return (
      <div className="border border-gray-100 bg-[#F5F5F5] flex flex-col items-center justify-center py-16 px-8 text-center gap-3">
        <p className="text-xs text-[#888888] font-light tracking-wide">
          Calendar not connected.
        </p>
        <p className="text-[10px] text-[#888888] font-light">
          Visit{' '}
          <code className="bg-white px-1 text-[#111111]">/api/cal/authorize</code>{' '}
          to complete Cal.com OAuth setup.
        </p>
      </div>
    )
  }

  return (
    <CalOAuthProvider
      clientId={clientId}
      accessToken={accessToken}
      options={{
        apiUrl: 'https://api.cal.com/v2',
        refreshUrl: '/api/cal/refresh',
      }}
    >
      <Booker
        username={username}
        eventSlug={eventSlug}
        view="MONTH_VIEW"
        customClassNames={{
          bookerContainer: 'font-[family-name:var(--font-dm-sans)] bg-white border border-gray-100',
          eventMetaCustomClassNames: {
            eventMetaContainer: 'bg-[#F5F5F5] border-0 !p-6',
            eventMetaTitle: 'font-[family-name:var(--font-cormorant)] font-light text-2xl text-[#111111] tracking-wide',
            eventMetaTimezoneSelect: 'text-xs text-[#888888] border border-gray-200 bg-white rounded-none',
          },
          datePickerCustomClassNames: {
            datePickerContainer: 'bg-white',
            datePickerDatesActive: '!bg-[#111111] !text-white !rounded-none',
            datePickerToggle: 'text-[#111111] hover:text-[#888888] transition-colors',
            datePickerDate: 'hover:!bg-[#F5F5F5] !rounded-none transition-colors',
          },
          availableTimeSlotsCustomClassNames: {
            availableTimeSlotsContainer: 'bg-white',
            availableTimeSlotsTitle: 'text-xs tracking-[0.2em] uppercase text-[#888888] font-light',
            availableTimes: '!border !border-[#111111] !rounded-none !text-[#111111] !text-sm !font-light hover:!bg-[#111111] hover:!text-white !transition-colors !duration-200',
          },
          confirmStep: {
            confirmButton: '!bg-[#111111] !text-white !rounded-none !tracking-[0.2em] !uppercase !text-[10px] !font-[family-name:var(--font-dm-sans)] hover:!bg-[#333333] !transition-colors',
            backButton: '!border !border-[#111111] !text-[#111111] !rounded-none !text-[10px] !tracking-[0.2em] !uppercase hover:!bg-[#F5F5F5] !transition-colors',
          },
        }}
      />
    </CalOAuthProvider>
  )
}
