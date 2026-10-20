(() => {
  const banner = document.querySelector('[data-cookie-banner]');
  if (banner) {
    const key = banner.dataset.cookieKey || 'orbitFoundryCookieChoice';
    const stored = localStorage.getItem(key);
    if (stored === 'accepted' || stored === 'rejected') {
      banner.classList.add('is-hidden');
    }
    const storeChoice = (choice) => {
      localStorage.setItem(key, choice);
      banner.classList.add('is-hidden');
      document.documentElement.dataset.cookieChoice = choice;
    };
    banner.querySelector('[data-cookie-accept]')?.addEventListener('click', () => storeChoice('accepted'));
    banner.querySelector('[data-cookie-reject]')?.addEventListener('click', () => storeChoice('rejected'));
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = document.querySelectorAll('main section');
  if (!reduced && 'IntersectionObserver' in window) {
    revealTargets.forEach((node) => node.classList.add('reveal-ready'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    revealTargets.forEach((node) => observer.observe(node));
  } else {
    revealTargets.forEach((node) => node.classList.add('revealed'));
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      }
    });
  });
})();
