# CANO Tutorial Ecosystem Design

## Purpose

Create a cross-platform, cloneable tutorial production system for Claude Code and Codex. The system produces screen tutorials, avatar segments, VideoVox explanations and hybrid short/long compositions without duplicating Factory V5.

## Repository boundaries

1. Screen skill owns deterministic browser actions, capture manifests, traces and privacy redaction.
2. HeyGen skill owns avatar profiles, segmented provider jobs, cost estimates and provider manifests.
3. VideoVox remains an independent visual explainer provider and will later expose a universal scene adapter.
4. Composer owns timelines, safe zones, captions, audio and render plans.
5. Suite owns orchestration, checkpoints and local installation only.

## Safety

Mock mode is the default. Secrets, sessions, private avatar identifiers and outputs never enter Git. Live network/provider actions require explicit flags and human approval.

## Cross-platform

Node.js 20+ is the common runtime. Paths are portable. macOS uses bash/zsh and Keychain-compatible environment loading; Windows uses PowerShell 7 and Credential Manager-compatible environment loading. iOS is a review surface, not a render runtime.
