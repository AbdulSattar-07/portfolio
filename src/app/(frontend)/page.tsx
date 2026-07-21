import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { mapProjectCard, ProjectCard } from '@/components/projects/ProjectCard'
import { JsonLd } from '@/components/seo/JsonLd'
import { ButtonLink, EmptyState, SectionHeading, TechBadge } from '@/components/ui/Section'
import { SITE_NAME } from '@/lib/constants'
import { personJsonLd, websiteJsonLd } from '@/lib/structuredData'
import {
  getCertifications,
  getExperiences,
  getHomePage,
  getProjects,
  getServices,
  getSiteSettings,
  getSkills,
  getTestimonials,
} from '@/lib/payload'
import { formatDate, getMediaUrl } from '@/lib/utils'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  try {
    const [home, settings] = await Promise.all([getHomePage(), getSiteSettings()])
    return {
      title: home.fullName || settings.siteName || SITE_NAME,
      description: home.introduction || settings.defaultSeoDescription || undefined,
    }
  } catch {
    return { title: SITE_NAME }
  }
}

async function safe<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn()
  } catch {
    return null
  }
}

export default async function HomePage() {
  // Settings first so we can skip testimonials when disabled
  const [home, settings] = await Promise.all([safe(getHomePage), safe(getSiteSettings)])

  const [projectsRes, skillsRes, experiencesRes, servicesRes, certsRes, testimonialsRes] =
    await Promise.all([
      safe(() => getProjects({ featured: true, limit: 6, list: true })),
      safe(() => getSkills({ featured: true, limit: 12 })),
      safe(() => getExperiences({ limit: 3 })),
      safe(() => getServices({ featured: true, limit: 4 })),
      safe(() => getCertifications({ featured: true, limit: 4 })),
      settings?.testimonialsEnabled === false
        ? Promise.resolve(null)
        : safe(getTestimonials),
    ])

  const name = home?.fullName || settings?.siteName || SITE_NAME
  const title = home?.professionalTitle || settings?.siteTagline || 'AI, ERP & Full-Stack Software Developer'
  const intro =
    home?.introduction ||
    'I build scalable ERP systems, intelligent AI applications, business automation platforms and data-driven software solutions.'
  const profileUrl = getMediaUrl(home?.profileImage as { url?: string | null })
  const resumeUrl =
    getMediaUrl(settings?.resume as { url?: string | null }) ||
    getMediaUrl((home as { resume?: { url?: string } } | null)?.resume)

  const featuredFromRelation =
    Array.isArray(home?.featuredProjects) && home.featuredProjects.length > 0
      ? home.featuredProjects.filter((p): p is Exclude<typeof p, string | number> => typeof p === 'object' && p !== null)
      : null

  const projects = featuredFromRelation || projectsRes?.docs || []
  const skills = skillsRes?.docs || []
  const experiences = experiencesRes?.docs || []
  const services = servicesRes?.docs || []
  const certifications = certsRes?.docs || []
  const testimonials = testimonialsRes?.docs || []

  return (
    <>
      <JsonLd
        data={[
          websiteJsonLd({
            name: settings?.siteName || SITE_NAME,
            description: settings?.defaultSeoDescription,
          }),
          personJsonLd({
            name,
            jobTitle: title,
            email: settings?.contactEmail,
            sameAs: [
              settings?.githubUrl || 'https://github.com/AbdulSattar-07',
              settings?.linkedinUrl || 'https://www.linkedin.com/in/abdul5sattar/',
              (settings as { kaggleUrl?: string | null } | null)?.kaggleUrl ||
                'https://www.kaggle.com/malikabdulsattar',
            ],
          }),
        ]}
      />
      <section className="relative overflow-hidden border-b border-line">
        <div className="container-page grid min-h-[calc(100vh-4rem)] items-center gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
          <div className="fade-up">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">Portfolio</p>
            <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight text-cream sm:text-6xl lg:text-7xl text-balance">
              {name}
            </h1>
            <p className="mt-4 font-display text-xl text-cream/85 sm:text-2xl">{title}</p>
            <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">{intro}</p>
            {home?.availabilityStatus ? (
              <p className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                {home.availabilityStatus}
              </p>
            ) : null}
            <div className="fade-up-delay mt-8 flex flex-wrap gap-3">
              <ButtonLink href={home?.primaryCtaUrl || '/projects'}>
                {home?.primaryCtaLabel || 'View Projects'}
              </ButtonLink>
              <ButtonLink href={home?.secondaryCtaUrl || '/contact'} variant="secondary">
                {home?.secondaryCtaLabel || 'Contact Me'}
              </ButtonLink>
              {home?.showResumeButton !== false && resumeUrl ? (
                <ButtonLink href={resumeUrl} variant="ghost">
                  Download resume
                </ButtonLink>
              ) : null}
            </div>
            <div className="fade-up-delay-2 mt-8 flex flex-wrap gap-4 text-sm text-muted">
              <a
                href={settings?.githubUrl || 'https://github.com/AbdulSattar-07'}
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent"
              >
                GitHub
              </a>
              <a
                href={
                  (settings as { kaggleUrl?: string | null } | null)?.kaggleUrl ||
                  'https://www.kaggle.com/malikabdulsattar'
                }
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent"
              >
                Kaggle
              </a>
              <a
                href={settings?.linkedinUrl || 'https://www.linkedin.com/in/abdul5sattar/'}
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent"
              >
                LinkedIn
              </a>
              <a
                href={`https://wa.me/923252467739?text=${encodeURIComponent('Hi Abdul, I found your portfolio and would like to discuss a project.')}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent"
              >
                WhatsApp
              </a>
              <a href="mailto:malikabdulsattar9947@gmail.com" className="hover:text-accent">
                Email
              </a>
            </div>
          </div>

          <div className="fade-up-delay relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-line bg-panel lg:mx-0">
            {profileUrl ? (
              <Image
                src={profileUrl}
                alt={`${name} profile`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 420px"
              />
            ) : (
              <div className="flex h-full flex-col justify-end bg-gradient-to-br from-panel via-ink-soft to-ink p-8">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Profile</p>
                <p className="mt-3 font-display text-3xl text-cream">Photo placeholder</p>
                <p className="mt-2 text-sm text-muted">
                  Upload a profile image from Admin → Home Page when your CV is ready.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {home?.highlights && home.highlights.length > 0 ? (
        <section className="section-pad border-b border-line">
          <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {home.highlights.map((item, index) => (
              <div key={`${item.label}-${index}`} className="border-l border-accent/40 pl-4">
                <p className="font-display text-3xl text-cream">{item.value}</p>
                <p className="mt-1 text-sm text-muted">{item.label}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section-pad">
        <div className="container-page space-y-10">
          <SectionHeading
            eyebrow="Work"
            title={home?.featuredProjectsHeading || 'Featured work'}
            description={home?.featuredProjectsIntro}
          />
          {projects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => {
                if (typeof project !== 'object' || !project) return null
                const card = mapProjectCard(project as never)
                return <ProjectCard key={card.slug} {...card} />
              })}
            </div>
          ) : (
            <EmptyState
              title="Projects coming soon"
              description="Add and publish projects from the admin dashboard. Content will appear here automatically."
            />
          )}
          <Link href="/projects" className="inline-flex text-sm text-accent hover:underline">
            Browse all projects →
          </Link>
        </div>
      </section>

      <section className="section-pad border-y border-line bg-ink-soft/40">
        <div className="container-page space-y-10">
          <SectionHeading eyebrow="Skills" title={home?.skillsHeading || 'Core capabilities'} />
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <TechBadge key={skill.id} label={`${skill.name} · ${skill.proficiency}`} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Skills will appear here"
              description="Mark skills as featured in Admin after seeding categories from your CV."
            />
          )}
          <Link href="/skills" className="inline-flex text-sm text-accent hover:underline">
            View all skills →
          </Link>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page space-y-10">
          <SectionHeading eyebrow="Experience" title={home?.experienceHeading || 'Recent experience'} />
          {experiences.length > 0 ? (
            <ol className="space-y-6">
              {experiences.map((job) => (
                <li key={job.id} className="grid gap-2 border-l border-line pl-5 sm:grid-cols-[180px_1fr]">
                  <p className="font-mono text-xs text-muted">
                    {formatDate(job.startDate)} — {job.currentlyWorking ? 'Present' : formatDate(job.endDate) || '—'}
                  </p>
                  <div>
                    <h3 className="font-display text-xl text-cream">{job.jobTitle}</h3>
                    <p className="text-sm text-muted">{job.companyName}</p>
                    {job.summary ? <p className="mt-2 text-sm text-muted">{job.summary}</p> : null}
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <EmptyState
              title="Experience timeline is empty"
              description="Your roles will show here once added from the CV in Admin → Experiences."
            />
          )}
          <Link href="/experience" className="inline-flex text-sm text-accent hover:underline">
            Full timeline →
          </Link>
        </div>
      </section>

      <section className="section-pad border-y border-line">
        <div className="container-page space-y-10">
          <SectionHeading eyebrow="Services" title={home?.servicesHeading || 'How I can help'} />
          {services.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {services.map((service) => (
                <article key={service.id} className="rounded-xl border border-line bg-panel/40 p-6">
                  <h3 className="font-display text-xl text-cream">{service.title}</h3>
                  <p className="mt-2 text-sm text-muted">{service.shortDescription}</p>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              title="Services not configured yet"
              description="Publish services such as AI development, ERP, or API work from Admin."
            />
          )}
          <Link href="/services" className="inline-flex text-sm text-accent hover:underline">
            All services →
          </Link>
        </div>
      </section>

      {(certifications.length > 0 || true) && (
        <section className="section-pad">
          <div className="container-page space-y-10">
            <SectionHeading
              eyebrow="Credentials"
              title={home?.certificationsHeading || 'Certifications'}
            />
            {certifications.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {certifications.map((cert) => (
                  <article key={cert.id} className="border-l border-accent/30 pl-4">
                    <h3 className="font-display text-lg text-cream">{cert.title}</h3>
                    <p className="text-sm text-muted">
                      {cert.issuer}
                      {cert.issueDate ? ` · ${formatDate(cert.issueDate)}` : ''}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No certifications published"
                description="Upload certificates later from Admin — no fake credentials are shown."
              />
            )}
          </div>
        </section>
      )}

      {testimonials.length > 0 ? (
        <section className="section-pad border-t border-line bg-ink-soft/30">
          <div className="container-page space-y-10">
            <SectionHeading
              eyebrow="Testimonials"
              title={home?.testimonialsHeading || 'What clients say'}
            />
            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.slice(0, 4).map((item) => (
                <blockquote key={item.id} className="rounded-xl border border-line p-6">
                  <p className="text-cream">“{item.testimonial}”</p>
                  <footer className="mt-4 text-sm text-muted">
                    {item.clientName}
                    {item.clientPosition ? `, ${item.clientPosition}` : ''}
                    {item.company ? ` · ${item.company}` : ''}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-pad">
        <div className="container-page overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-panel to-ink-soft px-8 py-14 sm:px-12">
          <SectionHeading
            title={home?.contactCtaHeading || 'Let’s build something solid'}
            description={
              home?.contactCtaText ||
              'Have an ERP, AI, or full-stack product challenge? Tell me about it.'
            }
          />
          <div className="mt-8">
            <ButtonLink href={home?.contactCtaUrl || '/contact'}>
              {home?.contactCtaLabel || 'Start a conversation'}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
