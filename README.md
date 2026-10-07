# Internship Tracker

Internship Tracker is a browser app for keeping internship applications on one color-coded board. Add each opportunity, move it through the pipeline, and keep the board in this browser with local storage.

## Live site

The app is published on GitHub Pages:

https://aditano.github.io/Internship-Tracker/

Pushes to `main` run [Deploy GitHub Pages](.github/workflows/deploy-pages.yml). That workflow publishes the repository root.

## Features

- Track each internship as **Need to apply**, **Applied**, **Interviewing**, or **Rejected**.
- Color-code those statuses on the summary strip and on each card.
- Add company, role, location, website or domain, status, and notes.
- Guess a `.com` domain from the company name when no website is entered.
- Change status on a card, or remove an internship from the board.
- Show counts for total opportunities, roles still in play, and current interviews.
- Load three sample internships when the board is empty.
- Load a company logo from Clearbit, then a Google favicon, then a letter badge.
- Save the board in `localStorage` under `internship-tracker-board`.

## Run locally

This is a static site. There is no install step and no build.

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

The board stays in that browser. Clearing site data removes it.

## Tech stack

- HTML, CSS, and vanilla JavaScript
- [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) from Google Fonts
- Browser `localStorage`
- GitHub Actions and GitHub Pages for deployment
