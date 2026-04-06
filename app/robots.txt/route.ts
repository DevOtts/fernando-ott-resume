import { NextResponse } from "next/server";

export function GET() {
  return new NextResponse(
    `# Allow all crawlers
User-agent: *
Allow: /

# Explicitly allow AI search engine bots for GEO (Generative Engine Optimization)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Bingbot
Allow: /

User-agent: BingPreview
Allow: /

Sitemap: https://fernandoott.com/sitemap.xml
`,
    {
      headers: { "Content-Type": "text/plain" },
    }
  );
}
