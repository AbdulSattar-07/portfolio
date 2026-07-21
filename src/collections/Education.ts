import type { CollectionConfig } from 'payload'

import { canDelete, editorOrAdmin, publishedOrAuthenticated } from '@/access'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'

export const Education: CollectionConfig = {
  slug: 'education',
  labels: {
    singular: 'Education',
    plural: 'Education',
  },
  admin: {
    useAsTitle: 'institution',
    defaultColumns: ['institution', 'degree', 'endDate', '_status'],
    group: 'Portfolio',
  },
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
  access: {
    read: publishedOrAuthenticated,
    create: editorOrAdmin,
    update: editorOrAdmin,
    delete: canDelete,
  },
  fields: [
    { name: 'institution', type: 'text', required: true },
    { name: 'institutionLogo', type: 'upload', relationTo: 'media' },
    { name: 'degree', type: 'text', required: true },
    { name: 'fieldOfStudy', type: 'text' },
    { name: 'startDate', type: 'date' },
    { name: 'endDate', type: 'date' },
    { name: 'currentlyStudying', type: 'checkbox', defaultValue: false },
    { name: 'grade', type: 'text' },
    { name: 'location', type: 'text' },
    { name: 'description', type: 'textarea' },
    {
      name: 'achievements',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'activities',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
  hooks: {
    afterChange: [revalidateCollection(['education', 'about', 'home'], ['/', '/about', '/experience'])],
    afterDelete: [revalidateCollectionDelete(['education', 'about', 'home'], ['/', '/about', '/experience'])],
  },
}
