(() => {
  const IMAGES_COUNT = 8;
  const storageKey = 'site-001-rail-cookie-choice';
  const panel = document.querySelector('[data-cookie-panel]');
  const accept = document.querySelector('[data-cookie-accept]');
  const reject = document.querySelector('[data-cookie-reject]');
  const saveChoice = (choice) => {
    try { localStorage.setItem(storageKey, JSON.stringify({ choice, savedAt: new Date().toISOString(), imagesConfigured: IMAGES_COUNT })); } catch (error) { document.body.dataset.cookieStorage = 'unavailable'; }
    if (panel) panel.hidden = true;
  };
  try { if (localStorage.getItem(storageKey) && panel) panel.hidden = true; } catch (error) { document.body.dataset.cookieStorage = 'unavailable'; }
  accept?.addEventListener('click', () => saveChoice('accepted'));
  reject?.addEventListener('click', () => saveChoice('rejected'));
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) { event.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
  const respondToScroll = () => { document.documentElement.style.setProperty('--rail-scroll', String(Math.round(window.scrollY))); };
  respondToScroll();
  window.addEventListener('scroll', respondToScroll, { passive: true });
})();
