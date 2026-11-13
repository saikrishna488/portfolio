(function(root) {
  function parseShell(source) {
    const tokens = []; let word = '', quoted = false, started = false, escape = false;
    function flush() { if (started) tokens.push({value:word}); word=''; started=false; }
    for(let i=0;i<source.length;i++) {
      const c=source[i];
      if(escape) { word+=c; started=true; escape=false; continue; }
      if(c==='\\' && quoted!=="'") {escape=true; started=true; continue;}
      if(quoted) { if(c===quoted) quoted=false; else word+=c; continue; }
      if(c==='"'||c==="'") {quoted=c; started=true; continue;}
      if(/\s/.test(c)) {flush(); continue;}
      if(c==='|'||c===';'||c==='&') {
        flush(); let op=c;
        if(c==='&') {if(source[++i]!=='&') throw Error('Use && to chain commands.'); op='&&';}
        tokens.push({op}); continue;
      }
      word+=c; started=true;
    }
    if(quoted) throw Error('Unclosed quote.');
    if(escape) throw Error('Trailing escape.');
    flush();
    const groups=[]; let group={condition:';',pipeline:[]}, args=[];
    for(const token of tokens) {
      if(!token.op) {args.push(token.value); continue;}
      if(!args.length) throw Error('Missing command before '+token.op);
      group.pipeline.push(args); args=[];
      if(token.op!=='|') {groups.push(group); group={condition:token.op,pipeline:[]};}
    }
    if(!args.length && tokens.length) throw Error('Missing command after operator.');
    if(args.length) {group.pipeline.push(args);groups.push(group);}
    return groups;
  }
  root.parseShell=parseShell;
  if(typeof module!=='undefined') module.exports={parseShell};
})(globalThis);
