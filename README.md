# johannesl.com

Personal site. Plain HTML and CSS, no JavaScript on the page.

`index.html`, `404.html`, `sitemap.xml` and `robots.txt` are generated from `content.js`. Edit `content.js`, then run:

```sh
node build.mjs
```

Preview with `python3 -m http.server 8000` and open <http://localhost:8000>. Needs Node 18 or newer, no dependencies.

## Notes

- Text supports `[label](url)` links and `*italics*`. Empty fields are hidden.
- Entries with a `url` are numbered and listed under Links.
- An entry with a `publication` block is also added to the structured data as a `ScholarlyArticle`.
- The social card is `assets/og.png` (1200 x 630), made from `tools/og-card.html`.
- Served by GitHub Pages on the custom domain in `CNAME`.

## Layout

```
content.js          content and SEO settings
build.mjs           generator
assets/site.css     styles
assets/fonts/       Source Serif 4, Chivo, Chivo Mono (SIL Open Font License)
assets/img/         images
tools/og-card.html  source of the social card
```

## Credits

- Leiden University logo: [UniversiteitLeidenLogo.svg](https://commons.wikimedia.org/wiki/File:UniversiteitLeidenLogo.svg), Wikimedia Commons, CC BY-SA 3.0. The TU Delft and Leiden logos are trademarks of their universities and are shown only to name where I study.
