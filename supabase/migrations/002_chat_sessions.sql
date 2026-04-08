-- Chat sessions table for funnel tracking and conversation analytics
create table if not exists chat_sessions (
  id            uuid primary key default gen_random_uuid(),
  session_id    text not null unique,
  recruiter_name text,
  started_at    timestamptz default now(),
  last_active_at timestamptz default now(),
  message_count int default 0,
  messages      jsonb default '[]'::jsonb
);

-- Index for querying by session_id
create index if not exists chat_sessions_session_id_idx
  on chat_sessions (session_id);

-- Index for time-based funnel queries
create index if not exists chat_sessions_started_at_idx
  on chat_sessions (started_at desc);

-- Atomic function to append a message and increment count
create or replace function append_chat_message(
  p_session_id text,
  p_message    jsonb
)
returns void
language plpgsql
as $$
begin
  update chat_sessions
  set
    messages       = messages || p_message,
    message_count  = message_count + 1,
    last_active_at = now()
  where session_id = p_session_id;
end;
$$;
