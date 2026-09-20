/* ==========================================================================
   Tech Drive — shared chrome
   --------------------------------------------------------------------------
   Builds the header, footer, universal CTA band, Telegram button and cookie
   notice on every page from content/en.js, and resolves [[TOKEN]] values out
   of config.js across the whole document.

   Pages carry data-root on <html> ("" at the site root, "../" one level down)
   so every link resolves correctly from file://, from a server, and from a
   sub-directory deployment alike.
   ========================================================================== */

(function () {
  'use strict';

  const CFG = window.TD_CONFIG;
  const C   = window.TD_CONTENT_EN;
  const IC  = window.TD_ICONS;
  const ROOT = document.documentElement.dataset.root || '';

  /* ------------------------------------------------------------- helpers */

  const url = (href) => {
    if (!href) return '#';
    if (href === '@telegram') return CFG.contact.telegramUrl;
    if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
    return ROOT + href;
  };

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* Current page, normalised to the same shape as the hrefs in en.js. */
  const here = (function () {
    let p = location.pathname.replace(/\\/g, '/');
    const i = p.lastIndexOf('/site/');
    p = i >= 0 ? p.slice(i + 6) : p.replace(/^\//, '');
    if (p === '' || /\/$/.test(p)) p += 'index.html';
    return p;
  })();

  const isHere = (href) => href && here === href.replace(/^\.\//, '');
  const inSection = (item) =>
    isHere(item.href) ||
    (item.children || []).some((c) => isHere(c.href));

  /* --------------------------------------------------- [[TOKEN]] resolver */

  const TOKENS = {
    /* Place of incorporation is deliberately not published. LEGAL_ENTITY
       resolves to the licence holder once known, then any explicit override,
       and falls back to the trading name — never to the registered company
       name, which would disclose the jurisdiction through its suffix. */
    LEGAL_ENTITY:        () => CFG.licence.entity || CFG.legal.entityName || CFG.site.name,
    GOVERNING_LAW:       () => CFG.legal.governingLaw,
    YEAR_FOUNDED:        () => CFG.company.yearFounded,
    LICENCE_AUTHORITY:   () => CFG.licence.authority,
    LICENCE_NUMBER:      () => CFG.licence.number,
    LICENCE_JURISDICTION:() => CFG.licence.jurisdiction,
    PROVIDER_COUNT:      () => CFG.metrics.providerCount,
    GAME_COUNT:          () => CFG.metrics.gameCount,
    UPTIME_SLA:          () => CFG.metrics.uptimeSla,
    MITIGATION_CAPACITY: () => CFG.metrics.mitigationCapacity,
    ENG_TEAM_SIZE:       () => CFG.metrics.engTeamSize,
    RESPONSE_SLA:        () => CFG.metrics.responseSla,
    SALES_EMAIL:         () => CFG.contact.sales,
    SUPPORT_EMAIL:       () => CFG.contact.support,
    TELEGRAM:            () => CFG.contact.telegram,
    PHONE:               () => CFG.contact.phone,
    COPYRIGHT_YEAR:      () => CFG.site.copyrightYear
  };

  const RX  = /\[\[([A-Z_]+)\]\]/g;
  /* Separate non-global copy for tests: .test() on a /g regex advances
     lastIndex, so reusing RX would skip every other match. */
  const HAS = /\[\[[A-Z_]+\]\]/;
  const missing = new Set();

  /** Resolve tokens in a string. Unfilled values become an amber marker. */
  function fill(str, plain) {
    return String(str).replace(RX, (m, key) => {
      const v = TOKENS[key] ? TOKENS[key]() : '';
      if (v === '' || v == null) {
        missing.add(key);
        return plain ? m : '<span class="td-todo" title="Pending — see PENDING.md">' + m + '</span>';
      }
      return plain ? v : esc(v);
    });
  }

  /** Walk the rendered document and resolve tokens in every text node. */
  function fillDocument(root) {
    const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) =>
        HAS.test(n.nodeValue) && !/^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName)
          ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    });
    const hits = [];
    let n;
    while ((n = walk.nextNode())) hits.push(n);
    hits.forEach((node) => {
      const span = document.createElement('span');
      span.innerHTML = fill(node.nodeValue);
      node.parentNode.replaceChild(
        document.createRange().createContextualFragment(span.innerHTML), node);
    });
    // Attribute values (href, content, aria-label, title, placeholder).
    root.querySelectorAll('*').forEach((el) => {
      for (const a of Array.from(el.attributes)) {
        if (a.value.indexOf('[[') >= 0) el.setAttribute(a.name, fill(a.value, true));
      }
    });
  }

  const licenceReady = () =>
    !!(CFG.licence.authority && CFG.licence.number && CFG.licence.jurisdiction);

  /* Conditional blocks.
     [data-if-licence]    renders only once the gaming licence is in config.
     [data-if-no-licence] is the stand-in shown until then — the verified
                          company registration, which is a real credential
                          rather than an empty placeholder.
     Same pattern for [data-if-milestones] / [data-if-office].            */
  function conditionals(root) {
    const show = (sel, on) => root.querySelectorAll(sel).forEach((el) => {
      if (on) el.removeAttribute('hidden'); else el.remove();
    });
    const lic = licenceReady();
    show('[data-if-licence]', lic);
    show('[data-if-no-licence]', !lic);
    show('[data-if-milestones]', (CFG.milestones || []).length > 0);
    show('[data-if-office]', !!CFG.contact.office);
  }

  /* ------------------------------------------------------------- 1. Header */

  function header() {
    const n = C.nav;

    const desktop = n.items.map((it) => {
      const cur = inSection(it) ? ' aria-current="page"' : '';
      if (!it.children) {
        return `<li class="nav-i"><a class="nav-a" href="${url(it.href)}"${cur}>${esc(it.label)}</a></li>`;
      }
      const sub = it.children.map((c) =>
        `<a href="${url(c.href)}"${isHere(c.href) ? ' aria-current="page"' : ''}>` +
        `<b>${esc(c.label)}</b>${c.desc ? `<span>${esc(c.desc)}</span>` : ''}</a>`).join('');
      return `<li class="nav-i" data-drop>
          <button class="nav-a" type="button" aria-expanded="false"${cur}>
            ${esc(it.label)}<span class="nav-cr">${IC.chevron}</span>
          </button>
          <div class="drop">${sub}</div>
        </li>`;
    }).join('');

    const langs = CFG.locales;
    const active = langs.find((l) => l.default) || langs[0];
    const langPicker = `
      <div class="lang" data-lang>
        <button class="lang-btn" type="button" aria-expanded="false" aria-label="Change language">
          ${IC.globe}<span>${esc(active.label)}</span>
        </button>
        <div class="lang-menu" role="menu">
          ${langs.map((l) =>
            `<button type="button" role="menuitem" data-locale="${l.code}"` +
            `${l.code === active.code ? ' aria-current="true"' : ''}>${esc(l.name)}</button>`).join('')}
        </div>
      </div>`;

    const drawer = n.items.map((it) => {
      if (!it.children) {
        return `<div class="drawer-grp"><a href="${url(it.href)}">${esc(it.label)}</a></div>`;
      }
      return `<div class="drawer-grp"${inSection(it) ? ' data-open' : ''}>
          <button type="button" aria-expanded="false">${esc(it.label)}${IC.chevron}</button>
          <div class="drawer-sub">${it.children.map((c) =>
            `<a href="${url(c.href)}"><b>${esc(c.label)}</b>` +
            `${c.desc ? `<span>${esc(c.desc)}</span>` : ''}</a>`).join('')}</div>
        </div>`;
    }).join('');

    return `
      <a class="skip" href="#main">${esc(n.skip)}</a>
      <header class="hdr" data-hdr>
        <div class="hdr-wrap hdr-in">
          <a class="brand" href="${url('index.html')}" aria-label="Tech Drive — home">
            <img src="${ROOT}assets/img/brand/logo.svg" alt="Tech Drive" width="144" height="30">
          </a>
          <nav aria-label="Main"><ul class="nav">${desktop}</ul></nav>
          <div class="hdr-end">
            ${langPicker}
            <a class="btn btn-pri btn-sm" href="${url(n.cta.href)}">${esc(n.cta.label)}</a>
            <button class="burger" type="button" data-burger aria-expanded="false"
                    aria-label="${esc(n.menuOpen)}">${IC.menu}</button>
          </div>
        </div>
      </header>

      <div class="drawer" data-drawer hidden>
        <div class="hdr-wrap drawer-top">
          <a class="brand" href="${url('index.html')}" aria-label="Tech Drive — home">
            <img src="${ROOT}assets/img/brand/logo.svg" alt="Tech Drive" width="144" height="30">
          </a>
          <button class="burger" type="button" data-burger-close
                  aria-label="${esc(n.menuClose)}">${IC.close}</button>
        </div>
        <div class="hdr-wrap drawer-nav">
          ${drawer}
          <div class="drawer-foot">
            <a class="btn btn-pri btn-block" href="${url(n.cta.href)}">${esc(n.cta.label)}</a>
            <a class="btn btn-ghost btn-block" href="${CFG.contact.telegramUrl}"
               target="_blank" rel="noopener">${IC.telegram} ${esc(CFG.contact.telegram)}</a>
          </div>
        </div>
      </div>`;
  }

  /* ------------------------------------------------------------- 2. Footer */

  function footer() {
    const f = C.footer;
    const cols = f.columns.map((col) => `
      <div>
        <h4>${esc(col.heading)}</h4>
        <ul class="ftr-l">${col.links.map((l) =>
          `<li><a href="${url(l.href)}">${esc(l.label)}</a></li>`).join('')}</ul>
      </div>`).join('');

    const lbl = f.contactLabels;
    const office = CFG.contact.office
      ? `<div><b>Office</b><span class="small">${esc(CFG.contact.office)}</span></div>` : '';

    return `
      <footer class="ftr">
        <div class="wrap">
          <div class="ftr-grid">
            <div class="ftr-brand">
              <img src="${ROOT}assets/img/brand/logo.svg" alt="Tech Drive" width="134" height="28">
              <p class="ftr-tag">${esc(f.tagline)}</p>
            </div>
            ${cols}
            <div>
              <h4>${esc(f.contactHeading)}</h4>
              <div class="ftr-c">
                <div><b>${esc(lbl.sales)}</b><a href="mailto:${CFG.contact.sales}">${esc(CFG.contact.sales)}</a></div>
                <div><b>${esc(lbl.support)}</b><a href="mailto:${CFG.contact.support}">${esc(CFG.contact.support)}</a></div>
                <div><b>${esc(lbl.telegram)}</b><a href="${CFG.contact.telegramUrl}" target="_blank" rel="noopener">${esc(CFG.contact.telegram)}</a></div>
                <div><b>${esc(lbl.phone)}</b><a href="tel:${CFG.contact.phoneHref}">${esc(CFG.contact.phone)}</a></div>
                ${office}
              </div>
              <span class="badge-24">${esc(f.supportBadge)}</span>
            </div>
          </div>

          <div class="ftr-bot">
            <div class="ftr-legal">
              <span class="age" aria-label="${esc(f.ageNoticeLabel)}"
                    title="${esc(f.ageNoticeLabel)}">${esc(f.ageNotice)}</span>
              <div>
                ${licenceReady() ? `<p>${fill(f.licenceLine)}</p>` : ''}
                <p>${esc(f.disclaimer)}</p>
              </div>
            </div>
            <div class="ftr-end">
              <p>${fill(f.copyright)}</p>
              <p><a href="${url('privacy.html')}">Privacy</a> ·
                 <a href="${url('terms.html')}">Terms</a> ·
                 <a href="${url('responsible-gaming.html')}">Responsible Gaming</a></p>
            </div>
          </div>
        </div>
      </footer>`;
  }

  /* --------------------------------------------------- 3. Universal CTA band */

  function ctaBand() {
    const b = C.ctaBand;
    return `
      <section class="ctab">
        <div class="wrap ctab-in">
          <h2>${esc(b.heading)}</h2>
          <p class="lede">${esc(b.body)}</p>
          <div class="btn-row">
            <a class="btn btn-pri btn-lg" href="${url(b.primary.href)}">${esc(b.primary.label)}</a>
            <a class="btn btn-ghost btn-lg" href="${url(b.secondary.href)}"
               target="_blank" rel="noopener">${IC.telegram} ${esc(b.secondary.label)}</a>
          </div>
        </div>
      </section>`;
  }

  /* ----------------------------------------------- 4. Telegram FAB + cookies */

  function floaters() {
    const ck = C.cookies;
    return `
      <a class="tg" href="${CFG.contact.telegramUrl}" target="_blank" rel="noopener"
         aria-label="${esc(C.telegram.aria)}">
        ${IC.telegram}<span class="tg-tx">${esc(C.telegram.label)}</span>
      </a>
      <div class="cookie" data-cookie role="dialog" aria-label="Cookie notice">
        <p>${esc(ck.body)}<a href="${url(ck.policyHref)}">${esc(ck.policyLabel)}</a>.</p>
        <div class="btn-row">
          <button class="btn btn-quiet btn-sm" type="button" data-ck="essential">${esc(ck.essential)}</button>
          <button class="btn btn-pri btn-sm" type="button" data-ck="all">${esc(ck.accept)}</button>
        </div>
      </div>`;
  }

  /* ----------------------------------------------- 5. About › milestones */
  /* Rendered from config.milestones into [data-milestones]; the whole
     section is removed by conditionals() while the list is empty.        */
  function milestones(root) {
    const host = root.querySelector('[data-milestones]');
    if (!host) return;
    host.innerHTML = (CFG.milestones || []).map((m) => `
      <li class="step">
        <span class="step-n">${esc(m.year)}</span>
        <p>${esc(m.text)}</p>
      </li>`).join('');
  }

  /* Office address, when one is set in config.contact.office. */
  function office(root) {
    const el = root.querySelector('[data-office]');
    if (el && CFG.contact.office) el.textContent = CFG.contact.office;
  }

  /* ---------------------------------------------------------------- 6. Mount */

  function mount() {
    const h = document.getElementById('site-header');
    const f = document.getElementById('site-footer');
    const c = document.getElementById('site-cta');

    if (h) h.innerHTML = header();
    if (c) c.innerHTML = ctaBand();
    if (f) f.innerHTML = footer() + floaters();

    conditionals(document.body);
    milestones(document.body);
    office(document.body);
    fillDocument(document.body);

    if (missing.size) {
      console.warn(
        '%cTech Drive · configuration incomplete',
        'color:#F5C04A;font-weight:700',
        '\nUnfilled values on this page:\n  [[' +
        Array.from(missing).join(']]\n  [[') + ']]' +
        '\nFill them in assets/js/config.js — see PENDING.md.');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

  /* Expose for main.js and forms.js */
  window.TD = { url, esc, fill, ROOT, licenceReady, here };
})();
