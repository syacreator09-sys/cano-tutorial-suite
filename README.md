# CANO Tutorial Suite

One CLI to plan and orchestrate short and long tutorials across four isolated skills:

- `cano-screen-tutorial-skill`
- `cano-heygen-presenter-skill`
- `cano-video-vox`
- `cano-hybrid-composer-skill`

Version 0.1 validates requests, creates deterministic jobs and executes mock adapters. Live browser access, identity use, provider spending and publication remain opt-in approval gates.

## Clone on macOS

```bash
git clone https://github.com/syacreator09-sys/cano-tutorial-suite.git
cd cano-tutorial-suite
chmod +x scripts/clone-suite-macos.sh
./scripts/clone-suite-macos.sh
```

## Clone on Windows 11

```powershell
git clone https://github.com/syacreator09-sys/cano-tutorial-suite.git
cd cano-tutorial-suite
Set-ExecutionPolicy -Scope Process Bypass
.\scripts\clone-suite-windows.ps1
```

The installers clone sibling repositories, install dependencies, execute local verification and install Chromium for Playwright. No GitHub Actions workflows are used.

## Safe first run

```bash
node bin/cano-tutorial.js doctor
node bin/cano-tutorial.js plan examples/image-generator-short.request.json
node bin/cano-tutorial.js run examples/image-generator-short.request.json --mock
```

## Documentation

- [Local setup](docs/LOCAL-SETUP.md)
- [Functional options](docs/OPTIONS.md)
- [Architecture design](docs/superpowers/specs/2026-07-31-cano-tutorial-ecosystem-design.md)
- [Implementation plan](docs/superpowers/plans/2026-07-31-cano-tutorial-ecosystem.md)
- [Security](SECURITY.md)
- [Privacy](PRIVACY.md)
- [Responsible use](USAGE_POLICY.md)
- [Brand and identity rights](BRAND_AND_IDENTITY.md)
- [Third-party notices](THIRD_PARTY_NOTICES.md)
- [Contributing](CONTRIBUTING.md)
- [MIT License](LICENSE)
