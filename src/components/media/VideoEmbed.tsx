import { parseVideoUrl } from '@/lib/video'

type VideoEmbedProps = {
  url?: string | null
  title?: string
  className?: string
}

export function VideoEmbed({ url, title = 'Project video', className }: VideoEmbedProps) {
  const parsed = parseVideoUrl(url)
  if (!parsed) return null

  if (parsed.kind === 'file') {
    return (
      <div className={className ?? 'overflow-hidden rounded-2xl border border-line bg-ink'}>
        <video
          className="aspect-video w-full"
          controls
          playsInline
          preload="metadata"
          aria-label={title}
        >
          <source src={parsed.src} />
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }

  return (
    <div className={className ?? 'overflow-hidden rounded-2xl border border-line bg-ink'}>
      <div className="relative aspect-video w-full">
        <iframe
          src={parsed.embedUrl}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  )
}
