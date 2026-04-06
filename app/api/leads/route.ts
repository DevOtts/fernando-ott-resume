import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

interface LeadPayload {
  name: string;
  email: string;
  company?: string;
  intent: "hiring" | "consulting";
  message?: string;
}

export async function POST(request: NextRequest) {
  // Validate Content-Type
  const contentType = request.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
  }

  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, company, intent, message } = body;

  // Validate required fields
  if (!name || !email || !intent) {
    return NextResponse.json(
      { error: "name, email, and intent are required" },
      { status: 400 }
    );
  }

  if (!["hiring", "consulting"].includes(intent)) {
    return NextResponse.json({ error: "Invalid intent" }, { status: 400 });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    // Supabase not configured — log and return success to not break UX
    console.error("Supabase not configured, lead not saved:", { name, email, company, intent });
    return NextResponse.json({ success: true });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { error: dbError } = await supabase.from("leads").insert({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    company: company?.trim() ?? null,
    intent,
    message: message?.trim() ?? null,
  });

  if (dbError) {
    console.error("Failed to save lead:", dbError);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }

  // Fire webhook notification (F027)
  const webhookUrl = process.env.LEAD_NOTIFICATION_WEBHOOK;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `New lead from Fernando's resume!\n*Name:* ${name}\n*Email:* ${email}\n*Company:* ${company ?? "not provided"}\n*Intent:* ${intent}\n*Message:* ${message ?? "none"}`,
          attachments: [
            {
              color: intent === "hiring" ? "#2563EB" : "#16A34A",
              fields: [
                { title: "Name", value: name, short: true },
                { title: "Email", value: email, short: true },
                { title: "Company", value: company ?? "—", short: true },
                { title: "Intent", value: intent, short: true },
              ],
            },
          ],
        }),
      });
    } catch {
      // Webhook failure is non-critical — don't fail the request
    }
  }

  return NextResponse.json({ success: true });
}
