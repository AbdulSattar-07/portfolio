/** Pakistan mobile → international digits for WhatsApp / tel links */
export function toWhatsAppNumber(raw?: string | null): string | null {
  if (!raw) return null
  let digits = raw.replace(/\D/g, '')
  if (!digits) return null

  // 03XXXXXXXXX → 923XXXXXXXXX
  if (digits.startsWith('0') && digits.length === 11) {
    digits = `92${digits.slice(1)}`
  }
  // 3XXXXXXXXX (10 digits) → 923XXXXXXXXX
  if (digits.length === 10 && digits.startsWith('3')) {
    digits = `92${digits}`
  }

  return digits
}

export function whatsappChatUrl(
  rawNumber?: string | null,
  message?: string,
): string | null {
  const number = toWhatsAppNumber(rawNumber)
  if (!number) return null
  const base = `https://wa.me/${number}`
  if (!message?.trim()) return base
  return `${base}?text=${encodeURIComponent(message.trim())}`
}

export function mailtoUrl(
  email?: string | null,
  options?: { subject?: string; body?: string },
): string | null {
  if (!email) return null
  const params = new URLSearchParams()
  if (options?.subject) params.set('subject', options.subject)
  if (options?.body) params.set('body', options.body)
  const qs = params.toString()
  return qs ? `mailto:${email}?${qs}` : `mailto:${email}`
}

export function telUrl(raw?: string | null): string | null {
  const number = toWhatsAppNumber(raw)
  return number ? `tel:+${number}` : null
}

export function formatPhoneDisplay(raw?: string | null): string {
  if (!raw) return ''
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 11 && digits.startsWith('0')) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`
  }
  return raw
}
