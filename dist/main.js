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
  const hash = location.hash || '#2026-10-03';
  dateLinks.forEach(link => { if (link.hash === hash) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
}
window.addEventListener('hashchange', markDate);
markDate();
