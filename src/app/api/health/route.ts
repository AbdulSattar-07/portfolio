import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

export async function GET() {
  const hasDb = Boolean(process.env.DATABASE_URL)
  const useSqlite = process.env.USE_SQLITE
  const onVercel = process.env.VERCEL === '1'

  let dbOk: boolean | string = false
  let dbError: string | null = null

  if (hasDb && useSqlite !== 'true') {
    try {
      const { default: pg } = await import('pg')
      const client = new pg.Client({
        connectionString: process.env.DATABASE_URL,
        connectionTimeoutMillis: 10_000,
        ssl: { rejectUnauthorized: false },
      })
      await client.connect()
      const result = await client.query('select 1 as ok')
      await client.end()
      dbOk = result.rows[0]?.ok === 1
    } catch (error) {
      dbError = error instanceof Error ? error.message : 'db connection failed'
    }
  }

  return NextResponse.json({
    ok: true,
    onVercel,
    hasDb,
    useSqlite,
    dbOk,
    dbError,
    time: new Date().toISOString(),
  })
}
