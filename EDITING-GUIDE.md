# Editing Guide — How to Update This Portfolio Yourself

This site is plain HTML/CSS/JS — no build step. Every change below is a direct text edit in one of three files. After editing, just refresh the page in your browser (or re-run `python -m http.server 8000` and reload) to see the result — nothing needs to be compiled.

**The 3 files that matter:**
| File | Controls |
|---|---|
| `js/main.js` | Skills, Projects, Certifications — these are **data arrays** (`SKILLS`, `PROJECTS`, `CERTIFICATIONS`) near the top of the file. Edit the array, the page re-renders automatically. |
| `index.html` | Navbar, Hero, About/Education, **Work Experience timeline**, Contact, Footer — all hand-written markup. To change these, edit the HTML directly. |
| `css/styles.css` | Colors, spacing, fonts — design tokens live under `:root` at the very top of the file. |

---

## 1. Projects (add / update / delete)

Open `js/main.js`, find the `PROJECTS` array (starts around line 103). There are 8 real projects in it now (the old dummy placeholders are gone). Each project is one object:

```js
{
  slug: "your-project-slug",              // unique, no spaces — used for the URL-safe id
  title: "Your Project Title",
  tag: "GenAI",                            // MUST be one of: GenAI, Classification, Regression, CV, Automation
  icon: "bot",                             // MUST be one of the PROJECT_ICON keys: home, face, bot, shield, bank, box, heart, car
  gradient: ["#3b82f6", "#1d4ed8"],        // hex colors — gradient[0] drives the thumbnail glow and the card's hover accent color (gradient[1] currently unused, but keep both for consistency/future use)
  summary: "One-sentence summary shown on the card front.",
  highlights: [
    "Bullet point one — full detail, shown in the modal",
    "Bullet point two",
    "Bullet point three",
  ],
  tech: ["Python", "PyTorch", "..."],      // shown as tags (only first 5 show on the card, all show in the modal)
  result: "One-sentence outcome statement, shown prominently in the modal",
  github: "https://github.com/Hassankhan86/your-repo",

  // Pick AT MOST ONE of these two — whichever is present decides the
  // modal's second button. Omit both for a project with neither yet.
  video: "assets/videos/your-project-slug.mp4",             // -> "Watch Demo" button, opens an inline <video> player
  images: ["assets/images/your-screenshot-1.png", "..."],   // -> "View Screenshots" button, opens a prev/next/dots gallery
},
```

- **To add a project**: copy an existing object, paste it as a new entry in the array, edit every field. Order in the array matters (see "Show More" note below).
- **To update a project**: edit the fields directly on its existing object.
- **To delete a project**: delete its entire `{ ... },` block.
- **The `tag` field must match one of the 5 fixed filter categories** (`PROJECT_FILTERS` a few lines below the array: All, GenAI, Classification, Regression, CV, Automation — note **"Vision" was renamed to "CV"**). If you use a tag outside this list, the card still shows under "All" but won't appear under any specific filter tab. No current project uses "Automation" — that tab exists but shows an empty grid until you tag something with it.
- **The `icon` field is not an emoji** — it's a key into the `PROJECT_ICON` object (a few lines above `SKILLS`), which holds outline SVG icons: `home`, `face`, `bot`, `shield`, `bank`, `box`, `heart`, `car`. Pick whichever reads closest to the project, or add a new key with your own SVG path string if none fit.
- There is **no `metric` field** — the on-card badge (e.g. "R² 0.895") doesn't exist; that stat only surfaces via `result` inside the modal.
- **`video` vs `images` — pick one**: the modal's second action button is driven entirely by which field is present. Set `video` for a screen-recording demo (`.mp4`); set `images` for a gallery of screenshots instead (array of 1+ image paths — 2+ gets prev/next arrows and dot indicators). If a project has neither, the modal just shows the "View on GitHub" button with no second action. Both fields degrade gracefully if the file is missing — a "coming soon"/"Add the file at ..." message shows instead of breaking.
- **Screenshot naming convention already in use**: `assets/images/p<N>-<short-name>-ml-s<index>.png` (e.g. `p3-real-estate-ml-s1.png`, `p7-health-ml-s2.png`) — not enforced by code, just the pattern used for the existing screenshot sets. Follow it or not, your call.
- **Video files**: see `assets/videos/README.txt` for the filenames currently expected. `real-estate-price-prediction.mp4` and `emotion-detection-cnn.mp4` already exist on disk — **but check the "Known issues" section below**, their `video` field is currently commented out in the data so those files aren't actually reachable from the UI right now.

### How the page handles a growing project list
- `INITIAL_VISIBLE_PROJECTS = 6` (near the `PROJECTS` array) controls how many show by default under the "All" filter — the rest sit behind a "Show More Projects (+N)" button. **Put your strongest/most diverse projects first in the array** so they're the 6 shown by default. Right now that means 2 of the 8 real projects are hidden until "Show More" is clicked.
- The category filter bar (`PROJECT_FILTERS`) already exists — you don't need to build anything, just make sure each new project's `tag` matches one of the categories.

---

## 2. Certifications (add / update / delete)

Also in `js/main.js`, find the `CERTIFICATIONS` array (a few lines below `PROJECTS`):

```js
{
  slug: "your-cert-slug",                              // unique, no spaces — used to open the right certificate in the viewer modal
  title: "Course / Certificate Title",
  issuer: "Coursera",                                   // "Coursera", "DeepLearning.AI", "Udemy", or any other issuer name
  certFile: "assets/certificates/your-cert-slug.pdf",   // the actual certificate file — PDF or image
  verifyUrl: "https://...",                             // public verification page on the issuing platform ("View Online" link in the modal)
  // hideLink: true,                                    // optional — omit the "View Certificate" button entirely (e.g. for a cert with no file/link to show)
},
```

- **To add one**: add a new object with the fields above to the array.
- **To update**: edit the fields directly (title, issuer, `verifyUrl`, etc.).
- **To delete**: remove its object from the array.
- **How viewing works**: clicking "View Certificate" on a card opens an in-page modal that renders `certFile` directly — a PDF opens in an embedded viewer (toolbar/zoom/print controls stripped so only the certificate shows), an image (`.png`/`.jpg`) renders as an `<img>`. The modal also has a "View Online" button linking to `verifyUrl`. There's no `courseLink` field — that old two-link design is gone.
- **Certificate files**: drop the real PDF/image at the exact `certFile` path under `assets/certificates/`. If a file is missing, the modal shows a "coming soon" message instead of breaking — but note this check only works when the site is served over `http://` (e.g. `python -m http.server`); opening `index.html` directly via `file://` can't verify the file exists and will just try to render it optimistically.
- **"Course" entries (no certificate file)**: any entry whose `issuer` starts with `"YT-"` or `"YouTube-"` (e.g. `"YouTube-CampusX"`) is treated as a free course/playlist rather than a certificate — its card button reads **"View Course"** and just links straight to `verifyUrl` (no in-page viewer, since there's no cert file to show). For these, `certFile` is set to a non-file placeholder path like `"assets/certificates/"` — that's intentional, it's simply never used for course-type entries. There are 4 of these currently (all `"YouTube-CampusX"` playlists).
- **Issuer logos + accent color**: the `ISSUER_STYLE` object right above `CERTIFICATIONS` maps issuer names to a real logo file **and** a `color` (used for that card's hover glow), e.g. `Coursera: { logo: "assets/logo/coursera_logo.jpg", color: "#3b82f6" }`. Currently mapped: `Coursera`, `DeepLearning.AI`, `Udemy`, `YT-CampusX`, `YouTube-CampusX` (the last one is the one actually in use; `YT-CampusX` is defined but not currently used by any entry — harmless to leave, or delete if you don't plan to use that exact issuer string). A certificate from an issuer not in this map falls back to a plain colored circle with the issuer's first letter and a neutral slate hover color — add a matching `{ logo, color }` entry to `ISSUER_STYLE` if you want a real logo/brand color for a new issuer.
- **`hideLink`**: set `hideLink: true` on an entry to hide its link button entirely (the card still shows title/issuer/logo). Not currently used by any entry.
- **Growing list — "Show More" pattern**: same as Projects. `INITIAL_VISIBLE_CERTS = 6` (near the `CERTIFICATIONS` array) controls how many cards show by default; the rest sit behind a "Show More Certifications (+N)" button (`#certsMore` in `index.html`, already wired up — nothing to build). There are 11 certifications now, so 5 are hidden behind the button by default.
- **Don't forget**: `index.html`'s About section has a hardcoded stat (`.about-stats` → "Certifications") — **it currently says "6+" but there are 11 real entries now.** Update that number to match whenever the count changes.

---

## 3. Skills (add / update / delete)

Also in `js/main.js`, the `SKILLS` array (near the very top, right after `SKILL_ICON`):

```js
{
  title: "Category Name",
  icon: "brain",              // must be a key that exists in SKILL_ICON above it
  color: "#a78bfa",           // hex color used for this category's icon/accent
  items: ["Skill One", "Skill Two", "Skill Three"],
},
```

- **To add a skill to an existing category**: add a string to that category's `items` array.
- **To add a whole new category**: copy an existing object, edit `title`/`color`/`items`, and either reuse an existing `icon` key (`code`, `brain`, `chart`, `sparkles`, `layers`, `database`, `cloud`, `bot`, `bolt`) or add a new SVG path string to the `SKILL_ICON` object above and reference its new key.
- **To delete**: remove the string from `items`, or remove the whole category object.
- **Category order matters** — categories render top-to-bottom in the order they appear in the array, so reordering the array reorders the section on the page.

---

## 4. Work Experience (add / update / delete)

This one is **not** in `js/main.js` — it's hand-written directly in `index.html`, inside `<section id="experience">` → `<ol class="timeline-list">`. Each job is one `<li>` block:

```html
<li class="timeline-item reveal">
  <div class="timeline-dot" aria-hidden="true"></div>
  <div class="timeline-card">
    <div class="timeline-head">
      <h3 class="timeline-role">Job Title</h3>
      <span class="timeline-date">Mon YYYY – Mon YYYY</span>
    </div>
    <p class="timeline-company">Company Name · Remote/On-site</p>
    <ul class="timeline-points">
      <li>Bullet point describing what you did</li>
      <li>Another bullet point</li>
    </ul>
  </div>
</li>
```

- **To add a job**: paste a new `<li class="timeline-item reveal">...</li>` block in the right chronological position (most recent first).
- **To update**: edit the text directly inside the relevant tags.
- **To delete**: remove the entire `<li>...</li>` block.
- Remember to update the `"3" / "Companies"` stat in the About section's `.about-stats` block if you add/remove an employer.
- **Company logos**: unlike the Education cards (which already show a logo via `<img class="edu-logo">`), the timeline items currently do **not** display a company logo — only a plain dot. If you want to add one later, mirror the pattern used in `.edu-institution` in the About section (an `<img>` next to the name) and drop the logo files into `assets/logo/`.
- **Hover accent color**: Education, Skills, Projects, and Certification cards all support an optional `--card-accent` / `--card-glow` hover-glow color (see the Education section below for the exact syntax). Timeline items don't currently use this pattern — it's a `.edu-card`/`.skill-card`/`.project-card`/`.cert-card` treatment only, not applied to `.timeline-card`.

---

## 5. Education

Hand-written in `index.html`, inside `<section id="about">` → `.education-grid`. Each degree is one `.edu-card`:

```html
<div class="edu-card reveal" style="--card-accent:#4f46e5; --card-glow:rgba(79, 70, 229, 0.35)">
  <div class="edu-card-head">
    <div class="edu-institution">
      <img class="edu-logo" src="assets/logo/your-university_logo.jpg" alt="University name logo" loading="lazy" />
      <span class="edu-institution-name">University Name</span>
    </div>
    <div class="edu-year">YYYY – YYYY</div>
  </div>
  <h4 class="edu-degree">Degree Name</h4>
  <p class="edu-school">City, Country</p>
  <p class="edu-extra">CGPA / In Progress / etc.</p>
</div>
```

Add, edit, or delete `.edu-card` blocks the same way as timeline items above. Logo files already in place: `assets/logo/information_technology_university_logo.jpg`, `assets/logo/minhajuniversitylahore_logo.jpg`.

- The inline `style="--card-accent:...; --card-glow:..."` on each card is **optional** — it sets that card's hover border/glow color (pick any hex + its rgba equivalent at ~0.35 alpha). Leave it off and the card just falls back to the site's default neutral accent on hover; nothing breaks either way.

---

## 6. Hero text, tagline, About text, contact info, resume link

All hand-written in `index.html` — just find the text and edit it in place:
- Hero headline/tagline: `<section id="home" class="hero">` — `.hero-headline` and `.hero-tagline`.
- About paragraph: `<section id="about">` — the `.about-text` `<p>`. There's an old version of this paragraph left behind as an HTML comment (`<!-- ... -->`) directly above the current one — it doesn't render, safe to delete if you want to tidy the file, or safe to leave as-is.
- **About stats tiles** (`.about-stats`, just below the About paragraph): 3 tiles now — "Years Experience" (currently "4+"), "Certifications" (currently "6+", see the Known Issues note below), "Companies" (currently "3"). The old "Projects Completed" tile was removed (left commented out, not deleted) — uncomment and update it if you want it back.
- **Typewriter phrases**: the cycling role text (in the Hero name and the navbar logo) isn't in `index.html` — it's in `js/main.js`, at the bottom in `initRoleTypewriter()` and `initNavTypewriter()`. Edit the phrase arrays there (currently `["AI/ML Engineer", "AI Engineer"]` for the hero, plus the name for the navbar version) to change what cycles.
- Contact email/phone/LinkedIn/GitHub: `<section id="contact">` — each is a plain `<a class="contact-link">`; the same links also appear in the Hero and Navbar, so update all occurrences if one changes (search for the old value across the file).
- Resume file: replace `assets/resume/Hassan-Jamal-Khan-Resume.pdf` with your real PDF using that exact filename (or update the `href`/`download` links in both the navbar and hero if you rename it).

---

## 7. Colors / theme

`css/styles.css`, top of file, inside `:root { ... }`. Everything (backgrounds, accent color, borders, shadows, radii) is defined once there as CSS variables — change a value there and it updates everywhere it's used.

---

## 8. Known things to fix / double-check

- **Two real videos are currently orphaned**: `assets/videos/real-estate-price-prediction.mp4` and `assets/videos/emotion-detection-cnn.mp4` already exist on disk, but both projects' `video:` field is commented out in `PROJECTS` (`js/main.js`). Real Estate falls back to its `images` gallery instead; Emotion Detection has no `video` or `images` at all right now, so its modal shows no second button. **Uncomment `video:` on those two entries** (keeping or dropping the `images` line on Real Estate, your call) if you want the videos reachable from the site.
- **Certifications stat is stale**: `.about-stats` in `index.html` shows `"6+" / "Certifications"`, but `CERTIFICATIONS` in `js/main.js` now has 11 real entries. Update the number.
- **Two projects still incomplete**: "Automatic License Plate Detection & Recognition" (`cars-license-plate-detection`) has `github: "#"` (placeholder, goes nowhere) and no video/images. "Shelf Label Detection & Tracking using YOLO" (`rgis-labels-detection-yolo`) has a real GitHub link but no video/images yet (its expected filename `rgis-labels-detection-yolo.mp4` is already listed in `assets/videos/README.txt`, just not added or referenced in the data yet).
- **`og:image` mismatch**: `index.html` references `assets/images/og-cover.jpg` for social-share previews, but the actual file in the repo is `assets/images/og-cover.png`. Either rename the file to `og-cover.jpg`, or update the two `content="assets/images/og-cover.jpg"` lines (`og:image` and `twitter:image`) in the `<head>` to point to `.png`. Right now the social preview image silently fails to load.
- **Accessibility text out of sync with the typewriter**: the hidden `<span class="sr-only">` next to the Hero name still reads "AI/ML Engineer, AI Engineer, and Data Scientist", but the visible typewriter phrase list no longer includes "Data Scientist" (it was removed). Screen-reader users hear a role sighted users never see typed. Update the `sr-only` text in `index.html` to match the current phrase list in `js/main.js`.
- **Missing assets that degrade gracefully** (no urgent fix needed, but good to know): a missing project video, screenshot, or certificate file shows a "coming soon" message instead of breaking; a missing `assets/images/profile.png` falls back to an "HK" initials avatar. So it's safe to publish before every asset is ready. Note the certificate-file check only works when served over `http://` — it can't detect a missing file when opened via `file://`.
- **Deploying this site**: see `DEPLOYMENT.md` at the repo root for the actual GitHub Pages push/publish steps (current remote, branch state, and custom-domain notes) — this guide only covers editing content, not deployment.
