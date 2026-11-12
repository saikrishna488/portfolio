function readPreference(key, fallback) {
  try { return JSON.parse(localStorage.getItem('portfolio.' + key)) ?? fallback; }
  catch { return fallback; }
}

function savePreference(key, value) {
  try { localStorage.setItem('portfolio.' + key, JSON.stringify(value)); }
  catch { /* The interface still works when storage is unavailable. */ }
}

const compactWindows = matchMedia('(max-width:650px), (max-height:420px)');

function manageWindow(panel, bounds, handle, key) {
  let geometry = readPreference(key, {});
  let mode = ['left', 'right', 'full'].includes(geometry.mode) ? geometry.mode : '';
  const grip = document.createElement('div');
  grip.className = 'resize-grip';
  grip.setAttribute('aria-hidden', 'true');
  panel.append(grip);
  const resizeMode = () => compactWindows.matches || mode !== '';

  function layout() {
    if (!bounds.clientWidth || !bounds.clientHeight || panel.hidden) return;
    panel.dataset.layout = mode;
    for (const name of ['width', 'height', 'left', 'top']) panel.style.removeProperty(name);
    if (resizeMode()) return;
    const width = Math.min(bounds.clientWidth, Math.max(300, geometry.width || panel.offsetWidth));
    if (geometry.width) panel.style.width = width + 'px';
    if (geometry.height) {
      panel.style.height = Math.min(bounds.clientHeight, Math.max(160, geometry.height)) + 'px';
    }
    const x = geometry.x ?? (bounds.clientWidth - panel.offsetWidth) / 2;
    const y = geometry.y ?? (bounds.clientHeight - panel.offsetHeight) / 2;
    // Keep a piece of the title bar reachable even when the body is off-screen.
    const reachableWidth = Math.min(panel.offsetWidth, 132);
    const reachableHeight = Math.min(handle.offsetHeight, 24);
    const left = Math.max(reachableWidth - panel.offsetWidth, Math.min(x, bounds.clientWidth - reachableWidth));
    const top = Math.max(reachableHeight - handle.offsetHeight, Math.min(y, bounds.clientHeight - reachableHeight));
    panel.style.left = left + 'px';
    panel.style.top = top + 'px';
  }

  function setMode(value) {
    mode = value;
    savePreference(key, { ...geometry, mode });
    layout();
  }

  function track(target, resize) {
    let start;
    target.addEventListener('pointerdown', event => {
      if (event.button !== 0 || event.target.closest('button, select, label') || resizeMode()) return;
      start = { id: event.pointerId, x: event.clientX, y: event.clientY, left: panel.offsetLeft,
        top: panel.offsetTop, width: panel.offsetWidth, height: panel.offsetHeight };
      target.setPointerCapture(event.pointerId);
    });
    target.addEventListener('pointermove', event => {
      if (start?.id !== event.pointerId) return;
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (resize) {
        geometry.width = Math.min(bounds.clientWidth, Math.max(300, start.width + dx));
        geometry.height = Math.min(bounds.clientHeight, Math.max(160, start.height + dy));
      } else {
        geometry.x = start.left + dx;
        geometry.y = start.top + dy;
      }
      layout();
    });
    target.addEventListener('pointerup', event => {
      if (start?.id !== event.pointerId || resize) return;
      if (Math.abs(event.clientX - start.x) < 12) return;
      const viewportWidth = document.documentElement.clientWidth;
      if (event.clientX >= 0 && event.clientX <= 6) setMode('left');
      else if (event.clientX >= viewportWidth - 6 && event.clientX < viewportWidth) setMode('right');
    });
    target.addEventListener('lostpointercapture', () => {
      if (!start) return;
      start = undefined;
      savePreference(key, { ...geometry, mode });
    });
  }
  track(handle, false);
  track(grip, true);
  const observer = new ResizeObserver(layout);
  observer.observe(bounds);
  return { layout, setMode, toggle: () => setMode(mode === 'full' ? '' : 'full') };
}

function addLayoutMenu(controls, layout) {
  const menu = document.createElement('select');
  menu.className = 'layout-menu';
  menu.setAttribute('aria-label', 'Window layout');
  for (const [value, label] of [['menu', 'Layout'], ['', 'Restore size'], ['full', 'Maximize'], ['left', 'Snap left'], ['right', 'Snap right']]) {
    menu.add(new Option(label, value));
  }
  menu.addEventListener('change', () => {
    layout.setMode(menu.value);
    menu.value = 'menu';
  });
  controls.append(menu);
}
