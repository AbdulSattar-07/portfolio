import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { EmptyState, SectionHeading } from '@/components/ui/Section'
import { getAboutPage, getEducation, getSiteSettings, getSkills } from '@/lib/payload'
import { getMediaUrl } from '@/lib/utils'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  try {
    const about = await getAboutPage()
    return {
      title: about.seoTitle || about.pageHeading || 'About',
      description: about.seoDescription || about.careerSummary || undefined,
    }
  } catch {
    return { title: 'About' }
  }
}

async function safe<T>(fn: () => Promise<T>) {
  try {
    return await fn()
  } catch {
    return null
  }
}

export default async function AboutPageRoute() {
  const [about, settings, education, skills] = await Promise.all([
    safe(getAboutPage),
    safe(getSiteSettings),
    safe(getEducation),
    safe(getSkills),
  ])

  const profileUrl = getMediaUrl(about?.profileImage as { url?: string | null })
  const resumeUrl =
    getMediaUrl(about?.resume as { url?: string | null }) ||
    getMediaUrl(settings?.resume as { url?: string | null })
  const competencies =
    Array.isArray(about?.coreCompetencies) && about.coreCompetencies.length > 0
      ? about.coreCompetencies.filter((s): s is Exclude<typeof s, number | string> => typeof s === 'object' && !!s)
      : (skills?.docs || []).filter((s) => s.featured).slice(0, 10)

  return (
    <div className="section-pad">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-panel">
            {profileUrl ? (
              <Image src={profileUrl} alt="Profile" fill className="object-cover" sizes="40vw" />
            ) : (
              <div className="flex h-full items-end p-6">
                <p className="text-sm text-muted">Add a profile image in Admin → About Page.</p>
              </div>
            )}
          </div>
          <dl className="space-y-3 text-sm">
            {about?.currentRole ? (
              <div>
                <dt className="text-muted">Current role</dt>
                <dd className="text-cream">{about.currentRole}</dd>
              </div>
            ) : null}
            {about?.location || settings?.location ? (
              <div>
                <dt className="text-muted">Location</dt>
                <dd className="text-cream">{about?.location || settings?.location}</dd>
              </div>
            ) : null}
            {about?.availability ? (
              <div>
                <dt className="text-muted">Availability</dt>
                <dd className="text-cream">{about.availability}</dd>
              </div>
            ) : null}
          </dl>
          {resumeUrl ? (
            <Link href={resumeUrl} className="inline-flex text-sm text-accent hover:underline">
              Download resume →
            </Link>
          ) : null}
        </div>

        <div className="space-y-10">
          <SectionHeading
            eyebrow="About"
            title={about?.pageHeading || 'About'}
            description={about?.careerSummary}
          />

          {about?.biography ? (
            <div className="prose-portfolio space-y-4 text-muted">
              {/* Lexical JSON rendered as plain fallback until rich text renderer is wired */}
              <p className="whitespace-pre-wrap text-base leading-relaxed">
                {typeof about.biography === 'string'
                  ? about.biography
                  : 'Biography content is managed in Admin (rich text).'}
              </p>
            </div>
          ) : (
            <EmptyState
              title="Biography not added yet"
              description="Paste your full bio from the CV into Admin → About Page. The layout is ready."
            />
          )}

          {about?.professionalObjectives ? (
            <div>
              <h3 className="font-display text-xl text-cream">Objectives</h3>
              <p className="mt-2 text-muted">{about.professionalObjectives}</p>
            </div>
          ) : null}

          {about?.workPhilosophy ? (
            <div>
              <h3 className="font-display text-xl text-cream">Work philosophy</h3>
              <p className="mt-2 text-muted">{about.workPhilosophy}</p>
            </div>
          ) : null}

          {about?.values && about.values.length > 0 ? (
            <div>
              <h3 className="font-display text-xl text-cream">Values</h3>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {about.values.map((value, i) => (
                  <li key={`${value.title}-${i}`} className="rounded-xl border border-line p-4">
                    <p className="font-medium text-cream">{value.title}</p>
                    {value.description ? <p className="mt-1 text-sm text-muted">{value.description}</p> : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {competencies.length > 0 ? (
            <div>
              <h3 className="font-display text-xl text-cream">Core competencies</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {competencies.map((skill) => (
                  <li
                    key={typeof skill === 'object' ? skill.id : skill}
                    className="rounded-md border border-line px-3 py-1.5 text-sm text-muted"
                  >
                    {typeof skill === 'object' ? skill.name : skill}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {about?.languages && about.languages.length > 0 ? (
            <div>
              <h3 className="font-display text-xl text-cream">Languages</h3>
              <ul className="mt-3 space-y-1 text-sm text-muted">
                {about.languages.map((lang, i) => (
                  <li key={`${lang.language}-${i}`}>
                    {lang.language}
                    {lang.level ? ` — ${lang.level}` : ''}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {(education?.docs.length || 0) > 0 ? (
            <div>
              <h3 className="font-display text-xl text-cream">Education</h3>
              <ul className="mt-4 space-y-4">
                {education!.docs.map((item) => (
                  <li key={item.id}>
                    <p className="text-cream">
                      {item.degree}
                      {item.fieldOfStudy ? ` in ${item.fieldOfStudy}` : ''}
                    </p>
                    <p className="text-sm text-muted">{item.institution}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
