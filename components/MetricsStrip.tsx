"use client";

const metrics = [
  { value: "16+", label: "Years Engineering" },
  { value: "4+", label: "Years AI/ML in Prod" },
  { value: "20-30h", label: "Saved / Client / Week" },
  { value: "14×", label: "Search Speed Boost" },
  { value: "2×", label: "Sales Conversion Lift" },
];

export function MetricsStrip() {
  return (
    <section style={{ paddingTop: 0, maxWidth: 1180, margin: "0 auto", padding: "0 2rem" }}>
      <div
        className="reveal metrics-strip"
        style={{
          background: "var(--bg-dark)",
          borderRadius: 16,
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          overflow: "hidden",
        }}
      >
        {metrics.map((m, i) => (
          <div
            key={m.label}
            style={{
              padding: "2rem 1.5rem",
              textAlign: "center",
              borderRight:
                i < metrics.length - 1
                  ? "1px solid rgba(255,255,255,0.06)"
                  : "none",
              transition: "background 0.3s",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.background =
                "rgba(255,255,255,0.03)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.background =
                "transparent";
            }}
          >
            <div
              style={{
                fontFamily: "var(--serif)",
                fontSize: "2.2rem",
                color: "#fff",
                letterSpacing: "-0.02em",
              }}
            >
              {m.value}
            </div>
            <div
              style={{
                fontSize: "0.72rem",
                color: "rgba(255,255,255,0.45)",
                marginTop: 4,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {m.label}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 700px) {
          .metrics-strip {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .metrics-strip > div:nth-child(5) {
            grid-column: span 2;
          }
        }
      `}</style>
    </section>
  );
}
