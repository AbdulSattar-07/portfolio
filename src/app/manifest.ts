import type { MetadataRoute } from 'next'

import { SITE_NAME } from '@/lib/constants'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: 'Professional portfolio',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b0f14',
    theme_color: '#1ab8a8',
  }
}
