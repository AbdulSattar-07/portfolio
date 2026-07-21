/** Minimal Lexical JSON helpers for Payload richText. */

export type LexicalDoc = {
  root: {
    type: 'root'
    children: LexicalNode[]
    direction: 'ltr'
    format: ''
    indent: 0
    version: 1
  }
}

type LexicalNode = {
  type: string
  version: 1
  [key: string]: unknown
}

function textNode(text: string): LexicalNode {
  return {
    type: 'text',
    text,
    detail: 0,
    format: 0,
    mode: 'normal',
    style: '',
    version: 1,
  }
}

function paragraph(text: string): LexicalNode {
  return {
    type: 'paragraph',
    children: text ? [textNode(text)] : [],
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
    version: 1,
  }
}

/** Build Lexical rich text from one or more paragraphs. */
export function richText(...paragraphs: string[]): LexicalDoc {
  const parts = paragraphs.map((p) => p.trim()).filter(Boolean)
  return {
    root: {
      type: 'root',
      children: parts.length ? parts.map(paragraph) : [paragraph('')],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

/** Extract plain text from Payload Lexical JSON (for frontend display). */
export function lexicalToPlain(value: unknown): string {
  if (!value) return ''
  if (typeof value === 'string') return value

  const root = (value as { root?: { children?: unknown[] } }).root
  if (!root?.children) return ''

  const walk = (nodes: unknown[]): string[] => {
    const out: string[] = []
    for (const node of nodes) {
      if (!node || typeof node !== 'object') continue
      const n = node as { type?: string; text?: string; children?: unknown[] }
      if (typeof n.text === 'string') out.push(n.text)
      if (Array.isArray(n.children)) out.push(...walk(n.children))
      if (n.type === 'paragraph' || n.type === 'heading' || n.type === 'listitem') {
        out.push('\n')
      }
    }
    return out
  }

  return walk(root.children)
    .join('')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}
