import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

/** Upsert session row — called as soon as we have a session_id */
export async function upsertChatSession(
  sessionId: string,
  recruiterName?: string
): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  await supabase.from("chat_sessions").upsert(
    {
      session_id: sessionId,
      ...(recruiterName ? { recruiter_name: recruiterName } : {}),
      last_active_at: new Date().toISOString(),
    },
    { onConflict: "session_id", ignoreDuplicates: false }
  );
}

/** Append a message to the session and increment message_count */
export async function appendChatMessage(
  sessionId: string,
  message: ChatMessage
): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  // Use a raw RPC call to atomically append to the JSONB array
  await supabase.rpc("append_chat_message", {
    p_session_id: sessionId,
    p_message: message,
  });
}
