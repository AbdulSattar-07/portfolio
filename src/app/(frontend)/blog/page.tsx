import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { EmptyState, SectionHeading } from '@/components/ui/Section'
import { formatDate } from '@/lib/utils'
import { getPosts, getSiteSettings } from '@/lib/payload'

export const revalidate = 300
export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes on AI, ERP, and software engineering.',
}

export default async function BlogPage() {
  try {
    const settings = await getSiteSettings()
    if (settings.blogEnabled === false) {
      redirect('/')
    }
  } catch {
    // allow page with empty state
  }

  let docs: Awaited<ReturnType<typeof getPosts>>['docs'] = []
  try {
    docs = (await getPosts({ limit: 20 })).docs
  } catch {
    docs = []
  }

  return (
    <div className="section-pad">
      <div className="container-page space-y-10">
        <SectionHeading
          eyebrow="Writing"
          title="Blog"
          description="Optional module — enable it in Site Settings when you are ready to publish."
        />
        {docs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {docs.map((post) => (
              <article key={post.id} className="rounded-xl border border-line p-6">
                <p className="font-mono text-xs text-muted">{formatDate(post.publishedAt)}</p>
                <h2 className="mt-2 font-display text-2xl text-cream">
                  <Link href={`/blog/${post.slug}`} className="hover:text-accent">
                    {post.title}
                  </Link>
                </h2>
                {post.excerpt ? <p className="mt-3 text-sm text-muted">{post.excerpt}</p> : null}
              </article>
            ))}
          </div>
        ) : (
          <EmptyState title="No posts yet" description="Blog architecture is ready. Publish posts from Admin when needed." />
        )}
      </div>
    </div>
  )
}
