
const IMAGES_COUNT = 8;
const COOKIE_STORAGE_KEY = 'eldergrove_cookie_choice';
const banner = document.querySelector('.cookie-consent');
const accept = document.querySelector('[data-cookie-accept]');
const reject = document.querySelector('[data-cookie-reject]');
function storeCookieChoice(value) {
  localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify({ value, imagesCount: IMAGES_COUNT, savedAt: new Date().toISOString() }));
  banner?.classList.remove('is-visible');
}
if (banner && !localStorage.getItem(COOKIE_STORAGE_KEY)) {
  window.setTimeout(() => banner.classList.add('is-visible'), 450);
}
accept?.addEventListener('click', () => storeCookieChoice('accepted'));
reject?.addEventListener('click', () => storeCookieChoice('rejected'));
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { event.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
const revealItems = document.querySelectorAll('main > section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('section-visible'); });
}, { threshold: 0.12 });
revealItems.forEach((item, index) => { item.style.setProperty('--stagger', `${index * 70}ms`); observer.observe(item); });
