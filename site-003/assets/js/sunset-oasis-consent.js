(() => {
  const key = 'site-003-cookie-choice';
  const banner = document.querySelector('.cookie-banner');
  const remember = (choice) => { localStorage.setItem(key, choice); banner?.classList.remove('is-visible'); };
  if (!localStorage.getItem(key)) { banner?.classList.add('is-visible'); }
  document.querySelector('.cookie-accept')?.addEventListener('click', () => remember('accepted'));
  document.querySelector('.cookie-reject')?.addEventListener('click', () => remember('rejected'));
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { event.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }));
  window.addEventListener('scroll',()=>document.documentElement.style.setProperty('--sun-scroll', String(Math.min(1,scrollY/900))));
})();
