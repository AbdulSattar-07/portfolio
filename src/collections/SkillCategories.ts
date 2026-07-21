import type { CollectionConfig } from 'payload'

import { anyone, editorOrAdmin, canDelete } from '@/access'
import { generateSlug } from '@/hooks/generateSlug'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'

export const SkillCategories: CollectionConfig = {
  slug: 'skill-categories',
  labels: {
    singular: 'Skill Category',
    plural: 'Skill Categories',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'isActive', 'displayOrder'],
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
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'icon',
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
      revalidateCollection(['skills', 'home'], ['/', '/skills']),
    ],
    afterDelete: [
      revalidateCollectionDelete(['skills', 'home'], ['/', '/skills']),
    ],
  },
}
