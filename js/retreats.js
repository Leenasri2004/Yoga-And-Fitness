// ===== SCROLL REVEAL =====
function rtReveal() {
  document.querySelectorAll('.rt-reveal, .rt-reveal-left, .rt-reveal-right').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', rtReveal);
window.addEventListener('load', rtReveal);
setTimeout(rtReveal, 120);

// ===== HERO SCROLL =====
document.querySelector('.rt-hero-scroll')?.addEventListener('click', () => {
  document.querySelector('.rt-marquee-wrap')?.scrollIntoView({ behavior: 'smooth' });
});

// ===== TESTIMONIAL SLIDER =====
const quotes = document.querySelectorAll('.rt-quote');
const dots   = document.querySelectorAll('.rt-qdot');
let current  = 0;

function showQuote(idx) {
  quotes.forEach(q => q.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  quotes[idx]?.classList.add('active');
  dots[idx]?.classList.add('active');
  current = idx;
}

dots.forEach(dot => {
  dot.addEventListener('click', () => showQuote(+dot.dataset.q));
});

// Auto-rotate every 4s
setInterval(() => showQuote((current + 1) % quotes.length), 4000);

// ===== ENQUIRY FORM =====
document.getElementById('retreatForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('.rt-submit');
  const orig = btn.textContent;
  btn.textContent = '✓ Enquiry Sent!';
  btn.style.background = '#155c53';
  setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 3000);
});
