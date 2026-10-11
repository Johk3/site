#!/usr/bin/env node
// Builds the static site from content.js. No dependencies.
//
//   node build.mjs
//
// Writes index.html (fully rendered, no JavaScript needed), 404.html,
// sitemap.xml and robots.txt. Commit the results.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const read = (p) => readFileSync(join(root, p), 'utf8');
const write = (p, s) => writeFileSync(join(root, p), s);

// ---- load content -------------------------------------------------------
const sandbox = { window: {} };
runInNewContext(read('content.js'), sandbox, { filename: 'content.js' });
const S = sandbox.window.SITE;
if (!S) throw new Error('content.js did not define window.SITE');
const L = S.labels || {};
const SEO = S.seo || {};

// ---- helpers ------------------------------------------------------------
const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const isHttp = (u) => /^https?:\/\//.test(u);

// [label](url) and *italic*; a backslash-escaped asterisk is literal.
function inline(text) {
  const t = String(text ?? '').replace(/\\\*/g, '\u0001');
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*([^*]+)\*/g;
  let out = '', last = 0, m;
  while ((m = re.exec(t))) {
    out += esc(t.slice(last, m.index));
    if (m[1]) out += `<a href="${esc(m[2])}"${isHttp(m[2]) ? ' rel="noopener"' : ''}>${esc(m[1])}</a>`;
    else out += `<em>${esc(m[3])}</em>`;
    last = re.lastIndex;
  }
  out += esc(t.slice(last));
  return out.replace(/\u0001/g, '*');
}
const plain = (text) => String(text ?? '')
  .replace(/\\\*/g, '\u0001').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*([^*]+)\*/g, '$1').replace(/\u0001/g, '*');

function clip(s, n) {
  if (s.length <= n) return s;
  const cut = s.slice(0, n - 1);
  const stop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('; '));
  if (stop > n * 0.5) return cut.slice(0, stop + 1);
  return cut.slice(0, cut.lastIndexOf(' ')) + '…';
}

// ---- site-level values --------------------------------------------------
const siteUrl = (SEO.siteUrl || '').replace(/\/?$/, '/');
if (!siteUrl || siteUrl === '/') console.warn('warning: seo.siteUrl is empty, canonical and sitemap need it');
const abs = (p) => (p ? (isHttp(p) ? p : siteUrl + p.replace(/^\//, '')) : '');

const pageTitle = SEO.title || `${S.name} | ${S.subtitle}`;
const description = SEO.description || clip(plain((S.abstract || [])[0] || S.subtitle || ''), 155);
const ogImage = abs(SEO.ogImage);
const ogAlt = `${S.name}, ${S.subtitle || ''}`;
const today = new Date().toISOString().slice(0, 10);

if (pageTitle.length > 60) console.warn(`warning: title is ${pageTitle.length} characters, search results cut it near 60`);
if (description.length > 160) console.warn(`warning: description is ${description.length} characters, search results cut it near 155`);
if (!S.email && !(S.links || []).some((l) => l && l.url)) console.warn('warning: no contact method set');

// ---- body ---------------------------------------------------------------
const refs = [];
const nav = [];
let n = 0;

// Small logo beside an entry heading, with an optional dark-mode variant
function logoHtml(l) {
  const img = `<picture>${l.srcDark ? `<source srcset="${esc(l.srcDark)}" media="(prefers-color-scheme: dark)">` : ''}` +
    `<img src="${esc(l.src)}" alt="${esc(l.alt || '')}" width="${l.width}" height="${l.height}"${l.displayHeight ? ` style="height:${l.displayHeight}px"` : ''}></picture>`;
  return l.url ? `<a class="entry-logo" href="${esc(l.url)}" rel="noopener">${img}</a>` : `<span class="entry-logo">${img}</span>`;
}

const sections = (S.sections || []).map((sec) => {
  n += 1;
  const id = slug(sec.title);
  nav.push([id, sec.title]);
  let h = `<section id="${id}">\n<h2>${n}. ${esc(sec.title)}</h2>\n`;

  (sec.text || []).forEach((p) => { h += `<p>${inline(p)}</p>\n`; });

  (sec.entries || []).forEach((e) => {
    let cite = '';
    if (e.url) {
      refs.push(e);
      cite = ` <a class="cite" href="#ref-${refs.length}" aria-label="Reference ${refs.length}">[${refs.length}]</a>`;
    }
    h += `<article>\n${e.logo && e.logo.src ? logoHtml(e.logo) : ''}<h3>${inline(e.title)}${cite}</h3>\n`;
    const meta = [e.meta, e.place].filter(Boolean).join(', ');
    if (meta) h += `<p class="meta">${esc(meta)}</p>\n`;
    if (e.text) h += `<p>${inline(e.text)}</p>\n`;
    if (e.bullets && e.bullets.length) h += `<ul>${e.bullets.map((b) => `<li>${inline(b)}</li>`).join('')}</ul>\n`;
    if (e.diagram) {
      // Inline SVG so it picks up the page fonts and colour scheme
      h += `<figure class="diagram">${read(e.diagram).trim()}` +
           (e.caption ? `<figcaption>${esc(e.caption)}</figcaption>` : '') + `</figure>\n`;
    }
    if (e.image) {
      h += `<figure><img src="${esc(e.image)}" alt="${esc(e.imageAlt || '')}"${e.imageSize ? ` width="${e.imageSize[0]}" height="${e.imageSize[1]}"` : ''} loading="lazy" decoding="async">` +
           (e.caption ? `<figcaption>${esc(e.caption)}</figcaption>` : '') + `</figure>\n`;
    }
    h += `</article>\n`;
  });

  if (sec.table && sec.table.length) {
    h += `<table><tbody>${sec.table.map((r) => `<tr><th scope="row">${esc(r[0])}</th><td>${inline(r[1])}</td></tr>`).join('')}</tbody></table>\n`;
  }
  if (sec.bullets && sec.bullets.length) h += `<ul>${sec.bullets.map((b) => `<li>${inline(b)}</li>`).join('')}</ul>\n`;
  return h + `</section>\n`;
}).join('');

let refsHtml = '';
if (refs.length) {
  nav.push(['references', L.references || 'References']);
  refsHtml = `<section class="refs" id="references">\n<h2>${esc(L.references || 'References')}</h2>\n<ol>\n` +
    refs.map((e, i) =>
      `<li id="ref-${i + 1}"><span class="n">[${i + 1}]</span><span>${esc(S.name)}. ${esc(plain(e.title))}. ${esc(e.refLabel || L.sourceCode || 'Source code')}: ` +
      `<a href="${esc(e.url)}" rel="noopener">${esc(e.url.replace(/^https?:\/\//, ''))}</a>.` +
      (e.links || []).filter((l) => l && l.url).map((l) => ` ${esc(l.label)}: <a href="${esc(l.url)}" rel="noopener">${esc(l.url.replace(/^https?:\/\//, ''))}</a>.`).join('') +
      `</span></li>`).join('\n') +
    `\n</ol>\n</section>\n`;
}

const profileLinks = (S.links || []).filter((l) => l && l.url);
let actions = '';
let first = true;
const btn = (label, href, rel) => {
  const a = `<a class="btn${first ? ' primary' : ''}" href="${esc(href)}"${rel ? ` rel="${rel}"` : ''}>${esc(label)}</a>`;
  first = false; return a;
};
if (S.email) actions += btn(L.getInTouch || 'Get in touch', `mailto:${S.email}`);
profileLinks.forEach((l) => { actions += btn(l.label, l.url, isHttp(l.url) ? 'me noopener' : ''); });

const abstractHtml = (S.abstract || []).map((p) => `<p>${inline(p)}</p>`).join('\n') +
  (S.keywords && S.keywords.length ? `\n<p class="keys">${esc(S.keywordsLabel || 'Keywords')}: ${esc(S.keywords.join(', '))}</p>` : '') +
  (actions ? `\n<div class="actions">${actions}</div>` : '');

// ---- structured data ----------------------------------------------------
const orgs = (list) => (list || []).map((o) => ({ '@type': 'Organization', name: o.name, ...(o.url ? { url: o.url } : {}) }));
const person = {
  '@type': 'Person',
  '@id': siteUrl + '#person',
  name: S.name,
  ...(SEO.alternateNames && SEO.alternateNames.length ? { alternateName: SEO.alternateNames } : {}),
  url: siteUrl,
  description,
  ...(SEO.jobTitle ? { jobTitle: SEO.jobTitle } : {}),
  ...(S.portrait ? { image: abs(S.portrait) } : {}),
  ...(S.keywords && S.keywords.length ? { knowsAbout: S.keywords } : {}),
  ...(SEO.affiliation && SEO.affiliation.length ? { affiliation: orgs(SEO.affiliation) } : {}),
  ...(SEO.alumniOf && SEO.alumniOf.length ? { alumniOf: orgs(SEO.alumniOf).map((o) => ({ ...o, '@type': 'CollegeOrUniversity' })) } : {}),
  ...(profileLinks.some((l) => isHttp(l.url)) ? { sameAs: profileLinks.filter((l) => isHttp(l.url)).map((l) => l.url) } : {})
};
const articles = (S.sections || []).flatMap((sec) => sec.entries || []).filter((e) => e.publication).map((e) => ({
  '@type': 'ScholarlyArticle',
  name: plain(e.title).replace(/\s*\([^)]*\)$/, ''),
  ...(e.text ? { abstract: plain(e.text) } : {}),
  author: [{ '@id': siteUrl + '#person' }, ...(e.publication.coAuthors || []).map((name) => ({ '@type': 'Person', name }))],
  ...(e.publication.publisher ? { publisher: { '@type': 'Organization', name: e.publication.publisher } } : {}),
  ...(e.publication.event ? { isPartOf: { '@type': 'Book', name: e.publication.event + ' proceedings' } } : {}),
  ...(e.publication.date ? { datePublished: e.publication.date } : {}),
  url: ((e.links || []).find((l) => l && l.url) || e).url,
  ...(e.url ? { isBasedOn: e.url } : {})
}));
const jsonld = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': siteUrl + '#page',
      url: siteUrl,
      name: pageTitle,
      inLanguage: SEO.locale || 'en',
      dateModified: today,
      mainEntity: { '@id': siteUrl + '#person' }
    },
    person,
    ...articles
  ]
};

// ---- assets inlined into the page --------------------------------------
const fontsCss = read('assets/fonts/fonts.css').replace(/url\('([^']+)'\)/g, "url('assets/fonts/$1')");
const siteCss = read('assets/site.css');
const css = (fontsCss + siteCss).replace(/\n\s*/g, '\n').replace(/\/\*[\s\S]*?\*\//g, '');

const head = (extra = '') => `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="favicon.ico" sizes="48x48">
<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">${extra}`;

const html = `<!doctype html>
<html lang="${esc(SEO.locale || 'en')}">
<head>
${head(`
<title>${esc(pageTitle)}</title>
<meta name="description" content="${esc(description)}">
<meta name="author" content="${esc(S.name)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${esc(siteUrl)}">
${SEO.googleVerification ? `<meta name="google-site-verification" content="${esc(SEO.googleVerification)}">\n` : ''}<meta property="og:type" content="profile">
<meta property="og:site_name" content="${esc(S.name)}">
<meta property="og:title" content="${esc(pageTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(siteUrl)}">
<meta property="og:locale" content="${esc((SEO.locale || 'en') === 'en' ? 'en_GB' : SEO.locale)}">
${ogImage ? `<meta property="og:image" content="${esc(ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:type" content="image/png">
<meta property="og:image:alt" content="${esc(ogAlt)}">
` : ''}<meta property="profile:first_name" content="${esc(S.name.split(' ')[0])}">
<meta property="profile:last_name" content="${esc(S.name.split(' ').slice(1).join(' '))}">
<meta name="twitter:card" content="${ogImage ? 'summary_large_image' : 'summary'}">
<meta name="twitter:title" content="${esc(pageTitle)}">
<meta name="twitter:description" content="${esc(description)}">
${ogImage ? `<meta name="twitter:image" content="${esc(ogImage)}">\n<meta name="twitter:image:alt" content="${esc(ogAlt)}">\n` : ''}<link rel="preload" href="assets/fonts/source-serif-4.woff2" as="font" type="font/woff2" crossorigin>
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
<style>${css}</style>`)}
</head>
<body>
<a class="skip" href="#main">${esc(L.skip || 'Skip to content')}</a>
<div class="paper">
<header class="top">
<div class="nav"><a href="#top">${esc(S.name)}</a>
<nav aria-label="Sections"><ul>${nav.map(([id, t]) => `<li><a href="#${id}">${esc(t)}</a></li>`).join('')}</ul></nav></div>
<div class="title" id="top">
<h1>${esc(S.name)}</h1>
${S.subtitle ? `<p class="subtitle">${esc(S.subtitle)}</p>` : ''}
${S.affiliation ? `<p class="affiliation">${esc(S.affiliation)}</p>` : ''}
${S.portrait ? `<img class="portrait" src="${esc(S.portrait)}" alt="${esc(S.portraitAlt || '')}" width="168" height="168" fetchpriority="high">` : ''}
<div class="abstract">
${abstractHtml}
</div>
</div>
</header>
<main id="main">
<div class="cols">
${sections}</div>
${refsHtml}</main>
<footer class="foot">&copy; ${new Date().getFullYear()} ${esc(S.footer || S.name)}</footer>
</div>
</body>
</html>
`;

write('index.html', html);

// ---- 404, sitemap, robots ----------------------------------------------
write('404.html', `<!doctype html>
<html lang="${esc(SEO.locale || 'en')}">
<head>
${head(`
<title>Page not found | ${esc(S.name)}</title>
<meta name="robots" content="noindex">
<base href="${esc(siteUrl)}">
<style>${css}</style>`)}
</head>
<body>
<div class="paper">
<main class="title" id="main">
<h1>Page not found</h1>
<p class="subtitle">There is nothing at this address.</p>
<div class="abstract"><p><a href="${esc(siteUrl)}">Go to the home page</a></p></div>
</main>
</div>
</body>
</html>
`);

// Old addresses on this domain that should land on the home page
(SEO.redirects || []).forEach((path) => {
  write(path.replace(/^\//, ''), `<!doctype html>
<html lang="${esc(SEO.locale || 'en')}">
<head>
<meta charset="utf-8">
<title>${esc(S.name)}</title>
<link rel="canonical" href="${esc(siteUrl)}">
<meta http-equiv="refresh" content="0; url=${esc(siteUrl)}">
</head>
<body><p><a href="${esc(siteUrl)}">${esc(S.name)}</a></p></body>
</html>
`);
});

write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${esc(siteUrl)}</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`);

write('robots.txt', `User-agent: *
Allow: /

Sitemap: ${siteUrl}sitemap.xml
`);

const missing = ['assets/og.png', 'assets/apple-touch-icon.png', 'favicon.ico'].filter((f) => !existsSync(join(root, f)));
if (missing.length) console.warn('warning: missing files: ' + missing.join(', '));
console.log(`built index.html (${html.length} bytes), title ${pageTitle.length} chars, description ${description.length} chars`);
