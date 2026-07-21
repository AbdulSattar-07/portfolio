import { NextResponse } from 'next/server'

import { sendContactNotification } from '@/lib/email'
import { getPayloadClient } from '@/lib/payload'
import { hashIp, rateLimit } from '@/lib/rateLimit'
import { contactFormSchema } from '@/lib/validation'

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'

    const limited = rateLimit(`contact:${ip}`, 5, 60_000)
    if (!limited.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again shortly.' },
        { status: 429 },
      )
    }

    const body = await request.json()
    const parsed = contactFormSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 },
      )
    }

    if (parsed.data.website) {
      return NextResponse.json({ success: true })
    }

    const payload = await getPayloadClient()
    const settings = await payload.findGlobal({ slug: 'site-settings' })

    if (settings.contactFormEnabled === false) {
      return NextResponse.json({ error: 'Contact form is disabled.' }, { status: 403 })
    }

    await payload.create({
      collection: 'contact-messages',
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || undefined,
        company: parsed.data.company || undefined,
        subject: parsed.data.subject,
        service: parsed.data.service || undefined,
        budget: parsed.data.budget || undefined,
        preferredContactMethod: parsed.data.preferredContactMethod,
        message: parsed.data.message,
        status: 'new',
        sourcePage: '/contact',
        ipHash: hashIp(ip),
        userAgent: request.headers.get('user-agent') || undefined,
      },
      overrideAccess: true,
    })

    try {
      await sendContactNotification({
        name: parsed.data.name,
        email: parsed.data.email,
        subject: parsed.data.subject,
        message: parsed.data.message,
        phone: parsed.data.phone,
        company: parsed.data.company,
      })
    } catch (error) {
      console.error('Contact email notification failed', error)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error', error)
    return NextResponse.json({ error: 'Unable to send message.' }, { status: 500 })
  }
}
