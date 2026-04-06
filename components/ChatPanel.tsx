"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { trackEvent } from "@/lib/analytics";

interface Message {
  role: "user" | "assistant";
  content: string;
  isTyping?: boolean;
}

type ChatState = "name-collection" | "voice-intro" | "chat";

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_QUESTIONS = [
  "How does Brain work?",
  "Leadership style?",
  "Biggest challenge?",
  "Why looking for new role?",
  "What are your gaps?",
];

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [chatState, setChatState] = useState<ChatState>("name-collection");
  const [recruiterName, setRecruiterName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickQs, setShowQuickQs] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      trackEvent("chat_opened");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && chatState === "chat") {
      inputRef.current?.focus();
    }
  }, [isOpen, chatState]);

  const handleNameSubmit = () => {
    const name = nameInput.trim();
    if (!name) return;
    setRecruiterName(name);
    // Skip voice intro for now — go straight to chat
    setChatState("chat");
    setMessages([
      {
        role: "assistant",
        content: `Hey ${name}! I'm Fernando's AI clone. I know his career, projects, and thinking inside out. What would you like to know?`,
      },
    ]);
  };

  const sendMessage = useCallback(
    async (text?: string) => {
      const msg = (text ?? inputValue).trim();
      if (!msg || isLoading) return;

      setInputValue("");
      setShowQuickQs(false);
      setIsLoading(true);
      trackEvent("message_sent", { question: msg });

      const userMessage: Message = { role: "user", content: msg };
      setMessages((prev) => [...prev, userMessage]);

      // Add typing indicator
      const typingMessage: Message = {
        role: "assistant",
        content: "",
        isTyping: true,
      };
      setMessages((prev) => [...prev, typingMessage]);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: msg,
            recruiterName,
            history: messages.filter((m) => !m.isTyping),
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        if (!response.body) throw new Error("No response body");

        // Remove typing indicator
        setMessages((prev) => prev.filter((m) => !m.isTyping));

        // Stream response
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedContent = "";

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "" },
        ]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;
              try {
                const parsed = JSON.parse(data) as { text?: string };
                if (parsed.text) {
                  accumulatedContent += parsed.text;
                  setMessages((prev) => {
                    const updated = [...prev];
                    const lastIdx = updated.length - 1;
                    if (lastIdx >= 0 && updated[lastIdx]?.role === "assistant") {
                      updated[lastIdx] = {
                        role: "assistant",
                        content: accumulatedContent,
                      };
                    }
                    return updated;
                  });
                }
              } catch {
                // Non-JSON line, skip
              }
            }
          }
        }
      } catch {
        setMessages((prev) => [
          ...prev.filter((m) => !m.isTyping),
          {
            role: "assistant",
            content:
              "Having trouble connecting. Email me at ferott@gmail.com or reach out on LinkedIn.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [inputValue, isLoading, messages, recruiterName]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      void sendMessage();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(6px)",
          zIndex: 200,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "all" : "none",
          transition: "opacity 0.3s",
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: "fixed",
          right: isOpen ? 0 : -500,
          top: 0,
          bottom: 0,
          width: "min(480px, 100vw)",
          background: "var(--bg)",
          borderLeft: "1px solid var(--border)",
          zIndex: 201,
          display: "flex",
          flexDirection: "column",
          transition: "right 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid var(--border-light)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
            background: "#fff",
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "var(--serif)",
                fontSize: "1.1rem",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  background: "var(--green)",
                  borderRadius: "50%",
                  animation: "pulse 2s infinite",
                  display: "inline-block",
                }}
              />
              Fernando&apos;s AI Clone
            </h3>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--text-soft)",
                marginTop: 2,
              }}
            >
              Ask anything about my experience, projects, or approach
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "1px solid var(--border)",
              width: 34,
              height: 34,
              borderRadius: 8,
              cursor: "pointer",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-soft)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.borderColor = "var(--accent)";
              btn.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.borderColor = "var(--border)";
              btn.style.color = "var(--text-soft)";
            }}
          >
            ✕
          </button>
        </div>

        {/* Name collection state */}
        {chatState === "name-collection" && (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
              gap: "1.5rem",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "1.4rem",
                  marginBottom: "0.5rem",
                }}
              >
                Hey there! 👋
              </p>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-soft)",
                  lineHeight: 1.7,
                }}
              >
                I&apos;m Fernando&apos;s AI clone. Before we chat, what&apos;s
                your name?
              </p>
            </div>
            <div
              style={{
                display: "flex",
                gap: "0.6rem",
                width: "100%",
                maxWidth: 360,
              }}
            >
              <input
                type="text"
                placeholder="Your name..."
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleNameSubmit();
                }}
                style={{
                  flex: 1,
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  padding: "10px 14px",
                  borderRadius: 10,
                  fontSize: "0.88rem",
                  fontFamily: "var(--sans)",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                autoFocus
              />
              <button
                onClick={handleNameSubmit}
                style={{
                  background: "var(--bg-dark)",
                  border: "none",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: 10,
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--sans)",
                  transition: "background 0.2s",
                }}
              >
                Let&apos;s chat →
              </button>
            </div>
          </div>
        )}

        {/* Chat state */}
        {chatState === "chat" && (
          <>
            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                scrollbarWidth: "thin",
                scrollbarColor: "var(--border) transparent",
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    maxWidth: "88%",
                    padding: "11px 15px",
                    borderRadius: 14,
                    fontSize: "0.88rem",
                    lineHeight: 1.6,
                    animation: "msgIn 0.3s ease-out",
                    ...(msg.isTyping
                      ? {
                          background: "#fff",
                          border: "1px solid var(--border-light)",
                          alignSelf: "flex-start",
                          borderBottomLeftRadius: 4,
                        }
                      : msg.role === "assistant"
                        ? {
                            background: "#fff",
                            border: "1px solid var(--border-light)",
                            alignSelf: "flex-start",
                            borderBottomLeftRadius: 4,
                            color: "var(--text-mid)",
                          }
                        : {
                            background: "var(--accent)",
                            color: "#fff",
                            alignSelf: "flex-end",
                            borderBottomRightRadius: 4,
                          }),
                  }}
                >
                  {msg.isTyping ? (
                    <div
                      style={{
                        display: "flex",
                        gap: 4,
                        padding: "4px 0",
                      }}
                    >
                      {[0, 1, 2].map((n) => (
                        <span
                          key={n}
                          style={{
                            width: 6,
                            height: 6,
                            background: "var(--text-faint)",
                            borderRadius: "50%",
                            animation: `dot 1.4s infinite both`,
                            animationDelay: `${n * 0.2}s`,
                            display: "inline-block",
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            {showQuickQs && messages.length <= 1 && (
              <div
                style={{
                  padding: "0 1.5rem 0.75rem",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.35rem",
                  flexShrink: 0,
                }}
              >
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => void sendMessage(q)}
                    style={{
                      fontSize: "0.75rem",
                      padding: "6px 12px",
                      borderRadius: 20,
                      border: "1px solid var(--border)",
                      background: "#fff",
                      color: "var(--text-soft)",
                      cursor: "pointer",
                      fontFamily: "var(--sans)",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      const btn = e.currentTarget as HTMLButtonElement;
                      btn.style.borderColor = "var(--accent)";
                      btn.style.color = "var(--accent)";
                      btn.style.background = "var(--accent-light)";
                    }}
                    onMouseLeave={(e) => {
                      const btn = e.currentTarget as HTMLButtonElement;
                      btn.style.borderColor = "var(--border)";
                      btn.style.color = "var(--text-soft)";
                      btn.style.background = "#fff";
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div
              style={{
                padding: "1rem 1.5rem",
                borderTop: "1px solid var(--border-light)",
                display: "flex",
                gap: "0.6rem",
                flexShrink: 0,
                background: "#fff",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask Fernando's clone anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                style={{
                  flex: 1,
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  padding: "10px 14px",
                  borderRadius: 10,
                  fontSize: "0.88rem",
                  fontFamily: "var(--sans)",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
              />
              <button
                onClick={() => void sendMessage()}
                disabled={isLoading || !inputValue.trim()}
                style={{
                  background: "var(--bg-dark)",
                  border: "none",
                  color: "#fff",
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  cursor: isLoading ? "not-allowed" : "pointer",
                  fontSize: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                  flexShrink: 0,
                  opacity: isLoading || !inputValue.trim() ? 0.3 : 1,
                }}
              >
                →
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
