'use client'

import { useState, FormEvent } from 'react'

interface ContactFormProps {
  simplified?: boolean
}

const shootTypes = [
  'Nature / Landscape',
  'Events / Concerts',
  'Portrait',
  'Other',
]

export default function ContactForm({ simplified = false }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      // TODO: Replace PLACEHOLDER with your actual Formspree form ID
      // Sign up free at https://formspree.io to get your form ID
      const response = await fetch('https://formspree.io/f/PLACEHOLDER', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        // Fallback: open mailto link
        const name = data.get('name') || ''
        const email = data.get('email') || ''
        const message = data.get('message') || ''
        // TODO: Replace with Raz's actual email
        window.location.href = `mailto:razphotography@email.com?subject=Inquiry from ${name}&body=From: ${name} (${email})%0A%0A${message}`
      }
    } catch {
      // TODO: Replace with Raz's actual email
      window.location.href = 'mailto:razphotography@email.com'
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="py-12 text-center">
        <div className="w-10 h-px bg-[#888888] mx-auto mb-6" />
        <p className="font-[family-name:var(--font-cormorant)] font-light text-2xl text-[#111111] tracking-wide">
          Thank you.
        </p>
        <p className="text-sm text-[#888888] mt-3 font-light tracking-wider">
          I&apos;ll be in touch soon.
        </p>
      </div>
    )
  }

  const inputClass =
    'w-full border-0 border-b border-gray-200 bg-transparent py-3 px-0 text-sm text-[#111111] font-light placeholder-[#aaaaaa] focus:outline-none focus:border-[#111111] transition-colors duration-200'

  const labelClass =
    'block text-[10px] tracking-[0.2em] uppercase text-[#888888] mb-1 font-light'

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            className={inputClass}
          />
        </div>
      </div>

      {/* Subject or Shoot type */}
      {simplified ? (
        <div>
          <label htmlFor="shoot-type" className={labelClass}>
            Type of Shoot
          </label>
          <select
            id="shoot-type"
            name="shoot_type"
            required
            defaultValue=""
            className={`${inputClass} cursor-pointer`}
          >
            <option value="" disabled>
              Select a shoot type
            </option>
            {shootTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div>
          <label htmlFor="subject" className={labelClass}>
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            placeholder="What&apos;s this about?"
            className={inputClass}
          />
        </div>
      )}

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about your project or inquiry..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#111111] text-white text-[10px] tracking-[0.3em] uppercase py-4 font-light hover:bg-[#333333] active:bg-black transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
