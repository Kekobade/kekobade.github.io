(() => {
  const root = document.documentElement;
  // Image paths below are relative to the site root, whichever folder the page is in
  const base = new URL('../', document.currentScript.src);

  const BACKGROUNDS = [
    { id: 'moon',   name: 'Moon',   theme: 'dark',  image: '/img/dark-cloud.jpeg' },
    { id: 'clouds', name: 'Clouds', theme: 'light',  image: '/img/cloud.jpg' },
    { id: 'dark',   name: 'Dark',   theme: 'dark',  image: 'img/bg-dark.jpg' }

  ];

  const read = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const save = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };

  let current = read('bg');
  if (!BACKGROUNDS.some(x => x.id === current)) current = BACKGROUNDS[0].id;

  function apply(id) {
    const b = BACKGROUNDS.find(x => x.id === id) || BACKGROUNDS[0];
    current = b.id;
    root.dataset.theme = b.theme;
    root.style.setProperty('--bg-image', b.image ? 'url("' + new URL(b.image, base).href + '")' : 'none');
    save('bg', b.id);
  }
  apply(current);

  // square button: next background in order (not random)
  const next = document.querySelector('.theme-toggle');
  if (next) next.addEventListener('click', () => {
    const i = BACKGROUNDS.findIndex(x => x.id === current);
    apply(BACKGROUNDS[(i + 1) % BACKGROUNDS.length].id);
  });

  // mobile slide-out menu
  const tg = document.getElementById('menu-toggle'), bd = document.getElementById('menu-backdrop');
  const setOpen = o => { document.body.classList.toggle('menu-open', o); tg.setAttribute('aria-expanded', String(o)); };
  tg.addEventListener('click', () => setOpen(!document.body.classList.contains('menu-open')));
  bd.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  if (side) side.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
  addEventListener('resize', () => { if (innerWidth > 920 && !document.body.classList.contains('blog-page')) setOpen(false); });
})();


