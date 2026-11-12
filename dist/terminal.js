const terminal = document.querySelector('#terminal-view');
const terminalWindow = terminal.querySelector('.terminal-window');
const terminalScroll = document.querySelector('#terminal-scroll');
const startup = document.querySelector('.terminal-intro');
const output = document.querySelector('#terminal-output');
const form = document.querySelector('#command-line');
const input = document.querySelector('#command-input');
const canAutoFocus = matchMedia('(pointer: fine)');
const savedHistory = readPreference('history', []);
const commands = Array.isArray(savedHistory) ? savedHistory.filter(value => typeof value === 'string') : [];
let historyIndex = commands.length;
let draft = '';
const themes = ['green', 'amber', 'ice'];
const summaries = {
  about: 'Computer science graduate student building web applications and systems software.',
  experience: 'University of Central Missouri · Sodexo · Innorize Enterprises.',
  projects: 'Meridian, Raw Bluetooth, and Wribate.',
  meridian: 'A Linux desktop shell with a configurable dock, launcher, and hardware settings.',
  bluetooth: 'An experimental macOS userspace driver for Bluetooth keyboards and mice.',
  wribate: 'A full-stack application for online debate and discussion.',
  education: 'MS in Computer Science at the University of Central Missouri. Expected May 2027.',
  contact: 'Email, LinkedIn, and GitHub.',
  resume: 'Preview or download my résumé.'
};
const help = {
  help: 'Show commands and shortcuts',
  ...summaries,
  open: 'Open a detailed window, for example /open meridian',
  desktop: 'Switch to desktop mode',
  history: 'Show previous commands',
  theme: 'Choose green, amber, or ice',
  clear: 'Clear the entire console'
};
const completions = [
  ...Object.keys(help),
  ...Object.keys(summaries).map(name => 'open ' + name),
  ...themes.map(theme => 'theme ' + theme)
].map(command => '/' + command);

function textElement(tag, value) {
  const element = document.createElement(tag);
  element.textContent = value;
  return element;
}

function commandList() {
  const list = document.createElement('dl');
  list.className = 'help-list';
  for (const [action, description] of Object.entries(help)) {
    const term = document.createElement('dt');
    const button = textElement('button', '/' + action);
    button.dataset.command = '/' + (action === 'open' ? 'open projects' : action);
    term.append(button);
    list.append(term, textElement('dd', description));
  }
  return list;
}

function print(command, ...elements) {
  const response = document.createElement('article');
  response.className = 'terminal-response';
  const prompt = textElement('p', 'sai@portfolio:~$ ' + command);
  prompt.className = 'terminal-path';
  response.append(prompt, ...elements);
  output.append(response);
  form.scrollIntoView({ block: 'nearest' });
}

function clearConsole() {
  startup.hidden = true;
  output.replaceChildren();
  input.value = '';
  historyIndex = commands.length;
  draft = '';
}

function setTheme(theme) {
  if (!themes.includes(theme)) return false;
  terminal.dataset.theme = theme;
  savePreference('theme', theme);
  return true;
}

function runCommand(raw, typed = false) {
  const command = raw.trim().toLowerCase().replace(/^\//, '').replace(/\s+/g, ' ');
  if (!command) return;
  if (typed) {
    commands.push(raw.trim().slice(0, 160));
    if (commands.length > 80) commands.shift();
    savePreference('history', commands);
  }
  historyIndex = commands.length;
  draft = '';
  input.value = '';

  const target = command.slice(5).replace(/^raw[- ]bluetooth$/, 'bluetooth').replace(/^résumé$/, 'resume');
  if (command === 'desktop' || (command.startsWith('open ') && apps.has(target))) {
    switchView(command === 'desktop' ? '#desktop' : '#' + target);
    return;
  }

  if (command === 'clear') clearConsole();
  else if (command === 'help') print(raw, commandList(), textElement('p', 'Tab completes · Ctrl+L clears · Ctrl+C cancels · ↑/↓ browse history'));
  else if (command === 'history') print(raw, textElement('pre', commands.map((value, i) => (i + 1) + '  ' + value).join('\n') || 'No commands yet.'));
  else if (command === 'theme' || command.startsWith('theme ')) {
    const theme = command.slice(6);
    print(raw, textElement('p', setTheme(theme) ? 'Theme set to ' + theme + '.' : 'Usage: /theme green, /theme amber, or /theme ice'));
  } else if (Object.hasOwn(summaries, command)) {
    const link = textElement('a', 'Open ' + apps.get(command).panel.getAttribute('aria-label'));
    link.href = '#' + command;
    print(raw, textElement('p', summaries[command]), link);
  } else print(raw, textElement('p', 'Command not found. Type /help.'));
  if (typed || canAutoFocus.matches) input.focus({ preventScroll: true });
}

document.querySelector('#startup-commands').append(commandList());
setTheme(readPreference('theme', 'green'));
const layout = manageWindow(terminalWindow, terminal, terminal.querySelector('.terminal-titlebar'), 'window.terminal');
layout.layout();
document.querySelector('#terminal-close').addEventListener('click', () => {
  clearConsole();
  startup.hidden = false;
  switchView('#desktop');
});
document.querySelector('#terminal-minimize').addEventListener('click', () => switchView('#desktop'));
document.querySelector('#terminal-maximize').addEventListener('click', layout.toggle);

form.addEventListener('submit', event => {
  event.preventDefault();
  runCommand(input.value, true);
});
terminal.addEventListener('click', event => {
  const button = event.target.closest('[data-command]');
  if (button) runCommand(button.dataset.command);
});
input.addEventListener('keydown', event => {
  if (event.key === 'Tab' && !event.shiftKey && input.value.trim()) {
    const prefix = '/' + input.value.trimStart().replace(/^\//, '').toLowerCase();
    const matches = completions.filter(value => value.startsWith(prefix));
    if (!matches.length || matches[0] === prefix && matches.length === 1) return;
    event.preventDefault();
    const common = matches[0].slice(0, [...matches[0]].findIndex((char, index) => matches.some(value => value[index] !== char)));
    if (matches.length === 1) input.value = matches[0];
    else if (common.length > prefix.length) input.value = common;
    else print(input.value, textElement('p', matches.join('  ')));
  } else if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
    event.preventDefault();
    if (historyIndex === commands.length) draft = input.value;
    historyIndex = Math.min(commands.length, Math.max(0, historyIndex + (event.key === 'ArrowUp' ? -1 : 1)));
    input.value = commands[historyIndex] ?? draft;
  } else if (event.key === 'Escape') document.querySelector('#terminal-close').focus();
});
terminal.addEventListener('keydown', event => {
  if (!event.ctrlKey || event.altKey || event.metaKey) return;
  const key = event.key.toLowerCase();
  if (key === 'l') {
    event.preventDefault();
    clearConsole();
    input.focus();
  } else if (key === 'c' && event.target === input && input.selectionStart === input.selectionEnd && !window.getSelection()?.toString()) {
    event.preventDefault();
    print(input.value + '^C');
    input.value = '';
    historyIndex = commands.length;
    draft = '';
  }
});
if (document.body.dataset.view === 'terminal' && canAutoFocus.matches) input.focus({ preventScroll: true });
