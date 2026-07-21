import type { Metadata } from 'next'
import Link from 'next/link'

import { EmptyState, SectionHeading, TechBadge } from '@/components/ui/Section'
import { getEducation, getExperiences } from '@/lib/payload'
import { formatDate } from '@/lib/utils'

export const revalidate = 300
export const metadata: Metadata = {
  title: 'Experience',
  description: 'Professional experience and education timeline.',
}

async function safe<T>(fn: () => Promise<T>) {
  try {
    return await fn()
  } catch {
    return null
  }
}

export default async function ExperiencePage() {
  const [experiences, education] = await Promise.all([safe(getExperiences), safe(getEducation)])

  return (
    <div className="section-pad">
      <div className="container-page space-y-14">
        <SectionHeading
          eyebrow="Career"
          title="Experience"
          description="Roles aligned with shipped systems — ERP GenAI at Royal Soft, solo FYP recommender, and independent AI products."
        />

        {(experiences?.docs.length || 0) > 0 ? (
          <ol className="relative space-y-10 border-l border-line pl-6">
            {experiences!.docs.map((job) => {
              const techs = Array.isArray(job.technologies)
                ? job.technologies.filter(
                    (t): t is Exclude<typeof t, string | number> => typeof t === 'object' && !!t,
                  )
                : []
              const projects = Array.isArray(job.projectsHandled)
                ? job.projectsHandled.filter(
                    (p): p is Exclude<typeof p, string | number> => typeof p === 'object' && !!p,
                  )
                : []
              return (
                <li key={job.id} className="relative">
                  <span className="absolute -left-[1.91rem] top-1.5 h-3 w-3 rounded-full border border-accent bg-ink" />
                  <p className="font-mono text-xs text-muted">
                    {formatDate(job.startDate)} —{' '}
                    {job.currentlyWorking ? 'Present' : formatDate(job.endDate) || '—'}
                    {job.location ? ` · ${job.location}` : ''}
                    {job.workMode ? ` · ${job.workMode}` : ''}
                  </p>
                  <h2 className="mt-2 font-display text-2xl text-cream">{job.jobTitle}</h2>
                  <p className="text-muted">
                    {job.companyName}
                    {job.employmentType ? ` · ${job.employmentType.replace('-', ' ')}` : ''}
                  </p>
                  {job.summary ? <p className="mt-3 text-muted">{job.summary}</p> : null}
                  {job.responsibilities && job.responsibilities.length > 0 ? (
                    <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted">
                      {job.responsibilities.map((item, i) => (
                        <li key={i}>{item.item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {job.achievements && job.achievements.length > 0 ? (
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-accent/90">
                      {job.achievements.map((item, i) => (
                        <li key={i}>{item.item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {projects.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {projects.map((project) => (
                        <Link
                          key={project.id}
                          href={`/projects/${project.slug}`}
                          className="rounded-md border border-line px-2.5 py-1 text-xs text-cream transition hover:border-accent hover:text-accent"
                        >
                          {project.title}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                  {techs.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {techs.map((tech) => (
                        <TechBadge key={tech.id} label={tech.name} />
                      ))}
                    </div>
                  ) : null}
                </li>
              )
            })}
          </ol>
        ) : (
          <EmptyState
            title="Experience coming soon"
            description="Add roles from Admin → Experiences."
          />
        )}

        <SectionHeading eyebrow="Education" title="Academic background" />
        {(education?.docs.length || 0) > 0 ? (
          <ul className="space-y-6">
            {education!.docs.map((edu) => (
              <li key={edu.id} className="border-l border-accent/40 pl-5">
                <h3 className="font-display text-xl text-cream">{edu.degree}</h3>
                <p className="text-muted">
                  {edu.institution}
                  {edu.fieldOfStudy ? ` · ${edu.fieldOfStudy}` : ''}
                </p>
                <p className="mt-1 font-mono text-xs text-muted">
                  {formatDate(edu.startDate)} —{' '}
                  {edu.currentlyStudying ? 'Present' : formatDate(edu.endDate) || '—'}
                  {edu.grade ? ` · ${edu.grade}` : ''}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="Education not added yet"
            description="Add degrees from Admin → Education."
          />
        )}
      </div>
    </div>
  )
}
