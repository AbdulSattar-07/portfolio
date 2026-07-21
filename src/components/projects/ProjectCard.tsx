import Link from 'next/link'
import Image from 'next/image'

import { TechBadge } from '@/components/ui/Section'
import { formatDate, getMediaUrl } from '@/lib/utils'

type ProjectCardProps = {
  title: string
  slug: string
  shortDescription: string
  coverUrl?: string | null
  coverAlt?: string
  technologies?: string[]
  status?: string | null
  featured?: boolean | null
  completionDate?: string | null
}

export function ProjectCard({
  title,
  slug,
  shortDescription,
  coverUrl,
  coverAlt,
  technologies = [],
  status,
  featured,
  completionDate,
}: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-line bg-panel/50 transition hover:border-accent/50">
      <Link href={`/projects/${slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-ink-soft">
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={coverAlt || title}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-ink-soft to-panel">
              <span className="font-mono text-xs uppercase tracking-widest text-muted">No cover</span>
            </div>
          )}
        </div>
        <div className="space-y-3 p-5">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
            {featured ? <span className="text-accent">Featured</span> : null}
            {status ? <span className="capitalize">{status.replace('-', ' ')}</span> : null}
            {completionDate ? <span>{formatDate(completionDate)}</span> : null}
          </div>
          <h3 className="font-display text-xl font-semibold text-cream group-hover:text-accent">
            {title}
          </h3>
          <p className="line-clamp-3 text-sm text-muted">{shortDescription}</p>
          {technologies.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {technologies.slice(0, 4).map((tech) => (
                <TechBadge key={tech} label={tech} />
              ))}
            </div>
          ) : null}
        </div>
      </Link>
    </article>
  )
}

export function mapProjectCard(doc: {
  title: string
  slug: string
  shortDescription: string
  coverImage?: unknown
  thumbnail?: unknown
  technologies?: unknown
  projectStatus?: string | null
  featured?: boolean | null
  completionDate?: string | null
}) {
  const cover =
    (typeof doc.coverImage === 'object' && doc.coverImage) ||
    (typeof doc.thumbnail === 'object' && doc.thumbnail) ||
    null

  const techNames =
    Array.isArray(doc.technologies)
      ? doc.technologies
          .map((t) => (typeof t === 'object' && t && 'name' in t ? String((t as { name: string }).name) : null))
          .filter(Boolean) as string[]
      : []

  return {
    title: doc.title,
    slug: doc.slug,
    shortDescription: doc.shortDescription,
    coverUrl: getMediaUrl(cover as { url?: string | null }),
    coverAlt:
      typeof cover === 'object' && cover && 'alt' in cover
        ? String((cover as { alt?: string }).alt || doc.title)
        : doc.title,
    technologies: techNames,
    status: doc.projectStatus,
    featured: doc.featured,
    completionDate: doc.completionDate,
  }
}
