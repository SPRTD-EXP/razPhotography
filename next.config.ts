import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  // Exclude ruflo/claude-flow runtime files from Turbopack's file watcher
  turbopack: {
    resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.css'],
  },
}

export default nextConfig
