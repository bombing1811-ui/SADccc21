const IMAGES_COUNT = 8;
const consentKey = "kestrelKilnCookieConsent";
document.documentElement.dataset.imagesCount = String(IMAGES_COUNT);
const menuButton = document.querySelector('.kiln-menu-pull');
const nav = document.querySelector('.kiln-shelf-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('kiln-is-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
}
const banner = document.querySelector('.kiln-consent-hearth');
function storePreference(value) {
  localStorage.setItem(consentKey, JSON.stringify({ value, savedAt: new Date().toISOString() }));
  if (banner) banner.classList.remove('kiln-is-visible');
}
if (banner && !localStorage.getItem(consentKey)) {
  banner.classList.add('kiln-is-visible');
}
document.querySelectorAll('.kiln-warm-yes').forEach((button) => button.addEventListener('click', () => storePreference('accepted')));
document.querySelectorAll('.kiln-cool-no').forEach((button) => button.addEventListener('click', () => storePreference('rejected')));
const revealItems = document.querySelectorAll('.kiln-home-slab, .kiln-inner-slab, .kiln-legal-clay');
const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('kiln-is-settled'); });
}, { threshold: 0.12 }) : null;
revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 35, 360)}ms`;
  if (observer) observer.observe(item); else item.classList.add('kiln-is-settled');
});
