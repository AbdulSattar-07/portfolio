import type { MetadataRoute } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { absoluteUrl } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '',
    '/about',
    '/projects',
    '/skills',
    '/experience',
    '/certifications',
    '/services',
    '/contact',
    '/resume',
    '/privacy-policy',
    '/terms',
  ].map((path) => ({
    url: absoluteUrl(path || '/'),
    lastModified: new Date(),
  }))

  try {
    const payload = await getPayloadClient()
    const [projects, posts, settings] = await Promise.all([
      payload.find({
        collection: 'projects',
        limit: 500,
        where: {
          and: [{ _status: { equals: 'published' } }, { projectStatus: { not_equals: 'private' } }],
        },
        depth: 0,
      }),
      payload.find({
        collection: 'posts',
        limit: 500,
        where: { _status: { equals: 'published' } },
        depth: 0,
      }),
      payload.findGlobal({ slug: 'site-settings' }),
    ])

    const projectEntries = projects.docs.map((doc) => ({
      url: absoluteUrl(`/projects/${doc.slug}`),
      lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
    }))

    const postEntries =
      settings.blogEnabled === false
        ? []
        : [
            { url: absoluteUrl('/blog'), lastModified: new Date() },
            ...posts.docs.map((doc) => ({
              url: absoluteUrl(`/blog/${doc.slug}`),
              lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
            })),
          ]

    return [...staticRoutes, ...projectEntries, ...postEntries]
  } catch {
    return staticRoutes
  }
}
