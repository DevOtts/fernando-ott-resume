-- Enable pgvector extension
create extension if not exists vector with schema public;

-- Knowledge chunks table for RAG
create table if not exists knowledge_chunks (
  id          uuid primary key default gen_random_uuid(),
  content     text not null,
  embedding   vector(1536),
  metadata    jsonb default '{}'::jsonb,
  created_at  timestamptz default now()
);

-- Index for fast cosine similarity search
create index if not exists knowledge_chunks_embedding_idx
  on knowledge_chunks
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- Leads table for exit-intent and contact captures
create table if not exists leads (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  company     text,
  intent      text check (intent in ('hiring', 'consulting')),
  message     text,
  created_at  timestamptz default now()
);

-- match_chunks function for similarity search
create or replace function match_chunks(
  query_embedding vector(1536),
  match_count     int default 5,
  similarity_threshold float default 0.5
)
returns table (
  id          uuid,
  content     text,
  metadata    jsonb,
  similarity  float
)
language plpgsql
as $$
begin
  return query
  select
    kc.id,
    kc.content,
    kc.metadata,
    1 - (kc.embedding <=> query_embedding) as similarity
  from knowledge_chunks kc
  where 1 - (kc.embedding <=> query_embedding) > similarity_threshold
  order by kc.embedding <=> query_embedding
  limit match_count;
end;
$$;
