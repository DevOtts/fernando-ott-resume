# Project Progress — fernando-ott-resume

## Status
- **Project:** Fernando Ott Interactive Resume
- **Started:** 2026-04-06
- **Features:** 0 / 34 completed
- **Last session:** none
- **Current blocker:** none

## Pending before full launch
- [ ] `ELEVENLABS_VOICE_ID` — add to `.env.local` from ElevenLabs dashboard
- [ ] `CALENDLY_URL` — add Google Calendar booking link to `.env.local`
- [ ] Supabase project created + keys added to `.env.local`
- [ ] LangSmith project + key added to `.env.local`
- [ ] PostHog key added to `.env.local`

## Session Log

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
