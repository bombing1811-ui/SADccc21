(() => {
  const key = 'site-002-cookie-choice';
  const banner = document.querySelector('.cookie-banner');
  const remember = (choice) => { localStorage.setItem(key, choice); banner?.classList.remove('is-visible'); };
  if (!localStorage.getItem(key)) { banner?.classList.add('is-visible'); }
  document.querySelector('.cookie-accept')?.addEventListener('click', () => remember('accepted'));
  document.querySelector('.cookie-reject')?.addEventListener('click', () => remember('rejected'));
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { event.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }));
  document.querySelectorAll('.data-tiles article').forEach(tile=>tile.addEventListener('mouseenter',()=>tile.style.transform='rotate(-2deg) scale(1.04)'));document.querySelectorAll('.data-tiles article').forEach(tile=>tile.addEventListener('mouseleave',()=>tile.style.transform=''));
})();
