/**
 * Convert YouTube / Vimeo / direct video URLs into an embeddable form.
 */
export type ParsedVideo =
  | { kind: 'youtube'; id: string; embedUrl: string }
  | { kind: 'vimeo'; id: string; embedUrl: string }
  | { kind: 'file'; src: string }
  | null

export function parseVideoUrl(raw?: string | null): ParsedVideo {
  if (!raw) return null
  const url = raw.trim()
  if (!url) return null

  // Direct media file
  if (/\.(mp4|webm|ogg)(\?|$)/i.test(url) || url.startsWith('/api/media/')) {
    return { kind: 'file', src: url }
  }

  // YouTube: watch, youtu.be, embed, shorts
  const yt =
    url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/) ||
    url.match(/[?&]v=([A-Za-z0-9_-]{6,})/)
  if (yt?.[1]) {
    return {
      kind: 'youtube',
      id: yt[1],
      embedUrl: `https://www.youtube-nocookie.com/embed/${yt[1]}`,
    }
  }

  // Vimeo
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeo?.[1]) {
    return {
      kind: 'vimeo',
      id: vimeo[1],
      embedUrl: `https://player.vimeo.com/video/${vimeo[1]}`,
    }
  }

  // Fallback: treat as file/src if it looks like a URL
  if (/^https?:\/\//i.test(url)) {
    return { kind: 'file', src: url }
  }

  return null
}
