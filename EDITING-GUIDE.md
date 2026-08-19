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

Open `js/main.js`, find the `PROJECTS` array (starts around line 90). Each project is one object:

```js
{
  slug: "your-project-slug",              // unique, no spaces — used for the URL-safe id and video filename
  title: "Your Project Title",
  tag: "GenAI",                            // MUST be one of: GenAI, Classification, Regression, Vision, Automation
  icon: "bot",                             // MUST be one of the PROJECT_ICON keys: home, face, bot, shield, bank, box
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
  video: "assets/videos/your-project-slug.mp4",
},
```

- **To add a project**: copy an existing object, paste it as a new entry in the array, edit every field. Order in the array matters (see "Show More" note below).
- **To update a project**: edit the fields directly on its existing object.
- **To delete a project**: delete its entire `{ ... },` block.
- **The `tag` field must match one of the 5 fixed filter categories** (`PROJECT_FILTERS` a few lines below the array: All, GenAI, Classification, Regression, Vision, Automation). If you use a tag outside this list, the card still shows under "All" but won't appear under any specific filter tab. If you need a new category, add it to `PROJECT_FILTERS` too.
- **The `icon` field is not an emoji anymore** — it's a key into the `PROJECT_ICON` object (a few lines above `SKILLS`), which holds outline SVG icons (`home`, `face`, `bot`, `shield`, `bank`, `box`). Pick whichever reads closest to the project, or add a new key with your own SVG path string if none fit.
- There is **no more `metric` field** — the on-card badge (e.g. "R² 0.895") was removed; that stat now only surfaces via `result` inside the modal. Don't add a `metric` key, it won't render anywhere.
- **Video files**: drop the actual `.mp4` at the path you set in `video`. If the file isn't there yet, the "Watch Demo" button shows a friendly "coming soon" message instead of breaking — so you can add a project before its video is ready. See `assets/videos/README.txt` for the filenames currently expected. `real-estate-price-prediction.mp4` and `emotion-detection-cnn.mp4` are already in place; the other three (`multi-agent-career-assistant`, `network-security-prediction`, `bank-loan-default-prediction`) still show the fallback message until added.

### You have 10+ projects — how the page handles that
- `INITIAL_VISIBLE_PROJECTS = 6` (near the `PROJECTS` array) controls how many show by default under the "All" filter — the rest sit behind a "Show More Projects (+N)" button. **Put your strongest/most diverse projects first in the array** so they're the 6 shown by default.
- There are **3 dummy placeholder projects** at the bottom of the array (`placeholder-project-one/two/three`) left in specifically to demo the Show More button and the Automation filter tab. **Delete these three once you have real projects to fill their place** — they're clearly marked with a `// --- Dummy placeholders below` comment right above them.
- The category filter bar (`PROJECT_FILTERS`) already exists — you don't need to build anything, just make sure each new project's `tag` matches one of the 5 categories.

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
- **How viewing works now**: clicking "View Certificate" on a card opens an in-page modal that renders `certFile` directly — a PDF opens in an embedded viewer (toolbar/zoom/print controls stripped so only the certificate shows), an image (`.png`/`.jpg`) renders as an `<img>`. The modal also has a "View Online" button linking to `verifyUrl`. This replaced the old two-link (`courseLink`/`certLink`) design — there's no `courseLink` field anymore.
- **Certificate files**: drop the real PDF/image at the exact `certFile` path under `assets/certificates/`. All 7 current certificates already have real files in place. If a file is missing, the modal shows a "coming soon" message instead of breaking (same graceful-fallback pattern as project videos) — but note this check only works when the site is served over `http://` (e.g. `python -m http.server`); opening `index.html` directly via `file://` can't verify the file exists and will just try to render it optimistically.
- **Issuer logos + accent color**: the `ISSUER_STYLE` object right above `CERTIFICATIONS` maps `Coursera`, `DeepLearning.AI`, and `Udemy` to a real logo file **and** a `color` (used for that card's hover glow), e.g. `Coursera: { logo: "assets/logo/coursera_logo.jpg", color: "#3b82f6" }`. Any certificate whose `issuer` matches one of those three automatically gets the real logo badge and that hover color. A certificate from a different issuer (e.g. "edX") falls back to a plain colored circle with the issuer's first letter and a neutral slate hover color — if you want a real logo/brand color for a new issuer, add its file to `assets/logo/` and add a matching `{ logo, color }` entry to `ISSUER_STYLE`.
- **`hideLink`**: set `hideLink: true` on an entry to hide its "View Certificate" button entirely (the card still shows title/issuer/logo). Not currently used by any entry, but it's there if you add a certificate you don't want to link out for (e.g. one you can only point to a video, not a file).
- **Don't forget**: `index.html`'s About section has a hardcoded stat `"5" / "Certifications"` in `.about-stats` — **this is now out of date**, there are 7 real certifications in the array. Update that number to match. Same applies to `"5" / "Projects Completed"` if your visible project count changes materially.

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
- About paragraph: `<section id="about">` — the `.about-text` `<p>`.
- Contact email/phone/LinkedIn/GitHub: `<section id="contact">` — each is a plain `<a class="contact-link">`; the same links also appear in the Hero and Navbar, so update all occurrences if one changes (search for the old value across the file).
- Resume file: replace `assets/resume/Hassan-Jamal-Khan-Resume.pdf` with your real PDF using that exact filename (or update the `href`/`download` links in both the navbar and hero if you rename it).

---

## 7. Colors / theme

`css/styles.css`, top of file, inside `:root { ... }`. Everything (backgrounds, accent color, borders, shadows, radii) is defined once there as CSS variables — change a value there and it updates everywhere it's used.

---

## 8. Known things to fix / double-check

- **`og:image` mismatch**: `index.html` references `assets/images/og-cover.jpg` for social-share previews, but the actual file in the repo is `assets/images/og-cover.png`. Either rename the file to `og-cover.jpg`, or update the two `content="assets/images/og-cover.jpg"` lines (`og:image` and `twitter:image`) in the `<head>` to point to `.png`. Right now the social preview image silently fails to load.
- **Certifications stat is stale**: `.about-stats` in `index.html` still shows `"5" / "Certifications"`, but `CERTIFICATIONS` in `js/main.js` now has 7 real entries. Update the number.
- **Placeholder GitHub links**: any project still using `github: "#"` (the 3 dummy placeholders) won't go anywhere — replace with real repo URLs or delete the project.
- **Missing assets that degrade gracefully** (no urgent fix needed, but good to know): a missing project video or certificate file shows a "coming soon" message instead of breaking; a missing `assets/images/profile.png` falls back to an "HK" initials avatar. So it's safe to publish before every asset is ready. Note the certificate-file check only works when served over `http://` — it can't detect a missing file when opened via `file://`.
