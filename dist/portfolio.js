const menuToggle = document.querySelector('#menu-toggle');
const mobileNavigation = matchMedia('(max-width: 650px)');

function closeMenu() {
  document.body.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = 'Menu';
}

menuToggle.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? 'Close' : 'Menu';
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && document.body.classList.contains('menu-open')) {
    closeMenu();
    menuToggle.focus();
  }
});
mobileNavigation.addEventListener('change', closeMenu);

const filterButtons = document.querySelectorAll('[data-filter]');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let count = 0;
    document.querySelectorAll('[data-category]').forEach(project => {
      project.hidden = button.dataset.filter !== 'All' && project.dataset.category !== button.dataset.filter;
      if (!project.hidden) count++;
    });
    document.querySelector('#filter-status').textContent = count + ' projects shown';
  });
});

// Keep previously shared desktop links useful after the move to pages.
const legacyPages = {
  about: 'index.html', desktop: 'index.html', projects: 'projects.html',
  nebula: 'nebula.html', meridian: 'meridian.html', bluetooth: 'bluetooth.html',
  wribate: 'wribate.html', experience: 'experience.html', education: 'education.html',
  resume: 'resume.html', contact: 'contact.html'
};
const legacyPage = legacyPages[location.hash.slice(1)];
if (legacyPage && !location.pathname.endsWith('/' + legacyPage)) {
  location.replace(legacyPage);
} else if (legacyPage) {
  history.replaceState(null, '', location.pathname + location.search);
}
