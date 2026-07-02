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

  const lang = getLang()
  const slug = window.location.pathname.split('/').pop().replace('.html', '')

  if (!slug) return

  const url = `/blog/i18n/${slug}/${lang}.json`

  fetch(url)
    .then(r => {
      if (r.ok) return r.json()
      if (lang !== 'es') {
        localStorage.setItem('lang', 'es')
        return fetch(`/blog/i18n/${slug}/es.json`).then(r => {
          if (!r.ok) throw new Error('Content not found')
          return r.json()
        })
      }
      throw new Error('Content not found')
    })
    .then(data => {
      document.title = data.meta.title + ' – Einier Freyre'

      const desc = document.querySelector('meta[name="description"]')
      if (desc) desc.content = data.meta.description

      const ogTitle = document.querySelector('meta[property="og:title"]')
      if (ogTitle) ogTitle.content = data.meta.ogTitle || data.meta.title

      const ogDesc = document.querySelector('meta[property="og:description"]')
      if (ogDesc) ogDesc.content = data.meta.ogDescription || data.meta.description

      const tags = document.getElementById('blog-tags')
      if (tags) tags.innerHTML = data.meta.tags.map(t => `<span class="tag">${t}</span>`).join('')

      const title = document.getElementById('blog-title')
      if (title) title.textContent = data.meta.title

      const meta = document.getElementById('blog-meta')
      if (meta) meta.innerHTML = `<span>${data.meta.date}</span><span>·</span><span>${data.meta.readTime}</span>`

      const body = document.getElementById('blog-body')
      if (body) body.innerHTML = data.content
    })
    .catch(err => console.error('blog-i18n:', err))
})()
