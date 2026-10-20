# FreyreCorona.github.io

Sitio personal de **Einier Freyre** — Consultoría en Cloud & Platform Engineering.
Disponible en **español**, **portugués** e **inglés** con URLs propias.

## Stack

HTML+CSS+JS estático generado por un pequeño script en Python. Sin frameworks.

## Cómo funciona

El contenido ya no se carga por JavaScript: `build.py` toma las plantillas de
`template/` y las traducciones de `i18n/` y genera HTML completo por idioma, de
modo que los buscadores indexan el texto real de cada página.

```
template/*.html     Plantillas con marcadores {{...}}
i18n/<page>/<lang>.json   Traducciones (fuente única de contenido)
build.py            Generador estático
es/ pt/ en/         Salida generada (no se commitea)
index.html          Página raíz: redirige al idioma del visitante
sitemap.xml         Generado automáticamente
```

### Marcadores de las plantillas

| Marcador | Uso |
|---|---|
| `{{t:clave}}` | Texto traducido (escapado) |
| `{{th:clave}}` | HTML traducido (confiable) |
| `{{tp:clave}}` | Valor de atributo (escapado) |
| `{{TITLE}}`, `{{DESCRIPTION}}`, ... | Metadatos del `<head>` |
| `{{PROBLEMS_CARDS}}`, `{{SERVICES_CARDS}}`, ... | Secciones con listas |

## Idiomas y URLs

- `https://freyre.dev/es/` — Español (canónico, `x-default`)
- `https://freyre.dev/pt/` — Portugués
- `https://freyre.dev/en/` — Inglés
- `https://freyre.dev/` — redirige al idioma del navegador (o al guardado)

Cada página lleva `canonical` y `hreflang` correctos, además de datos
estructurados `Person` + `ProfessionalService`.

## Desarrollo

Generar el sitio localmente:

```bash
python3 build.py
```

Para previsualizarlo con rutas absolutas funcionando:

```bash
python3 -m http.server 8000
# abrir http://localhost:8000/es/
```

Los cambios se despliegan automáticamente al pushear a `main`: GitHub Actions
ejecuta `build.py` y publica el resultado en GitHub Pages.

## Features

- **Multilenguaje con URLs reales** — es / pt / en, con hreflang y canonical
- **Red neuronal interactiva** — canvas con partículas que reaccionan al mouse
- **Tema oscuro/claro** — toggle con persistencia en localStorage
- **Animaciones al scroll** — fade-in con IntersectionObserver
- **Botón flotante de WhatsApp** — con mensaje precargado por idioma
- **Datos estructurados** — schema.org Person + ProfessionalService
- **Mobile responsive** — menú hamburguesa, layout adaptable
