import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import {
  Admins,
  Authors,
  Certifications,
  ContactMessages,
  Education,
  Experiences,
  Media,
  PostCategories,
  Posts,
  ProjectCategories,
  Projects,
  Services,
  SkillCategories,
  Skills,
  Tags,
  Technologies,
  Testimonials,
} from './collections'
import { AboutPage, HomePage, Navigation, SiteSettings } from './globals'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseUrl = process.env.DATABASE_URL || ''
const useSqlite =
  process.env.USE_SQLITE === 'true' ||
  databaseUrl.startsWith('file:') ||
  !databaseUrl

const plugins = []

if (process.env.BLOB_READ_WRITE_TOKEN) {
  plugins.push(
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: true,
    }),
  )
}

export default buildConfig({
  admin: {
    user: Admins.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — Portfolio Admin',
    },
  },
  collections: [
    Admins,
    Media,
    Projects,
    ProjectCategories,
    Technologies,
    Skills,
    SkillCategories,
    Experiences,
    Education,
    Certifications,
    Services,
    Testimonials,
    ContactMessages,
    Posts,
    PostCategories,
    Tags,
    Authors,
  ],
  globals: [SiteSettings, HomePage, AboutPage, Navigation],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dev-only-change-me-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Schema push on every cold start is slow — only enable when changing collections
  // (set PAYLOAD_DATABASE_PUSH=true once, then turn it off again).
  db: useSqlite
    ? sqliteAdapter({
        client: {
          url: databaseUrl.startsWith('file:')
            ? databaseUrl
            : `file:${path.resolve(dirname, '../portfolio.db')}`,
        },
        push: process.env.PAYLOAD_DATABASE_PUSH === 'true',
      })
    : postgresAdapter({
        pool: {
          connectionString: databaseUrl,
          max: 5,
        },
        push: process.env.PAYLOAD_DATABASE_PUSH === 'true',
      }),
  sharp,
  plugins,
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'].filter(Boolean),
})
