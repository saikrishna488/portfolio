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

const completions = [
  ...Object.keys(help),
  ...Object.keys(summaries).map(name => 'open ' + name),
  ...themes.map(theme => 'theme ' + theme)
];

const fileSystem = new Map([
  ['/', null],
  ['/projects', null],
  ['/about.txt', 'about'],
  ['/experience.txt', 'experience'],
  ['/education.txt', 'education'],
  ['/contact.txt', 'contact'],
  ['/resume.txt', 'resume'],
  ['/projects/meridian.txt', 'meridian'],
  ['/projects/raw-bluetooth.txt', 'bluetooth'],
  ['/projects/wribate.txt', 'wribate']
]);
let currentDirectory = '/';

function promptText() {
  return 'sai@portfolio:' + (currentDirectory === '/' ? '~' : '~' + currentDirectory) + '$';
}

function absolutePath(path) {
  const parts = path.startsWith('/') ? [] : currentDirectory.split('/').filter(Boolean);
  for (const part of path.split('/')) {
    if (part === '..') parts.pop();
    else if (part && part !== '.') parts.push(part);
  }
  return '/' + parts.join('/');
}

function runFilesystem(verb, argument, raw) {
  const path = absolutePath(argument || (verb === 'cd' ? '/' : '.'));
  let value;
  let link;
  let success = true;
  if (verb === 'pwd') value = currentDirectory;
  else if (verb === 'whoami') value = 'sai';
  else if (!fileSystem.has(path)) {
    value = 'No such file or directory: ' + argument;
    success = false;
  } else if (verb === 'cat' && fileSystem.get(path)) {
    const id = fileSystem.get(path);
    value = readableContent(id);
    link = textElement('a', 'Open ' + apps.get(id).panel.getAttribute('aria-label'));
    link.href = '#' + id;
  } else if (verb === 'ls' && fileSystem.get(path)) value = path.split('/').at(-1);
  else if (verb === 'ls') {
    const prefix = path === '/' ? '/' : path + '/';
    value = [...fileSystem].filter(([entry]) => entry.startsWith(prefix) && entry !== path)
      .map(([entry, type]) => entry.slice(prefix.length) + (type ? '' : '/'))
      .filter(name => !name.replace(/\/$/, '').includes('/')).join('  ');
  } else if (verb === 'cd' && fileSystem.get(path) === null) {
    currentDirectory = path;
    form.querySelector('label').textContent = promptText();
    return true;
  } else {
    value = verb === 'cat' ? 'Is a directory: ' + path : 'Not a directory: ' + path;
    success = false;
  }
  print(raw, textElement('pre', value), ...(link ? [link] : []));
  return success;
}

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
  const prompt = textElement('p', promptText() + ' ' + command);
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

function executeCommand(raw) {
  const parsed = Array.isArray(raw) ? raw : parseShell(raw)[0]?.pipeline[0] || [];
  const command = parsed.join(' ').replace(/^\//, '');
  raw = command;
  if (!command) return false;
  const [first, ...args] = parsed;
  const verb = first?.replace(/^\//, '').toLowerCase();
  if (args[0] === '--help' || (verb === 'help' && args.length)) {
    const name = verb === 'help' ? args[0].replace(/^\//, '') : verb;
    print(raw, textElement('pre', (help[name] || 'Unknown command') + '\n' + (commandExamples[name] || '/' + name))); return Boolean(help[name]);
  }
  if (verb === 'history' && args[0] === 'clear') { commands.length = 0; savePreference('history', []); historyIndex = 0; print(raw, textElement('p', 'History cleared.')); return true; }
  if (verb === 'open') { const path = absolutePath(args.join(' ')); const id = fileSystem.get(path) || args.join(' ').replace(/^raw[- ]bluetooth$/, 'bluetooth'); if (apps.has(id)) {switchView('#' + id); return true;} }
  if (['ls', 'cd', 'cat', 'pwd', 'whoami'].includes(verb)) {
    return runFilesystem(verb, args.join(' '), raw);
  }

  const target = command.slice(5).replace(/^raw[- ]bluetooth$/, 'bluetooth').replace(/^résumé$/, 'resume');
  if (command === 'desktop' || (command.startsWith('open ') && apps.has(target))) {
    switchView(command === 'desktop' ? '#desktop' : '#' + target);
    return true;
  }

  if (command === 'clear') clearConsole();
  else if (command === 'neofetch') print(raw, textElement('pre', [
    'sai@portfolio',
    'Shell: Portfolio Terminal',
    'Mode: ' + document.body.dataset.view,
    'Theme: ' + terminal.dataset.theme,
    'Applications: ' + apps.size,
    'Working directory: ' + currentDirectory
  ].join('\n')));
  else if (command === 'help') print(raw, commandList(), textElement('p', 'Tab completes · Ctrl+L clears · Ctrl+C cancels · ↑/↓ browse history'));
  else if (command === 'history') print(raw, textElement('pre', commands.map((value, i) => (i + 1) + '  ' + value).join('\n') || 'No commands yet.'));
  else if (command === 'theme' || command.startsWith('theme ')) {
    const theme = command.slice(6);
    print(raw, textElement('p', setTheme(theme) ? 'Theme set to ' + theme + '.' : 'Usage: /theme green, /theme amber, or /theme ice'));
  } else if (command === 'github') {
    const link = textElement('a', 'GitHub · saikrishna488');
    link.href = 'https://github.com/saikrishna488';
    print(raw, link);
  } else if (Object.hasOwn(summaries, command)) {
    const link = textElement('a', 'Open ' + apps.get(command).panel.getAttribute('aria-label'));
    link.href = '#' + command;
    print(raw, textElement('p', summaries[command]), link);
  } else {
    const suggestion = Object.keys(help).find(name => name.startsWith(verb.slice(0, 2)));
    print(raw, textElement('p', suggestion ? 'Command not found. Try /' + suggestion + ' or /help.' : 'Command not found. Type /help.'));
    return false;
  }
  return true;
}

function runCommand(raw, typed = false) {
  if (!raw.trim()) return;
  if (typed && readPreference('saveHistory', true)) {
    commands.push(raw.trim().slice(0, 160));
    if (commands.length > 80) commands.shift();
    savePreference('history', commands);
  }
  historyIndex = commands.length;
  draft = '';
  input.value = '';

  try {
    let success = true;
    for (const group of parseShell(raw)) {
      if (group.condition === '&&' && !success) continue;
      if (group.pipeline.length > 1 || (['find','head','tree','grep'].includes(group.pipeline[0][0].replace(/^\//,'')) && group.pipeline[0][1] !== '--help')) {
        let stream;
        for (const args of group.pipeline) stream = readOnlyCommand(args, stream);
        print(raw, textElement('pre', stream)); success = true;
      } else success = executeCommand(group.pipeline[0]);
    }
  } catch (error) { print(raw, textElement('p', 'Error: ' + error.message)); }
  if (document.body.dataset.view === 'terminal' && (typed || canAutoFocus.matches)) input.focus({ preventScroll: true });
}


completions.push(...['find','head','tree','grep','history clear'], ...Object.keys(help).map(name=>'help '+name));
function readableContent(id) { const copy=apps.get(id).panel.querySelector('.content').cloneNode(true); copy.querySelectorAll('p,h1,h2,h3,li,button,figcaption').forEach(node=>node.append(document.createTextNode('\n'))); return copy.textContent.trim(); }
function readOnlyCommand(args, stream) {
  const [name,...rest] = args; const verb=name.replace(/^\//,'');
  const content = path => { const id=fileSystem.get(absolutePath(path)); if(!id) throw Error('Not a readable file: '+path); return readableContent(id); };
  if(verb==='cat') {if(!rest.length) throw Error('Usage: cat <file>');return rest.map(content).join('\n');}
  if(verb==='pwd') return currentDirectory;
  if(verb==='whoami') return 'sai';
  if(verb==='grep') {
    const insensitive=rest[0]==='-i'; const pattern=rest[insensitive?1:0];
    if(pattern===undefined) throw Error('Usage: grep [-i] <text> [file]');
    const source=stream ?? content(rest[insensitive?2:1] || '');
    return source.split('\n').filter(line=>(insensitive?line.toLowerCase():line).includes(insensitive?pattern.toLowerCase():pattern)).join('\n');
  }
  if(verb==='head') {
    let count=10, path=rest[0]; if(rest[0]==='-n') {count=Number(rest[1]);path=rest[2];}
    if(!Number.isInteger(count)||count<0) throw Error('head needs a nonnegative line count.');
    return (stream??content(path||'')).split('\n').slice(0,count).join('\n');
  }
  if(['find','tree','ls'].includes(verb)) {
    const base=absolutePath(rest[0]||'.'); if(!fileSystem.has(base)) throw Error('No such directory: '+base);
    return [...fileSystem.keys()].filter(path=>(path===base || path.startsWith(base==='/'?'/':base+'/')) && (!rest[1]||path.includes(rest[1])))
      .map(path=>verb==='tree'?'  '.repeat(path.split('/').length-2)+path.split('/').at(-1)+(fileSystem.get(path)===null?'/':''):path).join('\n');
  }
  throw Error('Only read-only commands can be piped: cat, grep, head, find, tree, ls, pwd, whoami.');
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
    const slash = input.value.trimStart().startsWith('/') ? '/' : '';
    const prefix = input.value.trimStart().replace(/^\//, '').toLowerCase();
    const filesystemVerb = /^(cd|ls|cat|open|find|head|tree) (.*)$/.exec(prefix);
    let matches = completions.filter(value => value.startsWith(prefix));
    if (filesystemVerb) {
      const [, verb, argument] = filesystemVerb;
      const split = argument.lastIndexOf('/') + 1;
      const base = argument.slice(0, split);
      const parent = absolutePath(base || '.');
      matches = [...fileSystem].filter(([path, type]) => path !== '/' &&
        path.slice(0, path.lastIndexOf('/')) === (parent === '/' ? '' : parent) &&
        (verb !== 'cd' || type === null))
        .map(([path, type]) => verb + ' ' + base + path.split('/').at(-1) + (type ? '' : '/'))
        .filter(value => value.startsWith(prefix));
    }
    if (!matches.length || matches[0] === prefix && matches.length === 1) return;
    event.preventDefault();
    const mismatch = [...matches[0]].findIndex((char, index) => matches.some(value => value[index] !== char));
    const common = mismatch < 0 ? matches[0] : matches[0].slice(0, mismatch);
    if (matches.length === 1) input.value = slash + matches[0];
    else if (common.length > prefix.length) input.value = slash + common;
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
  if (key === 'r') {
    event.preventDefault();
    const field = document.createElement('input');
    field.type = 'search';
    field.placeholder = 'Search command history';
    field.setAttribute('aria-label', field.placeholder);
    const results = document.createElement('div');
    results.className = 'tool-list';
    function findHistory() {
      const query = field.value.toLowerCase();
      const matches = [...new Set(commands.slice().reverse())]
        .filter(command => command.toLowerCase().includes(query));
      results.replaceChildren(...matches.map(command => action(command, () => {
        tool.close();
        input.value = command;
        input.focus();
      })));
      if (!matches.length) results.append(textElement('p', 'No matching commands'));
    }
    field.addEventListener('input', findHistory);
    field.addEventListener('keydown', event => {
      if (event.key !== 'Enter') return;
      event.preventDefault();
      results.querySelector('button')?.click();
    });
    findHistory();
    showTool('Command history', field, results);
  } else if (key === 'l') {
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
