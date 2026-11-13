const {test}=require('node:test');const assert=require('node:assert/strict');const {parseShell}=require('../dist/shell-parser');
test('quoted separators are data',()=>assert.deepEqual(parseShell('cat "a;b" | grep "x&&y"')[0].pipeline,[['cat','a;b'],['grep','x&&y']]));
test('chaining preserves conditions',()=>assert.deepEqual(parseShell('pwd && whoami; ls').map(x=>x.condition),[';','&&',';']));
test('preserves case and empty arguments',()=>assert.deepEqual(parseShell('grep "React" ""')[0].pipeline,[['grep','React','']]));
test('reject malformed input',()=>{for(const value of ['cat "a','pwd &&','| head','ls & pwd','pwd || whoami','cat \\'])assert.throws(()=>parseShell(value));});
test('escaped whitespace and literal operators',()=>assert.deepEqual(parseShell('cat a\\ b; grep \\|')[0].pipeline,[['cat','a b']]));
