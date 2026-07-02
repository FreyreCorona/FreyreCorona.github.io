;(() => {
  // Language redirect (root only, respects manual choice)
  ;(() => {
    const saved = localStorage.getItem('lang')
    const path = window.location.pathname.replace(/\/$/, '') || '/'
    if (path !== '/' && path !== '/index.html') return
    if (saved) return
    const browserLang = (navigator.language || '').slice(0, 2).toLowerCase()
    const targets = { pt: '/pt/', en: '/en/' }
    const target = targets[browserLang]
    if (target) {
      localStorage.setItem('lang', browserLang)
      window.location.href = target
    }
  })()

  const toggle = document.getElementById('menuToggle')
  const nav = document.getElementById('nav')
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'))
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('open'))
    })
  }

  const themeToggle = document.getElementById('themeToggle')
  const html = document.documentElement
  if (themeToggle) {
    const saved = localStorage.getItem('theme')
    if (saved === 'light') html.setAttribute('data-theme', 'light')
    themeToggle.addEventListener('click', () => {
      const isLight = html.hasAttribute('data-theme')
      if (isLight) {
        html.removeAttribute('data-theme')
        localStorage.setItem('theme', '')
      } else {
        html.setAttribute('data-theme', 'light')
        localStorage.setItem('theme', 'light')
      }
    })
  }

  const canvas = document.getElementById('networkCanvas')
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  let w, h, particles, mouse

  function resize() {
    w = canvas.width = window.innerWidth
    h = canvas.height = window.innerHeight
  }
  window.addEventListener('resize', resize)
  resize()

  mouse = { x: w / 2, y: h / 2, radius: 120 }

  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  })

  const COUNT = 220
  particles = []

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 2 + 0.8
    })
  }

  function draw() {
    ctx.clearRect(0, 0, w, h)

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]

      const dx = p.x - mouse.x
      const dy = p.y - mouse.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius
        p.vx += (dx / dist) * force * 0.3
        p.vy += (dy / dist) * force * 0.3
      }

      p.vx += (Math.random() - 0.5) * 0.04
      p.vy += (Math.random() - 0.5) * 0.04
      p.vx *= 0.99
      p.vy *= 0.99
      p.x += p.vx
      p.y += p.vy

      if (p.x < 0) p.x = w
      if (p.x > w) p.x = 0
      if (p.y < 0) p.y = h
      if (p.y > h) p.y = 0

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(99, 102, 241, 0.5)'
      ctx.fill()

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j]
        const dx2 = p.x - p2.x
        const dy2 = p.y - p2.y
        const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)
        if (dist2 < 150) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - dist2 / 150) * 0.3})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }

    requestAnimationFrame(draw)
  }

  draw()

  const contactForm = document.getElementById('contactForm')
  const formSuccess = document.getElementById('formSuccess')
  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', async e => {
      e.preventDefault()
      const btn = contactForm.querySelector('button[type="submit"]')
      const originalText = btn.textContent
      btn.disabled = true
      btn.textContent = 'Enviando...'
      try {
        const data = new FormData(contactForm)
        data.append('_gotcha', '')
        const res = await fetch('https://formspree.io/f/mpqgyygl', {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' }
        })
        if (!res.ok) throw new Error('Error')
        contactForm.style.display = 'none'
        formSuccess.classList.add('active')
      } catch {
        btn.disabled = false
        btn.textContent = originalText
        alert('Ocurrió un error. Intenta nuevamente o escríbeme directamente a freyre.dev@gmail.com')
      }
    })
  }

  const revealEls = document.querySelectorAll('.reveal')
  if (revealEls.length && 'IntersectionObserver' in window) {
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
    revealEls.forEach(el => observer.observe(el))
  } else {
    revealEls.forEach(el => el.classList.add('active'))
  }

  // Language selector
  document.querySelectorAll('.lang-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault()
      const lang = link.dataset.lang
      localStorage.setItem('lang', lang)
      const paths = { es: '/', pt: '/pt/', en: '/en/' }
      window.location.href = paths[lang] || '/'
    })
  })
})()
