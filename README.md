# Personal site

A static site made of plain HTML, CSS and JavaScript. No build step.

## Editing

All the text lives in [`content.js`](content.js). Change it, save, refresh the page.

- Fields left as `""` are hidden (for example `email`, `LinkedIn`, an entry `image`).
- In any text, `[label](https://example.com)` makes a link and `*words*` makes italics (write `\\*` for a literal asterisk).
- An entry with a `url` is numbered automatically and listed under References.
- Add, remove or reorder sections by editing the `sections` array.

Two things live in [`index.html`](index.html) because search engines and link previews read them before any script runs: the `<title>` and the `description` / `og:` meta tags. Update those if your name or tagline changes.

Images go in `assets/img/` and are referenced from `content.js`, for example `assets/img/portrait.jpg`. Put a PDF CV at `assets/cv.pdf` and set the `CV` link to `assets/cv.pdf`.

## Preview locally

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Publishing on GitHub Pages

1. Create a repository named `<your-username>.github.io` and push this folder to the `main` branch.
2. In the repository settings, open Pages and choose "Deploy from a branch", branch `main`, folder `/ (root)`.
3. The site appears at `https://<your-username>.github.io/`.

## Layout

```
index.html        page shell
content.js        all of the content
assets/site.css   styles (light and dark)
assets/render.js  builds the page from content.js
assets/fonts/     self-hosted web fonts
assets/img/       your images
```

## Fonts

Source Serif 4, Chivo and Chivo Mono, served from `assets/fonts/`. All three are licensed under the SIL Open Font License.
