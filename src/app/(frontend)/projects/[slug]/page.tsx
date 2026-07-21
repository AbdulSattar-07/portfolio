import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { VideoEmbed } from '@/components/media/VideoEmbed'
import { mapProjectCard, ProjectCard } from '@/components/projects/ProjectCard'
import { TechBadge } from '@/components/ui/Section'
import { getProjectBySlug } from '@/lib/payload'
import { lexicalToPlain } from '@/lib/richText'
import { absoluteUrl, formatDate, getMediaUrl } from '@/lib/utils'

export const revalidate = 300

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const project = await getProjectBySlug(slug)
    if (!project) return { title: 'Project' }
    return {
      title: project.seoTitle || project.title,
      description: project.seoDescription || project.shortDescription,
      robots: project.noIndex ? { index: false, follow: false } : undefined,
      alternates: {
        canonical: project.canonicalUrl || absoluteUrl(`/projects/${project.slug}`),
      },
    }
  } catch {
    return { title: 'Project' }
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params

  const project = await getProjectBySlug(slug).catch(() => null)
  if (!project) notFound()

  const cover = getMediaUrl(project.coverImage as { url?: string | null })
  const videoFileUrl = getMediaUrl(
    (project as { videoFile?: { url?: string | null } | number | null }).videoFile as {
      url?: string | null
    },
  )
  const primaryVideo =
    (project as { videoUrl?: string | null }).videoUrl || videoFileUrl || null

  const gallery = Array.isArray(project.gallery)
    ? project.gallery
        .map((item) => {
          if (!item || typeof item !== 'object') return null
          const url = getMediaUrl(item.image as { url?: string | null })
          if (!url) return null
          return {
            url,
            caption: item.caption || '',
            alt:
              typeof item.image === 'object' && item.image && 'alt' in item.image
                ? String((item.image as { alt?: string }).alt || project.title)
                : project.title,
          }
        })
        .filter(Boolean)
    : []

  const extraVideos = Array.isArray((project as { videos?: unknown }).videos)
    ? ((project as { videos: Array<{ title?: string; url?: string; file?: unknown }> }).videos || [])
        .map((item, index) => {
          if (!item || typeof item !== 'object') return null
          const fileUrl = getMediaUrl(item.file as { url?: string | null })
          const url = item.url || fileUrl
          if (!url) return null
          return {
            key: `${index}-${url}`,
            title: item.title || `Video ${index + 1}`,
            url,
          }
        })
        .filter(Boolean)
    : []

  const technologies = Array.isArray(project.technologies)
    ? project.technologies.filter(
        (t): t is Exclude<typeof t, number | string> => typeof t === 'object' && !!t,
      )
    : []
  const related = Array.isArray(project.relatedProjects)
    ? project.relatedProjects.filter(
        (p): p is Exclude<typeof p, number | string> => typeof p === 'object' && !!p,
      )
    : []

  return (
    <article className="section-pad">
      <div className="container-page space-y-10">
        <div className="space-y-4">
          <Link href="/projects" className="text-sm text-muted hover:text-accent">
            ← Projects
          </Link>
          <h1 className="font-display text-4xl font-semibold text-cream sm:text-5xl text-balance">
            {project.title}
          </h1>
          <p className="max-w-3xl text-lg text-muted">{project.shortDescription}</p>
          <div className="flex flex-wrap gap-3 text-sm text-muted">
            {project.projectStatus ? (
              <span className="capitalize">{project.projectStatus.replace('-', ' ')}</span>
            ) : null}
            {project.companyName ? <span>{project.companyName}</span> : null}
            {project.completionDate ? <span>{formatDate(project.completionDate)}</span> : null}
          </div>
          <div className="flex flex-wrap gap-3">
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-accent hover:underline"
              >
                Live demo
              </a>
            ) : null}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-accent hover:underline"
              >
                Source
              </a>
            ) : null}
          </div>
        </div>

        {primaryVideo ? (
          <VideoEmbed url={primaryVideo} title={`${project.title} video`} />
        ) : cover ? (
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line">
            <Image
              src={cover}
              alt={project.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        ) : null}

        {primaryVideo && cover ? (
          <div className="relative aspect-[16/9] max-w-3xl overflow-hidden rounded-2xl border border-line">
            <Image
              src={cover}
              alt={`${project.title} cover`}
              fill
              className="object-cover"
              sizes="80vw"
            />
          </div>
        ) : null}

        {extraVideos.length > 0 ? (
          <section className="space-y-6">
            <h2 className="font-display text-2xl text-cream">More videos</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {extraVideos.map((video) =>
                video ? (
                  <div key={video.key} className="space-y-2">
                    <p className="text-sm text-muted">{video.title}</p>
                    <VideoEmbed url={video.url} title={video.title} />
                  </div>
                ) : null,
              )}
            </div>
          </section>
        ) : null}

        {gallery.length > 0 ? (
          <section className="space-y-4">
            <h2 className="font-display text-2xl text-cream">Gallery</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {gallery.map((item, index) =>
                item ? (
                  <figure
                    key={`${item.url}-${index}`}
                    className="overflow-hidden rounded-xl border border-line"
                  >
                    <div className="relative aspect-[16/10]">
                      <Image src={item.url} alt={item.alt} fill className="object-cover" sizes="50vw" />
                    </div>
                    {item.caption ? (
                      <figcaption className="px-3 py-2 text-sm text-muted">{item.caption}</figcaption>
                    ) : null}
                  </figure>
                ) : null,
              )}
            </div>
          </section>
        ) : null}

        {technologies.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <TechBadge key={tech.id} label={tech.name} />
            ))}
          </div>
        ) : null}

        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <div className="space-y-8 text-muted">
            {(
              [
                ['Overview', project.fullDescription],
                ['Problem', project.problemStatement],
                ['Business challenge', project.businessChallenge],
                ['Solution', project.proposedSolution],
                ['Architecture', project.systemArchitecture],
                ['Implementation', project.technicalImplementation],
                ['Challenges', project.challenges],
                ['How we solved them', project.challengeSolutions],
                ['Security', project.securityImplementation],
                ['Results', project.results],
                ['Lessons learned', project.lessonsLearned],
              ] as Array<[string, unknown]>
            ).map(([label, value]) => {
              const text = lexicalToPlain(value)
              if (!text) return null
              return (
                <section key={label}>
                  <h2 className="font-display text-2xl text-cream">{label}</h2>
                  <p className="mt-3 whitespace-pre-wrap leading-relaxed">{text}</p>
                </section>
              )
            })}

            {project.keyModules && project.keyModules.length > 0 ? (
              <section>
                <h2 className="font-display text-2xl text-cream">Key modules</h2>
                <ul className="mt-3 list-disc space-y-1 pl-5">
                  {project.keyModules.map((item, i) => (
                    <li key={i}>{item.module}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            {project.features && project.features.length > 0 ? (
              <section>
                <h2 className="font-display text-2xl text-cream">Features</h2>
                <ul className="mt-3 list-disc space-y-1 pl-5">
                  {project.features.map((item, i) => (
                    <li key={i}>{item.feature}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            {project.responsibilities && project.responsibilities.length > 0 ? (
              <section>
                <h2 className="font-display text-2xl text-cream">My responsibilities</h2>
                <ul className="mt-3 list-disc space-y-1 pl-5">
                  {project.responsibilities.map((item, i) => (
                    <li key={i}>{item.item}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            {project.measurableOutcomes && project.measurableOutcomes.length > 0 ? (
              <section>
                <h2 className="font-display text-2xl text-cream">Outcomes</h2>
                <ul className="mt-3 list-disc space-y-1 pl-5">
                  {project.measurableOutcomes.map((item, i) => (
                    <li key={i}>{item.outcome}</li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          <aside className="h-fit space-y-4 rounded-xl border border-line bg-panel/40 p-5 text-sm">
            {project.clientName ? (
              <div>
                <p className="text-muted">Client</p>
                <p className="text-cream">{project.clientName}</p>
              </div>
            ) : null}
            {project.companyName ? (
              <div>
                <p className="text-muted">Company</p>
                <p className="text-cream">{project.companyName}</p>
              </div>
            ) : null}
            {project.projectType ? (
              <div>
                <p className="text-muted">Type</p>
                <p className="capitalize text-cream">{project.projectType.replace('-', ' ')}</p>
              </div>
            ) : null}
            <div>
              <p className="text-muted">Timeline</p>
              <p className="text-cream">
                {formatDate(project.startDate) || '—'} →{' '}
                {formatDate(project.completionDate) || 'Present'}
              </p>
            </div>
          </aside>
        </div>

        {related.length > 0 ? (
          <section className="space-y-6">
            <h2 className="font-display text-2xl text-cream">Related projects</h2>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {related.slice(0, 3).map((item) => {
                const card = mapProjectCard(item)
                return <ProjectCard key={card.slug} {...card} />
              })}
            </div>
          </section>
        ) : null}
      </div>
    </article>
  )
}
