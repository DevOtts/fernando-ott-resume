"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { trackEvent } from "@/lib/analytics";

interface OrbitalVoiceIntroProps {
  recruiterName: string;
  onComplete: () => void;
}

const ORBITAL_TAGS = [
  "Python",
  "LangChain",
  "Next.js",
  "AWS",
  "CrewAI",
  "LangSmith",
  "MCP",
  "React",
  "Supabase",
];

// Inject keyframes once into the document head
function injectKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById("orbital-keyframes")) return;
  const style = document.createElement("style");
  style.id = "orbital-keyframes";
  style.textContent = `
    @keyframes orbit-cw  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
    @keyframes orbit-ccw { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
    @keyframes orbital-pulse {
      0%, 100% { box-shadow: 0 0 20px rgba(37,99,235,0.15); }
      50%       { box-shadow: 0 0 40px rgba(37,99,235,0.35); }
    }
  `;
  document.head.appendChild(style);
}

export function OrbitalVoiceIntro({ recruiterName, onComplete }: OrbitalVoiceIntroProps) {
  const [showSkip, setShowSkip] = useState(false);
  const [amplitude, setAmplitude] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const skipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completedRef = useRef(false);

  useEffect(() => { injectKeyframes(); }, []);

  const complete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    try { sourceRef.current?.stop(); } catch { /* already stopped */ }
    void audioCtxRef.current?.close();
    if (skipTimerRef.current) clearTimeout(skipTimerRef.current);
    setIsVisible(false);
    setTimeout(onComplete, 400);
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    trackEvent("voice_skipped");
    complete();
  }, [complete]);

  useEffect(() => {
    let cancelled = false;

    async function startVoice() {
      try {
        const res = await fetch("/api/voice-intro", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: recruiterName }),
        });

        if (!res.ok || cancelled) {
          // Voice not available — skip gracefully after a short pause so orbital is visible
          if (!cancelled) setTimeout(complete, 1500);
          return;
        }

        const arrayBuffer = await res.arrayBuffer();
        if (cancelled) return;

        const AudioContextClass =
          window.AudioContext ??
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const audioCtx = new AudioContextClass();
        audioCtxRef.current = audioCtx;

        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
        if (cancelled) { void audioCtx.close(); return; }

        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        analyserRef.current = analyser;

        const source = audioCtx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        sourceRef.current = source;

        source.onended = () => {
          if (!cancelled) {
            trackEvent("voice_completed");
            complete();
          }
        };

        source.start(0);

        // Animate amplitude
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        function loop() {
          if (cancelled || completedRef.current) return;
          analyser.getByteFrequencyData(dataArray);
          const half = Math.floor(dataArray.length / 2);
          let sum = 0;
          for (let i = 0; i < half; i++) sum += dataArray[i]!;
          const avg = sum / half;
          // 0-128 → 1.0-1.35
          setAmplitude(1 + (avg / 128) * 0.35);
          rafRef.current = requestAnimationFrame(loop);
        }
        loop();
      } catch {
        if (!cancelled) complete();
      }
    }

    void startVoice();

    skipTimerRef.current = setTimeout(() => {
      if (!cancelled && !completedRef.current) setShowSkip(true);
    }, 5000);

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (skipTimerRef.current) clearTimeout(skipTimerRef.current);
      try { sourceRef.current?.stop(); } catch { /* ok */ }
      void audioCtxRef.current?.close();
    };
  }, [recruiterName, complete]);

  const RADIUS = 95;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        gap: "1.5rem",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.4s ease-out",
      }}
    >
      {/* Orbital scene */}
      <div
        style={{
          position: "relative",
          width: 240,
          height: 240,
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

        {/* Each tag orbits on its own arm */}
        {ORBITAL_TAGS.map((tag, i) => {
          const startDeg = (i / ORBITAL_TAGS.length) * 360;
          const duration = 10 + i * 0.8; // stagger speeds slightly
          const dir = i % 2 === 0 ? "orbit-cw" : "orbit-ccw";
          const colorIdx = i % 3;
          const tagBg = colorIdx === 0 ? "var(--accent-light)" : colorIdx === 1 ? "var(--green-light)" : "var(--bg-alt)";
          const tagColor = colorIdx === 0 ? "var(--accent)" : colorIdx === 1 ? "var(--green)" : "var(--text-soft)";

          return (
            <div
              key={tag}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 0,
                height: 0,
                // Rotate the whole arm to set starting angle, then animate
                transform: `rotate(${startDeg}deg)`,
                animation: `${dir} ${duration}s linear infinite`,
              }}
            >
              {/* The tag sits at radius distance, counter-rotated so text stays upright */}
              <div
                style={{
                  position: "absolute",
                  left: RADIUS,
                  top: 0,
                  transform: `translate(-50%, -50%) rotate(-${startDeg}deg)`,
                  animation: `${dir === "orbit-cw" ? "orbit-ccw" : "orbit-cw"} ${duration}s linear infinite`,
                  whiteSpace: "nowrap",
                  fontSize: "0.62rem",
                  fontFamily: "var(--mono)",
                  fontWeight: 500,
                  padding: "3px 7px",
                  borderRadius: 4,
                  background: tagBg,
                  color: tagColor,
                  border: "1px solid var(--border-light)",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                {tag}
              </div>
            </div>
          );
        })}

        {/* Center circle — scales with audio amplitude */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: 76,
            height: 76,
            borderRadius: "50%",
            background: "var(--bg-dark)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${amplitude})`,
            transition: "transform 0.1s ease-out",
            boxShadow: `0 0 ${12 + (amplitude - 1) * 60}px rgba(37,99,235,${0.2 + (amplitude - 1) * 0.6})`,
          }}
        >
          <span
            style={{
              fontFamily: "var(--serif)",
              fontSize: "1.3rem",
              color: "#fff",
              fontStyle: "italic",
              letterSpacing: "-0.02em",
              userSelect: "none",
            }}
          >
            FO
          </span>
        </div>
      </div>

      {/* Status label */}
      <p
        style={{
          fontSize: "0.82rem",
          color: "var(--text-soft)",
          fontFamily: "var(--sans)",
          textAlign: "center",
        }}
      >
        Fernando is saying hi to {recruiterName}...
      </p>

      {/* Skip button — fades in after 5s */}
      <button
        onClick={handleSkip}
        style={{
          opacity: showSkip ? 1 : 0,
          pointerEvents: showSkip ? "all" : "none",
          transition: "opacity 0.4s ease",
          background: "transparent",
          border: "1px solid var(--border)",
          color: "var(--text-soft)",
          padding: "6px 16px",
          borderRadius: 8,
          fontSize: "0.78rem",
          cursor: "pointer",
          fontFamily: "var(--sans)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--text-soft)";
        }}
      >
        Skip intro →
      </button>
    </div>
  );
}
