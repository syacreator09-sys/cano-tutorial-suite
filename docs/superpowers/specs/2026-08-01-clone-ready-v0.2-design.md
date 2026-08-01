# CANO Tutorial Ecosystem Clone-Ready v0.2 Design

## Goal

Turn the four standalone repositories and the suite into guided, independently cloneable tools for macOS and Windows. A new user must be able to install, configure, diagnose and run a safe mock job without reading source code. Live browser, avatar-provider, identity, rendering and publication operations remain explicit opt-in gates.

## Repository boundaries

1. `cano-screen-tutorial-skill` owns browser sessions, deterministic actions, recording, screenshots, traces, cursor coordinates and visual redaction.
2. `cano-heygen-presenter-skill` owns local avatar profiles, provider discovery, segmented generation, polling, download, cost limits and identity approval.
3. `cano-video-vox` remains an independent visual provider; this release only validates its local path and future adapter boundary.
4. `cano-hybrid-composer-skill` owns universal scene timelines, safe zones, asset checks and a local FFmpeg MVP renderer.
5. `cano-tutorial-suite` owns installation, guided configuration, compatibility checks, approvals, checkpoints and cross-repository process execution.

## Clone-ready experience

Every repository exposes `--help`, `--version`, `init`, `doctor`, `verify` and a safe mock example. Interactive setup writes only ignored local configuration. Each wizard also accepts a non-interactive JSON seed for repeatable computer setup.

## Safety

- No GitHub Actions workflows.
- No telemetry or maintainer-operated cloud service.
- No secrets, browser state, private avatar IDs, source media or generated outputs in Git.
- Browser, identity, provider spend, render and publication approvals remain independent.
- Live actions stop on CAPTCHA, access-control or missing authorization rather than attempting evasion.

## Public release model

Code and generic examples are MIT licensed. Cano Digital, LUZYA, Cano's likeness, voice, Digital Twin, private themes and training media are excluded from the code license. Public users configure their own providers, identities, branding and accounts.

## Compatibility

- Node.js 20 or 22.
- macOS with bash/zsh.
- Windows 11 with PowerShell 7.
- Playwright 1.62-compatible browser capture.
- HeyGen v2 generation plus v1 status polling as documented by HeyGen.
- FFmpeg/ffprobe for the local composer MVP.
- iOS remains a control/review surface; media execution runs on macOS, Windows or approved remote infrastructure.
