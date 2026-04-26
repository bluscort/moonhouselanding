// ── Hamburger menu ──────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function openMenu()  {
  navLinks.classList.add('open');
  hamburger.classList.add('open');
  navOverlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
  navOverlay.classList.remove('visible');
  document.body.style.overflow = '';
}
function toggleMenu() {
  navLinks.classList.contains('open') ? closeMenu() : openMenu();
}

if (hamburger)  hamburger.addEventListener('click', toggleMenu);
if (navOverlay) navOverlay.addEventListener('click', closeMenu);
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', closeMenu));

// ── Hero slideshow ───────────────────────────────────────
const slides = [
  { url: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=1600&q=80', label: 'Москва, Россия' },
  { url: 'https://img.forbes.kz/forbes-photobank/media/2025-12-03/91c73f12-7da5-4785-ba60-27eaa8b0797c.jpeg', label: 'Астана, Казахстан' },
  { url: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1600&q=80', label: 'Тбилиси, Грузия' },
  { url: 'https://images.pexels.com/photos/5937660/pexels-photo-5937660.jpeg?auto=compress&cs=tinysrgb&w=1600', label: 'Ереван, Армения' },
  { url: 'https://images.pexels.com/photos/32037638/pexels-photo-32037638.jpeg?auto=compress&cs=tinysrgb&w=1600', label: 'Ташкент, Узбекистан' },
];

const container = document.getElementById('hero-slides');
const dotsEl    = document.getElementById('hero-dots');
const labelEl   = document.getElementById('hero-label');
let current = 0;

slides.forEach((s, i) => {
  const el = document.createElement('div');
  el.className = 'hero-slide' + (i === 0 ? ' active' : '');
  el.style.backgroundImage = "url('" + s.url + "')";
  container.appendChild(el);

  const dot = document.createElement('button');
  dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', s.label);
  dot.addEventListener('click', () => goTo(i));
  dotsEl.appendChild(dot);
});

labelEl.textContent = slides[0].label;

function goTo(idx) {
  const els  = container.querySelectorAll('.hero-slide');
  const dots = dotsEl.querySelectorAll('.hero-dot');
  els[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = idx;
  els[current].classList.add('active');
  dots[current].classList.add('active');
  labelEl.textContent = slides[current].label;
}

setInterval(() => goTo((current + 1) % slides.length), 5000);

// ── Toast + form handlers ────────────────────────────────
const toastEl = document.getElementById('toast');
let toastTimer = null;
function showToast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3500);
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Ваша заявка отправлена');
    contactForm.reset();
  });
}

const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Спасибо, вы подписаны на нашу рассылку');
    newsletterForm.reset();
  });
}
