"use client";

const education = [
  {
    title: "B.Sc. Computer Science",
    detail: "Universidade Federal do Paraná (UFPR) · 2007—2011",
  },
  {
    title: "Microsoft Student to Business (S2B)",
    detail: "C# Program · 2008",
  },
  {
    title: "Startup Accelerators",
    detail:
      "Start-Up Chile · DotForge Impact (UK) · Start You Up (Brazil)",
  },
  {
    title: "Award",
    detail: "Startup Weekend Winner",
  },
];

const personalDetails = [
  {
    title: "Location",
    detail: "Curitiba, Paraná, Brazil · Remote, open to global",
  },
  {
    title: "Languages",
    detail:
      "Portuguese (Native) · English (Full Professional) · Spanish (Working)",
  },
  {
    title: "Notice Period",
    detail: "1 month",
  },
  {
    title: "Technical Content",
    detail:
      'YouTube "Devops Attempt" (pt-BR) — AI systems, agent architectures, automation',
  },
];

export function EducationSection() {
  return (
    <section
      id="education"
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
          Background
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
          Education &amp; <i>Details</i>
        </h2>
      </div>

      <div
        className="reveal two-col"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
        }}
      >
        <div>
          {education.map((item) => (
            <InfoBlock key={item.title} title={item.title} detail={item.detail} />
          ))}
        </div>
        <div>
          {personalDetails.map((item) => (
            <InfoBlock key={item.title} title={item.title} detail={item.detail} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function InfoBlock({ title, detail }: { title: string; detail: string }) {
  return (
    <div style={{ marginBottom: "1.75rem" }}>
      <h3
        style={{
          fontFamily: "var(--serif)",
          fontSize: "1.05rem",
          marginBottom: "0.15rem",
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: "0.85rem", color: "var(--text-soft)" }}>{detail}</p>
    </div>
  );
}
