/* Borovyk Automation — інтерактив сайту (без залежностей) */
(function () {
  var d = document, root = d.documentElement;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js');

  /* ---- header: тінь, ховання при скролі вниз, прогрес ---- */
  var hdr = d.querySelector('.hdr'), prog = d.querySelector('.progress');
  var mbar = d.querySelector('.mbar'), fab = d.querySelector('.tgfab');
  var lastY = 0;
  function onScroll() {
    var y = window.scrollY, h = root.scrollHeight - innerHeight;
    if (prog) prog.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
    if (hdr) {
      hdr.classList.toggle('scrolled', y > 10);
      if (!root.classList.contains('menu-open')) hdr.classList.toggle('hide', y > lastY && y > 400);
    }
    var past = y > innerHeight * 0.6;
    if (mbar) mbar.classList.toggle('on', past);
    if (fab) fab.classList.toggle('on', past);
    lastY = y;
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---- мобільне меню ---- */
  var burger = d.querySelector('.burger');
  if (burger) burger.addEventListener('click', function () {
    var open = root.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', open);
    if (hdr) hdr.classList.remove('hide');
  });
  d.querySelectorAll('.mnav a').forEach(function (a) { a.addEventListener('click', function () { root.classList.remove('menu-open'); }); });

  /* ---- reveal + лічильники + кроки ---- */
  function countUp(el) {
    var raw = el.getAttribute('data-count'), m = raw.match(/^([^\d−-]*)([−-]?)(\d+(?:\.\d+)?)(.*)$/);
    if (!m || reduce || /→/.test(raw)) return;
    var pre = m[1], sign = m[2], target = parseFloat(m[3]), suf = m[4], dec = (m[3].split('.')[1] || '').length, t0 = null;
    function f(t) { if (!t0) t0 = t; var p = Math.min(1, (t - t0) / 1400), e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + sign + (target * e).toFixed(dec) + suf; if (p < 1) requestAnimationFrame(f); }
    requestAnimationFrame(f);
  }
  var targets = d.querySelectorAll('.rv,.step,[data-count]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target; el.classList.add('in');
        if (el.hasAttribute('data-count')) countUp(el);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  } else targets.forEach(function (el) { el.classList.add('in'); });

  /* ---- підсвітка карток за курсором ---- */
  d.addEventListener('pointermove', function (e) {
    var c = e.target.closest && e.target.closest('.spot'); if (!c) return;
    var r = c.getBoundingClientRect();
    c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });

  /* ---- кнопки «Магніт»: хвиля при натисканні, тяжіння до курсора, різні затримки «живої» анімації ---- */
  d.querySelectorAll('.btn').forEach(function (b, i) { b.style.setProperty('--idle', (i * 0.7 % 4).toFixed(1) + 's'); });
  d.addEventListener('pointerdown', function (e) {
    var b = e.target.closest && e.target.closest('.btn'); if (!b) return;
    var r = b.getBoundingClientRect(), s = Math.max(r.width, r.height) * 2.2, sp = d.createElement('span');
    sp.className = 'rip'; sp.style.width = sp.style.height = s + 'px';
    sp.style.left = (e.clientX - r.left - s / 2) + 'px'; sp.style.top = (e.clientY - r.top - s / 2) + 'px';
    b.appendChild(sp); setTimeout(function () { sp.remove(); }, 650);
  });
  if (!reduce && matchMedia('(hover:hover)').matches) {
    var btns = d.querySelectorAll('.btn');
    d.addEventListener('pointermove', function (e) {
      btns.forEach(function (b) {
        var r = b.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        var dx = e.clientX - cx, dy = e.clientY - cy;
        b.style.transform = Math.hypot(dx, dy) < 110 ? 'translate(' + dx * 0.22 + 'px,' + dy * 0.3 + 'px)' : '';
      });
    });
  }

  /* ---- плавні переходи між сторінками (якщо браузер не вміє View Transitions) ---- */
  if ('onpagereveal' in window) root.classList.add('vt');
  else d.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || reduce) return;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#' || /^(https?:|mailto:|tel:)/.test(href)) return;
    e.preventDefault(); root.classList.add('leaving');
    setTimeout(function () { location.href = href; }, 260);
  });
  addEventListener('pageshow', function (e) { if (e.persisted) root.classList.remove('leaving'); });

  /* ---- FAQ: плавне розкриття ---- */
  d.querySelectorAll('.faq details').forEach(function (det) {
    var sum = det.querySelector('summary'), body = det.querySelector('p');
    sum.addEventListener('click', function (e) {
      if (reduce || !body.animate) return;
      e.preventDefault();
      if (det.open) {
        body.animate([{ height: body.offsetHeight + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 320, easing: 'cubic-bezier(.2,.7,.1,1)' }).onfinish = function () { det.open = false; };
      } else {
        det.open = true;
        body.animate([{ height: '0px', opacity: 0 }, { height: body.offsetHeight + 'px', opacity: 1 }], { duration: 420, easing: 'cubic-bezier(.2,.7,.1,1)' });
      }
    });
  });

  /* ---- термінал «наживо» (рядки беруться з data-lines) ---- */
  var term = d.querySelector('[data-term]');
  if (term) {
    var lines = JSON.parse(term.getAttribute('data-lines') || '[]'), i = 0;
    function esc(s) { return String(s).replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }
    function push() {
      if (!lines.length) return;
      var L = lines[i % lines.length], p = d.createElement('p');
      p.innerHTML = '<span class="t">' + esc(L[0]) + '</span> <span class="' + esc(L[1] || '') + '">' + esc(L[2]) + '</span> → ' + esc(L[3]);
      term.appendChild(p);
      while (term.children.length > 12) term.removeChild(term.firstChild);
      i++;
    }
    for (var k = 0; k < 9; k++) push();
    if (!reduce) setInterval(push, 1500);
  }

  /* ---- демо-чат (сценарій з data-script) ---- */
  var chat = d.querySelector('[data-chat]');
  if (chat) {
    var script = JSON.parse(chat.getAttribute('data-script') || '[]'), typing = chat.getAttribute('data-typing') || '...', j = 0;
    function add(m) {
      var el = d.createElement('div'); el.className = 'msg ' + m[0]; el.textContent = m[1];
      if (m[2]) { var kb = d.createElement('div'); kb.className = 'kb'; m[2].forEach(function (t) { var s = d.createElement('span'); s.textContent = t; kb.appendChild(s); }); el.appendChild(kb); }
      chat.appendChild(el);
      while (chat.children.length > 7) chat.removeChild(chat.firstChild);
    }
    function say() {
      if (j >= script.length) { setTimeout(function () { chat.innerHTML = ''; j = 0; say(); }, 4000); return; }
      var m = script[j];
      if (m[0] === 'b') {
        var ty = d.createElement('div'); ty.className = 'msg b typing'; ty.textContent = typing; chat.appendChild(ty);
        setTimeout(function () { ty.remove(); add(m); j++; setTimeout(say, 1400); }, reduce ? 0 : 900);
      } else { add(m); j++; setTimeout(say, 1100); }
    }
    if (script.length) say();
  }

  /* ---- калькулятор рутини ---- */
  var roi = d.querySelector('[data-roi]');
  if (roi) {
    var hEl = d.getElementById('roi-h'), rEl = d.getElementById('roi-r'), aEl = d.getElementById('roi-a');
    var H = roi.getAttribute('data-h'), HM = roi.getAttribute('data-hm'), loc = root.lang === 'en' ? 'en-US' : 'uk-UA';
    function money(v) { return '$' + Math.round(v).toLocaleString(loc); }
    function upd() {
      [hEl, rEl, aEl].forEach(function (x) { x.style.setProperty('--p', ((x.value - x.min) / (x.max - x.min) * 100) + '%'); });
      var hm = hEl.value * 4.33, cost = hm * rEl.value, free = hm * aEl.value / 100;
      d.getElementById('o-h').textContent = hEl.value + ' ' + H;
      d.getElementById('o-r').textContent = '$' + rEl.value;
      d.getElementById('o-a').textContent = aEl.value + '%';
      d.getElementById('o-cost').textContent = money(cost);
      d.getElementById('o-hm').textContent = Math.round(hm) + ' ' + H;
      d.getElementById('o-free').textContent = Math.round(free) + ' ' + HM;
      d.getElementById('o-year').textContent = money(free * rEl.value * 12);
    }
    [hEl, rEl, aEl].forEach(function (x) { x.addEventListener('input', upd); }); upd();
  }

  /* ---- фільтри (кейси) ---- */
  d.querySelectorAll('.filters').forEach(function (f) {
    var scope = d.querySelector(f.getAttribute('data-for'));
    f.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      f.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
      var c = b.getAttribute('data-f');
      scope.querySelectorAll('[data-cat]').forEach(function (it) {
        var hide = c !== 'all' && it.getAttribute('data-cat').split(' ').indexOf(c) < 0;
        it.classList.toggle('off', hide); it.classList.remove('pop');
        if (!hide) { void it.offsetWidth; it.classList.add('pop'); }
      });
    });
  });

  /* ---- форма заявки → /api/lead (Cloudflare Pages Function → Telegram) ---- */
  var form = d.getElementById('lead');
  if (form) {
    var t0 = Date.now();
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (x) {
        var f = x.closest('.f'), bad = !x.value.trim();
        f.classList.toggle('bad', bad); f.querySelector('.err').textContent = bad ? form.getAttribute('data-required') : ''; if (bad) ok = false;
      });
      if (!ok) { form.querySelector('.bad input, .bad textarea').focus(); return; }
      var btn = form.querySelector('button[type=submit]'), lbl = btn.querySelector('.lbl'), old = lbl.textContent;
      var status = form.querySelector('.form-status');
      btn.disabled = true; lbl.textContent = form.getAttribute('data-sending'); status.textContent = '';
      var fd = new FormData(form), data = Object.fromEntries(fd.entries());
      data.channels = fd.getAll('channels').join(', ');
      data.lang = root.lang; data.page = location.pathname; data.elapsed = Date.now() - t0;
      fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function () {
          form.hidden = true;
          var done = d.getElementById('lead-done');
          done.querySelector('[data-name]').textContent = data.name;
          done.hidden = false; done.focus();
        })
        .catch(function () { status.textContent = form.getAttribute('data-error'); })
        .finally(function () { btn.disabled = false; lbl.textContent = old; });
    });
  }

  /* ---- копіювання контактів ---- */
  d.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.copy'); if (!b) return;
    var t = b.getAttribute('data-copy'), label = b.textContent;
    function ok() { b.textContent = b.getAttribute('data-done'); setTimeout(function () { b.textContent = label; }, 1500); }
    function sel() { var s = b.previousElementSibling, rg = d.createRange(); rg.selectNodeContents(s); var w = getSelection(); w.removeAllRanges(); w.addRange(rg); }
    if (navigator.clipboard) navigator.clipboard.writeText(t).then(ok, sel); else sel();
  });

  /* ---- зміст статті ---- */
  var toc = d.querySelectorAll('.toc a');
  if (toc.length && 'IntersectionObserver' in window) {
    var io2 = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) toc.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id); }); });
    }, { rootMargin: '-20% 0px -70% 0px' });
    d.querySelectorAll('.art article h2[id]').forEach(function (h) { io2.observe(h); });
  }
})();
