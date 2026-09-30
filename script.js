document.documentElement.classList.add('js');

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  siteNav.classList.toggle('is-open', !isOpen);
});

siteNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    siteNav.classList.remove('is-open');
  }
});

const publicationList = document.querySelector('.publication-list');
const publicationEntries = Array.from(publicationList.querySelectorAll('.publication'));
const priorityPattern = /aggression|transcranial|tdcs|resting-state functional connectivity|paired associative stimulation|neuromodulation|neuroimaging/i;

publicationEntries
  .map((entry, index) => {
    const [year, month = 0, day = 0] = entry.dataset.date.split('-').map(Number);

    return {
      entry,
      index,
      date: year * 10000 + month * 100 + day,
      priority: priorityPattern.test(entry.querySelector('.publication-main h3').textContent) ? 1 : 0
    };
  })
  .sort((first, second) => second.date - first.date || second.priority - first.priority || first.index - second.index)
  .forEach(({ entry }) => publicationList.append(entry));

const revealTargets = document.querySelectorAll(
  '.hero-copy > *, .hero-visual, .section-label, .about-content, .thread, .publication, .profiles-inner'
);

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((target, index) => {
    target.style.transitionDelay = `${Math.min(index % 5, 4) * 65}ms`;
    revealObserver.observe(target);
  });
} else {
  revealTargets.forEach((target) => target.classList.add('is-visible'));
}
