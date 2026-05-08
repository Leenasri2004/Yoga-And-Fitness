// ===== FILTER TABS =====
const filterBtns = document.querySelectorAll('.filter-btn');
const classCards = document.querySelectorAll('.class-card');
const noResults = document.getElementById('noResults');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    let visible = 0;

    classCards.forEach(card => {
      const match = filter === 'all' || card.dataset.level === filter;
      card.style.display = match ? 'block' : 'none';
      if (match) visible++;
    });

    noResults.style.display = visible === 0 ? 'block' : 'none';
  });
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    // close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.class-card, .step-card, .pricing-card, .bring-item, .faq-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(22px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

// ===== SKILL PATH SCROLL ANIMATION =====
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });
document.querySelectorAll('.skill-node').forEach(n => skillObs.observe(n));
