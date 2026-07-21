import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="section-pad">
      <div className="container-page max-w-lg space-y-4 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">404</p>
        <h1 className="font-display text-4xl text-cream">Page not found</h1>
        <p className="text-muted">The page you requested does not exist or is no longer published.</p>
        <Link href="/" className="inline-flex text-accent hover:underline">
          Back home →
        </Link>
      </div>
    </div>
  )
}
