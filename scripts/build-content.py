from pathlib import Path
import re, html
root=Path(__file__).resolve().parents[1]; dist=root/'dist'; source=(dist/'index.html').read_text()
sections={m[0]:m[1] for m in re.findall(r'<section id="([^"]+)"[^>]*><div class="content">(.*?)</div></section>',source,re.S)}
css=':root{font:17px/1.65 system-ui;color:#17202b;background:#fff}body{max-width:780px;margin:auto;padding:28px}a{color:#254ca1}img,video{max-width:100%;height:auto}button{display:none}h1,h2,h3{line-height:1.2}nav{margin-bottom:24px}@media print{nav,.resume-actions,video{display:none}body{padding:0;font-size:11pt}a{color:inherit}h2,h3{break-after:avoid}img{max-height:200px;object-fit:contain}}'
def clean(content):
    content=content.replace('data-src=', 'src=')
    content=re.sub(r'<button[^>]*data-app="([^"]+)"[^>]*>(.*?)</button>',lambda m:f'<a href="./#{m[1]}">{m[2]}</a>',content,flags=re.S)
    return content
header='<nav><a href="./">Interactive portfolio</a> · <a href="media/resume.pdf">Résumé PDF</a> · <a href="mailto:saikrishna@pakkir.com">Email</a></nav>'
def page(title,body,path,description):
    return f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title} · Sai Krishna</title><meta name="description" content="{html.escape(description,quote=True)}"><link rel="canonical" href="https://www.pakkir.com/{path}"><meta property="og:url" content="https://www.pakkir.com/{path}"><meta property="og:title" content="{title} · Sai Krishna"><meta property="og:description" content="{html.escape(description,quote=True)}"><meta property="og:image" content="https://www.pakkir.com/media/social.jpg"><meta name="twitter:card" content="summary_large_image"><style>{css}</style></head><body>{header}<main>{body}</main></body></html>'
body='<h1>Sai Krishna Reddy Pakkir</h1>'
for id in ['about','experience','education','projects','contact']:
    content=clean(sections[id]);content=re.sub('<h1>.*?</h1>','',content,flags=re.S);body+=content
body+='<h2>Skills demonstrated in projects</h2><p>Rust and TypeScript — Meridian; USB HCI and SwiftUI — Raw Bluetooth; Next.js, Node.js, MongoDB and authenticated REST APIs — Wribate.</p>'
(dist/'profile.html').write_text(page('Recruiter view',body,'profile.html','Experience, education, projects, and skills by Sai Krishna Reddy Pakkir.'))
for id,title in [('meridian','Meridian'),('bluetooth','Raw Bluetooth'),('wribate','Wribate')]:
    body=clean(sections[id]);body=f'<p><a href="./#{id}">Open {title} in a desktop window</a></p>'+body
    description=re.sub('<[^>]+>',' ',sections[id]).strip()[:180]
    (dist/f'{id}.html').write_text(page(title,body,f'{id}.html',description))
urls=['','profile.html','meridian.html','bluetooth.html','wribate.html']
(dist/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+''.join(f'<url><loc>https://www.pakkir.com/{url}</loc></url>' for url in urls)+'</urlset>')
