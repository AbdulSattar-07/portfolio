import { describe, expect, it } from 'vitest'

import { slugify } from '../../src/hooks/generateSlug.ts'
import { parseVideoUrl } from '../../src/lib/video.ts'
import { contactFormSchema } from '../../src/lib/validation.ts'
import { cn } from '../../src/lib/utils.ts'
import { toWhatsAppNumber, whatsappChatUrl, mailtoUrl } from '../../src/lib/contact.ts'

describe('slugify', () => {
  it('normalizes titles into SEO-friendly slugs', () => {
    expect(slugify('Royal ERP AI Chatbot')).toBe('royal-erp-ai-chatbot')
    expect(slugify('  Hello, World!  ')).toBe('hello-world')
  })
})

describe('parseVideoUrl', () => {
  it('parses YouTube and Vimeo links', () => {
    expect(parseVideoUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')?.kind).toBe('youtube')
    expect(parseVideoUrl('https://youtu.be/dQw4w9WgXcQ')?.kind).toBe('youtube')
    expect(parseVideoUrl('https://vimeo.com/123456789')?.kind).toBe('vimeo')
  })

  it('parses direct mp4 urls', () => {
    expect(parseVideoUrl('https://cdn.example.com/demo.mp4')?.kind).toBe('file')
  })
})

describe('contact links', () => {
  it('normalizes Pakistan WhatsApp numbers', () => {
    expect(toWhatsAppNumber('03252467739')).toBe('923252467739')
    expect(whatsappChatUrl('03252467739')).toBe('https://wa.me/923252467739')
  })

  it('builds mailto links', () => {
    expect(mailtoUrl('malikabdulsattar9947@gmail.com')).toBe(
      'mailto:malikabdulsattar9947@gmail.com',
    )
  })
})

describe('contactFormSchema', () => {
  it('accepts a valid payload', () => {
    const result = contactFormSchema.safeParse({
      name: 'Jane Doe',
      email: 'jane@example.com',
      subject: 'Project inquiry',
      message: 'I would like to discuss an ERP automation project.',
      consent: true,
      website: '',
    })
    expect(result.success).toBe(true)
  })

  it('rejects honeypot spam and missing consent', () => {
    expect(
      contactFormSchema.safeParse({
        name: 'Bot',
        email: 'bot@example.com',
        subject: 'Hi there friend',
        message: 'Spam message here with enough length',
        consent: true,
        website: 'http://spam.test',
      }).success,
    ).toBe(false)

    expect(
      contactFormSchema.safeParse({
        name: 'Jane',
        email: 'jane@example.com',
        subject: 'Hello there',
        message: 'Valid length message',
        consent: false,
      }).success,
    ).toBe(false)
  })
})

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('px-2', false && 'hidden', 'text-cream')).toContain('px-2')
  })
})
