# FreyreCorona.github.io

Sitio personal de **Einier Freyre** — Consultoría en Cloud & Platform Engineering.

## Stack

HTML+CSS+JS estático. Sin frameworks, sin build tools.

## Estructura

```
├── index.html        # Landing principal
├── privacy.html      # Política de privacidad
├── terms.html        # Términos y condiciones
├── blog/             # Blog (en construcción)
├── css/style.css     # Estilos globales
├── js/main.js        # Canvas red neuronal + animaciones + menú
└── .opencode/        # Configuración de OpenCode AI
```

## Features

- **Red neuronal interactiva** — canvas con 70 partículas que reaccionan al mouse
- **Tema oscuro/claro** — toggle con persistencia en localStorage
- **Animaciones al scroll** — fade-in con IntersectionObserver
- **Indicador de scroll** — mouse animado en el hero
- **Textura de ruido** — overlay sutil para profundidad
- **Badges de tecnologías** — Go, Terraform, Kubernetes, OCI
- **Sección de testimonios** — casos de éxito editables
- **Mobile responsive** — menú hamburguesa, layout adaptable
- **Despliegue automático** — GitHub Actions → GitHub Pages

## Desarrollo

Los cambios se despliegan automáticamente al pushear a `main`.
