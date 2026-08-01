# AGENTS.md

This repository is `@cano/tutorial-suite`.

1. Read `README.md`, `SECURITY.md`, `PRIVACY.md`, `USAGE_POLICY.md` and `SKILL.md` before changing behavior.
2. Use Node.js 20+ and portable paths via `node:path` and `node:os`.
3. Preserve repository boundaries; the suite orchestrates and must not duplicate sibling implementations.
4. Keep browser access, provider spending, identity use and publication disabled until explicitly approved.
5. Preserve JSON contracts and add tests before changing routing or job state.
6. Do not commit sessions, API keys, private profiles, source media, outputs or customer data.
7. Do not add GitHub Actions workflows; verification runs locally on the operator's computers.
8. Run `npm run verify` before completion and require the same in changed sibling repositories.
