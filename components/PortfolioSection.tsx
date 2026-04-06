"use client";

const portfolioItems = [
  {
    num: "01",
    title: "Brain",
    sub: "8 Figure Agency — Multi-Agent AI Platform",
    desc: "Multi-tenant, multi-agent OS connecting to CRMs, ads platforms, Slack, meetings, and data warehouses. Vector + graph + structured stores, LLM orchestration, reusable agent patterns, production observability. Whiteboard to multi-client production in months.",
    metric: "↓ 20-30 hrs / client / week",
    github: null,
  },
  {
    num: "02",
    title: "KeHE Search",
    sub: "OpenSearch B2B E-commerce · AWS",
    desc: "AI-powered search for a NASDAQ-listed food distributor handling millions of daily queries. Architected POC to production, created flexible architecture enabling Ads in search results.",
    metric: "14× speed · 2× conversion",
    github: null,
  },
  {
    num: "03",
    title: "Cognia",
    sub: "AI Psychologist MVP — Multi-Model Safety",
    desc: "Primary LLM for responses, fine-tuned models for personality and domain knowledge, smaller LLMs for toxicity screening, human-in-the-loop routing after 3 validation checks. End-to-end architecture to deployment.",
    metric: "Multi-model safety pipeline",
    github: null,
  },
  {
    num: "04",
    title: "TaskClaw",
    sub: "Open Source — AI Task Platform",
    desc: "Self-hostable Kanban + AI chat + knowledge management with bidirectional Notion/ClickUp sync. Public codebase demonstrating AI integration patterns.",
    metric: null,
    github: "https://github.com/DevOtts/taskclaw",
  },
];

export function PortfolioSection() {
  return (
    <section
      id="portfolio"
      style={{ maxWidth: 1180, margin: "0 auto", padding: "5rem 2rem" }}
    >
      <div className="reveal">
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.72rem",
            color: "var(--accent)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "0.6rem",
            fontWeight: 500,
          }}
        >
          Production Systems
        </div>
        <h2
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            marginBottom: "0.5rem",
          }}
        >
          What I&apos;ve <i>shipped</i>
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--text-soft)",
            maxWidth: 600,
            marginBottom: "2.5rem",
            lineHeight: 1.7,
          }}
        >
          Four production AI/ML systems, each from architecture to deployment.
          Real users, real data, real outcomes.
        </p>
      </div>

      <div
        className="reveal portfolio-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.25rem",
        }}
      >
        {portfolioItems.map((item) => (
          <PortfolioCard key={item.num} {...item} />
        ))}
      </div>

      <style>{`
        @media (max-width: 860px) {
          .portfolio-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function PortfolioCard({
  num,
  title,
  sub,
  desc,
  metric,
  github,
}: {
  num: string;
  title: string;
  sub: string;
  desc: string;
  metric: string | null;
  github: string | null;
}) {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--r)",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.35s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "var(--accent)";
        el.style.transform = "translateY(-3px)";
        el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.06)";
        const bar = el.querySelector(".pf-gradient-bar") as HTMLDivElement | null;
        if (bar) bar.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "var(--border-light)";
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
        const bar = el.querySelector(".pf-gradient-bar") as HTMLDivElement | null;
        if (bar) bar.style.opacity = "0";
      }}
    >
      {/* Top gradient bar */}
      <div
        className="pf-gradient-bar"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "linear-gradient(90deg, var(--accent), #7C3AED)",
          opacity: 0,
          transition: "opacity 0.3s",
        }}
      />

      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: "0.68rem",
          color: "var(--text-faint)",
          marginBottom: "0.6rem",
        }}
      >
        {num}
      </div>
      <div
        style={{
          fontFamily: "var(--serif)",
          fontSize: "1.5rem",
          marginBottom: "0.15rem",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: "0.82rem",
          color: "var(--accent)",
          marginBottom: "0.75rem",
          fontWeight: 500,
        }}
      >
        {sub}
      </div>
      <p
        style={{
          fontSize: "0.88rem",
          color: "var(--text-soft)",
          lineHeight: 1.7,
          marginBottom: "1rem",
        }}
      >
        {desc}
      </p>

      {metric && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--mono)",
            fontSize: "0.76rem",
            padding: "5px 12px",
            borderRadius: 6,
            background: "var(--green-light)",
            color: "var(--green)",
            fontWeight: 500,
          }}
        >
          {metric}
        </div>
      )}

      {github && (
        <div style={{ marginTop: "0.75rem" }}>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--accent)",
              fontFamily: "var(--mono)",
              fontSize: "0.8rem",
              textDecoration: "none",
              borderBottom: "1px dashed var(--accent)",
            }}
          >
            github.com/DevOtts/taskclaw ↗
          </a>
        </div>
      )}
    </div>
  );
}
