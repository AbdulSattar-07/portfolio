import type { Metadata } from 'next'
import { JetBrains_Mono, Manrope, Syne } from 'next/font/google'
import { draftMode } from 'next/headers'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { SkipLink } from '@/components/layout/SkipLink'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { NAV_FALLBACK, SITE_NAME } from '@/lib/constants'
import { getNavigation, getSiteSettings } from '@/lib/payload'
import { absoluteUrl } from '@/lib/utils'

import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
})

export async function generateMetadata(): Promise<Metadata> {
  let settings: Awaited<ReturnType<typeof getSiteSettings>> | null = null
  try {
    settings = await getSiteSettings()
  } catch {
    settings = null
  }

  const title = settings?.defaultSeoTitle || `${SITE_NAME} — Portfolio`
  const description =
    settings?.defaultSeoDescription ||
    'AI, ERP and full-stack software developer portfolio.'

  return {
    metadataBase: new URL(absoluteUrl('/')),
    title: {
      default: title,
      template: `%s · ${settings?.siteName || SITE_NAME}`,
    },
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: absoluteUrl('/'),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isEnabled: isDraft } = await draftMode()

  let settings: Awaited<ReturnType<typeof getSiteSettings>> | null = null
  let navigation: Awaited<ReturnType<typeof getNavigation>> | null = null

  try {
    ;[settings, navigation] = await Promise.all([getSiteSettings(), getNavigation()])
  } catch {
    // CMS unavailable — render with fallbacks
  }

  const headerItems =
    navigation?.headerItems?.filter((item) => item.visible !== false).map((item) => ({
      label: item.label,
      href: item.href,
      external: Boolean(item.external),
    })) || [...NAV_FALLBACK]

  const footerItems =
    navigation?.footerItems?.map((item) => ({
      label: item.label,
      href: item.href,
      external: Boolean(item.external),
    })) || [...NAV_FALLBACK]

  return (
    <html
      lang="en"
      className={`${syne.variable} ${manrope.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        <ThemeProvider>
          <SkipLink />
          {isDraft ? (
            <div className="bg-warm text-ink px-4 py-2 text-center text-sm font-medium">
              Draft preview mode is active.{' '}
              <a className="underline" href="/api/exit-preview">
                Exit preview
              </a>
            </div>
          ) : null}
          <Header
            siteName={settings?.siteName || SITE_NAME}
            items={headerItems}
            ctaLabel={navigation?.showCta === false ? undefined : navigation?.ctaLabel || 'Hire me'}
            ctaUrl={navigation?.ctaUrl || '/contact'}
            githubUrl={settings?.githubUrl}
            linkedinUrl={settings?.linkedinUrl}
          />
          <main id="main-content">{children}</main>
          <Footer
            siteName={settings?.siteName || SITE_NAME}
            tagline={settings?.siteTagline}
            footerText={settings?.footerText}
            copyrightText={settings?.copyrightText}
            items={footerItems}
            contactEmail={settings?.contactEmail || 'malikabdulsattar9947@gmail.com'}
            phone={settings?.phone || '03252467739'}
            whatsapp={settings?.whatsapp || '03252467739'}
            githubUrl={settings?.githubUrl || 'https://github.com/AbdulSattar-07'}
            linkedinUrl={settings?.linkedinUrl || 'https://www.linkedin.com/in/abdul5sattar/'}
            kaggleUrl={
              (settings as { kaggleUrl?: string | null } | null)?.kaggleUrl ||
              'https://www.kaggle.com/malikabdulsattar'
            }
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
