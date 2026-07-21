import type { CollectionConfig } from 'payload'

import { anyone, editorOrAdmin, canDelete } from '@/access'
import { generateSlug } from '@/hooks/generateSlug'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'

export const Technologies: CollectionConfig = {
  slug: 'technologies',
  labels: {
    singular: 'Technology',
    plural: 'Technologies',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'isActive', 'displayOrder'],
    group: 'Taxonomy',
  },
  access: {
    read: anyone,
    create: editorOrAdmin,
    update: editorOrAdmin,
    delete: canDelete,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar' },
      hooks: {
        beforeValidate: [generateSlug('name')],
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'icon',
      type: 'text',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Programming Language', value: 'programming-language' },
        { label: 'Framework', value: 'framework' },
        { label: 'Database', value: 'database' },
        { label: 'Cloud Platform', value: 'cloud' },
        { label: 'AI Platform', value: 'ai' },
        { label: 'ERP Platform', value: 'erp' },
        { label: 'DevOps', value: 'devops' },
        { label: 'Frontend', value: 'frontend' },
        { label: 'Backend', value: 'backend' },
        { label: 'Data Science', value: 'data-science' },
        { label: 'Automation', value: 'automation' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'officialUrl',
      type: 'text',
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
    afterChange: [
      revalidateCollection(['technologies', 'projects', 'skills', 'home'], ['/', '/skills', '/projects']),
    ],
    afterDelete: [
      revalidateCollectionDelete(['technologies', 'projects', 'skills', 'home'], ['/', '/skills', '/projects']),
    ],
  },
}
