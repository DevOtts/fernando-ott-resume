# S006: Recruiter interviewing mode

## Preconditions
- Dev server running on localhost:3000
- OPENROUTER_API_KEY set

## Steps
1. Open chat, enter name "Maria", skip voice intro
2. Send 4 messages in a row:
   - "What's your experience with LangChain?"
   - "How long have you been doing AI work?"
   - "What's your management style?"
   - "What kind of role are you looking for?"
3. After the 4th response, verify the AI asks a question back about the recruiter's company
4. Verify the question feels natural (not interrogating)
5. Verify only 1 question is asked per response

## Expected Results
- After ~3-4 exchanges, AI asks something like "What kind of AI challenges is your team working on?"
- The question is soft and curious, not aggressive
- Only 1 question per message
- If recruiter ignores it, AI doesn't repeat the same question
