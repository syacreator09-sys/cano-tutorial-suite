# Integración de análisis de video con `/watch`

Esta integración permite que Claude Code, Codex u otros agentes analicen videos públicos o archivos locales antes de producir contenido original para CANO Digital.

## Repositorio principal

- Proyecto: `bradautomates/claude-video`
- Clonar:

```bash
git clone https://github.com/bradautomates/claude-video.git
```

### Claude Code

```text
/plugin marketplace add bradautomates/claude-video
/plugin install watch@claude-video
```

### Codex y otros hosts compatibles con Agent Skills

```bash
npx skills add bradautomates/claude-video -g
```

Ejemplo:

```text
/watch https://www.youtube.com/watch?v=VIDEO_ID analiza el hook, la estructura, las herramientas mostradas, los pasos verificables y los elementos visuales que explican el tema
```

El skill usa subtítulos cuando existen y puede extraer fotogramas con `yt-dlp` y `ffmpeg`. Cuando no hay subtítulos puede recurrir a transcripción, según la configuración local.

## Alternativa para preguntas dirigidas

- Proyecto: `abe238/claude-video-plus`
- Clonar:

```bash
git clone https://github.com/abe238/claude-video-plus.git
```

### Claude Code

```text
/plugin marketplace add abe238/claude-video-plus
/plugin install watch@claude-video-plus
```

### Codex y otros hosts

```bash
npx skills add abe238/claude-video-plus -g
```

Esta variante añade un modo de evidencia dirigido por pregunta y prioriza transcripción local. Es adecuada para preguntas específicas como precios, funciones, comparaciones o un momento concreto del video.

> Ambos proyectos instalan una habilidad llamada `watch`. Mantén solo una implementación activa para evitar conflictos de resolución y actualización.

## Decisión inicial de CANO

1. Usar primero `bradautomates/claude-video` como base estable y sencilla.
2. Probar `claude-video-plus` por separado cuando necesitemos reducir material y hacer preguntas muy dirigidas sobre videos largos.
3. No copiar guiones, edición, miniaturas ni secuencias completas de terceros.
4. Convertir el análisis en un brief original, verificar el repositorio o herramienta y producir una pieza nueva con la voz editorial de CANO Digital.

## Flujo de producción

```text
Video o enlace
  → /watch: transcripción, fotogramas y momentos clave
  → brief verificable
  → revisión del repositorio o herramienta en GitHub/web
  → elección del formato
  → guion original
  → HeyGen: avatar y explicación
  → Playwright: capturas o recorrido real cuando sea necesario
  → Higgsfield: hook, B-roll, metáforas visuales y resultado
  → compositor: subtítulos, branding y exportaciones
```

## Usos para CANO Digital

- Encontrar repositorios, herramientas y funciones mencionadas en videos.
- Separar novedades reales de contenido promocional.
- Analizar hooks, ritmo, estructura y CTA.
- Extraer preguntas frecuentes para crear una pieza original.
- Detectar el momento exacto donde se muestra una función.
- Comparar lo prometido en el video con el README, la documentación y una prueba real.
- Convertir un video largo en una lista de ideas cortas sin reutilizar el material del creador.

## Plantilla de análisis

```text
Analiza este video para CANO Digital.

Entrega:
1. Promesa principal y hook.
2. Herramientas y repositorios mencionados, con timestamp.
3. Qué se demuestra realmente y qué solo se afirma.
4. Funciones que debemos verificar directamente.
5. Riesgos, requisitos, costos y limitaciones.
6. Tres ángulos originales de contenido.
7. Formato recomendado: recomendación, prueba, comparación, noticia o tutorial.
8. Guion de 45–75 segundos sin copiar frases del creador.
9. Lista de capturas reales que debemos obtener.
10. Escenas que puede generar Higgsfield y segmentos que debe presentar HeyGen.
```

## Seguridad y privacidad

- No subir cookies, sesiones, tokens ni videos privados al repositorio.
- No enviar audio a servicios remotos sin aprobación explícita.
- No presentar una afirmación del video como hecho sin verificarla.
- Guardar archivos de trabajo y medios fuera de Git.
- No usar GitHub Actions para este flujo.
