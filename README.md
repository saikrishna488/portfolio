# Sai Krishna Pakkir · Portfolio

A static sidebar portfolio hosted on ChatGPT Sites at https://www.pakkir.com.

Edit project descriptions in content/portfolio.json and overview/project summaries in scripts/build-content.py. Run python scripts/build-content.py to generate the pages, then python scripts/check-assets.py and node --check dist/portfolio.js.

The interface uses dist/portfolio.css and dist/portfolio.js. Navigation is ordinary HTML links. JavaScript adds the mobile menu, project filtering, and redirects for previously shared desktop hash links.

Hosting uses the existing .openai/hosting.json. GitHub Pages deployment is disabled.
