/*
 * Language choice helpers. There is no dictionary: English lives in
 * index.html and Arabic in ar/index.html (SRS chapter 5).
 * Storage key: rh.lang ('en' or 'ar'). Every storage access is wrapped
 * because storage can be blocked; the page must work without it.
 */
(function () {
  var KEY = 'rh.lang';
  var FOCUS_KEY = 'rh.focus';

  function getStored() {
    try {
      var v = window.localStorage.getItem(KEY);
      return v === 'en' || v === 'ar' ? v : null;
    } catch (e) {
      return null;
    }
  }

  function setStored(lang) {
    try {
      window.localStorage.setItem(KEY, lang);
    } catch (e) { /* storage blocked: ignore */ }
  }

  function browserLang() {
    var l = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    return String(l).toLowerCase().indexOf('ar') === 0 ? 'ar' : 'en';
  }

  function isCrawler() {
    return /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|lighthouse/i
      .test(navigator.userAgent || '');
  }

  // Language the visitor should see: stored choice first, then the browser.
  function preferredLang() {
    return getStored() || browserLang();
  }

  // Remember that the toggle was used, so focus can return to it (SRS 5.10).
  function markFocus() {
    try {
      window.sessionStorage.setItem(FOCUS_KEY, '1');
    } catch (e) {
      window.name = FOCUS_KEY;
    }
  }

  function takeFocusMark() {
    var found = false;
    try {
      found = window.sessionStorage.getItem(FOCUS_KEY) === '1';
      window.sessionStorage.removeItem(FOCUS_KEY);
    } catch (e) { /* ignore */ }
    if (window.name === FOCUS_KEY) {
      found = true;
      window.name = '';
    }
    return found;
  }

  window.RH_LANG = {
    getStored: getStored,
    setStored: setStored,
    preferredLang: preferredLang,
    isCrawler: isCrawler,
    markFocus: markFocus,
    takeFocusMark: takeFocusMark
  };
})();
