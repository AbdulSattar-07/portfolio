import type { CollectionConfig } from 'payload'

import { anyone, canDelete, editorOrAdmin } from '@/access'
import { PROFICIENCY_LABELS } from '@/lib/constants'
import { generateSlug } from '@/hooks/generateSlug'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'

export const Skills: CollectionConfig = {
  slug: 'skills',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'proficiency', 'featured', 'isActive'],
    group: 'Portfolio',
  },
  access: {
    read: anyone,
    create: editorOrAdmin,
    update: editorOrAdmin,
    delete: canDelete,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar' },
      hooks: { beforeValidate: [generateSlug('name')] },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'skill-categories',
      required: true,
    },
    { name: 'icon', type: 'text' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    {
      name: 'proficiency',
      type: 'select',
      required: true,
      options: PROFICIENCY_LABELS.map((label) => ({ label, value: label.toLowerCase().replace(/\s+/g, '-') })),
      defaultValue: 'intermediate',
    },
    { name: 'yearsOfExperience', type: 'number', min: 0 },
    { name: 'description', type: 'textarea' },
    {
      name: 'proficiencyPercent',
      type: 'number',
      min: 0,
      max: 100,
      admin: { description: 'Optional presentation-only percentage' },
    },
    {
      name: 'relatedTechnologies',
      type: 'relationship',
      relationTo: 'technologies',
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
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
  hooks: {
    afterChange: [revalidateCollection(['skills', 'home'], ['/', '/skills'])],
    afterDelete: [revalidateCollectionDelete(['skills', 'home'], ['/', '/skills'])],
  },
}
