# Internship Tracker

A lightweight internship tracking app for keeping every opportunity in one color-coded board.

## Features

- Track internships by status: `need to apply`, `applied`, `interviewing`, and `rejected`
- Add new opportunities with company, role, location, domain, and notes
- Change status inline from each internship card
- Remove internships you no longer want on the board
- Automatically fetch company logos from the internet using the company domain
- Save everything locally in the browser with `localStorage`

## Run Locally

Because this is a static app, you can open `index.html` directly in a browser.

If you prefer serving it locally:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

This repo includes a GitHub Actions workflow that deploys the app to GitHub Pages whenever changes are pushed to `main`.

After the workflow runs, enable GitHub Pages in the repository settings if it is not already enabled:

1. Open the repository settings on GitHub.
2. Go to `Pages`.
3. Ensure the source is set to `GitHub Actions`.

The live site URL should be:

`https://aditano.github.io/Internship-Tracker/`

## Notes

- Logo loading works best when the company domain is correct.
- If a logo is unavailable, the app falls back to a favicon and then to a letter badge.
