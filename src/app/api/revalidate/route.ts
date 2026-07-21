import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const secret = request.headers.get('x-preview-secret') || new URL(request.url).searchParams.get('secret')

  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await request.json().catch(() => ({}))) as {
    tags?: string[]
    paths?: string[]
  }

  for (const tag of body.tags || []) revalidateTag(tag)
  for (const path of body.paths || []) revalidatePath(path)

  return NextResponse.json({ revalidated: true })
}
