# Metadatos recomendados para GitHub

## Descripción

```text
Cross-platform tutorial factory orchestrating Playwright screen capture, HeyGen presenters, VideoVox and hybrid composition with human approval gates.
```

## Topics

```text
tutorial-automation
content-factory
playwright
heygen
videovox
ffmpeg
claude-code
codex
```

## Propósito visible

Este es el repositorio de entrada para instalar y operar el ecosistema. No contiene la implementación interna de Playwright, HeyGen, VideoVox o FFmpeg; coordina sus repositorios independientes.

## Tecnologías

- Node.js 20+
- JSON contracts
- Playwright mediante skill externo
- HeyGen API mediante skill externo
- Remotion/VideoVox mediante repositorio externo
- FFmpeg mediante composer externo

## Entrada principal

Un request JSON que define tema, formato, audiencia, herramienta, presentador, VideoVox y CTA.

## Salida principal

Workspace reanudable con plan, requests por skill, workflow, estado y referencias a los assets resultantes.

## Relación con Factory V5

La Suite se valida primero de forma independiente. Factory V5 podrá llamarla después mediante un adapter, sin duplicar sus proveedores o renderers.
