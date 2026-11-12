const desk = document.querySelector('#desktop');
const dock = document.querySelector('#dock');
const workspace = document.querySelector('#workspace');
const mobile = compactWindows;
const apps = new Map();
const icons = {
  about: '<rect x="4" y="3" width="16" height="18" rx="3" fill="#eaf7ff"/><circle cx="12" cy="9" r="3" fill="#3889cf"/><path d="M6.5 17a5.5 5.5 0 0 1 11 0z" fill="#3889cf"/>',
  projects: '<path d="M2 6a2 2 0 0 1 2-2h6l2 2h8a2 2 0 0 1 2 2v10H2z" fill="#69cafa"/><rect x="2" y="8" width="20" height="12" rx="2" fill="#26a6e8"/><path d="M4 9h16" stroke="#bbecff"/>',
  meridian: '<rect x="2" y="4" width="20" height="14" rx="2.5" fill="#edf6ff"/><rect x="3.6" y="5.5" width="16.8" height="10.5" rx="1.2" fill="#273755"/><path d="m7 8 2 2-2 2m4 0h4" fill="none" stroke="#a1f4dd" stroke-linecap="round"/><path d="M9 21h6m-3-3v3" stroke="#edf6ff" stroke-width="1.6" stroke-linecap="round"/>',
  bluetooth: '<path d="m7 6 10 11-5 4V3l5 4L7 18" fill="none" stroke="white" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>',
  education: '<path d="M6 11v6c3 3 9 3 12 0v-6" fill="#edc982"/><path d="m2 9 10-5 10 5-10 5z" fill="#fff5d5"/><path d="M21 10v6" stroke="#fff5d5" stroke-width="1.5" stroke-linecap="round"/>',
  contact: '<rect x="2" y="5" width="20" height="14" rx="2.5" fill="#fff"/><path d="m3 7 9 7 9-7M4 17l5-4m6 0 5 4" fill="none" stroke="#459dda" stroke-width="1.1" stroke-linecap="round"/>',
  experience: '<rect x="3" y="7" width="18" height="14" rx="2" fill="#fff"/><path d="M8 7V4h8v3M3 13h18" stroke="#7954a9" fill="none"/>',
  wribate: '<rect x="2" y="4" width="20" height="16" rx="2" fill="#fff"/><path d="M2 9h20m-15 4h10m-10 3h7" stroke="#287e60"/>',
  resume: '<path d="M5 2h9l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" fill="#fff"/><path d="M14 2v5h5" fill="#d1d9e5"/><path d="M8 10h8m-8 4h8m-8 4h5" stroke="#63718a" stroke-width="1.2" stroke-linecap="round"/>'
};
let active;
let layer = 0;

function launcher(target, title, showLabel) {
  const button = document.createElement('button');
  const icon = document.createElement('span');
  icon.className = 'icon icon-' + target;
  icon.setAttribute('aria-hidden', 'true');
  icon.innerHTML = '<svg viewBox="0 0 24 24" focusable="false">' + icons[target] + '</svg>';
  button.title = title;
  button.setAttribute('aria-label', title);
  button.dataset.app = target;
  button.setAttribute('aria-controls', target);
  button.append(icon);
  if (showLabel) button.append(title);
  else button.dataset.tooltip = title;
  return button;
}

function refresh() {
  for (const app of apps.values()) {
    app.panel.classList.toggle('active', app === active);
    app.panel.inert = mobile.matches && app !== active;
    app.dockButton.classList.toggle('active', app === active);
    app.dockButton.classList.toggle('running', app.state !== 'closed');
    app.dockButton.setAttribute('aria-expanded', String(app.state === 'open'));
  }
  desk.inert = mobile.matches && Boolean(active);
  document.querySelector('#desktop-view').classList.toggle('has-window', Boolean(active));
}

function raise(app) {
  if (active !== app) app.panel.style.zIndex = ++layer;
  active = app;
  refresh();
}

function openApp(app, focus = true) {
  app.state = 'open';
  app.panel.hidden = false;
  app.panel.querySelectorAll('img[data-src]').forEach(image => { image.src = image.dataset.src; delete image.dataset.src; });
  app.layout.layout();
  raise(app);
  if (focus) app.close.focus();
}

function hideApp(app, state) {
  app.state = state;
  app.panel.hidden = true;
  if (state === 'closed') {
    app.panel.querySelector('.content').scrollTop = 0;
  }
  if (active === app) {
    active = [...apps.values()].filter(item => item.state === 'open')
      .sort((a, b) => Number(b.panel.style.zIndex) - Number(a.panel.style.zIndex))[0];
  }
  app.panel.querySelector('video')?.pause();
  refresh();
  if (location.hash === '#' + app.panel.id) {
    history.replaceState(null, '', active ? '#' + active.panel.id : '#desktop');
  }
  const launcher = app.opener;
  (launcher?.getClientRects().length && !launcher.closest('[inert], [hidden]') ? launcher : app.dockButton).focus();
}

[...workspace.querySelectorAll('section')].forEach(panel => {
  const title = panel.getAttribute('aria-label');
  const desktopButton = launcher(panel.id, title, true);
  const dockButton = launcher(panel.id, title, false);
  desk.append(desktopButton);
  dock.append(dockButton);

  const titlebar = document.createElement('header');
  const controls = document.createElement('div');
  titlebar.className = 'titlebar';
  controls.className = 'controls';
  titlebar.append(title, controls);
  panel.prepend(titlebar);
  panel.hidden = true;
  const layout = manageWindow(panel, workspace, titlebar, 'window.' + panel.id);
  const app = { panel, dockButton, layout, state: 'closed' };
  apps.set(panel.id, app);

  function control(label, icon, action) {
    const button = document.createElement('button');
    button.title = label;
    button.setAttribute('aria-label', label);
    button.textContent = icon;
    button.addEventListener('click', action);
    controls.append(button);
    return button;
  }
  const copy = control('Copy window link', 'Copy link', async () => {
    const url = new URL(location.href);
    url.hash = panel.id;
    try {
      await navigator.clipboard.writeText(url.href);
      copy.textContent = 'Copied';
      clearTimeout(app.copyTimer);
      app.copyTimer = setTimeout(() => { copy.textContent = 'Copy link'; }, 1800);
    } catch {
      let field = panel.querySelector('.share-url');
      if (!field) {
        field = document.createElement('input');
        field.className = 'share-url';
        field.setAttribute('aria-label', 'Window link');
        field.readOnly = true;
        panel.querySelector('.content').prepend(field);
      }
      field.value = url.href;
      field.focus();
      field.select();
    }
  });
  copy.className = 'copy-link';
  titlebar.append(copy);
  const toggle = layout.toggle;
  control('Minimize window', '−', () => hideApp(app, 'minimized'));
  app.maximize = control('Maximize window', '□', toggle);
  app.close = control('Close window', '×', () => hideApp(app, 'closed'));
  addLayoutMenu(titlebar, layout);

  panel.addEventListener('focusin', () => raise(app));
  panel.addEventListener('pointerdown', () => raise(app));
  panel.addEventListener('keydown', event => {
    if (event.key === 'Escape') hideApp(app, 'closed');
  });
  titlebar.addEventListener('dblclick', event => {
    if (!event.target.closest('button')) toggle();
  });

});

document.addEventListener('click', event => {
  const button = event.target.closest('button[data-app]');
  if (!button || button.closest('#terminal-view')) return;
  const app = apps.get(button.dataset.app);
  if (button === app.dockButton && active === app) hideApp(app, 'minimized');
  else {
    app.opener = button;
    openApp(app);
    const hash = '#' + app.panel.id;
    if (location.hash !== hash) history.pushState(null, '', hash);
  }
});

mobile.addEventListener('change', refresh);

document.addEventListener('keydown', event => {
  if (document.body.dataset.view !== 'desktop' || !event.altKey || !event.ctrlKey || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
  const windows = [...apps.values()].filter(app => app.state !== 'closed');
  if (!windows.length) return;
  event.preventDefault();
  const step = event.key === 'ArrowRight' ? 1 : -1;
  const current = active ? windows.indexOf(active) : (step === 1 ? -1 : 0);
  switchView('#' + windows[(current + step + windows.length) % windows.length].panel.id, false);
});

const clock = document.querySelector('time');
const timeFormat = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' });
function updateClock() {
  const now = new Date();
  clock.dateTime = now.toISOString();
  clock.textContent = timeFormat.format(now);
}
updateClock();
setInterval(updateClock, 1000);
function applyView(focus = false) {
  const id = location.hash.slice(1);
  const app = apps.get(id);
  const desktopMode = Boolean(app) || id === 'desktop';
  document.body.dataset.view = desktopMode ? 'desktop' : 'terminal';
  if (desktopMode) {
    document.querySelectorAll('#terminal-view video').forEach(video => video.pause());
    if (app || !active) openApp(app ?? apps.get('about'), focus);
    else active.layout.layout();
  } else {
    document.querySelectorAll('#workspace video').forEach(video => video.pause());
    if (focus) document.querySelector(matchMedia('(pointer: fine)').matches ? '#command-input' : '.terminal-titlebar > button').focus();
  }
}

function switchView(hash, remember = true) {
  if (remember) savePreference('mode', hash ? 'desktop' : 'terminal');
  if (location.hash !== hash) history.pushState(null, '', hash || location.pathname + location.search);
  applyView(true);
}

document.querySelector('#show-terminal').addEventListener('click', () => switchView(''));
window.addEventListener('hashchange', () => applyView(true));
if (!location.hash && readPreference('mode', 'terminal') === 'desktop') history.replaceState(null, '', '#desktop');
applyView();
