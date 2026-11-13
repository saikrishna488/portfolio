# Portfolio v3 implementation status

Implemented:
- Shared app registration and window layout controllers; partial offscreen dragging preserved.
- Session restoration, workspace moves, snap preview, recovery, Dock actions, previewing switcher (Alt+S), Settings and reset.
- Persistent wallpaper, text size, reduced-motion, terminal theme, history and session preferences; additive settings-version migration.
- Quoted terminal arguments, syntax errors, read-only pipes, find/head/tree/grep, per-command help, path opening/completion, history clearing and disabling.
- Project filtering, shareable static project pages with social metadata, existing hash-based window links, Back/Forward handling.
- Expanded existing case-study material without invented benchmarks, engineering notes, linked internship work.
- Print-friendly recruiter view and project pages generated from existing HTML content; lazy project media preserved.
- Parser and window-controller regression tests, asset checker, release and rollback procedure.

Verified in the managed browser:
- Quoted cat/grep pipeline, malformed quote error, failed && chain and subsequent ; command.
- Open project by virtual path, left snap, minimize/reopen, reload restoration.
- Dock context menu, workspace move, saved wallpaper after reload.
- Settings window bounds at 320, 390, 768, 1024 widths and 844×390 landscape.
- Search and Engineering notes launch within 320px viewport.

Outstanding / partial (not represented as complete):
- Original 80-item checklist reconciliation: original full list is unavailable in this conversation.
- Real Meridian and Raw Bluetooth recordings, captions: no authentic recordings supplied; screenshot walkthrough remains clearly labeled.
- Physical iPhone/Android, real keyboard, touch, Safari and screen-reader testing.
- Full performance/Lighthouse audit and production field metrics; local asset-size audit only.
- One structured source that generates both the résumé PDF and all HTML: HTML views share a source; preserved PDF/preview still require coordinated updates.
- Full legacy CSS consolidation is partial; shared controls and duplicate Dock sizing were cleaned up. App icons, command metadata, help examples and shortcuts now share registry.js.
- Domain apex and all external-link verification must be reported separately from deployment status.
