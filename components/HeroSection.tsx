"use client";

import { useEffect } from "react";

interface HeroSectionProps {
  onChatOpen: () => void;
}

const ORBIT_TAGS = [
  { label: "Anthropic", logo: "https://cdn.simpleicons.org/anthropic/000000" },
  { label: "LangChain", logo: "https://cdn.simpleicons.org/langchain/000000" },
  { label: "AWS", logo: "https://cdn.simpleicons.org/amazonaws/FF9900" },
  { label: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/000000" },
  { label: "OpenSearch", logo: "https://cdn.simpleicons.org/opensearch/005EB8" },
  { label: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
  { label: "MCP", logo: null },
  { label: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
];

function injectHeroKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById("hero-orbit-keyframes")) return;
  const style = document.createElement("style");
  style.id = "hero-orbit-keyframes";
  style.textContent = `
    @keyframes hero-orbit-cw  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
    @keyframes hero-orbit-ccw { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
  `;
  document.head.appendChild(style);
}

export function HeroSection({ onChatOpen: _onChatOpen }: HeroSectionProps) {
  useEffect(() => { injectHeroKeyframes(); }, []);

  const socialLinks = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/feott/" },
    { label: "GitHub", href: "https://github.com/devotts" },
    { label: "YouTube", href: "https://www.youtube.com/@otimiza-ai" },
    {
      label: "8FAI Profile ↗",
      href: "https://www.8figureagency.co/fernando-ott",
    },
  ];

  const RADIUS = 130;

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
          gridTemplateColumns: "1fr 420px",
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
                target="_blank"
                rel="noopener noreferrer"
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

        {/* Right: orbital photo */}
        <div
          className="hero-photo"
          style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          {/* Orbital container */}
          <div
            style={{
              position: "relative",
              width: RADIUS * 2 + 80,
              height: RADIUS * 2 + 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Dashed orbit ring */}
            <div
              style={{
                position: "absolute",
                width: RADIUS * 2,
                height: RADIUS * 2,
                borderRadius: "50%",
                border: "1px dashed var(--border)",
                pointerEvents: "none",
              }}
            />

            {/* Orbiting tech tags */}
            {ORBIT_TAGS.map((tag, i) => {
              const startDeg = (i / ORBIT_TAGS.length) * 360;
              const duration = 22 + i * 1.5;
              const dir = i % 2 === 0 ? "hero-orbit-cw" : "hero-orbit-ccw";
              const counterDir = dir === "hero-orbit-cw" ? "hero-orbit-ccw" : "hero-orbit-cw";

              return (
                <div
                  key={tag.label}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: 0,
                    height: 0,
                    transform: `rotate(${startDeg}deg)`,
                    animation: `${dir} ${duration}s linear infinite`,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: RADIUS,
                      top: 0,
                      transform: `translate(-50%, -50%) rotate(-${startDeg}deg)`,
                      animation: `${counterDir} ${duration}s linear infinite`,
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      whiteSpace: "nowrap",
                      fontSize: "0.65rem",
                      fontFamily: "var(--mono)",
                      fontWeight: 600,
                      padding: "4px 9px",
                      borderRadius: 6,
                      background: "#fff",
                      color: "var(--text-mid)",
                      border: "1px solid var(--border-light)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                    }}
                  >
                    {tag.logo && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={tag.logo} alt="" width={12} height={12} style={{ objectFit: "contain", flexShrink: 0 }} />
                    )}
                    {tag.label}
                  </div>
                </div>
              );
            })}

            {/* Center: profile photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://media.licdn.com/dms/image/v2/D4D03AQGLRfIttnbNkA/profile-displayphoto-scale_400_400/B4DZrLOHGnG8Ag-/0/1764346067628?e=1776902400&v=beta&t=SBczeajmRTKGsCVbCaaun0QQD1NfASdxhaz7k8tcB6M"
              alt="Fernando Ott"
              style={{
                width: 200,
                height: 200,
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #fff",
                boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)",
                position: "relative",
                zIndex: 2,
              }}
            />
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
        }
      `}</style>
    </section>
  );
}
