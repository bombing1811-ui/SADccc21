const IMAGES_COUNT = 8;
const consentKey = "asterTideCookieChoice";
document.documentElement.dataset.imagesCount = String(IMAGES_COUNT);
const menuButton = document.querySelector('.tide-menu-shell');
const nav = document.querySelector('.tide-route-links');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('tide-is-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
}
const banner = document.querySelector('.tide-consent-dock');
function storePreference(value) {
  localStorage.setItem(consentKey, JSON.stringify({ value, savedAt: new Date().toISOString() }));
  if (banner) banner.classList.remove('tide-is-visible');
}
if (banner && !localStorage.getItem(consentKey)) {
  banner.classList.add('tide-is-visible');
}
document.querySelectorAll('.tide-allow-current').forEach((button) => button.addEventListener('click', () => storePreference('accepted')));
document.querySelectorAll('.tide-decline-current').forEach((button) => button.addEventListener('click', () => storePreference('rejected')));
const revealItems = document.querySelectorAll('.tide-home-current, .tide-inner-current, .tide-legal-ledger');
const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('tide-is-settled'); });
}, { threshold: 0.12 }) : null;
revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 35, 360)}ms`;
  if (observer) observer.observe(item); else item.classList.add('tide-is-settled');
});
