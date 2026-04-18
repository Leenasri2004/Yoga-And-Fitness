// ===== PHOTO COUNTER =====
const total   = document.querySelectorAll('.gl-item').length;
const countEl = document.getElementById('photoCount');
if (countEl) {
  let c = 0;
  const t = setInterval(() => {
    c++;
    countEl.textContent = c;
    if (c >= total) clearInterval(t);
  }, 50);
}

// ===== REVEAL =====
function revealAll() {
  // masonry items
  document.querySelectorAll('.gl-item:not(.hidden)').forEach((el, i) => {
    if (el.getBoundingClientRect().top < window.innerHeight + 100) {
      setTimeout(() => el.classList.add('visible'), i * 50);
    }
  });
  // other reveal elements
  document.querySelectorAll('.gl-reveal').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 40) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealAll);
window.addEventListener('load', () => setTimeout(revealAll, 50));
setTimeout(revealAll, 200);

// ===== FILTER =====
const filters    = document.querySelectorAll('.gl-filter');
const items      = document.querySelectorAll('.gl-item');
const countBadge = document.getElementById('visibleCount');
const noResults  = document.getElementById('glNoResults');

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    let visible = 0;
    items.forEach(item => {
      const match = cat === 'all' || item.dataset.cat === cat;
      if (match) {
        item.classList.remove('hidden');
        item.classList.remove('visible');
        visible++;
        setTimeout(() => item.classList.add('visible'), 80);
      } else {
        item.classList.add('hidden');
        item.classList.remove('visible');
      }
    });
    if (countBadge) countBadge.textContent = visible;
    if (noResults)  noResults.style.display = visible === 0 ? 'block' : 'none';
  });
});

// ===== LIGHTBOX =====
const lightbox  = document.getElementById('glLightbox');
const lbImg     = document.getElementById('glLbImg');
const lbTitle   = document.getElementById('glLbTitle');
const lbDesc    = document.getElementById('glLbDesc');
const lbCounter = document.getElementById('glLbCounter');
let currentIdx  = 0;

function getVisible() {
  return [...document.querySelectorAll('.gl-item:not(.hidden) .gl-zoom')];
}

function showImage(idx) {
  const btns = getVisible();
  if (!btns[idx]) return;
  const btn = btns[idx];
  lbImg.style.opacity = '0';
  lbImg.src = btn.dataset.src;
  lbImg.onload = () => { lbImg.style.opacity = '1'; lbImg.style.transition = 'opacity 0.3s'; };
  if (lbTitle)   lbTitle.textContent   = btn.dataset.title || '';
  if (lbDesc)    lbDesc.textContent    = btn.dataset.desc  || '';
  if (lbCounter) lbCounter.textContent = `${idx + 1} / ${btns.length}`;
  currentIdx = idx;
}

function openLb(idx) {
  showImage(idx);
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLb() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.gl-zoom').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const btns = getVisible();
    const idx  = btns.indexOf(btn);
    openLb(idx >= 0 ? idx : 0);
  });
});

document.getElementById('glLbClose')?.addEventListener('click', closeLb);
document.getElementById('glLbOverlay')?.addEventListener('click', closeLb);
document.getElementById('glLbPrev')?.addEventListener('click', () => {
  const len = getVisible().length;
  showImage((currentIdx - 1 + len) % len);
});
document.getElementById('glLbNext')?.addEventListener('click', () => {
  showImage((currentIdx + 1) % getVisible().length);
});

document.addEventListener('keydown', e => {
  if (!lightbox?.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLb();
  if (e.key === 'ArrowLeft')  { const l = getVisible().length; showImage((currentIdx - 1 + l) % l); }
  if (e.key === 'ArrowRight') { showImage((currentIdx + 1) % getVisible().length); }
});

// Touch swipe
let tx = 0;
lightbox?.addEventListener('touchstart', e => { tx = e.touches[0].clientX; });
lightbox?.addEventListener('touchend', e => {
  const diff = tx - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    const l = getVisible().length;
    showImage(diff > 0 ? (currentIdx + 1) % l : (currentIdx - 1 + l) % l);
  }
});
