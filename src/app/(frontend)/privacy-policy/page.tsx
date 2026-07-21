import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy' }

export default function PrivacyPolicyPage() {
  return (
    <div className="section-pad">
      <div className="container-page prose-portfolio max-w-3xl space-y-4 text-muted">
        <h1 className="font-display text-4xl text-cream">Privacy Policy</h1>
        <p>
          This portfolio collects information you voluntarily submit through the contact form (name, email, and message
          details). Messages are stored in a private database accessible only to authorized administrators.
        </p>
        <p>
          We do not sell personal data. Analytics may be used in aggregated form if configured. Contact the site owner to
          request deletion of a submitted message.
        </p>
        <p>Update this page content as needed for your jurisdiction and hosting providers.</p>
      </div>
    </div>
  )
}
