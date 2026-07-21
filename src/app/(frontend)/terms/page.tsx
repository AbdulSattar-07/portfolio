import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Terms' }

export default function TermsPage() {
  return (
    <div className="section-pad">
      <div className="container-page max-w-3xl space-y-4 text-muted">
        <h1 className="font-display text-4xl text-cream">Terms of Use</h1>
        <p>
          Content on this website is provided for informational and professional portfolio purposes. Project case studies
          may omit confidential client details.
        </p>
        <p>
          Unauthorized scraping, automated abuse of the contact form, or attempts to access the admin area without
          permission are prohibited.
        </p>
      </div>
    </div>
  )
}
