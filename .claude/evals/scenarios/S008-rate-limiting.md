# S008: Session rate limiting

## Preconditions
- Dev server running on localhost:3000
- OPENROUTER_API_KEY set

## Steps
1. Open chat, enter name "Tester", skip voice intro
2. Send 20 messages (can be quick: "1", "2", "3"... etc.)
3. Verify all 20 messages get responses
4. Attempt to send a 21st message
5. Verify input is disabled or shows a message with Calendly CTA
6. Verify voice intro does NOT replay if chat panel is closed and reopened

## Expected Results
- 20 messages work normally
- 21st message blocked with a helpful message and booking link
- Rate limit is per-session, not per-page-reload within same session
- Voice intro fires only once per session
