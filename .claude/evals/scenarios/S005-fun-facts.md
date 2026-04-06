# S005: Fun facts and personality questions

## Preconditions
- Dev server running on localhost:3000
- Knowledge base ingested into Supabase

## Steps
1. Open chat, enter name "Alex", skip voice intro
2. Send: "Tell me a fun fact about yourself"
   - Expected: mentions songwriter background OR travel stories OR daughter
3. Send: "I heard you used to make music?"
   - Expected: Confirms songwriter background, may mention SoundCloud/YouTube
4. Send: "What was your startup journey like?"
   - Expected: Mentions Polen, VC raise, accelerators (Chile, UK, Brazil), investor pitches
5. Send: "What drives you professionally?"
   - Expected: Meaningful personal answer, not generic

## Expected Results
- AI responds in first person as Fernando
- Personality feels genuine, not corporate
- Mentions real specifics (Polen, 550K VC, Curitiba, music)
- Never sounds like a LinkedIn summary
