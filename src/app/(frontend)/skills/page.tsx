import type { Metadata } from 'next'

import { EmptyState, SectionHeading, TechBadge } from '@/components/ui/Section'
import { getSkillCategories, getSkills } from '@/lib/payload'

export const revalidate = 300
export const metadata: Metadata = {
  title: 'Skills',
  description: 'Technical skills grouped by category with proficiency labels.',
}

async function safe<T>(fn: () => Promise<T>) {
  try {
    return await fn()
  } catch {
    return null
  }
}

export default async function SkillsPage() {
  const [categories, skills] = await Promise.all([safe(getSkillCategories), safe(getSkills)])

  const grouped = (categories?.docs || []).map((category) => ({
    category,
    skills: (skills?.docs || []).filter((skill) => {
      const cat = skill.category
      return typeof cat === 'object' && cat && cat.id === category.id
    }),
  }))

  const hasAny = (skills?.docs.length || 0) > 0

  return (
    <div className="section-pad">
      <div className="container-page space-y-12">
        <SectionHeading
          eyebrow="Capabilities"
          title="Skills"
          description="Proficiency is shown with labels (Expert, Advanced, Intermediate) — not fake percentage bars."
        />

        {!hasAny ? (
          <EmptyState
            title="Skills list is empty"
            description="After you share your CV, skills and categories can be seeded into the CMS."
          />
        ) : (
          grouped.map(({ category, skills: items }) =>
            items.length ? (
              <section key={category.id} className="space-y-4">
                <h2 className="font-display text-2xl text-cream">{category.name}</h2>
                {category.description ? <p className="text-sm text-muted">{category.description}</p> : null}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((skill) => (
                    <article key={skill.id} className="rounded-xl border border-line bg-panel/30 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-medium text-cream">{skill.name}</h3>
                        <TechBadge label={skill.proficiency} />
                      </div>
                      {skill.yearsOfExperience != null ? (
                        <p className="mt-2 font-mono text-xs text-muted">
                          {skill.yearsOfExperience}+ years
                        </p>
                      ) : null}
                      {skill.description ? (
                        <p className="mt-3 text-sm text-muted">{skill.description}</p>
                      ) : null}
                    </article>
                  ))}
                </div>
              </section>
            ) : null,
          )
        )}
      </div>
    </div>
  )
}
