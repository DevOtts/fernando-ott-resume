"use client";

interface HeroSectionProps {
  onChatOpen: () => void;
}

export function HeroSection({ onChatOpen: _onChatOpen }: HeroSectionProps) {
  const socialLinks = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/feott/" },
    { label: "GitHub", href: "https://github.com/devotts" },
    { label: "YouTube", href: "https://www.youtube.com/@devotts_ai/videos" },
    {
      label: "8FAI Profile ↗",
      href: "https://www.8figureagency.co/fernando-ott",
    },
    { label: "ferott@gmail.com", href: "mailto:ferott@gmail.com" },
  ];

  return (
    <section
      style={{
        padding: "8rem 2rem 4rem",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background gradient blob */}
      <div
        style={{
          content: "",
          position: "absolute",
          top: -200,
          right: -200,
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <div
        className="hero-in"
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: "4rem",
          alignItems: "center",
        }}
      >
        {/* Left: text */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Open to opportunities badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "var(--green-light)",
              color: "var(--green)",
              fontSize: "0.78rem",
              fontWeight: 600,
              padding: "5px 14px",
              borderRadius: 20,
              marginBottom: "1.75rem",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                background: "var(--green)",
                borderRadius: "50%",
                animation: "pulse 2s infinite",
                flexShrink: 0,
              }}
            />
            Open to new opportunities
          </div>

          <h1
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(2.8rem, 5.5vw, 4.2rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
              marginBottom: "0.4rem",
            }}
          >
            Fernando <i style={{ fontStyle: "italic", color: "var(--accent)" }}>Ott</i>
          </h1>

          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--text-mid)",
              marginBottom: "1.25rem",
              fontWeight: 400,
            }}
          >
            Head of AI &amp; AI Architect at 8 Figure Agency
          </p>

          <p
            style={{
              fontSize: "1rem",
              color: "var(--text-soft)",
              maxWidth: 540,
              lineHeight: 1.75,
              marginBottom: "2rem",
            }}
          >
            I design multi-agent AI systems that plug into real business tools,
            understand context, and make decisions autonomously. My thing is
            turning complex AI ideas into platforms that actually run in
            production and move the needle for clients. 16+ years shipping
            software, 4+ years deploying AI at scale.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "var(--text-soft)",
                  textDecoration: "none",
                  padding: "7px 14px",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  transition: "all 0.2s",
                  background: "#fff",
                }}
                onMouseEnter={(e) => {
                  const a = e.currentTarget as HTMLAnchorElement;
                  a.style.borderColor = "var(--accent)";
                  a.style.color = "var(--accent)";
                  a.style.background = "var(--accent-light)";
                }}
                onMouseLeave={(e) => {
                  const a = e.currentTarget as HTMLAnchorElement;
                  a.style.borderColor = "var(--border)";
                  a.style.color = "var(--text-soft)";
                  a.style.background = "#fff";
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: photo */}
        <div
          className="hero-photo"
          style={{ position: "relative", display: "flex", justifyContent: "center" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://media.licdn.com/dms/image/v2/D4D03AQGLRfIttnbNkA/profile-displayphoto-scale_400_400/B4DZrLOHGnG8Ag-/0/1764346067628?e=1776902400&v=beta&t=SBczeajmRTKGsCVbCaaun0QQD1NfASdxhaz7k8tcB6M"
            alt="Fernando Ott"
            style={{
              width: 300,
              height: 300,
              borderRadius: 20,
              objectFit: "cover",
              border: "4px solid #fff",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)",
              position: "relative",
              zIndex: 1,
            }}
          />

          {/* Floating cards */}
          <div
            className="photo-card"
            style={{
              position: "absolute",
              background: "#fff",
              border: "1px solid var(--border-light)",
              borderRadius: 12,
              padding: "10px 16px",
              fontSize: "0.78rem",
              boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
              zIndex: 2,
              whiteSpace: "nowrap",
              bottom: -10,
              left: -20,
              color: "var(--accent)",
              fontWeight: 600,
            }}
          >
            🧠 Architect of Brain AI
          </div>

          <div
            className="photo-card"
            style={{
              position: "absolute",
              background: "#fff",
              border: "1px solid var(--border-light)",
              borderRadius: 12,
              padding: "10px 16px",
              fontSize: "0.78rem",
              boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
              zIndex: 2,
              whiteSpace: "nowrap",
              top: 20,
              right: -30,
              color: "var(--green)",
              fontWeight: 600,
            }}
          >
            ✓ 4+ yrs AI in Production
          </div>

          <div
            className="photo-card"
            style={{
              position: "absolute",
              background: "#fff",
              border: "1px solid var(--border-light)",
              borderRadius: 12,
              padding: "10px 16px",
              fontSize: "0.78rem",
              boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
              zIndex: 2,
              whiteSpace: "nowrap",
              bottom: 60,
              right: -40,
              color: "var(--text-mid)",
            }}
          >
            Curitiba, Brazil · Remote
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hero-in {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-photo {
            order: -1;
            margin-bottom: 1rem;
          }
          .hero-photo img {
            width: 200px !important;
            height: 200px !important;
          }
          .photo-card {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
