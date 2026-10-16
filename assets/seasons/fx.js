/* vueleap seasons: one light canvas of ambient particles for the active
   season. Loaded by seasons.js only when a season is on and motion is
   allowed. Paused while the tab is hidden, gone when the season is off. */
(function () {
  'use strict'
  var html = document.documentElement
  var canvas = document.createElement('canvas')
  canvas.className = 'season-fx'
  canvas.setAttribute('aria-hidden', 'true')
  document.body.appendChild(canvas)
  var ctx = canvas.getContext('2d')
  var W = 0, H = 0, dpr = 1, parts = [], raf = 0, last = 0, season = null, dark = false
  // Pale particles get a deeper tone on light backgrounds so they stay visible.
  var PALE = { '#ffffff': '#9fb4cc', '#e6eef7': '#b8c8da', '#f4f1de': '#c9b458' }
  function isDark() {
    var t = html.getAttribute('data-theme')
    return t === 'dark' || (t !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  }

  var LOOK = {
    halloween: { n: 16, colors: ['#e8833a', '#c4621f', '#8a5a2b', '#6b4fa0'], kinds: ['leaf', 'leaf', 'leaf', 'bat'], fall: 1 },
    christmas: { n: 36, colors: ['#ffffff', '#e6eef7'], kinds: ['snow'], fall: 1 },
    carnival: { n: 30, colors: ['#a855f7', '#f1c40f', '#e5484d', '#22b8cf', '#42b883'], kinds: ['confetti'], fall: 1 },
    easter: { n: 18, colors: ['#f9a8d4', '#fbcfe8', '#fde68a', '#bfdbfe'], kinds: ['petal'], fall: 1 },
    valentine: { n: 18, colors: ['#e5484d', '#f472b6', '#fda4af'], kinds: ['petal', 'heart'], fall: 1 },
    junina: { n: 22, colors: ['#ffb347', '#ffd166', '#ff7b39'], kinds: ['spark'], fall: -1 },
    newyear: { n: 26, colors: ['#e9c46a', '#f4f1de', '#f2a7c3', '#7ad3c4'], kinds: ['spark', 'star'], fall: -1 },
  }

  function rand(a, b) { return a + Math.random() * (b - a) }
  function pick(c) { return !dark && PALE[c] ? PALE[c] : c }
  function make(look, anywhere) {
    return {
      x: rand(0, W), y: anywhere ? rand(0, H) : look.fall > 0 ? rand(-40, -10) : rand(H + 10, H + 40),
      r: rand(3, 7), vx: rand(-12, 12), vy: rand(14, 34) * look.fall, a: rand(0, 6.28), va: rand(-1.5, 1.5),
      sway: rand(0.6, 1.6), c: pick(look.colors[(Math.random() * look.colors.length) | 0]), k: look.kinds[(Math.random() * look.kinds.length) | 0], t: rand(0, 10),
    }
  }

  function resize() {
    dpr = Math.min(2, window.devicePixelRatio || 1)
    W = window.innerWidth
    H = window.innerHeight
    canvas.width = W * dpr
    canvas.height = H * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  function heart(r) {
    ctx.beginPath()
    ctx.moveTo(0, r * 0.9)
    ctx.bezierCurveTo(-r * 1.6, -r * 0.2, -r * 0.5, -r * 1.3, 0, -r * 0.4)
    ctx.bezierCurveTo(r * 0.5, -r * 1.3, r * 1.6, -r * 0.2, 0, r * 0.9)
    ctx.fill()
  }

  function draw(p) {
    ctx.save()
    ctx.translate(p.x, p.y)
    ctx.rotate(p.a)
    ctx.fillStyle = p.c
    if (p.k === 'snow') { ctx.globalAlpha = 0.75; ctx.beginPath(); ctx.arc(0, 0, p.r * 0.45, 0, 6.29); ctx.fill() }
    else if (p.k === 'leaf') { ctx.globalAlpha = 0.7; ctx.beginPath(); ctx.ellipse(0, 0, p.r * 1.3, p.r * 0.6, 0, 0, 6.29); ctx.fill() }
    else if (p.k === 'bat') {
      ctx.globalAlpha = 0.55
      ctx.rotate(-p.a)
      var f = Math.sin(p.t * 9) * p.r * 0.6
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(-p.r, -p.r - f, -p.r * 2.4, -f); ctx.quadraticCurveTo(-p.r, -p.r * 0.2, 0, p.r * 0.5)
      ctx.quadraticCurveTo(p.r, -p.r * 0.2, p.r * 2.4, -f); ctx.quadraticCurveTo(p.r, -p.r - f, 0, 0); ctx.fill()
    }
    else if (p.k === 'confetti') { ctx.globalAlpha = 0.8; ctx.fillRect(-p.r * 0.5, -p.r * 0.25, p.r, p.r * 0.5 * Math.abs(Math.cos(p.t * 3)) + 1) }
    else if (p.k === 'petal') { ctx.globalAlpha = 0.65; ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * 0.5, 0, 0, 6.29); ctx.fill() }
    else if (p.k === 'heart') { ctx.globalAlpha = 0.6; heart(p.r * 0.8) }
    else if (p.k === 'star') { ctx.globalAlpha = 0.5 + 0.4 * Math.sin(p.t * 4); ctx.fillRect(-p.r * 0.15, -p.r, p.r * 0.3, p.r * 2); ctx.fillRect(-p.r, -p.r * 0.15, p.r * 2, p.r * 0.3) }
    else { ctx.globalAlpha = Math.max(0, 0.8 - 0.25 * Math.sin(p.t * 2)); ctx.beginPath(); ctx.arc(0, 0, p.r * 0.35, 0, 6.29); ctx.fill() }
    ctx.restore()
  }

  function frame(now) {
    raf = 0
    var look = LOOK[season]
    if (!look) return
    var dt = Math.min(0.05, (now - last) / 1000 || 0.016)
    last = now
    ctx.clearRect(0, 0, W, H)
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i]
      p.t += dt
      p.x += (p.vx + Math.sin(p.t * p.sway) * 18) * dt
      p.y += p.vy * dt
      p.a += p.va * dt
      if (p.y > H + 50 || p.y < -50 || p.x < -60 || p.x > W + 60) parts[i] = make(look, false)
      draw(p)
    }
    raf = requestAnimationFrame(frame)
  }

  function start() {
    var next = html.getAttribute('data-season')
    if (isDark() !== dark) { dark = !dark; season = null }
    if (next !== season) {
      season = next
      var look = LOOK[season]
      parts = []
      if (look) for (var i = 0; i < Math.round(look.n * Math.min(1, W / 1200 + 0.35)); i++) parts.push(make(look, true))
    }
    if (!season || document.hidden) {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
      ctx.clearRect(0, 0, W, H)
      return
    }
    if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame) }
  }

  resize()
  window.addEventListener('resize', function () { resize(); season = null; start() })
  document.addEventListener('visibilitychange', start)
  window.addEventListener('seasonchange', start)
  new MutationObserver(start).observe(html, { attributes: true, attributeFilter: ['data-theme', 'data-season'] })
  start()
})()
