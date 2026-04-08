# Project Progress — fernando-ott-resume

## Status
- **Project:** Fernando Ott Interactive Resume
- **Started:** 2026-04-06
- **Features:** 35 / 35 completed
- **Last session:** Session 12 — 2026-04-06
- **Current blocker:** none

## Pending before full launch
- [ ] `ELEVENLABS_VOICE_ID` — add to `.env.local` from ElevenLabs dashboard
- [ ] `CALENDLY_URL` — add Google Calendar booking link to `.env.local`
- [ ] Supabase project created + keys added to `.env.local`
- [ ] LangSmith project + key added to `.env.local`
- [ ] PostHog key added to `.env.local`

## Session Log

### Session 29 — 2026-04-08 (knowledge/ moved out of public repo)
- Added `knowledge/` to `.gitignore` — content is private, never pushed to public repo
- Ran `git rm --cached` on 4 tracked files (career.md, faq.md, personality.md, technical.md)
- Interview_Questions_2026.md was never tracked — already safe
- Updated `docs/PROJECT.md` with full knowledge base setup section: gitignore rationale, ingestion instructions, from-scratch setup steps
- Data lives in Supabase pgvector only; `pnpm ingest` is the local-only sync step

### Session 32 — 2026-04-08 (chat tone + formatting — pending skill install)
- Chat working end-to-end but responses are too verbose and unformatted
- User wants to improve tone (less AI slop) and add markdown formatting to responses
- Pending: user installing 'Chat Response Generator' skill via npx skills add

### Session 31 — 2026-04-08 (Supabase CLI fix + LangChain OpenRouter fix)
- Fixed Supabase CLI not finding migrations: project lacked `supabase/config.toml`
- Ran `supabase init` to generate proper config, re-linked project
- Applied both migrations: 001_init.sql (knowledge_chunks + leads) + 002_chat_sessions.sql
- `pnpm ingest` now works: 85 chunks across 6 knowledge files ingested into pgvector
- Fixed LangChain credential error: `ChatOpenAI` + `OpenAIEmbeddings` were failing with "Missing credentials" because they check `OPENAI_API_KEY` env var at construction; fixed by passing key via `configuration.apiKey` (OpenAI ClientOptions) with a placeholder for `openAIApiKey`
- Chat fully operational, streaming RAG responses confirmed working

### Session 30 — 2026-04-08 (chat session persistence to Supabase)
- New migration: `supabase/migrations/002_chat_sessions.sql` — `chat_sessions` table + `append_chat_message` RPC
- New lib: `lib/chat-session-db.ts` — `upsertChatSession` + `appendChatMessage` helpers (graceful no-op when Supabase unconfigured)
- `/api/voice-intro`: upserts session with recruiter name as soon as user submits it
- `/api/chat`: upserts session on every request; saves user message immediately + assistant reply after stream completes
- Funnel now captures: who typed a name, full conversation per session, message count, timestamps
- Run `supabase db push` to apply migration before next ingest

### Session 28 — 2026-04-08 (knowledge DB architecture decision)
- Researched notebooklm-py as alternative knowledge DB — ruled out: browser-cookie auth incompatible with Vercel serverless, no streaming, unofficial API
- Decision: keep Supabase pgvector + knowledge/*.md architecture
- Plan agreed: move knowledge/*.md out of public repo via .gitignore + git rm --cached; data lives in Supabase only
- Implementation pending user confirmation (next session)

### Session 27 — 2026-04-08 (direct-to-chat URL param)
- Added `?chat` URL param: visiting `/?chat` bypasses name collection + voice intro
- `page.tsx`: reads `searchParams`, auto-opens panel, passes `skipVoice` prop
- `ChatPanel.tsx`: accepts `skipVoice?: boolean`; initializes state as `"chat"` + pre-loads greeting when true
- Useful for sharing a direct chat link without the intro flow

### Session 26 — 2026-04-07 (OG social banner)
- Replaced public/og-image.png with proper 1200×630 social sharing banner
- Fixed og:type from 'profile' → 'website'
- Updated og:image dimensions to 1200×630
- Changed twitter:card from 'summary' → 'summary_large_image' (renders full banner on X/Twitter)
- Updated OG + Twitter descriptions to match banner copy

### Session 25 — 2026-04-07 (SEO/GEO heading hierarchy + YouTube content)
- Fixed heading hierarchy: ExperienceSection job titles div → h3, PortfolioSection project titles div → h3
- Added visually-hidden h2 "Key Metrics" to MetricsStrip for crawler context; added .sr-only utility to globals.css
- YouTubeSection: trimmed all 6 descriptions to 1–2 sentences; translated 4 PT-BR titles to English (kept lang="pt" badge)
- favicon updated to circular branded profile photo (app/icon.png 192px, app/apple-icon.png 180px)

### Session 24 — 2026-04-07 (README CTA badge)
- Added prominent "🌐 fernandoott.com — Talk with My AI Clone" badge to README header above social links row

### Session 23 — 2026-04-07 (metric: $550K VC Raised → 25M+ Users Reached in Prod)
- Replaced "$550K VC Raised" with "25M+ Users Reached in Prod" — better signals engineering scale to hiring audience

### Session 22 — 2026-04-07 (press links on experience cards)
- Added "Press" pill strip to Polen (Rede Globo/RPC + Bossa Invest) and Bonuts (Projeto Draft)
- Press strips render with same linked pill + hover style as accelerator badges
- Discussed replacing $550K VC Raised metric — pending user decision (candidate: 25M+ Users Reached in Prod)

### Session 21 — 2026-04-07 (metrics strip overhaul)
- Replaced "20-30h Saved / Client / Week" with "98 People Led in Career"
- Replaced "14× Search Speed Boost" with "$550K VC Raised"
- Strip now shows: 16+ yrs engineering, 4+ yrs AI/ML, 98 people led, $550K VC raised, 2 new lives in the world

### Session 20 — 2026-04-07 (human touch on metrics strip)
- Replaced last KPI "2× Sales Conversion Lift" with "2 New Lives in the World" — Fernando's 2 kids, adds humanity to the metrics strip

### Session 19 — 2026-04-07 (accelerator links + Yunus & Youth)
- All 3 accelerator badges on Polen entry are now clickable links (Start You Up, DotForge, Start-Up Chile) with hover accent effect
- Added Yunus & Youth as 4th badge — links to Fernando's personal profile (yunusandyouth.com/project/fernando-ott/), uses downloaded logo (public/yunus-youth-logo.png) instead of emoji
- Added "Yunus & Youth Fellow" entry to Education section with dashed link + ↗ indicator; InfoBlock component updated to accept optional url prop

### Session 18 — 2026-04-07 (Vercel deployment config)
- Removed `env` block from `vercel.json` — the `@secret_reference` syntax requires Vercel CLI secrets, conflicting with dashboard-added env vars
- Env vars should be added manually in Vercel Dashboard using exact names from `.env.example`
- Key name mapping clarified: `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, `BOOKING_URL` (not old `CALENDLY_URL`/`NEXT_PUBLIC_` prefixed names in vercel.json)

### Session 17 — 2026-04-07 (experience section expansion)
- Added 3 early-career roles replacing bundled "Enterprise Retail" entry: Many To One Consulting (Jan–Aug 2012, Tech Lead), BuscaPé (Jun–Dec 2011, Middle Developer), FCamara Consulting (Jan 2010–Apr 2011, Middle Developer)
- Added Bonuts CTO role (Nov 2016–Jul 2017): photo reward mobile app, 10K users, Xamarin/AWS/MongoDB — shows founder versatility and mobile experience
- Added "Selected for" accelerator badge strip to Polen entry: 🇧🇷 Start You Up, 🇬🇧 DotForge, 🇨🇱 Start-Up Chile — rendered as pill badges with flag + name + location, separated by a top border divider inside the card

### Session 16 — 2026-04-07 (SEO/GEO audit + heading hierarchy + YouTube content polish)
- Audited full SEO/GEO state — identified heading hierarchy gaps and missing GEO optimizations
- Fixed heading hierarchy (ExperienceSection + PortfolioSection): job role titles and project titles changed from `<div>` to `<h3>` with `font-weight: normal` to preserve visual appearance
- MetricsStrip: added visually-hidden `<h2>Key Metrics</h2>` for crawler context; added `.sr-only` utility to globals.css
- Favicon updated from GitHub plain avatar to branded circular profile sticker image (630×636 PNG with tech logos); generated `app/icon.png` (192px) and `app/apple-icon.png` (180px)
- YouTube section: shortened all 6 video descriptions to 1-2 sentences for UI fit; translated 4 PT-BR titles and descriptions to English while keeping `lang: "pt"` badge so visitors know the video is in Portuguese
- Build verified clean throughout; all changes committed with descriptive messages

### Session 15 — 2026-04-06 (YouTube titles translated to English)
- All 6 video card titles now in English; PT-BR/EN badge retained to indicate video language
- Translated: "3 Ferramentas..." → "3 AI Tools to Edit Videos Fast", "Como Rodar DeepSeek R1 Grátis" → "How to Run DeepSeek R1 for Free", "Crie um SDR com IA" → "Build an AI SDR That Qualifies & Books Calls", "Otimiza AI — Episode 2" → "AI Automation Strategies for Business"

### Session 14 — 2026-04-06 (YouTube title corrections)
- Updated 4 video titles to match real YouTube page titles (read from screenshot)
- 3oXyXOxIM2g → "Vibe Coding Levels 1–5" (EN)
- fDRRQTpcLhc → "3 Ferramentas de IA para Editar Vídeos" (PT)
- Y8hKX9iY40s → "Como Rodar DeepSeek R1 Grátis" (PT)
- Ujd-FXNT6Ms → "Crie um SDR com IA" (PT)
- x5D24tXGcVQ and vxrO7Vs4EPA pending user confirmation of real titles

### Session 13 — 2026-04-06 (gaps + orbital tag updates)
- Gaps section: replaced "AWS Certifications" with "Business Intelligence" — honest framing that ClickHouse/BigQuery exposure exists but BI tooling is not a focus area
- Orbital tags: removed MCP, added Neo4j (simpleicons logo) and Vector DB (Pinecone logo)
- Total orbital tags on inner ring: 9

### Session 12 — 2026-04-06 (SEO + GEO enhancement — F035)
- Replaced favicon.ico with Fernando's GitHub avatar (https://avatars.githubusercontent.com/u/851664)
  - `app/icon.png` — 192×192 (browser tab icon, Next.js convention)
  - `app/apple-icon.png` — 180×180 (Apple touch icon)
  - `public/og-image.png` — 512×512 (OG/Twitter card image)
- Enhanced `app/layout.tsx` metadata:
  - `metadataBase` set to https://fernandoott.com
  - Full `openGraph` profile with image
  - Full `twitter` card config (summary with image)
  - `keywords` array targeting AI/ML search terms
  - `robots` config for max Googlebot indexing
  - `alternates.canonical` set
- Added two JSON-LD schemas injected in `<head>` for GEO (AI search engine citation):
  - `Person` schema: name, jobTitle, knowsAbout (7 AI topics), sameAs (GitHub + LinkedIn), address
  - `WebSite` schema: describes the interactive AI resume
- Updated `app/robots.txt/route.ts` with explicit AI bot allowlist:
  - GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, anthropic-ai, Google-Extended, Bingbot
- Created `app/sitemap.ts` — auto-generates `/sitemap.xml` via Next.js MetadataRoute
- Build verified clean: all routes pass, `/sitemap.xml`, `/icon.png`, `/apple-icon.png` present

### Session 11 — 2026-04-06 (YouTube section reorder + new videos)
- Moved YouTubeSection before PortfolioSection in page.tsx (now: Experience → YouTube → Portfolio → Skills → Education)
- Added lang field to YouTubeVideo interface ("en" | "pt")
- Added EN/PT-BR badge to each video card (blue for EN, neutral for PT-BR)
- Expanded VIDEOS array to 6 entries, sorted newest-first:
  - 3oXyXOxIM2g (EN) — most recent
  - fDRRQTpcLhc (PT), Y8hKX9iY40s (PT), Ujd-FXNT6Ms (PT)
  - x5D24tXGcVQ (EN), vxrO7Vs4EPA (PT) — original two, now at bottom

### Session 10 — 2026-04-06 (pre-publish cleanup + README)
- Rewrote README.md: recruiter-focused, SEO-optimized, profile photo, badges, architecture diagram, full stack table, project structure, why-this-exists section
- Removed unused default Next.js public SVGs (file.svg, globe.svg, next.svg, vercel.svg, window.svg)
- Fixed leads/route.ts console.error: removed PII (email/name) from error log message

### Session 9 — 2026-04-06 (re-enable outer ring on mobile for review)
- Removed !isMobile gates from outer orbit ring and info cards
- Both rings now visible on all viewports for user review
- Canvas remains 340×340 on mobile, 500×500 on desktop

### Session 8 — 2026-04-06 (mobile responsive orbital)
- On ≤860px viewports outer ring (info cards) is hidden, canvas shrinks to 340×340
- Inner tech-tag ring stays visible on mobile, fits cleanly without overflow
- Uses matchMedia listener so layout responds to live viewport resizes
- Desktop unchanged — both rings visible on 500×500 canvas

### Session 7 — 2026-04-06 (counter-clockwise outer ring)
- Outer ring (info cards) now rotates counter-clockwise: `(a - SPEED2 + 360) % 360`
- Inner ring (tech tags) continues clockwise — opposing directions add visual interest

### Session 6 — 2026-04-06 (info cards join orbital)
- Added INFO_CARDS array with 3 entries (Brain AI, 4+ yrs AI in Production, Curitiba Brazil)
- Cards orbit on outer ring (RADIUS2 = 210px) driven by same setInterval, speed 0.18°/tick
- Tech tags remain on inner ring (RADIUS = 148px) at 0.25°/tick — rings drift independently
- Same depth illusion applied to cards (opacity + scale + shadow scale with sin(angle))
- Removed static absolutely-positioned floating card divs and photo-card CSS rule

### Session 5 — 2026-04-06 (radial orbital timeline effect)
- Replaced CSS keyframe orbit with JS-driven trigonometric positioning (setInterval 50ms tick)
- Matches radial-orbital-timeline pattern: angle increments each tick, x/y from cos/sin
- Depth illusion: opacity 0.45–1.0 and scale 0.85–1.05 based on sin(angle) — items "behind" fade, items "in front" pop
- Dynamic box-shadow grows with depth for extra 3D feel
- Tags styled as pill badges (border-radius: 20px) with logos
- Added subtle pulse ring animations on center profile photo

### Session 4 — 2026-04-06 (orbit animation fix)
- Fixed hero orbital: replaced two-animation approach (arm rotate + counter-rotate) with single `hero-orbit` keyframe using chained transforms: `rotate(0deg) translateX(130px) rotate(0deg)` → `rotate(360deg) translateX(130px) rotate(-360deg)`
- Tags now correctly travel in a circle with upright text from frame 0
- Used negative `animationDelay` per tag to pre-offset each evenly around the ring without a static transform override
- Restored 3 floating cards (Brain AI, 4+ yrs AI in Production, Curitiba Brazil) outside the orbital scene div

### Session 3 — 2026-04-06 (UI enhancements)
- Hero: replaced static floating cards with orbital animation around circular profile photo (8 tech tags: Anthropic, LangChain, AWS, Next.js, OpenSearch, Docker, MCP, Python — with logos)
- Hero: updated YouTube link to @otimiza-ai, removed email from social links
- Footer: removed email link (ferott@gmail.com)
- CTASection: removed "Email Me" button
- ExitIntentModal + ChatPanel: replaced email fallback text with LinkedIn redirect
- ChatPanel: replaced "How does Brain work?" quick questions with career-focused ones
- Created YouTubeSection component with clickable thumbnail embeds and VIDEOS array for easy expansion
- Added two videos: x5D24tXGcVQ and vxrO7Vs4EPA
- YouTubeSection inserted between Education and CTA in page.tsx

### Session 1 — 2026-04-06
- Set up project scaffolding: features.json, progress.md, init.sh, CLAUDE.md, evals, hooks
- Created docs/PRD.md
- Created .env.local and .env.example
- Ready for agent team build
