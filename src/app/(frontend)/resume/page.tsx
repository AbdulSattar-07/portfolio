import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getSiteSettings } from '@/lib/payload'
import { getMediaUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Download the latest resume.',
}

export default async function ResumePage() {
  try {
    const settings = await getSiteSettings()
    const url = getMediaUrl(settings.resume as { url?: string | null })
    if (url) redirect(url)
  } catch {
    // fall through
  }

  return (
    <div className="section-pad">
      <div className="container-page max-w-xl space-y-4">
        <h1 className="font-display text-4xl text-cream">Resume</h1>
        <p className="text-muted">
          Resume file is not uploaded yet. Add a PDF in Admin → Site Settings → Resume, or share your CV and it can be
          attached later.
        </p>
      </div>
    </div>
  )
}
