

// ============================================================
// Portfolio JS — Scroll animations, nav, typing, form
// ============================================================

// ---- Navbar scroll state ----
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateNav() {
  const scrolled = window.scrollY > 60;
  navbar.classList.toggle('scrolled', scrolled);

  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    const isActive = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('active', isActive);
    link.setAttribute('aria-current', isActive ? 'page' : 'false');
  });
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

document.addEventListener('click', e => {
  if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

// ---- Reveal on scroll ----
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      const siblings = entry.target.parentElement.querySelectorAll('.reveal, .reveal-right');
      siblings.forEach((el, i) => {
        if (!el.classList.contains('visible')) {
          setTimeout(() => el.classList.add('visible'), i * 120);
        }
      });
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.reveal, .reveal-right').forEach(el => revealObserver.observe(el));

// ---- Typing effect ----
const typingEl = document.getElementById('typingText');
const phrases = [
  'Data Science & ML Engineer',
  'Deep Learning Specialist',
  'NLP & Computer Vision',
  'AI Solutions Architect',
];
let phraseIdx = 0;
let charIdx = 0;
let deleting = false;

function typeEffect() {
  const phrase = phrases[phraseIdx];
  if (!deleting) {
    typingEl.textContent = phrase.slice(0, ++charIdx);
    if (charIdx === phrase.length) {
      deleting = true;
      setTimeout(typeEffect, 2200);
      return;
    }
  } else {
    typingEl.textContent = phrase.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(typeEffect, 400);
      return;
    }
  }
  setTimeout(typeEffect, deleting ? 50 : 80);
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setTimeout(typeEffect, 900);
} else {
  typingEl.textContent = phrases[0];
}

// ---- Smooth scroll ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - navbar.offsetHeight - 16, behavior: 'smooth' });
  });
});

// ---- Contact form ----
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      form.reset();
      btn.textContent = original;
      btn.disabled = false;
      successMsg.hidden = false;
      setTimeout(() => { successMsg.hidden = true; }, 5000);
    }, 1200);
  });
}
