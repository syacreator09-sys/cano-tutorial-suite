# CANO Tutorial Ecosystem Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver four independently cloneable skills plus one suite that produces resumable tutorial jobs on macOS and Windows.

**Architecture:** Each provider/runtime is isolated behind a JSON contract and CLI. The suite orchestrates by path/command and never duplicates provider code. Factory V5 integration is deferred until standalone validation passes.

**Tech Stack:** Node.js 20+, Playwright optional runtime, HeyGen REST API, Remotion/HyperFrames/FFmpeg future live renderer, Node test runner, GitHub Actions.

## Global Constraints

- Mock and dry-run are the default.
- No secrets, sessions, private avatar IDs, training media or outputs in Git.
- macOS and Windows must use the same JSON contracts and CLI semantics.
- Every repository must pass `npm test` and `npm run check` without provider credentials.
- Live browser/provider calls require explicit operator approval.

---

### Task 1: Screen Tutorial Standalone Baseline

**Files:** `cano-screen-tutorial-skill/src/*`, `bin/cano-screen.js`, `test/*`

**Produces:** `capture-manifest.json`, `actions.json`, optional Playwright trace/video.

- [x] Define request validation and privacy rules.
- [x] Add deterministic mock capture.
- [x] Add optional Playwright live capture.
- [x] Add macOS/Windows setup and CI.
- [x] Verify tests and syntax.

### Task 2: HeyGen Presenter Standalone Baseline

**Files:** `cano-heygen-presenter-skill/src/*`, `bin/cano-heygen.js`, `profiles/*`, `test/*`

**Produces:** segmented presenter manifest and cost estimate.

- [x] Define segmented request validation.
- [x] Add generic local profile contract.
- [x] Add dependency-free mock provider.
- [x] Add opt-in live submission adapter.
- [x] Verify tests and syntax.

### Task 3: Hybrid Composer Standalone Baseline

**Files:** `cano-hybrid-composer-skill/src/*`, `bin/cano-compose.js`, `themes/*`, `test/*`

**Produces:** compiled timeline, render plan and composition manifest.

- [x] Define universal scene types.
- [x] Compile deterministic timelines and safe zones.
- [x] Emit mock render package.
- [x] Add cross-platform setup and CI.
- [x] Verify tests and syntax.

### Task 4: Tutorial Suite Orchestration Baseline

**Files:** `cano-tutorial-suite/src/*`, `bin/cano-tutorial.js`, `recipes/*`, `test/*`

**Produces:** resumable job plan and job state.

- [x] Define tutorial request validation and routing.
- [x] Add skill registry contract.
- [x] Add deterministic mock orchestration.
- [x] Add setup scripts for sibling clones.
- [x] Verify tests and syntax.

### Task 5: Next Live Milestone

- [ ] Configure private HeyGen profile locally.
- [ ] Authorize a reusable Playwright session for one demo tool.
- [ ] Add VideoVox scene adapter on its isolated feature branch.
- [ ] Install Remotion/HyperFrames and implement real composition rendering.
- [ ] Produce and visually approve the first short and long pilot.
- [ ] Integrate approved adapters into Factory V5 on a separate branch.
