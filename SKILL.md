---
name: cano-tutorial-suite
summary: Orchestrate screen capture, HeyGen presenter, VideoVox and hybrid composition into reviewable short and long tutorial jobs.
triggers:
  - crea un tutorial completo
  - produce tutorial con mi avatar
  - genera youtube largo y short
---

# CANO Tutorial Suite

1. Validate and plan the request.
2. Resolve local skill paths from `config/skills.local.json` or environment variables.
3. Execute mock mode by default.
4. Require explicit operator approval before browser sessions, HeyGen spending, publication or private identity use.
5. Persist resumable job state under `.runtime/jobs/<job-id>/`.
