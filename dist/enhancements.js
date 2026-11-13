function addApplication(id, title, description, content) {
  const panel=document.createElement('section'); panel.id=id; panel.hidden=true; panel.setAttribute('aria-label',title);
  const body=document.createElement('div');body.className='content';body.append(textElement('h2',title),content);panel.append(body);workspace.append(panel);
  summaries[id]=description;help[id]=description;registerApp(panel);completions.push(id,'open '+id);
  return body;
}
function recoverWindows() {
  for(const controller of windowControllers.values()) controller.recover();
  desktopStatus.textContent='All windows returned to the visible workspace.';
}
function moveToSpace(app, number) {
  app.desktop=number; if(active===app) active=undefined; setDesktop(desktopNumber);persistSession();
}
function dockMenu(id) {
  const app=apps.get(id);if(!app)return;
  const list=document.createElement('div');list.className='tool-list';
  list.append(action('Open',()=>launch(id)),action('Minimize',()=>{hideApp(app,'minimized');tool.close();}),action('Close',()=>{hideApp(app,'closed');tool.close();}),
    action('Move to Space '+(app.desktop===1?2:1),()=>{moveToSpace(app,app.desktop===1?2:1);tool.close();}),action('Recover windows',()=>{recoverWindows();tool.close();}));
  showTool(appName(id),list);
}
dock.addEventListener('contextmenu',event=>{const button=event.target.closest('[data-app]');if(!button)return;event.preventDefault();event.stopPropagation();dockMenu(button.dataset.app);});
dock.addEventListener('keydown',event=>{if((event.shiftKey&&event.key==='F10')||event.key==='ContextMenu'){event.preventDefault();dockMenu(event.target.closest('[data-app]')?.dataset.app);}});
const originalDesktopMenu=desktopMenu;
desktopMenu=function(id){originalDesktopMenu(id);toolContent.querySelector('.tool-list').append(action('Settings',()=>launch('settings')),action('Recover windows',()=>{recoverWindows();tool.close();}));};
function applySettings() {
  document.documentElement.style.fontSize=readPreference('textSize','16')+'px';
  document.body.dataset.wallpaper=readPreference('wallpaper','original');
  document.body.dataset.motion=readPreference('motion','system');
  setTheme(readPreference('theme','green'));
}
const settingsBody=document.createElement('div');settingsBody.className='settings-list';
for(const [key,label,values,fallback] of [
  ['wallpaper','Wallpaper',[['original','Original'],['midnight','Midnight'],['dusk','Dusk']],'original'],
  ['theme','Terminal theme',themes.map(t=>[t,t]),'green'],
  ['textSize','Text size',[['16','Default'],['18','Large'],['20','Larger']],'16'],
  ['motion','Motion',[['system','Use device preference'],['reduce','Reduce motion']],'system'],
  ['restoreSession','Restore open applications',[['yes','On'],['no','Off']],'yes'],
  ['saveHistory','Save command history',[['yes','On'],['no','Off']],'yes']
]) {
  const labelNode=document.createElement('label');labelNode.textContent=label;const select=document.createElement('select');select.name=key;
  for(const [value,title] of values) select.add(new Option(title,value));
  const saved=readPreference(key,fallback);select.value=typeof saved==='boolean'?(saved?'yes':'no'):saved;
  select.addEventListener('change',()=>{savePreference(key,['restoreSession','saveHistory'].includes(key)?select.value==='yes':select.value);if(key==='saveHistory'&&select.value==='no'){commands.length=0;historyIndex=0;savePreference('history',[]);}applySettings();persistSession();});
  labelNode.append(select);settingsBody.append(labelNode);
}
settingsBody.append(action('Recover windows',recoverWindows),action('Reset layout and preferences',()=>{
  if(!confirm('Reset this browser’s portfolio settings, window layout, and saved command history?'))return;
  for(let i=localStorage.length-1;i>=0;i--){const key=localStorage.key(i);if(key.startsWith('portfolio.'))localStorage.removeItem(key);}
  location.replace(location.pathname+'#desktop');location.reload();
}));
addApplication('settings','Settings','Appearance, session, and privacy preferences.',settingsBody);
const filter=document.createElement('select');filter.setAttribute('aria-label','Filter projects');
for(const name of ['All','Systems','Web','Tools','Experiments'])filter.add(new Option(name,name));
const categories={meridian:['Systems','Tools'],bluetooth:['Systems','Tools','Experiments'],wribate:['Web']};
filter.addEventListener('change',()=>{for(const button of document.querySelectorAll('#projects .entries > button'))button.hidden=filter.value!=='All'&&!categories[button.dataset.app]?.includes(filter.value);});
document.querySelector('#projects .entries').before(filter);
function persistSession() {
  if(readPreference('restoreSession',true)===false){savePreference('session',null);return;}
  savePreference('session',{version:1,space:desktopNumber,active:active?.panel.id,apps:[...apps].map(([id,app])=>({id,state:app.state,desktop:app.desktop}))});
}
const storedSession=readPreference('session',null);
if(readPreference('restoreSession',true)!==false&&storedSession?.version===1&&Array.isArray(storedSession.apps)) {
  for(const item of storedSession.apps){const app=apps.get(item.id);if(!app)continue;app.state=['open','minimized','closed'].includes(item.state)?item.state:'closed';app.desktop=item.desktop===2?2:1;}
  setDesktop(storedSession.space);for(const app of apps.values())app.layout.layout();
  if(location.hash&&apps.has(location.hash.slice(1)))openApp(apps.get(location.hash.slice(1)),false);
  else if(apps.get(storedSession.active)?.state==='open')raise(apps.get(storedSession.active));
}
const originalRefresh=refresh;
refresh=function(){originalRefresh();persistSession();};
window.addEventListener('pagehide',persistSession);
applySettings();refresh();sortIcons(sortOrder);
function switcher(){
  const list=document.createElement('div');list.className='tool-list window-overview';
  for(const [id,app] of apps){if(app.state==='closed')continue;
    const card=action(appName(id),()=>launch(id),'Space '+app.desktop+' · '+app.state);
    const image=app.panel.querySelector('img');if(image){const preview=image.cloneNode();preview.src=image.dataset.src||image.src;preview.removeAttribute('data-src');preview.alt='';preview.className='switcher-image';card.prepend(preview);}
    else card.append(textElement('p',summaries[id]));list.append(card);
  }
  if(!list.children.length)list.append(textElement('p','No open applications.'));
  showTool('Switch application',list);
}
document.addEventListener('keydown',event=>{if(event.altKey&&event.key.toLowerCase()==='s'){event.preventDefault();switcher();}});
const oldOverview=overview;overview=switcher;
// Keep the input visible when a mobile keyboard reduces the visual viewport.
if(window.visualViewport)visualViewport.addEventListener('resize',()=>{if(document.activeElement===input)form.scrollIntoView({block:'nearest'});});
input.addEventListener('focus',()=>form.scrollIntoView({block:'nearest'}));
document.querySelector('#startup-commands').replaceChildren(commandList());

applyView();
// Fullscreen is offered only after entering desktop mode and always needs a user click.
const fullscreenPrompt=document.createElement('aside');fullscreenPrompt.id='fullscreen-prompt';fullscreenPrompt.setAttribute('aria-label','Fullscreen suggestion');
fullscreenPrompt.append(textElement('span','For a more immersive desktop, try fullscreen.'),action('Enter fullscreen',async()=>{
  try {await document.documentElement.requestFullscreen();fullscreenPrompt.hidden=true;}
  catch {desktopStatus.textContent='Fullscreen is unavailable. You can use your browser’s fullscreen control.';}
}),action('Not now',()=>{savePreference('fullscreenDismissed',true);fullscreenPrompt.hidden=true;}));
document.body.append(fullscreenPrompt);
function updateFullscreenPrompt(){fullscreenPrompt.hidden=document.body.dataset.view!=='desktop'||Boolean(document.fullscreenElement)||!document.fullscreenEnabled||readPreference('fullscreenDismissed',false)||compactWindows.matches;}
new MutationObserver(updateFullscreenPrompt).observe(document.body,{attributes:true,attributeFilter:['data-view']});
document.addEventListener('fullscreenchange',updateFullscreenPrompt);compactWindows.addEventListener('change',updateFullscreenPrompt);updateFullscreenPrompt();
const previousMenu=desktopMenu;
desktopMenu=function(id){previousMenu(id);if(document.fullscreenEnabled)toolContent.querySelector('.tool-list').append(action(document.fullscreenElement?'Exit fullscreen':'Enter fullscreen',async()=>{tool.close();try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{desktopStatus.textContent='Use the browser fullscreen control.';}}));};
