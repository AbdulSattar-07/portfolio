import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date?: string | null, options?: Intl.DateTimeFormatOptions) {
  if (!date) return null
  try {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      ...options,
    }).format(new Date(date))
  } catch {
    return null
  }
}

export function absoluteUrl(path = '/') {
  const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  return `${base.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`
}

export function getMediaUrl(
  media: { url?: string | null } | string | null | undefined,
): string | null {
  if (!media) return null
  if (typeof media === 'string') return media
  return media.url || null
}

export function readingTimeFromText(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}
