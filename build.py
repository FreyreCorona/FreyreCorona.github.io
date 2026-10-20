#!/usr/bin/env python3
"""Static site generator for freyre.dev.

Reads the templates in ``template/`` and the translations in ``i18n/`` and
emits fully rendered, per-language HTML into ``es/``, ``pt/`` and ``en/``.

Every page is generated with its content already in the markup so search
engines can index it without executing JavaScript. The default language
(Spanish) is also copied to the site root so that ``/`` works as before.
"""

import html
import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent
TEMPLATE_DIR = ROOT / "template"
I18N_DIR = ROOT / "i18n"
OUTPUT_LANGS = ["es", "pt", "en"]
DEFAULT_LANG = "es"
SITE_URL = "https://freyre.dev"
PAGES = ["index", "privacy", "terms"]
# Map the page file name to the directory that holds its translations.
PAGE_I18N_DIR = {"index": "landing", "privacy": "privacy", "terms": "terms"}


def read_json(path):
    with path.open(encoding="utf-8") as fh:
        return json.load(fh)


def lookup(data, dotted_path):
    """Resolve a ``a.b.c`` path against nested dict data."""
    value = data
    for key in dotted_path.split("."):
        if not isinstance(value, dict) or key not in value:
            return None
        value = value[key]
    return value


def esc(text):
    return html.escape(text, quote=True)


def render_attrs(template, data):
    """Resolve simple translation markers embedded in the template markup.

    Markers (safe for nested HTML because they are plain placeholders)::

        {{t:hero.badge}}          -> escaped text
        {{th:hero.title}}         -> raw HTML (trusted translation values)
        {{tp:contact.form.email}} -> attribute value, escaped

    Attribute markers are used for ``placeholder``, ``value`` and
    ``aria-label``; the attribute name is passed explicitly, e.g.
    ``placeholder="{{tp:contact.form.emailPlaceholder}}"``.
    """
    def repl_text(match):
        value = lookup(data, match.group(1))
        return esc(value) if value is not None else match.group(0)

    def repl_html(match):
        value = lookup(data, match.group(1))
        return value if value is not None else match.group(0)

    template = re.sub(r"\{\{th:([^}]+)\}\}", repl_html, template)
    template = re.sub(r"\{\{tp:([^}]+)\}\}", repl_text, template)
    template = re.sub(r"\{\{t:([^}]+)\}\}", repl_text, template)
    return template


def render_blocks(template, data):
    """Fill list-driven sections (problems, services, process, testimonials)."""

    def render_cards(items, card_class, delay_prefix):
        out = []
        for i, item in enumerate(items):
            delay = f" {delay_prefix}-{i + 1}" if delay_prefix else ""
            out.append(
                f'<div class="{card_class}{delay}">'
                f'<span class="problem-icon">{esc(item["num"])}</span>'
                f"<h3>{esc(item['title'])}</h3>"
                f"<p>{esc(item['desc'])}</p>"
                "</div>"
            )
        return "".join(out)

    problems = lookup(data, "problems.cards")
    if problems:
        template = template.replace("{{PROBLEMS_CARDS}}", render_cards(problems, "problem-card", "reveal-delay"))

    services = lookup(data, "services.cards")
    if services:
        icons = [
            '<path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"/>',
            '<path d="M4 7L12 3L20 7L12 11L4 7Z"/><path d="M4 12L12 16L20 12"/><path d="M4 17L12 21L20 17"/>',
            '<path d="M4 7V17C4 18.1046 4.89543 19 6 19H18C19.1046 19 20 18.1046 20 17V7M4 7L12 13L20 7M4 7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7"/>',
            '<path d="M9 12H15M9 16H15M9 8H15M7 3H17C18.1046 3 19 3.89543 19 5V21L12 18L5 21V5C5 3.89543 5.89543 3 7 3Z"/>',
        ]
        cards = []
        for i, item in enumerate(services):
            icon = icons[i % len(icons)]
            cards.append(
                f'<div class="service-card reveal reveal-delay-{i + 1}">'
                '<div class="service-icon">'
                f'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">{icon}</svg>'
                "</div>"
                f"<h3>{esc(item['title'])}</h3>"
                f"<p>{esc(item['desc'])}</p>"
                "</div>"
            )
        template = template.replace("{{SERVICES_CARDS}}", "".join(cards))

    steps = lookup(data, "process.steps")
    if steps:
        cards = []
        for step in steps:
            cards.append(
                '<div class="step">'
                f'<span class="step-num">{esc(step["num"])}</span>'
                f"<h3>{esc(step['title'])}</h3>"
                f"<p>{esc(step['desc'])}</p>"
                "</div>"
            )
        template = template.replace("{{PROCESS_STEPS}}", "".join(cards))

    testimonials = lookup(data, "testimonials.cards")
    if testimonials:
        cards = []
        for item in testimonials:
            cards.append(
                '<div class="testimonial-card">'
                '<div class="testimonial-content"><p>' + esc(item["text"]) + "</p></div>"
                '<div class="testimonial-author">'
                f'<span class="author-name">{esc(item["author"])}</span>'
                f'<span class="author-role">{esc(item["role"])}</span>'
                "</div>"
                "</div>"
            )
        template = template.replace("{{TESTIMONIALS_CARDS}}", "".join(cards))

    about = lookup(data, "about.grid")
    if about:
        cards = []
        for item in about:
            cards.append(
                '<div class="about-item">'
                f'<span class="about-num">{esc(item["num"])}</span>'
                f'<span class="about-desc">{esc(item["desc"])}</span>'
                "</div>"
            )
        template = template.replace("{{ABOUT_GRID}}", "".join(cards))

    return template


def render_head(template, data, lang, page, page_url):
    """Inject meta tags, canonical and hreflang into the document head."""
    meta = data.get("meta", {})
    title = meta.get("title", "")
    description = meta.get("description", "")

    template = template.replace("{{TITLE}}", esc(title))
    template = template.replace("{{DESCRIPTION}}", esc(description))
    template = template.replace("{{OG_TITLE}}", esc(meta.get("ogTitle", title)))
    template = template.replace(
        "{{OG_DESCRIPTION}}", esc(meta.get("ogDescription", description))
    )
    template = template.replace("{{OG_URL}}", esc(page_url))
    template = template.replace("{{OG_LOCALE}}", esc(meta.get("ogLocale", lang)))
    template = template.replace("{{HTML_LANG}}", esc(meta.get("htmlLang", lang)))

    def lang_url(alt):
        if page == "index":
            return f"{SITE_URL}/{alt}/"
        return f"{SITE_URL}/{alt}/{page}.html"

    alternates = []
    for alt in OUTPUT_LANGS:
        alternates.append(
            f'  <link rel="alternate" hreflang="{alt}" href="{lang_url(alt)}" />'
        )
    alternates.append(
        f'  <link rel="alternate" hreflang="x-default" href="{lang_url(DEFAULT_LANG)}" />'
    )
    template = template.replace("{{HREFLANG}}", "\n".join(alternates))
    template = template.replace(
        "{{CANONICAL}}", f'  <link rel="canonical" href="{esc(page_url)}" />'
    )
    return template


def render_lang_selector(template, lang, page):
    """Point the language dropdown at the real prefixed URLs for this page."""
    target = "index.html" if page == "index" else f"{page}.html"
    for alt in OUTPUT_LANGS:
        if page == "index":
            href = f"/{alt}/"
        else:
            href = f"/{alt}/{target}"
        template = template.replace(f'href="?lang={alt}"', f'href="{href}"')
    template = template.replace("{{LANG_CURRENT}}", lang.upper())
    return template


def render_links(template, lang):
    """Prefix internal page links so navigation stays inside the language tree."""
    for page in ("privacy", "terms"):
        template = template.replace(f'href="/{page}.html"', f'href="/{lang}/{page}.html"')
    # Header/footer navigation back to the landing sections.
    template = template.replace('href="/#', f'href="/{lang}/#')
    # Logo links to the home of the current language.
    template = template.replace('href="/" class="logo"', f'href="/{lang}/" class="logo"')
    return template


def render_footer(template, data, lang):
    """Build the footer navigation from the translated ``footerNav`` array.

    Each entry keeps its translated label and gets a URL scoped to the current
    language, so a Portuguese visitor stays in ``/pt/`` when they move between
    the landing and the legal pages.
    """
    items = data.get("footerNav") or []
    links = []
    for item in items:
        url = item.get("url", "/")
        if url == "/":
            url = f"/{lang}/"
        elif url.startswith("/") and not url.startswith(f"/{lang}/"):
            url = f"/{lang}{url}"
        links.append(f'<a href="{esc(url)}">{esc(item.get("text", ""))}</a>')
    return template.replace("{{FOOTER_NAV}}", "".join(links))


def render_jsonld(template, data, lang, page_url):
    """Build the ``Person`` + ``Service`` structured data for the landing page.

    Values come from the translations so every language gets a description in
    its own language, and ``json.dumps`` guarantees valid escaping.
    """
    meta = data.get("meta", {})
    description = meta.get("description", "")
    html_lang = meta.get("htmlLang", lang)

    person = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Einier Freyre",
        "jobTitle": "Platform Engineer",
        "email": "freyre.dev@gmail.com",
        "url": f"{SITE_URL}/{lang}/",
        "knowsLanguage": ["es", "pt", "en"],
        "sameAs": [
            "https://www.linkedin.com/in/einier-freyre-896981220/",
            "https://github.com/FreyreCorona",
        ],
    }
    service = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Cloud & Platform Engineering",
        "url": page_url,
        "inLanguage": html_lang,
        "description": description,
        "provider": {
            "@type": "Person",
            "name": "Einier Freyre",
            "url": f"{SITE_URL}/{lang}/",
        },
        "areaServed": [
            {"@type": "Place", "name": "Brasil"},
            {"@type": "Place", "name": "LATAM"},
        ],
        "availableLanguage": [
            {"@type": "Language", "name": "Spanish"},
            {"@type": "Language", "name": "Portuguese"},
            {"@type": "Language", "name": "English"},
        ],
        "serviceType": [
            "Cloud Consulting",
            "DevOps",
            "Platform Engineering",
            "Cloud Cost Optimization",
        ],
    }

    blocks = []
    for obj in (person, service):
        payload = json.dumps(obj, ensure_ascii=False, indent=2)
        blocks.append(
            '  <script type="application/ld+json">\n' + payload + "\n  </script>"
        )
    return template.replace("{{JSONLD}}", "\n".join(blocks))


def build_page(page, lang):
    data = read_json(I18N_DIR / PAGE_I18N_DIR[page] / f"{lang}.json")
    template = (TEMPLATE_DIR / f"{page}.html").read_text(encoding="utf-8")

    if page == "index":
        page_url = f"{SITE_URL}/{lang}/"
    else:
        page_url = f"{SITE_URL}/{lang}/{page}.html"

    template = render_lang_selector(template, lang, page)
    template = render_head(template, data, lang, page, page_url)
    template = render_blocks(template, data)
    template = render_footer(template, data, lang)
    if page == "index":
        template = render_jsonld(template, data, lang, page_url)
    template = render_attrs(template, data)
    # Link prefixing runs last so links coming from translation values
    # (e.g. contact.form.privacyHtml) are rewritten too.
    template = render_links(template, lang)

    # The button href carries a prefilled, localized message.
    message = data.get("whatsappMessage")
    if message:
        from urllib.parse import quote

        template = re.sub(
            r'(class="whatsapp-fab" href=")([^"?]+)(?:\?text=[^"]*)?"',
            lambda m: m.group(1) + m.group(2) + "?text=" + quote(message, safe="") + '"',
            template,
        )
    return template


def build_root_redirect():
    """Root ``/`` page: send visitors to their language, default Spanish.

    GitHub Pages cannot issue server-side redirects, so a lightweight HTML
    document does the job. Search engines see the canonical link and the
    ``hreflang`` alternates and treat ``/es/`` as the Spanish home.
    """
    return """<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Einier Freyre – Cloud &amp; Platform Engineering</title>
  <link rel="canonical" href="https://freyre.dev/es/" />
  <link rel="alternate" hreflang="es" href="https://freyre.dev/es/" />
  <link rel="alternate" hreflang="pt" href="https://freyre.dev/pt/" />
  <link rel="alternate" hreflang="en" href="https://freyre.dev/en/" />
  <link rel="alternate" hreflang="x-default" href="https://freyre.dev/es/" />
  <meta http-equiv="refresh" content="0; url=/es/" />
  <script>
    (function () {
      var saved = localStorage.getItem('lang')
      var target = saved
      if (target !== 'es' && target !== 'pt' && target !== 'en') {
        var browser = (navigator.language || '').slice(0, 2).toLowerCase()
        target = (browser === 'pt' || browser === 'en') ? browser : 'es'
      }
      location.replace('/' + target + '/')
    })()
  </script>
</head>
<body>
  <p>Redirecionando… <a href="/es/">Español</a> · <a href="/pt/">Português</a> · <a href="/en/">English</a></p>
</body>
</html>
"""


def build_sitemap():
    entries = []
    for lang in OUTPUT_LANGS:
        for page in PAGES:
            if page == "index":
                loc = f"{SITE_URL}/{lang}/"
            else:
                loc = f"{SITE_URL}/{lang}/{page}.html"
            entries.append((loc, "1.0" if page == "index" else "0.3"))
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for loc, priority in entries:
        lines.append("  <url>")
        lines.append(f"    <loc>{loc}</loc>")
        lines.append(f"    <priority>{priority}</priority>")
        lines.append("  </url>")
    lines.append("</urlset>")
    return "\n".join(lines) + "\n"


def main():
    # Clean previous generated output (but never the sources).
    for lang in OUTPUT_LANGS:
        target = ROOT / lang
        if target.exists():
            shutil.rmtree(target)
        target.mkdir()

    for lang in OUTPUT_LANGS:
        for page in PAGES:
            out_dir = ROOT / lang
            filename = "index.html" if page == "index" else f"{page}.html"
            (out_dir / filename).write_text(build_page(page, lang), encoding="utf-8")

    # Root is a small language-aware redirect that search engines ignore in
    # favour of the canonical /es/ URL.
    (ROOT / "index.html").write_text(build_root_redirect(), encoding="utf-8")

    (ROOT / "sitemap.xml").write_text(build_sitemap(), encoding="utf-8")
    print("Site generated: " + ", ".join(OUTPUT_LANGS))


if __name__ == "__main__":
    main()
