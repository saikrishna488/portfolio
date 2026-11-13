const tool = document.querySelector('#desktop-tool');
const toolContent = document.querySelector('#desktop-tool-content');
const toolTitle = document.querySelector('#desktop-tool-title');
const desktopStatus = document.querySelector('#desktop-status');
const notices = [];

let returnFocus;
let sortOrder = readPreference('iconSort', 'default');

function action(label, run, description) {
  const button = textElement('button', label);
  button.type = 'button';
  if (description) button.append(textElement('small', description));
  button.addEventListener('click', run);
  return button;
}

function showTool(title, ...content) {
  if (!tool.open) returnFocus = document.activeElement;
  tool.classList.toggle('app-launcher', content.some(element => element.classList.contains('app-launcher-grid')));
  toolTitle.textContent = title;
  toolContent.replaceChildren(...content);
  if (!tool.open) tool.showModal();
  (toolContent.querySelector('[autofocus]') ?? toolContent.querySelector('input,button,a') ?? tool.querySelector('button')).focus();
}

document.querySelector('#desktop-tool-close').addEventListener('click', () => tool.close());
tool.addEventListener('close', () => {
  if (!tool.open && (document.activeElement === document.body || tool.contains(document.activeElement))) {
    returnFocus?.focus();
  }
});

function launch(id) {
  if (tool.open) tool.close();
  switchView('#' + id);
}

function appName(id) {
  return apps.get(id).panel.getAttribute('aria-label');
}

function showSearch(appsOnly = false, opener) {
  const field = document.createElement('input');
  field.type = 'search';
  field.placeholder = appsOnly ? 'Find an app' : 'Search apps, projects, skills, and commands';
  field.setAttribute('aria-label', field.placeholder);
  const results = document.createElement('div');
  results.className = appsOnly ? 'app-launcher-grid' : 'tool-list';
  const entries = [...apps.keys()].map(id => {
    const content = apps.get(id).panel.querySelector('.content');
    return { id, label: appName(id), detail: summaries[id] ?? '', keywords: content.textContent, run: () => {
      if (opener) apps.get(id).opener = opener;
      launch(id);
    } };
  });
  if (!appsOnly) {
    for (const [command, detail] of Object.entries(help)) {
      entries.push({ label: '/' + command, detail, run: () => {
        tool.close();
        switchView('');
        runCommand('/' + (command === 'open' ? 'open projects' : command));
      } });
    }
  }
  function filter() {
    const terms = field.value.toLowerCase().trim().split(/\s+/);
    const matches = entries.filter(entry => terms.every(term =>
      [entry.label, entry.detail, entry.keywords].join(' ').toLowerCase().includes(term)));
    const buttons = matches.map(entry => {
      if (!appsOnly) return action(entry.label, entry.run, entry.detail);
      const button = launcher(entry.id, entry.label, true);
      delete button.dataset.app;
      button.type = 'button';
      button.addEventListener('click', entry.run);
      return button;
    });
    results.replaceChildren(...buttons);
    if (!matches.length) results.append(textElement('p', 'No matches'));
  }
  field.addEventListener('input', filter);
  field.addEventListener('keydown', event => {
    if (!['Enter', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    const first = results.querySelector('button');
    if (event.key === 'Enter') first?.click();
    else first?.focus();
  });
  filter();
  if (appsOnly && (compactDock.matches || mobile.matches)) {
    results.querySelector('button')?.setAttribute('autofocus', '');
  }
  showTool(appsOnly ? 'App Launcher' : 'Search', field, results);
  if (opener) returnFocus = opener;
}

function quickLook(id = active?.panel.id ?? 'resume') {
  const content = apps.get(id).panel.querySelector('.content').cloneNode(true);
  content.querySelectorAll('video, .share-url').forEach(node => node.remove());
  content.querySelectorAll('img[data-src]').forEach(img => { img.src = img.dataset.src; });
  content.querySelectorAll('[data-app]').forEach(button => button.addEventListener('click', event => {
    event.stopPropagation();
    launch(button.dataset.app);
  }));
  showTool('Quick Look · ' + appName(id), action('Open window', () => launch(id)), content);
}

function sortIcons(order) {
  sortOrder = order;
  const ids = [...apps.keys()];
  if (order === 'name') ids.sort((a, b) => appName(a).localeCompare(appName(b)));
  if (order === 'custom') {
    const saved = readPreference('iconOrder', []);
    if (Array.isArray(saved)) ids.sort((a, b) => {
      const rank = id => saved.includes(id) ? saved.indexOf(id) : saved.length;
      return rank(a) - rank(b);
    });
  }
  for (const id of ids) desk.append(apps.get(id).desktopButton);
  savePreference('iconSort', order);
}

function moveIcon(id, step) {
  const ids = [...desk.children].map(button => button.dataset.app);
  const index = ids.indexOf(id);
  if (index < 0 || index + step < 0 || index + step >= ids.length) return;
  [ids[index], ids[index + step]] = [ids[index + step], ids[index]];
  savePreference('iconOrder', ids);
  sortIcons('custom');
  desktopStatus.textContent = 'Moved ' + appName(id);
}

function overview() {
  const windows = [...apps].filter(([, app]) => app.state !== 'closed');
  const list = document.createElement('div');
  list.className = 'tool-list window-overview';
  for (const [id, app] of windows) {
    list.append(action(appName(id), () => launch(id), 'Space ' + app.desktop + ' · ' + app.state));
  }
  if (!windows.length) list.append(textElement('p', 'No open windows'));
  showTool('Window overview', list);
}

function notificationCenter() {
  const list = document.createElement('ul');
  for (const notice of notices) list.append(textElement('li', notice));
  showTool('Notifications', notices.length ? list : textElement('p', 'No notifications'),
    action('Clear notifications', () => { notices.length = 0; notificationCenter(); }));
}

function desktopMenu(id) {
  const list = document.createElement('div');
  list.className = 'tool-list';
  list.append(
    action('Application launcher', () => showSearch(true)),
    action('Window overview', overview),
    action('Notifications', notificationCenter),
    action('Quick Look', () => quickLook(id)),
    action('Keyboard shortcuts', () => showTool('Keyboard shortcuts',
      textElement('p', Object.entries(shortcuts).map(([name, keys]) => name + ': ' + keys).join(' · ')))),
    action(sortOrder === 'name' ? 'Restore icon order' : 'Sort icons by name', () => {
      sortIcons(sortOrder === 'name' ? 'default' : 'name');
      tool.close();
    })
  );
  if (id) list.append(action('Move icon earlier', () => moveIcon(id, -1)), action('Move icon later', () => moveIcon(id, 1)));
  showTool(id ? appName(id) : 'Desktop menu', list);
}

sortIcons(sortOrder);
dockLauncher.addEventListener('click', () => showSearch(true, dockLauncher));
document.querySelector('#desktop-search').addEventListener('click', () => showSearch());
document.querySelector('#desktop-number').addEventListener('click', () => showDesktop(desktopNumber === 1 ? 2 : 1));
document.querySelector('#desktop-menu-button').addEventListener('click', () => desktopMenu());
document.querySelector('#desktop-view').addEventListener('contextmenu', event => {
  if (event.target.closest('#workspace section')) return;
  event.preventDefault();
  desktopMenu(event.target.closest('[data-app]')?.dataset.app);
});
document.addEventListener('portfolio-notice', event => {
  notices.unshift(event.detail);
  if (notices.length > 20) notices.pop();
  desktopStatus.textContent = event.detail;
});
document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    showSearch();
    return;
  }
  if (document.body.dataset.view !== 'desktop' || tool.open || event.target.closest('input,textarea,select')) return;
  if (event.altKey && !event.ctrlKey && ['1', '2'].includes(event.key)) {
    event.preventDefault();
    showDesktop(Number(event.key));
  } else if (event.altKey && event.key.toLowerCase() === 'o') {
    event.preventDefault();
    overview();
  } else if (event.code === 'Space' && event.target.closest('#desktop [data-app]')) {
    event.preventDefault();
    quickLook(event.target.dataset.app);
  }
});
