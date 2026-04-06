"use client";

import { useState, useEffect, useRef } from "react";

interface HeroSectionProps {
  onChatOpen: () => void;
}

interface OrbitalTag {
  label: string;
  logo: string | null;
}

const ORBIT_TAGS: OrbitalTag[] = [
  { label: "Anthropic", logo: "https://cdn.simpleicons.org/anthropic/000000" },
  { label: "LangChain", logo: "https://cdn.simpleicons.org/langchain/1C3C3C" },
  { label: "AWS",       logo: "https://cdn.simpleicons.org/amazonaws/FF9900" },
  { label: "Next.js",   logo: "https://cdn.simpleicons.org/nextdotjs/000000" },
  { label: "OpenSearch",logo: "https://cdn.simpleicons.org/opensearch/005EB8" },
  { label: "Docker",    logo: "https://cdn.simpleicons.org/docker/2496ED" },
  { label: "MCP",       logo: null },
  { label: "Python",    logo: "https://cdn.simpleicons.org/python/3776AB" },
];

const RADIUS = 148;
const SPEED = 0.25; // degrees per frame (50 ms tick)

export function HeroSection({ onChatOpen: _onChatOpen }: HeroSectionProps) {
  const [angle, setAngle] = useState(0);
  const rafRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    rafRef.current = setInterval(() => {
      setAngle((a) => (a + SPEED) % 360);
    }, 50);
    return () => { if (rafRef.current) clearInterval(rafRef.current); };
  }, []);

  const socialLinks = [
    { label: "LinkedIn",     href: "https://www.linkedin.com/in/feott/" },
    { label: "GitHub",       href: "https://github.com/devotts" },
    { label: "YouTube",      href: "https://www.youtube.com/@otimiza-ai" },
    { label: "8FAI Profile ↗", href: "https://www.8figureagency.co/fernando-ott" },
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
          position: "absolute",
          top: -200,
          right: -200,
          width: 700,
          height: 700,
          background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)",
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
          gridTemplateColumns: "1fr 480px",
          gap: "4rem",
          alignItems: "center",
        }}
      >
        {/* ── Left: text ── */}
        <div style={{ position: "relative", zIndex: 1 }}>
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

          <p style={{ fontSize: "1.15rem", color: "var(--text-mid)", marginBottom: "1.25rem", fontWeight: 400 }}>
            Head of AI &amp; AI Architect at 8 Figure Agency
          </p>

          <p style={{ fontSize: "1rem", color: "var(--text-soft)", maxWidth: 540, lineHeight: 1.75, marginBottom: "2rem" }}>
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

        {/* ── Right: orbital photo + floating cards ── */}
        <div
          className="hero-photo"
          style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          {/* Orbital scene — fixed 400×400 canvas */}
          <div
            style={{
              position: "relative",
              width: 400,
              height: 400,
              flexShrink: 0,
            }}
          >
            {/* Orbit ring */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: RADIUS * 2,
                height: RADIUS * 2,
                marginTop: -RADIUS,
                marginLeft: -RADIUS,
                borderRadius: "50%",
                border: "1px dashed rgba(0,0,0,0.12)",
                pointerEvents: "none",
              }}
            />

            {/* Orbiting tags — JS-driven x/y like the reference */}
            {ORBIT_TAGS.map((tag, i) => {
              const deg = ((i / ORBIT_TAGS.length) * 360 + angle) % 360;
              const rad = (deg * Math.PI) / 180;
              const x = RADIUS * Math.cos(rad);
              const y = RADIUS * Math.sin(rad);
              // Depth: items at bottom (sin>0) are "closer" → more opaque & slightly bigger
              const depth = (1 + Math.sin(rad)) / 2; // 0…1
              const opacity = 0.45 + 0.55 * depth;
              const scale  = 0.85 + 0.2 * depth;
              const zIndex = Math.round(10 + 20 * depth);

              return (
                <div
                  key={tag.label}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%)) scale(${scale})`,
                    opacity,
                    zIndex,
                    transition: "opacity 0.05s, transform 0.05s",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    whiteSpace: "nowrap",
                    fontSize: "0.63rem",
                    fontFamily: "var(--mono)",
                    fontWeight: 600,
                    padding: "4px 10px",
                    borderRadius: 20,
                    background: "#fff",
                    color: "var(--text-mid)",
                    border: "1px solid var(--border-light)",
                    boxShadow: `0 ${2 + 4 * depth}px ${8 + 8 * depth}px rgba(0,0,0,${0.04 + 0.08 * depth})`,
                    cursor: "default",
                    userSelect: "none",
                  }}
                >
                  {tag.logo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={tag.logo}
                      alt=""
                      width={13}
                      height={13}
                      style={{ objectFit: "contain", flexShrink: 0 }}
                    />
                  )}
                  {tag.label}
                </div>
              );
            })}

            {/* Center: circular profile photo with pulse rings */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 30,
              }}
            >
              {/* Outer pulse ring */}
              <div
                style={{
                  position: "absolute",
                  inset: -8,
                  borderRadius: "50%",
                  border: "1px solid rgba(37,99,235,0.18)",
                  animation: "hero-ping 2.4s ease-out infinite",
                }}
              />
              {/* Inner pulse ring */}
              <div
                style={{
                  position: "absolute",
                  inset: -4,
                  borderRadius: "50%",
                  border: "1px solid rgba(37,99,235,0.12)",
                  animation: "hero-ping 2.4s ease-out infinite 0.6s",
                }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://media.licdn.com/dms/image/v2/D4D03AQGLRfIttnbNkA/profile-displayphoto-scale_400_400/B4DZrLOHGnG8Ag-/0/1764346067628?e=1776902400&v=beta&t=SBczeajmRTKGsCVbCaaun0QQD1NfASdxhaz7k8tcB6M"
                alt="Fernando Ott"
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "4px solid #fff",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.06)",
                  display: "block",
                }}
              />
            </div>
          </div>

          {/* Floating info cards */}
          <div
            className="photo-card"
            style={{
              position: "absolute",
              background: "#fff",
              border: "1px solid var(--border-light)",
              borderRadius: 12,
              padding: "10px 16px",
              fontSize: "0.78rem",
              boxShadow: "0 8px 32px rgba(0,0,0,0.07)",
              zIndex: 40,
              whiteSpace: "nowrap",
              bottom: 16,
              left: 0,
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
              boxShadow: "0 8px 32px rgba(0,0,0,0.07)",
              zIndex: 40,
              whiteSpace: "nowrap",
              top: 24,
              right: 0,
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
              boxShadow: "0 8px 32px rgba(0,0,0,0.07)",
              zIndex: 40,
              whiteSpace: "nowrap",
              bottom: 80,
              right: 0,
              color: "var(--text-mid)",
            }}
          >
            Curitiba, Brazil · Remote
          </div>
        </div>
      </div>

      <style>{`
        @keyframes hero-ping {
          0%   { transform: scale(1);   opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @media (max-width: 860px) {
          .hero-in { grid-template-columns: 1fr !important; text-align: center; }
          .hero-photo { order: -1; margin-bottom: 1rem; }
          .photo-card { display: none !important; }
        }
      `}</style>
    </section>
  );
}
