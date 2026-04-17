// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

// Close nav on link click (mobile)
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Dark mode toggle
const darkToggle = document.getElementById('darkToggle');
const darkIcon = darkToggle?.querySelector('i');

if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
  darkIcon?.classList.replace('fa-moon', 'fa-sun');
}

darkToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('darkMode', isDark);
  darkIcon?.classList.toggle('fa-moon', !isDark);
  darkIcon?.classList.toggle('fa-sun', isDark);
});

// RTL toggle
const rtlToggle = document.getElementById('rtlToggle');
rtlToggle?.addEventListener('click', () => {
  const html = document.documentElement;
  const isRTL = html.getAttribute('dir') === 'rtl';
  html.setAttribute('dir', isRTL ? 'ltr' : 'rtl');
  rtlToggle.innerHTML = isRTL
    ? '<i class="fas fa-exchange-alt"></i> RTL'
    : '<i class="fas fa-exchange-alt"></i> LTR';
});

// Password visibility toggle
function togglePass(id, icon) {
  const input = document.getElementById(id);
  if (!input) return;
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
  icon.classList.toggle('fa-eye', !isPassword);
  icon.classList.toggle('fa-eye-slash', isPassword);
}

// Hero scroll arrow
document.querySelector('.hero-scroll')?.addEventListener('click', () => {
  document.querySelector('.stats')?.scrollIntoView({ behavior: 'smooth' });
});

// Newsletter form feedback
document.querySelector('.newsletter-form')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const input = this.querySelector('input[type="email"]');
  if (input?.value) {
    input.value = '';
    const btn = this.querySelector('button');
    const original = btn.textContent;
    btn.textContent = '✓ Subscribed!';
    setTimeout(() => btn.textContent = original, 2500);
  }
});

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = (target >= 1000
      ? Math.floor(current).toLocaleString()
      : Math.floor(current)) + suffix;
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.counter').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelector('.stats') && counterObserver.observe(document.querySelector('.stats'));
document.querySelector('.h2-strip') && counterObserver.observe(document.querySelector('.h2-strip'));

// Scroll reveal animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.card, .rental-card, .instructor-card, .testimonial-card, .stat-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Video poster click to play
document.getElementById('videoPlayBtn')?.addEventListener('click', () => {
  const iframe = document.getElementById('watchIframe');
  const poster = document.getElementById('videoPoster');
  const btn    = document.getElementById('videoPlayBtn');
  iframe.src = iframe.dataset.src;
  iframe.style.display = 'block';
  poster.style.display = 'none';
  btn.style.display    = 'none';
});

// ===== SCROLL TO TOP BUTTON =====
const scrollBtn = document.createElement('button');
scrollBtn.id = 'scrollTopBtn';
scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollBtn.setAttribute('title', 'Back to top');
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
  scrollBtn.classList.toggle('show', window.scrollY > 300);
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
