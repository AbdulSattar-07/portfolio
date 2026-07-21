import type { Metadata } from 'next'
import Link from 'next/link'

import { EmptyState, SectionHeading } from '@/components/ui/Section'
import { getServices } from '@/lib/payload'

export const revalidate = 300
export const metadata: Metadata = {
  title: 'Services',
  description: 'AI, ERP, and full-stack development services.',
}

export default async function ServicesPage() {
  let docs: Awaited<ReturnType<typeof getServices>>['docs'] = []
  try {
    docs = (await getServices()).docs
  } catch {
    docs = []
  }

  return (
    <div className="section-pad">
      <div className="container-page space-y-10">
        <SectionHeading
          eyebrow="Engagements"
          title="Services"
          description="Ways we can work together — editable from Admin without redeploying."
        />
        {docs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {docs.map((service) => (
              <article key={service.id} className="flex flex-col rounded-xl border border-line bg-panel/30 p-6">
                <h2 className="font-display text-2xl text-cream">{service.title}</h2>
                <p className="mt-3 flex-1 text-muted">{service.shortDescription}</p>
                {service.features && service.features.length > 0 ? (
                  <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted">
                    {service.features.map((f, i) => (
                      <li key={i}>{f.feature}</li>
                    ))}
                  </ul>
                ) : null}
                {service.startingPriceText ? (
                  <p className="mt-4 font-mono text-xs text-accent">{service.startingPriceText}</p>
                ) : null}
                <Link
                  href={service.ctaUrl || '/contact'}
                  className="mt-6 inline-flex text-sm text-accent hover:underline"
                >
                  {service.ctaLabel || 'Get in touch'} →
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Services not published yet"
            description="Add offerings like AI chatbot development, ERP, Django, or SAP B1 consulting from Admin."
          />
        )}
      </div>
    </div>
  )
}
