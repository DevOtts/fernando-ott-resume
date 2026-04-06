<p align="center">
  <img src="https://media.licdn.com/dms/image/v2/D4D03AQGLRfIttnbNkA/profile-displayphoto-scale_400_400/B4DZrLOHGnG8Ag-/0/1764346067628?e=1776902400&v=beta&t=SBczeajmRTKGsCVbCaaun0QQD1NfASdxhaz7k8tcB6M" width="120" style="border-radius:50%" alt="Fernando Ott" />
</p>

<h1 align="center">Fernando Ott — Interactive AI Resume</h1>

<p align="center">
  <strong>Head of AI · AI Architect · 16+ yrs engineering · 4+ yrs AI/ML in production</strong><br/>
  Curitiba, Brazil &nbsp;·&nbsp; Remote-first &nbsp;·&nbsp; Open to global roles
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/feott/"><img src="https://img.shields.io/badge/LinkedIn-feott-0A66C2?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>
  <a href="https://github.com/devotts"><img src="https://img.shields.io/badge/GitHub-devotts-181717?style=flat&logo=github&logoColor=white" alt="GitHub"/></a>
  <a href="https://www.youtube.com/@otimiza-ai"><img src="https://img.shields.io/badge/YouTube-Otimiza%20AI-FF0000?style=flat&logo=youtube&logoColor=white" alt="YouTube"/></a>
  <a href="https://www.8figureagency.co/fernando-ott"><img src="https://img.shields.io/badge/8FA-Profile-2563EB?style=flat&logoColor=white" alt="8FA Profile"/></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=flat&logo=nextdotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/LangChain-LCEL-1C3C3C?style=flat&logo=langchain&logoColor=white"/>
  <img src="https://img.shields.io/badge/Supabase-pgvector-3ECF8E?style=flat&logo=supabase&logoColor=white"/>
  <img src="https://img.shields.io/badge/ElevenLabs-Voice-000000?style=flat&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=flat&logo=vercel&logoColor=white"/>
</p>

---

> **This repo is the resume.** The code quality, architecture decisions, and AI integration patterns here reflect how I actually build things in production.

---

## What This Is

This is not a static HTML page. It is a full-stack AI-powered resume application that I designed and built to demonstrate how I think about software, AI systems, and user experience.

**Live features:**
- 🎙 **Voice intro** — ElevenLabs TTS with a cloned voice greets each recruiter by name
- 🤖 **AI clone chat** — A RAG-powered AI that answers questions about my career as I would
- 🎯 **Exit-intent capture** — Smart modal that converts visitors into leads before they leave
- 📊 **Recruiter analytics** — PostHog tracks which questions get asked, voice skip rates, and booking conversions
- 🌀 **Orbital hero** — JS-driven trigonometric orbital animation (radial-orbital-timeline pattern)

---

## Who I Am

I design and ship multi-agent AI systems. My focus is turning complex AI ideas into platforms that actually run in production and move real business metrics.

**Current:** Head of AI & AI Architect at [8 Figure Agency](https://www.8figureagency.co) — built **Brain**, a multi-tenant multi-agent AI OS connecting CRMs, ads platforms, Slack, meetings, and data warehouses. Brain cut 20–30 hours of manual work per client per week.

**Previous:** Tech Lead at KeHE Distributors (NASDAQ, $8B+ revenue) — rebuilt their B2B e-commerce search platform on AWS + OpenSearch. **14× search speed**, **2× sales conversion**, **onboarding cut from 15 min → 2 min**.

**Foundation:** Co-founded and served as CTO of [Polen](https://github.com/devotts) for 10 years — first social impact Open API in Latin America. $550K raised, 5,000+ companies, 25M+ users.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 16 App Router · Tailwind CSS v4 · TypeScript strict |
| **AI Orchestration** | LangChain LCEL · CrewAI · MCP Server |
| **LLM Gateway** | OpenRouter (model-agnostic routing) |
| **RAG / Knowledge** | Supabase pgvector · hybrid search |
| **Voice** | ElevenLabs (cloned voice, server-side streaming) |
| **Observability** | LangSmith · PostHog · Grafana · Datadog |
| **Infrastructure** | AWS · Docker · Vercel · Supabase |
| **Languages** | Python · TypeScript · C# / .NET |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                       Next.js App Router                        │
├────────────────────────────┬────────────────────────────────────┤
│         Frontend           │           Backend (BFF)            │
│                            │                                    │
│  page.tsx                  │  /api/chat                         │
│  ├── HeroSection           │   ├── Session management           │
│  │   └── Orbital animation │   ├── Guardrails (pre-LLM)        │
│  ├── ExperienceSection     │   ├── Supabase pgvector RAG        │
│  ├── PortfolioSection      │   ├── LangChain LCEL chain         │
│  ├── SkillsSection         │   ├── OpenRouter (Claude Sonnet)   │
│  ├── ChatPanel             │   └── SSE streaming                │
│  │   ├── Name collection   │                                    │
│  │   ├── Voice intro       │  /api/voice-intro                  │
│  │   └── Streaming chat    │   ├── 1 req/session rate limit     │
│  └── ExitIntentModal       │   └── ElevenLabs TTS stream        │
│                            │                                    │
│                            │  /api/leads                        │
│                            │   ├── Supabase insert              │
│                            │   └── Slack webhook (optional)     │
└────────────────────────────┴────────────────────────────────────┤
                             │
             ┌───────────────┴──────────────┐
             │                              │
        Supabase pgvector              OpenRouter
        knowledge_chunks               model routing
        leads table                    (Claude Sonnet)
```

**Key patterns:**
- **BFF (Backend-for-Frontend)** — All secrets and AI calls are server-side. Zero credentials exposed to the browser.
- **RAG with graceful degradation** — If Supabase is unavailable, the chat still works from model knowledge.
- **Rate limiting per session** — Voice intro is 1 request/session via httpOnly cookie. Chat is capped at 20 messages.
- **Guardrails as a system** — Pre-LLM keyword filters + post-generation classifiers + booking redirect for sensitive topics.

---

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── chat/route.ts          # LangChain LCEL chain, SSE streaming
│   │   ├── voice-intro/route.ts   # ElevenLabs TTS, rate-limited
│   │   └── leads/route.ts         # Lead capture → Supabase + Slack
│   ├── globals.css                # Design tokens (CSS custom properties)
│   ├── layout.tsx                 # Fonts, PostHog, meta
│   └── page.tsx                   # Main page composition
├── components/                    # One component per file, no barrel exports
│   ├── HeroSection.tsx            # Orbital animation (JS trigonometry)
│   ├── ChatPanel.tsx              # Full chat UI + voice intro flow
│   ├── OrbitalVoiceIntro.tsx      # Web Audio API amplitude animation
│   ├── ExitIntentModal.tsx        # Lead capture on exit intent
│   └── YouTubeSection.tsx         # Embedded video section
├── knowledge/                     # Markdown files → Supabase pgvector
│   ├── career.md                  # Professional history
│   ├── technical.md               # Architecture opinions and stack
│   ├── personality.md             # Who Fernando is
│   └── faq.md                     # Common recruiter questions
├── prompts/
│   └── system.md                  # AI clone system prompt (public, intentional)
├── scripts/
│   └── ingest.ts                  # Embeds knowledge/ into pgvector
├── supabase/
│   └── migrations/001_init.sql    # DB schema: knowledge_chunks + leads
├── .claude/
│   ├── features.json              # 34 tracked features, all passing
│   └── progress.md                # Session-by-session build log
└── docs/
    └── PRD.md                     # Full product requirements document
```

---

## Local Setup

```bash
# 1. Clone
git clone https://github.com/devotts/fernando-ott-resume
cd fernando-ott-resume

# 2. Install (pnpm only — no npm/yarn)
pnpm install

# 3. Configure environment
cp .env.example .env.local
# Fill in the values — see table below

# 4. Set up Supabase (optional — app degrades gracefully without it)
# Run supabase/migrations/001_init.sql in your Supabase project
# Then embed the knowledge base:
pnpm ingest

# 5. Start
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Key Commands

```bash
pnpm dev          # Dev server on localhost:3000
pnpm build        # Production build
pnpm lint         # ESLint
pnpm typecheck    # TypeScript strict check
pnpm ingest       # Re-embed knowledge/ files into Supabase pgvector
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `OPENROUTER_API_KEY` | **Yes** | LLM gateway — [openrouter.ai](https://openrouter.ai) |
| `ELEVENLABS_API_KEY` | Voice | [elevenlabs.io](https://elevenlabs.io) |
| `ELEVENLABS_VOICE_ID` | Voice | Cloned voice ID from ElevenLabs dashboard |
| `BOOKING_URL` | Guardrails | Scheduling link shown on sensitive questions |
| `SUPABASE_URL` | RAG + leads | Supabase project URL |
| `SUPABASE_PUBLISHABLE_KEY` | RAG + leads | Supabase publishable key |
| `SUPABASE_SECRET_KEY` | RAG + leads | Supabase secret key (server-side only) |
| `LANGSMITH_API_KEY` | Tracing | LLM observability — [smith.langchain.com](https://smith.langchain.com) |
| `NEXT_PUBLIC_POSTHOG_KEY` | Analytics | [posthog.com](https://posthog.com) |
| `LEAD_NOTIFICATION_WEBHOOK` | Optional | Slack webhook for new lead alerts |

All secrets are server-side only. The BFF pattern ensures nothing sensitive reaches the browser.

---

## AI Clone Knowledge Base

The AI chat clone pulls from four markdown files in `knowledge/`:

| File | Contents |
|---|---|
| `career.md` | Professional history: roles, companies, outcomes, metrics |
| `technical.md` | Architecture opinions, stack preferences, production AI patterns |
| `personality.md` | Background, interests, how Fernando thinks |
| `faq.md` | Common recruiter questions with natural, honest answers |

To update the AI's knowledge:
1. Edit the relevant file in `knowledge/`
2. Run `pnpm ingest` to re-embed into Supabase pgvector
3. Changes are reflected immediately in chat

The system prompt is at [`prompts/system.md`](prompts/system.md) — it's public by design. Prompt quality is part of the portfolio.

---

## Deployment

```bash
vercel --prod
```

Configure environment variables in your Vercel project settings. The `vercel.json` maps secret references to the expected variable names.

**Security headers** configured in `next.config.ts`: `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`.

---

## Why This Exists

Most resumes are PDFs. This one is a production application.

I built it to show — not tell — how I approach software: clean TypeScript, streaming AI responses, proper BFF security patterns, RAG with graceful degradation, session-based rate limiting, and an orbital animation powered by trigonometry rather than CSS hacks.

If you're hiring for an AI Architect, Head of AI, or VP of AI role and want someone who actually ships — [let's talk](https://www.linkedin.com/in/feott/).

---

<p align="center">
  Built with Next.js · LangChain · Supabase · ElevenLabs · Vercel<br/>
  <a href="https://www.linkedin.com/in/feott/">LinkedIn</a> &nbsp;·&nbsp;
  <a href="https://github.com/devotts">GitHub</a> &nbsp;·&nbsp;
  <a href="https://www.youtube.com/@otimiza-ai">YouTube</a>
</p>
