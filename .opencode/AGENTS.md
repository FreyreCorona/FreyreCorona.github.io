# FreyreCorona.github.io — Cloud & Platform Engineering Consulting Site

## Project Overview

Personal consulting site for **Einier Freyre** — Cloud & Platform Engineering consultant.
Content in **Spanish**, target audience: SMBs in LATAM.

## Tech Stack

- **HTML/CSS/JS**: Pure static, no frameworks, no build tools, no package managers
- **CSS**: Single file (`css/style.css`), dark theme with light toggle, CSS custom properties, CSS Grid, `clamp()` for responsive typography, 768px mobile breakpoint
- **JS**: Single file (`js/main.js`), vanilla IIFE, features:
  - Neural network canvas animation (220 particles, mouse repulsion within 120px, connections up to 150px, constant drift)
  - Scroll reveal via IntersectionObserver (`.reveal` / `.active` classes, delays `.reveal-delay-1` through `.reveal-delay-5`)
  - Mobile hamburger menu toggle
  - Theme toggle (light/dark) with `localStorage` persistence
  - Contact form submission via `fetch` to Formspree with inline success message (no redirect)
- **Hosting**: GitHub Pages via GitHub Actions (`.github/workflows/pages.yml`)
- **Font**: Google Fonts "Inter" (400,500,600,700,800)
- **Contact**: Formspree endpoint `https://formspree.io/f/mpqgyygl`, no redirect, inline success message

## Project Structure

```
├── index.html            # Main landing page (hero, about, problems, services, process, testimonials, contact)
├── privacy.html          # Privacy policy
├── terms.html            # Terms & conditions
├── blog/index.html       # Blog listing (3 posts "Próximamente")
├── css/style.css         # All styles
├── js/main.js            # All JS (neural network, scroll reveal, menu, theme, form submit)
├── sitemap.xml           # Search engine sitemap (5 URLs)
├── .github/workflows/    # GitHub Pages deploy on push to main
└── .opencode/
    ├── AGENTS.md
    └── skills/frontend-design/SKILL.md
```

## Design System

- **Theme**: Dark first — bg `#0a0a0f`, alt `#0e0e18`, card `#12121e`, text `#e8e8ed`, muted `#7a7a9e`. Light theme via `[data-theme="light"]`: bg `#f7f7fc`, alt `#eeeef4`, card `#ffffff`, text `#1a1a2e`, muted `#6b6b88`
- **Accent**: Indigo `#6366f1` / hover `#818cf8` / subtle `rgba(99, 102, 241, 0.08)` / glow `rgba(99, 102, 241, 0.15)`
- **Border**: `#1a1a2e` / `#dcdce8` (light), radius `12px`
- **Container**: max-width `1100px`
- **Header**: Fixed, glassmorphism (`backdrop-filter: blur(16px)`), animated nav-link underline
- **Background**: Canvas neural network (z-index 0) + noise grain overlay (z-index 9998, 2% opacity)
- **Gradients**: `.gradient-text` with animated `background-position` shift, card hover border glow
- **Cards**: Dark bg + border + hover translateY + gradient border glow (pseudo-element `::before`)
- **Sections**: 120px padding (80px mobile), `.section-alt` for alternating bg
- **Transitions**: `0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- **Reveal animations**: `.reveal` (opacity 0 + translateY 30px) → `.active` (opacity 1 + translateY 0)

## Conventions

- CSS classes: kebab-case (`hero-title`, `service-card`, `btn-primary`, `section-alt`)
- IDs: camelCase (`menuToggle`, `networkCanvas`, `contactForm`, `formSuccess`)
- Every page shares header and footer (copy-pasted, no template engine)
- Sections: alternating bg, 120px padding (80px mobile)
- Cards use CSS Grid `repeat(auto-fit, minmax(300px, 1fr))`
- No modern JS imports, no modules, no classes — vanilla IIFE
- Every page includes `<canvas id="networkCanvas">` and `<div class="noise-overlay">` at top of body
- Every section with content should use `.reveal` class for entrance animations

## Git & CI/CD

- Commits: conventional format (`feat:`, `fix:`)
- Branch: `main`
- CI/CD: GitHub Actions deploys repo root directly to GitHub Pages
- No build step

## Key Pages

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Portfolio + services landing |
| Privacy | `/privacy` | Privacy policy |
| Terms | `/terms` | Terms & conditions |
| Blog | `/blog/` | Blog listing (coming soon) |

## Contact Form

- Uses Formspree endpoint `https://formspree.io/f/mpqgyygl`
- Fields: nombre (required), email (required), empresa (optional), mensaje (required)
- Privacy checkbox with `required` attribute (native browser validation)
- AJAX submission via `fetch` — no page redirect
- Inline success message replaces form on successful submit
- On error: button re-enables, shows alert with fallback email

## SEO

- Structured data: Schema.org `Person` + `Service` JSON-LD in `<head>` of `index.html`
- Open Graph tags: `og:title`, `og:description`, `og:url`, `og:type`, `og:locale` on index, blog, thanks
- Twitter Card: `summary_large_image` on index
- `sitemap.xml` with 5 entries (/, /blog/, /privacy.html, /terms.html, /thanks.html)
- Legal pages use `noindex` meta where appropriate (thanks.html had `noindex` before deletion)

## Notes for AI

- When adding new pages, copy header/footer + canvas + noise overlay pattern from `index.html`
- Mobile menu uses `#menuToggle` to toggle `.open` class on `#nav`
- All external links should use `rel="noopener noreferrer"`
- Use `clamp()` for responsive font sizes, CSS Grid for layouts
- Keep JS vanilla — no frameworks or dependencies
- Formspree ID: `mpqgyygl` — replace in both `index.html` (action URL) and `js/main.js` (fetch URL) if ever changed
- Theme toggle uses `setAttribute('data-theme', 'light')` / `removeAttribute('data-theme')`
- Neural network: 220 particles, indigo `rgba(99, 102, 241, 0.5)`, mouse repulsion within 120px radius, connections up to 150px distance, constant random drift
