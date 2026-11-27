# Portfolio release checks

- Generate HTML with python scripts/build-content.py.
- Run python scripts/check-assets.py, node --check dist/portfolio.js, and git diff --check.
- Check sidebar links, project filters, downloads, direct page refresh, and old project hash links.
- Check mobile widths, menu open/close, Escape, readable content, and horizontal overflow.
- Preserve the existing Sites project, audience, and domain.
- Package the pushed source, save a Sites version, and publish it.
- Restore a prior saved Sites version if rollback is needed.
