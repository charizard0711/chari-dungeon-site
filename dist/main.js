const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() {
  if (!menuToggle || !mobileNav) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'メニューを開く');
  mobileNav.hidden = true;
}
menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  mobileNav.hidden = !open;
});
mobileNav?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') { closeMenu(); menuToggle.focus(); }
});
matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const weapons = {
  arcadia: { image: 'arcadia.png', name: '覇天剣アルカディア', kicker: 'THE RADIANT GREATSWORD', description: '攻撃を当てるたび、HPを10回復する光の大剣。', skill: '旋風斬り', skillDescription: '周囲8マスを斬り、敵を1マス押し戻す。', numeral: 'I' },
  bow: { image: 'bow.png', name: '弓', kicker: 'PRECISION FROM AFAR', description: '敵との距離を保ち、遠くから好機を射抜く。', skill: '穿ち矢', skillDescription: '前方7マス以内の敵1体へ、重い一撃。', numeral: 'II' },
  dagger: { image: 'dagger.png', name: '短剣', kicker: 'A STRIKE FROM THE SHADOWS', description: '懐に飛び込み、一瞬の隙を自分のものに。', skill: '影渡り', skillDescription: '前方3マス以内の敵の背後へ移動して一撃。', numeral: 'III' }
};
const tabs = [...document.querySelectorAll('[data-weapon]')];
function selectWeapon(tab) {
  const data = weapons[tab.dataset.weapon];
  tabs.forEach(item => { const selected = item === tab; item.setAttribute('aria-selected', String(selected)); item.tabIndex = selected ? 0 : -1; });
  document.querySelector('#weapon-panel').setAttribute('aria-labelledby', tab.id);
  const image = document.querySelector('#weapon-image');
  image.src = `assets/${data.image}`;
  image.alt = data.name;
  document.querySelector('#weapon-name').textContent = data.name;
  document.querySelector('#weapon-kicker').textContent = data.kicker;
  document.querySelector('#weapon-description').textContent = data.description;
  document.querySelector('#weapon-skill-name').textContent = data.skill;
  document.querySelector('#weapon-skill-description').textContent = data.skillDescription;
  document.querySelector('.weapon-numeral').textContent = data.numeral;
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectWeapon(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); tabs[next].focus(); selectWeapon(tabs[next]); }
  });
});

const dateLinks = [...document.querySelectorAll('.patch-nav a')];
function markDate() {
  const hash = !location.hash || location.hash === '#next-update' ? '#2026-10-03-expansion' : location.hash;
  dateLinks.forEach(link => { if (link.hash === hash) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
}
window.addEventListener('hashchange', markDate);
markDate();

// Keep existing homepage bookmarks working after moving the introduction.
if (/(?:\/|\/index\.html)$/.test(location.pathname) && ['#about', '#world', '#weapons', '#guide'].includes(location.hash)) {
  location.replace(`game.html${location.hash}`);
}

const carousel = document.querySelector('[data-carousel]');
if (carousel) {
  const viewport = carousel.querySelector('.carousel-viewport');
  const track = carousel.querySelector('.carousel-track');
  const slides = [...carousel.querySelectorAll('.banner')];
  const dots = [...carousel.querySelectorAll('[data-slide]')];
  const pause = carousel.querySelector('.carousel-pause');
  const announcement = carousel.querySelector('.carousel-announcement');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let stopped = reducedMotion.matches;
  let inView = false;
  let timer;
  let pointerStart;
  let suppressClickUntil = 0;

  function schedule() {
    clearTimeout(timer);
    const focused = document.activeElement;
    const reading = viewport.contains(focused) || (focused !== pause && carousel.contains(focused) && focused.matches(':focus-visible'));
    if (!stopped && !reading && !pointerStart && inView && !document.hidden) {
      timer = setTimeout(() => show(current + 1), 5000);
    }
  }
  function updatePlayback() {
    pause.textContent = stopped ? '自動再生' : '一時停止';
    pause.setAttribute('aria-label', stopped ? '自動切り替えを開始' : '自動切り替えを停止');
    schedule();
  }
  function show(index, manual = false) {
    const focusWasOnSlide = slides[current].contains(document.activeElement);
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    slides.forEach((slide, i) => {
      slide.inert = i !== current;
      slide.setAttribute('aria-hidden', String(i !== current));
    });
    dots.forEach((dot, i) => {
      if (i === current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    if (manual) {
      announcement.textContent = slides[current].getAttribute('aria-label');
      if (focusWasOnSlide) slides[current].querySelector('a').focus({ preventScroll: true });
    }
    updatePlayback();
  }

  carousel.classList.add('is-enhanced');
  carousel.querySelector('.carousel-controls').hidden = false;
  show(0);
  dots.forEach(dot => dot.addEventListener('click', () => show(Number(dot.dataset.slide), true)));
  pause.addEventListener('click', () => { stopped = !stopped; updatePlayback(); });
  carousel.addEventListener('focusin', schedule);
  carousel.addEventListener('focusout', () => queueMicrotask(schedule));
  carousel.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const next = { ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: slides.length - 1 }[event.key];
    if (next !== undefined) { event.preventDefault(); show(next, true); }
  });
  viewport.addEventListener('pointerdown', event => {
    if (event.isPrimary && event.button === 0) {
      pointerStart = { x: event.clientX, y: event.clientY, id: event.pointerId };
      schedule();
    }
  }, { passive: true });
  viewport.addEventListener('pointerup', event => {
    if (!pointerStart || pointerStart.id !== event.pointerId) return;
    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;
    pointerStart = undefined;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.25) {
      suppressClickUntil = Date.now() + 400;
      show(current + (dx < 0 ? 1 : -1), true);
    }
    schedule();
  });
  const endGesture = () => { pointerStart = undefined; schedule(); };
  viewport.addEventListener('pointercancel', endGesture);
  viewport.addEventListener('pointerleave', endGesture);
  viewport.addEventListener('dragstart', event => event.preventDefault());
  viewport.addEventListener('click', event => {
    if (Date.now() < suppressClickUntil) { event.preventDefault(); event.stopPropagation(); }
  }, true);
  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', event => { stopped = event.matches; updatePlayback(); });
  new IntersectionObserver(entries => {
    inView = entries[0].intersectionRatio >= 0.35;
    schedule();
  }, { threshold: 0.35 }).observe(viewport);
}
