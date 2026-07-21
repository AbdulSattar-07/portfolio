import type { CollectionConfig } from 'payload'

import { canDelete, editorOrAdmin, publishedOrAuthenticated } from '@/access'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  labels: {
    singular: 'Experience',
    plural: 'Experiences',
  },
  admin: {
    useAsTitle: 'jobTitle',
    defaultColumns: ['jobTitle', 'companyName', 'startDate', '_status'],
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
    { name: 'companyName', type: 'text', required: true },
    { name: 'companyLogo', type: 'upload', relationTo: 'media' },
    { name: 'companyUrl', type: 'text' },
    { name: 'jobTitle', type: 'text', required: true },
    {
      name: 'employmentType',
      type: 'select',
      options: [
        { label: 'Full-Time', value: 'full-time' },
        { label: 'Part-Time', value: 'part-time' },
        { label: 'Contract', value: 'contract' },
        { label: 'Freelance', value: 'freelance' },
        { label: 'Consulting', value: 'consulting' },
        { label: 'Internship', value: 'internship' },
        { label: 'Self-Employed', value: 'self-employed' },
      ],
      defaultValue: 'full-time',
    },
    { name: 'location', type: 'text' },
    {
      name: 'workMode',
      type: 'select',
      options: [
        { label: 'On-site', value: 'on-site' },
        { label: 'Remote', value: 'remote' },
        { label: 'Hybrid', value: 'hybrid' },
      ],
    },
    { name: 'startDate', type: 'date', required: true },
    { name: 'endDate', type: 'date' },
    { name: 'currentlyWorking', type: 'checkbox', defaultValue: false },
    { name: 'summary', type: 'textarea' },
    { name: 'fullDescription', type: 'richText' },
    {
      name: 'responsibilities',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'achievements',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'projectsHandled',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
    },
    {
      name: 'technologies',
      type: 'relationship',
      relationTo: 'technologies',
      hasMany: true,
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
  hooks: {
    afterChange: [revalidateCollection(['experience', 'home'], ['/', '/experience'])],
    afterDelete: [revalidateCollectionDelete(['experience', 'home'], ['/', '/experience'])],
  },
}
