# Comandos y opciones

## CLI

| Comando | Función | Red/proveedor |
|---|---|---|
| `cano-tutorial init` | Asistente de configuración local | No |
| `cano-tutorial doctor` | Diagnóstico de repositorios y dependencias | Solo diagnósticos locales |
| `cano-tutorial plan request.json` | Valida y enruta el formato | No |
| `cano-tutorial prepare request.json` | Crea workspace y requests editables | No |
| `cano-tutorial run request.json --mock` | Crea un job mock resumible | No |
| `cano-tutorial execute workflow.json --mock` | Ejecuta skills en modo seguro | No proveedores live |
| `cano-tutorial execute workflow.json --live` | Ejecuta etapas autorizadas | Sí, según workflow |
| `cano-tutorial status PROJECT_ID` | Lee el estado de un job | No |

## Formatos admitidos

- `tutorial_short`
- `tutorial_extended`
- `youtube_tutorial`
- `youtube_explainer`
- `avatar_visual_short`
- `avatar_vox_short`

## Routing

Los formatos cortos usan canvas `9:16` y un objetivo aproximado de 45 segundos. Los largos usan `16:9` y un objetivo inicial de ocho minutos. Las duraciones finales permanecen editables.

## Etapas

- `screen`
- `presenter`
- `vox`
- `composer`
- `review`

Las etapas no requeridas se marcan `SKIPPED`.

## Configuración de rutas

Se recomienda `config/suite.local.json`. Cada skill conserva una ruta y un ejecutable independiente.

## Modos

### Mock

Valida contratos y crea manifiestos sin abrir páginas, gastar créditos o renderizar medios finales.

### Live

Ejecuta las etapas reales y exige aprobaciones específicas. No habilita publicación.

## Estado de trabajos

Los estados se escriben después de cada etapa en:

```text
.runtime/jobs/PROJECT_ID/job-state.json
```

Estados frecuentes:

- `RUNNING`
- `FAILED`
- `AWAITING_REVIEW`
- `SKIPPED`
- `MOCKED`
- `COMPLETED`

## Límites v0.2

- `prepare` genera plantillas, no descubre automáticamente selectores específicos de cada web.
- Los assets de composición deben existir antes del render live.
- VideoVox requiere un `jobSlug` preparado.
- HeyGen live depende de créditos, disponibilidad y términos actuales de la cuenta.
- iOS funciona como superficie de control y revisión; la ejecución ocurre en macOS, Windows o infraestructura remota aprobada.
