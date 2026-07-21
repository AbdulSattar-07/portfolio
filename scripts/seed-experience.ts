/**
 * Update experience entries to match imported projects (ALL_PROJECTS.md).
 * Run: npm run seed:experience
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../src/payload.config'
import { richText } from '../src/lib/richText'

type Payload = Awaited<ReturnType<typeof getPayload>>

async function findProjectIds(payload: Payload, slugs: string[]) {
  const ids: Array<number | string> = []
  for (const slug of slugs) {
    const res = await payload.find({
      collection: 'projects',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    })
    if (res.docs[0]) ids.push(res.docs[0].id)
  }
  return ids
}

async function findTechIds(payload: Payload, names: string[]) {
  const ids: Array<number | string> = []
  for (const name of names) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const res = await payload.find({
      collection: 'technologies',
      where: {
        or: [{ slug: { equals: slug } }, { name: { equals: name } }],
      },
      limit: 1,
      depth: 0,
    })
    if (res.docs[0]) ids.push(res.docs[0].id)
  }
  return ids
}

async function upsertExperience(
  payload: Payload,
  data: Record<string, unknown> & { companyName: string; jobTitle: string },
) {
  const existing = await payload.find({
    collection: 'experiences',
    where: {
      and: [
        { companyName: { equals: data.companyName } },
        { jobTitle: { equals: data.jobTitle } },
      ],
    },
    limit: 1,
    depth: 0,
  })

  // Also match older FYP title if we rename
  if (!existing.docs[0] && data.companyName === 'Islamia University of Bahawalpur') {
    const alt = await payload.find({
      collection: 'experiences',
      where: { companyName: { equals: 'Islamia University of Bahawalpur' } },
      limit: 1,
      depth: 0,
    })
    if (alt.docs[0]) {
      return payload.update({
        collection: 'experiences',
        id: alt.docs[0].id,
        data,
        context: { disableRevalidate: true },
        overrideAccess: true,
        draft: false,
      })
    }
  }

  if (existing.docs[0]) {
    return payload.update({
      collection: 'experiences',
      id: existing.docs[0].id,
      data,
      context: { disableRevalidate: true },
      overrideAccess: true,
      draft: false,
    })
  }

  return payload.create({
    collection: 'experiences',
    data,
    context: { disableRevalidate: true },
    overrideAccess: true,
    draft: false,
  })
}

async function seedExperience() {
  const payload = await getPayload({ config })

  const royalProjects = await findProjectIds(payload, [
    'intelligent-erp-chatbot',
    'ai-php-code-generation',
    'sdlc-automation-bot',
    'codebase-aware-prompt-engine',
    'meeting-recorder-bot',
  ])

  const fypProjects = await findProjectIds(payload, ['ecommerce-recommendation-engine'])

  const personalProjects = await findProjectIds(payload, [
    'medicare-ml-predictions',
    'smart-ai-resume-analyzer',
    'superstore-management-system',
    'campusguide-ai',
  ])

  const royalTechs = await findTechIds(payload, [
    'Python',
    'Django',
    'LangChain',
    'OpenAI',
    'MySQL',
    'n8n',
    'Next.js',
    'ChromaDB',
    'Plotly',
    'Anthropic',
    'PostgreSQL',
    'Celery',
    'Playwright',
  ])

  const fypTechs = await findTechIds(payload, [
    'Python',
    'Django',
    'Scikit-learn',
    'Pandas',
    'NumPy',
    'MySQL',
    'Bootstrap',
  ])

  const internTechs = await findTechIds(payload, [
    'Python',
    'Django',
    'Scikit-learn',
    'Pandas',
    'NumPy',
    'MySQL',
  ])

  console.log('Updating Royal Soft experience...')
  await upsertExperience(payload, {
    companyName: 'Royal Soft',
    jobTitle: 'AI & ML Developer',
    employmentType: 'full-time',
    location: 'Lahore, Pakistan',
    workMode: 'on-site',
    startDate: '2025-08-01',
    currentlyWorking: true,
    summary:
      'Shipping production GenAI systems for enterprise ERP: multi-agent chatbots, codebase-aware PHP generation, n8n SDLC automation, and meeting-to-tasks tooling.',
    fullDescription: richText(
      'At Royal Soft I design and ship production AI systems that sit on top of legacy ERP and delivery workflows. Work spans multi-agent LangChain chatbots on live MySQL, RAG-style PHP module generation, n8n automation for SDLC kick-off, and meeting bot / transcript pipelines.',
    ),
    responsibilities: [
      {
        item: 'Built and operate the Intelligent ERP Chatbot — multi-tenant LangChain agents, safe SQL tools, forecasting, Plotly KPIs, and EN/Urdu responses against live MySQL.',
      },
      {
        item: 'Delivered the Royal ERP AI Code Generator — ZIP ingest, convention parsing, retrieval, orchestrated PHP/SQL/JS generation, validators, and packaging.',
      },
      {
        item: 'Shipped the SDLC Automation Bot (Next.js + n8n + Recall.ai + Claude/TMS) turning meetings into structured requirements and assigned tasks.',
      },
      {
        item: 'Built the Codebase-Aware Prompt Engine (n8n + MySQL) to ground developer prompts in real ERP file excerpts and batch history.',
      },
      {
        item: 'Developed the Meeting Recorder / join-bot stack (Django, Celery, Playwright, Faster-Whisper) for automated capture and transcription.',
      },
    ],
    achievements: [
      { item: '500+ daily natural-language ERP queries via multi-agent orchestration' },
      { item: '~40% fewer manual lookups; ~35% faster query resolution' },
      { item: 'Code generation grounded on 1,400+ ERP files — 70–90% convention similarity; 60%+ less manual effort' },
      { item: '60%+ faster project kick-off through SDLC meeting → task automation' },
    ],
    projectsHandled: royalProjects,
    technologies: royalTechs,
    displayOrder: 0,
    _status: 'published',
  })

  console.log('Updating Final Year Project experience (solo)...')
  await upsertExperience(payload, {
    companyName: 'Islamia University of Bahawalpur',
    jobTitle: 'AI Engineer — Final Year Project (Solo)',
    employmentType: 'self-employed',
    location: 'Bahawalpur, Pakistan',
    workMode: 'on-site',
    startDate: '2024-08-01',
    endDate: '2025-06-30',
    currentlyWorking: false,
    summary:
      'Solo Final Year Project: full Django e-commerce platform with hybrid collaborative + content-based product recommendations (85%+ validation precision).',
    fullDescription: richText(
      'Designed and built the entire AI Shop platform alone — catalog, auth, interactions, orders, and a Scikit-learn hybrid recommendation engine (user–user cosine + TF-IDF content, ~60/40 blend) with weighted view/like/cart/purchase signals.',
    ),
    responsibilities: [
      {
        item: 'Solo-built full e-commerce storefront and admin (Django, Bootstrap, media pipeline).',
      },
      {
        item: 'Implemented RecommendationEngine with collaborative filtering, TF-IDF content similarity, hybrid merge, and persistence.',
      },
      {
        item: 'Engineered interaction weights (view/search/like/cart/purchase) and generate_recommendations management command.',
      },
      {
        item: 'Validated recommendations at 85%+ precision; deployed with Django + MySQL (PythonAnywhere path).',
      },
    ],
    achievements: [
      { item: '85%+ recommendation precision on held-out validation' },
      { item: 'End-to-end solo FYP delivery over ~10 months' },
    ],
    projectsHandled: fypProjects,
    technologies: fypTechs,
    displayOrder: 1,
    _status: 'published',
  })

  // Remove old FYP title duplicate if both exist
  const fypAll = await payload.find({
    collection: 'experiences',
    where: { companyName: { equals: 'Islamia University of Bahawalpur' } },
    limit: 10,
    depth: 0,
  })
  if (fypAll.docs.length > 1) {
    for (const doc of fypAll.docs) {
      if (doc.jobTitle !== 'AI Engineer — Final Year Project (Solo)') {
        await payload.delete({
          collection: 'experiences',
          id: doc.id,
          context: { disableRevalidate: true },
          overrideAccess: true,
        })
        console.log(`  removed old FYP row: ${doc.jobTitle}`)
      }
    }
  }

  console.log('Updating internship experience...')
  await upsertExperience(payload, {
    companyName: 'Code Lab Tech School & IT Solutions',
    jobTitle: 'Python & ML Intern',
    employmentType: 'internship',
    location: 'Bahawalpur, Pakistan',
    workMode: 'on-site',
    startDate: '2023-05-01',
    endDate: '2023-09-30',
    currentlyWorking: false,
    summary:
      'Foundational internship in data analysis, classical ML, visualization, and a Django + MySQL capstone — base for later production GenAI work.',
    fullDescription: richText(
      'Five-month internship focused on Pandas/NumPy/Scikit-learn workflows, exploratory visualization, and shipping a Django + MySQL web capstone.',
    ),
    responsibilities: [
      {
        item: 'Completed hands-on training in Pandas, NumPy, Scikit-learn, Matplotlib, and Seaborn across multiple data projects.',
      },
      {
        item: 'Delivered a Django + MySQL web application as the internship capstone.',
      },
      {
        item: 'Practiced feature engineering, model evaluation basics, and clean experiment notebooks.',
      },
    ],
    achievements: [
      { item: '3 functional data/ML projects completed during internship' },
      { item: 'Django + MySQL capstone delivered' },
    ],
    technologies: internTechs,
    displayOrder: 2,
    _status: 'published',
  })

  // Optional: Independent builds entry linking personal products (keeps timeline honest)
  console.log('Upserting Independent AI Products experience...')
  await upsertExperience(payload, {
    companyName: 'Independent / Personal Products',
    jobTitle: 'AI & Full-Stack Builder',
    employmentType: 'self-employed',
    location: 'Lahore, Pakistan',
    workMode: 'remote',
    startDate: '2024-01-01',
    currentlyWorking: true,
    summary:
      'Personal production-style builds: Smart AI Resume Analyzer, MediCare ML predictions, Superstore POS/ERP, CampusGuide AI, and frontend AI utilities.',
    fullDescription: richText(
      'Alongside employment and FYP work, shipped portfolio products covering ATS + job match platforms, clinical ML demos, retail ERP/POS, campus RAG assistants, and React AI utilities — using the same Django/React/LLM stack as production work.',
    ),
    responsibilities: [
      {
        item: 'Smart AI Resume Analyzer — ATS scoring, Groq feedback, job match, PDF/DOCX builder (Django REST + React).',
      },
      {
        item: 'MediCare — diabetes and depression risk ML pipelines with validation and structured prediction APIs.',
      },
      {
        item: 'Superstore Management System — POS, inventory, accounting, CRM/HR (Django REST + React/Vite).',
      },
      {
        item: 'CampusGuide AI — structured college data + hybrid RAG assistant.',
      },
    ],
    achievements: [
      { item: 'Multiple end-to-end products published on the portfolio with full case studies' },
    ],
    projectsHandled: personalProjects,
    technologies: await findTechIds(payload, [
      'Python',
      'Django',
      'Django REST Framework',
      'React',
      'Vite',
      'Scikit-learn',
      'Groq',
      'LangChain',
      'PostgreSQL',
    ]),
    displayOrder: 1.5,
    _status: 'published',
  })

  // Home page copy nudge
  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      experienceHeading: 'Recent experience',
    },
    context: { disableRevalidate: true },
    overrideAccess: true,
  })

  console.log('Experience updated and linked to projects.')
  process.exit(0)
}

seedExperience().catch((error) => {
  console.error(error)
  process.exit(1)
})
