'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="section-pad">
      <div className="container-page max-w-lg space-y-4 text-center">
        <h1 className="font-display text-3xl text-cream">Something went wrong</h1>
        <p className="text-muted">An unexpected error occurred. You can try again.</p>
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-ink"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
