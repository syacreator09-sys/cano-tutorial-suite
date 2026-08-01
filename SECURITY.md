# Security Policy

## Supported versions

Security fixes are applied to the latest release and the active `main` branch.

## Reporting a vulnerability

Do not publish exploits, credentials, private sessions, avatar identifiers, customer data or generated media in a public issue. Use GitHub private vulnerability reporting or a private Security Advisory when available.

## Security boundaries

- Mock mode is the default.
- Browser access, provider spending, identity use and publication are independent human-approval gates.
- The suite delegates execution to sibling skills and must not silently expand their permissions.
- No GitHub Actions workflows are used; verification is executed locally on the operator's computers.

## Secret and job handling

- Keep keys, sessions, local profiles, source media and outputs outside Git.
- Store resumable job state under `.runtime/`.
- Use least-privilege provider credentials and demo accounts.
- Run `npm run verify` in every changed repository before integration.
- Review cross-repository versions and contract compatibility before live runs.

## Dependency review

Review advisories and current provider terms for every enabled sibling skill, browser, renderer and external service.
