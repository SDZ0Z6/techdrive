/* ==========================================================================
   Tech Drive — English content (default locale)
   --------------------------------------------------------------------------
   Copy for every shared element: navigation, footer, the universal CTA band,
   the Telegram button, the cookie notice and all form microcopy. Page body
   copy lives in each page's HTML, tagged with data-i18n keys so a translation
   file can swap it without touching markup.

   To add a language: copy this file to zh.js, translate the values, register
   the locale in config.js. Nothing else changes.
   ========================================================================== */

window.TD_CONTENT_EN = {

  /* --- Navigation (copy deck §1.2) --------------------------------------- */
  nav: {
    items: [
      {
        label: 'Solutions', href: 'solutions/',
        children: [
          { label: 'White Label',      href: 'solutions/white-label.html', desc: 'Launch under our licence' },
          { label: 'Turnkey',          href: 'solutions/turnkey.html',     desc: 'Your licence, full ownership' },
          { label: 'API & Aggregation',href: 'solutions/api.html',         desc: 'Content for existing platforms' },
          { label: 'Compare Solutions',href: 'solutions/compare.html',     desc: 'Side by side' }
        ]
      },
      {
        label: 'Platform', href: 'platform/',
        children: [
          { label: 'Front-End & Apps',        href: 'platform/frontend.html',      desc: 'Web, native apps and H5' },
          { label: 'Back Office & Agents',    href: 'platform/back-office.html',   desc: 'Where the operation runs' },
          { label: 'Payments',                href: 'platform/payments.html',      desc: 'Routing, automation, reconciliation' },
          { label: 'Infrastructure & Security',href:'platform/infrastructure.html', desc: 'Anti-DDoS, CDN, failover' },
          { label: 'Operations & Growth',     href: 'platform/operations.html',    desc: 'Analytics, CRM, affiliates' }
        ]
      },
      { label: 'Games', href: 'games.html' },
      {
        label: 'Company', href: null,
        children: [
          { label: 'About',                  href: 'about.html',      desc: 'We build the platform we sell' },
          { label: 'Licensing & Compliance', href: 'compliance.html', desc: 'What we hold, what sits with you' }
        ]
      },
      { label: 'Contact', href: 'contact.html' }
    ],
    cta: { label: 'Request a Demo', href: 'demo.html' },
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    skip: 'Skip to content'
  },

  /* --- Universal CTA band (copy deck §1.3) ------------------------------- */
  ctaBand: {
    heading: 'Ready to see the back office?',
    body: "Tell us what you're building. A solutions specialist will walk you through a " +
          'live environment — not a slide deck.',
    primary:   { label: 'Request a Demo',        href: 'demo.html' },
    secondary: { label: 'Message us on Telegram', href: '@telegram' }
  },

  /* --- Floating Telegram button (copy deck §1.4) ------------------------- */
  telegram: {
    label: 'Chat to Tech Drive',
    aria:  'Chat to Tech Drive on Telegram'
  },

  /* --- Footer (copy deck §1.5) ------------------------------------------- */
  footer: {
    tagline: 'Licensed. Proprietary. Built for Asia-Pacific.',
    columns: [
      {
        heading: 'Solutions',
        links: [
          { label: 'White Label',       href: 'solutions/white-label.html' },
          { label: 'Turnkey',           href: 'solutions/turnkey.html' },
          { label: 'API & Aggregation', href: 'solutions/api.html' },
          { label: 'Compare Solutions', href: 'solutions/compare.html' }
        ]
      },
      {
        heading: 'Platform',
        links: [
          { label: 'Front-End & Apps',         href: 'platform/frontend.html' },
          { label: 'Back Office & Agents',     href: 'platform/back-office.html' },
          { label: 'Payments',                 href: 'platform/payments.html' },
          { label: 'Infrastructure & Security',href: 'platform/infrastructure.html' },
          { label: 'Operations & Growth',      href: 'platform/operations.html' }
        ]
      },
      {
        heading: 'Company',
        links: [
          { label: 'About',                  href: 'about.html' },
          { label: 'Licensing & Compliance', href: 'compliance.html' },
          { label: 'Game Portfolio',         href: 'games.html' },
          { label: 'Responsible Gaming',     href: 'responsible-gaming.html' },
          { label: 'Privacy Policy',         href: 'privacy.html' },
          { label: 'Terms of Service',       href: 'terms.html' }
        ]
      }
    ],
    contactHeading: 'Contact',
    contactLabels: { sales: 'Sales', support: 'Support', telegram: 'Telegram', phone: 'Phone' },
    supportBadge: '24/7 technical support',

    // Bottom bar — mandatory, do not shorten (copy deck §1.5).
    licenceLine: '[[LEGAL_ENTITY]] is licensed by [[LICENCE_AUTHORITY]] under licence ' +
                 'no. [[LICENCE_NUMBER]] ([[LICENCE_JURISDICTION]]).',
    disclaimer: 'Tech Drive is a business-to-business technology provider. We do not ' +
                'operate gambling services and do not accept players directly. Our clients ' +
                'are solely responsible for holding every licence, permit and authorisation ' +
                'required in the markets they serve, and for complying with all applicable ' +
                'laws in those markets.',
    ageNotice: '18+',
    ageNoticeLabel: 'Strictly for persons aged 18 and over',
    copyright: '© [[COPYRIGHT_YEAR]] Tech Drive. All rights reserved.'
  },

  /* --- Cookie notice (copy deck §14.5) ----------------------------------- */
  cookies: {
    body: "We use cookies to operate this site and understand how it's used. See our ",
    policyLabel: 'Privacy Policy',
    policyHref: 'privacy.html',
    accept: 'Accept',
    essential: 'Essential only'
  },

  /* --- Form microcopy (copy deck §14.1, §14.2) --------------------------- */
  forms: {
    required:      'This field is required.',
    invalidEmail:  'Please enter a valid email address.',
    freeEmail:     'A business email helps us route your enquiry faster.',
    invalidPhone:  'Please include your country code, e.g. +60.',
    consent:       'Please confirm before submitting.',
    failed:        'Something went wrong. Please try again, or message us on Telegram at @TechDriveMY.',
    rateLimited:   'Too many submissions. Please wait a moment and try again.',
    contactNeeded: 'Give us at least one of Telegram or phone so we can reach you.',
    sending:       'Sending…',
    // Shown while config.forms.endpoint is empty (no back end connected yet).
    offlineNote:   'Submitting opens Telegram with your details filled in — the fastest ' +
                   'way to reach us. You can also email them to ',
    offlineOpen:   'Open Telegram with my details'
  },

  misc: {
    loadingProviders: 'Loading providers…',
    noProviderMatch:  'No providers match that filter. Try another category.',
    backToTop:        'Back to top'
  }
};
