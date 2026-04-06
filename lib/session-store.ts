interface SessionData {
  messageCount: number;
  voiceUsed: boolean;
  history: Array<{ role: "user" | "assistant"; content: string }>;
  recruiterName?: string;
  recruiterMessageCount: number;
}

// In-memory session store (acceptable for this scale)
const sessions = new Map<string, SessionData>();

export function getSession(sessionId: string): SessionData {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      messageCount: 0,
      voiceUsed: false,
      history: [],
      recruiterMessageCount: 0,
    });
  }
  return sessions.get(sessionId)!;
}

export function updateSession(
  sessionId: string,
  updates: Partial<SessionData>
): void {
  const session = getSession(sessionId);
  sessions.set(sessionId, { ...session, ...updates });
}

export const MAX_MESSAGES = 20;
