// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const routes = document.querySelector('nav.routes');
  if (toggle && routes) {
    toggle.addEventListener('click', () => {
      const open = routes.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'x' : '=';
    });
  }

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  // Terminal typing effect (home hero only)
  const typeTarget = document.querySelector('[data-type]');
  if (typeTarget) {
    const text = typeTarget.getAttribute('data-type');
    const speed = 28;
    typeTarget.textContent = '';
    const caret = document.createElement('span');
    caret.className = 'caret';
    typeTarget.after(caret);
    let i = 0;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      typeTarget.textContent = text;
    } else {
      const tick = () => {
        if (i <= text.length) {
          typeTarget.textContent = text.slice(0, i);
          i++;
          setTimeout(tick, speed);
        }
      };
      tick();
    }
  }
});