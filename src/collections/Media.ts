import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

import { authenticated, editorOrAdmin, anyone } from '@/access'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
  admin: {
    group: 'Content',
  },
  access: {
    read: anyone,
    create: editorOrAdmin,
    update: editorOrAdmin,
    delete: authenticated,
  },
  upload: {
    staticDir: path.resolve(dirname, '../../media'),
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/avif',
      'image/gif',
      'application/pdf',
      'video/mp4',
      'video/webm',
      'video/ogg',
    ],
    // Skip image resizing for video uploads
    imageSizes: [
      { name: 'thumbnail', width: 400, height: undefined, position: 'centre' },
      { name: 'card', width: 768, height: undefined, position: 'centre' },
      { name: 'tablet', width: 1024, height: undefined, position: 'centre' },
      { name: 'desktop', width: 1600, height: undefined, position: 'centre' },
      { name: 'large', width: 2400, height: undefined, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'folder',
      type: 'select',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Projects', value: 'projects' },
        { label: 'Profile', value: 'profile' },
        { label: 'Certifications', value: 'certifications' },
        { label: 'Blog', value: 'blog' },
        { label: 'Videos', value: 'videos' },
        { label: 'Documents', value: 'documents' },
      ],
      defaultValue: 'general',
    },
  ],
}
