# S007: Exit-intent modal

## Preconditions
- Dev server running on localhost:3000
- Desktop viewport (1280x800) — this feature is desktop-only

## Steps
1. Navigate to http://localhost:3000
2. Move mouse above the top of the document viewport (simulate leaving)
3. Verify modal appears with blur overlay
4. Verify headline: "Before you go — let's stay in touch." (or similar)
5. Verify two intent buttons: "I'm hiring" and "I need AI consulting"
6. Click "I'm hiring"
7. Verify form appears: name, email, company fields
8. Fill in form: Name "John", Email "john@company.com", Company "Acme Corp"
9. Submit form
10. Verify success confirmation
11. Reload page and repeat step 2 — verify modal does NOT appear again (once per session)

## Expected Results
- Modal appears on mouse exit (desktop only)
- Both intent paths work
- Form submits without error
- Only triggers once per session
- Does NOT trigger on mobile (375x667)
