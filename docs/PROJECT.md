# Project Technical Reference

This document covers the architecture, setup, and internals of this application.
The README focuses on Fernando — this doc focuses on the code.

---

## What This Is

A full-stack AI-powered resume application built with Next.js 16, LangChain LCEL, Supabase pgvector, and ElevenLabs. Every design decision here is intentional and reflects how I build production AI systems.

**Live features:**
- 🎙 **Voice intro** — ElevenLabs TTS cloned voice greets each visitor by name, streamed server-side
- 🤖 **AI clone chat** — RAG-powered LangChain chain answers questions about my career as I would
- 🌀 **Orbital hero** — JS-driven trigonometric animation (radial-orbital-timeline pattern), two counter-rotating rings with depth illusion via sin/cos scaling
- 🎯 **Exit-intent capture** — Modal fires on `mouseleave` toward the top of viewport, captures leads into Supabase
- 📊 **Recruiter analytics** — PostHog tracks questions asked, voice skip rate, exit-intent conversions

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

### Key patterns

**BFF (Backend-for-Frontend)** — All secrets and AI calls live in API routes. Zero credentials reach the browser. `SUPABASE_SECRET_KEY`, `OPENROUTER_API_KEY`, and `ELEVENLABS_API_KEY` are never in `NEXT_PUBLIC_*` vars.

**RAG with graceful degradation** — If Supabase is down or unconfigured, the chat falls back to model knowledge. Nothing breaks.

**Session via httpOnly cookie** — No auth required. A UUID session ID is set as an httpOnly cookie on first visit. Used for rate limiting (voice: 1/session, chat: 20 messages/session) and for tracking conversation history.

**Guardrails as a system** — Not just prompt engineering. Pre-LLM keyword classifier blocks salary, compensation, and personal questions before they hit the model. Post-generation the response is checked for policy violations. Sensitive redirects use `BOOKING_URL`.

**Streaming** — Both `/api/chat` (SSE) and `/api/voice-intro` (audio/mpeg) stream their responses. The client renders tokens as they arrive.

---

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── chat/route.ts          # LangChain LCEL chain, SSE streaming, guardrails
│   │   ├── voice-intro/route.ts   # ElevenLabs TTS, 1/session rate limit
│   │   └── leads/route.ts         # Lead capture → Supabase + Slack webhook
│   ├── globals.css                # Design tokens as CSS custom properties
│   ├── layout.tsx                 # Fonts, PostHog provider, meta tags
│   └── page.tsx                   # Top-level page composition
├── components/
│   ├── HeroSection.tsx            # Orbital animation — setInterval + sin/cos positioning
│   ├── ChatPanel.tsx              # Chat UI state machine: name → voice → chat
│   ├── OrbitalVoiceIntro.tsx      # Web Audio API analyser → amplitude → scale animation
│   ├── ExitIntentModal.tsx        # mouseleave trigger, lead capture form
│   ├── YouTubeSection.tsx         # Lazy iframe embeds, thumbnail → play pattern
│   └── ...                        # One component per section, no barrel exports
├── knowledge/                     # Markdown → Supabase pgvector via pnpm ingest
│   ├── career.md                  # Professional history, roles, metrics
│   ├── technical.md               # Architecture opinions, stack preferences
│   ├── personality.md             # Background, interests
│   └── faq.md                     # Common recruiter questions + honest answers
├── prompts/
│   └── system.md                  # AI clone system prompt — public by design
├── scripts/
│   └── ingest.ts                  # Chunks + embeds knowledge/ into pgvector
├── supabase/
│   └── migrations/001_init.sql    # Schema: knowledge_chunks (pgvector) + leads
├── lib/
│   ├── analytics.ts               # PostHog event helpers
│   └── session-store.ts           # Cookie-based session ID
├── .claude/
│   ├── features.json              # 34 features tracked, all status: pass
│   └── progress.md                # Session-by-session build log
└── docs/
    ├── PRD.md                     # Full product requirements
    └── PROJECT.md                 # This file
```

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16 App Router | SSR, API routes, streaming — all in one |
| Styling | Tailwind CSS v4 | Utility-first, design tokens via CSS vars |
| Language | TypeScript strict | No `any`, catches bugs at compile time |
| AI orchestration | LangChain LCEL | Composable chains, RAG pipelines, tool use |
| LLM gateway | OpenRouter | Model flexibility without vendor lock-in |
| Knowledge store | Supabase pgvector | Postgres + vector search, no separate infra |
| Voice | ElevenLabs | Best cloned voice quality available |
| Analytics | PostHog | Self-hostable, event-driven, free tier |
| Deploy | Vercel | Zero-config Next.js, edge functions |

---

## Local Setup

```bash
# 1. Clone
git clone https://github.com/devotts/fernando-ott-resume
cd fernando-ott-resume

# 2. Install (pnpm only)
pnpm install

# 3. Configure
cp .env.example .env.local
# Fill in values — see Environment Variables below

# 4. Supabase (optional — degrades gracefully without it)
# Run supabase/migrations/001_init.sql in your project, then:
pnpm ingest

# 5. Run
pnpm dev
```

### Commands

```bash
pnpm dev          # Dev server → localhost:3000
pnpm build        # Production build
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
pnpm ingest       # Re-embed knowledge/ into pgvector
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
| `SUPABASE_PUBLISHABLE_KEY` | RAG + leads | Publishable key (server-side only) |
| `SUPABASE_SECRET_KEY` | RAG + leads | Secret key (server-side only, never `NEXT_PUBLIC_`) |
| `LANGSMITH_API_KEY` | Tracing | [smith.langchain.com](https://smith.langchain.com) |
| `NEXT_PUBLIC_POSTHOG_KEY` | Analytics | [posthog.com](https://posthog.com) |
| `LEAD_NOTIFICATION_WEBHOOK` | Optional | Slack webhook URL for new lead alerts |

---

## AI Knowledge Base

The chat clone pulls context from `knowledge/` via Supabase pgvector RAG:

| File | Contents |
|---|---|
| `career.md` | Roles, companies, outcomes, metrics |
| `technical.md` | Architecture patterns, stack opinions, production AI experience |
| `personality.md` | Background, interests, what drives Fernando |
| `faq.md` | Common recruiter questions with natural answers |

Update flow: edit a `.md` file → `pnpm ingest` → changes live in chat immediately.

The system prompt at [`prompts/system.md`](../prompts/system.md) is committed publicly — prompt engineering is part of the portfolio signal.

---

## Deployment

```bash
vercel --prod
```

`vercel.json` maps Vercel secret references to the expected env var names. Security headers (`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`) are set in `next.config.ts`.
