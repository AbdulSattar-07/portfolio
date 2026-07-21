import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string | null
  className?: string
}) {
  return (
    <div className={cn('max-w-2xl', className)}>
      {eyebrow ? (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-cream sm:text-4xl text-balance">
        {title}
      </h2>
      {description ? <p className="mt-4 text-base text-muted sm:text-lg">{description}</p> : null}
    </div>
  )
}

export function EmptyState({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="rounded-xl border border-dashed border-line bg-panel/40 px-6 py-12 text-center">
      <h3 className="font-display text-xl text-cream">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted">{description}</p>
    </div>
  )
}

export function TechBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-md border border-line bg-panel px-2.5 py-1 font-mono text-xs text-muted">
      {label}
    </span>
  )
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
}: {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
}) {
  const styles = {
    primary: 'bg-accent text-ink hover:bg-accent-deep',
    secondary: 'border border-line bg-transparent text-cream hover:border-accent hover:text-accent',
    ghost: 'text-muted hover:text-cream',
  }

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition ${styles[variant]}`}
    >
      {children}
    </a>
  )
}
