# Local Setup for Cano

## Repository layout

Clone the five repositories as siblings under one directory. The four new repositories install from `main`; `cano-video-vox` remains independent until its scene adapter is added.

## macOS

```bash
git clone https://github.com/syacreator09-sys/cano-tutorial-suite.git
cd cano-tutorial-suite
chmod +x scripts/clone-suite-macos.sh
./scripts/clone-suite-macos.sh
```

## Windows 11 / PowerShell 7

```powershell
git clone https://github.com/syacreator09-sys/cano-tutorial-suite.git
cd cano-tutorial-suite
Set-ExecutionPolicy -Scope Process Bypass
.\scripts\clone-suite-windows.ps1
```

Both installers clone or update sibling repositories, install dependencies, run `npm run verify` locally and install Chromium for Playwright. No GitHub Actions workflows are used.

## Private HeyGen configuration

In `cano-heygen-presenter-skill`, copy:

```text
profiles/example.profile.json -> profiles/cano.local.json
```

Set these only in the local shell, Keychain/Credential Manager loader or an ignored local environment file:

```text
HEYGEN_API_KEY
HEYGEN_AVATAR_ID
HEYGEN_VOICE_ID
```

Do not commit `cano.local.json` or any real identifiers.

## Browser authorization

In `cano-screen-tutorial-skill`:

```bash
node bin/cano-screen.js auth https://YOUR-TOOL/login your-tool
```

After login, reference the generated file in a request:

```json
{
  "storageStatePath": ".runtime/sessions/your-tool.json"
}
```

## Safe first run

```bash
cd ../cano-tutorial-suite
node bin/cano-tutorial.js run examples/image-generator-short.request.json --mock
```

Live browser capture, identity use, provider spending and publication remain separate approval steps.
