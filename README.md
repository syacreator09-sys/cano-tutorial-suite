# CANO Tutorial Suite

Suite agentica multiplataforma para producir tutoriales cortos y largos sin grabación manual. Orquesta cuatro repositorios aislados y reutilizables:

- **CANO Screen Tutorial** — ejecuta y captura recorridos web reproducibles con Playwright.
- **CANO HeyGen Presenter** — genera segmentos autorizados con avatar o Digital Twin.
- **CANO VideoVox** — crea explicaciones visuales animadas mediante Remotion.
- **CANO Hybrid Composer** — combina pantalla, avatar, VideoVox, imágenes y audio.

La Suite no duplica esas implementaciones. Su responsabilidad es configurar rutas, preparar trabajos, exigir aprobaciones, ejecutar etapas y conservar estado reanudable.

> Estado: **v0.2 clone-ready**. El modo mock funciona sin llaves. El modo live exige configuración local, assets reales y aprobaciones explícitas.

## Qué produce

Según el request puede preparar contenido para:

- YouTube horizontal de formato largo.
- YouTube Shorts.
- Reels y TikTok verticales.
- Tutoriales de pantalla con avatar.
- Explicaciones híbridas con VideoVox.
- Variantes cortas derivadas de un proyecto maestro.

Los resultados y datos privados se guardan bajo `.runtime/`, fuera de Git.

## Requisitos

- Node.js 20 o 22.
- Git.
- macOS o Windows 11 con PowerShell 7.
- Chromium de Playwright para captura live.
- FFmpeg para composición live.
- Cuenta y API de HeyGen únicamente cuando se active el presentador live.

## Instalación completa en macOS

```bash
git clone https://github.com/syacreator09-sys/cano-tutorial-suite.git
cd cano-tutorial-suite
chmod +x scripts/clone-suite-macos.sh
./scripts/clone-suite-macos.sh
```

## Instalación completa en Windows 11

```powershell
git clone https://github.com/syacreator09-sys/cano-tutorial-suite.git
cd cano-tutorial-suite
Set-ExecutionPolicy -Scope Process Bypass
.\scripts\clone-suite-windows.ps1
```

Los instaladores clonan los repositorios hermanos, instalan dependencias, ejecutan verificación local e instalan Chromium. **No se utilizan GitHub Actions.**

## Configuración guiada

```bash
node bin/cano-tutorial.js init
node bin/cano-tutorial.js doctor
```

`init` crea `config/suite.local.json`, ignorado por Git. Todos los permisos live quedan desactivados inicialmente.

## Primera prueba sin costo

```bash
node bin/cano-tutorial.js plan examples/image-generator-short.request.json
node bin/cano-tutorial.js prepare examples/image-generator-short.request.json
node bin/cano-tutorial.js run examples/image-generator-short.request.json --mock
```

## Flujo de producción

```text
Request maestro
  → plan y routing
  → workspace editable
  → captura Playwright
  → segmentos HeyGen
  → escena VideoVox
  → composición híbrida
  → revisión humana
  → publicación separada
```

Para ejecutar un workflow ya preparado:

```bash
node bin/cano-tutorial.js execute .runtime/jobs/PROJECT_ID/workflow.json --mock
```

Live solo después de configurar y aprobar cada permiso:

```bash
node bin/cano-tutorial.js execute .runtime/jobs/PROJECT_ID/workflow.json --live
```

## Comandos

| Comando | Función |
|---|---|
| `init` | Asistente de configuración local |
| `doctor` | Diagnóstico de Node, rutas y cuatro repositorios |
| `plan` | Valida y decide formato, canvas y etapas |
| `prepare` | Genera requests editables y `workflow.json` |
| `run --mock` | Crea estado mock seguro |
| `execute --mock` | Ejecuta los skills sin proveedores live |
| `execute --live` | Ejecuta etapas autorizadas reales |
| `status` | Lee el estado persistido de un trabajo |

## Aprobaciones independientes

Ninguna se habilita por defecto:

- `liveBrowser`
- `providerSpend`
- `identityUse`
- `localRender`
- `publication`

La publicación nunca se ejecuta automáticamente en v0.2.

## Claude Code y Codex

Ambos agentes usan los mismos contratos y CLI:

- Claude Code lee `CLAUDE.md` y `SKILL.md`.
- Codex lee `AGENTS.md`, los schemas y las pruebas.
- Los dos deben comenzar con `npm run verify` y `npm run doctor`.

## Documentación

- [Empieza aquí](docs/START-HERE.md)
- [Configuración](docs/CONFIGURATION.md)
- [Instalación local](docs/LOCAL-SETUP.md)
- [Comandos y opciones](docs/OPTIONS.md)
- [Solución de problemas](docs/TROUBLESHOOTING.md)
- [Metadatos recomendados para GitHub](docs/REPOSITORY-METADATA.md)
- [Arquitectura](docs/superpowers/specs/2026-08-01-clone-ready-v0.2-design.md)
- [Plan de implementación](docs/superpowers/plans/2026-08-01-clone-ready-v0.2.md)
- [Seguridad](SECURITY.md)
- [Privacidad](PRIVACY.md)
- [Uso responsable](USAGE_POLICY.md)
- [Marca e identidad](BRAND_AND_IDENTITY.md)
- [Avisos de terceros](THIRD_PARTY_NOTICES.md)
- [Contribución](CONTRIBUTING.md)
- [Licencia MIT](LICENSE)

## Límites actuales

- Los requests generados por `prepare` son plantillas editables; los selectores Playwright y rutas de assets deben validarse para cada herramienta.
- VideoVox usa su comando real `render:job` y requiere un job previamente preparado dentro de su repositorio.
- El compositor live exige que los archivos indicados en la composición existan localmente.
- HeyGen live consume créditos y necesita revisión de pronunciación, identidad y resultado.

## Privacidad

Nunca subas a Git:

- llaves y tokens;
- IDs privados de avatar o voz;
- cookies o sesiones Playwright;
- grabaciones y trazas reales;
- medios de entrenamiento;
- resultados o datos de clientes.

El código puede abrirse al público más adelante sin incluir la configuración privada de Cano Digital.
