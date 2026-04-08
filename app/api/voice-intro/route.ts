import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { getSession, updateSession } from "@/lib/session-store";
import { upsertChatSession } from "@/lib/chat-session-db";

const VOICE_SCRIPT_TEMPLATE = (name: string) =>
  `Hey ${name}, I'm Fernando — or well, his AI clone. I know his career inside out, his projects, his thinking. Ask me anything — what he's built, how he leads, what gets him excited. Let's figure out if there's a fit.`;

export async function POST(request: NextRequest) {
  // Validate Content-Type
  const contentType = request.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
  }

  // Get or create session
  const cookieStore = await cookies();
  let sessionId = cookieStore.get("session-id")?.value;
  if (!sessionId) {
    sessionId = uuidv4();
  }

  const session = getSession(sessionId);

  // Rate limit: 1 voice intro per session
  if (session.voiceUsed) {
    return NextResponse.json(
      { error: "Voice intro already used for this session" },
      { status: 429 }
    );
  }

  // Check if ElevenLabs is configured
  const voiceId = process.env.ELEVENLABS_VOICE_ID;
  const apiKey = process.env.ELEVENLABS_API_KEY;

  if (!voiceId || !apiKey) {
    return NextResponse.json(
      { error: "Voice service not configured" },
      { status: 503 }
    );
  }

  let body: { name: string };
  try {
    body = (await request.json()) as { name: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name } = body;
  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const script = VOICE_SCRIPT_TEMPLATE(name.trim());

  try {
    const elevenLabsResponse = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text: script,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      }
    );

    if (!elevenLabsResponse.ok) {
      return NextResponse.json(
        { error: "Voice synthesis failed" },
        { status: 502 }
      );
    }

    // Mark voice as used and persist session with recruiter name
    updateSession(sessionId, { voiceUsed: true, recruiterName: name.trim() });
    void upsertChatSession(sessionId, name.trim());

    // Stream audio back
    const response = new NextResponse(elevenLabsResponse.body, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-cache",
      },
    });

    response.cookies.set("session-id", sessionId, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Voice synthesis failed" },
      { status: 502 }
    );
  }
}
