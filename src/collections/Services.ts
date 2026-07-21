import type { CollectionConfig } from 'payload'

import { canDelete, editorOrAdmin } from '@/access'
import { generateSlug } from '@/hooks/generateSlug'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'featured', 'isActive', '_status'],
    group: 'Portfolio',
  },
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return {
        and: [
          { _status: { equals: 'published' } },
          { isActive: { equals: true } },
        ],
      }
    },
    create: editorOrAdmin,
    update: editorOrAdmin,
    delete: canDelete,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar' },
      hooks: { beforeValidate: [generateSlug('title')] },
    },
    { name: 'shortDescription', type: 'textarea', required: true },
    { name: 'fullDescription', type: 'richText' },
    { name: 'icon', type: 'text' },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    {
      name: 'features',
      type: 'array',
      fields: [{ name: 'feature', type: 'text', required: true }],
    },
    {
      name: 'technologies',
      type: 'relationship',
      relationTo: 'technologies',
      hasMany: true,
    },
    {
      name: 'processSteps',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    { name: 'startingPriceText', type: 'text' },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Get in touch' },
    { name: 'ctaUrl', type: 'text', defaultValue: '/contact' },
    {
      name: 'featured',
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
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    { name: 'seoTitle', type: 'text' },
    { name: 'seoDescription', type: 'textarea' },
  ],
  hooks: {
    afterChange: [revalidateCollection(['services', 'home'], ['/', '/services', '/contact'])],
    afterDelete: [revalidateCollectionDelete(['services', 'home'], ['/', '/services', '/contact'])],
  },
}
