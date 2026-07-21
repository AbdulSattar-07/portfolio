import { MessageCircle, Mail, Phone } from 'lucide-react'

import { formatPhoneDisplay, mailtoUrl, telUrl, whatsappChatUrl } from '@/lib/contact'

type ContactActionsProps = {
  email?: string | null
  phone?: string | null
  whatsapp?: string | null
  /** Prefill WhatsApp / mailto when opening from a page */
  defaultMessage?: string
  className?: string
}

export function ContactActions({
  email,
  phone,
  whatsapp,
  defaultMessage = 'Hi Abdul, I found your portfolio and would like to discuss a project.',
  className,
}: ContactActionsProps) {
  const wa = whatsappChatUrl(whatsapp || phone, defaultMessage)
  const mail = mailtoUrl(email, {
    subject: 'Portfolio inquiry',
    body: defaultMessage,
  })
  const call = telUrl(phone || whatsapp)

  if (!wa && !mail && !call) return null

  return (
    <div className={className ?? 'flex flex-col gap-3'}>
      {mail ? (
        <a
          href={mail}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-3 text-sm font-medium text-ink hover:bg-accent-deep"
        >
          <Mail size={16} aria-hidden />
          Email me
        </a>
      ) : null}
      {wa ? (
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-line bg-panel px-4 py-3 text-sm font-medium text-cream hover:border-accent hover:text-accent"
        >
          <MessageCircle size={16} aria-hidden />
          WhatsApp chat
        </a>
      ) : null}
      {call ? (
        <a
          href={call}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-line px-4 py-3 text-sm font-medium text-muted hover:text-cream"
        >
          <Phone size={16} aria-hidden />
          Call {formatPhoneDisplay(phone || whatsapp)}
        </a>
      ) : null}
    </div>
  )
}
