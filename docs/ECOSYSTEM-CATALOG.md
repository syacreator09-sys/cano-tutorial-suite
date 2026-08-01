# Catálogo del ecosistema CANO Tutorial

## `cano-tutorial-suite`

**Rol:** orquestador.

**Usa:** Node.js, contratos JSON, estado reanudable y aprobaciones.

**No hace:** no implementa directamente Playwright, HeyGen, VideoVox o FFmpeg.

**Descripción GitHub:**

```text
Cross-platform tutorial factory orchestrating Playwright screen capture, HeyGen presenters, VideoVox and hybrid composition with human approval gates.
```

---

## `cano-screen-tutorial-skill`

**Rol:** operador y cámara del navegador.

**Usa:** Playwright, Chromium, video, screenshots y traces.

**Entrega:** `capture-manifest.json`, `actions.json`, WEBM, screenshots y trace.

**Descripción GitHub:**

```text
Agent-ready Playwright skill for recording reproducible browser tutorials with sessions, traces, screenshots, privacy redaction and Mac/Windows setup.
```

---

## `cano-heygen-presenter-skill`

**Rol:** generador de presentador o Digital Twin.

**Usa:** HeyGen API, perfiles locales, polling, descarga y control de costo.

**Entrega:** MP4 por segmento y manifiesto.

**Descripción GitHub:**

```text
Reusable HeyGen presenter skill for segmented Digital Twin videos with local profiles, cost gates, polling, downloads and Mac/Windows setup.
```

---

## `cano-video-vox`

**Rol:** motor visual documental.

**Usa:** Remotion, React, FFmpeg, Python/rembg, ElevenLabs y proveedores visuales.

**Entrega:** escenas y videos animados por job.

**Descripción GitHub:**

```text
Documentary-style animated shorts and explainers with Remotion, generated visuals, voiceover, music and reusable job-based rendering.
```

**Visibilidad:** privada hasta cerrar procedencia y licencia.

---

## `cano-hybrid-composer-skill`

**Rol:** ensamblador audiovisual.

**Usa:** FFmpeg/FFprobe y contratos universales de escenas; preparado para Remotion/HyperFrames.

**Entrega:** timeline, manifiesto y MP4 final.

**Descripción GitHub:**

```text
FFmpeg/Remotion-ready skill for composing avatar, browser, VideoVox, images, captions and audio into vertical and horizontal tutorials.
```

---

## Flujo conjunto

```text
Suite
  ├── Screen Tutorial → pantalla
  ├── HeyGen Presenter → avatar
  ├── VideoVox → explicación animada
  └── Hybrid Composer → video final
```

## Reglas comunes

- Sin GitHub Actions.
- Verificación local.
- Mock por defecto.
- Secretos y runtime fuera de Git.
- Configuración independiente por computadora.
- Publicación separada y con revisión humana.
