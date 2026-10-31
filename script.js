(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Scroll reveals: 60ms stagger per sibling (max 6), cleaned up afterwards so card hover is unaffected */
  root.classList.add('js');
  var items = document.querySelectorAll('.rv');
  items.forEach(function (el) {
    var n = 0, s = el.previousElementSibling;
    while (s && n < 5) { if (s.classList.contains('rv')) n++; s = s.previousElementSibling; }
    el.style.setProperty('--i', reduce ? 0 : n);
  });
  function reveal(el) {
    el.classList.add('in');
    setTimeout(function () { el.classList.remove('rv', 'in'); el.style.removeProperty('--i'); }, 1000);
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(reveal);
  }
})();
