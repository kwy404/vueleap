// vueleap docs: the few behaviors that are not declarative.
// Everything else (tabs, filters, the checklist, the theme) is Voodoo.js in the markup.
(function () {
  'use strict'

  // The journey: fill the route line as the stops scroll past, light the stops reached.
  var journey = document.querySelector('.journey')
  if (journey) {
    var stops = Array.prototype.slice.call(journey.querySelectorAll('.stop'))
    var items = Array.prototype.slice.call(journey.querySelectorAll('.route-stop'))
    var queued = false
    var update = function () {
      queued = false
      var anchor = window.innerHeight * 0.4
      var tops = stops.map(function (s) { return s.getBoundingClientRect().top })
      var current = -1
      for (var i = 0; i < tops.length; i++) if (tops[i] <= anchor) current = i
      var progress = 0
      if (current >= 0) {
        var last = stops.length - 1
        if (current >= last) {
          progress = 1
        } else {
          var span = tops[current + 1] - tops[current]
          var frac = span > 0 ? Math.min(1, Math.max(0, (anchor - tops[current]) / span)) : 0
          progress = (current + frac) / last
        }
      }
      journey.style.setProperty('--p', progress.toFixed(4))
      items.forEach(function (item, index) {
        item.classList.toggle('is-reached', index <= current)
        item.classList.toggle('is-current', index === current)
        var link = item.querySelector('a')
        if (index === current) link.setAttribute('aria-current', 'step')
        else link.removeAttribute('aria-current')
      })
    }
    var queue = function () {
      if (!queued) { queued = true; window.requestAnimationFrame(update) }
    }
    window.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', queue)
    update()
  }

  // Guides: keep the current stone of the stepper in view on small screens.
  var stone = document.querySelector('.stone.is-current')
  if (stone) {
    var bar = stone.closest('.stepbar-in')
    if (bar && bar.scrollWidth > bar.clientWidth) bar.scrollLeft = stone.offsetLeft - (bar.clientWidth - stone.offsetWidth) / 2
  }

  // Search dialog: arrow keys move through the visible results, a result closes it.
  var dialog = document.getElementById('search')
  if (dialog) {
    var visible = function () {
      return Array.prototype.slice.call(dialog.querySelectorAll('.command-palette-item')).filter(function (a) { return a.offsetParent !== null })
    }
    dialog.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp' && event.key !== 'Enter') return
      var links = visible()
      if (!links.length) return
      var at = links.indexOf(document.activeElement)
      if (event.key === 'Enter') {
        if (at === -1) { event.preventDefault(); links[0].click() }
        return
      }
      event.preventDefault()
      var next = event.key === 'ArrowDown' ? (at + 1) % links.length : (at <= 0 ? links.length - 1 : at - 1)
      links[next].focus()
    })
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog || event.target.closest('.command-palette-item')) dialog.close()
    })
    document.addEventListener('keydown', function (event) {
      var tag = (event.target && event.target.tagName) || ''
      if (event.key === '/' && !dialog.open && !/INPUT|TEXTAREA|SELECT/.test(tag) && !event.target.isContentEditable) {
        event.preventDefault()
        dialog.showModal()
      }
    })
  }
})()
