import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#F5F5F5] border-t border-gray-200 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="font-[family-name:var(--font-cormorant)] font-light text-sm tracking-[0.3em] uppercase text-[#111111] hover:text-[#888888] transition-colors duration-200"
        >
          RAZ PHOTOGRAPHY
        </Link>

        {/* Copyright */}
        <p className="text-xs text-[#888888] tracking-wider">
          © {year} Raz Photography. All rights reserved.
        </p>

        {/* Instagram */}
        {/* TODO: Update href to Raz's actual Instagram URL */}
        <a
          href="https://www.instagram.com/razphotographyofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#888888] hover:text-[#111111] transition-colors duration-200"
          aria-label="Follow on Instagram"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
          </svg>
          Instagram
        </a>
      </div>
    </footer>
  )
}
