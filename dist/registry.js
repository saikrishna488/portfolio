// Shared app and terminal metadata. Launchers, search, help and completion consume these registries.
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
  clear: 'Clear the entire console',
  github: 'Open the GitHub profile',
  ls: 'List files and folders',
  cd: 'Change directory, for example cd projects',
  cat: 'Read a text file, for example cat about.txt',
  pwd: 'Print the current directory',
  whoami: 'Show the portfolio username',
  neofetch: 'Show the portfolio session'
};
const commandExamples = {
  cat: 'cat "about.txt" | grep -i React', cd: 'cd /projects', ls: 'ls /projects',
  open: 'open /projects/meridian.txt', history: 'history · history clear',
  head: 'head -n 5 /about.txt', find: 'find /projects bluetooth', tree: 'tree /',
  grep: 'cat about.txt | grep -i applications', help: 'help cat · cat --help',
  theme: 'theme green · theme amber · theme ice'
};
Object.assign(help, {find:'Find files by partial name', head:'Read the first lines of a file or pipe', tree:'Show the virtual filesystem', grep:'Filter text lines; -i ignores case'});
const shortcuts = {search:"Ctrl/Command+K", spaces:"Alt+1 / Alt+2", overview:"Alt+O", switcher:"Alt+S", windows:"Ctrl+Alt+Left / Right", quickLook:"Space", close:"Escape"};
