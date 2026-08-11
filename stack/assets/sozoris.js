/* Sozoris — shared interactions */
(function () {
  // ---------- Palette switcher (review tool) ----------
  // Three palettes ship so the brand direction can be compared live. The
  // active one is stamped on <html data-palette> by the inline head script
  // (see Base.astro) before first paint, so there is no flash of the wrong
  // colours. Delete this block, the .pswitch markup and the head script
  // once a palette is chosen.
  var PALETTES = [
    { id: 'olive',   name: 'Olive & Pewter' },
    { id: 'slate',   name: 'Slate & Steel' },
    { id: 'storm',   name: 'Storm & Ash' }
  ];
  var sw = document.querySelector('.pswitch');
  if (sw) {
    var current = document.documentElement.getAttribute('data-palette') || 'olive';
    PALETTES.forEach(function (p) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('data-p', p.id);
      b.setAttribute('aria-pressed', p.id === current ? 'true' : 'false');
      b.setAttribute('aria-label', 'Palette: ' + p.name);
      b.title = p.name;
      b.addEventListener('click', function () {
        document.documentElement.setAttribute('data-palette', p.id);
        try { localStorage.setItem('sozoris-palette', p.id); } catch (e) { /* private mode */ }
        sw.querySelectorAll('button').forEach(function (o) {
          o.setAttribute('aria-pressed', o === b ? 'true' : 'false');
        });
      });
      sw.appendChild(b);
    });
  }

  // ---------- Rotating etymology line ----------
  // σῴζω → sōzō → the definition → Sozoris, then loops. The brand name holds
  // longer than the other steps so the loop reads as landing somewhere rather
  // than just spinning. Pauses while the tab is hidden (no work off-screen) and
  // degrades to the full static phrase under prefers-reduced-motion.
  document.querySelectorAll('[data-cycle]').forEach(function (el) {
    var steps = (el.getAttribute('data-cycle') || '').split('|').filter(Boolean);
    var t = el.querySelector('.cyc-t');
    var sr = el.querySelector('.cyc-sr');
    if (!t || steps.length < 2) return;

    var slow = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (slow) {                              // show the whole phrase, never animate
      if (sr) t.textContent = sr.textContent;
      return;
    }

    var i = 0, timer;
    var HOLD = 2200, HOLD_NAME = 3400, FADE = 340;
    function isName(n) { return n === steps.length - 1; }
    function schedule() { timer = setTimeout(next, isName(i) ? HOLD_NAME : HOLD); }
    function next() {
      el.classList.add('is-out');            // fade the current step out
      setTimeout(function () {
        i = (i + 1) % steps.length;
        t.textContent = steps[i];
        el.classList.toggle('is-name', isName(i));
        el.classList.remove('is-out');       // fade the new step in
        schedule();
      }, FADE);
    }
    document.addEventListener('visibilitychange', function () {
      clearTimeout(timer);
      if (!document.hidden) schedule();
    });
    schedule();
  });

  // ---------- Scroll-shrink / darken navbar ----------
  var hdr = document.querySelector('header');
  function onScroll() { if (hdr) hdr.classList.toggle('scrolled', window.scrollY > 24); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // ---------- Mobile menu ----------
  var burger = document.querySelector('.burger');
  var mnav = document.querySelector('.mnav');
  var backdrop = document.querySelector('.mbackdrop');
  function setMenu(open) {
    if (!mnav) return;
    mnav.classList.toggle('open', open);
    if (backdrop) backdrop.classList.toggle('open', open);
    if (burger) burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (burger) burger.addEventListener('click', function () { setMenu(!mnav.classList.contains('open')); });
  if (backdrop) backdrop.addEventListener('click', function () { setMenu(false); });
  if (mnav) mnav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });

  // ---------- Sliding highlight pill that follows hovered link ----------
  var navlinks = document.querySelector('.nav-links');
  var pill = document.querySelector('.navpill');
  if (navlinks && pill) {
    var links = Array.prototype.slice.call(navlinks.querySelectorAll('.navlink'));
    var activeLink = navlinks.querySelector('.navlink.active');
    function movePill(el) {
      if (!el) { pill.style.opacity = '0'; return; }
      var r = el.getBoundingClientRect(), pr = navlinks.getBoundingClientRect();
      pill.style.left = (r.left - pr.left) + 'px';
      pill.style.width = r.width + 'px';
      pill.style.opacity = '1';
    }
    links.forEach(function (a) { a.addEventListener('mouseenter', function () { movePill(a); }); });
    navlinks.addEventListener('mouseleave', function () { movePill(activeLink); });
    var settle = function () { movePill(activeLink); };
    requestAnimationFrame(settle);
    window.addEventListener('load', settle);
    window.addEventListener('resize', settle);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(settle);
    setTimeout(settle, 300);
  }

  // ---------- Cursor-following spotlight on cards ----------
  document.querySelectorAll('.card').forEach(function (c) {
    c.addEventListener('pointermove', function (e) {
      var r = c.getBoundingClientRect();
      c.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      c.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });

  // ---------- Animated stat counters ----------
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function runCounters(scope) {
    scope.querySelectorAll('.num').forEach(function (el) {
      if (el.dataset.done) return; el.dataset.done = '1';
      var to = +el.getAttribute('data-to'), dur = 1700, t0 = null;
      if (reduce) { el.textContent = to; return; }
      function step(ts) { if (!t0) t0 = ts; var p = Math.min((ts - t0) / dur, 1);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); }
      requestAnimationFrame(step);
    });
  }

  // ---------- Home services showcase: scroll-driven sheets + pinned panel ----------
  var hsv = document.querySelector('.hsv');
  if (hsv) {
    var hsheets = Array.prototype.slice.call(hsv.querySelectorAll('.hsv-sheet'));
    var hpanes = Array.prototype.slice.call(hsv.querySelectorAll('.hsv-pane'));
    var hdots = Array.prototype.slice.call(hsv.querySelectorAll('.hsv-dot'));
    var htrack = hsv.querySelector('.hsv-track');
    var HN = hsheets.length, hcur = -1;
    function hsvSet(i) {
      if (i === hcur) return; hcur = i;
      hsheets.forEach(function (c, k) { c.style.transform = k <= i ? 'translateY(0)' : 'translateY(110%)'; c.style.zIndex = k; });
      hpanes.forEach(function (p, k) { p.classList.toggle('active', k === i); });
      hdots.forEach(function (d, k) { d.classList.toggle('on', k === i); });
    }
    function hsvScroll() {
      if (window.innerWidth <= 880) { return; }
      var rect = htrack.getBoundingClientRect();
      var total = htrack.offsetHeight - window.innerHeight;
      var scrolled = Math.min(Math.max(-rect.top, 0), total);
      var p = total > 0 ? scrolled / total : 0;
      hsvSet(Math.min(HN - 1, Math.floor(p * HN + 0.0001)));
    }
    window.addEventListener('scroll', hsvScroll, { passive: true });
    window.addEventListener('resize', hsvScroll);
    hsvSet(0); hsvScroll();
  }

  // ---------- Circular reveal CTA (gated by the --jaws CSS flag) ----------
  // The paper section is masked by a clip-path circle that blooms from the
  // bottom-centre of the SCREEN (origin pinned to the viewport bottom) and
  // grows to cover the whole viewport as the section scrolls up.
  var jaws = document.querySelector('.ctajaws');
  if (jaws) {
    var jcta = jaws.querySelector('.cta-in');
    var jreduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function jawScroll() {
      var on = getComputedStyle(jaws).getPropertyValue('--jaws').trim() === '1';
      if (!on || jreduce || !jcta) {
        jaws.style.removeProperty('--cr'); jaws.style.removeProperty('--cy');
        if (jcta) { jcta.style.opacity = ''; jcta.style.transform = ''; }
        return;
      }
      var vh = window.innerHeight, r = jaws.getBoundingClientRect();
      var cover = Math.hypot(window.innerWidth / 2, vh) * 1.05;   // radius to fill from bottom-centre
      var p = Math.max(0, Math.min(1, (vh - r.top) / (vh * 1.3)));
      // keep the circle origin at the viewport bottom in the section's local coords
      jaws.style.setProperty('--cy', (vh - r.top).toFixed(1) + 'px');
      jaws.style.setProperty('--cr', (cover * Math.min(1, p / 0.85)).toFixed(1) + 'px');
      var op = Math.max(0, Math.min(1, (p - 0.45) / 0.4));        // CTA settles once the bloom passes it
      jcta.style.opacity = op.toFixed(3);
      jcta.style.transform = 'scale(' + (0.97 + 0.03 * op).toFixed(3) + ')';
    }
    window.addEventListener('scroll', jawScroll, { passive: true });
    window.addEventListener('resize', jawScroll);
    jawScroll();
  }

  document.querySelectorAll('.stats').forEach(function (statsEl) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { runCounters(statsEl); io.unobserve(en.target); } });
    }, { threshold: 0.3 });
    io.observe(statsEl);
  });
})();
