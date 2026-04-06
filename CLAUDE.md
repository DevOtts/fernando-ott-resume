# Fernando Ott Interactive Resume

## Quick Start
```bash
cp .env.example .env.local   # fill in values
./init.sh                    # install deps + start dev server
```

## Project Spec
- Full PRD: `docs/PRD.md`
- Feature tracking: `.claude/features.json`
- Progress log: `.claude/progress.md`

## Rules for agents
1. Read `.claude/features.json` — pick the **next FAILING feature** respecting `depends_on` chains
2. Read `docs/PRD.md` for the spec of that feature
3. Implement the feature
4. Verify it works — use Playwright MCP for any UI features (test at 375x667 mobile AND 1280x800 desktop)
5. Update `.claude/features.json` status to `"pass"` (only after verification passes)
6. Update `.claude/progress.md` with what was done
7. Commit with a descriptive message
8. Move to the next failing feature

**Never mark a feature as pass without verifying it.**

## Package manager
Always use `pnpm` — never npm or yarn.

## Stack
- **Frontend:** Next.js 14 App Router + Tailwind CSS + TypeScript strict
- **AI:** LangChain LCEL + OpenRouter + LangSmith
- **DB:** Supabase (pgvector for knowledge, standard table for leads)
- **Voice:** ElevenLabs (opening intro only, server-side)
- **Analytics:** PostHog
- **Deploy:** Vercel

## Key commands
```bash
pnpm dev          # Start dev server (localhost:3000)
pnpm build        # Production build
pnpm ingest       # Re-embed knowledge/ files into Supabase pgvector
pnpm lint         # ESLint
pnpm typecheck    # TypeScript check
```

## Design system
Matches `mockup/fernando_ott_resume_v2.html` exactly.
- Fonts: Instrument Serif (headings), Satoshi (body), IBM Plex Mono (code/tags)
- Colors: see CSS custom properties in tailwind.config.ts
- Border radius: 10px cards, 8px buttons
- Accent: #2563EB (blue), green: #16A34A, orange: #EA580C

## Env vars
All secrets in `.env.local` — see `.env.example` for full list.
Three critical vars (required before voice and chat work):
- `OPENROUTER_API_KEY` — LLM gateway
- `ELEVENLABS_API_KEY` + `ELEVENLABS_VOICE_ID` — voice intro
- `CALENDLY_URL` — booking link shown in guardrail redirects (can be placeholder initially)

## Architecture notes
- `/api/chat` — LangChain LCEL chain, server-side only, streams via Vercel AI SDK
- `/api/voice-intro` — ElevenLabs call, server-side only, streams audio/mpeg, rate limited 1/session
- `/api/leads` — Supabase insert + optional webhook notification
- `prompts/system.md` — public, committed to repo (this is intentional — it's a portfolio signal)
- `knowledge/` — markdown files ingested into Supabase pgvector via `pnpm ingest`
- Session tracking via cookie-based session ID (no auth required)

## Guardrail redirect URL
All sensitive question redirects use `process.env.CALENDLY_URL`. If empty, show: "Reach out to Fernando directly at ferott@gmail.com"

## Public codebase notes
This is a public repo. The code quality IS the resume. No shortcuts:
- TypeScript strict, no `any`
- Clean component structure
- Comments only where logic isn't obvious
- No console.logs in production code
