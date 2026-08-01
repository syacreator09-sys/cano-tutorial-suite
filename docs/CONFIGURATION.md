# Configuración de CANO Tutorial Suite

## Archivo local

Crea la configuración con:

```bash
node bin/cano-tutorial.js init
```

Se genera `config/suite.local.json`. El archivo está ignorado por Git.

También puedes partir del ejemplo:

```bash
node bin/cano-tutorial.js init --from config/suite.example.json
```

## Rutas de skills

Cada repositorio debe definir ruta y ejecutable:

```json
{
  "skills": {
    "screen": {"path": "../cano-screen-tutorial-skill", "bin": "bin/cano-screen.js"},
    "presenter": {"path": "../cano-heygen-presenter-skill", "bin": "bin/cano-heygen.js"},
    "vox": {"path": "../cano-video-vox", "bin": "scripts/render-job.mjs"},
    "composer": {"path": "../cano-hybrid-composer-skill", "bin": "bin/cano-compose.js"}
  }
}
```

Las rutas relativas se normalizan a rutas absolutas para funcionar igual en macOS y Windows.

## Modo predeterminado

```json
{
  "defaults": {
    "mode": "mock",
    "format": "tutorial_short"
  }
}
```

Mantén `mock` durante configuración y desarrollo.

## Aprobaciones

```json
{
  "approvals": {
    "liveBrowser": false,
    "providerSpend": false,
    "identityUse": false,
    "localRender": false,
    "publication": false
  }
}
```

### `liveBrowser`

Permite que Screen Tutorial visite y opere una página real con una sesión autorizada.

### `providerSpend`

Permite generar videos reales mediante HeyGen y consumir créditos.

### `identityUse`

Confirma que el avatar, Digital Twin y voz cuentan con autorización.

### `localRender`

Permite ejecutar FFmpeg y VideoVox sobre assets locales.

### `publication`

Se conserva en `false` en v0.2. La Suite no publica automáticamente.

## Variables privadas

Las llaves pertenecen al repositorio correspondiente. La Suite no necesita copiar las llaves de los proveedores.

```text
HEYGEN_API_KEY
HEYGEN_AVATAR_ID
HEYGEN_VOICE_ID
```

Las sesiones Playwright permanecen dentro de `.runtime/sessions/` del Screen Skill.

## Configuración por computadora

Cada Mac o PC conserva su propio archivo `*.local.json`. No sincronices credenciales, cookies o rutas de usuario mediante Git.

## Diagnóstico

```bash
node bin/cano-tutorial.js doctor
```

El diagnóstico comprueba:

- Node y sistema operativo;
- existencia de los cuatro repositorios;
- ejecutables esperados;
- versiones de paquetes;
- diagnóstico de Screen, HeyGen y Composer;
- disponibilidad de `render:job` en VideoVox.
