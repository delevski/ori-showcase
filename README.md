# Ori Showcase

A polished single-page portfolio for Ori Delevski that highlights selected public GitHub repositories with an animated glass/gradient UI, searchable featured cards, and a full public repo cloud.

## What’s inside

- Hero section with a short positioning statement
- About panel with focus areas and working style
- Filterable featured repository cards
- Search across repo name, description, language, and category
- Full cloud of all public repositories
- Responsive layout with motion and glassmorphism styling
- Playwright end-to-end tests
- GitHub Actions CI

## Tech stack

- Vanilla JavaScript
- HTML + CSS
- Playwright
- GitHub Actions

## Quick start

```bash
npm install
npm test
npm run serve
```

Then open the local server at:

```bash
http://localhost:4173
```

## Project structure

- `index.html` — app shell and metadata
- `app.js` — rendering, filtering, and data loading
- `styles.css` — the full visual system
- `data/profile.json` — profile content
- `data/repos.json` — featured/all repo data
- `tests/home.spec.js` — Playwright smoke and interaction tests

## Data source

The app loads a local snapshot of public GitHub repository metadata from `data/profile.json` and `data/repos.json`.

If those files are unavailable, the app falls back to a built-in snapshot so the showcase still renders offline.

## Testing

Run the browser tests with:

```bash
npm test
```

## Notes

- The project is static and can be hosted anywhere that serves HTML, CSS, and JavaScript.
- The UI is optimized for a clean, high-signal personal showcase rather than a generic template.
