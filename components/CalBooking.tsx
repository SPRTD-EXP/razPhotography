'use client'

export default function CalBooking() {
  const calLink = process.env.NEXT_PUBLIC_CALCOM_LINK

  if (!calLink) {
    return (
      <div className="border border-gray-100 flex items-center justify-center" style={{ height: '700px' }}>
        <p className="text-xs tracking-wide text-[#888888] font-light">
          Set <code>NEXT_PUBLIC_CALCOM_LINK</code> in <code>.env.local</code> to your Cal.com username.
        </p>
      </div>
    )
  }

  return (
    <iframe
      src={`https://cal.com/${calLink}?embed=true&embedType=inline&theme=light`}
      width="100%"
      style={{ height: 'min(700px, 80vh)', minHeight: '500px' }}
      frameBorder="0"
      title="Schedule a session with Raz Photography"
      className="border border-gray-100"
    />
  )
}
