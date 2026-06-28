/* =============================================
   NAV – scroll effect & active link
   ============================================= */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav__links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Sticky style
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link highlight
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

/* =============================================
   MOBILE NAV BURGER
   ============================================= */
const burger = document.getElementById('burger');
const navMenu = document.querySelector('.nav__links');

burger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const isOpen = navMenu.classList.contains('open');
  burger.setAttribute('aria-expanded', isOpen);
});

// Close on link click
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

/* =============================================
   TYPED TEXT EFFECT
   ============================================= */
const phrases = [
  'AI Student',
  'Frontend Developer',
  'C++ Programmer',
  'Problem Solver',
];

const typedEl = document.getElementById('typed');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === currentPhrase.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(typeLoop, delay);
}

typeLoop();

/* =============================================
   SCROLL REVEAL
   ============================================= */
const revealTargets = [
  '.about__grid',
  '.skill-card',
  '.project-card',
  '.contact__info',
  '.contact__form',
  '.section__header',
];

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function initReveal() {
  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  });
}

initReveal();

/* =============================================
   CONTACT FORM
   ============================================= */
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.className = 'form-note';

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Basic validation
  if (!name || !email || !message) {
    formNote.textContent = 'Please fill in all fields.';
    formNote.classList.add('error');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    formNote.textContent = 'Please enter a valid email address.';
    formNote.classList.add('error');
    return;
  }

  // Simulate submission
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

  setTimeout(() => {
    formNote.textContent = '✓ Message sent! I\'ll get back to you soon.';
    contactForm.reset();
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
  }, 1200);
});
