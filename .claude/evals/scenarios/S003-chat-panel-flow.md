# S003: Chat panel — full recruiter flow

## Preconditions
- Dev server running on localhost:3000
- OPENROUTER_API_KEY set in .env.local
- ELEVENLABS_API_KEY + ELEVENLABS_VOICE_ID set in .env.local

## Steps
1. Navigate to http://localhost:3000
2. Click "Talk to My AI Clone" button in nav
3. Verify slide-in panel appears from right with smooth animation
4. Verify name input state: field + confirm button, no chat messages yet
5. Type "Sarah" into name field and click confirm (or press Enter)
6. Verify orbital component appears with orbiting tech tags
7. Wait 5 seconds — verify Skip button appears
8. Click Skip
9. Verify orbital fades out
10. Verify welcome text message appears: "Hey Sarah, ..."
11. Verify quick-question chips appear
12. Type "How does Brain work?" and press Enter
13. Verify typing indicator appears
14. Verify streamed response appears incrementally
15. Verify auto-scroll follows new content

## Expected Results
- Panel opens/closes smoothly
- Name collection works
- Voice intro shows orbital, skip works
- Chat responds with relevant Brain architecture info
- Responses stream (not appear all at once)
