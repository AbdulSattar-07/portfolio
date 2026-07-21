import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access'
import { CONTACT_STATUSES } from '@/lib/constants'

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  labels: {
    singular: 'Contact Message',
    plural: 'Contact Messages',
  },
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['name', 'email', 'subject', 'status', 'createdAt'],
    group: 'Inbox',
  },
  access: {
    read: adminOnly,
    create: () => true,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'company', type: 'text' },
    { name: 'subject', type: 'text', required: true },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
    },
    { name: 'budget', type: 'text' },
    {
      name: 'preferredContactMethod',
      type: 'select',
      options: [
        { label: 'Email', value: 'email' },
        { label: 'Phone', value: 'phone' },
        { label: 'WhatsApp', value: 'whatsapp' },
      ],
    },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [...CONTACT_STATUSES],
      admin: { position: 'sidebar' },
    },
    { name: 'sourcePage', type: 'text', admin: { readOnly: true } },
    {
      name: 'ipHash',
      type: 'text',
      admin: { readOnly: true, position: 'sidebar' },
      access: { read: adminOnly },
    },
    {
      name: 'userAgent',
      type: 'text',
      admin: { readOnly: true },
      access: { read: adminOnly },
    },
    { name: 'readAt', type: 'date', admin: { position: 'sidebar' } },
    { name: 'repliedAt', type: 'date', admin: { position: 'sidebar' } },
    { name: 'adminNotes', type: 'textarea' },
  ],
}
