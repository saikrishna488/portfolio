from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
root=Path(__file__).resolve().parents[1]/'dist';missing=[];count=0
class Check(HTMLParser):
 def handle_starttag(self,tag,attrs):
  global count
  for name,value in attrs:
   if name not in ('src','href','data-src','poster') or not value or value.startswith(('#','mailto:','http:','https:','data:')):continue
   target=root/unquote(urlsplit(value).path)
   count+=1
   if not target.exists():missing.append(str(target))
for file in root.glob('*.html'): Check().feed(file.read_text())
assert not missing,missing
print(f'{count} local asset/link references resolve.')
print(f'Initial HTML/CSS/JS: {sum(f.stat().st_size for f in root.iterdir() if f.suffix in (".js",".css") or f.name=="index.html")} bytes, uncompressed.')
