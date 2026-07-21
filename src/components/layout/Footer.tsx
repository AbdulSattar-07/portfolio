import Link from 'next/link'

import { formatPhoneDisplay, mailtoUrl, whatsappChatUrl } from '@/lib/contact'

type FooterProps = {
  siteName: string
  tagline?: string | null
  footerText?: string | null
  copyrightText?: string | null
  items: { label: string; href: string; external?: boolean }[]
  contactEmail?: string | null
  phone?: string | null
  whatsapp?: string | null
  githubUrl?: string | null
  linkedinUrl?: string | null
  kaggleUrl?: string | null
}

export function Footer({
  siteName,
  tagline,
  footerText,
  copyrightText,
  items,
  contactEmail,
  phone,
  whatsapp,
  githubUrl,
  linkedinUrl,
  kaggleUrl,
}: FooterProps) {
  const year = new Date().getFullYear()
  const mail = mailtoUrl(contactEmail)
  const wa = whatsappChatUrl(whatsapp || phone)

  return (
    <footer className="mt-24 border-t border-line bg-ink-soft">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-display text-xl font-semibold text-cream">{siteName}</p>
          {tagline ? <p className="mt-2 text-sm text-muted">{tagline}</p> : null}
          {footerText ? <p className="mt-4 max-w-sm text-sm text-muted">{footerText}</p> : null}
        </div>

        <div>
          <p className="text-sm font-medium text-cream">Explore</p>
          <ul className="mt-3 space-y-2">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-muted hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-cream">Connect</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {mail ? (
              <li>
                <a href={mail} className="hover:text-accent">
                  {contactEmail}
                </a>
              </li>
            ) : null}
            {wa ? (
              <li>
                <a href={wa} target="_blank" rel="noreferrer" className="hover:text-accent">
                  WhatsApp {formatPhoneDisplay(whatsapp || phone)}
                </a>
              </li>
            ) : null}
            {githubUrl ? (
              <li>
                <a href={githubUrl} target="_blank" rel="noreferrer" className="hover:text-accent">
                  GitHub
                </a>
              </li>
            ) : null}
            {kaggleUrl ? (
              <li>
                <a href={kaggleUrl} target="_blank" rel="noreferrer" className="hover:text-accent">
                  Kaggle
                </a>
              </li>
            ) : null}
            {linkedinUrl ? (
              <li>
                <a href={linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-accent">
                  LinkedIn
                </a>
              </li>
            ) : null}
            <li>
              <Link href="/privacy-policy" className="hover:text-accent">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-accent">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-page py-5 text-sm text-muted">
          {copyrightText || `© ${year} ${siteName}. All rights reserved.`}
        </div>
      </div>
    </footer>
  )
}
