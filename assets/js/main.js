/* Page behaviour: language redirect, toggle, focus, sheet menu. */
(function () {
  var doc = document.documentElement;
  var L = window.RH_LANG;
  doc.classList.add('js');
  if (!L) return;

  // Opened from disk (file://) there is no server to serve a folder's
  // index.html, so folder links get the file name added. On a server the
  // links stay as written ("ar/", "../").
  var onDisk = window.location.protocol === 'file:';

  // RHL-8: the one place for the call-to-action target (open item: a real
  // mailto: or booking address). Every [data-cta] link gets this href.
  var CTA_HREF = '#';

  var isEnglish = doc.getAttribute('lang') === 'en';

  // First visit to the English page: go to Arabic when the stored choice or
  // the browser language says so. Crawlers are never redirected.
  if (isEnglish && !L.isCrawler() && L.preferredLang() === 'ar') {
    window.location.replace(onDisk ? 'ar/index.html' : 'ar/');
    return;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var toggles = document.querySelectorAll('[data-lang-switch]');
    var i;
    for (i = 0; i < toggles.length; i++) {
      if (onDisk) toggles[i].setAttribute('href', toggles[i].getAttribute('href') + 'index.html');
      toggles[i].addEventListener('click', function (e) {
        var target = e.currentTarget.getAttribute('hreflang');
        if (target === 'en' || target === 'ar') L.setStored(target);
        L.markFocus();
      });
    }

    // Keep focus on the first visible toggle after switching language.
    if (L.takeFocusMark()) {
      for (i = 0; i < toggles.length; i++) {
        if (toggles[i].offsetParent !== null) { toggles[i].focus(); break; }
      }
    }

    var ctas = document.querySelectorAll('[data-cta]');
    for (i = 0; i < ctas.length; i++) ctas[i].setAttribute('href', CTA_HREF);

    // Hero board: every plate flips once on load, like a split-flap display. The final
    // text is already in the HTML (no JS, crawlers, reduced motion see it as is); here each
    // plate first shows another character, then swaps it halfway through its flip.
    var boards = document.querySelectorAll('[data-flip]');
    if (boards.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var pools = ['ABCDEFGHJKLMNOPRSTUVWXYZ', '0123456789', '٠١٢٣٤٥٦٧٨٩'];
      Array.prototype.forEach.call(boards, function (board) {
        var rows = board.querySelectorAll('.board-row');
        Array.prototype.forEach.call(rows, function (row, r) {
          var plates = row.querySelectorAll('.ch');
          Array.prototype.forEach.call(plates, function (el, k) {
            var final = el.textContent;
            var from = el.getAttribute('data-from');
            if (!from) {
              var pool = pools[/[0-9]/.test(final) ? 1 : /[٠-٩]/.test(final) ? 2 : 0];
              from = pool.charAt(Math.floor(Math.random() * pool.length));
            }
            el.textContent = from;
            var delay = 250 + r * 160 + k * 45;
            setTimeout(function () {
              el.classList.add('is-flip');
              setTimeout(function () { el.textContent = final; }, 210);
              setTimeout(function () { el.classList.remove('is-flip'); }, 440);
            }, delay);
          });
        });
      });
    }

    // Sheet menu on phones: tap, Enter/Space, Escape, backdrop; focus stays inside.
    var btn = document.querySelector('[data-menu-button]');
    var sheet = document.getElementById('sheet');
    if (btn && sheet) {
      var panel = sheet.querySelector('.sheet-panel');
      var focusables = function () {
        return panel.querySelectorAll('a[href], button:not([disabled])');
      };
      var setOpen = function (open) {
        sheet.hidden = !open;
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.style.overflow = open ? 'hidden' : '';
        if (open) focusables()[0].focus(); else btn.focus();
      };
      btn.addEventListener('click', function () { setOpen(sheet.hidden); });
      sheet.addEventListener('click', function (e) {
        if (e.target.closest('[data-sheet-close]')) {
          var link = e.target.closest('a');
          sheet.hidden = true;
          btn.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
          if (!link) btn.focus();
        }
      });
      document.addEventListener('keydown', function (e) {
        if (sheet.hidden) return;
        if (e.key === 'Escape') { setOpen(false); return; }
        if (e.key !== 'Tab') return;
        var f = focusables();
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      });
      // Back to a wide screen: the sheet has no place any more.
      window.matchMedia('(min-width: 1024px)').addEventListener('change', function (m) {
        if (m.matches && !sheet.hidden) { sheet.hidden = true; btn.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; }
      });
    }
  });
})();
