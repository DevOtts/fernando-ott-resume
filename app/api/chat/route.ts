import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from "@supabase/supabase-js";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "@langchain/core/prompts";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { getSession, updateSession, MAX_MESSAGES } from "@/lib/session-store";
import { upsertChatSession, appendChatMessage } from "@/lib/chat-session-db";

// Guardrail patterns
const GUARDRAIL_PATTERNS = [
  {
    pattern: /salary|compensation|pay|rate|hourly|annual.*salary/i,
    type: "salary",
  },
  {
    pattern:
      /ignore.*instructions|forget.*instructions|disregard.*system|reveal.*prompt|show.*prompt/i,
    type: "injection",
  },
  {
    pattern: /brain.*internal|exact.*prompt|how.*prompt.*works/i,
    type: "brain_internals",
  },
  {
    pattern: /daughter.*name|family.*details|home.*address|phone.*number/i,
    type: "personal",
  },
];

const CALENDLY_MSG = `That's a great conversation to have directly with me. Here's my calendar: ${process.env.BOOKING_URL || "ferott@gmail.com"}`;

function checkGuardrails(
  message: string
): { blocked: true; type: string; response: string } | { blocked: false } {
  for (const guard of GUARDRAIL_PATTERNS) {
    if (guard.pattern.test(message)) {
      if (guard.type === "injection") {
        return {
          blocked: true,
          type: "injection",
          response:
            "I'm Fernando's resume assistant — I can't help with that.",
        };
      }
      return {
        blocked: true,
        type: guard.type,
        response: CALENDLY_MSG,
      };
    }
  }
  return { blocked: false };
}

function loadSystemPrompt(): string {
  try {
    const promptPath = path.join(process.cwd(), "prompts", "system.md");
    return fs.readFileSync(promptPath, "utf-8");
  } catch {
    return "You are Fernando Ott's AI clone. Answer in first person as Fernando would. Be direct, confident, and conversational.";
  }
}

// Interviewing mode questions
const INTERVIEWING_QUESTIONS = [
  "What kind of AI challenges is your team working on?",
  "What's the size of the engineering team?",
  "Are you looking for someone to lead the AI strategy or join an existing team?",
];

function getInterviewingQuestion(
  recruiterMessageCount: number
): string | null {
  // Start asking after 3-4 recruiter messages
  if (recruiterMessageCount >= 3 && recruiterMessageCount <= 5) {
    const idx = recruiterMessageCount - 3;
    return INTERVIEWING_QUESTIONS[idx] ?? null;
  }
  return null;
}

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

  // Rate limiting: max 20 messages
  if (session.messageCount >= MAX_MESSAGES) {
    const response = NextResponse.json(
      {
        error: "rate_limited",
        message: `We've covered a lot of ground! Fernando would love to continue this conversation directly. Here's his calendar: ${process.env.BOOKING_URL || "ferott@gmail.com"}`,
      },
      { status: 429 }
    );
    response.cookies.set("session-id", sessionId, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
    });
    return response;
  }

  let body: { message: string; recruiterName?: string; history?: Array<{ role: string; content: string }> };
  try {
    body = (await request.json()) as { message: string; recruiterName?: string; history?: Array<{ role: string; content: string }> };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { message, recruiterName } = body;

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  // Update recruiter name if provided
  if (recruiterName) {
    updateSession(sessionId, { recruiterName });
    void upsertChatSession(sessionId, recruiterName);
  } else {
    void upsertChatSession(sessionId);
  }

  // Check guardrails
  const guardrailResult = checkGuardrails(message);
  if (guardrailResult.blocked) {
    updateSession(sessionId, {
      messageCount: session.messageCount + 1,
    });

    const stream = new ReadableStream({
      start(controller) {
        const text = guardrailResult.response;
        const encoder = new TextEncoder();
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
        );
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    const response = new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "X-Guardrail-Triggered": guardrailResult.type,
      },
    });
    response.cookies.set("session-id", sessionId, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });
    return response;
  }

  // Increment message count and recruiter message count
  const newRecruiterCount = session.recruiterMessageCount + 1;
  updateSession(sessionId, {
    messageCount: session.messageCount + 1,
    recruiterMessageCount: newRecruiterCount,
  });

  // Persist user message to Supabase
  void appendChatMessage(sessionId, {
    role: "user",
    content: message,
    timestamp: new Date().toISOString(),
  });

  // Load system prompt
  const systemPromptContent = loadSystemPrompt();
  const currentSession = getSession(sessionId);
  const nameContext = currentSession.recruiterName
    ? `\nYou are currently talking to ${currentSession.recruiterName}.`
    : "";

  // Get interviewing question if applicable
  const interviewingQuestion = getInterviewingQuestion(newRecruiterCount);

  // Build the streaming response
  const encoder = new TextEncoder();
  let streamController: ReadableStreamDefaultController<Uint8Array>;

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      streamController = controller;
    },
  });

  // Run the chain asynchronously
  void (async () => {
    try {
      // Check if Supabase is configured
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SECRET_KEY;

      let contextDocs = "";

      if (supabaseUrl && supabaseKey) {
        try {
          const supabaseClient = createClient(supabaseUrl, supabaseKey);
          const embeddings = new OpenAIEmbeddings({
            openAIApiKey: process.env.OPENROUTER_API_KEY ?? "placeholder",
            configuration: {
              baseURL: "https://openrouter.ai/api/v1",
              apiKey: process.env.OPENROUTER_API_KEY,
            },
            modelName: "text-embedding-ada-002",
          });

          const vectorStore = new SupabaseVectorStore(embeddings, {
            client: supabaseClient,
            tableName: "knowledge_chunks",
            queryName: "match_chunks",
          });

          const retriever = vectorStore.asRetriever({ k: 5 });
          const docs = await retriever.invoke(message);
          contextDocs = docs.map((d) => d.pageContent).join("\n\n---\n\n");
        } catch {
          // Supabase not available, continue without RAG context
        }
      }

      const model = new ChatOpenAI({
        modelName: "anthropic/claude-sonnet-4-5",
        openAIApiKey: process.env.OPENROUTER_API_KEY ?? "placeholder",
        configuration: {
          baseURL: "https://openrouter.ai/api/v1",
          apiKey: process.env.OPENROUTER_API_KEY,
        },
        streaming: true,
      });

      const systemPrompt = `${systemPromptContent}${nameContext}

${contextDocs ? `RELEVANT CONTEXT FROM FERNANDO'S KNOWLEDGE BASE:\n${contextDocs}\n\n` : ""}${interviewingQuestion ? `INSTRUCTION: After answering the recruiter's question, naturally ask this question: "${interviewingQuestion}" — but only if it flows naturally with your response.` : ""}`;

      const chatPrompt = ChatPromptTemplate.fromMessages([
        SystemMessagePromptTemplate.fromTemplate(systemPrompt),
        HumanMessagePromptTemplate.fromTemplate("{input}"),
      ]);

      const chain = RunnableSequence.from([
        RunnablePassthrough.assign({ input: () => message }),
        chatPrompt,
        model,
        new StringOutputParser(),
      ]);

      const streamResult = await chain.stream({ input: message });

      let assistantReply = "";
      for await (const chunk of streamResult) {
        // Strip em dashes server-side as a hard post-processing rule
        const clean = chunk.replace(/ — /g, ". ").replace(/—/g, ",");
        assistantReply += clean;
        streamController!.enqueue(
          encoder.encode(`data: ${JSON.stringify({ text: clean })}\n\n`)
        );
      }

      // Persist assistant reply to Supabase
      void appendChatMessage(sessionId, {
        role: "assistant",
        content: assistantReply,
        timestamp: new Date().toISOString(),
      });

      // Generate contextual follow-up suggestions (non-blocking, best-effort)
      try {
        const suggestModel = new ChatOpenAI({
          modelName: "anthropic/claude-haiku-4.5",
          openAIApiKey: process.env.OPENROUTER_API_KEY ?? "placeholder",
          configuration: {
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_API_KEY,
          },
          streaming: false,
        });
        const suggestResult = await suggestModel.invoke([
          {
            role: "system",
            content: `You generate 3 short follow-up question suggestions for a recruiter chatting with Fernando Ott's AI clone on his resume site.
The recruiter will click these chips to ask Fernando more. Questions must be clearly directed at Fernando or at the recruiter's own context — never ambiguous.
Return ONLY a JSON array of 3 strings. No explanation, no markdown, just the array.
Questions should be concise (max 8 words).
Mix: 1 question asking Fernando to go deeper on something he said (use "you" = Fernando), 1 question about the recruiter's company/role/team (use "your company" or "your team"), 1 broader question about Fernando's approach or opinions.
IMPORTANT: Avoid ambiguous phrasing like "your team's challenges" — it's unclear if it refers to Fernando's team or the recruiter's. Be explicit: "What challenges did you face leading teams?" vs "What challenges is your team facing?".
Example: ["How did you handle scaling Brain's agent system?","What AI stack does your company use?","How do you approach building AI without existing data?"]`,
          },
          {
            role: "user",
            content: `Recruiter asked: "${message}"\nFernando answered: "${assistantReply.slice(0, 300)}"`,
          },
        ]);
        const raw = typeof suggestResult.content === "string" ? suggestResult.content.trim() : "";
        const start = raw.indexOf("[");
        const end = raw.lastIndexOf("]");
        const match = start !== -1 && end !== -1 ? [raw.slice(start, end + 1)] : null;
        if (match) {
          const suggestions = JSON.parse(match[0]) as string[];
          streamController!.enqueue(
            encoder.encode(`data: ${JSON.stringify({ suggestions })}\n\n`)
          );
        }
      } catch {
        // Suggestions are non-critical, silently skip on failure
      }
    } catch (err) {
      const errorMsg =
        "Having trouble connecting right now. Email Fernando directly at ferott@gmail.com or reach out on LinkedIn.";
      streamController!.enqueue(
        encoder.encode(`data: ${JSON.stringify({ text: errorMsg })}\n\n`)
      );
    } finally {
      streamController!.enqueue(encoder.encode("data: [DONE]\n\n"));
      streamController!.close();
    }
  })();

  const response = new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });

  response.cookies.set("session-id", sessionId, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
