
const IMAGES_COUNT = 8;
(function () {
  const banner = document.querySelector('.cookie-consent');
  if (!banner) return;
  const storageKey = 'site-001-cookie-choice';
  const saved = localStorage.getItem(storageKey);
  if (!saved) banner.hidden = false;
  const close = (value) => {
    localStorage.setItem(storageKey, value);
    banner.hidden = true;
    document.documentElement.dataset.cookieChoice = value;
  };
  banner.querySelector('[data-cookie-accept]').addEventListener('click', () => close('accepted'));
  banner.querySelector('[data-cookie-reject]').addEventListener('click', () => close('rejected'));
  if (saved) document.documentElement.dataset.cookieChoice = saved;
}());

(function () {
  const items = document.querySelectorAll('.home-section, .internal-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.12 });
  items.forEach((item, index) => {
    item.style.setProperty('--reveal-delay', `${Math.min(index * 70, 420)}ms`);
    observer.observe(item);
  });
}());
