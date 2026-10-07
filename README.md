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

## License

Copyright (C) 2026 Anthony DiTano.

Internship Tracker is free software. You can redistribute it and modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. The full text is in [LICENSE](LICENSE).

These third-party pieces keep their own licenses:

- [Space Grotesk](https://github.com/floriankarsten/space-grotesk) is loaded from Google Fonts under the [SIL Open Font License 1.1](https://scripts.sil.org/OFL). Copyright 2020 The Space Grotesk Project Authors.
- [Instrument Serif](https://github.com/Instrument/instrument-serif) is loaded from Google Fonts under the SIL Open Font License 1.1. Copyright 2022 The Instrument Serif Project Authors.
- Company logos are fetched at runtime from Clearbit and Google. Those marks stay with their owners.
