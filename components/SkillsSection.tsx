"use client";

const skillGroups = [
  {
    header: "AI / ML / LLM",
    items: [
      "LangChain",
      "LangSmith",
      "CrewAI",
      "MCP Server",
      "Anthropic Claude",
      "OpenAI",
      "Mistral",
      "LLaMA / Ollama",
      "Vector DBs",
      "Knowledge Graphs",
      "RAG Pipelines",
      "Multi-Agent Architectures",
      "Agentic AI",
      "Prompt Engineering",
      "Context Engineering",
      "Fine-Tuning",
      "NLP / Natural Language Processing",
      "Deep Learning",
      "N8N",
    ],
  },
  {
    header: "Backend & Infrastructure",
    items: [
      "Python",
      ".NET / C#",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Supabase",
      "DynamoDB",
      "OpenSearch",
      "AWS (Lambda, SQS, S3)",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "MLOps",
    ],
  },
  {
    header: "Frontend & Observability",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Angular",
      "Grafana",
      "Datadog",
      "LangSmith",
      "CloudWatch",
      "SonarQube",
    ],
  },
  {
    header: "Leadership & Process",
    items: [
      "AI Strategy & Roadmap",
      "AI Governance",
      "AI Enablement",
      "AI Transformation",
      "Digital Transformation",
      "Stakeholder Management",
      "Architecture Decision Records",
      "Team Management (20+)",
      "Cross-functional Leadership",
      "Scrum / Kanban",
      "OKR",
      "Sprint Planning & DoD",
      "Technical Mentoring",
    ],
  },
];

export function SkillsSection() {
  return (
    <section
      id="skills"
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
          Technical Toolkit
        </div>
        <h2
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            marginBottom: "2.5rem",
          }}
        >
          What I <i>work with</i>
        </h2>
      </div>

      <div
        className="reveal skills-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.5rem",
        }}
      >
        {skillGroups.map((group) => (
          <div
            key={group.header}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--r)",
              padding: "1.75rem",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.7rem",
                color: "var(--accent)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "1rem",
                paddingBottom: "0.6rem",
                borderBottom: "1px solid var(--border-light)",
                fontWeight: 500,
              }}
            >
              {group.header}
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
              {group.items.map((item) => (
                <span
                  key={item}
                  style={{
                    fontSize: "0.8rem",
                    padding: "4px 11px",
                    borderRadius: 5,
                    background: "var(--bg-alt)",
                    color: "var(--text-mid)",
                    transition: "all 0.2s",
                    border: "1px solid transparent",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLSpanElement;
                    el.style.borderColor = "var(--accent)";
                    el.style.color = "var(--accent)";
                    el.style.background = "var(--accent-light)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLSpanElement;
                    el.style.borderColor = "transparent";
                    el.style.color = "var(--text-mid)";
                    el.style.background = "var(--bg-alt)";
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 860px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
