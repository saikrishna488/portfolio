const terminal = document.querySelector('#terminal-view');
const terminalScroll = document.querySelector('#terminal-scroll');
const output = document.querySelector('#terminal-output');
const form = document.querySelector('#command-line');
const input = document.querySelector('#command-input');
const commandHistory = [];
const canAutoFocus = matchMedia('(pointer: fine)');
let historyIndex = 0;
const help = [
  ['about', 'Who I am'],
  ['projects', 'Browse Meridian and Raw Bluetooth'],
  ['open meridian', 'Explore Meridian'],
  ['open bluetooth', 'Explore Raw Bluetooth'],
  ['resume', 'Preview or download my résumé'],
  ['contact', 'Email, GitHub, and LinkedIn'],
  ['education', 'View my education'],
  ['desktop', 'Switch to the windowed portfolio'],
  ['clear', 'Clear terminal output']
];

function commandList() {
  const list = document.createElement('dl');
  list.className = 'help-list';
  for (const [action, description] of [['help', 'Show available commands'], ...help]) {
    const term = document.createElement('dt');
    const button = document.createElement('button');
    button.dataset.command = '/' + action;
    button.textContent = '/' + action;
    term.append(button);
    const definition = document.createElement('dd');
    definition.textContent = description;
    list.append(term, definition);
  }
  return list;
}

document.querySelector('#startup-commands').append(commandList());

function runCommand(raw, typed = false) {
  const command = raw.trim().toLowerCase().replace(/^\//, '').replace(/\s+/g, ' ');
  if (!command) return;
  if (typed) commandHistory.push(raw);
  historyIndex = commandHistory.length;
  input.value = '';
  if (command === 'desktop') {
    switchView('#desktop');
    return;
  }
  if (command === 'clear') {
    output.replaceChildren();
  } else {
    const response = document.createElement('article');
    response.className = 'terminal-response';
    const prompt = document.createElement('p');
    prompt.className = 'terminal-path';
    prompt.textContent = 'sai@portfolio:~$ ' + raw;
    response.append(prompt);
    const name = command.replace(/^open /, '').replace(/^raw[- ]bluetooth$/, 'bluetooth').replace(/^résumé$/, 'resume');
    if (command === 'help') {
      response.append(commandList());
    } else if (apps.has(name)) {
      const content = apps.get(name).panel.querySelector('.content').cloneNode(true);
      content.querySelector('.share-url')?.remove();
      content.querySelectorAll('[data-app]').forEach(button => {
        button.dataset.command = button.dataset.app;
        delete button.dataset.app;
      });
      response.append(content);
    } else {
      const message = document.createElement('p');
      message.textContent = 'Command not found. Type /help to see available commands.';
      response.append(message);
    }
    output.append(response);
  }
  if (typed || canAutoFocus.matches) input.focus({ preventScroll: true });
  const latest = output.lastElementChild;
  if (latest && latest.offsetHeight + form.offsetHeight > terminalScroll.clientHeight) {
    latest.scrollIntoView({ block: 'start' });
  } else {
    form.scrollIntoView({ block: 'nearest' });
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();
  runCommand(input.value, true);
});
terminal.addEventListener('click', event => {
  const button = event.target.closest('[data-command]');
  if (button) runCommand(button.dataset.command);
});
input.addEventListener('keydown', event => {
  if (!['ArrowUp', 'ArrowDown'].includes(event.key)) return;
  event.preventDefault();
  historyIndex = Math.min(commandHistory.length, Math.max(0, historyIndex + (event.key === 'ArrowUp' ? -1 : 1)));
  input.value = commandHistory[historyIndex] ?? '';
});

if (document.body.dataset.view === 'terminal' && canAutoFocus.matches) {
  input.focus({ preventScroll: true });
}

terminalScroll.addEventListener('click', event => {
  if (event.target.closest('a, button, video, input') || window.getSelection()?.toString()) return;
  input.focus({ preventScroll: true });
});
