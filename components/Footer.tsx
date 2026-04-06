export function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "2rem",
        color: "var(--text-faint)",
        fontSize: "0.78rem",
        borderTop: "1px solid var(--border-light)",
      }}
    >
      <p>
        Fernando Ott · Head of AI &amp; AI Architect ·{" "}
        <a
          href="https://www.linkedin.com/in/feott/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--accent)", textDecoration: "none" }}
        >
          LinkedIn
        </a>{" "}
        ·{" "}
        <a
          href="https://github.com/devotts"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--accent)", textDecoration: "none" }}
        >
          GitHub
        </a>
      </p>
      <p style={{ marginTop: 6 }}>
        This resume features an AI chat clone powered by Claude.
      </p>
    </footer>
  );
}
