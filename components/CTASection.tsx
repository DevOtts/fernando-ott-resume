"use client";

interface CTASectionProps {
  onChatOpen: () => void;
}

export function CTASection({ onChatOpen }: CTASectionProps) {
  return (
    <div
      className="reveal"
      style={{
        background: "var(--bg-dark)",
        borderRadius: 20,
        padding: "4rem",
        textAlign: "center",
        margin: "3rem 2rem",
        maxWidth: 1180,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(2rem, 4vw, 2.8rem)",
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
          color: "#fff",
          marginBottom: "0.75rem",
        }}
      >
        Let&apos;s talk about your{" "}
        <i style={{ fontStyle: "italic", color: "var(--accent-light)" }}>
          AI challenges
        </i>
      </h2>
      <p
        style={{
          color: "rgba(255,255,255,0.5)",
          marginBottom: "2rem",
          fontSize: "0.95rem",
        }}
      >
        I&apos;m looking for the right AI leadership role. If you&apos;re
        building agentic systems and need someone who ships, let&apos;s connect.
      </p>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <a
          href="mailto:ferott@gmail.com"
          style={{
            padding: "12px 28px",
            borderRadius: 10,
            fontSize: "0.9rem",
            fontWeight: 600,
            textDecoration: "none",
            fontFamily: "var(--sans)",
            cursor: "pointer",
            transition: "all 0.25s",
            border: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#fff",
            color: "var(--bg-dark)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "#E8E8E8";
            el.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "#fff";
            el.style.transform = "translateY(0)";
          }}
        >
          ✉ Email Me
        </a>
        <a
          href="https://www.linkedin.com/in/feott/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "12px 28px",
            borderRadius: 10,
            fontSize: "0.9rem",
            fontWeight: 600,
            textDecoration: "none",
            fontFamily: "var(--sans)",
            cursor: "pointer",
            transition: "all 0.25s",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "transparent",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.borderColor = "rgba(255,255,255,0.5)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.borderColor = "rgba(255,255,255,0.2)";
          }}
        >
          LinkedIn →
        </a>
        <button
          onClick={onChatOpen}
          style={{
            padding: "12px 28px",
            borderRadius: 10,
            fontSize: "0.9rem",
            fontWeight: 600,
            fontFamily: "var(--sans)",
            cursor: "pointer",
            transition: "all 0.25s",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "transparent",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.borderColor = "rgba(255,255,255,0.5)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.borderColor = "rgba(255,255,255,0.2)";
          }}
        >
          💬 Talk to My AI Clone
        </button>
      </div>
    </div>
  );
}
