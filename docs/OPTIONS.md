# Functional Options

## Commands

| Command | Purpose |
|---|---|
| `cano-tutorial doctor` | Resolve local sibling-skill paths and platform information |
| `cano-tutorial plan request.json` | Route short/long format and create approval gates |
| `cano-tutorial run request.json --mock` | Create resumable mock job state without live providers |

## Supported request formats

- `tutorial_short`
- `tutorial_extended`
- `youtube_tutorial`
- `youtube_explainer`
- `avatar_visual_short`
- `avatar_vox_short`

## Skill registry

The suite resolves sibling repositories by environment variables or adjacent folders:

```text
CANO_SCREEN_SKILL_PATH
CANO_HEYGEN_SKILL_PATH
CANO_VOX_SKILL_PATH
CANO_COMPOSER_SKILL_PATH
```

## Approval gates

- live browser access
- provider spending
- identity use
- publication

All begin disabled.

## Current limits

- Version 0.1 validates, routes and creates mock job state.
- Live cross-repository execution, resume logic, VideoVox scene adapter and real media rendering are the next milestones.
- iOS is a review/control surface; rendering runs on macOS, Windows or approved remote infrastructure.
