import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../src/payload.config'

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL
  const password = process.env.SEED_ADMIN_PASSWORD
  const name = process.env.SEED_ADMIN_NAME || 'Admin'

  if (!email || !password) {
    throw new Error('SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD are required.')
  }

  const payload = await getPayload({ config })
  const existing = await payload.find({
    collection: 'admins',
    where: { email: { equals: email } },
    limit: 1,
  })

  if (existing.docs[0]) {
    console.log('Admin already exists:', email)
    process.exit(0)
  }

  await payload.create({
    collection: 'admins',
    data: {
      email,
      password,
      name,
      role: 'super-admin',
      isActive: true,
    },
    overrideAccess: true,
  })

  console.log('Admin created:', email)
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
