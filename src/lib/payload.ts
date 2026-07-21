import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

import type { Post, Project } from '@/payload-types'
import config from '@payload-config'

const CACHE_TTL = 300 // 5 minutes — hooks still bust tags on CMS edits

export const getPayloadClient = cache(async () => {
  return getPayload({ config })
})

async function isDraft() {
  const { isEnabled } = await draftMode()
  return isEnabled
}

/** Cross-request cache for published CMS reads. Skipped in draft preview. */
function cachedQuery<T>(
  key: string,
  tags: string[],
  fn: () => Promise<T>,
): Promise<T> {
  return unstable_cache(fn, [key], { tags, revalidate: CACHE_TTL })()
}

export const getSiteSettings = cache(async () => {
  return cachedQuery('site-settings', ['site-settings', 'globals'], async () => {
    const payload = await getPayload({ config })
    return payload.findGlobal({
      slug: 'site-settings',
      depth: 1,
    })
  })
})

export const getHomePage = cache(async () => {
  if (await isDraft()) {
    const payload = await getPayloadClient()
    return payload.findGlobal({ slug: 'home-page', depth: 2, draft: true })
  }

  return cachedQuery('home-page', ['home', 'globals'], async () => {
    const payload = await getPayload({ config })
    return payload.findGlobal({
      slug: 'home-page',
      depth: 2,
    })
  })
})

export const getAboutPage = cache(async () => {
  if (await isDraft()) {
    const payload = await getPayloadClient()
    return payload.findGlobal({ slug: 'about-page', depth: 2, draft: true })
  }

  return cachedQuery('about-page', ['about', 'globals'], async () => {
    const payload = await getPayload({ config })
    return payload.findGlobal({
      slug: 'about-page',
      depth: 2,
    })
  })
})

export const getNavigation = cache(async () => {
  return cachedQuery('navigation', ['navigation', 'globals'], async () => {
    const payload = await getPayload({ config })
    return payload.findGlobal({
      slug: 'navigation',
      depth: 0,
    })
  })
})

export async function getProjects(options?: {
  featured?: boolean
  limit?: number
  page?: number
  category?: string
  technology?: string
  status?: string
  type?: string
  search?: string
  sort?: string
  /** List cards only need cover + tech names */
  list?: boolean
}) {
  const draft = await isDraft()
  const depth = options?.list === false ? 2 : 1
  const cacheKey = `projects:${JSON.stringify({ ...options, draft: false })}`

  const run = async () => {
    const payload = draft ? await getPayloadClient() : await getPayload({ config })
    const and: Record<string, unknown>[] = []

    if (!draft) {
      and.push({ _status: { equals: 'published' } })
      and.push({ projectStatus: { not_equals: 'private' } })
    }

    if (options?.featured) and.push({ featured: { equals: true } })
    if (options?.category) and.push({ 'categories.slug': { equals: options.category } })
    if (options?.technology) and.push({ 'technologies.slug': { equals: options.technology } })
    if (options?.status) and.push({ projectStatus: { equals: options.status } })
    if (options?.type) and.push({ projectType: { equals: options.type } })
    if (options?.search) {
      and.push({
        or: [
          { title: { contains: options.search } },
          { shortDescription: { contains: options.search } },
        ],
      })
    }

    return payload.find({
      collection: 'projects',
      depth,
      limit: options?.limit ?? 12,
      page: options?.page ?? 1,
      sort: options?.sort ?? 'displayOrder',
      draft,
      where: and.length ? { and } : undefined,
    })
  }

  if (draft) return run()
  return cachedQuery(cacheKey, ['projects', 'home'], run)
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const draft = await isDraft()

  const run = async (): Promise<Project | null> => {
    const payload = draft ? await getPayloadClient() : await getPayload({ config })
    const result = await payload.find({
      collection: 'projects',
      depth: 2,
      limit: 1,
      draft,
      where: {
        and: [
          { slug: { equals: slug } },
          ...(draft
            ? []
            : [
                { _status: { equals: 'published' } },
                { projectStatus: { not_equals: 'private' } },
              ]),
        ],
      },
    })
    return result.docs[0] ?? null
  }

  if (draft) return run()
  return cachedQuery(`project:${slug}`, ['projects', `project:${slug}`], run)
}

export async function getSkills(options?: { featured?: boolean; limit?: number }) {
  const cacheKey = `skills:${options?.featured ? 'featured' : 'all'}:${options?.limit ?? 200}`

  return cachedQuery(cacheKey, ['skills'], async () => {
    const payload = await getPayload({ config })
    const and: Record<string, unknown>[] = [{ isActive: { equals: true } }]
    if (options?.featured) and.push({ featured: { equals: true } })

    return payload.find({
      collection: 'skills',
      depth: 1,
      limit: options?.limit ?? 200,
      sort: 'displayOrder',
      where: { and },
    })
  })
}

export async function getSkillCategories() {
  return cachedQuery('skill-categories', ['skills'], async () => {
    const payload = await getPayload({ config })
    return payload.find({
      collection: 'skill-categories',
      depth: 0,
      limit: 50,
      sort: 'displayOrder',
      where: { isActive: { equals: true } },
    })
  })
}

export async function getExperiences(options?: { limit?: number }) {
  const draft = await isDraft()
  const limit = options?.limit ?? 50

  const run = async () => {
    const payload = draft ? await getPayloadClient() : await getPayload({ config })
    return payload.find({
      collection: 'experiences',
      depth: 1,
      limit,
      sort: '-startDate',
      draft,
      where: draft ? undefined : { _status: { equals: 'published' } },
    })
  }

  if (draft) return run()
  return cachedQuery(`experiences:${limit}`, ['experiences', 'home'], run)
}

export async function getEducation() {
  const draft = await isDraft()

  const run = async () => {
    const payload = draft ? await getPayloadClient() : await getPayload({ config })
    return payload.find({
      collection: 'education',
      depth: 0,
      limit: 50,
      sort: '-endDate',
      draft,
      where: draft ? undefined : { _status: { equals: 'published' } },
    })
  }

  if (draft) return run()
  return cachedQuery('education', ['education'], run)
}

export async function getCertifications(options?: { featured?: boolean; limit?: number }) {
  const draft = await isDraft()
  const limit = options?.limit ?? 100
  const cacheKey = `certs:${options?.featured ? 'f' : 'a'}:${limit}`

  const run = async () => {
    const payload = draft ? await getPayloadClient() : await getPayload({ config })
    const and: Record<string, unknown>[] = []
    if (!draft) and.push({ _status: { equals: 'published' } })
    if (options?.featured) and.push({ featured: { equals: true } })

    return payload.find({
      collection: 'certifications',
      depth: 1,
      limit,
      sort: 'displayOrder',
      draft,
      where: and.length ? { and } : undefined,
    })
  }

  if (draft) return run()
  return cachedQuery(cacheKey, ['certifications', 'home'], run)
}

export async function getServices(options?: { featured?: boolean; limit?: number }) {
  const draft = await isDraft()
  const limit = options?.limit ?? 50
  const cacheKey = `services:${options?.featured ? 'f' : 'a'}:${limit}`

  const run = async () => {
    const payload = draft ? await getPayloadClient() : await getPayload({ config })
    const and: Record<string, unknown>[] = []
    if (!draft) {
      and.push({ _status: { equals: 'published' } })
      and.push({ isActive: { equals: true } })
    }
    if (options?.featured) and.push({ featured: { equals: true } })

    return payload.find({
      collection: 'services',
      depth: 1,
      limit,
      sort: 'displayOrder',
      draft,
      where: and.length ? { and } : undefined,
    })
  }

  if (draft) return run()
  return cachedQuery(cacheKey, ['services', 'home'], run)
}

export async function getTestimonials() {
  return cachedQuery('testimonials', ['testimonials', 'home'], async () => {
    const payload = await getPayload({ config })
    return payload.find({
      collection: 'testimonials',
      depth: 0,
      limit: 20,
      sort: 'displayOrder',
      where: {
        and: [{ _status: { equals: 'published' } }, { approved: { equals: true } }],
      },
    })
  })
}

export async function getTechnologies() {
  return cachedQuery('technologies', ['technologies'], async () => {
    const payload = await getPayload({ config })
    return payload.find({
      collection: 'technologies',
      depth: 0,
      limit: 200,
      sort: 'displayOrder',
      where: { isActive: { equals: true } },
    })
  })
}

export async function getProjectCategories() {
  return cachedQuery('project-categories', ['projects'], async () => {
    const payload = await getPayload({ config })
    return payload.find({
      collection: 'project-categories',
      depth: 0,
      limit: 50,
      sort: 'displayOrder',
      where: { isActive: { equals: true } },
    })
  })
}

export async function getPosts(options?: { limit?: number; page?: number }) {
  const draft = await isDraft()
  const limit = options?.limit ?? 12
  const page = options?.page ?? 1

  const run = async () => {
    const payload = draft ? await getPayloadClient() : await getPayload({ config })
    return payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      page,
      sort: '-publishedAt',
      draft,
      where: draft ? undefined : { _status: { equals: 'published' } },
    })
  }

  if (draft) return run()
  return cachedQuery(`posts:${limit}:${page}`, ['posts'], run)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const draft = await isDraft()

  const run = async (): Promise<Post | null> => {
    const payload = draft ? await getPayloadClient() : await getPayload({ config })
    const result = await payload.find({
      collection: 'posts',
      depth: 2,
      limit: 1,
      draft,
      where: {
        and: [
          { slug: { equals: slug } },
          ...(draft ? [] : [{ _status: { equals: 'published' } }]),
        ],
      },
    })
    return result.docs[0] ?? null
  }

  if (draft) return run()
  return cachedQuery(`post:${slug}`, ['posts', `post:${slug}`], run)
}
