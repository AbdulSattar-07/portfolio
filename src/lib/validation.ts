import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Name is required').max(100),
  email: z.string().trim().email('Valid email required').max(200),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  subject: z.string().trim().min(3, 'Subject is required').max(160),
  service: z.string().optional().or(z.literal('')),
  budget: z.string().optional().or(z.literal('')),
  preferredContactMethod: z.enum(['email', 'phone', 'whatsapp']).optional(),
  message: z.string().trim().min(10, 'Message is too short').max(5000),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Consent is required' }),
  }),
  website: z.string().max(0).optional().or(z.literal('')),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
