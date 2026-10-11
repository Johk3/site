(function () {
  'use strict';
  var S = window.SITE;
  if (!S) return;
  var L = S.labels || {};

  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (attrs[k] === undefined || attrs[k] === null || attrs[k] === '') return;
      if (k === 'text') n.textContent = attrs[k]; else n.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }

  // Minimal inline markup: [label](url) and *italic*. Built with DOM nodes, never innerHTML.
  function inline(parent, text) {
    var re = /\[([^\]]+)\]\(([^)\s]+)\)|\*([^*]+)\*/g, last = 0, m;
    text = String(text || '');
    while ((m = re.exec(text))) {
      if (m.index > last) parent.appendChild(document.createTextNode(text.slice(last, m.index)));
      if (m[1]) parent.appendChild(el('a', { href: m[2], text: m[1] }));
      else parent.appendChild(el('em', { text: m[3] }));
      last = re.lastIndex;
    }
    if (last < text.length) parent.appendChild(document.createTextNode(text.slice(last)));
    return parent;
  }
  function node(tag, text, attrs) { return inline(el(tag, attrs), text); }
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

  var $ = function (id) { return document.getElementById(id); };
  var refs = [];            // collected from entries with a url
  var secNames = [];

  // Page metadata
  document.title = S.name + (S.subtitle ? ' | ' + S.subtitle : '');
  $('skip').textContent = L.skip || 'Skip to content';

  // Title block
  var head = $('top');
  head.appendChild(el('h1', { text: S.name }));
  if (S.subtitle) head.appendChild(el('p', { class: 'subtitle', text: S.subtitle }));
  if (S.affiliation) head.appendChild(el('p', { class: 'affiliation', text: S.affiliation }));
  if (S.portrait) head.appendChild(el('img', { class: 'portrait', src: S.portrait, alt: S.portraitAlt || '', width: 168, height: 168 }));

  var abs = el('div', { class: 'abstract' });
  (S.abstract || []).forEach(function (p) { abs.appendChild(node('p', p)); });
  if (S.keywords && S.keywords.length) {
    abs.appendChild(el('p', { class: 'keys', text: (S.keywordsLabel || 'Keywords') + ': ' + S.keywords.join(', ') }));
  }
  var actions = el('div', { class: 'actions' });
  var first = true;
  function button(label, href, external) {
    var a = el('a', { class: 'btn' + (first ? ' primary' : ''), href: href, text: label });
    if (external) { a.setAttribute('rel', 'noopener'); }
    actions.appendChild(a); first = false;
  }
  if (S.email) button(L.getInTouch || 'Get in touch', 'mailto:' + S.email);
  (S.links || []).forEach(function (l) { if (l && l.url) button(l.label, l.url, /^https?:/.test(l.url)); });
  if (actions.children.length) abs.appendChild(actions);
  head.appendChild(abs);

  // Sections
  var cols = $('cols'), n = 0;
  (S.sections || []).forEach(function (sec) {
    n += 1;
    var id = slug(sec.title);
    secNames.push([id, sec.title]);
    var s = el('section', { id: id });
    s.appendChild(el('h2', { text: n + '. ' + sec.title }));

    (sec.text || []).forEach(function (p) { s.appendChild(node('p', p)); });

    (sec.entries || []).forEach(function (e) {
      var h = el('h3');
      inline(h, e.title);
      if (e.url) {
        refs.push(e);
        var num = refs.length;
        h.appendChild(el('a', { class: 'cite', href: '#ref-' + num, 'data-ref': num, text: '[' + num + ']', 'aria-label': 'Reference ' + num }));
      }
      s.appendChild(h);
      var meta = [e.meta, e.place].filter(Boolean).join(', ');
      if (meta) s.appendChild(el('p', { class: 'meta', text: meta }));
      if (e.text) s.appendChild(node('p', e.text));
      if (e.bullets && e.bullets.length) {
        var ul = el('ul');
        e.bullets.forEach(function (b) { ul.appendChild(node('li', b)); });
        s.appendChild(ul);
      }
      if (e.image) {
        var fig = el('figure', null, [el('img', { src: e.image, alt: e.imageAlt || '', loading: 'lazy' })]);
        if (e.caption) fig.appendChild(el('figcaption', { text: e.caption }));
        s.appendChild(fig);
      }
    });

    if (sec.table && sec.table.length) {
      var tb = el('tbody');
      sec.table.forEach(function (r) {
        var tr = el('tr'); tr.appendChild(el('th', { scope: 'row', text: r[0] })); tr.appendChild(node('td', r[1])); tb.appendChild(tr);
      });
      s.appendChild(el('table', null, [tb]));
    }

    if (sec.bullets && sec.bullets.length) {
      var ul2 = el('ul');
      sec.bullets.forEach(function (b) { ul2.appendChild(node('li', b)); });
      s.appendChild(ul2);
    }
    cols.appendChild(s);
  });

  // References, built from entries that have a url
  var refSec = $('references');
  if (refs.length) {
    refSec.hidden = false;
    refSec.appendChild(el('h2', { text: L.references || 'References' }));
    var ol = el('ol');
    refs.forEach(function (e, i) {
      var li = el('li', { id: 'ref-' + (i + 1) });
      li.appendChild(el('span', { class: 'n', text: '[' + (i + 1) + ']' }));
      var body = el('span');
      body.appendChild(document.createTextNode(S.name + '. ' + String(e.title).replace(/[*]/g, '') + '. ' + (L.sourceCode || 'Source code') + ': '));
      body.appendChild(el('a', { href: e.url, text: e.url.replace(/^https?:\/\//, ''), rel: 'noopener' }));
      li.appendChild(body); ol.appendChild(li);
    });
    refSec.appendChild(ol);
    secNames.push(['references', L.references || 'References']);
  }

  // Nav
  var nav = $('nav');
  nav.appendChild(el('a', { href: '#top', text: S.name }));
  var ul3 = el('ul');
  secNames.forEach(function (s) { ul3.appendChild(el('li', null, [el('a', { href: '#' + s[0], text: s[1] })])); });
  nav.appendChild(el('nav', { 'aria-label': 'Sections' }, [ul3]));

  // Footer
  var year = new Date().getFullYear();
  $('foot').textContent = '© ' + year + ' ' + (S.footer || S.name);

  // Hovering a citation highlights its reference
  document.querySelectorAll('.cite').forEach(function (c) {
    var t = $('ref-' + c.dataset.ref);
    function on() { t.classList.add('hot'); }
    function off() { t.classList.remove('hot'); }
    c.addEventListener('mouseenter', on); c.addEventListener('mouseleave', off);
    c.addEventListener('focus', on); c.addEventListener('blur', off);
  });
})();
