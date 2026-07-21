import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../src/payload.config'

type Payload = Awaited<ReturnType<typeof getPayload>>

async function upsertBySlug(
  payload: Payload,
  collection:
    | 'project-categories'
    | 'skill-categories'
    | 'technologies'
    | 'services'
    | 'skills'
    | 'projects',
  data: Record<string, unknown> & { slug: string },
) {
  const existing = await payload.find({
    collection,
    where: { slug: { equals: data.slug } },
    limit: 1,
    depth: 0,
  })

  if (existing.docs[0]) {
    return payload.update({
      collection,
      id: existing.docs[0].id,
      data,
      context: { disableRevalidate: true },
      overrideAccess: true,
    })
  }

  return payload.create({
    collection,
    data,
    context: { disableRevalidate: true },
    overrideAccess: true,
  })
}

async function seed() {
  const email = process.env.SEED_ADMIN_EMAIL
  const password = process.env.SEED_ADMIN_PASSWORD
  const name = process.env.SEED_ADMIN_NAME || 'Admin'

  if (!email || !password) {
    throw new Error('Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD before running seed.')
  }

  const payload = await getPayload({ config })

  const admins = await payload.find({
    collection: 'admins',
    where: { email: { equals: email } },
    limit: 1,
  })

  if (!admins.docs[0]) {
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
    console.log(`Created admin ${email}`)
  } else {
    console.log(`Admin ${email} already exists`)
  }

  // —— Profile from CV (updated links; old portfolio removed) ——
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Abdul Sattar',
      siteTagline: 'AI & ML Engineer | Python Developer | GenAI Specialist',
      defaultSeoTitle: 'Abdul Sattar — AI & ML Engineer | GenAI Specialist',
      defaultSeoDescription:
        'AI/ML Engineer with production GenAI, multi-agent systems, LangChain, Django, and ML experience. Based in Lahore, Pakistan.',
      footerText: 'Building production GenAI systems, multi-agent architectures, and ML-powered applications.',
      copyrightText: `© ${new Date().getFullYear()} Abdul Sattar`,
      contactEmail: 'malikabdulsattar9947@gmail.com',
      businessEmail: 'malikabdulsattar9947@gmail.com',
      phone: '03252467739',
      whatsapp: '03252467739',
      location: 'Lahore, Pakistan',
      githubUrl: 'https://github.com/AbdulSattar-07',
      linkedinUrl: 'https://www.linkedin.com/in/abdul5sattar/',
      kaggleUrl: 'https://www.kaggle.com/malikabdulsattar',
      blogEnabled: false,
      testimonialsEnabled: false,
      contactFormEnabled: true,
      maintenanceMode: false,
    },
    context: { disableRevalidate: true },
    overrideAccess: true,
  })

  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      fullName: 'Abdul Sattar',
      professionalTitle: 'AI & ML Engineer | Python Developer | GenAI Specialist',
      tagline: '1 year building production GenAI, multi-agent systems, and ML applications.',
      introduction:
        'AI/ML Engineer with production experience at RoyalSoft. I ship GenAI systems, multi-agent architectures, RAG pipelines, and ML-powered apps — from ERP chatbots to SDLC automation and recommendation engines.',
      availabilityStatus: 'Open to opportunities',
      primaryCtaLabel: 'View Projects',
      primaryCtaUrl: '/projects',
      secondaryCtaLabel: 'Contact Me',
      secondaryCtaUrl: '/contact',
      showResumeButton: true,
      featuredProjectsHeading: 'Featured work',
      featuredProjectsIntro: 'Production systems from RoyalSoft and academic / personal builds. Full case studies coming from project archives.',
      skillsHeading: 'Core capabilities',
      experienceHeading: 'Experience',
      servicesHeading: 'How I can help',
      certificationsHeading: 'Credentials',
      contactCtaHeading: 'Let’s build something intelligent',
      contactCtaText: 'Need a GenAI assistant, RAG pipeline, Django API, or ML product? Reach me on Email or WhatsApp.',
      contactCtaLabel: 'Start a conversation',
      contactCtaUrl: '/contact',
      highlights: [
        { label: 'Years experience', value: '1+' },
        { label: 'Production AI systems', value: '4' },
        { label: 'BIT CGPA', value: '3.78' },
        { label: 'Daily NL queries (ERP bot)', value: '500+' },
      ],
      _status: 'published',
    },
    context: { disableRevalidate: true },
    overrideAccess: true,
  })

  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      pageHeading: 'About',
      careerSummary:
        'AI/ML Engineer with 1 year of production experience at RoyalSoft, specializing in GenAI systems, multi-agent architectures, and ML-powered applications. BIT graduate (3.78/4.00 GPA).',
      currentRole: 'AI & ML Developer at Royal Soft',
      location: 'Lahore, Pakistan',
      availability: 'Open to opportunities',
      professionalObjectives:
        'Build reliable production GenAI and multi-agent systems that cut manual work and ship measurable business outcomes.',
      workPhilosophy:
        'Ship end-to-end: retrieve real context, orchestrate agents carefully, validate outputs, and measure impact in production.',
      languages: [
        { language: 'English', level: 'Professional' },
        { language: 'Urdu', level: 'Native' },
      ],
      values: [
        {
          title: 'Production-first AI',
          description: 'Systems that run for real users — not demos that die in notebooks.',
        },
        {
          title: 'Measurable impact',
          description: 'Faster query resolution, less manual effort, higher code reuse — tracked with clear metrics.',
        },
        {
          title: 'Clean engineering',
          description: 'Django APIs, solid data models, and agent pipelines that teams can maintain.',
        },
      ],
      highlights: [
        {
          title: 'Enterprise ERP AI',
          description: 'Live multi-agent ERP chatbot processing 500+ natural-language queries per day.',
        },
        {
          title: 'Code generation at scale',
          description: 'RAG + LangGraph over 1,400+ ERP code files with 70–90% similarity to production PHP.',
        },
        {
          title: 'Academic excellence',
          description: 'BIT CGPA 3.78/4.00 — top 10% while shipping production systems.',
        },
      ],
      _status: 'published',
    },
    context: { disableRevalidate: true },
    overrideAccess: true,
  })

  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      headerItems: [
        { label: 'About', href: '/about', visible: true },
        { label: 'Projects', href: '/projects', visible: true },
        { label: 'Skills', href: '/skills', visible: true },
        { label: 'Experience', href: '/experience', visible: true },
        { label: 'Services', href: '/services', visible: true },
        { label: 'Contact', href: '/contact', visible: true },
      ],
      footerItems: [
        { label: 'Projects', href: '/projects' },
        { label: 'Services', href: '/services' },
        { label: 'Contact', href: '/contact' },
        { label: 'Privacy', href: '/privacy-policy' },
      ],
      ctaLabel: 'Hire me',
      ctaUrl: '/contact',
      showCta: true,
    },
    context: { disableRevalidate: true },
    overrideAccess: true,
  })

  // Taxonomy
  const projectCategories = [
    'Artificial Intelligence',
    'Generative AI',
    'ERP Systems',
    'Web Applications',
    'Business Automation',
    'Machine Learning',
  ]

  for (const [index, nameValue] of projectCategories.entries()) {
    await upsertBySlug(payload, 'project-categories', {
      name: nameValue,
      slug: nameValue.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      displayOrder: index,
      isActive: true,
    })
  }

  const skillCategoryDefs = [
    ['generative-ai', 'Generative AI'],
    ['ml-engineering', 'ML Engineering'],
    ['python', 'Python & Core'],
    ['web-frameworks', 'Web Frameworks'],
    ['data-viz', 'Data & Visualization'],
    ['databases', 'Databases'],
    ['devtools', 'Dev Tools'],
  ] as const

  const skillCategoryIds: Record<string, string | number> = {}
  for (const [index, [slug, nameValue]] of skillCategoryDefs.entries()) {
    const doc = await upsertBySlug(payload, 'skill-categories', {
      name: nameValue,
      slug,
      displayOrder: index,
      isActive: true,
    })
    skillCategoryIds[slug] = doc.id
  }

  const technologies = [
    ['Python', 'programming-language'],
    ['Django', 'framework'],
    ['Flask', 'framework'],
    ['JavaScript', 'programming-language'],
    ['PHP', 'programming-language'],
    ['MySQL', 'database'],
    ['LangChain', 'ai'],
    ['LangGraph', 'ai'],
    ['OpenAI', 'ai'],
    ['ChromaDB', 'ai'],
    ['n8n', 'automation'],
    ['Scikit-learn', 'data-science'],
    ['Pandas', 'data-science'],
    ['NumPy', 'data-science'],
    ['Plotly', 'data-science'],
    ['Git', 'devops'],
  ] as const

  for (const [index, [nameValue, category]] of technologies.entries()) {
    await upsertBySlug(payload, 'technologies', {
      name: nameValue,
      slug: nameValue.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category,
      displayOrder: index,
      isActive: true,
    })
  }

  const skills: Array<[string, string, string, boolean]> = [
    ['langchain', 'LangChain', 'generative-ai', true],
    ['langgraph', 'LangGraph', 'generative-ai', true],
    ['rag-systems', 'RAG Systems', 'generative-ai', true],
    ['openai-api', 'OpenAI API', 'generative-ai', true],
    ['n8n', 'n8n Workflow Automation', 'generative-ai', true],
    ['multi-agent', 'Multi-Agent Orchestration', 'generative-ai', true],
    ['prompt-engineering', 'Prompt Engineering', 'generative-ai', true],
    ['scikit-learn', 'Scikit-learn', 'ml-engineering', true],
    ['predictive-modeling', 'Predictive Modeling', 'ml-engineering', true],
    ['python', 'Python', 'python', true],
    ['sql', 'SQL', 'python', true],
    ['django', 'Django', 'web-frameworks', true],
    ['flask', 'Flask', 'web-frameworks', false],
    ['pandas', 'Pandas', 'data-viz', true],
    ['numpy', 'NumPy', 'data-viz', false],
    ['plotly', 'Plotly', 'data-viz', true],
    ['mysql', 'MySQL', 'databases', true],
    ['git', 'Git & GitHub', 'devtools', true],
  ]

  for (const [index, [slug, skillName, catSlug, featured]] of skills.entries()) {
    await upsertBySlug(payload, 'skills', {
      name: skillName,
      slug,
      category: skillCategoryIds[catSlug],
      proficiency: featured ? 'advanced' : 'intermediate',
      featured,
      displayOrder: index,
      isActive: true,
    })
  }

  // Experience
  const existingExp = await payload.find({ collection: 'experiences', limit: 20, depth: 0 })
  const hasRoyal = existingExp.docs.some((d) => d.companyName === 'Royal Soft')
  if (!hasRoyal) {
    await payload.create({
      collection: 'experiences',
      data: {
        companyName: 'Royal Soft',
        jobTitle: 'AI & ML Developer',
        employmentType: 'full-time',
        location: 'Lahore, Pakistan',
        workMode: 'on-site',
        startDate: '2025-08-01',
        currentlyWorking: true,
        summary:
          'Production GenAI and multi-agent systems for enterprise ERP — chatbots, code generation, and SDLC automation.',
        responsibilities: [
          {
            item: 'Architected a production ERP chatbot (Python, Django, LangChain, NLP) processing 500+ daily NL business queries via multi-agent orchestration.',
          },
          {
            item: 'Integrated LangChain agents with live MySQL and REST APIs; inventory tracking, Plotly KPI dashboards, and business Q&A — ~40% fewer manual lookups, ~35% faster resolution.',
          },
          {
            item: 'Built AI PHP code generation with RAG, LangGraph, and ChromaDB on 1,400+ company files — 70–90% similarity, 60%+ less manual effort.',
          },
          {
            item: 'Shipped an n8n SDLC Automation Bot (GPT-4o-mini 3-stage pipeline + TMS APIs) cutting project kick-off time by 60%+.',
          },
        ],
        displayOrder: 0,
        _status: 'published',
      },
      context: { disableRevalidate: true },
      overrideAccess: true,
    })
  }

  const hasFyp = existingExp.docs.some((d) => d.companyName === 'Islamia University of Bahawalpur')
  if (!hasFyp) {
    await payload.create({
      collection: 'experiences',
      data: {
        companyName: 'Islamia University of Bahawalpur',
        jobTitle: 'AI Project Lead — Final Year Project',
        employmentType: 'internship',
        location: 'Bahawalpur, Pakistan',
        startDate: '2024-08-01',
        endDate: '2025-06-30',
        currentlyWorking: false,
        summary:
          'Led end-to-end AI e-commerce platform with hybrid product recommendation engine (collaborative + content-based).',
        responsibilities: [
          {
            item: 'Built full-featured AI e-commerce platform with hybrid recommendation engine.',
          },
          {
            item: 'Achieved 85%+ recommendation precision on held-out validation; personalized by behaviour and purchase history.',
          },
          {
            item: 'Deployed on PythonAnywhere with Django backend and optimized MySQL schema.',
          },
        ],
        displayOrder: 1,
        _status: 'published',
      },
      context: { disableRevalidate: true },
      overrideAccess: true,
    })
  }

  const hasIntern = existingExp.docs.some((d) => d.companyName === 'Code Lab Tech School & IT Solutions')
  if (!hasIntern) {
    await payload.create({
      collection: 'experiences',
      data: {
        companyName: 'Code Lab Tech School & IT Solutions',
        jobTitle: 'Python & ML Intern',
        employmentType: 'internship',
        location: 'Bahawalpur, Pakistan',
        startDate: '2023-05-01',
        endDate: '2023-09-30',
        currentlyWorking: false,
        summary:
          'Structured training in data analysis, predictive modeling, and visualization; Django + MySQL capstone.',
        responsibilities: [
          {
            item: 'Completed training in Pandas, NumPy, Scikit-learn, Matplotlib, and Seaborn — 3 functional data projects.',
          },
          {
            item: 'Delivered a Django web application with MySQL as the internship capstone.',
          },
        ],
        displayOrder: 2,
        _status: 'published',
      },
      context: { disableRevalidate: true },
      overrideAccess: true,
    })
  }

  // Education
  const existingEdu = await payload.find({ collection: 'education', limit: 10, depth: 0 })
  if (existingEdu.totalDocs === 0) {
    await payload.create({
      collection: 'education',
      data: {
        institution: 'Islamia University of Bahawalpur',
        degree: 'Bachelor of Information Technology (B.I.T)',
        fieldOfStudy: 'Information Technology',
        startDate: '2021-01-01',
        endDate: '2025-06-30',
        currentlyStudying: false,
        grade: 'CGPA 3.78 / 4.00 (Top 10%)',
        location: 'Bahawalpur, Pakistan',
        description:
          'Relevant coursework: Data Structures, ML, Database Systems, Software Engineering, Web Technologies, OOP.',
        achievements: [{ item: 'Top 10% of class' }, { item: 'CGPA 3.78 / 4.00' }],
        displayOrder: 0,
        _status: 'published',
      },
      context: { disableRevalidate: true },
      overrideAccess: true,
    })
  }

  // Project stubs from CV (full case studies after ZIP review)
  const projectStubs = [
    {
      title: 'Intelligent ERP Chatbot — Multi-Agent System',
      slug: 'intelligent-erp-chatbot',
      shortDescription:
        'Production multi-agent ERP chatbot processing 500+ natural-language business queries per day with inventory, Q&A, and Plotly KPI dashboards.',
      projectType: 'professional',
      projectStatus: 'completed',
      companyName: 'Royal Soft',
      featured: true,
      githubUrl: 'https://github.com/AbdulSattar-07',
      measurableOutcomes: [
        { outcome: '500+ daily NL business queries' },
        { outcome: '~35% faster query resolution' },
        { outcome: '~40% reduction in manual data lookups' },
      ],
    },
    {
      title: 'AI-Powered Enterprise PHP Code Generation System',
      slug: 'ai-php-code-generation',
      shortDescription:
        'RAG + LangGraph multi-agent pipeline over 1,400+ ERP code files generating production-ready PHP forms (CRUD + AJAX + DB).',
      projectType: 'professional',
      projectStatus: 'completed',
      companyName: 'Royal Soft',
      featured: true,
      githubUrl: 'https://github.com/AbdulSattar-07',
      measurableOutcomes: [
        { outcome: '70–90% similarity with real ERP codebase' },
        { outcome: '60%+ reduction in manual development effort' },
      ],
    },
    {
      title: 'SDLC Automation Bot',
      slug: 'sdlc-automation-bot',
      shortDescription:
        'n8n + GPT-4o-mini pipeline turning meeting transcripts and SDLC docs into structured tasks with TMS auto-assignment.',
      projectType: 'professional',
      projectStatus: 'completed',
      companyName: 'Royal Soft',
      featured: true,
      githubUrl: 'https://github.com/AbdulSattar-07',
      measurableOutcomes: [{ outcome: '60%+ faster project kick-off' }],
    },
    {
      title: 'AI-Powered E-Commerce Recommendation Engine',
      slug: 'ecommerce-recommendation-engine',
      shortDescription:
        'Full e-commerce platform with hybrid collaborative + content-based recommendations; 85%+ precision on validation.',
      projectType: 'academic',
      projectStatus: 'completed',
      featured: true,
      githubUrl: 'https://github.com/AbdulSattar-07',
      measurableOutcomes: [{ outcome: '85%+ recommendation precision' }],
    },
    {
      title: 'Diabetes Prediction ML Model',
      slug: 'diabetes-prediction-ml',
      shortDescription:
        'Benchmark of Logistic Regression, Random Forest, SVM, and XGBoost on Pima Indians Diabetes Dataset with 82% accuracy and AUC 0.87.',
      projectType: 'personal',
      projectStatus: 'completed',
      featured: false,
      githubUrl: 'https://github.com/AbdulSattar-07',
    },
    {
      title: 'Employee Management System',
      slug: 'employee-management-system',
      shortDescription:
        'Django HR CRUD system with RBAC, attendance, leave, payroll, and a normalized 3NF MySQL schema (12 tables).',
      projectType: 'personal',
      projectStatus: 'completed',
      featured: false,
      githubUrl: 'https://github.com/AbdulSattar-07',
    },
  ]

  for (const [index, project] of projectStubs.entries()) {
    await upsertBySlug(payload, 'projects', {
      ...project,
      displayOrder: index,
      publishedAt: new Date().toISOString(),
      _status: 'published',
    })
  }

  const services = [
    ['AI Chatbot Development', 'ai-chatbot-development', 'Production multi-agent chatbots for ERP and business Q&A.'],
    ['Generative AI & RAG Systems', 'generative-ai-rag', 'LangChain/LangGraph RAG pipelines grounded in your codebase and data.'],
    ['SDLC & Workflow Automation', 'sdlc-workflow-automation', 'n8n + LLM pipelines that turn docs and meetings into actionable tasks.'],
    ['Django API Development', 'django-api-development', 'Secure Django REST backends and integrations.'],
    ['ML Solutions', 'ml-solutions', 'Predictive models, evaluation, and practical deployment paths.'],
    ['Business Process Automation', 'business-process-automation', 'Automate repetitive operations with AI-assisted workflows.'],
  ] as const

  for (const [index, [title, slug, shortDescription]] of services.entries()) {
    await upsertBySlug(payload, 'services', {
      title,
      slug,
      shortDescription,
      featured: index < 4,
      displayOrder: index,
      isActive: true,
      ctaLabel: 'Discuss this service',
      ctaUrl: '/contact',
      _status: 'published',
    })
  }

  console.log('Seed completed from CV (updated links; old portfolio removed). Project stubs ready for ZIP deep-dives.')
  process.exit(0)
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
