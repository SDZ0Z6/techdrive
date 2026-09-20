/* ==========================================================================
   Tech Drive — decorative hero art
   --------------------------------------------------------------------------
   Line-art gaming iconography: card suits, chips, dice and playing cards,
   drawn as outlines in the brand gradient with a glow. Purely decorative —
   aria-hidden, no text content, nothing here is read by a crawler.

   Usage:  <div class="hero-art" data-art="constellation"></div>
   The composition name picks a layout from LAYOUTS below. To retune a page,
   change its data-art value or edit the item list — each item is
   { shape, x, y, s, o, r }: shape name, centre point, scale, opacity,
   rotation in degrees.

   All shapes are authored on a 24x24 box centred at (12,12).
   ========================================================================== */

window.TD_ART = (function () {
  'use strict';

  /* ------------------------------------------------------------- shapes */

  const pips = (pts) => pts.map(([x, y]) =>
    `<circle class="pip" cx="${x}" cy="${y}" r="1.25"/>`).join('');

  const SPADE = 'M12 3.1c0 0-7.1 6.2-7.1 10.5a3.95 3.95 0 0 0 6.3 3.15c-.1 1.95-.9 3.3-2.05 4.6' +
                'h5.7c-1.15-1.3-1.95-2.65-2.05-4.6a3.95 3.95 0 0 0 6.3-3.15C19.1 9.3 12 3.1 12 3.1z';
  const HEART = 'M12 20.6s-7.45-4.75-7.45-10.05a4.2 4.2 0 0 1 7.45-2.6 4.2 4.2 0 0 1 7.45 2.6' +
                'c0 5.3-7.45 10.05-7.45 10.05z';
  const CLUB  = 'M12 2.9a3.45 3.45 0 0 0-2.9 5.32A3.6 3.6 0 1 0 8.25 15.2a3.55 3.55 0 0 0 2.63-1.17' +
                ' c.05 3.05-.86 5.07-2.23 6.34h6.7c-1.37-1.27-2.28-3.29-2.23-6.34a3.55 3.55 0 0 0 2.63 1.17' +
                ' 3.6 3.6 0 1 0-.85-6.98A3.45 3.45 0 0 0 12 2.9z';
  const DIAMOND = 'M12 2.6 19.4 12 12 21.4 4.6 12z';

  const SHAPES = {
    spade:   `<path d="${SPADE}"/>`,
    heart:   `<path d="${HEART}"/>`,
    club:    `<path d="${CLUB}"/>`,
    diamond: `<path d="${DIAMOND}"/>`,

    /* casino chip, plan view — rim, six edge inserts, inset ring.
       The inserts are a dashed circle: radial ticks read as a gear instead. */
    chip: '<circle cx="12" cy="12" r="9.5"/>' +
          '<circle cx="12" cy="12" r="7.6" stroke-dasharray="3.98 3.98"/>' +
          '<circle cx="12" cy="12" r="4.9"/>',

    /* chip stack, side view */
    stack: '<ellipse cx="12" cy="7.4" rx="7.7" ry="2.7"/>' +
           '<path d="M4.3 7.4v8.3a7.7 2.7 0 0 0 15.4 0V7.4"/>' +
           '<path d="M4.3 11.6a7.7 2.7 0 0 0 15.4 0"/>',

    /* dice, five and three */
    dice5: '<rect x="3.5" y="3.5" width="17" height="17" rx="3.6"/>' +
           pips([[7.7, 7.7], [16.3, 7.7], [12, 12], [7.7, 16.3], [16.3, 16.3]]),
    dice3: '<rect x="3.5" y="3.5" width="17" height="17" rx="3.6"/>' +
           pips([[7.7, 7.7], [12, 12], [16.3, 16.3]]),

    /* single playing card carrying a suit */
    cardSpade: '<rect x="5" y="2.3" width="14" height="19.4" rx="2.3"/>' +
               `<g transform="translate(12 12) scale(.54) translate(-12 -12)"><path d="${SPADE}"/></g>`,
    cardHeart: '<rect x="5" y="2.3" width="14" height="19.4" rx="2.3"/>' +
               `<g transform="translate(12 12) scale(.54) translate(-12 -12)"><path d="${HEART}"/></g>`,

    /* two cards, fanned */
    cardPair: '<g transform="rotate(-16 12 19)"><rect x="3.9" y="3.4" width="12.2" height="17.2" rx="2"/></g>' +
              '<rect x="8" y="3.4" width="12.2" height="17.2" rx="2"/>' +
              `<g transform="translate(14.1 12) scale(.52) translate(-12 -12)"><path d="${SPADE}"/></g>`
  };

  /* --------------------------------------------------------- layouts */
  /* Tall box (560x630) suits the homepage hero; wide (700x430) suits the
     shorter hero on every other page.                                    */

  const hexFrame = (cx, cy, r, o) => {
    const p = [];
    for (let i = 0; i < 6; i++) {
      const a = (i * 60 - 90) * Math.PI / 180;
      p.push(`${(cx + Math.cos(a) * r).toFixed(0)} ${(cy + Math.sin(a) * r * 1.15).toFixed(0)}`);
    }
    return { frame: `M${p.join(' L')} Z`, o: o };
  };

  const LAYOUTS = {

    /* Homepage — spade anchored in the brand hexagon, everything else orbits */
    constellation: {
      sparks: 26, seed: 11,
      box: [560, 630],
      frames: [hexFrame(200, 250, 106, .22)],
      links: [[200, 250, 420, 112], [200, 250, 424, 390], [200, 250, 196, 494],
              [420, 112, 424, 390], [424, 390, 196, 494]],
      nodes: [[310, 181, 2.6], [312, 320, 2.6], [198, 372, 2.6], [422, 251, 2.6],
              [486, 56, 2], [498, 540, 2], [252, 588, 2]],
      items: [
        { shape: 'spade',   x: 200, y: 250, s: 6.9, o: .9 },
        { shape: 'diamond', x: 420, y: 112, s: 4.4 },
        { shape: 'club',    x: 424, y: 390, s: 4.9 },
        { shape: 'heart',   x: 196, y: 494, s: 4.1 },
        { shape: 'chip',    x: 330, y: 176, s: 3.5, o: .55 },
        { shape: 'dice5',   x: 356, y: 300, s: 2.9, o: .5, r: -14 },
        { shape: 'stack',   x: 486, y: 216, s: 3.0, o: .42 },
        { shape: 'cardPair',x: 300, y: 470, s: 3.4, o: .45, r: 6 }
      ]
    },

    /* Solutions — chips and dice lead, one suit for balance */
    table: {
      sparks: 22, seed: 23,
      box: [700, 430],
      frames: [hexFrame(470, 200, 92, .2)],
      links: [[470, 200, 236, 126], [470, 200, 268, 330], [236, 126, 612, 92],
              [470, 200, 630, 322]],
      nodes: [[353, 163, 2.4], [369, 265, 2.4], [424, 146, 2.4], [550, 261, 2.4], [660, 40, 2]],
      items: [
        { shape: 'chip',      x: 470, y: 200, s: 5.2, o: .85 },
        { shape: 'dice5',     x: 236, y: 126, s: 3.2, o: .6, r: -12 },
        { shape: 'dice3',     x: 268, y: 330, s: 2.7, o: .5, r: 16 },
        { shape: 'stack',     x: 612, y: 92,  s: 3.4, o: .5 },
        { shape: 'spade',     x: 630, y: 322, s: 3.6, o: .55 },
        { shape: 'cardSpade', x: 372, y: 392, s: 3.0, o: .38, r: -8 }
      ]
    },

    /* Games — cards lead, all four suits present */
    deck: {
      sparks: 24, seed: 37,
      box: [700, 430],
      frames: [hexFrame(430, 205, 96, .2)],
      links: [[430, 205, 210, 112], [430, 205, 262, 344], [430, 205, 634, 120],
              [430, 205, 620, 330]],
      nodes: [[320, 158, 2.4], [346, 274, 2.4], [532, 162, 2.4], [525, 267, 2.4]],
      items: [
        { shape: 'cardPair',  x: 430, y: 205, s: 5.8, o: .85 },
        { shape: 'spade',     x: 210, y: 112, s: 3.4, o: .55 },
        { shape: 'heart',     x: 262, y: 344, s: 3.0, o: .5 },
        { shape: 'club',      x: 634, y: 120, s: 3.3, o: .5 },
        { shape: 'diamond',   x: 620, y: 330, s: 3.1, o: .5 },
        { shape: 'chip',      x: 560, y: 60,  s: 2.6, o: .38 },
        { shape: 'dice3',     x: 150, y: 260, s: 2.5, o: .35, r: -18 }
      ]
    },

    /* Platform — deliberately sparser; these pages carry the technical case */
    quiet: {
      sparks: 16, seed: 53,
      box: [700, 430],
      frames: [hexFrame(520, 190, 84, .18)],
      links: [[520, 190, 300, 118], [520, 190, 342, 330], [520, 190, 648, 300]],
      nodes: [[410, 154, 2.2], [431, 260, 2.2], [584, 245, 2.2], [246, 388, 2]],
      items: [
        { shape: 'chip',    x: 520, y: 190, s: 4.2, o: .7 },
        { shape: 'spade',   x: 300, y: 118, s: 3.0, o: .42 },
        { shape: 'dice3',   x: 342, y: 330, s: 2.5, o: .35, r: 14 },
        { shape: 'diamond', x: 648, y: 300, s: 2.7, o: .4 }
      ]
    },

    /* Company / contact pages */
    mixed: {
      sparks: 20, seed: 71,
      box: [700, 430],
      frames: [hexFrame(300, 196, 88, .19)],
      links: [[300, 196, 540, 108], [300, 196, 508, 330], [540, 108, 660, 262]],
      nodes: [[420, 152, 2.4], [404, 263, 2.4], [600, 185, 2.4], [168, 352, 2]],
      items: [
        { shape: 'stack',     x: 300, y: 196, s: 4.6, o: .85 },
        { shape: 'cardHeart', x: 540, y: 108, s: 3.4, o: .5, r: 10 },
        { shape: 'club',      x: 508, y: 330, s: 3.2, o: .48 },
        { shape: 'dice5',     x: 660, y: 262, s: 2.8, o: .4, r: -10 },
        { shape: 'diamond',   x: 158, y: 350, s: 2.6, o: .34 }
      ]
    }
  };

  /* ---------------------------------------------------------- motion */
  /* Per-item drift and glow timings. Derived from the item's index rather
     than randomised, so the composition is identical on every load and in
     the OG screenshot — but no two shapes move in step, which is what makes
     it read as floating rather than as one sliding sheet.

     Amplitudes are in SVG user units (~1.1px on screen at hero size), so
     the motion stays proportional if a layout box is resized.

     Per-item overrides: `ma` scales the amplitude, `mdur` sets the period. */
  /* Background depth was reading as "washed out" rather than "distant":
     items authored at 0.35-0.5 all but vanished once the glow went up.
     This compresses the range upward — the dim end lifts a lot, the bright
     end barely moves — so the depth ordering survives but nothing is lost. */
  const lift = (o) => (o == null ? 1 : Math.round((0.45 + o * 0.55) * 100) / 100);

  /* ---------------------------------------------------------- sparks */
  /* Twinkling dot field behind the shapes. Positions come from a seeded
     LCG rather than Math.random so the scatter is identical on every load
     and in the OG screenshot — a field that reshuffles per page load reads
     as a rendering bug, not as decoration.

     Each dot is a gradient-filled halo plus a solid core, not a filtered
     circle: twenty drop-shadow filters would cost far more than twenty
     radial gradients, and the gradient gives a softer falloff anyway. */
  function sparks(w, h, n, seed) {
    let v = seed;
    const rnd = () => (v = (v * 1664525 + 1013904223) % 4294967296) / 4294967296;
    const r1 = (x) => Math.round(x * 10) / 10;
    let out = '';
    for (let i = 0; i < n; i++) {
      // Biased right: the left third of the box is masked out against the
      // copy, so dots placed there would never be seen.
      const x   = r1(w * (0.18 + rnd() * 0.82));
      const y   = r1(h * rnd());
      const cr  = r1(1.1 + rnd() * 1.9);
      const dur = r1(2.4 + rnd() * 3.6);
      // Same two-group rule as the shapes: the CSS scale() on .spark would
      // otherwise override this translate attribute and stack every dot on
      // the origin. Position on the outer group, animation on the inner.
      out += `<g transform="translate(${x} ${y})">` +
               `<g class="spark" style="animation-duration:${dur}s;` +
               `animation-delay:${r1(-rnd() * dur)}s">` +
                 `<circle class="spark-h" r="${r1(cr * 6)}"/>` +
                 `<circle class="spark-c" r="${cr}"/>` +
               `</g>` +
             `</g>`;
    }
    return out;
  }

  // Periods are drawn from a fixed table of values that share no simple
  // ratios. A formula like `15 + i * 3 % 9` looks varied but only yields
  // three numbers, and shapes on the same period visibly re-sync every few
  // cycles no matter how their delays are staggered.
  const DRIFT_S = [17, 23, 19, 29, 21, 26, 18, 31, 22, 27];
  const GLOW_S  = [8, 11.5, 9, 13, 7.5, 12, 10, 14.5, 8.5, 11];

  function motion(i, it) {
    const amp = it.ma == null ? 1 : it.ma;
    const dx  = (8 + (i * 7) % 7) * amp;      // 8–14 user units
    const dy  = (9 + (i * 5) % 6) * amp;      // 9–14 user units
    const r1  = (n) => Math.round(n * 10) / 10;
    return {
      dx:     r1(i % 2 ? -dx : dx),
      dy:     r1(i % 3 ? dy : -dy),
      dur:    it.mdur == null ? DRIFT_S[i % DRIFT_S.length] : it.mdur,
      delay:  r1(-((i * 4.3) % 12)),
      gdur:   GLOW_S[i % GLOW_S.length],
      gdelay: r1(-((i * 2.7) % 8))
    };
  }

  /* ---------------------------------------------------------- render */

  function svg(name) {
    const L = LAYOUTS[name];
    if (!L) return '';
    const [w, h] = L.box;

    const links = (L.links || []).map(([x1, y1, x2, y2]) =>
      `<path d="M${x1} ${y1} L${x2} ${y2}"/>`).join('');
    const nodes = (L.nodes || []).map(([x, y, r]) =>
      `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('');
    const frames = (L.frames || []).map((f) =>
      `<path class="frame" style="opacity:${f.o}" d="${f.frame}"/>`).join('');

    const items = L.items.map((it, i) => {
      const body = SHAPES[it.shape];
      if (!body) return '';
      const rot = it.r ? ` rotate(${it.r})` : '';
      const m = motion(i, it);

      // Two nested groups on purpose. The inner one carries the SVG
      // transform attribute that positions and scales the shape; the outer
      // one carries the CSS transform that drifts it. They cannot be the
      // same element — a CSS transform overrides the presentation
      // attribute outright, which would dump every shape at the origin.
      return `<g class="drift" style="--dx:${m.dx}px;--dy:${m.dy}px;` +
             `animation-duration:${m.dur}s;animation-delay:${m.delay}s">` +
               `<g class="suit" style="--o:${lift(it.o)};` +
               `animation-duration:${m.gdur}s;animation-delay:${m.gdelay}s" ` +
               `transform="translate(${it.x} ${it.y})${rot} scale(${it.s}) translate(-12 -12)">` +
               `${body}</g>` +
             `</g>`;
    }).join('');

    // The logo ramp (#3E7C86 -> #5FBCA4 -> #9CEBC8) is correct for the mark
    // but its dark teal end all but disappears as a hairline on the base
    // colour. This is the same ramp lifted into a brighter register, the
    // way --grad-tx is for headline type.
    return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet">` +
      '<defs>' +
        '<linearGradient id="td-art" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0" stop-color="#5AAF9E"/>' +
          '<stop offset=".5" stop-color="#84E3BE"/>' +
          '<stop offset="1" stop-color="#C6F8E4"/>' +
        '</linearGradient>' +
        '<radialGradient id="td-spark">' +
          '<stop offset="0" stop-color="#C6F8E4" stop-opacity=".75"/>' +
          '<stop offset=".4" stop-color="#9CEBC8" stop-opacity=".22"/>' +
          '<stop offset="1" stop-color="#9CEBC8" stop-opacity="0"/>' +
        '</radialGradient>' +
      '</defs>' +
      `<g class="sparks">${sparks(w, h, L.sparks || 20, L.seed || 7)}</g>` +
      `<g class="link">${links}</g><g class="node">${nodes}</g>${frames}${items}</svg>`;
  }

  function mount() {
    const hosts = document.querySelectorAll('[data-art]');
    hosts.forEach((el) => {
      el.setAttribute('aria-hidden', 'true');
      el.innerHTML = svg(el.dataset.art);
    });

    // Stop animating once the hero has scrolled away. Nothing is visible up
    // there, and a paused animation costs nothing.
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => e.target.classList.toggle('is-idle', !e.isIntersecting));
      }, { rootMargin: '140px' });
      hosts.forEach((el) => io.observe(el));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

  return { svg: svg, layouts: LAYOUTS, shapes: SHAPES };
})();
