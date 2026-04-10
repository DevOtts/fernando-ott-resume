"use client";

const strengths = [
  {
    icon: "🏗️",
    title: "AI Systems Architecture",
    desc: "I design multi-agent platforms from scratch. Brain is a multi-tenant OS with vector, graph, and structured stores, LLM orchestration, ingestion pipelines, and production observability. I think in platforms, not scripts.",
    level: "expert" as const,
  },
  {
    icon: "🌉",
    title: "Business ↔ Engineering Bridge",
    desc: "I translate what a company needs into what the engineering team builds — defining AI strategy, setting the AI roadmap, and driving AI transformation and digital transformation initiatives. This is the \"click\" that most developers miss. I've done it as CTO, Tech Lead at a NASDAQ company, and Head of AI at an agency.",
    level: "expert" as const,
  },
  {
    icon: "👥",
    title: "People Management",
    desc: "I've managed nearly 20 people directly. Teaching juniors, managing senior egos, keeping motivation high. The code is simpler than people, but it's really satisfying when you figure out your way to lead and the team appreciates it.",
    level: "expert" as const,
  },
  {
    icon: "🤝",
    title: "Client Conversation & Management",
    desc: "From agencies to NASDAQ enterprises, I sit with clients, understand their context, and drive AI enablement across their organizations. Stakeholder management, mapping AI to workflows, implementing AI governance frameworks, and delivering measurable outcomes. Not demos, not slide decks. Real results they can see in their numbers.",
    level: "expert" as const,
  },
  {
    icon: "🔧",
    title: "LLM Orchestration & Agentic AI",
    desc: "LangChain, CrewAI, MCP Server, multi-model pipelines, RAG, NLP, context engineering, tool use, guardrails. I define prompting patterns, retrieval logic, evaluation frameworks, and failure modes. This is what I do daily in production generative AI systems.",
    level: "expert" as const,
  },
  {
    icon: "🚀",
    title: "POC → Production Delivery",
    desc: "Brain went from whiteboard to multi-tenant production in months. KeHE search went from broken to 14x faster. Polen went from idea to 25M users. I take things from zero to one and then from one to scale.",
    level: "strong" as const,
  },
  {
    icon: "📐",
    title: "Scalable Platform Thinking",
    desc: "I don't build one-off automations. I build platforms. Multi-tenant isolation, reusable agent patterns, metadata-driven configuration. Adding a new client to Brain doesn't require custom engineering, just configuration.",
    level: "expert" as const,
  },
  {
    icon: "☁️",
    title: "AWS Production Workloads",
    desc: "At KeHE, AWS was the backbone: Lambdas, SQS, S3, DynamoDB, OpenSearch, CodeBuild, CloudWatch. I've designed and deployed AI/ML workloads end-to-end on AWS. No certifications yet, but deep hands-on experience.",
    level: "strong" as const,
  },
  {
    icon: "🎯",
    title: "Startup Founder Mindset",
    desc: "I've co-founded, raised VC ($550K), served as CEO and CTO, lived through accelerators in 3 countries. I know the rhythm of fast delivery and user-first thinking. I can balance business urgency with technical integrity.",
    level: "strong" as const,
  },
];

const gaps = [
  {
    title: "AI Image & Video Generation",
    desc: "I understand the concepts and can architect integrations, but I haven't built production pipelines with diffusion models, Stable Diffusion, or video generation tools. I'd delegate this to a specialist.",
  },
  {
    title: "Classical ML / Deep Learning Research",
    desc: "My ML work is applied and production-focused: RAG, LLM orchestration, fine-tuning for domain adaptation, multi-model routing. I don't train CNNs from scratch or write custom loss functions.",
  },
  {
    title: "Mobile Development",
    desc: "I've built web and backend systems for 16+ years, but no native iOS or Android experience. For products that need native mobile clients, I'd bring in a specialist.",
  },
  {
    title: "PowerBI",
    desc: "I've queried ClickHouse and BigQuery in production contexts, but BI tooling — dashboards, data modelling, semantic layers — has never been my focus. Not where I want to specialize.",
  },
];

export function StrengthsSection() {
  return (
    <section
      id="strengths"
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
          What I Bring
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
          Where I&apos;m <i>strongest</i>
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
          These aren&apos;t buzzwords. They&apos;re the things I&apos;ve done
          consistently across startups, enterprise, and AI systems for over a
          decade.
        </p>
      </div>

      <div
        className="reveal strength-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.25rem",
        }}
      >
        {strengths.map((s) => (
          <StrengthCard key={s.title} {...s} />
        ))}
      </div>

      {/* Gaps subsection */}
      <div
        className="reveal"
        style={{
          background: "var(--bg-alt)",
          borderRadius: 16,
          padding: "3rem",
          marginTop: "2rem",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--serif)",
            fontSize: "1.5rem",
            marginBottom: "0.5rem",
          }}
        >
          Where I&apos;m honest about gaps
        </h3>
        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--text-soft)",
            marginBottom: "1.5rem",
          }}
        >
          No one is strong at everything. Here&apos;s where I&apos;m growing
          and what I consciously delegate.
        </p>
        <div
          className="gap-row"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
          }}
        >
          {gaps.map((g) => (
            <div
              key={g.title}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                fontSize: "0.88rem",
                color: "var(--text-mid)",
                lineHeight: 1.6,
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8rem",
                  marginTop: 2,
                  background: "var(--orange-light)",
                  color: "var(--orange)",
                }}
              >
                △
              </div>
              <div>
                <strong>{g.title}</strong> — {g.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .strength-grid { grid-template-columns: 1fr !important; }
          .gap-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function StrengthCard({
  icon,
  title,
  desc,
  level,
}: {
  icon: string;
  title: string;
  desc: string;
  level: "expert" | "strong";
}) {
  const levelStyles =
    level === "expert"
      ? {
        background: "var(--green-light)",
        color: "var(--green)",
      }
      : {
        background: "var(--accent-light)",
        color: "var(--accent)",
      };

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--r)",
        padding: "1.75rem",
        transition: "all 0.3s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "var(--accent)";
        el.style.boxShadow = "0 8px 40px rgba(37,99,235,0.06)";
        el.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "var(--border-light)";
        el.style.boxShadow = "none";
        el.style.transform = "translateY(0)";
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          fontFamily: "var(--mono)",
          fontSize: "0.65rem",
          padding: "3px 8px",
          borderRadius: 4,
          fontWeight: 500,
          textTransform: "uppercase",
          ...levelStyles,
        }}
      >
        {level === "expert" ? "Expert" : "Strong"}
      </span>
      <span
        style={{ fontSize: "1.5rem", marginBottom: "0.75rem", display: "block" }}
      >
        {icon}
      </span>
      <h3
        style={{
          fontFamily: "var(--serif)",
          fontSize: "1.15rem",
          marginBottom: "0.5rem",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "0.88rem",
          color: "var(--text-soft)",
          lineHeight: 1.65,
        }}
      >
        {desc}
      </p>
    </div>
  );
}
