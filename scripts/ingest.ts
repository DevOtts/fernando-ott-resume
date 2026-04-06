import * as fs from "fs";
import * as path from "path";
import { createClient } from "@supabase/supabase-js";

// Load env vars from .env.local
function loadEnv() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const value = trimmed.slice(eqIdx + 1).trim();
      if (key && !process.env[key]) {
        process.env[key] = value;
      }
    }
  }
}

loadEnv();

interface Chunk {
  content: string;
  metadata: {
    source: string;
    chunk_index: number;
  };
}

function chunkText(
  text: string,
  chunkSize = 800,
  overlap = 160
): string[] {
  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    chunks.push(text.slice(start, end).trim());
    start += chunkSize - overlap;
  }

  return chunks.filter((c) => c.length > 50);
}

async function embedText(text: string): Promise<number[]> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY not set");

  const response = await fetch("https://openrouter.ai/api/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "text-embedding-ada-002",
      input: text,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Embedding API error: ${response.status} ${err}`);
  }

  const data = (await response.json()) as {
    data: Array<{ embedding: number[] }>;
  };
  const embedding = data.data[0]?.embedding;
  if (!embedding) throw new Error("No embedding returned");
  return embedding;
}

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("❌ NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const knowledgeDir = path.join(process.cwd(), "knowledge");
  const files = fs
    .readdirSync(knowledgeDir)
    .filter((f) => f.endsWith(".md"));

  console.log(`📚 Found ${files.length} knowledge files: ${files.join(", ")}`);

  // Clear existing chunks
  console.log("🗑️  Clearing existing knowledge chunks...");
  const { error: deleteError } = await supabase
    .from("knowledge_chunks")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000"); // delete all

  if (deleteError) {
    console.warn("Warning: Could not clear existing chunks:", deleteError.message);
  }

  let totalChunks = 0;

  for (const file of files) {
    const filePath = path.join(knowledgeDir, file);
    const content = fs.readFileSync(filePath, "utf-8");

    console.log(`\n📄 Processing ${file} (${content.length} chars)...`);

    const chunks = chunkText(content);
    console.log(`   Created ${chunks.length} chunks`);

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      if (!chunk) continue;

      process.stdout.write(`   Embedding chunk ${i + 1}/${chunks.length}...`);

      try {
        const embedding = await embedText(chunk);

        const { error } = await supabase.from("knowledge_chunks").insert({
          content: chunk,
          embedding,
          metadata: {
            source: file,
            chunk_index: i,
          },
        });

        if (error) {
          console.error(`\n   ❌ Failed to insert chunk ${i + 1}:`, error.message);
        } else {
          process.stdout.write(" ✓\n");
          totalChunks++;
        }

        // Rate limiting: small delay between embeddings
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (err) {
        console.error(`\n   ❌ Error embedding chunk ${i + 1}:`, err);
      }
    }
  }

  console.log(`\n✅ Ingestion complete! ${totalChunks} chunks upserted into Supabase.`);
}

main().catch((err: unknown) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
