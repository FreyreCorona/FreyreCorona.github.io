;(() => {
  'use strict'

  const SUPPORTED = ['es', 'en', 'pt']

  function getLang() {
    const fromUrl = new URLSearchParams(window.location.search).get('lang')
    if (fromUrl && SUPPORTED.includes(fromUrl)) {
      localStorage.setItem('lang', fromUrl)
      return fromUrl
    }
    const stored = localStorage.getItem('lang')
    if (stored && SUPPORTED.includes(stored)) return stored
    return 'es'
  }

  function val(obj, path) {
    return path.split('.').reduce((o, k) => o && o[k] !== undefined ? o[k] : null, obj)
  }

  function fetchJSON(baseURL, lang) {
    return fetch(baseURL)
      .then(r => {
        if (r.ok) return r.json()
        if (lang !== 'es') {
          localStorage.setItem('lang', 'es')
          const fallback = baseURL.replace('/' + lang + '.json', '/es.json')
          return fetch(fallback).then(r => {
            if (!r.ok) throw new Error('Content not found')
            return r.json()
          })
        }
        throw new Error('Content not found')
      })
  }

  const lang = getLang()
  const { pathname } = window.location

  if (pathname.startsWith('/blog/') && pathname !== '/blog/' && pathname !== '/blog/index.html') {
    /* ── blog post ── */
    const slug = pathname.split('/').pop().replace('.html', '')
    if (!slug) return

    fetchJSON('/blog/i18n/' + slug + '/' + lang + '.json', lang)
      .then(data => {
        document.title = data.meta.title + ' – Einier Freyre'

        const desc = document.querySelector('meta[name="description"]')
        if (desc) desc.content = data.meta.description

        const ogTitle = document.querySelector('meta[property="og:title"]')
        if (ogTitle) ogTitle.content = data.meta.ogTitle || data.meta.title

        const ogDesc = document.querySelector('meta[property="og:description"]')
        if (ogDesc) ogDesc.content = data.meta.ogDescription || data.meta.description

        const tags = document.getElementById('blog-tags')
        if (tags) tags.innerHTML = data.meta.tags.map(t => '<span class="tag">' + t + '</span>').join('')

        const title = document.getElementById('blog-title')
        if (title) title.textContent = data.meta.title

        const meta = document.getElementById('blog-meta')
        if (meta) meta.innerHTML = '<span>' + data.meta.date + '</span><span>·</span><span>' + data.meta.readTime + '</span>'

        const body = document.getElementById('blog-body')
        if (body) body.innerHTML = data.content

        const langCurrent = document.getElementById('lang-current')
        if (langCurrent) langCurrent.textContent = lang.toUpperCase()
      })
      .catch(err => console.error('i18n:', err))
  } else {
    /* ── site page (landing, terms, privacy) ── */
    const page = (() => {
      const path = pathname.replace(/\/$/, '') || '/'
      const name = path.split('/').pop().replace('.html', '')
      return name === '' || name === 'index' ? 'landing' : name
    })()

    fetchJSON('/i18n/' + page + '/' + lang + '.json', lang)
      .then(d => {
        document.documentElement.lang = d.meta.htmlLang || lang
        document.title = d.meta.title

        const qs = (s, v) => { const e = document.querySelector(s); if (e) e.content = v }
        qs('meta[name="description"]', d.meta.description)
        qs('meta[property="og:title"]', d.meta.ogTitle || d.meta.title)
        qs('meta[property="og:description"]', d.meta.ogDescription || d.meta.description)
        qs('meta[property="og:locale"]', d.meta.ogLocale)

        document.querySelectorAll('[data-i18n]').forEach(el => {
          const v = val(d, el.dataset.i18n)
          if (v !== null) el.textContent = v
        })

        document.querySelectorAll('[data-i18n-html]').forEach(el => {
          const v = val(d, el.dataset.i18nHtml)
          if (v !== null) el.innerHTML = v
        })

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
          const v = val(d, el.dataset.i18nPlaceholder)
          if (v !== null) el.placeholder = v
        })

        document.querySelectorAll('[data-i18n-value]').forEach(el => {
          const v = val(d, el.dataset.i18nValue)
          if (v !== null) el.value = v
        })

        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
          const v = val(d, el.dataset.i18nAria)
          if (v !== null) el.setAttribute('aria-label', v)
        })

        const aboutGrid = document.getElementById('about-grid')
        if (aboutGrid && d.about?.grid) {
          aboutGrid.innerHTML = d.about.grid.map(item =>
            '<div class="about-item">' +
              '<span class="about-num">' + item.num + '</span>' +
              '<span class="about-desc">' + item.desc + '</span>' +
            '</div>'
          ).join('')
        }

        const problemsGrid = document.getElementById('problems-grid')
        if (problemsGrid && d.problems?.cards) {
          problemsGrid.innerHTML = d.problems.cards.map((c, i) =>
            '<div class="problem-card reveal reveal-delay-' + (i + 1) + '">' +
              '<span class="problem-icon">' + c.num + '</span>' +
              '<h3>' + c.title + '</h3>' +
              '<p>' + c.desc + '</p>' +
            '</div>'
          ).join('')
        }

        const servicesGrid = document.getElementById('services-grid')
        if (servicesGrid && d.services?.cards) {
          servicesGrid.innerHTML = d.services.cards.map((c, i) =>
            '<div class="service-card reveal reveal-delay-' + (i + 1) + '">' +
              '<div class="service-icon">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="' + [
                  'M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z',
                  'M4 7L12 3L20 7L12 11L4 7ZM4 12L12 16L20 12M4 17L12 21L20 17',
                  'M4 7V17C4 18.1046 4.89543 19 6 19H18C19.1046 19 20 18.1046 20 17V7M4 7L12 13L20 7M4 7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7',
                  'M9 12H15M9 16H15M9 8H15M7 3H17C18.1046 3 19 3.89543 19 5V21L12 18L5 21V5C5 3.89543 5.89543 3 7 3Z'
                ][i] + '"/></svg>' +
              '</div>' +
              '<h3>' + c.title + '</h3>' +
              '<p>' + c.desc + '</p>' +
            '</div>'
          ).join('')
        }

        const processSteps = document.getElementById('process-steps')
        if (processSteps && d.process?.steps) {
          processSteps.innerHTML = d.process.steps.map(s =>
            '<div class="step">' +
              '<span class="step-num">' + s.num + '</span>' +
              '<h3>' + s.title + '</h3>' +
              '<p>' + s.desc + '</p>' +
            '</div>'
          ).join('')
        }

        const testimonialsGrid = document.getElementById('testimonials-grid')
        if (testimonialsGrid && d.testimonials?.cards) {
          testimonialsGrid.innerHTML = d.testimonials.cards.map(c =>
            '<div class="testimonial-card">' +
              '<div class="testimonial-content"><p>' + c.text + '</p></div>' +
              '<div class="testimonial-author">' +
                '<span class="author-name">' + c.author + '</span>' +
                '<span class="author-role">' + c.role + '</span>' +
              '</div>' +
            '</div>'
          ).join('')
        }

        const blogGrid = document.getElementById('blog-grid')
        if (blogGrid && d.blog?.cards) {
          blogGrid.innerHTML = d.blog.cards.map(c =>
            '<a href="' + c.url + '" class="service-card" style="text-decoration:none;color:inherit">' +
              '<h3>' + c.title + '</h3>' +
              '<p style="margin-top:8px">' + c.desc + '</p>' +
            '</a>'
          ).join('')
          const currentLang = localStorage.getItem('lang') || 'es'
          if (currentLang && currentLang !== 'es') {
            blogGrid.querySelectorAll('a').forEach(el => {
              var href = el.getAttribute('href')
              if (href && href.indexOf('?lang=') === -1) {
                el.setAttribute('href', href + '?lang=' + currentLang)
              }
            })
          }
        }

        const footerNav = document.getElementById('footer-nav')
        if (footerNav && d.footerNav) {
          footerNav.innerHTML = d.footerNav.map(f =>
            '<a href="' + f.url + '">' + f.text + '</a>'
          ).join('')
        }

        if ('IntersectionObserver' in window) {
          const observer = new IntersectionObserver(
            entries => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('active')
                  observer.unobserve(entry.target)
                }
              })
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
          )
          document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
        } else {
          document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'))
        }
      })
      .catch(err => console.error('i18n:', err))
  }
})()
