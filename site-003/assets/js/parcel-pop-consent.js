const IMAGES_COUNT = 8;
const consentKey = "prismParcelCookiePick";
document.documentElement.dataset.imagesCount = String(IMAGES_COUNT);
const menuButton = document.querySelector('.parcel-menu-chip');
const nav = document.querySelector('.parcel-jump-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('parcel-is-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
}
const banner = document.querySelector('.parcel-cookie-popover');
function storePreference(value) {
  localStorage.setItem(consentKey, JSON.stringify({ value, savedAt: new Date().toISOString() }));
  if (banner) banner.classList.remove('parcel-is-visible');
}
if (banner && !localStorage.getItem(consentKey)) {
  banner.classList.add('parcel-is-visible');
}
document.querySelectorAll('.parcel-yes-pop').forEach((button) => button.addEventListener('click', () => storePreference('accepted')));
document.querySelectorAll('.parcel-no-pop').forEach((button) => button.addEventListener('click', () => storePreference('rejected')));
const revealItems = document.querySelectorAll('.parcel-home-poster, .parcel-inner-poster, .parcel-legal-card');
const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('parcel-is-settled'); });
}, { threshold: 0.12 }) : null;
revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 35, 360)}ms`;
  if (observer) observer.observe(item); else item.classList.add('parcel-is-settled');
});
