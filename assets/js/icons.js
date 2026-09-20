/* ==========================================================================
   Tech Drive — inline icon set
   --------------------------------------------------------------------------
   Stroke icons on a 24x24 grid, drawn in currentColor. Used as
   <i data-icon="shield"></i> in markup; main.js swaps each one for its SVG.
   Kept inline rather than in a sprite file so the site works from file://
   as well as from a server.
   ========================================================================== */

window.TD_ICONS = (function () {
  const s = (d) =>
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';

  return {
    /* chrome */
    chevron:  s('<path d="M5 9l7 7 7-7"/>'),
    arrow:    s('<path d="M4 12h15M13 6l6 6-6 6"/>'),
    menu:     s('<path d="M3 6h18M3 12h18M3 18h18"/>'),
    close:    s('<path d="M5 5l14 14M19 5L5 19"/>'),
    check:    s('<path d="M4 12.5l5.2 5.2L20 7"/>'),
    external: s('<path d="M14 4h6v6M20 4l-8.5 8.5M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>'),
    globe:    s('<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5S14.2 18.2 12 20.5c-2.2-2.3-3.4-5.3-3.4-8.5S9.8 5.8 12 3.5z"/>'),

    /* contact */
    telegram: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.7 3.4 2.9 10.7c-1.1.4-1.1 1.1-.2 1.4l4.7 1.5 1.8 5.5c.2.6.4.8.8.8.4 0 .6-.2.9-.5l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.5c.3-1.2-.5-1.8-1.3-1.5zM7.9 13.2l10.2-6.4c.5-.3.9-.1.6.2l-8.7 7.9-.3 3.6-1.8-5.3z"/></svg>',
    mail:     s('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/>'),
    phone:    s('<path d="M6.5 3h3l1.5 4-2.2 1.5a13 13 0 0 0 6.7 6.7L17 13l4 1.5v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3z"/>'),
    chat:     s('<path d="M20.5 12.2a7.7 7.7 0 0 1-8.3 7.7A8.7 8.7 0 0 1 9 19.3L4 20.5l1.3-4.4a7.6 7.6 0 0 1-1.1-4A7.7 7.7 0 0 1 12.3 4.5a7.7 7.7 0 0 1 8.2 7.7z"/>'),

    /* platform */
    monitor:  s('<rect x="2.5" y="4" width="19" height="12.5" rx="2"/><path d="M8.5 20.5h7M12 16.5v4"/>'),
    mobile:   s('<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>'),
    layers:   s('<path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3z"/><path d="m3.5 12 8.5 4.5L20.5 12M3.5 16.5 12 21l8.5-4.5"/>'),
    users:    s('<circle cx="9.5" cy="8" r="3.5"/><path d="M2.5 20a7 7 0 0 1 14 0M17 5.2a3.5 3.5 0 0 1 0 6.6M18 14.5a6.4 6.4 0 0 1 3.5 5.5"/>'),
    wallet:   s('<path d="M3.5 7.5A2 2 0 0 1 5.5 5.5h11a2 2 0 0 1 2 2"/><rect x="2.5" y="7.5" width="19" height="11.5" rx="2"/><circle cx="16.5" cy="13.2" r="1.3"/>'),
    shield:   s('<path d="M12 2.8 20 6v6c0 4.6-3.2 8-8 9.3C8 20 4.8 16.6 4.8 12V6l7.2-3.2z"/><path d="m9 12 2.2 2.2L15.2 10"/>'),
    server:   s('<rect x="3" y="3.5" width="18" height="7" rx="2"/><rect x="3" y="13.5" width="18" height="7" rx="2"/><path d="M7 7h.01M7 17h.01"/>'),
    chart:    s('<path d="M3.5 20.5h17"/><path d="M6.5 20.5V12M11 20.5V6.5M15.5 20.5v-6M20 20.5V9.5"/>'),
    activity: s('<path d="M2.5 12.5h4l2.5-7 4.5 13 2.5-6h5.5"/>'),
    cpu:      s('<rect x="7" y="7" width="10" height="10" rx="1.6"/><rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M9.5 1.8v1.7M14.5 1.8v1.7M9.5 20.5v1.7M14.5 20.5v1.7M1.8 9.5h1.7M1.8 14.5h1.7M20.5 9.5h1.7M20.5 14.5h1.7"/>'),
    lock:     s('<rect x="4.5" y="10" width="15" height="10.5" rx="2.5"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/>'),
    zap:      s('<path d="M13.5 2.5 4.8 13.2h6l-.3 8.3 8.7-10.7h-6l.3-8.3z"/>'),
    route:    s('<circle cx="5.5" cy="5.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/><path d="M8 5.5h5.5a4 4 0 0 1 0 8H10a4 4 0 0 0 0 8h6"/>'),
    plug:     s('<path d="M9 2.5v6M15 2.5v6"/><path d="M6.5 8.5h11v3.2a5.5 5.5 0 0 1-11 0V8.5z"/><path d="M12 17.2v4.3"/>'),
    database: s('<ellipse cx="12" cy="5.8" rx="7.8" ry="3.3"/><path d="M4.2 5.8v12.4c0 1.8 3.5 3.3 7.8 3.3s7.8-1.5 7.8-3.3V5.8"/><path d="M4.2 12c0 1.8 3.5 3.3 7.8 3.3s7.8-1.5 7.8-3.3"/>'),
    sliders:  s('<path d="M4 6.5h9M17 6.5h3M4 17.5h3M11 17.5h9M4 12h16"/><circle cx="15" cy="6.5" r="2"/><circle cx="9" cy="17.5" r="2"/>'),
    target:   s('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>'),
    trend:    s('<path d="M3 16.5 9 10l4 4 7.5-8"/><path d="M15.5 6h5v5"/>'),
    headset:  s('<path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2"/><rect x="2.5" y="13.5" width="4" height="6.5" rx="1.8"/><rect x="17.5" y="13.5" width="4" height="6.5" rx="1.8"/><path d="M19.5 20a3 3 0 0 1-3 2.2H13"/>'),
    gift:     s('<rect x="3" y="9" width="18" height="11.5" rx="2"/><path d="M2.5 9h19M12 9v11.5"/><path d="M12 9S10.5 3.5 7.8 3.5a2.2 2.2 0 0 0 0 4.4M12 9s1.5-5.5 4.2-5.5a2.2 2.2 0 0 1 0 4.4"/>'),
    doc:      s('<path d="M14 2.8H7a2 2 0 0 0-2 2v14.4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7.8l-5-5z"/><path d="M13.8 3v5h5M8.5 13h7M8.5 17h5"/>'),
    code:     s('<path d="m8.5 8-5 4 5 4M15.5 8l5 4-5 4M13.8 4.2l-3.6 15.6"/>'),
    scale:    s('<path d="M12 3.5v17M6 6.2l12-1.8M20.5 20.5h-17"/><path d="m6 6.5-3 6.2a3.3 3.3 0 0 0 6 0L6 6.5zM18 4.8l-3 6.2a3.3 3.3 0 0 0 6 0l-3-6.2z"/>'),
    clock:    s('<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.3l3.4 2"/>'),
    building: s('<path d="M3.5 20.5h17M5.5 20.5V5a1.5 1.5 0 0 1 1.5-1.5h6A1.5 1.5 0 0 1 14.5 5v15.5M14.5 10h3a1.5 1.5 0 0 1 1.5 1.5v9"/><path d="M8.5 7.5h3M8.5 11h3M8.5 14.5h3"/>')
  };
})();
