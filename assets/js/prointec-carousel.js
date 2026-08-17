/* PROINTEC V7 - carousel: arrows, autoplay, keyboard and swipe */
(function () {
  'use strict';

  function visibleCount() {
    return window.innerWidth <= 767 ? 1 : (window.innerWidth <= 991 ? 2 : 3);
  }

  document.querySelectorAll('[data-prointec-carousel]').forEach(function (root) {
    var viewport = root.querySelector('.prointec-carousel-viewport');
    var track = root.querySelector('.prointec-carousel-track');
    var items = Array.prototype.slice.call(root.querySelectorAll('.prointec-carousel-item'));
    var prev = root.querySelector('[data-carousel-prev]');
    var next = root.querySelector('[data-carousel-next]');
    var index = 0;
    var timer = null;
    var startX = 0;
    var currentX = 0;
    var dragging = false;

    if (!viewport || !track || !items.length) return;

    function maxIndex() {
      return Math.max(0, items.length - visibleCount());
    }

    function stepWidth() {
      var rect = items[0].getBoundingClientRect();
      var gap = parseFloat(getComputedStyle(track).gap) || 0;
      return rect.width + gap;
    }

    function render(animate) {
      var max = maxIndex();
      if (index > max) index = max;
      if (index < 0) index = 0;
      track.classList.toggle('no-transition', animate === false);
      track.style.transform = 'translate3d(-' + (index * stepWidth()) + 'px,0,0)';
      if (prev) prev.disabled = index === 0;
      if (next) next.disabled = index === max;
      window.requestAnimationFrame(function () {
        if (animate === false) track.classList.remove('no-transition');
      });
    }

    function go(delta) {
      var max = maxIndex();
      var target = index + delta;
      // Loop only when there is somewhere to move.
      if (target > max) target = 0;
      if (target < 0) target = max;
      index = target;
      render(true);
    }

    function stop() {
      if (timer) window.clearInterval(timer);
      timer = null;
    }

    function start() {
      stop();
      if (maxIndex() > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        timer = window.setInterval(function () { go(1); }, 5500);
      }
    }

    if (prev) prev.addEventListener('click', function () { go(-1); start(); });
    if (next) next.addEventListener('click', function () { go(1); start(); });

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);

    root.setAttribute('tabindex', '0');
    root.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') { event.preventDefault(); go(-1); start(); }
      if (event.key === 'ArrowRight') { event.preventDefault(); go(1); start(); }
    });

    function pointerStart(x) {
      dragging = true;
      startX = currentX = x;
      viewport.classList.add('is-dragging');
      track.classList.add('no-transition');
      stop();
    }
    function pointerMove(x) {
      if (!dragging) return;
      currentX = x;
      var delta = currentX - startX;
      track.style.transform = 'translate3d(' + (-index * stepWidth() + delta) + 'px,0,0)';
    }
    function pointerEnd() {
      if (!dragging) return;
      var delta = currentX - startX;
      dragging = false;
      viewport.classList.remove('is-dragging');
      track.classList.remove('no-transition');
      if (Math.abs(delta) > 55) go(delta < 0 ? 1 : -1);
      else render(true);
      start();
    }

    viewport.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      pointerStart(e.clientX);
      try { viewport.setPointerCapture(e.pointerId); } catch (_) {}
    });
    viewport.addEventListener('pointermove', function (e) { pointerMove(e.clientX); });
    viewport.addEventListener('pointerup', pointerEnd);
    viewport.addEventListener('pointercancel', pointerEnd);

    window.addEventListener('resize', function () { render(false); start(); });
    render(false);
    start();
  });
})();
