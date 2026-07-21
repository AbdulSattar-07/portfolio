'use client'

import { useState } from 'react'

import { mailtoUrl, whatsappChatUrl } from '@/lib/contact'

type ServiceOption = { id: string; title: string }

type ContactFormProps = {
  services?: ServiceOption[]
  ownerEmail?: string | null
  ownerWhatsapp?: string | null
}

export function ContactForm({
  services = [],
  ownerEmail,
  ownerWhatsapp,
}: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [lastMessage, setLastMessage] = useState<{
    name: string
    subject: string
    message: string
  } | null>(null)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setError(null)

    const form = event.currentTarget
    const formData = new FormData(form)

    const payload = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      phone: String(formData.get('phone') || ''),
      company: String(formData.get('company') || ''),
      subject: String(formData.get('subject') || ''),
      service: String(formData.get('service') || ''),
      budget: String(formData.get('budget') || ''),
      preferredContactMethod: String(formData.get('preferredContactMethod') || 'email'),
      message: String(formData.get('message') || ''),
      consent: formData.get('consent') === 'on',
      website: String(formData.get('website') || ''),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()

      if (!response.ok) {
        setStatus('error')
        setError(data.error || 'Something went wrong.')
        return
      }

      setLastMessage({
        name: payload.name,
        subject: payload.subject,
        message: payload.message,
      })
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
      setError('Network error. Please try again.')
    }
  }

  if (status === 'success') {
    const followUp = `Hi Abdul, I'm ${lastMessage?.name || 'a visitor'}. Regarding: ${lastMessage?.subject || 'your portfolio'}.\n\n${lastMessage?.message || ''}`
    const wa = whatsappChatUrl(ownerWhatsapp, followUp)
    const mail = mailtoUrl(ownerEmail, {
      subject: lastMessage?.subject || 'Portfolio inquiry',
      body: followUp,
    })

    return (
      <div className="rounded-xl border border-accent/40 bg-panel p-8">
        <h3 className="font-display text-2xl text-cream">Message received</h3>
        <p className="mt-2 text-muted">
          Thanks — your message is saved. You can also reach me instantly below.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {wa ? (
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex justify-center rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-ink hover:bg-accent-deep"
            >
              Continue on WhatsApp
            </a>
          ) : null}
          {mail ? (
            <a
              href={mail}
              className="inline-flex justify-center rounded-md border border-line px-4 py-2.5 text-sm text-cream hover:border-accent"
            >
              Open in Email
            </a>
          ) : null}
        </div>
        <button
          type="button"
          className="mt-6 text-sm text-accent hover:underline"
          onClick={() => setStatus('idle')}
        >
          Send another message
        </button>
      </div>
    )
  }

  const field =
    'w-full rounded-md border border-line bg-ink px-3 py-2.5 text-sm text-cream placeholder:text-muted/70 focus:border-accent'

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-1.5 text-sm">
          <span className="text-muted">Name *</span>
          <input className={field} name="name" required autoComplete="name" />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="text-muted">Email *</span>
          <input className={field} name="email" type="email" required autoComplete="email" />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="text-muted">Phone</span>
          <input className={field} name="phone" type="tel" autoComplete="tel" />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="text-muted">Company</span>
          <input className={field} name="company" autoComplete="organization" />
        </label>
      </div>

      <label className="block space-y-1.5 text-sm">
        <span className="text-muted">Subject *</span>
        <input className={field} name="subject" required />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-1.5 text-sm">
          <span className="text-muted">Service</span>
          <select className={field} name="service" defaultValue="">
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="text-muted">Budget range</span>
          <select className={field} name="budget" defaultValue="">
            <option value="">Prefer not to say</option>
            <option value="<2k">Under $2k</option>
            <option value="2k-5k">$2k – $5k</option>
            <option value="5k-15k">$5k – $15k</option>
            <option value="15k+">$15k+</option>
          </select>
        </label>
      </div>

      <label className="block space-y-1.5 text-sm">
        <span className="text-muted">Preferred contact</span>
        <select className={field} name="preferredContactMethod" defaultValue="whatsapp">
          <option value="whatsapp">WhatsApp</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="text-muted">Message *</span>
        <textarea className={`${field} min-h-36`} name="message" required />
      </label>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <label className="flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" name="consent" required className="mt-1" />
        <span>I agree to be contacted about this inquiry. *</span>
      </label>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-ink hover:bg-accent-deep disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
