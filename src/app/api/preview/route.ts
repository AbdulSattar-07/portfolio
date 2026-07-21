import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug') || '/'
  const collection = searchParams.get('collection') || 'pages'

  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
    return new Response('Invalid preview token', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  if (collection === 'projects') {
    redirect(`/projects/${slug}`)
  }

  if (collection === 'posts') {
    redirect(`/blog/${slug}`)
  }

  redirect(slug.startsWith('/') ? slug : `/${slug}`)
}
