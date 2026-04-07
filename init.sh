#!/bin/bash
set -e

echo "=== Fernando Ott Resume — Environment Setup ==="

# Install dependencies
echo "Installing dependencies..."
pnpm install

# Check required env vars
echo "Checking environment variables..."
REQUIRED_VARS=("OPENROUTER_API_KEY" "ELEVENLABS_API_KEY" "ELEVENLABS_VOICE_ID")
MISSING=()
for var in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!var}" ]; then
    MISSING+=("$var")
  fi
done

if [ ${#MISSING[@]} -gt 0 ]; then
  echo "WARNING: Missing required env vars: ${MISSING[*]}"
  echo "Copy .env.example to .env.local and fill in the values."
else
  echo "Core env vars present ✓"
fi

OPTIONAL_VARS=("CALENDLY_URL" "LANGSMITH_API_KEY" "NEXT_PUBLIC_SUPABASE_URL" "NEXT_PUBLIC_POSTHOG_KEY")
for var in "${OPTIONAL_VARS[@]}"; do
  if [ -z "${!var}" ]; then
    echo "OPTIONAL (not set): $var"
  fi
done

# Start dev server
echo ""
echo "Starting dev server..."
pnpm dev &
DEV_PID=$!

echo "Waiting for server on localhost:3000..."
for i in $(seq 1 30); do
  if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "Server ready at http://localhost:3000 ✓"
    break
  fi
  sleep 1
done

echo ""
echo "=== Setup complete ==="
echo "Dev server PID: $DEV_PID"
echo ""
echo "Available commands:"
echo "  pnpm dev        — Start dev server"
echo "  pnpm build      — Production build"
echo "  pnpm ingest     — Re-embed knowledge base into Supabase"
echo "  pnpm lint       — Run ESLint"
echo "  pnpm typecheck  — Run TypeScript check"
