"use client";

const experiences = [
  {
    dates: "Jul 2025 — Present",
    company: "8 Figure Agency",
    location: "Santa Monica, CA · Remote",
    role: "Head of AI & AI Architect",
    desc: "I lead the design and execution of Brain, our multi-tenant AI platform connecting to client tools (CRMs, ads platforms, Slack, meetings, data warehouses). My role sits at the intersection of product, architecture, and team leadership. I define the technical direction, set delivery standards, and manage a team of AI engineers and researchers. I set LLM strategy (model selection, prompting patterns, tool use, retrieval, guardrails), evaluation frameworks, and production observability with Grafana, Datadog, and LangSmith. The goal: grounding AI work in business impact, not demos.",
    tags: [
      "Python",
      "Next.js",
      "LangChain",
      "CrewAI",
      "MCP Server",
      "Vector DBs",
      "MongoDB",
      "Supabase",
      "PostgreSQL",
      "AWS",
      "Grafana",
      "Datadog",
    ],
  },
  {
    dates: "Jul 2022 — Jun 2025",
    company: "KeHE Distributors",
    location: "Naperville, IL · Remote",
    role: "Tech Lead & Architect",
    desc: "Led the transformation of the e-commerce search platform for a NASDAQ-listed, $8B+ revenue food distributor. Guided the team through a POC, selected OpenSearch on AWS, and delivered a 14x search speed improvement and 2x sales conversion lift processing millions of daily queries. Also reduced B2B client onboarding from 15 minutes to 2 minutes. Managed multiple teams across retailer and back-office operations.",
    tags: [
      "AWS",
      "OpenSearch",
      ".NET 8",
      "Angular",
      "DynamoDB",
      "SQS",
      "PostgreSQL",
      "Datadog",
    ],
  },
  {
    dates: "Nov 2013 — Aug 2024",
    company: "Polen",
    location: "Curitiba, BR & International",
    role: "CTO & Co-Founder",
    desc: "Built the first social impact Open API in Latin America from scratch. Raised $550K in VC, scaled to 5,000+ companies and 25M+ users, donated $1.5M+ through the platform. Managed ~20 people, implemented OKR and Scrum across the entire org. Migrated from monolith to microservices (Docker, Kubernetes, Google Cloud). Served as CEO for 2 years before transitioning to CTO. Accelerated in Chile, UK, and Brazil.",
    tags: [
      "C# / .NET",
      "Angular",
      "MongoDB",
      "Docker",
      "Kubernetes",
      "Google Cloud",
    ],
  },
  {
    dates: "Jan 2012 — Aug 2012",
    company: "Many To One Consulting",
    location: "Curitiba, BR",
    role: "Technical Lead & Senior Developer",
    desc: "Built a CMS serving 3 travel portals for B2W Group (Submarine, Shoptime, Americanas). ASP.NET MVC 4, SQL Server 2012, caching and geolocation. Led technical delivery as module lead on a Scrum team.",
    tags: ["ASP.NET MVC", "SQL Server", "C#", "Scrum"],
  },
  {
    dates: "Jun 2011 — Dec 2011",
    company: "BuscaPé",
    location: "São Paulo, BR",
    role: "Middle Developer",
    desc: "Anti-fraud system for one of Brazil's largest e-commerce platforms. Improved SQL database performance, introduced Cassandra for high-throughput scenarios, and raised the bar on unit and functional testing.",
    tags: ["C#", "SQL Server", "Cassandra", "Scrum"],
  },
  {
    dates: "Jan 2010 — Apr 2011",
    company: "FCamara Consulting & Training",
    location: "São Paulo, BR",
    role: "Middle Developer",
    desc: "Worked across Walmart.com.br (data layer optimization, MVC migration, jQuery, async), PRNewswire (first PM role — team coordination, Scrum, client contact), and Milevo (Facebook/Twitter/Google social integration).",
    tags: ["ASP.NET / C#", "SQL Server", "jQuery", "Web Services"],
  },
];

export function ExperienceSection() {
  return (
    <section
      id="experience"
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
          Career Timeline
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
          Where I&apos;ve <i>built things</i>
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
          Brain and my current AI leadership work lead everything. Prior roles
          demonstrate range, resilience, and a consistent pattern of shipping at
          scale.
        </p>
      </div>

      <div className="reveal">
        {experiences.map((exp, i) => (
          <div
            key={exp.company + exp.dates}
            className="exp-item"
            style={{
              display: "grid",
              gridTemplateColumns: "200px 1fr",
              gap: "2rem",
              padding: "2.5rem 0",
              borderBottom:
                i < experiences.length - 1
                  ? "1px solid var(--border-light)"
                  : "none",
            }}
          >
            <div
              style={{
                position: "sticky",
                top: 80,
                alignSelf: "start",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.78rem",
                  color: "var(--text-faint)",
                }}
              >
                {exp.dates}
              </div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  marginTop: "0.25rem",
                }}
              >
                {exp.company}
              </div>
              <div
                style={{ fontSize: "0.8rem", color: "var(--text-soft)" }}
              >
                {exp.location}
              </div>
            </div>

            <div>
              <h3
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "1.4rem",
                  letterSpacing: "-0.01em",
                  marginBottom: "0.75rem",
                  fontWeight: "normal",
                }}
              >
                {exp.role}
              </h3>
              <p
                style={{
                  fontSize: "0.92rem",
                  color: "var(--text-mid)",
                  lineHeight: 1.8,
                  maxWidth: 650,
                }}
              >
                {exp.desc}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.35rem",
                  marginTop: "1rem",
                }}
              >
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "0.68rem",
                      padding: "3px 9px",
                      borderRadius: 4,
                      background: "var(--bg-alt)",
                      color: "var(--text-soft)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 700px) {
          .exp-item {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
          }
          .exp-item > div:first-child {
            position: static !important;
          }
        }
      `}</style>
    </section>
  );
}
