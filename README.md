# LA FE Distribuciones Médicas — sitio web

Sitio institucional de LA FE Distribuciones Médicas S.A.S. (Valledupar, Cesar).
HTML, CSS y JavaScript sin dependencias ni proceso de compilación: se abre
`index.html` en el navegador y funciona.

## Páginas

| Archivo | Contenido |
|---|---|
| `index.html` | Portada: hero, bloque de confianza, servicios, contacto y ubicación |
| `nosotros.html` | La empresa |
| `pqrsf.html` | Peticiones, quejas, reclamos, sugerencias y felicitaciones |
| `trabaja-con-nosotros.html` | Trabajo y enlace al portal de vacantes |

## Estructura

```
css/
  tipografia.css              sistema tipográfico (se carga primero)
  styles.css                  estilos comunes: cabecera, pie, escala de títulos
  trabaja-con-nosotros.css    estilos propios de esa página
js/
  script.js                   menú móvil y animaciones de entrada
assets/img/                   imágenes, logotipo e iconos
```

Las cuatro páginas comparten la misma cabecera y el mismo pie, definidos en
`css/styles.css`. Los títulos siguen una escala única documentada en ese mismo
archivo (busque «ESCALA DE TÍTULOS»).

## Tipografías

El manual de marca define **Geometos** (títulos) y **Cocogoose Pro** (texto),
ambas comerciales. Mientras no se compren las licencias, el sitio funciona con
Michroma y Poppins como respaldo. Los `@font-face` ya apuntan a las rutas
correctas: basta con copiar los `.woff2` en `assets/fonts/` con los nombres que
documenta el `LEEME.txt` de esa carpeta. No hay que tocar el CSS.

## Pendientes antes de publicar

- **Teléfono de WhatsApp**: los HTML usan el marcador `573000000000`, mientras
  `js/script.js` ya tiene el número real. Unificar.
- **URL del portal de Buk**: `lafedm.buk.co` es un marcador; aparece dos veces
  en `trabaja-con-nosotros.html`.
- **Redes sociales**: los enlaces del pie apuntan a perfiles genéricos.
- **Imágenes pesadas**: `hero.png` (1,8 MB) y `hero_trabaja.png` (1,4 MB)
  deberían convertirse a `.webp`.

## Nota

El sitio de encuestas y canal ético (`encuesta/`) **no forma parte de este
repositorio**: se despliega por separado y maneja credenciales de base de datos
y datos personales que no deben versionarse.
