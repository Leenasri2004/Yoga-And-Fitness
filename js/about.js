// ===== SCROLL REVEAL =====
function abReveal() {
  document.querySelectorAll('.ab-reveal, .ab-reveal-left, .ab-reveal-right').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', abReveal);
window.addEventListener('load', () => setTimeout(abReveal, 100));
setTimeout(abReveal, 200);

// ===== COUNTER ANIMATION =====
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.val;
    const suffix = el.dataset.suffix || '';
    const strong = el.querySelector('strong');
    let current = 0;
    const step = target / 60;
    const t = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(t); }
      strong.textContent = (target >= 1000
        ? Math.floor(current).toLocaleString()
        : Math.floor(current)) + suffix;
    }, 24);
    counterObs.unobserve(el);
  });
}, { threshold: 0.4 });
document.querySelectorAll('.ab-num').forEach(el => counterObs.observe(el));

// ===== PROGRESS BARS =====
const barObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.ab-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.width + '%';
    });
    barObs.unobserve(entry.target);
  });
}, { threshold: 0.3 });
const barsSection = document.querySelector('.ab-bars');
if (barsSection) barObs.observe(barsSection);

// ===== SMOOTH SCROLL FOR HERO CTA =====
document.querySelector('.ab-hero-cta')?.addEventListener('click', e => {
  e.preventDefault();
  document.querySelector('#story')?.scrollIntoView({ behavior: 'smooth' });
});
