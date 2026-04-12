"use client";

// ─────────────────────────────────────────────────────────────────────────────
// /resume — print-optimised page, same design system as the main site.
// Open at localhost:3000/resume then File → Print → Save as PDF (A4, no margins)
// Or let the generate-pdf script do it via Playwright.
// ─────────────────────────────────────────────────────────────────────────────

/* ── shared data (mirrors the actual component arrays) ── */

const experiences = [
  {
    dates: "Jul 2025 — Present",
    company: "8 Figure Agency",
    location: "Santa Monica, CA · Remote",
    role: "Head of AI & AI Architect",
    desc: "Lead design and execution of Brain — a multi-tenant AI platform connecting client tools (CRMs, ads, Slack, data warehouses). Define LLM strategy, evaluation frameworks, and production observability (Grafana, Datadog, LangSmith). Manage a team of AI engineers. Key result: 20–30 hrs/week saved per client through multi-agent automation.",
    tags: ["Python", "LangChain", "CrewAI", "MCP Server", "Vector DBs", "AWS", "Grafana", "LangSmith"],
  },
  {
    dates: "Jan 2024 — Jan 2026",
    company: "Otimiza AI",
    location: "Curitiba, BR · Remote",
    role: "Lead AI Specialist & Founder",
    desc: "Founded AI consulting practice delivering process automation and AI adoption roadmaps. Designed and implemented AI & automation strategies for clients across multiple industries.",
    tags: ["Python", "LangChain", "N8N", "Make.com", "Vector DBs"],
  },
  {
    dates: "Jul 2022 — Jun 2025",
    company: "KeHE Distributors (NASDAQ: KEHE)",
    location: "Naperville, IL · Remote",
    role: "Tech Lead & Architect",
    desc: "Led e-commerce search transformation for an $8B+ food distributor. Selected OpenSearch on AWS; delivered 14× search speed and 2× sales conversion lift. Reduced B2B onboarding 15 min → 2 min. Managed multiple teams across retailer and back-office ops.",
    tags: ["AWS", "OpenSearch", ".NET 8", "Angular", "DynamoDB", "PostgreSQL", "Datadog"],
  },
  {
    dates: "Nov 2013 — Aug 2024",
    company: "Polen — Corporate Donations Platform",
    location: "Curitiba, BR & International",
    role: "CTO & Co-Founder",
    desc: "Built Latin America's first social impact Open API. Raised $550K VC, scaled to 5,000+ companies and 25M+ users, $1.5M+ donated. Managed ~20 people with OKR & Scrum. Migrated monolith to microservices. Selected for Start-Up Chile, DotForge (UK), and Yunus & Youth.",
    tags: ["C# / .NET", "Angular", "MongoDB", "Docker", "Kubernetes", "Google Cloud"],
  },
  {
    dates: "Nov 2016 — Jul 2017",
    company: "Bonuts",
    location: "Curitiba, BR",
    role: "CTO & Co-Founder",
    desc: "Photo mobile app (iOS + Android) rewarding users for branded-frame posts. Brands paid per approved post. 10K users.",
    tags: ["Xamarin", "ASP.NET / C#", "MongoDB", "AWS"],
  },
  {
    dates: "2008 — 2012",
    company: "FCamara · Many To One · BuscaPé · MPS Informática",
    location: "São Paulo & Curitiba, BR",
    role: "Middle Developer → Technical Lead",
    desc: "E-commerce CMS for B2W Group (Walmart.br, Submarino, Americanas), anti-fraud at BuscaPé, enterprise software for TJSP. Grew from Junior to Technical Lead.",
    tags: ["ASP.NET / C#", "SQL Server", "Cassandra", "jQuery", "Scrum"],
  },
];

const skillGroups = [
  {
    header: "AI / ML / LLM",
    items: ["LangChain", "LangSmith", "CrewAI", "MCP Server", "Anthropic Claude", "OpenAI", "Mistral", "LLaMA / Ollama", "Vector DBs", "RAG Pipelines", "Multi-Agent Architectures", "Agentic AI", "Prompt Engineering", "Context Engineering", "NLP", "Deep Learning", "N8N"],
  },
  {
    header: "Backend & Infrastructure",
    items: ["Python", ".NET / C#", "Node.js", "PostgreSQL", "MongoDB", "Supabase", "DynamoDB", "OpenSearch", "AWS (Lambda, SQS, S3)", "Docker", "Kubernetes", "CI/CD", "MLOps"],
  },
  {
    header: "Frontend & Observability",
    items: ["Next.js", "React", "TypeScript", "Angular", "Grafana", "Datadog", "LangSmith", "CloudWatch"],
  },
  {
    header: "Leadership & Process",
    items: ["AI Strategy & Roadmap", "AI Governance", "AI Transformation", "Stakeholder Management", "Team Management (20+)", "Cross-functional Leadership", "OKR", "Scrum / Kanban", "Technical Mentoring"],
  },
];

const strengths = [
  { icon: "🏗️", title: "AI Systems Architecture", desc: "Multi-tenant platforms with vector stores, LLM orchestration, ingestion pipelines, and production observability.", level: "expert" },
  { icon: "🌉", title: "Business ↔ Engineering Bridge", desc: "AI strategy, roadmap, transformation — the \"click\" most developers miss. Done as CTO, Tech Lead at a NASDAQ company, and Head of AI.", level: "expert" },
  { icon: "🔧", title: "LLM Orchestration & Agentic AI", desc: "LangChain, CrewAI, MCP, RAG, context engineering, guardrails — in production generative AI systems, daily.", level: "expert" },
  { icon: "🚀", title: "POC → Production Delivery", desc: "Brain: whiteboard to multi-tenant prod in months. KeHE: 14× faster search. Polen: idea to 25M users.", level: "strong" },
  { icon: "👥", title: "People Management", desc: "Nearly 20 people managed directly. Juniors, senior egos, distributed teams — from Curitiba to California.", level: "expert" },
  { icon: "📐", title: "Scalable Platform Thinking", desc: "Multi-tenant isolation, reusable agent patterns, metadata-driven config. New Brain client = config, not code.", level: "expert" },
];

const metrics = [
  { value: "16+", label: "Years Engineering" },
  { value: "4+", label: "Years AI in Production" },
  { value: "25M+", label: "Users Reached in Prod" },
  { value: "14×", label: "Search Speed (KeHE)" },
  { value: "$550K", label: "VC Raised (Polen)" },
];

const shipped = [
  {
    name: "Brain — Multi-Tenant AI Platform",
    company: "8 Figure Agency",
    result: "20–30 hrs/week saved per client",
    tags: ["Multi-Agent", "LangChain", "MCP", "Vector DB", "Python", "AWS"],
    desc: "Whiteboard → multi-tenant production platform. Connects client CRMs, ad platforms, Slack, and data warehouses into a unified AI brain. New client = config, not code.",
  },
  {
    name: "E-Commerce Search Transformation",
    company: "KeHE Distributors (NASDAQ)",
    result: "14× faster · 2× sales conversion",
    tags: ["OpenSearch", "AWS", ".NET 8", "DynamoDB", "Datadog"],
    desc: "Selected and deployed OpenSearch on AWS for an $8B+ food distributor. Delivered 14× search speed improvement and doubled sales conversion. Reduced B2B onboarding from 15 min to 2 min.",
  },
  {
    name: "Polen — Social Impact Open API",
    company: "Polen (CTO & Co-Founder)",
    result: "25M+ users · $550K VC · $1.5M+ donated",
    tags: ["C#", "MongoDB", "Docker", "Kubernetes", "GCP", "Microservices"],
    desc: "Latin America's first social impact Open API. Scaled from idea to 5,000+ companies and 25M+ users. Migrated monolith to microservices, selected for Start-Up Chile and DotForge UK.",
  },
  {
    name: "AI Consulting Practice",
    company: "Otimiza AI (Founder)",
    result: "Multiple clients · process automation",
    tags: ["LangChain", "N8N", "Make.com", "Python", "RAG"],
    desc: "Founded and ran an AI consulting practice delivering automation and AI adoption roadmaps across multiple industries.",
  },
];

/* ── component ── */

export default function ResumePage() {
  return (
    <>
      <style>{`
        /* ── reset & base ── */
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --bg: #FAFAF8;
          --bg-alt: #F0F0EC;
          --accent: #2563EB;
          --accent-light: #DBEAFE;
          --green: #16A34A;
          --green-light: #DCFCE7;
          --text: #1A1A1A;
          --text-mid: #4A4A4A;
          --text-soft: #7A7A7A;
          --text-faint: #A0A0A0;
          --border-light: #EDEDEA;
          --bg-dark: #0C0C0E;
          --serif: 'Instrument Serif', Georgia, serif;
          --mono: 'IBM Plex Mono', 'Courier New', monospace;
          --sans: 'Satoshi', -apple-system, 'Helvetica Neue', Arial, sans-serif;
        }

        html { background: var(--bg); }

        body {
          font-family: var(--sans);
          background: var(--bg);
          color: var(--text);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }

        /* ── print page ── */
        .resume-root {
          width: 794px;       /* A4 @ 96dpi: 210mm */
          margin: 0 auto;
          background: #fff;
          padding: 24px 40px 24px 40px;
        }

        /* ── header ── */
        .rh {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1rem;
          align-items: end;
          padding-bottom: 12px;
          border-bottom: 2px solid var(--bg-dark);
          margin-bottom: 14px;
        }
        .rh-name {
          font-family: var(--serif);
          font-size: 38px;
          letter-spacing: -0.04em;
          line-height: 1.0;
          color: var(--bg-dark);
        }
        .rh-name em { font-style: italic; color: var(--accent); }
        .rh-title {
          font-size: 10.5px;
          color: var(--text-mid);
          margin-top: 4px;
          line-height: 1.6;
        }
        .rh-contact {
          text-align: right;
          font-family: var(--mono);
          font-size: 8.5px;
          color: var(--text-soft);
          line-height: 2;
        }
        .rh-contact a { color: var(--accent); text-decoration: none; }

        /* ── metrics bar ── */
        .metrics-bar {
          background: var(--bg-dark);
          border-radius: 10px;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          overflow: hidden;
          margin-bottom: 16px;
        }
        .mb-item {
          padding: 11px 8px;
          text-align: center;
          border-right: 1px solid rgba(255,255,255,0.06);
        }
        .mb-item:last-child { border-right: none; }
        .mb-val {
          font-family: var(--serif);
          font-size: 19px;
          color: #fff;
          letter-spacing: -0.02em;
          display: block;
        }
        .mb-lbl {
          font-size: 6px;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          display: block;
          margin-top: 2px;
        }

        /* ── body grid ── */
        .body-grid {
          display: grid;
          grid-template-columns: 148px 1fr;
          gap: 18px;
        }

        /* ── sidebar ── */
        .sidebar {}
        .sb-section { margin-bottom: 10px; }
        .sb-label {
          font-family: var(--mono);
          font-size: 6.5px;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 500;
          padding-bottom: 4px;
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 7px;
          display: block;
        }
        .sb-tags { display: flex; flex-wrap: wrap; gap: 2px; }
        .sb-tag {
          font-family: var(--mono);
          font-size: 6px;
          padding: 1px 5px;
          border-radius: 3px;
          background: var(--bg-alt);
          color: var(--text-soft);
          border: 1px solid var(--border-light);
        }
        .sb-text {
          font-size: 7.5px;
          color: var(--text-soft);
          line-height: 1.8;
        }

        /* ── section labels ── */
        .sec-tag {
          font-family: var(--mono);
          font-size: 6.5px;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 500;
          margin-bottom: 4px;
          display: block;
        }
        .sec-title {
          font-family: var(--serif);
          font-size: 20px;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: var(--bg-dark);
          margin-bottom: 12px;
        }
        .sec-title em { font-style: italic; color: var(--accent); }

        /* ── strengths grid ── */
        .str-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px;
          margin-bottom: 10px;
        }
        .str-card {
          border: 1px solid var(--border-light);
          border-radius: 6px;
          padding: 6px 9px;
          background: #fff;
        }
        .str-head {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 3px;
        }
        .str-name {
          font-family: var(--serif);
          font-size: 9.5px;
          color: var(--bg-dark);
        }
        .str-badge {
          font-family: var(--mono);
          font-size: 5.5px;
          padding: 1px 5px;
          border-radius: 3px;
          font-weight: 500;
        }
        .str-badge.expert { background: var(--green-light); color: var(--green); }
        .str-badge.strong { background: var(--accent-light); color: var(--accent); }
        .str-desc { font-size: 7.5px; color: var(--text-soft); line-height: 1.55; }

        /* ── experience ── */
        .exp-section { margin-bottom: 14px; }
        .exp-item {
          padding: 7px 0;
          border-bottom: 1px solid var(--border-light);
        }
        .exp-item:last-child { border-bottom: none; }
        .exp-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 6px;
        }
        .exp-role {
          font-family: var(--serif);
          font-size: 12.5px;
          color: var(--bg-dark);
          letter-spacing: -0.01em;
        }
        .exp-dates {
          font-family: var(--mono);
          font-size: 6.5px;
          color: var(--text-faint);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .exp-meta {
          display: flex;
          align-items: center;
          gap: 5px;
          margin: 1px 0 4px;
        }
        .exp-co { font-weight: 600; font-size: 8px; color: var(--text); }
        .exp-sep { color: var(--border-light); font-size: 7px; }
        .exp-loc { font-size: 7.5px; color: var(--text-soft); }
        .exp-desc { font-size: 7.8px; color: var(--text-mid); line-height: 1.6; margin-bottom: 4px; }
        .exp-tags { display: flex; flex-wrap: wrap; gap: 2px; }
        .exp-tag {
          font-family: var(--mono);
          font-size: 6px;
          padding: 1px 6px;
          border-radius: 3px;
          background: var(--bg-alt);
          color: var(--text-soft);
        }

        /* ── skills grid ── */
        .sk-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5px;
          margin-bottom: 14px;
        }
        .sk-card {
          border: 1px solid var(--border-light);
          border-radius: 7px;
          padding: 7px 10px;
        }
        .sk-header {
          font-family: var(--mono);
          font-size: 6.5px;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 500;
          padding-bottom: 5px;
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 6px;
        }
        .sk-tags { display: flex; flex-wrap: wrap; gap: 2px; }
        .sk-tag {
          font-size: 7px;
          padding: 2px 7px;
          border-radius: 4px;
          background: var(--bg-alt);
          color: var(--text-mid);
        }

        /* ── hero strip ── */
        .hero-strip {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 0 14px;
          margin-bottom: 14px;
          border-bottom: 1px solid var(--border-light);
        }
        .hero-photo-wrap {
          position: relative;
          flex-shrink: 0;
        }
        .hero-photo-wrap img {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #fff;
          box-shadow: 0 4px 16px rgba(0,0,0,0.10);
          display: block;
        }
        .hero-pulse {
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          border: 1.5px solid rgba(37,99,235,0.22);
        }
        .hero-text { flex: 1; }
        .hero-tagline {
          font-size: 8px;
          color: var(--text-soft);
          line-height: 1.75;
          max-width: 500px;
        }
        .hero-available {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: var(--green-light);
          color: var(--green);
          font-size: 6.5px;
          font-weight: 600;
          padding: 2px 9px;
          border-radius: 20px;
          margin-bottom: 6px;
          font-family: var(--mono);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .hero-dot {
          width: 5px;
          height: 5px;
          background: var(--green);
          border-radius: 50%;
          flex-shrink: 0;
        }
        .hero-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 3px;
          margin-top: 6px;
        }
        .hero-tag {
          font-family: var(--mono);
          font-size: 6px;
          padding: 1px 7px;
          border-radius: 3px;
          background: var(--accent-light);
          color: var(--accent);
          border: 1px solid rgba(37,99,235,0.15);
          font-weight: 600;
        }

        /* ── contacts sidebar ── */
        .sb-contacts { margin-bottom: 10px; }
        .sb-contact-item {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 4px;
          text-decoration: none;
        }
        .sb-contact-icon {
          width: 14px;
          height: 14px;
          border-radius: 3px;
          background: var(--bg-alt);
          border: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }
        .sb-contact-icon img {
          width: 9px;
          height: 9px;
          object-fit: contain;
        }
        .sb-contact-text {
          font-family: var(--mono);
          font-size: 6.5px;
          color: var(--accent);
          line-height: 1.4;
          word-break: break-all;
        }

        /* ── shipped section ── */
        .shipped-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5px;
          margin-bottom: 14px;
        }
        .shipped-card {
          border: 1px solid var(--border-light);
          border-radius: 7px;
          padding: 7px 9px;
          background: #fff;
        }
        .shipped-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 4px;
          margin-bottom: 2px;
        }
        .shipped-name {
          font-family: var(--serif);
          font-size: 9px;
          color: var(--bg-dark);
          line-height: 1.3;
          flex: 1;
        }
        .shipped-result {
          font-family: var(--mono);
          font-size: 5.5px;
          padding: 1px 5px;
          border-radius: 3px;
          background: var(--green-light);
          color: var(--green);
          font-weight: 600;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .shipped-co {
          font-size: 7px;
          color: var(--text-soft);
          margin-bottom: 4px;
        }
        .shipped-desc {
          font-size: 7px;
          color: var(--text-mid);
          line-height: 1.55;
          margin-bottom: 4px;
        }
        .shipped-tags { display: flex; flex-wrap: wrap; gap: 2px; }
        .shipped-tag {
          font-family: var(--mono);
          font-size: 5.5px;
          padding: 1px 5px;
          border-radius: 3px;
          background: var(--bg-alt);
          color: var(--text-soft);
          border: 1px solid var(--border-light);
        }

        /* ── education & details ── */
        .edu-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .edu-item { margin-bottom: 7px; }
        .edu-title {
          font-family: var(--serif);
          font-size: 9.5px;
          color: var(--bg-dark);
          margin-bottom: 1px;
        }
        .edu-detail { font-size: 7.5px; color: var(--text-soft); line-height: 1.5; }

        /* ── divider ── */
        .divider {
          border: none;
          border-top: 1px solid var(--border-light);
          margin: 12px 0;
        }

        /* ── print ── */
        @media print {
          html, body { background: #fff !important; }
          .resume-root {
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
          }
          @page {
            size: A4;
            margin: 12mm 13mm;
          }
        }
      `}</style>

      <div className="resume-root">

        {/* ── HEADER ── */}
        <header className="rh">
          <div>
            <div className="rh-name">Fernando <em>Ott</em></div>
            <div className="rh-title">
              Head of AI &nbsp;·&nbsp; AI Engineer &amp; Architect &nbsp;·&nbsp; LLM &amp; Multi-Agent Systems &nbsp;·&nbsp; RAG &nbsp;·&nbsp; AI Strategy<br />
              Curitiba, Paraná, Brazil &nbsp;·&nbsp; Remote · Global
            </div>
          </div>
          <div className="rh-contact">
            <a href="mailto:ferott@gmail.com">ferott@gmail.com</a><br />
            <a href="https://www.linkedin.com/in/feott">linkedin.com/in/feott</a><br />
            <a href="https://fernandoott.com">fernandoott.com</a>
          </div>
        </header>

        {/* ── HERO STRIP ── */}
        <div className="hero-strip">
          <div className="hero-photo-wrap">
            <div className="hero-pulse" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://media.licdn.com/dms/image/v2/D4D03AQGLRfIttnbNkA/profile-displayphoto-scale_400_400/B4DZrLOHGnG8Ag-/0/1764346067628?e=1776902400&v=beta&t=SBczeajmRTKGsCVbCaaun0QQD1NfASdxhaz7k8tcB6M"
              alt="Fernando Ott"
            />
          </div>
          <div className="hero-text">
            <div className="hero-available">
              <span className="hero-dot" />
              Open to new opportunities
            </div>
            <p className="hero-tagline">
              I lead AI strategy and build production AI systems with Python, LangChain, and RAG daily.
              I design multi-agent and agentic AI platforms that plug into real business tools, understand context,
              and make decisions autonomously. 16+ years shipping software · 4+ years deploying AI at scale.
            </p>
            <div className="hero-tags-row">
              {["Multi-Agent AI","RAG Pipelines","LLM Orchestration","AI Strategy","LangChain","Python","AWS","MCP Server"].map(t => (
                <span key={t} className="hero-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── METRICS BAR ── */}
        <div className="metrics-bar">
          {metrics.map((m) => (
            <div key={m.label} className="mb-item">
              <span className="mb-val">{m.value}</span>
              <span className="mb-lbl">{m.label}</span>
            </div>
          ))}
        </div>

        {/* ── BODY GRID ── */}
        <div className="body-grid">

          {/* ── SIDEBAR ── */}
          <aside className="sidebar">

            {/* Contacts */}
            <div className="sb-contacts">
              <span className="sb-label">Contacts</span>
              {[
                { href: "https://www.linkedin.com/in/feott", label: "linkedin.com/in/feott", icon: "https://cdn.simpleicons.org/linkedin/0A66C2" },
                { href: "https://github.com/devotts", label: "github.com/devotts", icon: "https://cdn.simpleicons.org/github/000000" },
                { href: "https://fernandoott.com", label: "fernandoott.com", icon: "https://cdn.simpleicons.org/firefox/FF7139" },
                { href: "mailto:ferott@gmail.com", label: "ferott@gmail.com", icon: "https://cdn.simpleicons.org/gmail/EA4335" },
                { href: "https://wa.me/5541999193736", label: "+55 41 99919-3736", icon: "https://cdn.simpleicons.org/whatsapp/25D366" },
              ].map((c) => (
                <a key={c.href} href={c.href} className="sb-contact-item">
                  <span className="sb-contact-icon">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.icon} alt="" />
                  </span>
                  <span className="sb-contact-text">{c.label}</span>
                </a>
              ))}
            </div>

            <div className="sb-section">
              <span className="sb-label">AI / ML</span>
              <div className="sb-tags">
                {["LangChain","CrewAI","LangSmith","RAG","MCP","Agentic AI","Prompt Eng.","LLM Eval","OpenAI","Anthropic","Mistral","LLaMA","Ollama","Vector DBs","pgvector","Deep Learning","NLP"].map(t => (
                  <span key={t} className="sb-tag">{t}</span>
                ))}
              </div>
            </div>

            <div className="sb-section">
              <span className="sb-label">Engineering</span>
              <div className="sb-tags">
                {["Python","Next.js",".NET / C#","TypeScript","FastAPI","Angular","PostgreSQL","MongoDB","Supabase","AWS","Docker","Kubernetes","N8N"].map(t => (
                  <span key={t} className="sb-tag">{t}</span>
                ))}
              </div>
            </div>

            <div className="sb-section">
              <span className="sb-label">Observability</span>
              <div className="sb-tags">
                {["Grafana","Datadog","LangSmith","CI/CD","GitHub","SonarQube"].map(t => (
                  <span key={t} className="sb-tag">{t}</span>
                ))}
              </div>
            </div>

            <div className="sb-section">
              <span className="sb-label">Leadership</span>
              <div className="sb-tags">
                {["AI Strategy","Team Lead","Roadmap","Scrum","OKR","Hiring","AI Governance","Cross-func."].map(t => (
                  <span key={t} className="sb-tag">{t}</span>
                ))}
              </div>
            </div>

            <div className="sb-section">
              <span className="sb-label">Languages</span>
              <div className="sb-text">
                🇧🇷 Portuguese — Native<br />
                🇺🇸 English — Full Professional<br />
                🇪🇸 Spanish — Working
              </div>
            </div>

            <div className="sb-section">
              <span className="sb-label">Recognition</span>
              <div className="sb-text">
                🏆 Startup Weekend Winner<br />
                🚀 Start-Up Chile Alum<br />
                🚀 DotForge Impact UK Alum<br />
                🌍 Yunus &amp; Youth Fellow
              </div>
            </div>

            <div className="sb-section">
              <span className="sb-label">Open To</span>
              <div className="sb-text">
                Head of AI · AI Architect<br />
                Senior / Staff AI Engineer<br />
                Remote · Global
              </div>
            </div>

          </aside>

          {/* ── MAIN ── */}
          <main>

            {/* Strengths */}
            <span className="sec-tag">Core Strengths</span>
            <div className="str-grid">
              {strengths.map((s) => (
                <div key={s.title} className="str-card">
                  <div className="str-head">
                    <span style={{ fontSize: 11 }}>{s.icon}</span>
                    <span className="str-name">{s.title}</span>
                    <span className={`str-badge ${s.level}`}>{s.level === "expert" ? "Expert" : "Strong"}</span>
                  </div>
                  <div className="str-desc">{s.desc}</div>
                </div>
              ))}
            </div>

            <hr className="divider" />

            {/* Experience */}
            <span className="sec-tag">Career Timeline</span>
            <div className="sec-title">Where I&apos;ve <em>built things</em></div>

            <div className="exp-section">
              {experiences.map((exp) => (
                <div key={exp.company + exp.dates} className="exp-item">
                  <div className="exp-row">
                    <div className="exp-role">{exp.role}</div>
                    <div className="exp-dates">{exp.dates}</div>
                  </div>
                  <div className="exp-meta">
                    <span className="exp-co">{exp.company}</span>
                    <span className="exp-sep">·</span>
                    <span className="exp-loc">{exp.location}</span>
                  </div>
                  <div className="exp-desc">{exp.desc}</div>
                  <div className="exp-tags">
                    {exp.tags.map((t) => <span key={t} className="exp-tag">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>

            <hr className="divider" />

            {/* What I've Shipped */}
            <span className="sec-tag">Selected Projects</span>
            <div className="sec-title">What I&apos;ve <em>shipped</em></div>
            <div className="shipped-grid">
              {shipped.map((s) => (
                <div key={s.name} className="shipped-card">
                  <div className="shipped-head">
                    <div className="shipped-name">{s.name}</div>
                    <div className="shipped-result">{s.result}</div>
                  </div>
                  <div className="shipped-co">{s.company}</div>
                  <div className="shipped-desc">{s.desc}</div>
                  <div className="shipped-tags">
                    {s.tags.map(t => <span key={t} className="shipped-tag">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>

            <hr className="divider" />

            {/* Skills */}
            <span className="sec-tag">Skills</span>
            <div className="sk-grid">
              {skillGroups.map((g) => (
                <div key={g.header} className="sk-card">
                  <div className="sk-header">{g.header}</div>
                  <div className="sk-tags">
                    {g.items.map((item) => <span key={item} className="sk-tag">{item}</span>)}
                  </div>
                </div>
              ))}
            </div>

            <hr className="divider" />

            {/* Education */}
            <span className="sec-tag">Education &amp; Background</span>
            <div className="edu-grid">
              <div>
                {[
                  { title: "B.Sc. Computer Science", detail: "Universidade Federal do Paraná · 2007–2011" },
                  { title: "Microsoft S2B", detail: "C# Program · 2008" },
                  { title: "Startup Accelerators", detail: "Start-Up Chile · DotForge (UK) · Start You Up (BR)" },
                  { title: "Yunus & Youth Fellow", detail: "Social Business · Global Fellowship" },
                ].map((e) => (
                  <div key={e.title} className="edu-item">
                    <div className="edu-title">{e.title}</div>
                    <div className="edu-detail">{e.detail}</div>
                  </div>
                ))}
              </div>
              <div>
                {[
                  { title: "Location", detail: "Curitiba, Paraná, Brazil · Remote, open to global" },
                  { title: "Languages", detail: "Portuguese (Native) · English (Full Professional) · Spanish (Working)" },
                  { title: "Notice Period", detail: "2 weeks" },
                  { title: "Portfolio", detail: "fernandoott.com — interactive AI resume with live AI clone" },
                  { title: "Technical Content", detail: "YouTube: @Devotts & @Otimiza_ai — AI systems, agent architectures, automation" },
                ].map((e) => (
                  <div key={e.title} className="edu-item">
                    <div className="edu-title">{e.title}</div>
                    <div className="edu-detail">{e.detail}</div>
                  </div>
                ))}
              </div>
            </div>

          </main>
        </div>{/* /body-grid */}

      </div>{/* /resume-root */}
    </>
  );
}
