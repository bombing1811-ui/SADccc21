const IMAGES_COUNT = 8;
const consentKey = "veridianAccordCookieRecord";
document.documentElement.dataset.imagesCount = String(IMAGES_COUNT);
const menuButton = document.querySelector('.accord-menu-clerk');
const nav = document.querySelector('.accord-chamber-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('accord-is-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
}
const banner = document.querySelector('.accord-cookie-notice');
function storePreference(value) {
  localStorage.setItem(consentKey, JSON.stringify({ value, savedAt: new Date().toISOString() }));
  if (banner) banner.classList.remove('accord-is-visible');
}
if (banner && !localStorage.getItem(consentKey)) {
  banner.classList.add('accord-is-visible');
}
document.querySelectorAll('.accord-accept-record').forEach((button) => button.addEventListener('click', () => storePreference('accepted')));
document.querySelectorAll('.accord-reject-record').forEach((button) => button.addEventListener('click', () => storePreference('rejected')));
const revealItems = document.querySelectorAll('.accord-home-clause, .accord-inner-clause, .accord-legal-text');
const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('accord-is-settled'); });
}, { threshold: 0.12 }) : null;
revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 35, 360)}ms`;
  if (observer) observer.observe(item); else item.classList.add('accord-is-settled');
});
