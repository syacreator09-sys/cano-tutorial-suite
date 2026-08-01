# Contributing

- Use Node.js 20 or 22 and keep behavior portable across Windows, macOS and Linux.
- Preserve repository boundaries: the suite orchestrates and must not duplicate provider or renderer implementations.
- Add tests before changing routing, job state, approvals or skill-registry contracts.
- Keep mock mode functional without credentials or sibling providers.
- Never commit `.runtime/`, sessions, API keys, local profiles, generated media or customer data.
- Run `npm run verify` before opening a pull request.
- Document security, privacy, provider-cost and cross-repository compatibility impact.

Use conventional commit prefixes such as `feat:`, `fix:`, `docs:`, `test:` and `chore:`. Report vulnerabilities privately through GitHub Security Advisories or private vulnerability reporting when available.
