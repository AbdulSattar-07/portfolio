'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { cn } from '@/lib/utils'

type NavItem = {
  label: string
  href: string
  external?: boolean
}

type HeaderProps = {
  siteName: string
  items: NavItem[]
  ctaLabel?: string
  ctaUrl?: string
  githubUrl?: string | null
  linkedinUrl?: string | null
}

export function Header({ siteName, items, ctaLabel, ctaUrl }: HeaderProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-ink/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-cream hover:text-accent"
        >
          {siteName}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {items.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            const className = cn(
              'rounded-md px-3 py-2 text-sm text-muted hover:text-cream',
              active && 'text-cream',
            )
            if (item.external) {
              return (
                <a key={item.href} href={item.href} className={className} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              )
            }
            return (
              <Link key={item.href} href={item.href} className={className}>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {ctaLabel && ctaUrl ? (
            <Link
              href={ctaUrl}
              className="hidden rounded-md bg-accent px-3.5 py-2 text-sm font-medium text-ink hover:bg-accent-deep sm:inline-flex"
            >
              {ctaLabel}
            </Link>
          ) : null}
          <button
            type="button"
            className="inline-flex rounded-md border border-line p-2 text-cream lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-ink-soft lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 text-cream hover:bg-panel"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {ctaLabel && ctaUrl ? (
              <Link
                href={ctaUrl}
                className="mt-2 rounded-md bg-accent px-3 py-3 text-center font-medium text-ink"
                onClick={() => setOpen(false)}
              >
                {ctaLabel}
              </Link>
            ) : null}
          </nav>
        </div>
      ) : null}
    </header>
  )
}
