# Hammer Construction Scotland website

A fast, static website for Hammer Construction Scotland with a **file-based CMS**. No database: all content lives in JSON files in this repository.

- **Site:** [Astro](https://astro.build) static site → plain HTML/CSS in `dist/`
- **Content:** JSON files in `src/content/`
- **CMS:** [Sveltia CMS](https://github.com/sveltia/sveltia-cms) at `/admin`. It edits those JSON files and commits them to GitHub
- **Hosting:** Firebase Hosting, deployed by GitHub Actions on every push to `main`

```
Edit in /admin ──commit──▶ GitHub (main) ──Action──▶ npm run build ──▶ Firebase Hosting
```

## Project layout

```
src/content/
  settings/site.json        Company name, phone, email, address, areas, menu, form endpoint
  pages/home.json           Home page sections (hero, stats, about, process…)
  pages/about.json          About page
  pages/contact.json        Contact page + contact block shown on every page
  services/*.json           One file per service  → /services/<file-name>
  projects/*.json           One file per project  → /projects/<file-name>
  testimonials/*.json       One file per review
public/
  admin/                    CMS (index.html + config.yml content model)
  images/                   Logo
  uploads/                  Images uploaded through the CMS
src/components, src/layouts, src/pages, src/styles   Site templates
```

Text formatting in content:
- Headlines: wrap a word in `*asterisks*` to give it the orange highlight, and use a new line for a line break.
- Long fields (service details, project write-ups, about story) are Markdown.

## Run locally

Requires Node 20 (`nvm use`).

```bash
npm install
```

```bash
npm run dev
```

Site: http://localhost:4321. CMS: http://localhost:4321/admin/index.html (the dev server needs the full path; the live site also works at `/admin/`)

### Editing content locally (no GitHub login)

Open http://localhost:4321/admin/index.html in Chrome or Edge and choose **Work with Local Repository**, then select this project folder. Changes are written straight to the JSON files and the dev server reloads. Commit and push them yourself.

## One-time setup

### 1. Firebase

1. Create a project in the [Firebase console](https://console.firebase.google.com) and enable Hosting.
2. Put the project ID in `.firebaserc` (it currently says `hammer-construction-scotland`).
3. Update `siteUrl` in `src/content/settings/site.json` and `site_url` / `display_url` in `public/admin/config.yml` once you know the final domain.

Manual deploy from your machine:

```bash
firebase login
```

```bash
npm run deploy
```

### 2. Automatic deploys (GitHub Actions)

1. Firebase console → Project settings → Service accounts → **Generate new private key**.
   (Or run `firebase init hosting:github`, which creates the secret for you.)
2. GitHub repo → Settings → Secrets and variables → Actions → add a secret named `FIREBASE_SERVICE_ACCOUNT` with the whole JSON key as its value.
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and deploys. Pull requests get a 7-day preview URL.

### 3. CMS login on the live site

The CMS stores content in GitHub, so editors need write access to the repository.

- **Easiest:** at `/admin`, choose **Sign in with Token** and paste a GitHub [fine-grained personal access token](https://github.com/settings/personal-access-tokens/new) scoped to this repository with **Contents: Read and write**.
- **Optional "Sign in with GitHub" button:** deploy the free [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) Cloudflare Worker, then add `base_url: https://<your-worker>.workers.dev` under `backend` in `public/admin/config.yml`.

Each save in the CMS makes a commit, and the site is live about a minute later.

### 4. Contact form

There's no database, so enquiries are handled by one of these:
- **Recommended:** create a free form at [Formspree](https://formspree.io) (or similar) and paste its URL into **Site settings → Contact form endpoint** in the CMS. Submissions are emailed to you.
- **If left blank:** the form opens the visitor's email app with the enquiry pre-filled, addressed to the site email.

## Before launch: replace placeholder content

These are placeholders and must be checked or replaced in the CMS:
- [ ] Phone number and email (Site settings)
- [ ] Stats bar figures: 150+ projects, 10yr guarantee, etc. (Home page → Stats bar)
- [ ] "Fully insured & vetted" and other claims in the tick list
- [ ] Projects: currently samples using stock photos. Replace with real jobs and photos
- [ ] Testimonials: currently sample reviews. Replace with real customer reviews
- [ ] Hero and service images: stock photos from Unsplash. Real photos of your work are better
- [ ] Opening hours, social links
