# CANO Tutorial Ecosystem Clone-Ready v0.2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans task-by-task.

**Goal:** Deliver guided setup, richer diagnostics and opt-in live execution across Screen, HeyGen, Composer and Suite while preserving isolated repositories and local-only verification.

**Architecture:** Each standalone CLI owns its provider/runtime and local configuration. The suite invokes sibling CLIs as child processes using explicit request files and approval flags. Configuration and runtime state are ignored by Git.

**Tech Stack:** Node.js 20/22, Playwright 1.62, HeyGen REST API, FFmpeg/ffprobe, Node test runner, local release auditor.

## Global Constraints

- Do not add GitHub Actions.
- Do not commit secrets, sessions, private profiles or generated media.
- Mock remains the default.
- Live browser, identity, spend, render and publication are separate approvals.
- All paths must work on macOS and Windows.

---

### Task 1: Screen v0.2

- [ ] Add guided local configuration and seed-file mode.
- [ ] Add help/version/config/doctor output.
- [ ] Add `type`, `select` and `pause` actions.
- [ ] Apply persistent visual redaction, action coordinates and recorded-video path.
- [ ] Update schemas, examples, tests and troubleshooting documentation.

### Task 2: HeyGen v0.2

- [ ] Add guided local profile/configuration and provider discovery.
- [ ] Add explicit spend approval and configured cost ceiling.
- [ ] Poll video status and download completed segments.
- [ ] Add retries, timeout handling, manifests and tests.
- [ ] Update provider, consent, troubleshooting and configuration docs.

### Task 3: Composer v0.2

- [ ] Add guided local renderer/theme configuration.
- [ ] Add ffmpeg/ffprobe doctor checks and asset validation.
- [ ] Build deterministic FFmpeg segment and concat plans.
- [ ] Execute local FFmpeg rendering only with explicit approval.
- [ ] Update tests, examples and renderer troubleshooting docs.

### Task 4: Suite v0.2

- [ ] Add guided sibling-path/default/approval configuration.
- [ ] Add compatibility doctor and local version checks.
- [ ] Add real child-process orchestration with resumable checkpoints.
- [ ] Add request templates for mock and live pilot jobs.
- [ ] Add public-release, configuration and troubleshooting documentation.

### Task 5: Verification and integration

- [ ] Run each repository's unit tests, syntax check and release audit locally from reconstructed source.
- [ ] Confirm tracked trees contain no workflow, private configuration or runtime artifacts.
- [ ] Open reviewable PRs with exact live limitations.
- [ ] Merge only after fresh verification evidence.
