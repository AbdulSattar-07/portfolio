import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

import { getPostBySlug, getSiteSettings } from '@/lib/payload'
import { absoluteUrl, formatDate } from '@/lib/utils'

export const revalidate = 300

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await getPostBySlug(slug)
    if (!post) return { title: 'Post' }
    return {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || undefined,
      robots: post.noIndex ? { index: false, follow: false } : undefined,
      alternates: { canonical: post.canonicalUrl || absoluteUrl(`/blog/${post.slug}`) },
    }
  } catch {
    return { title: 'Post' }
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  try {
    const settings = await getSiteSettings()
    if (settings.blogEnabled === false) redirect('/')
  } catch {
    // continue
  }

  const post = await getPostBySlug(slug).catch(() => null)
  if (!post) notFound()

  return (
    <article className="section-pad">
      <div className="container-page max-w-3xl space-y-6">
        <Link href="/blog" className="text-sm text-muted hover:text-accent">
          ← Blog
        </Link>
        <p className="font-mono text-xs text-muted">{formatDate(post.publishedAt)}</p>
        <h1 className="font-display text-4xl font-semibold text-cream text-balance">{post.title}</h1>
        {post.excerpt ? <p className="text-lg text-muted">{post.excerpt}</p> : null}
        <div className="prose-portfolio border-t border-line pt-8 text-muted">
          <p className="whitespace-pre-wrap leading-relaxed">
            {typeof post.content === 'string' ? post.content : 'Full article content is managed as rich text in Admin.'}
          </p>
        </div>
      </div>
    </article>
  )
}
