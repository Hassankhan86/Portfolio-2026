# Deploying to GitHub Pages (Free Hosting)

This is a static HTML/CSS/JS site with no build step, which GitHub Pages hosts for free as-is.

**Current repo state (as of writing):**
- Remote `origin` → `https://github.com/Hassankhan86/Portfolio-2026.git`
- `master` on GitHub only has the original placeholder-content commit.
- All the real content (profile photo, resume, certificates, project videos, updated CSS/JS) lives on local branch `v4`, not yet pushed.
- `index.html` uses only relative asset paths (no root-absolute `/...` paths), so the site will work correctly under a GitHub Pages project subpath like `/Portfolio-2026/` with no code changes needed.

## Step 1 — Push your work to GitHub

`v4` only exists locally right now. Pick whichever fits your timeline:

**Option A — Preview immediately from `v4` (no merge yet):**
```bash
git push -u origin v4
```

**Option B — Merge into `master` now instead of later:**
```bash
git checkout master
git merge v4
git push origin master
```

If you plan to merge into `master` yourself later, Option A gets the site live today — you can switch the Pages source branch (Step 2) to `master` whenever you do the merge, no other changes needed.

## Step 2 — Enable GitHub Pages

1. Go to `https://github.com/Hassankhan86/Portfolio-2026` in a browser.
2. Click **Settings** (top tab bar of the repo, not your account settings).
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Under **Branch**, pick the branch to publish from:
   - `v4` / `/ (root)` if you pushed Option A, **or**
   - `master` / `/ (root)` once you've merged.
6. Click **Save**.

## Step 3 — Wait for the build and get your URL

- GitHub takes ~30–90 seconds to build and publish the first time.
- Refresh the **Settings → Pages** screen — a green banner will show your live URL:
  `https://hassankhan86.github.io/Portfolio-2026/`
- You can also check progress under the repo's **Actions** tab (GitHub Pages runs as a workflow).

## Step 4 — Verify the deployed site

Open the URL and check:
- The page loads with styling and layout intact (confirms relative CSS/JS paths resolved under the `/Portfolio-2026/` subpath).
- Skills, Projects, and Certifications grids render (confirms `js/main.js` loaded).
- Resume link and project "Watch Demo" videos work (or show the graceful fallback if a video file's name doesn't match what `PROJECTS[].video` expects — cross-check against `assets/videos/README.txt`).
- Open browser DevTools console and confirm no 404s for assets like `og-cover.jpg` (currently a known-missing placeholder per `assets/images/README.txt` — cosmetic only, doesn't break the page).

## Step 5 — Whenever you merge `v4` into `master` later

```bash
git checkout master
git merge v4
git push origin master
```

Then, if Pages was set to deploy from `v4`, go back to **Settings → Pages → Branch** and switch it to `master`. GitHub will rebuild automatically within about a minute. From then on, every future `git push origin master` auto-redeploys the live site — no extra steps.

## Optional — Custom domain

If you later want a custom domain (e.g. `hassankhan.dev`) instead of the `github.io` URL:
1. Add a `CNAME` file at the repo root containing just your domain name, **or** enter it in Settings → Pages → Custom domain (GitHub creates the file for you).
2. At your domain registrar, add a `CNAME` record pointing the subdomain (e.g. `www`) at `hassankhan86.github.io`, or `A` records for an apex domain pointing at GitHub's Pages IPs (documented in GitHub's own Pages custom-domain docs).
3. Wait for DNS propagation, then re-check Settings → Pages for a "DNS check successful" confirmation and enable **Enforce HTTPS**.
