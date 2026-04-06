"use client";

import { useState } from "react";

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
}

// Add more videos here — just the YouTube video ID and metadata
const VIDEOS: YouTubeVideo[] = [
  {
    id: "x5D24tXGcVQ",
    title: "AI Agents in Production",
    description: "Building and deploying multi-agent systems that actually work at scale.",
  },
  {
    id: "vxrO7Vs4EPA",
    title: "Otimiza AI — Episode 2",
    description: "Deep dive into AI automation strategies for real business workflows.",
  },
];

function VideoCard({ video }: { video: YouTubeVideo }) {
  const [playing, setPlaying] = useState(false);
  const thumbUrl = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;

  return (
    <div
      style={{
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid var(--border-light)",
        background: "#fff",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-3px)";
        el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
      }}
    >
      {/* Video embed area */}
      <div style={{ position: "relative", paddingBottom: "56.25%", background: "#000" }}>
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none",
              padding: 0,
              cursor: "pointer",
              background: "none",
            }}
            aria-label={`Play ${video.title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbUrl}
              alt={video.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={(e) => {
                // Fallback to hqdefault if maxresdefault not available
                (e.currentTarget as HTMLImageElement).src =
                  `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
              }}
            />
            {/* Play button overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.2)",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(0,0,0,0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(0,0,0,0.2)";
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "#FF0000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: "1rem 1.25rem 1.25rem" }}>
        <p
          style={{
            fontSize: "0.88rem",
            fontWeight: 600,
            color: "var(--text)",
            marginBottom: "0.35rem",
            lineHeight: 1.4,
          }}
        >
          {video.title}
        </p>
        <p
          style={{
            fontSize: "0.78rem",
            color: "var(--text-soft)",
            lineHeight: 1.55,
          }}
        >
          {video.description}
        </p>
      </div>
    </div>
  );
}

export function YouTubeSection() {
  return (
    <section
      className="reveal"
      style={{ padding: "4rem 2rem", maxWidth: 1180, margin: "0 auto" }}
    >
      {/* Section header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#FFF0F0",
            color: "#CC0000",
            fontSize: "0.75rem",
            fontWeight: 600,
            padding: "4px 12px",
            borderRadius: 20,
            marginBottom: "0.75rem",
            fontFamily: "var(--mono)",
          }}
        >
          ▶ YouTube · Otimiza AI
        </div>
        <h2
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            marginBottom: "0.5rem",
          }}
        >
          Sharing what I know about{" "}
          <i style={{ fontStyle: "italic", color: "var(--accent)" }}>AI</i>
        </h2>
        <p style={{ fontSize: "0.95rem", color: "var(--text-soft)", maxWidth: 520 }}>
          Practical content on building AI systems, agents, and automation — in Portuguese.{" "}
          <a
            href="https://www.youtube.com/@otimiza-ai"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 500 }}
          >
            Subscribe →
          </a>
        </p>
      </div>

      {/* Video grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {VIDEOS.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}
