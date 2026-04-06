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
