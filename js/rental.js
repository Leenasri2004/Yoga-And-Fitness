// ===== FLOATING PARTICLES =====
const container = document.getElementById('particles');
if (container) {
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    p.className = 'r-particle';
    const size = Math.random() * 6 + 3;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      animation-duration:${Math.random()*10+8}s;
      animation-delay:${Math.random()*8}s;
      opacity:${Math.random()*0.4+0.1};
    `;
    container.appendChild(p);
  }
}

// ===== COUNTER ANIMATION =====
function runCounter(el) {
  const target = +el.dataset.val;
  const suffix = el.dataset.suffix || '';
  const strong = el.querySelector('strong');
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    strong.textContent = (target >= 1000 ? Math.floor(current).toLocaleString() : Math.floor(current)) + suffix;
  }, 24);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { runCounter(e.target); counterObs.unobserve(e.target); } });
}, { threshold: 0.4 });
document.querySelectorAll('.r-counter').forEach(el => counterObs.observe(el));

// ===== SCROLL REVEAL =====
function revealAll() {
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 60) el.classList.add('visible');
  });
  document.querySelectorAll('.r-tl-item').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 60) el.classList.add('visible');
  });
}
window.addEventListener('scroll', revealAll);
window.addEventListener('load', revealAll);
setTimeout(revealAll, 120);

// ===== BOOKING FORM =====
document.getElementById('rentalForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('.r-submit');
  btn.textContent = '✓ Booking Confirmed!';
  btn.style.background = '#155c53';
  setTimeout(() => { btn.textContent = 'Confirm Booking'; btn.style.background = ''; }, 3000);
});

// ===== HERO SCROLL =====
document.querySelector('.r-hero-scroll')?.addEventListener('click', () => {
  document.querySelector('.r-counters')?.scrollIntoView({ behavior: 'smooth' });
});

