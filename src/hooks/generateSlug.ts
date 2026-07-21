import type { FieldHook } from 'payload'

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120)
}

export const generateSlug =
  (fieldName = 'title'): FieldHook =>
  ({ data, operation, value, siblingData }) => {
    if (typeof value === 'string' && value.length > 0) {
      return slugify(value)
    }

    if (operation === 'create' || !value) {
      const source =
        (typeof data?.[fieldName] === 'string' && data[fieldName]) ||
        (typeof siblingData?.[fieldName] === 'string' && siblingData[fieldName])

      if (typeof source === 'string' && source.length > 0) {
        return slugify(source)
      }
    }

    return value
  }
