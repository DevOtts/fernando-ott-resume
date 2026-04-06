"use client";

import { useState, useEffect, useCallback } from "react";
import { trackEvent } from "@/lib/analytics";

type Intent = "hiring" | "consulting";
type ModalState = "intent" | "form" | "submitted";

export function ExitIntentModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [modalState, setModalState] = useState<ModalState>("intent");
  const [selectedIntent, setSelectedIntent] = useState<Intent | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const showModal = useCallback(() => {
    // Only show on desktop (window width > 768px)
    if (window.innerWidth <= 768) return;

    // Only show once per session
    if (sessionStorage.getItem("exit-intent-shown")) return;

    sessionStorage.setItem("exit-intent-shown", "1");
    setIsVisible(true);
    trackEvent("exit_intent_shown");
  }, []);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        showModal();
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [showModal]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleIntentSelect = (intent: Intent) => {
    setSelectedIntent(intent);
    setModalState("form");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !selectedIntent) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          intent: selectedIntent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setModalState("submitted");
      trackEvent("lead_captured", { intent: selectedIntent });
    } catch {
      setError("Something went wrong. Please try again or reach out on LinkedIn.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(8px)",
          zIndex: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        {/* Modal card */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: "2.5rem",
            maxWidth: 480,
            width: "100%",
            boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
            position: "relative",
          }}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              background: "none",
              border: "1px solid var(--border)",
              width: 34,
              height: 34,
              borderRadius: 8,
              cursor: "pointer",
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-soft)",
            }}
          >
            ✕
          </button>

          {modalState === "intent" && (
            <>
              <h2
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "1.6rem",
                  letterSpacing: "-0.02em",
                  marginBottom: "0.5rem",
                  paddingRight: "2rem",
                }}
              >
                Before you go — let&apos;s stay in touch.
              </h2>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-soft)",
                  marginBottom: "2rem",
                  lineHeight: 1.6,
                }}
              >
                What brings you here today?
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button
                  onClick={() => handleIntentSelect("hiring")}
                  style={{
                    flex: 1,
                    minWidth: 160,
                    padding: "1.25rem",
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                    background: "#fff",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                    fontFamily: "var(--sans)",
                  }}
                  onMouseEnter={(e) => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.borderColor = "var(--accent)";
                    btn.style.background = "var(--accent-light)";
                  }}
                  onMouseLeave={(e) => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.borderColor = "var(--border)";
                    btn.style.background = "#fff";
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                    🎯
                  </div>
                  <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>
                    I&apos;m hiring
                  </div>
                  <div
                    style={{ fontSize: "0.8rem", color: "var(--text-soft)" }}
                  >
                    Looking for an AI lead
                  </div>
                </button>
                <button
                  onClick={() => handleIntentSelect("consulting")}
                  style={{
                    flex: 1,
                    minWidth: 160,
                    padding: "1.25rem",
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                    background: "#fff",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                    fontFamily: "var(--sans)",
                  }}
                  onMouseEnter={(e) => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.borderColor = "var(--green)";
                    btn.style.background = "var(--green-light)";
                  }}
                  onMouseLeave={(e) => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.borderColor = "var(--border)";
                    btn.style.background = "#fff";
                  }}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                    🤝
                  </div>
                  <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>
                    I need AI consulting
                  </div>
                  <div
                    style={{ fontSize: "0.8rem", color: "var(--text-soft)" }}
                  >
                    Building an AI project
                  </div>
                </button>
              </div>
            </>
          )}

          {modalState === "form" && (
            <>
              <h2
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "1.6rem",
                  letterSpacing: "-0.02em",
                  marginBottom: "0.5rem",
                  paddingRight: "2rem",
                }}
              >
                {selectedIntent === "hiring"
                  ? "Let's find out if there's a fit."
                  : "Let's talk about your project."}
              </h2>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-soft)",
                  marginBottom: "1.5rem",
                }}
              >
                Fernando will reach out within 24 hours.
              </p>
              <form onSubmit={(e) => void handleSubmit(e)}>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
                >
                  <input
                    type="text"
                    placeholder="Your name *"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                    required
                    style={{
                      padding: "10px 14px",
                      borderRadius: 8,
                      border: "1px solid var(--border)",
                      fontSize: "0.9rem",
                      fontFamily: "var(--sans)",
                      outline: "none",
                      color: "var(--text)",
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Work email *"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, email: e.target.value }))
                    }
                    required
                    style={{
                      padding: "10px 14px",
                      borderRadius: 8,
                      border: "1px solid var(--border)",
                      fontSize: "0.9rem",
                      fontFamily: "var(--sans)",
                      outline: "none",
                      color: "var(--text)",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, company: e.target.value }))
                    }
                    style={{
                      padding: "10px 14px",
                      borderRadius: 8,
                      border: "1px solid var(--border)",
                      fontSize: "0.9rem",
                      fontFamily: "var(--sans)",
                      outline: "none",
                      color: "var(--text)",
                    }}
                  />
                  {error && (
                    <p style={{ fontSize: "0.85rem", color: "var(--orange)" }}>
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      padding: "12px",
                      borderRadius: 10,
                      background: "var(--bg-dark)",
                      color: "#fff",
                      border: "none",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      fontFamily: "var(--sans)",
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      opacity: isSubmitting ? 0.7 : 1,
                      transition: "all 0.2s",
                    }}
                  >
                    {isSubmitting ? "Sending..." : "Send →"}
                  </button>
                </div>
              </form>
            </>
          )}

          {modalState === "submitted" && (
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✓</div>
              <h2
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "1.6rem",
                  letterSpacing: "-0.02em",
                  marginBottom: "0.5rem",
                }}
              >
                You&apos;re in the queue.
              </h2>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-soft)",
                  lineHeight: 1.6,
                }}
              >
                Fernando will be in touch within 24 hours. In the meantime, feel
                free to keep exploring or ask his AI clone anything.
              </p>
              <button
                onClick={handleClose}
                style={{
                  marginTop: "1.5rem",
                  padding: "10px 24px",
                  borderRadius: 8,
                  background: "var(--bg-dark)",
                  color: "#fff",
                  border: "none",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  fontFamily: "var(--sans)",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
