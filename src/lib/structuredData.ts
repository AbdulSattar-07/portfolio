import { absoluteUrl } from '@/lib/utils'

export function personJsonLd(input: {
  name: string
  jobTitle?: string | null
  email?: string | null
  url?: string
  sameAs?: (string | null | undefined)[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: input.name,
    jobTitle: input.jobTitle || undefined,
    email: input.email || undefined,
    url: input.url || absoluteUrl('/'),
    sameAs: (input.sameAs || []).filter(Boolean),
  }
}

export function websiteJsonLd(input: { name: string; description?: string | null }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: input.name,
    description: input.description || undefined,
    url: absoluteUrl('/'),
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
