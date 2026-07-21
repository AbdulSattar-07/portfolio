import type { Metadata } from 'next'
import Image from 'next/image'

import { EmptyState, SectionHeading } from '@/components/ui/Section'
import { getCertifications } from '@/lib/payload'
import { formatDate, getMediaUrl } from '@/lib/utils'

export const revalidate = 300
export const metadata: Metadata = {
  title: 'Certifications',
  description: 'Professional certifications and credentials.',
}

export default async function CertificationsPage() {
  let docs: Awaited<ReturnType<typeof getCertifications>>['docs'] = []
  try {
    docs = (await getCertifications()).docs
  } catch {
    docs = []
  }

  return (
    <div className="section-pad">
      <div className="container-page space-y-10">
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications"
          description="Only real certificates you publish will appear here — nothing fabricated."
        />
        {docs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {docs.map((cert) => {
              const image = getMediaUrl(cert.certificateImage as { url?: string | null })
              return (
                <article key={cert.id} className="overflow-hidden rounded-xl border border-line bg-panel/30">
                  {image ? (
                    <div className="relative aspect-[16/10] border-b border-line">
                      <Image src={image} alt={cert.title} fill className="object-cover" sizes="50vw" />
                    </div>
                  ) : null}
                  <div className="space-y-2 p-5">
                    <h2 className="font-display text-xl text-cream">{cert.title}</h2>
                    <p className="text-sm text-muted">
                      {cert.issuer}
                      {cert.issueDate ? ` · ${formatDate(cert.issueDate)}` : ''}
                    </p>
                    {cert.description ? <p className="text-sm text-muted">{cert.description}</p> : null}
                    {cert.verificationUrl ? (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex text-sm text-accent hover:underline"
                      >
                        Verify credential
                      </a>
                    ) : null}
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <EmptyState
            title="No certifications published"
            description="Upload certificate images/PDFs from Admin when you have them."
          />
        )}
      </div>
    </div>
  )
}
