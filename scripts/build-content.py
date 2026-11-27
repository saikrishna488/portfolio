from pathlib import Path
import html
import json
import re

root = Path(__file__).resolve().parents[1]
dist = root / 'dist'
content = json.loads((root / 'content/portfolio.json').read_text())
projects = [
    ('nebula', 'Nebula Code', 'C++20 · Qt 6', 'An offline-first code editor for macOS and Linux, with split editing, a terminal, and local development tools.', 'Tools'),
    ('meridian', 'Meridian', 'Rust · TypeScript · Linux', 'A desktop shell bringing the dock, launcher, notifications, and hardware settings into one interface.', 'Systems'),
    ('bluetooth', 'Raw Bluetooth', 'macOS · USB HCI · SwiftUI', 'An experimental userspace driver connecting Bluetooth keyboards and mice through an external USB adapter.', 'Systems'),
    ('wribate', 'Wribate', 'Next.js · Node.js · MongoDB', 'A responsive web application for online debate and discussion, built during my software engineering internship.', 'Web'),
]
navigation = [('index', 'Overview'), ('projects', 'Projects'), ('experience', 'Experience'), ('education', 'Education'), ('resume', 'Résumé'), ('contact', 'Contact')]

def project_list(limit=None):
    return '<div class="project-list">' + ''.join(
        f'<a class="project-row" data-category="{category}" href="{id}.html"><div><span class="meta">{stack}</span><h3>{title}</h3><p>{description}</p></div><span class="read-label">View project</span></a>'
        for id, title, stack, description, category in projects[:limit]
    ) + '</div>'

def clean(body):
    body = body.replace('data-src=', 'src=')
    body = re.sub(r'<button[^>]*data-app="([^"]+)"[^>]*>(.*?)</button>', lambda m: f'<a class="button" href="{m[1]}.html">{m[2]}</a>', body, flags=re.S)
    body = re.sub(r'<h2>(.*?)</h2>', r'<h1>\1</h1>', body, count=1)
    return body

def page(id, title, body, active=None, description=None):
    active = active or id
    description = description or 'Projects, experience, and software by Sai Krishna Reddy Pakkir.'
    path = '' if id == 'index' else id + '.html'
    nav = ''.join(f'<a href="{key}.html"{' aria-current="page"' if key == active else ""}>{label}</a>' for key, label in navigation)
    return f'''<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html.escape(title)} · Sai Krishna Pakkir</title>
<meta name="description" content="{html.escape(description, quote=True)}">
<link rel="canonical" href="https://www.pakkir.com/{path}">
<meta property="og:url" content="https://www.pakkir.com/{path}">
<meta property="og:title" content="{html.escape(title)} · Sai Krishna Pakkir">
<meta property="og:description" content="{html.escape(description, quote=True)}">
<meta property="og:image" content="https://www.pakkir.com/media/social.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="media/favicon.svg"><link rel="stylesheet" href="portfolio.css">
<script src="portfolio.js" defer></script></head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<header class="mobile-header"><a href="index.html">Sai Krishna<span class="brand-dot">.</span></a><button id="menu-toggle" aria-expanded="false" aria-controls="site-sidebar">Menu</button></header>
<aside class="sidebar" id="site-sidebar" aria-label="Sidebar">
<a class="identity" href="index.html"><span class="monogram" aria-hidden="true">sk.</span><strong>Sai Krishna Pakkir</strong><span>Software developer</span></a>
<nav aria-label="Main navigation">{nav}</nav>
<div class="sidebar-bottom"><a href="https://github.com/saikrishna488">GitHub</a><a href="https://www.linkedin.com/in/saikrishna488">LinkedIn</a><a href="mailto:saikrishna@pakkir.com">Email me</a><p>Building across the stack.</p></div>
</aside>
<main id="main" tabindex="-1"><div class="page-content">{body}</div><footer><span>Sai Krishna Reddy Pakkir</span><a href="mailto:saikrishna@pakkir.com">Let’s connect</a></footer></main>
</body></html>'''

home = '''<div class="intro"><p class="eyebrow">Web · Desktop · Systems</p>
<h1>Hi, I’m Sai Krishna.<br><span>I build software.</span></h1>
<p class="lead">I’m a computer science graduate student at the University of Central Missouri. I build web applications and systems software, from interfaces to hardware integrations.</p>
<div class="actions"><a class="button" href="projects.html">Explore my work</a><a class="text-link" href="media/resume.pdf" download>Download résumé</a></div></div>
<div class="section-heading"><h2>Selected projects</h2><a href="projects.html">All projects</a></div>''' + project_list(3) + '''
<section class="about-note"><p class="eyebrow">A little about me</p><h2>Curious about every layer.</h2><p>I enjoy working across the stack, learning how things work, and turning ideas into tools people can use. My work spans full-stack web development, native desktop applications, and system integrations.</p><a href="experience.html">My experience</a></section>'''
(dist / 'index.html').write_text(page('index', 'Overview', home))
filters = '<div class="filters" aria-label="Filter projects">' + ''.join(f'<button type="button" data-filter="{name}" aria-pressed="{'true' if name == 'All' else 'false'}">{name}</button>' for name in ['All', 'Systems', 'Tools', 'Web']) + '</div>'
(dist / 'projects.html').write_text(page('projects', 'Projects', '<p class="eyebrow">Selected work</p><h1>Projects</h1><p class="lead">Tools, applications, and experiments in building software.</p>' + filters + project_list() + '<p class="sr-only" id="filter-status" role="status"></p>'))
for id, title, stack, description, category in projects:
    body = '<a class="back-link" href="projects.html">All projects</a>' + clean(content[id])
    (dist / f'{id}.html').write_text(page(id, title, '<article class="prose">' + body + '</article>', 'projects', description))
for id, title in [('experience','Experience'),('education','Education'),('resume','Résumé'),('contact','Contact')]:
    body = clean(content[id])
    if id == 'experience':
        body = '<p class="eyebrow">Work and contributions</p>' + body
    if id == 'education':
        body = '<p class="eyebrow">Learning</p><h1>Education</h1>' + body.replace('<h1>', '<h2>').replace('</h1>', '</h2>')
    if id == 'contact':
        body = '<p class="eyebrow">Contact</p>' + body + '<p>I’d be happy to talk about my work, software development, or opportunities to collaborate.</p>'
    (dist / f'{id}.html').write_text(page(id, title, '<article class="prose">' + body + '</article>'))
profile = '<h1>Sai Krishna Reddy Pakkir</h1><p class="lead">Software developer working on web applications and systems software.</p><p><a class="button" href="media/resume.pdf" download>Download résumé</a></p>'
for id in ['experience','education']:
    profile += clean(content[id]).replace('<h1>', '<h2>').replace('</h1>', '</h2>')
profile += '<h2>Projects</h2>' + project_list()
(dist / 'profile.html').write_text(page('profile','Quick view',profile,'resume'))
urls = ['', 'projects.html','experience.html','education.html','resume.html','contact.html','profile.html'] + [id+'.html' for id,*_ in projects]
(dist / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + ''.join(f'<url><loc>https://www.pakkir.com/{url}</loc></url>' for url in urls) + '</urlset>')
