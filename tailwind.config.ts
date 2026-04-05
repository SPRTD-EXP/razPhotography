import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'raz-black': '#111111',
        'raz-white': '#FFFFFF',
        'raz-offwhite': '#F5F5F5',
        'raz-gray': '#888888',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-dm-sans)', 'sans-serif'],
      },
      letterSpacing: {
        'widest-2': '0.25em',
        'widest-3': '0.4em',
      },
    },
  },
  plugins: [],
  darkMode: 'class', // disabled — we use light only
}

export default config
