# CANO Tutorial Suite

One CLI to plan and orchestrate short and long tutorials across four isolated skills:

- `cano-screen-tutorial-skill`
- `cano-heygen-presenter-skill`
- `cano-video-vox`
- `cano-hybrid-composer-skill`

Version 0.1 is construction-safe: it validates requests, creates deterministic jobs and executes mock adapters. Live provider execution remains opt-in per skill.

```bash
node bin/cano-tutorial.js doctor
node bin/cano-tutorial.js plan examples/image-generator-short.request.json
node bin/cano-tutorial.js run examples/image-generator-short.request.json --mock
```
