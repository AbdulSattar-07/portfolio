import type { CollectionConfig } from 'payload'

import { canDelete, editorOrAdmin, publishedOrAuthenticated } from '@/access'
import { generateSlug } from '@/hooks/generateSlug'
import { revalidatePost } from '@/hooks/revalidate'
import { revalidateCollectionDelete } from '@/hooks/revalidate'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', '_status', 'publishedAt'],
    group: 'Blog',
    hidden: true, // enable via Site Settings later; keeps admin sidebar clean
    preview: (doc) => {
      const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
      const slug = typeof doc?.slug === 'string' ? doc.slug : ''
      if (!slug) return null
      return `${base}/api/preview?secret=${process.env.PREVIEW_SECRET || ''}&collection=posts&slug=${slug}`
    },
  },
  versions: {
    drafts: {
      autosave: { interval: 2000 },
    },
    maxPerDoc: 25,
  },
  access: {
    read: publishedOrAuthenticated,
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
    { name: 'excerpt', type: 'textarea' },
    { name: 'content', type: 'richText', required: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'post-categories',
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'readingTime',
      type: 'number',
      admin: { position: 'sidebar', description: 'Minutes (auto-estimated if empty)' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    { name: 'seoTitle', type: 'text' },
    { name: 'seoDescription', type: 'textarea' },
    { name: 'seoImage', type: 'upload', relationTo: 'media' },
    { name: 'canonicalUrl', type: 'text' },
    {
      name: 'noIndex',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && data?._status === 'published' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }
        return data
      },
    ],
    afterChange: [revalidatePost],
    afterDelete: [
      revalidateCollectionDelete(['posts', 'home', 'sitemap'], ['/', '/blog']),
    ],
  },
}
