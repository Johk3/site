# Personal site

A static site: plain HTML and CSS, no JavaScript on the page. `index.html` is generated from `content.js` by a small Node script, so every word is in the HTML that search engines and link previews fetch.

## Editing

1. Change the text in [`content.js`](content.js).
2. Run `node build.mjs`.
3. Commit and push. `index.html`, `404.html`, `sitemap.xml` and `robots.txt` are generated; do not edit them by hand.

Notes for `content.js`:

- Fields left as `""` are hidden (for example `email`, `LinkedIn`, an entry `image`).
- In any text, `[label](https://example.com)` makes a link and `*words*` makes italics. Write `\\*` for a literal asterisk.
- An entry with a `url` is numbered automatically and listed under References.
- Add, remove or reorder sections by editing the `sections` array.
- The `seo` block controls the `<title>`, description, canonical URL, social card and structured data. The build warns if the title or description is too long.

Images go in `assets/img/` and are referenced from `content.js`, for example `assets/img/portrait.jpg`. Put a PDF CV at `assets/cv.pdf` and set the `CV` link to `assets/cv.pdf`.

## Preview locally

```sh
node build.mjs
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Node 18 or newer is enough; there are no dependencies.

## Search and sharing

What the build produces:

- A rendered, semantic page: one `h1`, `h2` per section, `h3` per entry, landmarks and a skip link.
- `<title>`, meta description, canonical URL, `robots` meta, Open Graph and Twitter card tags.
- JSON-LD structured data (`ProfilePage` and `Person`, with `sameAs` links to your profiles).
- `sitemap.xml`, `robots.txt`, a `noindex` 404 page, favicons and a 1200 x 630 social image.
- Fonts and CSS inlined or preloaded so the page paints without a render-blocking request.

Things to do once the site is live:

1. Add the site in [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters), then submit `https://johk3.github.io/sitemap.xml`. If Google gives you an HTML tag token, put it in `seo.googleVerification` and rebuild.
2. Link to the site from your GitHub profile, LinkedIn and CV. Inbound links are the biggest ranking factor for a personal site.
3. If you buy a custom domain, set it in the repository Pages settings, change `seo.siteUrl`, rebuild and push.
4. Regenerate the social image after a name or tagline change: edit `tools/og-card.html`, screenshot it at 1200 x 630 and save as `assets/og.png`.

## Publishing on GitHub Pages

1. Create a repository named `<your-username>.github.io` and push this folder to the `main` branch.
2. In the repository settings, open Pages and choose "Deploy from a branch", branch `main`, folder `/ (root)`.
3. The site appears at `https://<your-username>.github.io/`.

## Layout

```
index.html        generated page
content.js        all of the content and SEO settings
build.mjs         generator
assets/site.css   styles (light and dark)
assets/fonts/     self-hosted web fonts
assets/img/       your images
tools/og-card.html  source of the social preview image
```

## Fonts

Source Serif 4, Chivo and Chivo Mono, served from `assets/fonts/`. All three are licensed under the SIL Open Font License.
