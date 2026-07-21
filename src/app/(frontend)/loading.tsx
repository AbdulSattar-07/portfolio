export default function Loading() {
  return (
    <div className="container-page section-pad animate-pulse space-y-6">
      <div className="h-10 w-48 rounded bg-panel" />
      <div className="h-4 w-full max-w-xl rounded bg-panel" />
      <div className="h-4 w-full max-w-lg rounded bg-panel" />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="h-48 rounded-xl bg-panel" />
        <div className="h-48 rounded-xl bg-panel" />
        <div className="h-48 rounded-xl bg-panel" />
      </div>
    </div>
  )
}
