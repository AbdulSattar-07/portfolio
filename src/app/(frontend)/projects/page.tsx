import type { Metadata } from 'next'
import Link from 'next/link'

import { mapProjectCard, ProjectCard } from '@/components/projects/ProjectCard'
import { EmptyState, SectionHeading } from '@/components/ui/Section'
import { getProjectCategories, getProjects, getTechnologies } from '@/lib/payload'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected professional, client, and personal software projects.',
}

type SearchParams = Promise<{
  category?: string
  technology?: string
  status?: string
  type?: string
  q?: string
  page?: string
}>

async function safe<T>(fn: () => Promise<T>) {
  try {
    return await fn()
  } catch {
    return null
  }
}

export default async function ProjectsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const page = Number(params.page || '1') || 1

  const [projects, categories, technologies] = await Promise.all([
    safe(() =>
      getProjects({
        category: params.category,
        technology: params.technology,
        status: params.status,
        type: params.type,
        search: params.q,
        page,
        limit: 12,
      }),
    ),
    safe(getProjectCategories),
    safe(getTechnologies),
  ])

  const docs = projects?.docs || []

  function hrefFor(next: Record<string, string | undefined>) {
    const query = new URLSearchParams()
    const merged = {
      category: params.category,
      technology: params.technology,
      status: params.status,
      type: params.type,
      q: params.q,
      ...next,
    }
    Object.entries(merged).forEach(([key, value]) => {
      if (value) query.set(key, value)
    })
    const qs = query.toString()
    return qs ? `/projects?${qs}` : '/projects'
  }

  return (
    <div className="section-pad">
      <div className="container-page space-y-10">
        <SectionHeading
          eyebrow="Portfolio"
          title="Projects"
          description="Filter by category, technology, or status. Content is managed from the CMS — empty until you publish work."
        />

        <form className="grid gap-3 rounded-xl border border-line bg-panel/40 p-4 sm:grid-cols-2 lg:grid-cols-5" method="get">
          <label className="text-sm">
            <span className="mb-1 block text-muted">Search</span>
            <input
              name="q"
              defaultValue={params.q || ''}
              className="w-full rounded-md border border-line bg-ink px-3 py-2 text-cream"
              placeholder="Search projects"
            />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-muted">Category</span>
            <select name="category" defaultValue={params.category || ''} className="w-full rounded-md border border-line bg-ink px-3 py-2 text-cream">
              <option value="">All</option>
              {(categories?.docs || []).map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-muted">Technology</span>
            <select name="technology" defaultValue={params.technology || ''} className="w-full rounded-md border border-line bg-ink px-3 py-2 text-cream">
              <option value="">All</option>
              {(technologies?.docs || []).map((tech) => (
                <option key={tech.id} value={tech.slug}>
                  {tech.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-muted">Status</span>
            <select name="status" defaultValue={params.status || ''} className="w-full rounded-md border border-line bg-ink px-3 py-2 text-cream">
              <option value="">All</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </label>
          <div className="flex items-end">
            <button type="submit" className="w-full rounded-md bg-accent px-3 py-2 text-sm font-medium text-ink">
              Apply filters
            </button>
          </div>
        </form>

        {docs.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {docs.map((project) => {
                const card = mapProjectCard(project)
                return <ProjectCard key={project.id} {...card} />
              })}
            </div>
            {(projects?.totalPages || 1) > 1 ? (
              <div className="flex items-center justify-between text-sm">
                {page > 1 ? (
                  <Link href={hrefFor({ page: String(page - 1) })} className="text-accent">
                    ← Previous
                  </Link>
                ) : (
                  <span />
                )}
                <span className="text-muted">
                  Page {page} of {projects?.totalPages}
                </span>
                {page < (projects?.totalPages || 1) ? (
                  <Link href={hrefFor({ page: String(page + 1) })} className="text-accent">
                    Next →
                  </Link>
                ) : (
                  <span />
                )}
              </div>
            ) : null}
          </>
        ) : (
          <EmptyState
            title="No projects published yet"
            description="When you send your CV, projects can be added in Admin and will appear here with filters already wired."
          />
        )}
      </div>
    </div>
  )
}
