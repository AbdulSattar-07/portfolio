import type { CollectionConfig } from 'payload'

import { canDelete, editorOrAdmin, publishedOrAuthenticated } from '@/access'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'

export const Certifications: CollectionConfig = {
  slug: 'certifications',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'issuer', 'issueDate', 'featured', '_status'],
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
    { name: 'title', type: 'text', required: true },
    { name: 'issuer', type: 'text', required: true },
    { name: 'organizationLogo', type: 'upload', relationTo: 'media' },
    { name: 'certificateImage', type: 'upload', relationTo: 'media' },
    { name: 'certificatePdf', type: 'upload', relationTo: 'media' },
    { name: 'issueDate', type: 'date' },
    { name: 'expiryDate', type: 'date' },
    { name: 'doesNotExpire', type: 'checkbox', defaultValue: true },
    { name: 'credentialId', type: 'text' },
    { name: 'verificationUrl', type: 'text' },
    { name: 'description', type: 'textarea' },
    {
      name: 'skillsCovered',
      type: 'relationship',
      relationTo: 'skills',
      hasMany: true,
    },
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
    { name: 'seoTitle', type: 'text' },
    { name: 'seoDescription', type: 'textarea' },
  ],
  hooks: {
    afterChange: [revalidateCollection(['certifications', 'home'], ['/', '/certifications'])],
    afterDelete: [revalidateCollectionDelete(['certifications', 'home'], ['/', '/certifications'])],
  },
}
