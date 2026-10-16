/* vueleap seasons: sets data-season on <html> on special dates, in the
   visitor's local time. ?season=<id> forces one, ?season=off turns it off.
   A small chip lets visitors switch the theme off; the choice is kept per
   season in localStorage. The art and the CSS react to the attribute. */
(function (root) {
  'use strict'
  var DAY = 864e5
  var NAMES = { newyear: 'New Year', carnival: 'Carnival', easter: 'Easter', valentine: "Valentine's", junina: 'Festa Junina', halloween: 'Halloween', christmas: 'Christmas' }

  // Easter Sunday, anonymous Gregorian algorithm. Month is 0 based.
  function easter(y) {
    var a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4
    var f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3)
    var h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4
    var l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451)
    var month = Math.floor((h + l - 7 * m + 114) / 31)
    return new Date(y, month - 1, ((h + l - 7 * m + 114) % 31) + 1)
  }

  function between(day, from, to) { return day >= from && day <= to }

  // The season for a local date, or null. `lang` is the visitor's language.
  function seasonFor(date, lang) {
    var y = date.getFullYear(), m = date.getMonth(), d = date.getDate()
    var day = new Date(y, m, d).getTime()
    var br = /^pt-br/i.test(lang || '')
    var md = m * 100 + d
    if (md >= 1130 || md <= 2) return 'newyear'
    var e = easter(y).getTime()
    var ash = e - 46 * DAY
    if (between(day, ash - 4 * DAY, ash)) return 'carnival'
    if (between(day, e - 2 * DAY, e)) return 'easter'
    if (md === 114 || (br && md === 512)) return 'valentine'
    if (md >= 513 && md <= 529) return 'junina'
    if (md >= 924 && md <= 931) return 'halloween'
    if (md >= 1118 && md <= 1126) return 'christmas'
    return null
  }

  function label(id, lang) {
    if (id === 'junina' && !/^pt-br/i.test(lang || '')) return 'Midsummer'
    return NAMES[id]
  }

  var api = { easter: easter, seasonFor: seasonFor, label: label, ids: Object.keys(NAMES) }
  root.vueleapSeasons = api
  var doc = root.document
  if (!doc) return

  var lang = (root.navigator && (root.navigator.languages || [])[0]) || (root.navigator && root.navigator.language) || ''
  var forced = /[?&]season=([a-z]+)/.exec(root.location.search)
  var id = forced ? (forced[1] === 'off' ? null : NAMES[forced[1]] ? forced[1] : null) : seasonFor(new Date(), lang)
  if (!id) return
  var key = 'vueleap-season-off:' + id
  // Storage can throw in private windows; the theme then simply stays on.
  var store = {
    get: function () { try { return root.localStorage.getItem(key) } catch { return null } },
    set: function (v) { try { if (v) root.localStorage.setItem(key, '1'); else root.localStorage.removeItem(key) } catch { return } },
  }
  var html = doc.documentElement
  var on = forced ? true : store.get() !== '1'
  var base = (doc.currentScript && doc.currentScript.src || '').replace(/seasons\.js(\?.*)?$/, '')
  var fx = false
  // The particles need <body>, so they load from the chip, once the page is parsed.
  function apply(ready) {
    if (on) html.setAttribute('data-season', id)
    else html.removeAttribute('data-season')
    var still = root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (ready && on && !still && !fx && base) {
      fx = true
      var s = doc.createElement('script')
      s.src = base + 'seasons/fx.js'
      s.defer = true
      doc.head.appendChild(s)
    }
  }
  apply()

  function chip() {
    var name = label(id, lang)
    var el = doc.createElement('div')
    el.className = 'season-chip'
    el.setAttribute('data-for', id)
    el.innerHTML = '<span class="season-chip-icon" aria-hidden="true"></span><span class="season-chip-text">' + name + ' mode</span><button type="button" class="season-switch" role="switch" aria-label="' + name + ' mode"></button>'
    var sw = el.querySelector('button')
    var sync = function () { sw.setAttribute('aria-checked', String(on)); el.classList.toggle('is-off', !on) }
    sw.addEventListener('click', function () {
      on = !on
      store.set(!on)
      apply(true)
      sync()
      root.dispatchEvent(new CustomEvent('seasonchange', { detail: on ? id : null }))
    })
    sync()
    doc.body.appendChild(el)
    apply(true)
  }
  if (doc.body) chip()
  else doc.addEventListener('DOMContentLoaded', chip)
})(typeof window !== 'undefined' ? window : globalThis)
