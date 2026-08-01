# Empieza aquí

## 1. Instala la suite

Usa el script de macOS o Windows descrito en el README. Los cinco repositorios deben quedar como carpetas hermanas.

```text
cano-tutorials/
├── cano-screen-tutorial-skill/
├── cano-heygen-presenter-skill/
├── cano-video-vox/
├── cano-hybrid-composer-skill/
└── cano-tutorial-suite/
```

## 2. Verifica el entorno

```bash
cd cano-tutorial-suite
npm run verify
node bin/cano-tutorial.js init
node bin/cano-tutorial.js doctor
```

No continúes con live hasta que `doctor` reconozca los cuatro repositorios.

## 3. Prueba sin costo

```bash
node bin/cano-tutorial.js plan examples/image-generator-short.request.json
node bin/cano-tutorial.js prepare examples/image-generator-short.request.json
node bin/cano-tutorial.js run examples/image-generator-short.request.json --mock
```

## 4. Revisa el workspace

La preparación genera:

```text
.runtime/jobs/PROJECT_ID/
├── tutorial-plan.json
├── workflow.json
└── requests/
    ├── screen-request.json
    ├── presenter-request.json
    └── composition-request.json
```

Edita selectores, textos, duración y assets antes de una ejecución real.

## 5. Configura cada proveedor

- Screen: crea o autoriza una sesión Playwright de demostración.
- HeyGen: agrega llaves e IDs únicamente como variables locales.
- VideoVox: prepara el job solicitado dentro de `cano-video-vox`.
- Composer: instala FFmpeg y coloca los assets reales indicados en la composición.

## 6. Ejecuta por etapas

Primero:

```bash
node bin/cano-tutorial.js execute .runtime/jobs/PROJECT_ID/workflow.json --mock
```

Después de aprobar permisos y assets:

```bash
node bin/cano-tutorial.js execute .runtime/jobs/PROJECT_ID/workflow.json --live
```

## 7. Revisa antes de publicar

Comprueba privacidad, pronunciación, exactitud, sincronización, derechos de media, subtítulos y legibilidad. La publicación permanece separada y manual.
