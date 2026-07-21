# MASTER DEVELOPMENT PROMPT

## Production-Ready Professional Portfolio Website with Secure Admin CMS

You are a senior full-stack software architect, Next.js engineer, database designer, UI/UX developer, security engineer, DevOps engineer, and QA engineer.

Your task is to design and develop a complete, production-ready, secure, scalable, database-driven professional portfolio website from zero to final deployment.

Do not create a basic demo, incomplete starter template, static portfolio, mock-only interface, or partial implementation.

The final system must be fully functional and must include:

* Professional public portfolio website
* Secure admin dashboard
* Database-driven content
* Project and category management
* Skills and experience management
* Certification management
* Media and image uploads
* Draft and publishing workflows
* Authentication and authorization
* SEO
* Contact form
* Responsive design
* Security controls
* Automated content revalidation
* Testing
* Database migrations
* Vercel deployment configuration
* Complete documentation

The portfolio owner is:

```text
Name: Abdul Sattar

Professional Roles:
- AI Developer
- Generative AI Developer
- Python Developer
- Django Developer
- Database Developer
- Full-Stack Web Developer

Primary Skills:
- Python
- Django
- FastAPI
- PHP
- Laravel
- JavaScript
- TypeScript
- Next.js
- React
- PostgreSQL
- MySQL
- Oracle
- SAP HANA
- SQL Server
- LangChain
- OpenAI APIs
- Groq APIs
- Machine Learning
- Generative AI
- ERP Systems
- SAP Business One
- REST APIs
- Business Automation
```

---

# 1. Required Technology Stack

Use the following stack unless a serious technical incompatibility is discovered.

## Frontend and Full-Stack Framework

```text
Next.js latest stable compatible release
Next.js App Router
TypeScript strict mode
React Server Components
Tailwind CSS
```

## CMS and Admin Dashboard

```text
Payload CMS
```

Payload must run inside the same Next.js application.

Admin dashboard route:

```text
/admin
```

## Database

```text
PostgreSQL
```

Use:

```text
Supabase PostgreSQL
```

The implementation must also work with any standard PostgreSQL connection string.

## Media Storage

Use:

```text
Vercel Blob Storage
```

Integrate Payload CMS using its official Vercel Blob storage adapter.

Do not save persistent uploaded media to the application’s local filesystem.

## Authentication

Use:

```text
Payload CMS authentication
```

Admin authentication must support:

* Secure login
* Password hashing
* HTTP-only cookies
* Role-based authorization
* Active/inactive user status
* Login attempt protection
* Session expiration
* Password reset architecture
* Optional future MFA support

## Deployment

Use:

```text
GitHub
Vercel
Supabase PostgreSQL
Vercel Blob
```

## Additional Libraries

Use reliable, maintained libraries for:

* Form validation
* Schema validation
* Rich text
* Icons
* Notifications
* Accessible UI components
* Image processing
* Rate limiting
* Email sending
* Testing

Suggested choices:

```text
Zod
React Hook Form
Payload Lexical Editor
Lucide React
Sharp
Vitest
Playwright
```

Do not install unnecessary dependencies.

---

# 2. Core Functional Objective

The portfolio owner must be able to manage the entire portfolio through the admin dashboard without modifying source code.

When an admin adds, edits, publishes, archives, deletes, or reorders content, the changes must automatically appear on the live website.

The administrator must be able to manage:

* Home page content
* About page
* Projects
* Project categories
* Technologies
* Skills
* Skill categories
* Professional experience
* Education
* Certifications
* Services
* Testimonials
* Media
* Resume
* Social links
* SEO metadata
* Contact messages
* Site settings
* Admin users
* Blog posts as an optional scalable module

---

# 3. Public Website Pages

Implement the following public routes.

```text
/
 /about
 /projects
 /projects/[slug]
 /skills
 /experience
 /certifications
 /services
 /contact
 /resume
 /blog
 /blog/[slug]
 /privacy-policy
 /terms
 /404
```

The blog can be included in the architecture even if initially disabled through site settings.

---

# 4. Home Page Requirements

The home page must be fully manageable through the CMS.

Include the following sections.

## Hero Section

Fields:

* Full name
* Professional title
* Short tagline
* Professional introduction
* Profile image
* Background image or visual
* Primary CTA
* Secondary CTA
* Resume download button
* Availability status
* Social profile links

Example content direction:

```text
Awais Anis
AI, ERP and Full-Stack Software Developer

I build scalable ERP systems, intelligent AI applications,
business automation platforms and data-driven software solutions.
```

## Professional Highlights

Support dynamic statistics such as:

* Years of experience
* Completed projects
* Technologies
* ERP implementations
* Clients served
* Certifications

Do not hardcode these values in frontend components.

## Featured Projects

Display projects marked as featured.

## Skill Categories

Show selected skill categories and technologies.

## Experience Summary

Show recent professional experience.

## Services Summary

Show featured services.

## Certifications Summary

Show selected certifications.

## Testimonials

Display approved and published testimonials.

## Contact Call-to-Action

Include a clear final CTA.

---

# 5. About Page

The About page must include:

* Detailed biography
* Career summary
* Professional objectives
* Work philosophy
* Current role
* Location
* Languages
* Availability
* Personal image
* Resume download
* Core competencies
* Professional values
* Career highlights

All content must be editable from the CMS.

---

# 6. Projects Module

Projects are one of the most important parts of the system.

## Project Listing Page

Implement:

* Responsive project card grid
* Category filtering
* Technology filtering
* Project type filtering
* Project status filtering
* Search
* Sorting
* Featured projects
* Pagination or load more
* Empty states
* Loading states
* SEO metadata
* Accessible filters
* URL-based filters where practical

## Project Detail Page

Every project must support:

* Title
* Slug
* Short description
* Full rich-text description
* Cover image
* Thumbnail
* Project gallery
* Video URL
* Project category
* Technologies
* Project type
* Project status
* Client name
* Company name
* Start date
* Completion date
* Current maintenance status
* Demo URL
* GitHub URL
* Repository visibility
* Documentation URL
* Case study URL
* Problem statement
* Business challenge
* Proposed solution
* System architecture
* Database architecture
* Key modules
* Features
* Responsibilities
* Development process
* Technical implementation
* Challenges
* Solutions to challenges
* Security implementation
* Performance improvements
* Results
* Measurable outcomes
* Lessons learned
* Future improvements
* Related projects
* Featured status
* Display order
* Draft status
* Publish date
* SEO title
* SEO description
* SEO image
* Canonical URL
* Index/no-index option

## Project Types

Support:

```text
Personal
Professional
Client
Company
Academic
Open Source
Research
Internal
```

## Project Status

Support:

```text
Completed
In Progress
Maintenance
Planned
Concept
Archived
Private
```

Private projects must not be accessible publicly.

---

# 7. Project Categories

Create a separate `project-categories` collection.

Fields:

* Name
* Slug
* Description
* Icon
* Image
* Parent category
* Display order
* Active status
* SEO title
* SEO description

Examples:

```text
Artificial Intelligence
Generative AI
ERP Systems
Web Applications
Mobile Applications
Business Automation
SAP Business One
Database Systems
Data Analytics
Machine Learning
```

---

# 8. Technologies Module

Create a reusable `technologies` collection.

Fields:

* Name
* Slug
* Logo
* Icon
* Technology category
* Description
* Official URL
* Display order
* Active status

Categories can include:

```text
Programming Language
Framework
Database
Cloud Platform
AI Platform
ERP Platform
DevOps
Frontend
Backend
Data Science
Automation
```

Technologies must be reusable across:

* Projects
* Experience
* Skills
* Services
* Blog posts

---

# 9. Skills Module

Create:

```text
skill-categories
skills
```

## Skill Category Fields

* Name
* Slug
* Description
* Icon
* Display order
* Active status

## Skill Fields

* Name
* Slug
* Skill category
* Icon
* Logo
* Proficiency
* Years of experience
* Description
* Featured status
* Display order
* Active status
* Related technologies

Use proficiency labels:

```text
Expert
Advanced
Intermediate
Working Knowledge
Familiar
```

Do not rely only on fake percentage bars.

If percentage values are included, make them optional and clearly presentation-only.

---

# 10. Experience Module

Create an `experiences` collection.

Fields:

* Company name
* Company logo
* Job title
* Employment type
* Location
* Remote/on-site/hybrid
* Start date
* End date
* Currently working
* Short summary
* Full description
* Responsibilities
* Achievements
* Projects handled
* Technologies used
* Company website
* Display order
* Published status

Employment types:

```text
Full-Time
Part-Time
Contract
Freelance
Consulting
Internship
Self-Employed
```

Display experience as a responsive timeline.

---

# 11. Education Module

Create an `education` collection.

Fields:

* Institution
* Institution logo
* Degree
* Field of study
* Start date
* End date
* Currently studying
* Grade
* Location
* Description
* Achievements
* Activities
* Display order
* Published status

---

# 12. Certifications Module

Create a `certifications` collection.

Fields:

* Certificate title
* Issuing organization
* Organization logo
* Certificate image
* Certificate PDF
* Issue date
* Expiry date
* Does not expire
* Credential ID
* Verification URL
* Description
* Skills covered
* Featured status
* Display order
* Published status
* SEO metadata

Admin must be able to:

* Upload certificate image
* Upload PDF
* Add credential URL
* Change ordering
* Feature a certification
* Hide expired certification
* Publish or draft certification

---

# 13. Services Module

Create a `services` collection.

Fields:

* Title
* Slug
* Short description
* Full description
* Icon
* Cover image
* Features
* Technologies
* Process steps
* Starting price text
* CTA label
* CTA URL
* Featured status
* Display order
* Active status
* SEO metadata

Example services:

```text
AI Chatbot Development
Generative AI Integration
ERP Software Development
Django Development
Laravel Development
SAP Business One Consulting
Database Design and Optimization
Business Process Automation
API Development and Integration
Custom Web Application Development
```

---

# 14. Testimonials Module

Create a `testimonials` collection.

Fields:

* Client name
* Client position
* Company
* Client image
* Testimonial
* Rating
* Related project
* Featured status
* Approval status
* Published status
* Display order

Only approved and published testimonials must appear publicly.

---

# 15. Blog Module

Create an optional but production-ready blog architecture.

Collections:

```text
posts
post-categories
tags
authors
```

Post fields:

* Title
* Slug
* Excerpt
* Rich-text content
* Cover image
* Author
* Category
* Tags
* Published date
* Updated date
* Reading time
* Featured status
* Draft/published status
* SEO title
* SEO description
* SEO image
* Canonical URL
* Index/no-index

Blog categories can include:

```text
Artificial Intelligence
ERP Development
Django
Laravel
SQL
SAP Business One
Automation
Software Architecture
Tutorials
Case Studies
```

---

# 16. Contact Module

Create a professional contact page and backend form.

## Contact Form Fields

* Name
* Email
* Phone
* Company
* Subject
* Required service
* Budget range
* Preferred contact method
* Message
* Consent checkbox
* Anti-spam token

## Contact Message Database Fields

* Name
* Email
* Phone
* Company
* Subject
* Service
* Budget
* Message
* Status
* Source page
* IP hash
* User agent
* Created date
* Read date
* Replied date
* Admin notes

Statuses:

```text
New
Read
In Progress
Replied
Converted
Archived
Spam
```

## Contact Form Security

Implement:

* Server-side validation
* Client-side validation
* Rate limiting
* Honeypot field
* CAPTCHA integration capability
* Input sanitization
* Maximum length restrictions
* Email validation
* CSRF-safe submission architecture
* Spam detection hooks
* No sensitive IP storage; store only a hash if needed

Send an email notification when a valid message is submitted.

Also save the message in PostgreSQL.

The form must still save the message even if the email provider temporarily fails.

---

# 17. Media Management

Create a Payload `media` collection.

Support:

* JPG
* JPEG
* PNG
* WEBP
* AVIF
* PDF where appropriate

Media fields:

* File
* Alt text
* Caption
* Description
* Folder/category
* Width
* Height
* File size
* MIME type
* Uploaded by
* Created date

Generate responsive sizes:

```text
Thumbnail
Card
Tablet
Desktop
Large
```

Recommended sizes:

```text
Thumbnail: 400px
Card: 768px
Tablet: 1024px
Desktop: 1600px
Large: 2400px
```

Requirements:

* Alt text must be required for public images
* Validate MIME type
* Validate extension
* Restrict file size
* Sanitize filename
* Generate unique filename
* Disable or sanitize SVG uploads
* Block executable files
* Use Sharp for optimization
* Use Vercel Blob client uploads for larger files where required

---

# 18. Admin Users and Roles

Create an authenticated `admins` collection.

Fields:

* Name
* Email
* Password
* Avatar
* Role
* Active status
* Last login
* Login attempts
* Account lock status
* Created date
* Updated date

Roles:

```text
Super Admin
Admin
Editor
Viewer
```

## Role Permissions

### Super Admin

Can:

* Manage all content
* Manage users
* Manage roles
* Delete content
* Edit global settings
* View messages
* Publish content
* Access system settings

### Admin

Can:

* Manage all content
* Publish content
* Manage media
* View messages
* Cannot remove the primary super admin

### Editor

Can:

* Create content
* Edit content
* Save drafts
* Upload media
* Cannot manage users
* Cannot permanently delete important content
* Publishing can be configurable

### Viewer

Can:

* View admin content
* View messages if permitted
* Cannot create, update, publish, or delete content

Implement access controls at:

* Collection level
* Field level
* Admin interface level
* API level

Do not rely only on hidden UI buttons.

---

# 19. Global CMS Settings

Create Payload Globals.

## Site Settings

Fields:

* Site name
* Site tagline
* Logo
* Dark logo
* Favicon
* Default SEO title
* Default SEO description
* Default SEO image
* Contact email
* Business email
* Phone
* WhatsApp number
* Location
* Resume
* GitHub URL
* LinkedIn URL
* Facebook URL
* Instagram URL
* YouTube URL
* Footer text
* Copyright text
* Analytics ID
* Maintenance mode
* Blog enabled
* Testimonials enabled
* Contact form enabled

## Home Page Global

Fields:

* Hero content
* Hero image
* CTA buttons
* Highlight statistics
* Featured projects
* Featured skills
* Featured services
* Featured certifications
* Experience section
* Testimonials section
* Contact CTA

## About Page Global

Fields:

* Page heading
* Biography
* Profile image
* Career summary
* Values
* Highlights
* Resume
* SEO settings

## Navigation Global

Fields:

* Header navigation items
* Footer navigation items
* CTA button
* Visibility settings
* Ordering
* External/internal link configuration

---

# 20. Draft, Version and Publishing Workflow

Enable Payload versions and drafts where appropriate.

Use drafts for:

* Projects
* Blog posts
* Services
* Experience
* Certifications
* Page globals

Workflow:

```text
Draft
Preview
Review
Publish
Live
Archive
```

Implement:

* Draft saving
* Autosave
* Version history
* Restore previous version
* Live preview
* Preview route
* Secure preview token
* Published-only public API access
* Scheduled publishing architecture if supported
* Archive without permanent deletion

---

# 21. Automatic Live Content Updates

When content is published or updated, automatically revalidate affected Next.js pages.

Use:

```text
revalidatePath
revalidateTag
```

Create reusable revalidation hooks.

Examples:

```text
Project change:
- Revalidate /
- Revalidate /projects
- Revalidate /projects/[slug]
- Revalidate category pages
- Revalidate sitemap

Skill change:
- Revalidate /
- Revalidate /skills

Experience change:
- Revalidate /
- Revalidate /experience

Site settings change:
- Revalidate all affected layouts
```

Use cache tags such as:

```text
home
projects
project:{slug}
project-categories
technologies
skills
experience
certifications
services
posts
site-settings
navigation
```

Do not require a full Vercel deployment for every content update.

---

# 22. Frontend Design Requirements

Create a premium, professional, modern technology portfolio.

The design must be suitable for an:

* AI developer
* ERP expert
* Full-stack developer
* SAP consultant
* Database specialist

## Design Direction

```text
Modern
Professional
Premium
Clean
Technical
Minimal but not empty
High contrast
Readable
Responsive
Accessible
```

## Theme

Support:

* Light mode
* Dark mode
* System preference
* Persistent user theme preference

## Layout

Use:

* Spacious sections
* Consistent containers
* Strong visual hierarchy
* Responsive grid
* Modern cards
* Clean typography
* Subtle shadows
* Controlled border radius
* Minimal glass effects
* Subtle gradients
* Professional animations

## Avoid

Do not use:

* Excessive animations
* Distracting particle effects
* Fake 3D objects everywhere
* Auto-playing audio
* Heavy page transitions
* Excessive gradients
* Unreadable font sizes
* Generic template text
* Fake client data
* Fake statistics
* Fake testimonials
* Fake certifications

## Components

Create reusable components for:

* Header
* Mobile navigation
* Footer
* Theme switcher
* Section heading
* Project card
* Project filter
* Technology badge
* Skill group
* Experience timeline
* Certification card
* Service card
* Testimonial card
* Contact form
* Rich text renderer
* Media component
* Breadcrumbs
* Pagination
* Empty state
* Loading skeleton
* Error state
* CTA section
* Social links
* SEO metadata
* Structured data

---

# 23. Responsive Design

The website must support:

```text
Mobile
Tablet
Laptop
Desktop
Large desktop
```

Test at least:

```text
320px
375px
414px
768px
1024px
1280px
1440px
1920px
```

Requirements:

* No horizontal scrolling
* Mobile-friendly navigation
* Touch-friendly buttons
* Responsive typography
* Responsive image sizes
* Filters usable on mobile
* Tables avoided on small screens unless responsive
* Accessible focus states

---

# 24. Accessibility

Target WCAG 2.1 AA where practical.

Implement:

* Semantic HTML
* Proper heading hierarchy
* Keyboard navigation
* Visible focus states
* Accessible forms
* Form error associations
* Screen-reader labels
* ARIA only where required
* Image alt text
* Adequate color contrast
* Reduced-motion preference
* Skip navigation link
* Accessible mobile menu
* Accessible dialogs
* Accessible dropdowns
* Accessible pagination

---

# 25. SEO Requirements

Implement complete technical SEO.

## Dynamic Metadata

Every public page must support:

* Title
* Description
* Open Graph title
* Open Graph description
* Open Graph image
* Twitter card
* Canonical URL
* Robots directives

## Technical SEO

Implement:

```text
sitemap.xml
robots.txt
manifest
favicon
canonical URLs
clean slugs
structured data
custom 404
redirect handling
breadcrumbs
```

## JSON-LD

Implement appropriate structured data:

* Person
* WebSite
* ProfessionalService
* CreativeWork or SoftwareApplication for projects
* Article for blog posts
* BreadcrumbList
* Organization where appropriate

## Slug Rules

Use SEO-friendly URLs.

Good:

```text
/projects/royal-erp-ai-chatbot
```

Avoid:

```text
/projects?id=123
```

Slugs must:

* Be unique
* Be generated automatically
* Be editable
* Be normalized
* Support conflict validation

---

# 26. Performance Requirements

Target strong Lighthouse results.

Goals:

```text
Performance: 90+
Accessibility: 90+
Best Practices: 90+
SEO: 95+
```

Implement:

* React Server Components
* Static generation where possible
* Incremental revalidation
* Minimal client components
* Dynamic imports where useful
* Optimized images
* AVIF/WEBP
* Responsive image sizes
* Font optimization
* Lazy loading
* CDN caching
* Database indexes
* Query limits
* Select only required fields
* Avoid N+1 queries
* Avoid unnecessary client-side state
* Avoid large JavaScript bundles

Rendering strategy:

```text
Home: Static or ISR
Projects listing: Static or ISR
Project detail: Static or ISR
Skills: Static or ISR
Experience: Static or ISR
Certifications: Static or ISR
Blog: Static or ISR
Contact form: Dynamic server route
Admin: Dynamic authenticated
Draft preview: Dynamic
```

---

# 27. Database Design Requirements

Use normalized PostgreSQL tables generated and managed through Payload.

Create appropriate relationships between:

* Projects and categories
* Projects and technologies
* Projects and media
* Skills and skill categories
* Experience and technologies
* Certifications and skills
* Posts and categories
* Posts and tags
* Testimonials and projects
* Contact messages and services

Add indexes for:

* Slug
* Published status
* Category
* Featured status
* Display order
* Created date
* Published date
* Project status
* Email where required

Avoid:

* Storing large files directly in PostgreSQL
* Duplicate technology names
* Duplicate slugs
* Unindexed frequently filtered fields
* Hardcoded category names in frontend logic

---

# 28. Security Requirements

Security is mandatory.

## Authentication Security

Implement:

* Secure password hashing
* HTTP-only cookies
* Secure cookies in production
* SameSite cookie policy
* Session expiration
* Account active check
* Login attempt limiting
* Account lockout
* Secure password reset architecture
* Role-based authorization
* No authentication secrets in browser code

## API Security

Implement:

* Server-side authorization
* Input validation using Zod or equivalent
* Output filtering
* Published-only public reads
* Protected write operations
* Rate limiting
* Contact form anti-spam
* No sensitive internal error exposure
* Safe error logging
* CSRF-safe architecture
* Request size limits

## Media Security

Implement:

* MIME validation
* Extension validation
* File size validation
* Filename sanitization
* SVG restriction
* Executable blocking
* Image processing
* PDF-only certification document support
* Admin-only uploads

## Secret Management

Never expose:

```text
PAYLOAD_SECRET
DATABASE_URL
BLOB_READ_WRITE_TOKEN
EMAIL_API_KEY
CAPTCHA_SECRET
PREVIEW_SECRET
```

Do not prefix private variables with:

```text
NEXT_PUBLIC_
```

## Security Headers

Configure appropriate headers:

* Content-Security-Policy
* X-Content-Type-Options
* Referrer-Policy
* Permissions-Policy
* Strict-Transport-Security
* Frame restrictions

Ensure settings remain compatible with Payload Admin.

## Audit Capability

Add an audit architecture for important actions:

* Content creation
* Content update
* Publish
* Delete
* Admin user changes
* Login activity

At minimum, preserve:

* Created by
* Updated by
* Created date
* Updated date

---

# 29. Error Handling

Create:

* Custom public 404 page
* Global error boundary
* Route-level error states
* Admin-safe error handling
* Contact form error states
* Database connection errors
* Media upload errors
* Email provider errors
* Friendly user messages
* Detailed server-side logs without exposing secrets

Do not display stack traces publicly.

---

# 30. Environment Variables

Create a complete `.env.example`.

Required variables:

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

PAYLOAD_SECRET=
DATABASE_URL=
BLOB_READ_WRITE_TOKEN=
PREVIEW_SECRET=

EMAIL_API_KEY=
EMAIL_FROM=
CONTACT_EMAIL_TO=

CAPTCHA_SECRET_KEY=
NEXT_PUBLIC_CAPTCHA_SITE_KEY=

NEXT_PUBLIC_SITE_NAME=
NEXT_PUBLIC_ANALYTICS_ID=
```

Only include actual `NEXT_PUBLIC_` variables when safe for browser exposure.

Generate secure secrets through documented commands.

Do not commit `.env.local` or production secrets.

---

# 31. Recommended Project Structure

Use a clean architecture similar to:

```text
professional-portfolio/
│
├── src/
│   ├── app/
│   │   ├── (frontend)/
│   │   │   ├── page.tsx
│   │   │   ├── about/
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   ├── skills/
│   │   │   ├── experience/
│   │   │   ├── certifications/
│   │   │   ├── services/
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   ├── contact/
│   │   │   ├── privacy-policy/
│   │   │   ├── terms/
│   │   │   ├── layout.tsx
│   │   │   ├── error.tsx
│   │   │   ├── loading.tsx
│   │   │   └── not-found.tsx
│   │   │
│   │   ├── (payload)/
│   │   │   ├── admin/
│   │   │   ├── api/
│   │   │   ├── graphql/
│   │   │   └── layout.tsx
│   │   │
│   │   ├── api/
│   │   │   ├── contact/
│   │   │   ├── preview/
│   │   │   ├── exit-preview/
│   │   │   └── revalidate/
│   │   │
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── manifest.ts
│   │
│   ├── collections/
│   │   ├── Admins.ts
│   │   ├── Media.ts
│   │   ├── Projects.ts
│   │   ├── ProjectCategories.ts
│   │   ├── Technologies.ts
│   │   ├── Skills.ts
│   │   ├── SkillCategories.ts
│   │   ├── Experiences.ts
│   │   ├── Education.ts
│   │   ├── Certifications.ts
│   │   ├── Services.ts
│   │   ├── Testimonials.ts
│   │   ├── ContactMessages.ts
│   │   ├── Posts.ts
│   │   ├── PostCategories.ts
│   │   └── Tags.ts
│   │
│   ├── globals/
│   │   ├── SiteSettings.ts
│   │   ├── HomePage.ts
│   │   ├── AboutPage.ts
│   │   └── Navigation.ts
│   │
│   ├── access/
│   │   ├── authenticated.ts
│   │   ├── adminOnly.ts
│   │   ├── superAdminOnly.ts
│   │   ├── editorOrAdmin.ts
│   │   ├── publishedOrAuthenticated.ts
│   │   └── fieldAccess.ts
│   │
│   ├── hooks/
│   │   ├── generateSlug.ts
│   │   ├── revalidateProject.ts
│   │   ├── revalidatePost.ts
│   │   ├── revalidateGlobal.ts
│   │   ├── setCreatedBy.ts
│   │   └── setUpdatedBy.ts
│   │
│   ├── components/
│   │   ├── admin/
│   │   ├── layout/
│   │   ├── home/
│   │   ├── projects/
│   │   ├── skills/
│   │   ├── experience/
│   │   ├── certifications/
│   │   ├── services/
│   │   ├── blog/
│   │   ├── forms/
│   │   ├── seo/
│   │   └── ui/
│   │
│   ├── lib/
│   │   ├── payload.ts
│   │   ├── queries/
│   │   ├── cache.ts
│   │   ├── seo.ts
│   │   ├── structuredData.ts
│   │   ├── email.ts
│   │   ├── rateLimit.ts
│   │   ├── validation.ts
│   │   ├── constants.ts
│   │   └── utils.ts
│   │
│   ├── styles/
│   ├── types/
│   └── payload.config.ts
│
├── migrations/
├── public/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── scripts/
│   ├── seed.ts
│   └── create-admin.ts
├── .env.example
├── .gitignore
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── package.json
├── tsconfig.json
├── playwright.config.ts
├── vitest.config.ts
├── README.md
└── DEPLOYMENT.md
```

Adjust the structure only where Payload’s official current structure requires it.

---

# 32. Seed Data

Create a safe seed script.

The seed script must create:

* One development admin account using environment variables
* Basic site settings
* Main navigation
* Skill categories
* Common technologies
* Project categories
* Example services
* Placeholder home page content

Do not create fake client testimonials or fake certifications.

Use clearly identified development placeholder data where necessary.

Seed credentials must come from environment variables:

```env
SEED_ADMIN_NAME=
SEED_ADMIN_EMAIL=
SEED_ADMIN_PASSWORD=
```

Do not hardcode passwords.

The seed script must be idempotent or safely detect existing records.

---

# 33. Package Scripts

Configure scripts similar to:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:e2e": "playwright test",
    "payload": "payload",
    "generate:types": "payload generate:types",
    "migrate:create": "payload migrate:create",
    "migrate": "payload migrate",
    "seed": "tsx scripts/seed.ts"
  }
}
```

Modify commands if required by the final compatible package versions.

---

# 34. Testing Requirements

Create real tests.

## Unit Tests

Test:

* Slug generation
* Validation schemas
* Access-control functions
* SEO metadata builders
* Utility functions
* Contact form validation

## Integration Tests

Test:

* Project creation
* Project update
* Draft and publish flow
* Published-only public access
* Admin authentication
* Role permissions
* Contact message saving
* Media validation
* Revalidation hooks

## End-to-End Tests

Use Playwright to test:

* Home page loading
* Navigation
* Projects page
* Project filtering
* Project detail page
* Contact form
* Admin login
* Create project
* Edit project
* Publish project
* Live project visibility
* Unauthorized admin access
* Mobile navigation
* Dark mode

## Quality Checks

Every phase must pass:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

The project is not complete until the production build succeeds.

---

# 35. Deployment Architecture

Use:

```text
GitHub Repository
        ↓
Vercel Preview Deployment
        ↓
Production Deployment
        ↓
Supabase PostgreSQL
        ↓
Vercel Blob Storage
```

## Environments

Maintain:

```text
Development
Preview
Production
```

Use separate environment variables.

Prefer separate databases or safe database branching for Preview deployments.

Never allow preview deployments to run destructive production migrations automatically.

---

# 36. Vercel Deployment Requirements

Prepare the application for direct Vercel deployment.

Configure:

* Next.js build
* Payload CMS routes
* PostgreSQL connection
* Vercel Blob
* Environment variables
* Function compatibility
* Media upload handling
* Image domains
* Security headers
* Production server URL
* Preview URLs
* Migration workflow

## Database Migrations

Create and commit migration files.

Production migration strategy must be documented.

Do not silently modify production schema through development push mode.

Recommended production sequence:

```text
1. Generate migration locally
2. Review migration
3. Commit migration
4. Backup production database
5. Run migration in controlled deployment step
6. Deploy application
7. Run smoke tests
```

---

# 37. Supabase PostgreSQL Requirements

Document:

* Project creation
* Database region selection
* Connection string retrieval
* SSL requirements
* Connection pooling
* Direct connection versus pooled connection
* Migration connection
* Production connection
* Backup configuration
* Database password rotation

Use connection pooling where appropriate for serverless runtime.

Ensure migrations can use an appropriate direct database connection if needed.

---

# 38. Vercel Blob Requirements

Configure:

* Blob store creation
* Read/write token
* Payload storage adapter
* Client uploads where appropriate
* File access policy
* Image URL rendering
* File deletion synchronization
* Orphan media cleanup strategy

When a media record is deleted, ensure the corresponding stored object is handled correctly.

Document the behavior.

---

# 39. Email Requirements

Integrate a transactional email provider through an abstraction layer.

Create:

```text
src/lib/email.ts
```

Support:

* Contact message notification
* Contact acknowledgement email
* Password reset architecture
* Future newsletter support

Do not tightly couple the application to one provider.

Create an interface or adapter pattern.

Email failure must:

* Be logged safely
* Not expose API keys
* Not lose contact messages
* Return a user-friendly response

---

# 40. Analytics and Monitoring

Add optional support for:

* Vercel Analytics
* Vercel Speed Insights
* Error monitoring
* Server logs
* Contact form submission tracking
* Project view analytics

Analytics must be controlled through environment variables or CMS settings.

Do not make analytics mandatory for local development.

---

# 41. Privacy and Legal Pages

Create editable:

* Privacy Policy
* Terms and Conditions

The privacy page should explain:

* Contact form data
* Analytics
* Cookies
* Data retention
* Third-party services
* User rights
* Contact information

Do not present legal text as professional legal advice.

Store these pages through Payload globals or a reusable pages collection.

---

# 42. Admin Dashboard User Experience

The admin dashboard must be organized clearly.

Suggested navigation:

```text
Content
- Projects
- Project Categories
- Technologies
- Skills
- Skill Categories
- Experience
- Education
- Certifications
- Services
- Testimonials
- Blog Posts
- Blog Categories
- Tags

Communication
- Contact Messages

Assets
- Media

Website
- Home Page
- About Page
- Navigation
- Site Settings

Administration
- Admin Users
```

Admin experience requirements:

* Useful field descriptions
* Logical tabs
* Group related fields
* Collapsible advanced fields
* SEO fields in separate tab
* Publication fields in separate tab
* Media previews
* Relationship labels
* Default sorting
* Searchable collections
* Filterable collections
* Required-field validation
* Confirmation before destructive actions

---

# 43. Content Editing Structure

For complex project forms, organize fields into tabs.

## Recommended Project Tabs

```text
Overview
Content
Technical Details
Media
Links
Results
SEO
Publishing
```

### Overview

* Title
* Slug
* Summary
* Category
* Technologies
* Type
* Status

### Content

* Description
* Problem statement
* Solution
* Features

### Technical Details

* Architecture
* Database
* Security
* Implementation
* Challenges

### Media

* Cover
* Gallery
* Video

### Links

* Demo
* GitHub
* Documentation

### Results

* Outcomes
* Metrics
* Lessons
* Future improvements

### SEO

* SEO title
* Description
* Image
* Canonical URL
* Index setting

### Publishing

* Draft status
* Publish date
* Featured
* Order
* Visibility

---

# 44. Implementation Phases

Develop the project in controlled phases.

Do not attempt to write random disconnected files.

## Phase 1: Planning and Compatibility

Before coding:

* Confirm compatible Node.js version
* Confirm compatible Next.js and Payload versions
* Confirm package manager
* Confirm PostgreSQL adapter requirements
* Confirm Vercel Blob adapter requirements
* Define architecture
* Define data relationships
* Create implementation checklist

Deliver:

* Architecture summary
* Dependency list
* Directory structure
* Environment variable plan

## Phase 2: Project Initialization

Implement:

* Next.js project
* Payload installation
* TypeScript strict mode
* Tailwind
* Base layouts
* Database connection
* Environment validation
* Payload admin route
* Initial development run

Verify:

* Public page loads
* `/admin` loads
* PostgreSQL connects
* First admin can be created

## Phase 3: Authentication and Access Control

Implement:

* Admin collection
* Roles
* Access-control helpers
* Admin UI restrictions
* Published-only public access
* Protected contact messages
* Protected media uploads

Verify every role.

## Phase 4: Core CMS Collections

Implement:

* Media
* Categories
* Technologies
* Projects
* Skills
* Experience
* Education
* Certifications
* Services
* Testimonials
* Contact messages

Generate Payload types.

Run migrations.

## Phase 5: Global Content

Implement:

* Site settings
* Home page
* About page
* Navigation
* Legal pages

## Phase 6: Public UI

Build:

* Header
* Footer
* Home
* About
* Projects
* Project detail
* Skills
* Experience
* Certifications
* Services
* Contact
* Blog architecture

Use real CMS queries.

Do not hardcode content except safe fallback labels.

## Phase 7: Media Integration

Implement:

* Vercel Blob
* Image sizes
* Upload validation
* Public media component
* Admin media preview
* File deletion behavior

## Phase 8: Draft and Preview

Implement:

* Drafts
* Versions
* Preview mode
* Preview URL
* Secure preview
* Exit preview
* Published-only public pages

## Phase 9: Revalidation

Implement:

* Cache tags
* Collection hooks
* Global hooks
* Revalidate affected paths
* Sitemap revalidation

## Phase 10: Contact and Email

Implement:

* Form
* API
* Validation
* Rate limiting
* Database storage
* Email notification
* Success/error states
* Anti-spam

## Phase 11: SEO and Performance

Implement:

* Metadata
* JSON-LD
* Sitemap
* Robots
* Canonical URLs
* Image optimization
* Dynamic Open Graph support if practical
* Performance improvements

## Phase 12: Testing

Implement and run:

* Unit tests
* Integration tests
* E2E tests
* Accessibility tests
* Build test
* Security review

## Phase 13: Deployment

Prepare:

* GitHub
* Supabase
* Vercel Blob
* Vercel project
* Environment variables
* Migrations
* Custom domain
* Production admin
* Smoke tests

## Phase 14: Documentation

Deliver:

* README
* Installation guide
* Environment guide
* Database guide
* Admin guide
* Deployment guide
* Backup guide
* Maintenance guide
* Troubleshooting guide

---

# 45. Coding Standards

Use:

* TypeScript strict mode
* Explicit types
* Typed Payload configuration
* Generated Payload types
* Reusable functions
* Server Components by default
* Client Components only when necessary
* Clear folder boundaries
* Consistent naming
* ESLint
* Prettier
* Environment validation
* Error handling
* No duplicated business logic

Do not use:

```text
any
```

unless unavoidable and documented.

Do not:

* Ignore TypeScript errors
* Disable ESLint globally
* Use `@ts-ignore` without a documented reason
* Hardcode secrets
* Hardcode production URLs
* Hardcode database IDs
* Create duplicate query logic
* Mix authorization with presentation code
* Return complete admin records publicly

---

# 46. Coding Agent Output Rules

Follow these rules strictly while developing.

## Complete Files

When creating or modifying a file, provide the complete final content of that file.

Do not provide:

* Partial snippets
* `...existing code...`
* Pseudocode
* “Implement later”
* Empty placeholder functions
* Incomplete imports
* Missing exports
* Undefined variables

## One Logical Phase at a Time

Complete and verify each phase before moving to the next.

After every phase, report:

```text
Files created
Files updated
Commands to run
Expected result
Tests completed
Known limitations
Next phase
```

## Preserve Existing Work

Before editing an existing file:

* Read the full file
* Understand current behavior
* Preserve working logic
* Make focused changes
* Avoid unnecessary rewrites

## Verification

After important changes run:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

Fix all relevant errors before considering the phase complete.

## No Hallucinated Success

Do not claim:

* A command succeeded without running it
* A package exists without checking
* A deployment works without verification
* A test passed without execution
* An environment variable is configured without evidence

Clearly state what was actually verified.

---

# 47. Required Documentation

Create a professional `README.md` containing:

* Project overview
* Features
* Technology stack
* Architecture
* Prerequisites
* Local installation
* Environment variables
* Database setup
* Payload admin setup
* Media storage setup
* Seed instructions
* Development commands
* Testing commands
* Migration commands
* Deployment overview
* Security notes
* Troubleshooting

Create `DEPLOYMENT.md` containing:

* Supabase setup
* Vercel Blob setup
* Vercel deployment
* Environment variables
* Preview environment
* Production environment
* Migration process
* Domain setup
* First admin creation
* Smoke testing
* Rollback
* Backup and restore

Create `ADMIN_GUIDE.md` containing:

* Admin login
* Creating projects
* Managing categories
* Uploading images
* Publishing content
* Previewing drafts
* Managing skills
* Managing certifications
* Managing contact messages
* Managing site settings
* Admin role permissions

Create `MAINTENANCE.md` containing:

* Dependency updates
* Database backups
* Migration process
* Secret rotation
* Media cleanup
* Monitoring
* Common issues
* Recovery process

---

# 48. Final Acceptance Criteria

The project is complete only when all the following conditions are met.

## Public Website

* Responsive professional design
* Home page works
* About page works
* Projects page works
* Dynamic project detail works
* Filters work
* Skills page works
* Experience page works
* Certifications page works
* Services page works
* Contact form works
* Blog architecture works
* Dark/light mode works
* SEO metadata works
* Sitemap works
* Robots file works
* Custom 404 works

## Admin Dashboard

* Secure admin login
* Roles work
* Admin can create project
* Admin can edit project
* Admin can delete or archive project according to role
* Admin can upload media
* Admin can manage categories
* Admin can manage technologies
* Admin can manage skills
* Admin can manage experience
* Admin can manage certifications
* Admin can manage services
* Admin can manage homepage
* Admin can manage site settings
* Admin can view contact messages
* Draft and publish work
* Preview works
* Version history works where configured

## Database

* PostgreSQL connection works
* Migrations exist
* Relationships work
* Unique constraints work
* Indexes exist
* No production data depends on mock files

## Deployment

* Vercel build succeeds
* Payload admin works on Vercel
* Supabase database works
* Vercel Blob uploads work
* Content updates appear live without source-code changes
* Custom domain can be connected
* HTTPS works
* Production environment variables are documented

## Quality

* TypeScript passes
* Lint passes
* Tests pass
* Production build passes
* No secrets committed
* No obvious authorization bypass
* No broken links
* No major mobile layout issue
* No major accessibility violation
* Documentation is complete

---

# 49. Final Deliverables

Deliver the following:

```text
1. Complete source code
2. Complete directory structure
3. Payload CMS configuration
4. PostgreSQL schema through migrations
5. Secure admin dashboard
6. Public portfolio frontend
7. Media upload integration
8. Authentication and authorization
9. Contact form and email integration
10. SEO implementation
11. Unit, integration and E2E tests
12. Seed script
13. .env.example
14. README.md
15. DEPLOYMENT.md
16. ADMIN_GUIDE.md
17. MAINTENANCE.md
18. Production deployment instructions
19. Backup and restore instructions
20. Final verification report
```

---

# 50. Start Development

Begin with Phase 1 only.

First provide:

1. Final architecture decision
2. Compatible technology versions
3. Package list
4. Complete folder structure
5. Database and CMS collection map
6. Environment variable plan
7. Implementation sequence
8. Risks and mitigation
9. Commands required to initialize the project

After presenting Phase 1, immediately proceed with the actual project initialization if tools and filesystem access are available.

Do not reduce the scope.

Do not generate a static portfolio.

Do not replace Payload CMS with a custom incomplete dashboard.

Do not leave core features for future implementation.

Build the application as a real, maintainable, secure, extensible production system.
