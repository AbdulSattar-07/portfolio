# Abdul Sattar — Portfolio Project Case Studies (from ZIPs)

> **Purpose:** Single source of truth for the next chat — import these into the portfolio CMS/database.  
> **Rule:** Tech stacks and features are taken from the actual ZIP codebases. Outcomes marked **(CV)** come from your CV; do not invent live demos or metrics that are not in the source.  
> **Source folder:** `Project_zip_all/`  
> **Prepared:** 2026-07-21

---

## ZIP inventory & mapping

| ZIP file | Portfolio project | Notes |
|----------|-------------------|--------|
| `MultiTalent_ERP_Chatbot.zip` | Intelligent ERP Chatbot | Production RoyalSoft |
| `CODE_GENERATION_TOOL.zip` | AI PHP / Royal ERP Code Generator | Production RoyalSoft |
| `Prompt_Generators.zip` | Codebase-Aware Prompt Engine (n8n) | RoyalSoft — sibling to codegen |
| `MeetingSDLC_bot.zip` | SDLC Meeting Bot UI + n8n workflows | Next.js + Recall.ai + Claude + TMS |
| `Meeting_Recoder_tool.zip` | Meeting Recorder / Join Bot | Django + Playwright + Whisper (large archive) |
| `PersonaCarAi.zip` | AI E-Commerce + Hybrid Recommender | Final Year Project — solo build by Abdul Sattar |
| `Medicare.zip` | MediCare — Diabetes & Depression ML | Django + sklearn models |
| `AI_CV_Analyser.zip` | AI Resume & Job Match Agent | Django + ChromaDB + Groq |
| `CV_ANALYSER.zip` | Smart AI Resume Analyzer Platform | Full stack ATS + jobs + builder (`Reumer_builder.zip` was a duplicate — removed from import) |
| `Super_market.zip` | Superstore Retail Management System | Django REST + React/Vite POS ERP |
| `AI_ASSENTANCE.zip` | CampusGuide AI | College assistant RAG chatbot |
| `ai-notes-app.zip` | AI Notes App | React/Vite + Groq/Gemini |
| `github-finder.zip` | GitHub Profile Finder | React/Vite — by Abdul Sattar |

**Recommended featured (portfolio home):** ERP Chatbot · PHP Code Generator · SDLC Meeting Bot · E-Commerce Recommender · Smart Resume Analyzer

---

## 1. Intelligent ERP Chatbot — Multi-Agent System

**Slug:** `intelligent-erp-chatbot`  
**Type:** Professional (Royal Soft) · **Status:** Completed / production  
**Source ZIP:** `MultiTalent_ERP_Chatbot.zip`  
**Role:** AI & ML Developer

### Short description
Multi-tenant enterprise ERP chatbot that answers natural-language business questions against live MySQL ERP data, with SQL tooling, forecasting, Plotly visualizations, reports, and admin-controlled client isolation.

### Problem
ERP users waste time navigating menus and writing ad-hoc queries for inventory, sales, and vouchers. Non-technical staff need safe, natural-language access without breaking production data.

### Solution
Django app with LangChain tool-calling agents (`AgentManager`), schema-aware allowlists, per-client DB engines (`chatbot_id`), conversation memory, file upload context, and response intelligence (tables/charts/localized EN/Urdu).

### Key features (from code)
- Multi-tenant client onboarding: apply → admin approve → unique ChatbotID → isolated DB access
- Agent tools: read-only SQL, forecasting (sklearn/XGBoost/Prophet stack present), Plotly charts, Excel/PDF reports, schema discovery
- SQL safety validation + table allowlist (`vwsaleai`, `vwvouchuser`, etc.)
- File upload into chat context (CSV/Excel/PDF/TXT/JSON)
- Dashboard health checks, config validation, unified auth flows
- Conversation persistence and logging

### Tech stack (keep these)
- **Backend:** Python, Django 4.1, Gunicorn, WhiteNoise  
- **AI:** LangChain, LangChain-OpenAI, OpenAI API, ChromaDB  
- **Data / ML:** Pandas, NumPy, Scikit-learn, SciPy, Statsmodels, XGBoost, Prophet  
- **Viz / reports:** Plotly, Matplotlib, ReportLab, openpyxl  
- **DB:** MySQL (mysqlclient / PyMySQL / SQLAlchemy)

### Architecture (one line)
`User → Django views → AgentManager (LangChain tools) → client MySQL + ML/viz tools → formatted multi-modal reply`

### Measurable outcomes (CV — use as stated)
- 500+ daily natural-language business queries via multi-agent orchestration  
- ~40% fewer manual lookups; ~35% faster resolution  

### Portfolio fields
- **Categories:** GenAI / Multi-Agent, ERP / Enterprise  
- **Featured:** Yes  
- **Technologies:** Python, Django, LangChain, OpenAI, MySQL, ChromaDB, Plotly, Scikit-learn, XGBoost  

---

## 2. AI-Powered Enterprise PHP Code Generation System

**Slug:** `ai-php-code-generation`  
**Type:** Professional (Royal Soft) · **Status:** Completed / production  
**Source ZIP:** `CODE_GENERATION_TOOL.zip`  
**Product name in repo:** Royal ERP AI Code Generator

### Short description
Django platform that indexes a Royal ERP PHP codebase, retrieves convention-matched context, and generates deployment-ready ERP modules (PHP forms, JS handlers, MySQL schema, menus, validators, ZIP package).

### Problem
Royal ERP is a large legacy PHP system. Hand-writing modules that match house conventions (helpers, vouchers, grids, permissions) is slow and error-prone.

### Solution
Upload ERP ZIP → parse PHP conventions → build knowledge + vector index → NL requirements → orchestrated generators → ERP-specific validation + optional `php -l` → downloadable package + feedback loop.

### Key features (from code)
- Secure ZIP upload (path traversal / symlink protection, skip rules)
- PHP parser for forms, CRUD helpers, routes, logging, vouchers, grids, sessions, permissions, reports
- Vector indexing (VoyageAI optional; offline deterministic embeddings for local)
- Requirements parsing (Anthropic optional + deterministic fallback)
- Generators: PHP forms, `functionsJS.php`, SQL schema, print/report forms, menu/permissions, module installer, docs
- Validators: Royal ERP rules, static checks, PHP lint
- REST API, SSE progress, Django admin, developer UI
- E2E tests (City / Purchase Return flows referenced in README)

### Tech stack (keep these)
- **Backend:** Python, Django 5.2+, Django REST Framework  
- **AI (optional):** Anthropic, VoyageAI  
- **DB:** SQLite default; PostgreSQL optional (`dj-database-url`, psycopg)  
- **Quality:** pytest, pytest-django, ruff  

### Architecture (one line)
`ZIP upload → PHP knowledge extract + embed → NL spec → GenerationOrchestrator → validate → ZIP package`

### Measurable outcomes (CV)
- Grounded on 1,400+ company files  
- 70–90% similarity to existing conventions; 60%+ less manual module effort  

### Portfolio fields
- **Categories:** GenAI / Code Generation, ERP / Enterprise  
- **Featured:** Yes  
- **Technologies:** Python, Django, DRF, RAG, Anthropic, VoyageAI, PHP (target), MySQL, PostgreSQL  

---

## 3. Codebase-Aware Prompt Engine (n8n + MySQL)

**Slug:** `codebase-aware-prompt-engine`  
**Type:** Professional (Royal Soft) · **Status:** Completed  
**Source ZIP:** `Prompt_Generators.zip`  
**Repo name:** `royalsoft-prompt-engine-db` / MVP6 MULTI HYBRIDE

### Short description
n8n-driven prompt engine that seeds ERP codebase excerpts into MySQL and generates codebase-aware, multi-task batch prompts for developers — with TMS config and developer mapping.

### Problem
Generic LLM prompts ignore the live ERP codebase. Teams need prompts grounded in real file excerpts and company conventions, stored permanently and batchable.

### Solution
Node tooling + MySQL schema + n8n workflow import. Local MySQL bridge serves n8n Code nodes; UI generates/stores prompts and batches.

### Key features (from code/docs)
- MySQL tables: codebase profiles, file excerpts, generated prompts/batches, TMS config, developer mappings  
- Seed pipeline for large ERP ZIPs (docs mention ~899 files / 4093 excerpt rows for a seed)  
- n8n workflow: `RoyalSoft_Codebase_Aware_Prompt_Engine_MVP6_MULTI_TASK_BATCH_HYBRIDE.json`  
- Scripts: schema apply, bridge, seed, preflight, E2E unknown-task tests  
- Optional UI server + OpenAI secret sync helpers  

### Tech stack (keep these)
- **Automation:** n8n  
- **Runtime:** Node.js, mysql2  
- **DB:** MySQL  
- **AI:** OpenAI (via n8n / synced secrets)  

### Portfolio note
Sibling system to the Django Code Generator — show together as “ERP AI codegen ecosystem” if space is limited (feature one primary, mention the other).

### Portfolio fields
- **Categories:** Automation / n8n, GenAI, ERP  
- **Featured:** Optional (or combine narrative with #2)  
- **Technologies:** n8n, Node.js, MySQL, OpenAI, Prompt Engineering  

---

## 4. SDLC Automation Bot — Meeting → Tasks (UI + n8n)

**Slug:** `sdlc-automation-bot`  
**Type:** Professional (Royal Soft) · **Status:** Completed / production-oriented  
**Source ZIP:** `MeetingSDLC_bot.zip`  
**Package:** `royalsoft-meeting-bot` (Next.js)

### Short description
Next.js control panel that starts meeting bots via n8n/Recall.ai, streams/stores transcripts, runs Claude-based “treatment” (summary → requirements → tasks), and pushes structured work into TMS — cutting project kick-off time.

### Problem
Meeting notes stay unstructured. SDLC kick-off (requirements, tasks, assignments) is manual and slow.

### Solution
Frontend drives n8n webhooks for bot lifecycle + AI treatment + SDLC execute; PostgreSQL stores session history; TMS API creates/assigns tasks.

### Key features (from Hosting_plan + package)
- Pages: home, settings, dashboard (transcript, treatment, SDLC, history, automation, debug)
- Document upload/parse (DOCX via mammoth)
- Markdown rendering for transcripts/treatment
- History API backed by PostgreSQL (`session_history`)
- n8n webhooks: recall-start/status/leave/transcript/realtime, treat-v7, ingest, sdlc-execute
- Integrations: Recall.ai meeting bots, Anthropic Claude, TMS APIs
- Production plan: Ubuntu + PM2 + Nginx + Certbot (no Docker)

### Tech stack (keep these)
- **Frontend/App:** Next.js 14, React 18, TypeScript, Tailwind, Zustand  
- **Automation:** n8n  
- **AI:** Anthropic Claude  
- **Meetings:** Recall.ai  
- **DB:** PostgreSQL (`pg`), MySQL client present for some integrations  
- **Docs:** mammoth, react-markdown  

### Measurable outcomes (CV)
- GPT-4o-mini / multi-stage pipeline narrative on CV; this ZIP’s treatment path uses **Claude** in the hosting docs — phrase carefully: “multi-stage LLM pipeline (Claude / GPT family depending on workflow version)”  
- **60%+ faster project kick-off** (CV)

### Portfolio fields
- **Categories:** Automation / n8n, GenAI, Productivity  
- **Featured:** Yes  
- **Technologies:** Next.js, TypeScript, n8n, Recall.ai, Anthropic Claude, PostgreSQL, TMS APIs  

---

## 5. Meeting Recorder / Browser Join Bot

**Slug:** `meeting-recorder-bot`  
**Type:** Professional (Royal Soft) · **Status:** In progress / hardening  
**Source ZIP:** `Meeting_Recoder_tool.zip` (very large — includes media/deps)

### Short description
Django Channels + Celery system that launches Playwright-driven bots to join Google Meet / Teams / Zoom, capture audio, transcribe with Faster-Whisper, and expose real-time bot lifecycle over WebSockets.

### Problem
Manual attendance/recording of client meetings does not scale; need automated join, record, and transcribe for SDLC tooling.

### Solution
Bot dispatch/lifecycle services, platform drivers (Teams/Zoom/Meet), Celery queues for launch/control/transcribe, Channels for live status, optional S3 storage.

### Key features (from requirements + fix guides)
- Playwright browser automation for meeting platforms  
- Faster-Whisper transcription + FFmpeg audio pipeline  
- Celery + Redis task queues (`bot_launch`, `bot_control`, `transcribe`, `webhooks`)  
- Django Channels WebSockets for live bot state  
- Management commands: launch bot, Google login helper, retranscribe, retry  
- Documented production issues/fixes (eager Celery, auth, recovery) — honest “engineering depth” story  

### Tech stack (keep these)
- **Backend:** Django 5.1, DRF, Channels, Celery, Redis  
- **Automation:** Playwright  
- **Speech:** faster-whisper, ffmpeg-python, soundcard / PyAudioWPatch (Windows)  
- **Storage:** django-storages, boto3 (S3)  
- **DB:** PostgreSQL (psycopg2)  
- **UI styling:** django-tailwind-cli  

### Portfolio note
Pair with #4 as backend/bot engine vs control UI, or keep one public case study and mention the other as related system.

### Portfolio fields
- **Categories:** Automation, Speech / ASR, Backend Engineering  
- **Featured:** Optional  
- **Technologies:** Django, Celery, Redis, Playwright, Faster-Whisper, Channels, PostgreSQL  

---

## 6. AI-Powered E-Commerce Recommendation Engine (FYP)

**Slug:** `ecommerce-recommendation-engine`  
**Type:** Academic (Final Year Project) · **Status:** Completed  
**Source ZIP:** `PersonaCarAi.zip`  
**Repo title:** AI Shop — AI-Powered Personalized Product Platform  

### Short description
Full-stack Django e-commerce store with hybrid ML recommendations: collaborative filtering (user–user cosine) + content-based TF-IDF, merged ~60/40, driven by weighted user interactions (view/search/like/cart/purchase).

### Problem
Generic product catalogs do not personalize; FYP goal was a working store plus measurable recommendation quality.

### Solution
`RecommendationEngine` builds interaction matrices, content similarity, hybrid merge, persists `Recommendation` rows, and surfaces products in the storefront. Auth, cart/order models, admin, Cloudinary-ready media for production.

### Key features (from code)
- Models: Category, Product, UserInteraction, Recommendation, Order, Feedback, UserProfile  
- Interaction weights: view/search=1, like=2, cart=3, purchase=5  
- Hybrid recommendations + `generate_recommendations` management command  
- Bootstrap 5 + crispy forms storefront; WhiteNoise static; Pillow/Cloudinary media  

### Tech stack (keep these)
- **Backend:** Django 4.2, Python  
- **ML:** Scikit-learn, Pandas, NumPy, SciPy, joblib  
- **Frontend:** HTML5, CSS3, Bootstrap 5, JavaScript  
- **Media:** Pillow, Cloudinary (optional production)  
- **DB:** SQLite (upgradeable PostgreSQL)

### Measurable outcomes (CV)
- 85%+ precision on validation  
- Django + MySQL on PythonAnywhere (CV hosting note)  

### Authorship
Built **solo** by **Abdul Sattar** as Final Year Project (Islamia University of Bahawalpur). Any other name in an old README template is outdated and should not appear on the portfolio.

### Portfolio fields
- **Categories:** Machine Learning, E-Commerce  
- **Featured:** Yes  
- **Technologies:** Python, Django, Scikit-learn, Pandas, NumPy, Bootstrap, MySQL/SQLite  

---

## 7. MediCare — Clinical ML Predictions (Diabetes + Depression)

**Slug:** `medicare-ml-predictions`  
**Type:** Personal / Professional practice · **Status:** Completed  
**Source ZIP:** `Medicare.zip`

### Short description
Django web app wrapping production-style ML pipelines for diabetes risk prediction and depression risk assessment, with medical-style validation, explainability, and structured prediction outputs.

### Problem
Need deployable, validated ML endpoints for health-risk screening demos — not notebook-only models.

### Solution
Trained sklearn pipelines (diabetes RandomForest path documented; depression model with engineered features) + Django app (allauth Google OAuth available) to serve predictions in a product shell.

### Key features (from docs)
**Diabetes engine**
- Feature engineering, SMOTE, GridSearchCV, artifact persistence (`model.pkl`, scaler, metrics)
- Strict input validation, 5-level risk classification, feature importance, JSON API (`/predict`, `/health`, `/model-info`)

**Depression model (documented metrics)**
- Accuracy 85.33%, Precision 89.28%, Recall 85.16%, F1 87.17%, AUC-ROC 0.9248  
- 27 features (13 base + 14 engineered)

### Tech stack (keep these)
- **App:** Django, Pillow, django-allauth  
- **ML:** NumPy, joblib, Scikit-learn, imbalanced-learn (diabetes pipeline docs)  
- **Optional:** Flask API module inside ml_models for standalone serving  

### Portfolio note
CV lists “Diabetes Prediction ML Model” — use that as public title; depression module can be a secondary bullet on the same case study.

### Portfolio fields
- **Categories:** Machine Learning, Healthcare  
- **Featured:** Optional  
- **Technologies:** Python, Django, Scikit-learn, NumPy, joblib  

---

## 8. AI Resume & Job Match Agent (RAG)

**Slug:** `ai-resume-job-match-agent`  
**Type:** Personal · **Status:** Completed  
**Source ZIP:** `AI_CV_Analyser.zip`

### Short description
Django + DRF app that parses PDF/DOCX resumes, embeds sections in ChromaDB (HuggingFace MiniLM), scores JD match without paid APIs, and runs LangChain gap analysis via Groq Llama — with PDF report download.

### Key features
- Section-aware resume parsing (Education, Skills, Experience, …)
- Local embeddings + ChromaDB retrieval  
- Keyword match score 0–100 (no API key)  
- Groq-powered gap analysis + improvement suggestions  
- ReportLab PDF export  
- Vanilla HTML/CSS/JS UI  

### Tech stack (keep these)
- Django 4.2, DRF  
- LangChain, LangChain-Groq, LangChain-HuggingFace  
- sentence-transformers (`all-MiniLM-L6-v2`), ChromaDB  
- PyPDF2, python-docx, ReportLab  

### Portfolio fields
- **Categories:** GenAI / RAG, Career Tools  
- **Featured:** Optional (or prefer #9 if only one resume project)  
- **Technologies:** Python, Django, LangChain, ChromaDB, Groq, HuggingFace  

---

## 9. Smart AI Resume Analyzer Platform (ATS + Jobs + Builder)

**Slug:** `smart-ai-resume-analyzer`  
**Type:** Personal · **Status:** Completed  
**Source ZIPs:** `CV_ANALYSER.zip` **and** `Reumer_builder.zip` (**identical — import once**)

### Short description
Full-stack resume platform: ATS scoring, Groq AI feedback, live job fetch/match (Adzuna/RemoteOK), ATS-friendly PDF/DOCX builder, JWT auth, and analytics dashboard — Django REST + React/Vite.

### Key features
- Resume upload/parse (pdfplumber, python-docx; spaCy NLP mentioned in README)
- ATS scoring (TF-IDF keyword match, skill gaps, formatting)
- Groq Llama feedback + section rewrite  
- Job search/match with TF-IDF similarity  
- Resume builder templates → ReportLab PDF / python-docx  
- Dashboard: score history, skill gaps, activity  
- JWT auth (simplejwt), Celery (eager mode default), Django admin  

### Tech stack (keep these)
- **Backend:** Python 3.11+, Django 4.2, DRF, simplejwt, Celery, scikit-learn, Groq SDK, ReportLab  
- **Frontend:** React 18, Vite, Tailwind, Recharts, Zustand, React Hook Form, Axios  
- **DB:** SQLite default  

### Portfolio fields
- **Categories:** GenAI, Full-Stack, Career Tools  
- **Featured:** Yes (best resume product of the three)  
- **Technologies:** Python, Django, DRF, React, Vite, Tailwind, Scikit-learn, Groq, Celery  

---

## 10. Superstore Management System (Retail ERP / POS)

**Slug:** `superstore-management-system`  
**Type:** Personal · **Status:** Completed  
**Source ZIP:** `Super_market.zip`

### Short description
Retail management system with POS, inventory, purchasing (GRN), accounting journals, CRM, HR, reports, role-based auth, and mock hardware (print/cash drawer) — Django REST + React/Vite, Docker Compose optional.

### Key features (from README verification flow)
- Role logins: Super Admin, Manager, Cashier, Accountant, HR, Warehouse  
- Dashboard KPIs  
- Inventory + stock movements  
- POS shifts, cash sales, stock decrement, sale journal entries  
- Purchase GRN → stock increase  
- Reports: sales, stock, accounting  
- Mock print / cash drawer actions  
- Seed demo command; Celery + Redis + PostgreSQL in Docker path; SQLite flag for local  

### Tech stack (keep these)
- **Backend:** Django 4.2, DRF, SimpleJWT, django-filter, Celery, Redis, PostgreSQL, Gunicorn  
- **Frontend:** React 18, Vite, Tailwind, Radix UI, Recharts, Zustand, Axios  
- **Infra:** Docker Compose (Postgres, Redis, backend, Celery, frontend)  

### Portfolio note
Closest match to CV “Employee Management System” style CRUD/HR module — either rename portfolio title to Superstore / Retail ERP, or keep EMS as a smaller subset story if you still have a separate EMS. Prefer the **real Superstore** name from this ZIP.

### Portfolio fields
- **Categories:** Full-Stack, ERP / Retail  
- **Featured:** Optional  
- **Technologies:** Python, Django, DRF, React, Vite, PostgreSQL, Redis, Celery, JWT  

---

## 11. CampusGuide AI — College Assistant Chatbot

**Slug:** `campusguide-ai`  
**Type:** Personal / Client-style · **Status:** Completed  
**Source ZIP:** `AI_ASSENTANCE.zip`  
**Target context:** Government Degree College Ekkaghund

### Short description
Django campus assistant that prefers normalized DB lookups (faculty, programs, admissions, syllabus, facilities), then hybrid retrieval over knowledge chunks, and only calls an LLM when structured data is insufficient.

### Key features
- Excel workbook import with data-quality reports and backups  
- Structured models: academics, admissions, campus, chatbot provenance  
- Hybrid retrieval: FAISS / TF-IDF fallback; Gemini embeddings optional; Groq LLM optional  
- Golden-question evaluation command  
- Admin import/index workflow; Folium maps dependency present  
- Fail-closed embedding behavior; per-browser conversation ownership  

### Tech stack (keep these)
- Django, Pandas, openpyxl, NumPy  
- FAISS-cpu, Scikit-learn  
- google-generativeai, groq  
- Folium, WhiteNoise, Gunicorn, dj-database-url  

### Portfolio fields
- **Categories:** GenAI / RAG, Education  
- **Featured:** Optional  
- **Technologies:** Python, Django, RAG, FAISS, Scikit-learn, Groq, Gemini  

---

## 12. AI Notes App

**Slug:** `ai-notes-app`  
**Type:** Personal · **Status:** Completed  
**Source ZIP:** `ai-notes-app.zip`

### Short description
Browser notes app (React + Vite) with local persistence and AI actions: summarize, improve grammar, explain simply, expand, and translate — via Groq or Google Gemini (two service variants in the archive).

### Key features
- Notes CRUD UI (sidebar, editor, cards, modals)  
- Local storage utilities  
- AI panel + result modal  
- Env-based API keys (`VITE_GROQ_API_KEY` / `VITE_GEMINI_API_KEY`)  

### Tech stack (keep these)
- React 19, Vite 8, react-hot-toast, uuid  
- Groq Chat Completions API and/or Gemini `gemini-2.0-flash`  

### Portfolio fields
- **Categories:** Frontend, GenAI utilities  
- **Featured:** No (supporting piece)  
- **Technologies:** React, Vite, Groq, Gemini, LocalStorage  

---

## 13. GitHub Profile Finder

**Slug:** `github-profile-finder`  
**Type:** Personal · **Status:** Completed  
**Source ZIP:** `github-finder.zip`  
**Author:** Abdul Sattar

### Short description
React/Vite app by Abdul Sattar to search GitHub users, list repos, and chart language stats using the GitHub REST API, with recent-search history in LocalStorage.

### Key features
- Username or profile URL search  
- User card, repo list, language stats chart  
- Optional `VITE_GITHUB_TOKEN` for higher rate limits  
- Vercel-oriented deploy config present  

### Tech stack (keep these)
- React 18, Vite, GitHub API, CSS3, LocalStorage  

### Portfolio fields
- **Categories:** Frontend  
- **Featured:** No  
- **Technologies:** React, Vite, GitHub API  

---

## Suggested CMS import order (next chat)

1. `intelligent-erp-chatbot`  
2. `ai-php-code-generation`  
3. `sdlc-automation-bot`  
4. `ecommerce-recommendation-engine`  
5. `smart-ai-resume-analyzer`  
6. `codebase-aware-prompt-engine` (or merge into #2 narrative)  
7. `meeting-recorder-bot` (or merge into #3 narrative)  
8. `medicare-ml-predictions`  
9. `superstore-management-system`  
10. `campusguide-ai`  
11. `ai-resume-job-match-agent`  
12. `ai-notes-app`  
13. `github-profile-finder`

**Skip:** `Reumer_builder.zip` (duplicate of Smart AI Resume Analyzer).

---

## Shared tech signature (your brand — keep consistent)

When writing site blurbs, prefer this vocabulary from your real stack:

- Python · Django · Django REST Framework  
- LangChain · LangGraph (where used) · RAG · ChromaDB / FAISS  
- OpenAI · Groq · Anthropic · Gemini (project-specific)  
- n8n · multi-agent orchestration · prompt engineering  
- Scikit-learn · Pandas · NumPy · Plotly · XGBoost  
- MySQL · PostgreSQL · Redis · Celery  
- React · Vite · Next.js · Tailwind  
- Playwright · Faster-Whisper (meeting bots)

---

## What not to invent in the next chat

- Live demo URLs unless you provide working ones  
- Client company secrets, internal IPs, or DB passwords from ZIP env samples  
- Metrics beyond CV / in-repo evaluation docs  
- Claiming sole authorship of team/FYP or third-party README projects without correction  

---

*End of file — ready for portfolio database import in the next chat.*
