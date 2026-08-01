# Ajustes manuales de GitHub

El código y la documentación pueden prepararse desde agentes, pero la ficha **About** y la visibilidad requieren permisos de administración de GitHub.

## Descripción

Copia la descripción de `docs/REPOSITORY-METADATA.md` en:

```text
Repository → About → Edit repository details
```

## Topics

Copia los topics del mismo documento.

## Visibilidad

Mientras se prueban credenciales y sesiones, se recomienda mantener los cuatro repositorios nuevos privados. Los archivos ignorados reducen el riesgo, pero la visibilidad debe decidirla el propietario.

## Actions

No agregues workflows. La validación oficial se ejecuta en cada computadora con:

```bash
npm run verify
```
