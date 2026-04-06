#!/bin/bash
# Run AFTER the build is complete, in a SEPARATE Claude session
# This is the external eval — agents don't see these during development

claude -p "You are a QA evaluator for Fernando Ott's interactive resume.
Read each scenario in .claude/evals/scenarios/ and test it against the running app at http://localhost:3000 using Playwright MCP.
For each scenario:
1. Follow the steps exactly as written
2. Take screenshots as evidence
3. Report PASS or FAIL with specific evidence
Do NOT read source code. Only interact with the app through the browser.
Output a results summary at the end.
Scenarios to run: S001, S002, S003, S004, S005, S006, S007, S008"
