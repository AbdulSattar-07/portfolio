# Deployment Checklist

## 1. Infrastructure

- [ ] Create Supabase project (PostgreSQL)
- [ ] Copy connection string to `DATABASE_URL` (prefer pooled/transaction mode for serverless if required)
- [ ] Create Vercel Blob store and set `BLOB_READ_WRITE_TOKEN`
- [ ] Create Resend (or compatible) API key for contact notifications

## 2. Secrets

Set in Vercel Project Settings → Environment Variables:

- `PAYLOAD_SECRET`
- `PREVIEW_SECRET`
- `DATABASE_URL`
- `BLOB_READ_WRITE_TOKEN`
- `NEXT_PUBLIC_SERVER_URL` (production domain)
- `NEXT_PUBLIC_SITE_NAME`
- `EMAIL_API_KEY` / `EMAIL_FROM` / `CONTACT_EMAIL_TO` (optional)
- `SEED_ADMIN_*` only for one-time seed, not required at runtime

## 3. First deploy

1. Deploy to Vercel
2. Open `https://your-domain/admin` and create the first user if seed was not run
3. Or run seed against production DB carefully from a trusted machine
4. Upload resume + profile image
5. Publish Home/About globals

## 4. Domain & SEO

- [ ] Attach custom domain in Vercel
- [ ] Confirm `/sitemap.xml` and `/robots.txt`
- [ ] Set default SEO fields in Site Settings
- [ ] Verify Open Graph preview

## 5. Security

- [ ] Strong admin password
- [ ] Confirm HTTPS-only cookies in production
- [ ] Disable GraphQL playground in production if unused
- [ ] Review contact form rate limits
