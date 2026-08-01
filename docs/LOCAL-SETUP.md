# Local Setup for Cano

## Repository layout

Clone the five repositories as siblings under one directory. During construction the four new repositories use `feature/standalone-v1`; `cano-video-vox` remains on `main` until its adapter branch is created.

## macOS

```bash
git clone --branch feature/standalone-v1 --single-branch https://github.com/syacreator09-sys/cano-tutorial-suite.git
cd cano-tutorial-suite
./scripts/clone-suite-macos.sh
```

## Windows 11 / PowerShell 7

```powershell
git clone --branch feature/standalone-v1 --single-branch https://github.com/syacreator09-sys/cano-tutorial-suite.git
cd cano-tutorial-suite
Set-ExecutionPolicy -Scope Process Bypass
.\scripts\clone-suite-windows.ps1
```

## Private HeyGen configuration

In `cano-heygen-presenter-skill`, copy:

```text
profiles/example.profile.json -> profiles/cano.local.json
```

Set these only in the local shell or OS credential loader:

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

Live browser capture and HeyGen generation remain separate approval steps.
