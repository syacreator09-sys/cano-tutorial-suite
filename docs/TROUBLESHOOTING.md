# Solución de problemas

## `doctor` no encuentra un repositorio

Confirma que los cinco repositorios sean carpetas hermanas o corrige la ruta en `config/suite.local.json`.

## Falta el ejecutable de un skill

Actualiza el repositorio correspondiente desde `main` y ejecuta `npm install` y `npm run verify` dentro de ese repositorio.

## Playwright no encuentra Chromium

```bash
cd ../cano-screen-tutorial-skill
npx playwright install chromium
node bin/cano-screen.js doctor
```

## HeyGen indica que faltan llaves o IDs

Configura localmente:

```text
HEYGEN_API_KEY
HEYGEN_AVATAR_ID
HEYGEN_VOICE_ID
```

No los escribas en requests ni los subas a GitHub.

## FFmpeg no aparece

Instala FFmpeg en el sistema y confirma:

```bash
ffmpeg -version
ffprobe -version
```

Después ejecuta `cano-compose doctor`.

## VideoVox no encuentra el job

El comando live requiere que exista `src/data/<jobSlug>.json` dentro de `cano-video-vox`. Prepara primero los assets y el job en ese repositorio.

## El compositor no encuentra assets

`prepare` crea rutas de ejemplo. Copia o enlaza los MP4/WEBM/PNG reales y actualiza `composition-request.json` antes de usar `--live`.

## Live está bloqueado por una aprobación

Activa únicamente la aprobación necesaria en `config/suite.local.json`. No habilites todas por comodidad.

## Un trabajo quedó en `FAILED`

Consulta:

```bash
node bin/cano-tutorial.js status PROJECT_ID
```

Corrige la etapa y vuelve a ejecutar el workflow. El estado previo queda disponible para diagnóstico.

## Windows no ejecuta el script

Usa PowerShell 7 y habilita solo la sesión actual:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
```

## No se deben usar GitHub Actions

La verificación oficial es local:

```bash
npm run verify
```

El auditor de release bloquea workflows rastreados bajo `.github/workflows/`.
