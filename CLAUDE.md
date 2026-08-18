# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A single-page personal portfolio site for Hassan Jamal Khan (AI/ML Engineer), built with **plain HTML5, CSS3, and vanilla JavaScript only** — no frameworks, no bundlers, no npm dependencies. It must keep working by simply opening `index.html` in a browser or serving the folder as static files.

## Running / previewing

There is no build step and no `package.json`. To preview locally, serve the folder with any static file server, e.g.:

```bash
python -m http.server 8000
```

then open `http://localhost:8000/`. Opening `index.html` directly via `file://` also works for everything except the resume/video paths, which are relative and behave the same either way.

There is no lint, test, or build command configured for this repo — changes are verified by loading the page in a browser and checking the console.

## Architecture

Three files carry all the logic:

- **`index.html`** — semantic markup for the Navbar, Hero, About/Education, Experience (timeline), and Contact sections is hand-written directly in the HTML. The **Skills, Projects, and Certifications** sections instead contain empty container elements (`#skillsGrid`, `#projectsGrid`, `#certGrid`) that JS populates at runtime. A single hidden `#projectModal` overlay near the end of `<body>` is reused for every project's detail view.
- **`css/styles.css`** — design tokens (colors, spacing, radii, shadows) are defined once as CSS custom properties on `:root` at the top of the file; everything else references them. Sections are organized in the same top-to-bottom order as the page (Navbar → Hero → About → Skills → Timeline → Projects → Certifications → Contact → Footer → Modal → responsive breakpoints at the bottom).
- **`js/main.js`** — an IIFE with no external dependencies. Content for Skills, Projects, and Certifications lives in three data arrays (`SKILLS`, `PROJECTS`, `CERTIFICATIONS`) near the top of the file; the render functions (`renderSkills`, `renderProjects`, `renderCertifications`) turn that data into DOM via template strings. **To add/edit a project, skill category, or certification, edit the corresponding data array — do not hand-edit the grid markup in `index.html`.**

Other behavior in `main.js`:
- Mobile hamburger menu (`initMobileNav`) toggles a full-screen nav panel.
- Active-section nav highlighting and scroll-reveal fade-ins both use `IntersectionObserver` (`initActiveSectionTracking`, `initScrollReveal`) rather than scroll-event polling.
- The project detail modal (`openProjectModal` / `closeProjectModal`) is populated per-click from the `PROJECTS` array, includes a focus trap and Escape-to-close, and restores focus to the triggering element on close.
- "Watch Demo" (`showDemoVideo`) sets `video.src` directly (not a nested `<source>`) so the `error` event reliably fires on the video element for a missing/404 file, showing a "coming soon" fallback message instead of a broken player.

### A CSS gotcha already worked around

`.navbar` intentionally does **not** have `backdrop-filter` directly on it — that property was moved to `.navbar::before`. Putting `backdrop-filter` (or `transform`/`filter`) on `.navbar` itself would make it the containing block for its `position: fixed` descendant (the mobile `#navLinks` panel), clipping the fullscreen mobile menu down to the navbar's own height. Keep the blur on the pseudo-element if you touch this area.

## Content/data model

- Skills are grouped by category in the `SKILLS` array (`js/main.js`), each with an icon key referencing `SKILL_ICON` (inline SVG path strings — no icon font/library).
- Projects are objects in the `PROJECTS` array with `slug`, `title`, `tag`, `icon` (emoji used on the card thumbnail), `summary`, `highlights[]`, `tech[]`, `result`, `github`, and `video` (path under `assets/videos/`). The card grid shows a truncated view (`highlights.slice(0, 3)`); the modal shows the full `highlights` list plus `tech` and `result`.
- Thumbnail gradients for project cards cycle through a fixed palette in `thumbGradient()`, indexed by card position.

## Placeholder assets that need real content

These exist as functional placeholders so the site runs out of the box, but are meant to be swapped:
- `assets/resume/Hassan-Jamal-Khan-Resume.pdf` — a minimal valid placeholder PDF (not a real resume).
- `assets/videos/*.mp4` — referenced by `PROJECTS[].video` but not present; see `assets/videos/README.txt` for the exact expected filenames. Missing files degrade gracefully to a fallback message (see the CSS gotcha section above for why this works reliably).
- `PROJECTS[].github` URLs — point to placeholder repos under `github.com/Hassankhan86/...`.
- `og:image` / `twitter:image` in `index.html` reference `assets/images/og-cover.jpg`, which doesn't exist yet (see `assets/images/README.txt`).
- `assets/images/favicon.svg` — a placeholder gradient "HJ" mark; swap or edit the `<link rel="icon">` href to replace it.
