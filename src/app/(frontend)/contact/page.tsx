import type { Metadata } from 'next'

import { ContactActions } from '@/components/forms/ContactActions'
import { ContactForm } from '@/components/forms/ContactForm'
import { SectionHeading } from '@/components/ui/Section'
import { formatPhoneDisplay, mailtoUrl, whatsappChatUrl } from '@/lib/contact'
import { getServices, getSiteSettings } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Email or WhatsApp Abdul Sattar for AI, ERP, and full-stack projects.',
}

const FALLBACK = {
  email: 'malikabdulsattar9947@gmail.com',
  phone: '03252467739',
  whatsapp: '03252467739',
  location: 'Lahore, Pakistan',
}

export default async function ContactPage() {
  let settings: Awaited<ReturnType<typeof getSiteSettings>> | null = null
  let services: { id: string; title: string }[] = []

  try {
    const [site, serviceRes] = await Promise.all([getSiteSettings(), getServices()])
    settings = site
    services = serviceRes.docs.map((s) => ({ id: String(s.id), title: s.title }))
  } catch {
    // fallbacks
  }

  const enabled = settings?.contactFormEnabled !== false
  const email = settings?.contactEmail || FALLBACK.email
  const phone = settings?.phone || FALLBACK.phone
  const whatsapp = settings?.whatsapp || FALLBACK.whatsapp
  const location = settings?.location || FALLBACK.location

  return (
    <div className="section-pad">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Contact"
            title="Let’s talk"
            description="Email and WhatsApp both work instantly — or send a brief through the form."
          />

          <ContactActions email={email} phone={phone} whatsapp={whatsapp} />

          <dl className="space-y-3 border-t border-line pt-6 text-sm">
            <div>
              <dt className="text-muted">Email</dt>
              <dd>
                <a href={mailtoUrl(email) || '#'} className="text-cream hover:text-accent">
                  {email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">WhatsApp</dt>
              <dd>
                <a
                  href={whatsappChatUrl(whatsapp) || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cream hover:text-accent"
                >
                  {formatPhoneDisplay(whatsapp)}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">Phone</dt>
              <dd className="text-cream">{formatPhoneDisplay(phone)}</dd>
            </div>
            {location ? (
              <div>
                <dt className="text-muted">Location</dt>
                <dd className="text-cream">{location}</dd>
              </div>
            ) : null}
          </dl>
        </div>

        <div className="rounded-2xl border border-line bg-panel/40 p-6 sm:p-8">
          {enabled ? (
            <ContactForm
              services={services}
              ownerEmail={email}
              ownerWhatsapp={whatsapp}
            />
          ) : (
            <p className="text-muted">The contact form is temporarily disabled.</p>
          )}
        </div>
      </div>
    </div>
  )
}
