const desk = document.querySelector('#desktop');
const dock = document.querySelector('#dock');
const workspace = document.querySelector('#workspace');
const mobile = compactWindows;
const apps = new Map();

let active;
let layer = 0;
let desktopNumber = Number(readPreference('desktopNumber', 1)) === 2 ? 2 : 1;

function setDesktop(number) {
  desktopNumber = number === 2 ? 2 : 1;
  savePreference('desktopNumber', desktopNumber);
  active = [...apps.values()].filter(app => app.desktop === desktopNumber && app.state === 'open')
    .sort((a, b) => Number(b.panel.style.zIndex) - Number(a.panel.style.zIndex))[0];
  refresh();
  active?.layout.layout();
}

function showDesktop(number) {
  if (document.body.dataset.view !== 'desktop') switchView('#desktop');
  setDesktop(number);
  history.replaceState(null, '', active ? '#' + active.panel.id : '#desktop');
  active?.close.focus();
}

function launcher(target, title, showLabel) {
  const button = document.createElement('button');
  const icon = document.createElement('span');
  icon.className = 'icon icon-' + target;
  icon.setAttribute('aria-hidden', 'true');
  icon.innerHTML = '<svg viewBox="0 0 24 24" focusable="false">' + (icons[target] || icons.projects) + '</svg>';
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
    const hidden = app.state !== 'open' || app.desktop !== desktopNumber;
    if (hidden && !app.panel.hidden) app.panel.querySelectorAll('video').forEach(video => video.pause());
    app.panel.hidden = hidden;
    app.panel.classList.toggle('active', app === active);
    app.panel.inert = mobile.matches && app !== active;
    app.dockButton.classList.toggle('active', app === active);
    app.dockButton.classList.toggle('running', app.state !== 'closed');
    app.dockButton.setAttribute('aria-expanded', String(!app.panel.hidden));
  }
  document.querySelector('#active-app').textContent = active?.panel.getAttribute('aria-label') ?? 'Desktop';
  document.querySelector('#desktop-number').textContent = 'Space ' + desktopNumber;
  desk.inert = mobile.matches && Boolean(active);
  document.querySelector('#desktop-view').classList.toggle('has-window', Boolean(active));
}

function raise(app) {
  if (active !== app) app.panel.style.zIndex = ++layer;
  active = app;
  refresh();
}

function openApp(app, focus = true) {
  if (app.state === 'closed') app.desktop = desktopNumber;
  if (app.desktop !== desktopNumber) setDesktop(app.desktop);
  app.state = 'open';
  app.panel.hidden = false;
  document.querySelector('#desktop-status').textContent = app.panel.getAttribute('aria-label') + ' opened';
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
    active = [...apps.values()].filter(item => item.state === 'open' && item.desktop === desktopNumber)
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

function registerApp(panel) {
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
  const app = { panel, desktopButton, dockButton, layout, desktop: desktopNumber, state: 'closed' };
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
    if (['meridian','bluetooth','wribate'].includes(panel.id)) { url.pathname = url.pathname.replace(/[^/]*$/, panel.id + '.html'); url.hash = ''; }
    try {
      await navigator.clipboard.writeText(url.href);
      copy.textContent = 'Copied';
      document.dispatchEvent(new CustomEvent('portfolio-notice', { detail: 'Copied link to ' + title }));
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
    if (event.key === 'Escape' && !event.target.matches('select')) hideApp(app, 'closed');
  });
  titlebar.addEventListener('dblclick', event => {
    if (!event.target.closest('button')) toggle();
  });

}
[...workspace.querySelectorAll('section')].forEach(registerApp);

document.addEventListener('click', event => {
  const button = event.target.closest('button[data-app]');
  if (!button || button.closest('#terminal-view')) return;
  const app = apps.get(button.dataset.app);
  if (!app) return;
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
  const windows = [...apps.values()].filter(app => app.state !== 'closed' && app.desktop === desktopNumber);
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
    if (app) openApp(app, focus);
    else if (active) active.layout.layout();
    else {
      refresh();
      if (focus) document.querySelector('#desktop-search').focus();
    }
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
window.addEventListener('popstate', () => applyView(true));
if (!location.hash && readPreference('mode', 'terminal') === 'desktop') history.replaceState(null, '', '#desktop');
applyView();
