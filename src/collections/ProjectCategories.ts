import type { CollectionConfig } from 'payload'

import { anyone, editorOrAdmin, canDelete } from '@/access'
import { generateSlug } from '@/hooks/generateSlug'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'

export const ProjectCategories: CollectionConfig = {
  slug: 'project-categories',
  labels: {
    singular: 'Project Category',
    plural: 'Project Categories',
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
      admin: { description: 'Optional Lucide icon name' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'project-categories',
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
    {
      name: 'seoTitle',
      type: 'text',
    },
    {
      name: 'seoDescription',
      type: 'textarea',
    },
  ],
  hooks: {
    afterChange: [
      revalidateCollection(
        ['project-categories', 'projects', 'home'],
        ['/', '/projects'],
      ),
    ],
    afterDelete: [
      revalidateCollectionDelete(
        ['project-categories', 'projects', 'home'],
        ['/', '/projects'],
      ),
    ],
  },
}
