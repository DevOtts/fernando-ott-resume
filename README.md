# Fernando Ott — Interactive Resume

An interactive resume for Fernando Ott featuring an AI clone powered by LangChain + OpenRouter, voice intro via ElevenLabs, and a knowledge base stored in Supabase pgvector.

## Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/devotts/fernando-ott-resume
cd fernando-ott-resume

# 2. Copy environment variables
cp .env.example .env.local
# Fill in the values in .env.local

# 3. Install dependencies
pnpm install

# 4. Start the dev server
pnpm dev
```

Open http://localhost:3000.

## Key Commands

```bash
pnpm dev          # Start dev server on localhost:3000
pnpm build        # Production build
pnpm lint         # ESLint
pnpm typecheck    # TypeScript type check
pnpm ingest       # Re-embed knowledge/ files into Supabase pgvector
```

## Updating the Knowledge Base

The AI clone's knowledge comes from markdown files in the `knowledge/` directory:

- `knowledge/career.md` — professional history, projects, companies
- `knowledge/personality.md` — background, interests, what drives Fernando
- `knowledge/technical.md` — architecture patterns, stack opinions, technical depth
- `knowledge/faq.md` — common recruiter questions with natural answers

To update the AI's knowledge:

1. Edit the relevant file in `knowledge/`
2. Run `pnpm ingest` to re-embed into Supabase pgvector
3. The AI clone immediately reflects the new knowledge

## Architecture

```
+------------------------------------------------------------------+
|                        Next.js App Router                        |
+---------------------------+--------------------------------------+
|        Frontend           |            Backend API               |
|                           |                                      |
|  page.tsx (main page)     |  /api/chat                           |
|  +-- Navigation           |    +-- Session management            |
|  +-- HeroSection          |    +-- Guardrails (pre-check)        |
|  +-- MetricsStrip         |    +-- Supabase pgvector retrieval   |
|  +-- StrengthsSection     |    +-- LangChain LCEL chain          |
|  +-- ExperienceSection    |    +-- OpenRouter (Claude)           |
|  +-- PortfolioSection     |    +-- SSE streaming response        |
|  +-- SkillsSection        |                                      |
|  +-- EducationSection     |  /api/voice-intro                    |
|  +-- CTASection           |    +-- Session rate limiting         |
|  +-- Footer               |    +-- ElevenLabs TTS stream         |
|  +-- ChatPanel            |                                      |
|  |   +-- Name collection  |  /api/leads                          |
|  |   +-- Quick questions  |    +-- Supabase insert               |
|  |   +-- Streaming chat   |    +-- Slack webhook (optional)      |
|  +-- ExitIntentModal      |                                      |
+---------------------------+--------------------------------------+
                           |
              +------------+--------------+
              |                           |
         Supabase pgvector           OpenRouter
         knowledge_chunks            LLM gateway
         leads table                 (Claude Sonnet)
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `OPENROUTER_API_KEY` | Yes | LLM gateway API key |
| `ELEVENLABS_API_KEY` | For voice | ElevenLabs API key |
| `ELEVENLABS_VOICE_ID` | For voice | Fernando's cloned voice ID |
| `CALENDLY_URL` | For guardrails | Booking link shown on sensitive questions |
| `LANGSMITH_API_KEY` | For tracing | LangSmith project key |
| `NEXT_PUBLIC_SUPABASE_URL` | For RAG + leads | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | For RAG + leads | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | For ingestion | Supabase service role key |
| `NEXT_PUBLIC_POSTHOG_KEY` | For analytics | PostHog project key |
| `LEAD_NOTIFICATION_WEBHOOK` | Optional | Slack webhook for lead alerts |

## Supabase Setup

1. Create a Supabase project at https://supabase.com
2. Run the migration: `supabase/migrations/001_init.sql`
3. Add the keys to `.env.local`
4. Run `pnpm ingest` to populate the knowledge base

## Deployment

Deploy to Vercel:

```bash
vercel --prod
```

The `vercel.json` file configures the build command and environment variable mappings.

## Tech Stack

- **Frontend:** Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript strict
- **AI Orchestration:** LangChain LCEL
- **LLM Gateway:** OpenRouter (claude-sonnet-4-5)
- **Knowledge DB:** Supabase pgvector
- **Voice:** ElevenLabs
- **Deploy:** Vercel
