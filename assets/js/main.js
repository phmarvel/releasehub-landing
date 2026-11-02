/* Page behaviour: language redirect, toggle, focus, menu button. */
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

    // Keep focus on the toggle after switching language.
    if (L.takeFocusMark() && toggles.length) toggles[0].focus();

    var ctas = document.querySelectorAll('[data-cta]');
    for (i = 0; i < ctas.length; i++) ctas[i].setAttribute('href', CTA_HREF);

    // Menu button on phones.
    var btn = document.querySelector('[data-menu-button]');
    var nav = document.getElementById('site-nav');
    if (btn && nav) {
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
        nav.classList.toggle('is-open', !open);
      });
    }
  });
})();
