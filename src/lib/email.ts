export async function sendContactNotification(payload: {
  name: string
  email: string
  subject: string
  message: string
  phone?: string
  company?: string
}) {
  const to = process.env.CONTACT_EMAIL_TO || process.env.NEXT_PUBLIC_CONTACT_EMAIL
  const apiKey = process.env.EMAIL_API_KEY
  const from = process.env.EMAIL_FROM

  if (!to) {
    return { sent: false, reason: 'no_recipient' as const }
  }

  const text = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.phone ? `Phone: ${payload.phone}` : null,
    payload.company ? `Company: ${payload.company}` : null,
    '',
    payload.message,
  ]
    .filter(Boolean)
    .join('\n')

  // 1) Resend (preferred when API key is set)
  if (apiKey && from) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: payload.email,
        subject: `[Portfolio] ${payload.subject}`,
        text,
      }),
    })

    if (response.ok) return { sent: true as const, provider: 'resend' as const }

    const body = await response.text()
    console.error('Resend email failed', body)
  }

  // 2) FormSubmit free relay → delivers to Gmail (confirm once via inbox)
  if (process.env.EMAIL_FORMSUBMIT !== 'false') {
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          subject: `[Portfolio] ${payload.subject}`,
          message: text,
          _replyto: payload.email,
          _template: 'table',
        }),
      })

      if (response.ok) {
        return { sent: true as const, provider: 'formsubmit' as const }
      }

      console.error('FormSubmit failed', await response.text())
    } catch (error) {
      console.error('FormSubmit error', error)
    }
  }

  return { sent: false, reason: 'provider_error' as const }
}
