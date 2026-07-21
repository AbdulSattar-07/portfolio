import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

async function revalidateTags(tags: string[]) {
  try {
    const { revalidateTag } = await import('next/cache')
    for (const tag of tags) revalidateTag(tag)
  } catch {
    // Payload CLI / non-Next contexts skip revalidation
  }
}

async function revalidatePaths(paths: string[]) {
  try {
    const { revalidatePath } = await import('next/cache')
    for (const path of paths) revalidatePath(path)
  } catch {
    // Payload CLI / non-Next contexts skip revalidation
  }
}

export const revalidateProject: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  if (req.context?.disableRevalidate) return doc

  await revalidateTags(['projects', 'home', 'sitemap'])
  await revalidatePaths(['/', '/projects'])

  if (doc?.slug) {
    await revalidateTags([`project:${doc.slug}`])
    await revalidatePaths([`/projects/${doc.slug}`])
  }

  if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
    await revalidateTags([`project:${previousDoc.slug}`])
    await revalidatePaths([`/projects/${previousDoc.slug}`])
  }

  return doc
}

export const revalidateProjectDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  if (req.context?.disableRevalidate) return doc

  await revalidateTags(['projects', 'home', 'sitemap'])
  await revalidatePaths(['/', '/projects'])

  if (doc?.slug) {
    await revalidateTags([`project:${doc.slug}`])
    await revalidatePaths([`/projects/${doc.slug}`])
  }

  return doc
}

export const revalidateCollection =
  (tags: string[], paths: string[]): CollectionAfterChangeHook =>
  async ({ doc, req }) => {
    if (req.context?.disableRevalidate) return doc
    await revalidateTags(tags)
    await revalidatePaths(paths)
    return doc
  }

export const revalidateCollectionDelete =
  (tags: string[], paths: string[]): CollectionAfterDeleteHook =>
  async ({ doc, req }) => {
    if (req.context?.disableRevalidate) return doc
    await revalidateTags(tags)
    await revalidatePaths(paths)
    return doc
  }

export const revalidateGlobal =
  (tags: string[], paths: string[]): GlobalAfterChangeHook =>
  async ({ doc, req }) => {
    if (req.context?.disableRevalidate) return doc
    await revalidateTags(tags)
    await revalidatePaths(paths)
    return doc
  }

export const revalidatePost: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  if (req.context?.disableRevalidate) return doc

  await revalidateTags(['posts', 'home', 'sitemap'])
  await revalidatePaths(['/', '/blog'])

  if (doc?.slug) {
    await revalidateTags([`post:${doc.slug}`])
    await revalidatePaths([`/blog/${doc.slug}`])
  }

  if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
    await revalidateTags([`post:${previousDoc.slug}`])
    await revalidatePaths([`/blog/${previousDoc.slug}`])
  }

  return doc
}
