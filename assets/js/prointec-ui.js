/* PROINTEC V7 - microinteracciones corporativas */
(function () {
  'use strict';

  document.documentElement.classList.add('prointec-js');

  // 1. Scroll reveal: applies automatically to reusable components.
  var revealSelectors = [
    '.section-heading-detail', '.detail-section h2', '.detail-section .detail-photo',
    '.detail-card', '.visual-card', '.risk-card', '.norm-grid > div',
    '.application-grid > div', '.compliance-flow > div', '.solar-level',
    '.system-compare', '.scenario-panel', '.detail-alert', '.detail-cta',
    '.service-card', '.supply-product-card', '.why-card', '.process-step',
    '.about-mini', '.image-frame', '.contact-panel', '.prointec-media-card'
  ];
  var revealItems = Array.prototype.slice.call(document.querySelectorAll(revealSelectors.join(',')));
  revealItems.forEach(function (el, i) {
    el.classList.add('p-reveal');
    // Stagger sibling cards subtly, reset every four items.
    var delay = (i % 4) * 70;
    el.style.setProperty('--p-delay', delay + 'ms');
  });

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealItems.forEach(function (el) { observer.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // 2. Header refinement on scroll.
  var header = document.querySelector('.prointec-header');
  function updateHeader() {
    if (!header) return;
    header.classList.toggle('is-compact', window.scrollY > 90);
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  // 3. Mouse-position glow for text cards (desktop only).
  var interactiveCards = document.querySelectorAll('.detail-card,.visual-card,.application-grid>div,.compliance-flow>div,.norm-grid>div,.solar-level,.system-compare,.why-card');
  interactiveCards.forEach(function (card) {
    card.classList.add('p-interactive-card');
    card.addEventListener('pointermove', function (e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  // 4. Button icon / arrow micro-motion.
  document.querySelectorAll('a,button').forEach(function (el) {
    if (el.querySelector('i,svg') || /ver más|conocer|solicitar|cotizar/i.test(el.textContent || '')) {
      el.classList.add('p-action');
    }
  });
})();
