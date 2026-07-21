# Professional Portfolio

Production-ready portfolio website with **Next.js App Router**, **Payload CMS**, **PostgreSQL**, and optional **Vercel Blob** media storage.

Owner placeholder profile: **Abdul Sattar** (AI / ERP / Full-Stack). Personal CV data (projects, experience, certificates, photos) is intentionally empty until you provide a CV — then it can be filled via Admin or seed updates.

## Stack

- Next.js 15 + TypeScript + Tailwind CSS 4
- Payload CMS 3 (`/admin`)
- PostgreSQL (Supabase or local Docker)
- Vercel Blob (when `BLOB_READ_WRITE_TOKEN` is set)
- Zod + contact API rate limiting + honeypot

## Quick start

1. **Copy env**

```bash
cp .env.example .env
```

Generate secrets:

```bash
openssl rand -hex 32
```

Set `PAYLOAD_SECRET`, `PREVIEW_SECRET`, and `SEED_ADMIN_PASSWORD`.

2. **Database**

**Local (recommended first):** keep `USE_SQLITE=true` in `.env` (creates `portfolio.db`).

**Production / Docker Postgres:**

```bash
# .env
USE_SQLITE=false
DATABASE_URL=postgresql://...
```

```bash
docker compose up -d
```

Or paste your Supabase connection string into `DATABASE_URL`.

3. **Install & run**

```bash
npm install
npm run dev
```

4. **Seed taxonomy + admin** (no fake projects/testimonials)

```bash
npm run seed
```

5. Open:

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin

Default seed admin uses `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` from `.env`.

## What is included

### Public pages

`/`, `/about`, `/projects`, `/projects/[slug]`, `/skills`, `/experience`, `/certifications`, `/services`, `/contact`, `/resume`, `/blog`, `/blog/[slug]`, `/privacy-policy`, `/terms`

### Admin collections / globals

Projects, categories, technologies, skills, experience, education, certifications, services, testimonials, contact messages, blog, media, site settings, home/about/navigation globals, role-based admins.

### Content updates live

Collection/global hooks call `revalidatePath` / `revalidateTag` so publishing in Admin updates the site without a full redeploy.

## CV update workflow (next step)

When you send your CV:

1. Upload photo + resume in Admin → Media / Site Settings
2. Fill About + Home globals
3. Add Experience, Education, Skills, Projects, Certifications
4. Publish — pages revalidate automatically

Or ask me to map the CV into seed/CMS content for you.

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run seed` | Idempotent baseline seed |
| `npm run generate:types` | Regenerate Payload types |
| `npm run generate:importmap` | Regenerate admin import map |
| `npm test` | Unit tests (Vitest) |
| `npm run test:e2e` | Playwright smoke tests |

## Deploy (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Set env vars from `.env.example`
4. Attach Supabase Postgres + Vercel Blob
5. Deploy

See `DEPLOYMENT.md` for a checklist.

## Notes

- Without Docker, local development uses SQLite (`USE_SQLITE=true`). Production should use Supabase PostgreSQL (`USE_SQLITE=false`).
- Without `BLOB_READ_WRITE_TOKEN`, media uses local upload storage (fine for local; use Blob in production).
- Blog is disabled by default (`blogEnabled: false` in Site Settings).
- Contact messages always save to the database; email send is optional.
- Fake testimonials/certifications/projects are intentionally not seeded.
