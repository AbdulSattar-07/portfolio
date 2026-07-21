/**
 * Full project case-study import from content/projects/ALL_PROJECTS.md
 * Run: npm run seed:projects
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../src/payload.config'
import { richText } from './lexical'

type Payload = Awaited<ReturnType<typeof getPayload>>

async function upsertBySlug(
  payload: Payload,
  collection: 'project-categories' | 'technologies' | 'projects',
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
      draft: false,
    })
  }

  return payload.create({
    collection,
    data,
    context: { disableRevalidate: true },
    overrideAccess: true,
    draft: false,
  })
}

async function ensureTech(
  payload: Payload,
  cache: Map<string, number | string>,
  name: string,
  category = 'ai',
) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  if (cache.has(slug)) return cache.get(slug)!

  const doc = await upsertBySlug(payload, 'technologies', {
    name,
    slug,
    category,
    isActive: true,
    displayOrder: cache.size,
  })
  cache.set(slug, doc.id)
  return doc.id
}

async function ensureCategory(
  payload: Payload,
  cache: Map<string, number | string>,
  name: string,
) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  if (cache.has(slug)) return cache.get(slug)!

  const doc = await upsertBySlug(payload, 'project-categories', {
    name,
    slug,
    isActive: true,
    displayOrder: cache.size,
  })
  cache.set(slug, doc.id)
  return doc.id
}

type ProjectSeed = {
  title: string
  slug: string
  shortDescription: string
  fullDescription: string
  problemStatement: string
  businessChallenge?: string
  proposedSolution: string
  systemArchitecture: string
  technicalImplementation: string
  challenges?: string
  challengeSolutions?: string
  securityImplementation?: string
  results: string
  lessonsLearned?: string
  futureImprovements?: string
  features: string[]
  keyModules?: string[]
  responsibilities?: string[]
  measurableOutcomes?: string[]
  techNames: string[]
  categoryNames: string[]
  projectType: string
  projectStatus: string
  companyName?: string
  clientName?: string
  featured: boolean
  displayOrder: number
  startDate?: string
  completionDate?: string
  githubUrl?: string
  repositoryVisibility?: 'public' | 'private' | 'none'
  seoTitle?: string
  seoDescription?: string
  relatedSlugs?: string[]
}

const GITHUB = 'https://github.com/AbdulSattar-07'

const projects: ProjectSeed[] = [
  {
    title: 'Intelligent ERP Chatbot — Multi-Agent System',
    slug: 'intelligent-erp-chatbot',
    shortDescription:
      'Production multi-tenant ERP chatbot answering natural-language business questions against live MySQL with SQL tools, forecasting, Plotly dashboards, and client isolation.',
    fullDescription:
      'Built for Royal Soft as a production GenAI system. Multi-tenant clients get a ChatbotID, isolated MySQL access, and a LangChain tool-calling agent that safely queries ERP views, forecasts trends, and returns tables, charts, and reports in English or Urdu.',
    problemStatement:
      'ERP users waste time navigating menus and writing ad-hoc SQL for inventory, sales, and vouchers. Non-technical staff need safe natural-language access without risking production data.',
    businessChallenge:
      'Support hundreds of daily business queries across tenants while enforcing schema allowlists, SQL safety, and per-client database isolation.',
    proposedSolution:
      'Django application with LangChain AgentManager, schema-aware tools, conversation memory, file-upload context, health monitoring, and multi-modal response formatting.',
    systemArchitecture:
      'User → Django views → AgentManager (LangChain tools) → per-client MySQL engine + ML/visualization tools → localized multi-modal reply (text, tables, Plotly charts, Excel/PDF).',
    technicalImplementation:
      'Tool-calling agents with read-only SQL validation, forecasting (Scikit-learn / XGBoost / Prophet), Plotly visualizations, ReportLab/openpyxl reports, ChromaDB where needed, and admin approval flows that mint ChatbotIDs.',
    challenges:
      'Multi-tenant connection isolation, preventing unsafe SQL, and returning answers that match each user’s language and technical level.',
    challengeSolutions:
      'Per-client engines keyed by chatbot_id, table allowlists, validate_sql_safety checks, language detection, and structured response intelligence for charts vs tables vs summaries.',
    securityImplementation:
      'Admin approval for clients, schema allowlists, SQL safety validation, query row limits, and authenticated chatbot login with isolated database engines.',
    results:
      'Live enterprise ERP AI assistant at Royal Soft handling inventory lookups, business Q&A, and KPI dashboards for daily operations.',
    features: [
      'Multi-tenant onboarding: apply → admin approve → ChatbotID → isolated DB',
      'Agent tools: safe SQL, forecasting, Plotly charts, Excel/PDF reports, schema discovery',
      'File upload into chat context (CSV, Excel, PDF, TXT, JSON)',
      'English/Urdu language detection and localized responses',
      'Dashboard health checks and configuration validation',
      'Conversation persistence and agent logging',
    ],
    keyModules: [
      'AgentManager (LangChain tool-calling)',
      'Client / ChatbotID auth',
      'SQL + forecast + visualization tools',
      'Dashboard & health APIs',
    ],
    responsibilities: [
      'Designed multi-agent orchestration and tool safety',
      'Integrated live MySQL ERP views and forecasting stack',
      'Built Plotly KPI and report generation paths',
      'Hardened multi-tenant isolation and admin workflows',
    ],
    measurableOutcomes: [
      '500+ daily natural-language business queries',
      '~40% fewer manual data lookups',
      '~35% faster query resolution',
    ],
    techNames: [
      'Python',
      'Django',
      'LangChain',
      'OpenAI',
      'MySQL',
      'ChromaDB',
      'Plotly',
      'Scikit-learn',
      'XGBoost',
      'Pandas',
      'NumPy',
      'Prophet',
    ],
    categoryNames: ['Generative AI', 'ERP Systems', 'Artificial Intelligence'],
    projectType: 'professional',
    projectStatus: 'completed',
    companyName: 'Royal Soft',
    featured: true,
    displayOrder: 0,
    startDate: '2025-08-01',
    githubUrl: GITHUB,
    repositoryVisibility: 'private',
    seoTitle: 'Intelligent ERP Chatbot — Multi-Agent System | Abdul Sattar',
    seoDescription:
      'Production LangChain multi-agent ERP chatbot with live MySQL, forecasting, and Plotly dashboards — built by Abdul Sattar at Royal Soft.',
    relatedSlugs: ['ai-php-code-generation', 'sdlc-automation-bot', 'codebase-aware-prompt-engine'],
  },
  {
    title: 'AI-Powered Enterprise PHP Code Generation System',
    slug: 'ai-php-code-generation',
    shortDescription:
      'Django platform that learns Royal ERP PHP conventions from uploaded codebases and generates deployment-ready modules with validation and ZIP packaging.',
    fullDescription:
      'Royal ERP AI Code Generator indexes legacy PHP ERP codebases, retrieves convention-matched context, parses natural-language requirements, and orchestrates generators for forms, JS handlers, SQL, menus, and installers — then validates and packages the module.',
    problemStatement:
      'Hand-writing Royal ERP modules that match house conventions (helpers, vouchers, grids, permissions) is slow and error-prone across a large legacy PHP codebase.',
    businessChallenge:
      'Generate production-ready ERP modules grounded in 1,400+ real company files without modernizing away from legacy ERP patterns.',
    proposedSolution:
      'Secure ZIP upload → PHP knowledge extraction + vector index → NL requirements → GenerationOrchestrator → ERP validators + optional php -l → downloadable package with feedback capture.',
    systemArchitecture:
      'Upload → PHP parser / knowledge extract → embed & retrieve similar modules → requirements parse → generators (PHP, functionsJS, SQL, menus, docs) → ERPValidator + static checks → ZIP package.',
    technicalImplementation:
      'Django 5 + DRF services for analyzer, indexer (VoyageAI or offline embeddings), Anthropic-optional generation with deterministic fallbacks, SSE progress, REST APIs, and Django admin/developer UI.',
    challenges:
      'Preserving legacy ERP style while using modern Python orchestration; keeping generation usable offline without API keys.',
    challengeSolutions:
      'Deterministic fallbacks for embeddings and generation; Royal-specific validators; optional Anthropic/Voyage when configured.',
    securityImplementation:
      'Path-traversal and symlink protection on ZIP upload, skip rules, authenticated developer access, and validation gates before packaging.',
    results:
      'Production code-generation workflow that cuts manual ERP module effort and matches existing conventions at high similarity.',
    features: [
      'Secure ERP ZIP upload with inventory and module discovery',
      'Convention-aware PHP parsing and knowledge index',
      'NL requirements → orchestrated multi-file generation',
      'PHP forms, functionsJS, SQL schema, menus, installer, docs',
      'Royal ERP validators + optional PHP lint',
      'SSE progress, feedback loop, and ZIP download',
    ],
    keyModules: [
      'Upload & extractor',
      'PHP analyzer / knowledge extractor',
      'Vector indexer & search',
      'GenerationOrchestrator',
      'ERPValidator & packaging',
    ],
    responsibilities: [
      'Built end-to-end generation pipeline and orchestrator',
      'Implemented ERP-specific parsers and validators',
      'Added indexing, retrieval, and packaging flows',
    ],
    measurableOutcomes: [
      'Grounded on 1,400+ company ERP files',
      '70–90% similarity with real codebase conventions',
      '60%+ reduction in manual module development effort',
    ],
    techNames: [
      'Python',
      'Django',
      'Django REST Framework',
      'Anthropic',
      'VoyageAI',
      'PostgreSQL',
      'SQLite',
      'PHP',
      'MySQL',
      'RAG',
    ],
    categoryNames: ['Generative AI', 'ERP Systems', 'Artificial Intelligence'],
    projectType: 'professional',
    projectStatus: 'completed',
    companyName: 'Royal Soft',
    featured: true,
    displayOrder: 1,
    startDate: '2025-08-01',
    githubUrl: GITHUB,
    repositoryVisibility: 'private',
    seoTitle: 'AI PHP Code Generation for Royal ERP | Abdul Sattar',
    seoDescription:
      'RAG-powered Royal ERP PHP module generator with validation and packaging — production system by Abdul Sattar.',
    relatedSlugs: ['intelligent-erp-chatbot', 'codebase-aware-prompt-engine', 'sdlc-automation-bot'],
  },
  {
    title: 'SDLC Automation Bot — Meeting to Tasks',
    slug: 'sdlc-automation-bot',
    shortDescription:
      'Next.js control panel plus n8n workflows that turn meeting transcripts into Claude-treated requirements and TMS tasks via Recall.ai bots.',
    fullDescription:
      'RoyalSoft meeting/SDLC stack: start meeting bots, capture transcripts, run multi-stage AI treatment (summary → requirements → tasks), and sync structured work into TMS — accelerating project kick-off.',
    problemStatement:
      'Meeting notes stay unstructured. Turning discussions into SDLC requirements, tasks, and assignments is manual and slow.',
    businessChallenge:
      'Automate kick-off from live meetings without losing audit history or developer assignment accuracy.',
    proposedSolution:
      'Next.js app drives n8n webhooks for Recall.ai bot lifecycle, Claude treatment pipelines, SDLC execute hooks, and PostgreSQL session history.',
    systemArchitecture:
      'Next.js UI → n8n webhooks (start/status/leave/transcript/treat/sdlc) → Recall.ai + Claude + TMS APIs → PostgreSQL session_history.',
    technicalImplementation:
      'TypeScript App Router UI with Zustand state, mammoth DOCX parsing, react-markdown transcript/treatment views, pg history API, and self-hosted n8n on Ubuntu/PM2/Nginx.',
    challenges:
      'Coordinating bot lifecycle, realtime transcripts, and reliable task creation across multiple external APIs.',
    challengeSolutions:
      'Webhook-oriented n8n design, dedicated treat/sdlc execute endpoints, and persistent session history for replay and audit.',
    results:
      'Faster SDLC kick-off from meetings with structured tasks flowing into TMS.',
    features: [
      'Dashboard for transcript, treatment, SDLC, history, and automation',
      'Recall.ai bot start/status/leave/transcript webhooks',
      'Claude multi-stage treatment pipeline',
      'TMS developer lookup and task creation',
      'DOCX upload and markdown rendering',
      'PostgreSQL-backed session history',
    ],
    keyModules: ['Next.js app', 'n8n workflows', 'Recall.ai integration', 'TMS sync', 'History DB'],
    responsibilities: [
      'Built meeting bot control UI and history persistence',
      'Wired n8n treatment and SDLC execute workflows',
      'Integrated Recall.ai and TMS APIs',
    ],
    measurableOutcomes: ['60%+ faster project kick-off'],
    techNames: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'n8n',
      'Anthropic',
      'PostgreSQL',
      'Recall.ai',
      'Zustand',
    ],
    categoryNames: ['Business Automation', 'Generative AI', 'Web Applications'],
    projectType: 'professional',
    projectStatus: 'completed',
    companyName: 'Royal Soft',
    featured: true,
    displayOrder: 2,
    startDate: '2025-08-01',
    githubUrl: GITHUB,
    repositoryVisibility: 'private',
    seoTitle: 'SDLC Automation Bot | Abdul Sattar',
    seoDescription:
      'Meeting-to-tasks SDLC automation with Next.js, n8n, Recall.ai, and Claude — by Abdul Sattar at Royal Soft.',
    relatedSlugs: ['meeting-recorder-bot', 'intelligent-erp-chatbot', 'codebase-aware-prompt-engine'],
  },
  {
    title: 'Codebase-Aware Prompt Engine (n8n + MySQL)',
    slug: 'codebase-aware-prompt-engine',
    shortDescription:
      'n8n + MySQL prompt engine that seeds ERP codebase excerpts and generates codebase-aware multi-task batch prompts with TMS mapping.',
    fullDescription:
      'RoyalSoft Prompt Engine MVP6 stores codebase profiles and file excerpts in MySQL, bridges n8n Code nodes to live data, and generates grounded developer prompts in batches.',
    problemStatement:
      'Generic LLM prompts ignore the live ERP codebase. Teams need prompts grounded in real file excerpts and company conventions.',
    proposedSolution:
      'Node tooling applies MySQL schema, seeds excerpts from ERP ZIPs, runs a local MySQL bridge for n8n, and imports the MVP6 hybrid workflow for batch generation.',
    systemArchitecture:
      'ERP ZIP seed → MySQL (profiles/excerpts/prompts/batches/TMS) ← MySQL bridge ← n8n workflow → UI / generated prompt history.',
    technicalImplementation:
      'Node.js scripts (schema, bridge, seed, preflight, E2E), mysql2, n8n workflow JSON import, optional UI server and OpenAI secret sync.',
    results:
      'Permanent, codebase-aware prompt generation for ERP development tasks with batch history and TMS config.',
    features: [
      'MySQL tables for profiles, excerpts, prompts, batches, TMS config',
      'Seed pipeline for large ERP ZIPs',
      'Local MySQL bridge for n8n Code nodes',
      'Multi-task hybrid batch generation workflow',
      'E2E unknown-task test scripts',
    ],
    keyModules: ['MySQL schema', 'Bridge server', 'n8n MVP6 workflow', 'Seed & E2E scripts'],
    measurableOutcomes: ['Codebase-grounded prompts instead of generic LLM requests'],
    techNames: ['n8n', 'Node.js', 'MySQL', 'OpenAI', 'JavaScript'],
    categoryNames: ['Business Automation', 'Generative AI', 'ERP Systems'],
    projectType: 'professional',
    projectStatus: 'completed',
    companyName: 'Royal Soft',
    featured: false,
    displayOrder: 3,
    githubUrl: GITHUB,
    repositoryVisibility: 'private',
    seoTitle: 'Codebase-Aware Prompt Engine | Abdul Sattar',
    seoDescription:
      'n8n and MySQL prompt engine grounded in ERP codebases — Abdul Sattar, Royal Soft.',
    relatedSlugs: ['ai-php-code-generation', 'sdlc-automation-bot'],
  },
  {
    title: 'Meeting Recorder / Browser Join Bot',
    slug: 'meeting-recorder-bot',
    shortDescription:
      'Django Channels + Celery bots that join Meet/Teams/Zoom via Playwright, capture audio, and transcribe with Faster-Whisper.',
    fullDescription:
      'Browser automation meeting bot platform: lifecycle management, platform drivers, async Celery queues, WebSocket status, and Faster-Whisper transcription for SDLC tooling.',
    problemStatement:
      'Manual attendance and recording of client meetings does not scale for SDLC automation.',
    proposedSolution:
      'Playwright-driven join bots with Celery launch/control/transcribe queues, Channels realtime updates, and optional S3 media storage.',
    systemArchitecture:
      'API → Celery (bot_launch/control/transcribe) → Playwright drivers (Meet/Teams/Zoom) → audio pipeline (FFmpeg + Faster-Whisper) → Channels WebSocket status.',
    technicalImplementation:
      'Django 5, DRF, Channels/Redis, Celery, Playwright, faster-whisper, ffmpeg-python, boto3 storage, management commands for launch/retry/retranscribe.',
    challenges:
      'Production readiness around eager Celery, auth, and long-running join timeouts — documented and hardened through fix guides.',
    challengeSolutions:
      'Proper Celery worker queues, dispatch patterns, retry/retranscribe commands, and platform-specific driver recovery.',
    results:
      'Automated meeting join/record/transcribe foundation for RoyalSoft SDLC tooling.',
    features: [
      'Playwright automation for major meeting platforms',
      'Faster-Whisper transcription + FFmpeg audio pipeline',
      'Celery + Redis task queues',
      'Django Channels live bot state',
      'Retry / retranscribe management commands',
    ],
    keyModules: ['Bot lifecycle', 'Platform drivers', 'Transcription workers', 'WebSocket status'],
    techNames: [
      'Django',
      'Celery',
      'Redis',
      'Playwright',
      'Faster-Whisper',
      'PostgreSQL',
      'Django Channels',
      'Python',
    ],
    categoryNames: ['Business Automation', 'Artificial Intelligence'],
    projectType: 'professional',
    projectStatus: 'in-progress',
    companyName: 'Royal Soft',
    featured: false,
    displayOrder: 4,
    githubUrl: GITHUB,
    repositoryVisibility: 'private',
    seoTitle: 'Meeting Recorder Bot | Abdul Sattar',
    seoDescription:
      'Playwright meeting join bots with Faster-Whisper transcription — Abdul Sattar, Royal Soft.',
    relatedSlugs: ['sdlc-automation-bot'],
  },
  {
    title: 'AI-Powered E-Commerce Recommendation Engine',
    slug: 'ecommerce-recommendation-engine',
    shortDescription:
      'Solo Final Year Project: Django e-commerce store with hybrid collaborative + content-based recommendations (60/40) and weighted user interactions.',
    fullDescription:
      'Built entirely by Abdul Sattar for the BIT Final Year Project at Islamia University of Bahawalpur. Full storefront plus RecommendationEngine combining user–user cosine collaborative filtering and TF-IDF content similarity.',
    problemStatement:
      'Generic product catalogs do not personalize. The FYP goal was a working store with measurable hybrid recommendation quality.',
    proposedSolution:
      'Log weighted interactions (view/search/like/cart/purchase), build collaborative and content models, merge hybrid scores, persist Recommendation rows, and surface them in the storefront.',
    systemArchitecture:
      'User action → UserInteraction → RecommendationEngine (collaborative + TF-IDF content → 60/40 hybrid) → Recommendation table → storefront product lists.',
    technicalImplementation:
      'Django 4.2 models (Category, Product, UserInteraction, Recommendation, Order, Feedback, UserProfile), Scikit-learn cosine/TF-IDF, management command generate_recommendations, Bootstrap 5 UI, Cloudinary-ready media.',
    results:
      'Working AI shop with hybrid recommendations validated at 85%+ precision (CV).',
    lessonsLearned:
      'Interaction weighting and hybrid blending matter more than a single algorithm for cold-start and niche catalogs.',
    features: [
      'Full e-commerce catalog, cart/order, and auth flows',
      'Collaborative filtering (user–user cosine similarity)',
      'Content-based TF-IDF on product text',
      'Hybrid merge (~60% collaborative / 40% content)',
      'Weighted interactions: view/search/like/cart/purchase',
      'Admin + recommendation generation command',
    ],
    keyModules: ['store models', 'RecommendationEngine', 'generate_recommendations command'],
    responsibilities: [
      'Solo design and implementation of store + ML recommender',
      'Feature engineering for interaction weights',
      'Validation and deployment path (PythonAnywhere / MySQL per CV)',
    ],
    measurableOutcomes: ['85%+ recommendation precision on validation'],
    techNames: [
      'Python',
      'Django',
      'Scikit-learn',
      'Pandas',
      'NumPy',
      'Bootstrap',
      'MySQL',
      'SQLite',
      'Cloudinary',
    ],
    categoryNames: ['Machine Learning', 'Web Applications', 'Artificial Intelligence'],
    projectType: 'academic',
    projectStatus: 'completed',
    clientName: 'Islamia University of Bahawalpur',
    featured: true,
    displayOrder: 5,
    startDate: '2024-08-01',
    completionDate: '2025-06-01',
    githubUrl: GITHUB,
    repositoryVisibility: 'public',
    seoTitle: 'AI E-Commerce Recommendation Engine (FYP) | Abdul Sattar',
    seoDescription:
      'Solo FYP: Django e-commerce with hybrid collaborative + content-based recommendations by Abdul Sattar.',
    relatedSlugs: ['medicare-ml-predictions', 'smart-ai-resume-analyzer'],
  },
  {
    title: 'MediCare — Diabetes & Depression ML Predictions',
    slug: 'medicare-ml-predictions',
    shortDescription:
      'Django health app wrapping production-style sklearn pipelines for diabetes risk and depression risk assessment with validation and explainability.',
    fullDescription:
      'MediCare packages trained ML artifacts and prediction APIs inside a Django product shell, including documented diabetes RandomForest pipelines and a high-AUC depression risk model with engineered features.',
    problemStatement:
      'Health-risk ML work often stops at notebooks. MediCare focuses on deployable, validated prediction paths.',
    proposedSolution:
      'Train/evaluate sklearn pipelines with medical-style input validation, persist artifacts, and serve structured JSON predictions through Django (with standalone Flask API modules available).',
    systemArchitecture:
      'Features → preprocessing/scaler → trained model → risk classification + feature importance → Django/Flask prediction endpoints.',
    technicalImplementation:
      'Diabetes: feature engineering, SMOTE, GridSearchCV, artifact persistence. Depression: 27 features (13 base + 14 engineered) with documented Accuracy 85.33%, AUC-ROC 0.9248. Django + django-allauth shell.',
    results:
      'Validated prediction engines ready for demo/integration with clear metrics and structured outputs.',
    features: [
      'Diabetes risk prediction with strict validation and risk levels',
      'Depression risk model with engineered features and strong AUC',
      'Model artifact persistence (model/scaler/metrics)',
      'Health and model-info endpoints',
      'Django app shell with optional Google OAuth',
    ],
    measurableOutcomes: [
      'Depression model AUC-ROC 0.9248',
      'Depression Accuracy 85.33% / F1 87.17%',
      'Diabetes pipeline with explainability and structured JSON output',
    ],
    techNames: ['Python', 'Django', 'Scikit-learn', 'NumPy', 'joblib', 'Pandas'],
    categoryNames: ['Machine Learning', 'Artificial Intelligence'],
    projectType: 'personal',
    projectStatus: 'completed',
    featured: false,
    displayOrder: 6,
    githubUrl: GITHUB,
    repositoryVisibility: 'public',
    seoTitle: 'MediCare ML Predictions | Abdul Sattar',
    seoDescription:
      'Diabetes and depression risk ML pipelines in Django — Abdul Sattar.',
    relatedSlugs: ['ecommerce-recommendation-engine'],
  },
  {
    title: 'Smart AI Resume Analyzer Platform',
    slug: 'smart-ai-resume-analyzer',
    shortDescription:
      'Full-stack ATS scoring, Groq AI feedback, job matching, and ATS-friendly PDF/DOCX builder — Django REST + React/Vite.',
    fullDescription:
      'End-to-end career platform: upload resumes, run ATS analysis, get Groq improvement suggestions, match live jobs (Adzuna/RemoteOK), build ATS resumes, and track progress on a dashboard.',
    problemStatement:
      'Job seekers need more than a static resume PDF — they need ATS scoring, skill-gap feedback, and job match signals in one product.',
    proposedSolution:
      'DRF backend services for parse/analyze/feedback/match/builder plus a React dashboard with JWT auth and analytics.',
    systemArchitecture:
      'React (Vite) → JWT API → resumes/jobs/builder/dashboard apps → Groq + job APIs + ReportLab/DOCX generators (Celery eager by default).',
    technicalImplementation:
      'pdfplumber/python-docx parsing, TF-IDF ATS scoring, Groq feedback, Adzuna/RemoteOK fetchers, SimpleJWT, Zustand frontend, Recharts analytics.',
    results:
      'Complete resume product covering analysis, jobs, builder, and dashboard — preferred public resume case study.',
    features: [
      'Resume upload and ATS scoring',
      'Groq AI feedback and section rewrite',
      'Job search + TF-IDF matching',
      'ATS resume builder (PDF/DOCX)',
      'Dashboard: score history, skill gaps, activity',
      'JWT auth and Django admin',
    ],
    keyModules: ['resumes', 'jobs', 'builder', 'dashboard', 'users/auth'],
    measurableOutcomes: ['Unified ATS + AI feedback + job match workflow'],
    techNames: [
      'Python',
      'Django',
      'Django REST Framework',
      'React',
      'Vite',
      'Tailwind CSS',
      'Scikit-learn',
      'Groq',
      'Celery',
      'JWT',
    ],
    categoryNames: ['Generative AI', 'Web Applications', 'Artificial Intelligence'],
    projectType: 'personal',
    projectStatus: 'completed',
    featured: true,
    displayOrder: 7,
    githubUrl: GITHUB,
    repositoryVisibility: 'public',
    seoTitle: 'Smart AI Resume Analyzer | Abdul Sattar',
    seoDescription:
      'ATS scoring, Groq AI feedback, job matching, and resume builder — full stack by Abdul Sattar.',
    relatedSlugs: ['ai-resume-job-match-agent', 'ai-notes-app'],
  },
  {
    title: 'AI Resume & Job Match Agent',
    slug: 'ai-resume-job-match-agent',
    shortDescription:
      'Django + ChromaDB RAG agent that parses resumes, scores JD match locally, and runs Groq LangChain gap analysis with PDF reports.',
    fullDescription:
      'Focused resume–JD matching agent: HuggingFace MiniLM embeddings in ChromaDB, free keyword match scoring, and LangChain gap analysis via Groq Llama.',
    problemStatement:
      'Candidates need quick, explainable match scores and gap analysis against a target job description.',
    proposedSolution:
      'Parse PDF/DOCX into sections, embed in ChromaDB, compute match score, then run a LangChain agent for improvements and export a PDF report.',
    systemArchitecture:
      'Upload → parser → ChromaDB embeddings → match API → Groq LangChain analyze API → ReportLab PDF.',
    technicalImplementation:
      'Django 4.2 + DRF endpoints, sentence-transformers all-MiniLM-L6-v2, ChromaDB, LangChain-Groq, vanilla HTML UI.',
    results:
      'Lightweight RAG resume agent that works without paid embeddings and only needs Groq for deep analysis.',
    features: [
      'PDF/DOCX/TXT resume parsing with sections',
      'Local HuggingFace embeddings + ChromaDB',
      'Keyword match score without API key',
      'Groq LangChain gap analysis',
      'PDF report download',
    ],
    techNames: [
      'Python',
      'Django',
      'LangChain',
      'ChromaDB',
      'Groq',
      'HuggingFace',
      'ReportLab',
    ],
    categoryNames: ['Generative AI', 'Artificial Intelligence'],
    projectType: 'personal',
    projectStatus: 'completed',
    featured: false,
    displayOrder: 8,
    githubUrl: GITHUB,
    repositoryVisibility: 'public',
    seoTitle: 'AI Resume & Job Match Agent | Abdul Sattar',
    seoDescription:
      'RAG resume matching with ChromaDB and Groq LangChain — Abdul Sattar.',
    relatedSlugs: ['smart-ai-resume-analyzer'],
  },
  {
    title: 'Superstore Management System',
    slug: 'superstore-management-system',
    shortDescription:
      'Retail ERP with POS, inventory, purchasing, accounting, CRM, HR, reports, and role-based access — Django REST + React/Vite.',
    fullDescription:
      'Full retail management platform covering cashier POS shifts, stock, GRN purchasing, accounting journals, CRM/HR modules, and mock hardware actions, with Docker Compose or SQLite local modes.',
    problemStatement:
      'Small-to-mid retailers need an integrated POS and back-office system with clear roles — not disconnected spreadsheets.',
    proposedSolution:
      'DRF multi-app backend (auth, inventory, POS, purchase, accounting, CRM, HR, reports) with a React admin/POS frontend and JWT roles.',
    systemArchitecture:
      'React/Vite clients → JWT DRF APIs → domain apps → PostgreSQL (or SQLite) + optional Celery/Redis workers.',
    technicalImplementation:
      'Django 4.2, SimpleJWT, Celery/Redis, seed_demo command, Recharts dashboards, Radix/Tailwind UI, Docker Compose stack.',
    results:
      'Verifiable POS-to-accounting flow: sale decreases stock, writes payment, and creates journal entries; GRN increases stock.',
    features: [
      'Role-based logins (admin, manager, cashier, accountant, HR, warehouse)',
      'POS shifts, cash sales, mock print/drawer',
      'Inventory and purchase GRN',
      'Accounting journals and reports',
      'CRM and HR modules',
      'Demo seed data and Docker Compose option',
    ],
    keyModules: ['auth', 'inventory', 'POS', 'purchase', 'accounting', 'CRM', 'HR', 'reports'],
    techNames: [
      'Python',
      'Django',
      'Django REST Framework',
      'React',
      'Vite',
      'PostgreSQL',
      'Redis',
      'Celery',
      'JWT',
      'Tailwind CSS',
    ],
    categoryNames: ['ERP Systems', 'Web Applications', 'Business Automation'],
    projectType: 'personal',
    projectStatus: 'completed',
    featured: false,
    displayOrder: 9,
    githubUrl: GITHUB,
    repositoryVisibility: 'public',
    seoTitle: 'Superstore Management System | Abdul Sattar',
    seoDescription:
      'Django REST + React retail POS/ERP with inventory, accounting, and HR — Abdul Sattar.',
    relatedSlugs: ['intelligent-erp-chatbot'],
  },
  {
    title: 'CampusGuide AI — College Assistant',
    slug: 'campusguide-ai',
    shortDescription:
      'Django campus chatbot that answers from normalized college data first, then hybrid retrieval, calling an LLM only when needed.',
    fullDescription:
      'CampusGuide AI for Government Degree College Ekkaghund: Excel import with data-quality reports, structured academics/admissions/campus models, hybrid FAISS/TF-IDF retrieval, and optional Groq/Gemini LLM fallback.',
    problemStatement:
      'Students and visitors ask the same campus questions; answers live in messy spreadsheets and need a reliable assistant.',
    proposedSolution:
      'Normalize workbooks into Django models, rebuild a retrieval index, prefer deterministic lookups, then hybrid RAG + optional LLM.',
    systemArchitecture:
      'Excel import → KnowledgeSource/chunks + structured models → retriever (FAISS/TF-IDF) → services orchestration → chat UI (LLM only if needed).',
    technicalImplementation:
      'Schema-aware workbook adapters, provenance fields, golden-question evaluation command, fail-closed embeddings, Folium maps dependency, Groq/Gemini optional keys.',
    results:
      'Imported campus knowledge (hundreds of syllabus courses and chunks) with evaluation tooling and safer retrieval behavior.',
    features: [
      'Structured answers for faculty, programs, admissions, facilities, syllabus',
      'Workbook import with data-quality reporting',
      'Hybrid retrieval with lexical fallback',
      'Golden question evaluation',
      'Per-browser conversation ownership',
    ],
    techNames: [
      'Python',
      'Django',
      'FAISS',
      'Scikit-learn',
      'Groq',
      'Gemini',
      'Pandas',
      'RAG',
    ],
    categoryNames: ['Generative AI', 'Web Applications', 'Artificial Intelligence'],
    projectType: 'personal',
    projectStatus: 'completed',
    clientName: 'Government Degree College Ekkaghund',
    featured: false,
    displayOrder: 10,
    githubUrl: GITHUB,
    repositoryVisibility: 'public',
    seoTitle: 'CampusGuide AI | Abdul Sattar',
    seoDescription:
      'College assistant with structured data + hybrid RAG — Abdul Sattar.',
  },
  {
    title: 'AI Notes App',
    slug: 'ai-notes-app',
    shortDescription:
      'React/Vite notes app with local storage and AI actions — summarize, improve, explain, expand, translate via Groq or Gemini.',
    fullDescription:
      'Lightweight AI writing companion by Abdul Sattar: local notes UX plus prompt-driven AI panel backed by Groq Llama or Google Gemini Flash.',
    problemStatement:
      'Quick note capture is useless without fast rewrite tools for summarize/improve/translate workflows.',
    proposedSolution:
      'Client-side notes with LocalStorage persistence and an AI service layer calling free LLM APIs.',
    systemArchitecture:
      'React UI (sidebar/editor/AI panel) → LocalStorage → Groq or Gemini generateContent/chat completions.',
    technicalImplementation:
      'Vite + React 19, uuid notes, react-hot-toast, env-based VITE_GROQ_API_KEY / VITE_GEMINI_API_KEY service variants.',
    results:
      'Fast personal productivity tool demonstrating practical LLM feature UX.',
    features: [
      'Notes CRUD with local persistence',
      'Summarize, improve, explain, expand, translate',
      'Groq and Gemini service variants',
      'Modal results and toast feedback',
    ],
    techNames: ['React', 'Vite', 'Groq', 'Gemini', 'JavaScript'],
    categoryNames: ['Web Applications', 'Generative AI'],
    projectType: 'personal',
    projectStatus: 'completed',
    featured: false,
    displayOrder: 11,
    githubUrl: GITHUB,
    repositoryVisibility: 'public',
    seoTitle: 'AI Notes App | Abdul Sattar',
    seoDescription: 'React AI notes with Groq/Gemini actions — Abdul Sattar.',
    relatedSlugs: ['smart-ai-resume-analyzer', 'github-profile-finder'],
  },
  {
    title: 'GitHub Profile Finder',
    slug: 'github-profile-finder',
    shortDescription:
      'React/Vite app by Abdul Sattar to search GitHub users, browse repositories, and visualize language statistics.',
    fullDescription:
      'Frontend utility that queries the GitHub REST API for profiles and repos, charts language usage, and keeps recent searches in LocalStorage — built by Abdul Sattar.',
    problemStatement:
      'Exploring a developer’s public GitHub footprint should be fast — profile, repos, and language mix in one view.',
    proposedSolution:
      'Search bar + custom hook for GitHub API calls, user card, repo list, and language stats chart with optional personal access token.',
    systemArchitecture:
      'React components → useGitHub hook → GitHub REST API → LocalStorage recent searches.',
    technicalImplementation:
      'Vite React app, SearchBar/UserCard/RepoList/StatsChart/Loader components, VITE_GITHUB_TOKEN for higher rate limits, Vercel-ready config.',
    results:
      'Clean portfolio frontend piece demonstrating API integration and data visualization.',
    features: [
      'Search by username or profile URL',
      'Repository browsing with details',
      'Language statistics visualization',
      'Recent searches persistence',
      'Optional GitHub token for rate limits',
    ],
    techNames: ['React', 'Vite', 'JavaScript', 'GitHub API'],
    categoryNames: ['Web Applications'],
    projectType: 'personal',
    projectStatus: 'completed',
    featured: false,
    displayOrder: 12,
    githubUrl: GITHUB,
    repositoryVisibility: 'public',
    seoTitle: 'GitHub Profile Finder | Abdul Sattar',
    seoDescription:
      'Search GitHub profiles, repos, and language stats — React app by Abdul Sattar.',
    relatedSlugs: ['ai-notes-app'],
  },
]

const REMOVE_SLUGS = ['diabetes-prediction-ml', 'employee-management-system']

async function seedProjects() {
  const payload = await getPayload({ config })
  const techCache = new Map<string, number | string>()
  const catCache = new Map<string, number | string>()

  // Extra categories used by case studies
  for (const name of [
    'Artificial Intelligence',
    'Generative AI',
    'ERP Systems',
    'Web Applications',
    'Business Automation',
    'Machine Learning',
  ]) {
    await ensureCategory(payload, catCache, name)
  }

  console.log(`Importing ${projects.length} full projects...`)

  const idBySlug = new Map<string, number | string>()

  for (const p of projects) {
    const technologyIds: Array<number | string> = []
    for (const tech of p.techNames) {
      technologyIds.push(await ensureTech(payload, techCache, tech))
    }

    const categoryIds: Array<number | string> = []
    for (const cat of p.categoryNames) {
      categoryIds.push(await ensureCategory(payload, catCache, cat))
    }

    const doc = await upsertBySlug(payload, 'projects', {
      title: p.title,
      slug: p.slug,
      shortDescription: p.shortDescription.slice(0, 320),
      fullDescription: richText(p.fullDescription),
      problemStatement: richText(p.problemStatement),
      businessChallenge: p.businessChallenge ? richText(p.businessChallenge) : undefined,
      proposedSolution: richText(p.proposedSolution),
      systemArchitecture: richText(p.systemArchitecture),
      technicalImplementation: richText(p.technicalImplementation),
      challenges: p.challenges ? richText(p.challenges) : undefined,
      challengeSolutions: p.challengeSolutions ? richText(p.challengeSolutions) : undefined,
      securityImplementation: p.securityImplementation
        ? richText(p.securityImplementation)
        : undefined,
      results: richText(p.results),
      lessonsLearned: p.lessonsLearned ? richText(p.lessonsLearned) : undefined,
      futureImprovements: p.futureImprovements ? richText(p.futureImprovements) : undefined,
      features: p.features.map((feature) => ({ feature })),
      keyModules: (p.keyModules || []).map((module) => ({ module })),
      responsibilities: (p.responsibilities || []).map((item) => ({ item })),
      measurableOutcomes: (p.measurableOutcomes || []).map((outcome) => ({ outcome })),
      technologies: technologyIds,
      categories: categoryIds,
      projectType: p.projectType,
      projectStatus: p.projectStatus,
      companyName: p.companyName || undefined,
      clientName: p.clientName || undefined,
      featured: p.featured,
      displayOrder: p.displayOrder,
      startDate: p.startDate || undefined,
      completionDate: p.completionDate || undefined,
      githubUrl: p.githubUrl || GITHUB,
      repositoryVisibility: p.repositoryVisibility || 'none',
      seoTitle: p.seoTitle || p.title,
      seoDescription: p.seoDescription || p.shortDescription,
      publishedAt: new Date().toISOString(),
      _status: 'published',
    })

    idBySlug.set(p.slug, doc.id)
    console.log(`  ✓ ${p.slug}`)
  }

  // Related projects second pass
  console.log('Linking related projects...')
  for (const p of projects) {
    if (!p.relatedSlugs?.length) continue
    const related = p.relatedSlugs
      .map((s) => idBySlug.get(s))
      .filter((id): id is number | string => id !== undefined)
    if (!related.length) continue
    const id = idBySlug.get(p.slug)
    if (!id) continue
    await payload.update({
      collection: 'projects',
      id,
      data: { relatedProjects: related },
      context: { disableRevalidate: true },
      overrideAccess: true,
      draft: false,
    })
  }

  // Remove obsolete stubs replaced by fuller case studies
  for (const slug of REMOVE_SLUGS) {
    const found = await payload.find({
      collection: 'projects',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    })
    if (found.docs[0]) {
      await payload.delete({
        collection: 'projects',
        id: found.docs[0].id,
        context: { disableRevalidate: true },
        overrideAccess: true,
      })
      console.log(`  removed obsolete stub: ${slug}`)
    }
  }

  // Update home featured projects relation to top featured
  const featuredIds = projects
    .filter((p) => p.featured)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((p) => idBySlug.get(p.slug))
    .filter((id): id is number | string => id !== undefined)

  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      featuredProjects: featuredIds,
      featuredProjectsHeading: 'Featured work',
      featuredProjectsIntro:
        'Production GenAI systems from Royal Soft, plus solo FYP and full-stack AI products — case studies imported from project archives.',
    },
    context: { disableRevalidate: true },
    overrideAccess: true,
  })

  console.log(`Done. ${projects.length} projects published. Featured on home: ${featuredIds.length}`)
  process.exit(0)
}

seedProjects().catch((error) => {
  console.error(error)
  process.exit(1)
})
