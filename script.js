/* ============================================================
   DOMOKOS PÁL PÉTER ÁLTALÁNOS ISKOLA — script.js
   ============================================================ */

// ── SCROLL TO TOP ──
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── YEAR ──
document.getElementById('year').textContent = new Date().getFullYear();

// ── STICKY HEADER SHADOW ──
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('main-nav');

hamburger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
  hamburger.setAttribute('aria-label', open ? 'Menü bezárása' : 'Menü megnyitása');
});

// Close menu when a link is clicked
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Menü megnyitása');
  });
});

// Close on outside click
document.addEventListener('click', e => {
  if (!header.contains(e.target) && nav.classList.contains('open')) {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// ── ACTIVE NAV LINK ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ── SCROLL FADE-IN ANIMATION ──
const fadeElements = document.querySelectorAll(
  '.about-card, .program-item, .news-card, .doc-card, .info-chip, .contact-block, .contact-map'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeElements.forEach(el => fadeObserver.observe(el));

// ── MOBILE DROPDOWN TOGGLE ──
document.querySelectorAll('.has-dropdown > a').forEach(trigger => {
  trigger.addEventListener('click', e => {
    if (window.innerWidth > 720) return;
    e.preventDefault();
    const item = trigger.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.has-dropdown').forEach(d => d.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── STAGGER CHILDREN ──
document.querySelectorAll('.about-grid, .programs-grid, .news-grid, .docs-grid, .info-strip-grid').forEach(grid => {
  grid.querySelectorAll('.fade-in').forEach((el, i) => {
    el.style.transitionDelay = `${i * 80}ms`;
  });
});
