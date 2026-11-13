const {test}=require('node:test');const assert=require('node:assert/strict');const vm=require('node:vm');const fs=require('node:fs');
function fixture(){
 const data=new Map(),handlers={};const style={removeProperty(k){delete this[k];}};
 const panel={hidden:false,dataset:{},style,offsetWidth:500,offsetHeight:350,offsetLeft:200,offsetTop:100,append(){}};
 const handle={offsetHeight:40,addEventListener(k,f){handlers[k]=f;},setPointerCapture(){}};
 const bounds={clientWidth:1000,clientHeight:700};
 const ctx=vm.createContext({localStorage:{getItem:k=>data.get(k),setItem:(k,v)=>data.set(k,v)},matchMedia:()=>({matches:false}),ResizeObserver:class{constructor(f){this.f=f}observe(){}},document:{body:{append(){}},createElement:()=>({dataset:{},setAttribute(){},addEventListener(){}}),querySelector:()=>null},innerWidth:1000,console});
 vm.runInContext(fs.readFileSync('dist/window-layout.js','utf8')+';globalThis.manager=manageWindow;',ctx);
 return {panel,bounds,handlers,manager:ctx.manager(panel,bounds,handle,'window.test'),data};
}
test('centers new windows',()=>{const f=fixture();f.manager.layout();assert.equal(f.panel.style.left,'250px');assert.equal(f.panel.style.top,'175px');});
test('maximizes and restores',()=>{const f=fixture();f.manager.toggle();assert.equal(f.panel.dataset.layout,'full');f.manager.toggle();assert.equal(f.panel.dataset.layout,'');});
test('left and right snapping',()=>{const f=fixture();for(const side of ['left','right']){f.manager.setMode(side);assert.equal(f.panel.dataset.layout,side);}});
test('drag permits partial offscreen but retains handle',()=>{const f=fixture();f.handlers.pointerdown({button:0,target:{closest:()=>null},pointerId:1,clientX:300,clientY:100});f.handlers.pointermove({pointerId:1,clientX:-500,clientY:100,});assert.equal(f.panel.style.left,'-368px');});
test('recover clears stored geometry and mode',()=>{const f=fixture();f.manager.setMode('full');f.manager.recover();assert.equal(f.panel.dataset.layout,'');assert.equal(f.panel.style.left,'250px');assert.equal(f.data.get('portfolio.window.test'),'{}');});
