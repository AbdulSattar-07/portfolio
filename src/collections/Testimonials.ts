import type { CollectionConfig } from 'payload'

import { canDelete, editorOrAdmin } from '@/access'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'clientName',
    defaultColumns: ['clientName', 'company', 'rating', 'approved', '_status'],
    group: 'Portfolio',
  },
  versions: {
    drafts: true,
    maxPerDoc: 5,
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return {
        and: [
          { _status: { equals: 'published' } },
          { approved: { equals: true } },
        ],
      }
    },
    create: editorOrAdmin,
    update: editorOrAdmin,
    delete: canDelete,
  },
  fields: [
    { name: 'clientName', type: 'text', required: true },
    { name: 'clientPosition', type: 'text' },
    { name: 'company', type: 'text' },
    { name: 'clientImage', type: 'upload', relationTo: 'media' },
    { name: 'testimonial', type: 'textarea', required: true },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'relatedProject',
      type: 'relationship',
      relationTo: 'projects',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'approved',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
  hooks: {
    afterChange: [revalidateCollection(['testimonials', 'home'], ['/'])],
    afterDelete: [revalidateCollectionDelete(['testimonials', 'home'], ['/'])],
  },
}
