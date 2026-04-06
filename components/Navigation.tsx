"use client";

interface NavigationProps {
  onChatOpen: () => void;
}

export function Navigation({ onChatOpen }: NavigationProps) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(250,250,248,0.85)",
        backdropFilter: "blur(24px) saturate(1.2)",
        borderBottom: "1px solid var(--border-light)",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2rem",
          height: 56,
        }}
      >
        <a
          href="#"
          style={{
            fontFamily: "var(--serif)",
            fontSize: "1.25rem",
            color: "var(--text)",
            textDecoration: "none",
            letterSpacing: "-0.03em",
          }}
        >
          Fernando<i style={{ color: "var(--accent)" }}>Ott</i>
        </a>

        <ul
          className="nav-links"
          style={{
            display: "flex",
            gap: "1.75rem",
            listStyle: "none",
          }}
        >
          {[
            { label: "Strengths", href: "#strengths" },
            { label: "Experience", href: "#experience" },
            { label: "Portfolio", href: "#portfolio" },
            { label: "Skills", href: "#skills" },
          ].map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  color: "var(--text-soft)",
                  textDecoration: "none",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--text)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--text-soft)")
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={onChatOpen}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "var(--bg-dark)",
            color: "#fff",
            border: "none",
            padding: "7px 16px",
            borderRadius: 8,
            fontSize: "0.8rem",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "var(--sans)",
            transition: "all 0.25s",
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "#2A2A30";
            btn.style.transform = "translateY(-1px)";
            btn.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "var(--bg-dark)";
            btn.style.transform = "translateY(0)";
            btn.style.boxShadow = "none";
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Talk to My AI Clone
        </button>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
