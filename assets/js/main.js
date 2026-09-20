/* ==========================================================================
   Tech Drive — behaviours
   --------------------------------------------------------------------------
   Loaded after components.js, so the injected header and footer are already
   in the DOM. No dependencies.
   ========================================================================== */

(function () {
  'use strict';

  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  /* ---------------------------------------------------------- 1. Icons */
  function icons() {
    $$('[data-icon]').forEach((el) => {
      const svg = window.TD_ICONS[el.dataset.icon];
      if (svg) el.innerHTML = svg;
      el.setAttribute('aria-hidden', 'true');
    });
  }

  /* ------------------------------------------------ 3. Desktop dropdowns */
  function dropdowns() {
    const items = $$('[data-drop]');
    if (!items.length) return;
    let timer;

    const close = (li) => {
      li.classList.remove('is-open');
      const b = $('.nav-a', li);
      if (b) b.setAttribute('aria-expanded', 'false');
    };
    const open = (li) => {
      items.forEach((o) => o !== li && close(o));
      li.classList.add('is-open');
      const b = $('.nav-a', li);
      if (b) b.setAttribute('aria-expanded', 'true');
    };

    items.forEach((li) => {
      li.addEventListener('mouseenter', () => { clearTimeout(timer); open(li); });
      li.addEventListener('mouseleave', () => { timer = setTimeout(() => close(li), 140); });
      const btn = $('.nav-a', li);
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        li.classList.contains('is-open') ? close(li) : open(li);
      });
      li.addEventListener('focusout', (e) => {
        if (!li.contains(e.relatedTarget)) close(li);
      });
    });

    addEventListener('keydown', (e) => {
      if (e.key === 'Escape') items.forEach(close);
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('[data-drop]')) items.forEach(close);
    });
  }

  /* ----------------------------------------------- 4. Language picker */
  function langPicker() {
    const box = $('[data-lang]');
    if (!box) return;
    const btn = $('.lang-btn', box);
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const on = box.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(on));
    });
    document.addEventListener('click', () => {
      box.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    });
    // Single locale for now; extra locales become live once registered in
    // config.js and a matching content file is added.
    $$('[data-locale]', box).forEach((b) => {
      b.addEventListener('click', () => {
        box.classList.remove('is-open');
      });
    });
  }

  /* --------------------------------------------------- 5. Mobile drawer */
  function drawer() {
    const dr = $('[data-drawer]');
    if (!dr) return;
    const openBtn  = $('[data-burger]');
    const closeBtn = $('[data-burger-close]');

    const set = (on) => {
      dr.hidden = !on;
      dr.classList.toggle('is-open', on);
      document.body.classList.toggle('no-scroll', on);
      if (openBtn) openBtn.setAttribute('aria-expanded', String(on));
      if (on) { const f = $('a,button', dr); if (f) f.focus(); }
      else if (openBtn) openBtn.focus();
    };

    if (openBtn)  openBtn.addEventListener('click',  () => set(true));
    if (closeBtn) closeBtn.addEventListener('click', () => set(false));
    addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dr.classList.contains('is-open')) set(false);
    });

    $$('.drawer-grp > button', dr).forEach((b) => {
      const grp = b.parentElement;
      if (grp.hasAttribute('data-open')) {
        grp.classList.add('is-open');
        b.setAttribute('aria-expanded', 'true');
      }
      b.addEventListener('click', () => {
        const on = grp.classList.toggle('is-open');
        b.setAttribute('aria-expanded', String(on));
      });
    });

    // Close when a link is followed (same-page anchors included).
    $$('a', dr).forEach((a) => a.addEventListener('click', () => set(false)));
  }

  /* ------------------------------------------------------------ 6. Tabs */
  function tabs() {
    $$('[data-tabs]').forEach((box) => {
      const btns   = $$('[role="tab"]', box);
      const panels = $$('[role="tabpanel"]', box);
      if (!btns.length) return;

      const select = (id, push) => {
        btns.forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tab === id)));
        panels.forEach((p) => p.classList.toggle('is-on', p.id === id));
        if (push && history.replaceState) history.replaceState(null, '', '#' + id);
      };

      btns.forEach((b, i) => {
        b.addEventListener('click', () => select(b.dataset.tab, true));
        b.addEventListener('keydown', (e) => {
          const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
          if (!d) return;
          e.preventDefault();
          const next = btns[(i + d + btns.length) % btns.length];
          next.focus();
          select(next.dataset.tab, true);
        });
      });

      // Deep link: /games.html#slots opens that tab directly.
      const hash = location.hash.slice(1);
      const start = btns.some((b) => b.dataset.tab === hash) ? hash : btns[0].dataset.tab;
      select(start, false);
    });
  }

  /* ------------------------------------------------ 7. Reveal on scroll */
  function reveal() {
    const els = $$('.rv');
    if (!els.length) return;
    if (!('IntersectionObserver' in window) ||
        matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((e) => e.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    els.forEach((el, i) => {
      el.style.transitionDelay = Math.min(i % 6, 5) * 55 + 'ms';
      io.observe(el);
    });
  }

  /* ---------------------------------------------------- 8. Cookie notice */
  function cookies() {
    const bar = $('[data-cookie]');
    if (!bar) return;
    const KEY = 'td.cookie';
    let saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) { /* storage blocked */ }
    if (saved) return;

    setTimeout(() => bar.classList.add('is-on'), 900);
    $$('[data-ck]', bar).forEach((b) => {
      b.addEventListener('click', () => {
        try { localStorage.setItem(KEY, b.dataset.ck); } catch (e) { /* ignore */ }
        bar.classList.remove('is-on');
      });
    });
  }

  /* ------------------------------------------- 9. Marquee duplication */
  /* Logo walls scroll seamlessly by rendering their track twice. */
  function marquee() {
    $$('.marquee-t').forEach((t) => {
      if (t.dataset.doubled) return;
      t.dataset.doubled = '1';
      t.innerHTML += t.innerHTML;
    });
  }

  /* -------------------------------------------------------------- init */
  function init() {
    icons();
    dropdowns();
    langPicker();
    drawer();
    tabs();
    marquee();
    reveal();
    cookies();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
