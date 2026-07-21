import type { CollectionConfig } from 'payload'

import { canDelete, editorOrAdmin } from '@/access'
import { PROJECT_STATUSES, PROJECT_TYPES } from '@/lib/constants'
import { generateSlug } from '@/hooks/generateSlug'
import { revalidateProject, revalidateProjectDelete } from '@/hooks/revalidate'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Project',
    plural: 'Projects',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'projectStatus', 'featured', '_status', 'updatedAt'],
    group: 'Portfolio',
    preview: (doc) => {
      const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
      const slug = typeof doc?.slug === 'string' ? doc.slug : ''
      if (!slug) return null
      return `${base}/api/preview?secret=${process.env.PREVIEW_SECRET || ''}&collection=projects&slug=${slug}`
    },
  },
  versions: {
    drafts: {
      autosave: {
        interval: 2000,
      },
    },
    maxPerDoc: 25,
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return {
        and: [
          { _status: { equals: 'published' } },
          { projectStatus: { not_equals: 'private' } },
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
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            { name: 'shortDescription', type: 'textarea', required: true, maxLength: 320 },
            { name: 'fullDescription', type: 'richText' },
            { name: 'coverImage', type: 'upload', relationTo: 'media' },
            { name: 'thumbnail', type: 'upload', relationTo: 'media' },
            {
              name: 'gallery',
              type: 'array',
              labels: { singular: 'Image', plural: 'Gallery images' },
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
                { name: 'caption', type: 'text' },
              ],
            },
            {
              name: 'videoUrl',
              type: 'text',
              label: 'Video URL (YouTube / Vimeo / direct MP4)',
              admin: {
                description:
                  'Paste a YouTube, Vimeo, or direct .mp4/.webm link. Preferred for large demos.',
              },
            },
            {
              name: 'videoFile',
              type: 'upload',
              relationTo: 'media',
              label: 'Uploaded video file',
              admin: {
                description: 'Optional MP4/WebM upload (keep under ~50MB locally; use Blob in production).',
              },
              filterOptions: {
                mimeType: { contains: 'video' },
              },
            },
            {
              name: 'videos',
              type: 'array',
              label: 'Extra videos',
              labels: { singular: 'Video', plural: 'Videos' },
              admin: {
                description: 'Add more demos / walkthroughs for this project.',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'url',
                  type: 'text',
                  label: 'YouTube / Vimeo / MP4 URL',
                },
                {
                  name: 'file',
                  type: 'upload',
                  relationTo: 'media',
                  filterOptions: {
                    mimeType: { contains: 'video' },
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Case Study',
          fields: [
            { name: 'problemStatement', type: 'richText' },
            { name: 'businessChallenge', type: 'richText' },
            { name: 'proposedSolution', type: 'richText' },
            { name: 'systemArchitecture', type: 'richText' },
            { name: 'databaseArchitecture', type: 'richText' },
            {
              name: 'keyModules',
              type: 'array',
              fields: [{ name: 'module', type: 'text', required: true }],
            },
            {
              name: 'features',
              type: 'array',
              fields: [{ name: 'feature', type: 'text', required: true }],
            },
            {
              name: 'responsibilities',
              type: 'array',
              fields: [{ name: 'item', type: 'text', required: true }],
            },
            { name: 'developmentProcess', type: 'richText' },
            { name: 'technicalImplementation', type: 'richText' },
            { name: 'challenges', type: 'richText' },
            { name: 'challengeSolutions', type: 'richText' },
            { name: 'securityImplementation', type: 'richText' },
            { name: 'performanceImprovements', type: 'richText' },
            { name: 'results', type: 'richText' },
            {
              name: 'measurableOutcomes',
              type: 'array',
              fields: [{ name: 'outcome', type: 'text', required: true }],
            },
            { name: 'lessonsLearned', type: 'richText' },
            { name: 'futureImprovements', type: 'richText' },
          ],
        },
        {
          label: 'Meta',
          fields: [
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'project-categories',
              hasMany: true,
            },
            {
              name: 'technologies',
              type: 'relationship',
              relationTo: 'technologies',
              hasMany: true,
            },
            {
              name: 'projectType',
              type: 'select',
              options: [...PROJECT_TYPES],
              defaultValue: 'professional',
            },
            {
              name: 'projectStatus',
              type: 'select',
              options: [...PROJECT_STATUSES],
              defaultValue: 'completed',
              index: true,
            },
            { name: 'clientName', type: 'text' },
            { name: 'companyName', type: 'text' },
            { name: 'startDate', type: 'date' },
            { name: 'completionDate', type: 'date' },
            { name: 'demoUrl', type: 'text' },
            { name: 'githubUrl', type: 'text' },
            {
              name: 'repositoryVisibility',
              type: 'select',
              options: [
                { label: 'Public', value: 'public' },
                { label: 'Private', value: 'private' },
                { label: 'None', value: 'none' },
              ],
              defaultValue: 'none',
            },
            { name: 'documentationUrl', type: 'text' },
            { name: 'caseStudyUrl', type: 'text' },
            {
              name: 'relatedProjects',
              type: 'relationship',
              relationTo: 'projects',
              hasMany: true,
              filterOptions: ({ id }) => ({ id: { not_equals: id } }),
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'seoTitle', type: 'text' },
            { name: 'seoDescription', type: 'textarea' },
            { name: 'seoImage', type: 'upload', relationTo: 'media' },
            { name: 'canonicalUrl', type: 'text' },
            {
              name: 'noIndex',
              type: 'checkbox',
              defaultValue: false,
              label: 'Hide from search engines',
            },
          ],
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
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
    afterChange: [revalidateProject],
    afterDelete: [revalidateProjectDelete],
  },
}
