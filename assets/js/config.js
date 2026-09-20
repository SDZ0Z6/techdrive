/* ==========================================================================
   Tech Drive — site configuration
   --------------------------------------------------------------------------
   Every company fact, metric and contact detail on the site is read from this
   file. Nothing is hard-coded into a page. Change a value here and it updates
   everywhere it appears.

   Fields marked TODO are still pending from Tech Drive. Any unfilled value
   renders as a bright amber [[TOKEN]] marker so it cannot be shipped by
   accident, and the console lists what is outstanding on every page load.
   See PENDING.md in the project root.
   ========================================================================== */

window.TD_CONFIG = {

  site: {
    name: 'Tech Drive',
    domain: 'techdrivemy.com',
    url: 'https://techdrivemy.com',
    copyrightYear: 2026,
    // 1-sentence descriptor — reused verbatim in meta tags, OG cards and
    // directory listings (copy deck §1.1).
    descriptor: 'Tech Drive is a licensed B2B iGaming platform provider. We build and ' +
                'operate our own technology — white label, turnkey, and game aggregation — ' +
                'for operators across Asia-Pacific.'
  },

  /* --- Registered entity -------------------------------------------------
     NOT DISPLAYED ON THE SITE. Kept here for internal reference only.
     The place of incorporation is deliberately not published anywhere —
     no page, footer, or legal document references it. Do not add
     [[COMPANY_REG_NO]] / [[COMPANY_COUNTRY]] / [[COMPANY_STATE]] to a page.
     ---------------------------------------------------------------------- */
  company: {
    legalName:    'Tech Drive Sdn. Bhd.',
    regNo:        '1543309M',
    regNoNew:     '202301049395',
    incorporated: '2023-12-12',
    state:        'Wilayah Persekutuan',
    country:      'Malaysia',
    yearFounded:  '2023'
  },

  /* --- Legal ------------------------------------------------------------- */
  legal: {
    // Name shown on /privacy and /terms as the operator of this website, and
    // in the footer licence line. Defaults to the licence-holding entity once
    // licence.entity is set; otherwise the trading name is used.
    entityName:   '',   // optional override
    // TODO: confirm with counsel — must match the entity that contracts with
    // clients. Shown in /terms section 11.
    governingLaw: ''
  },

  /* --- Gaming licence ---------------------------------------------------- */
  /* TODO: supplied separately by Tech Drive. Until `number` is filled the
     footer licence line and the /compliance licence block stay hidden and the
     trust-bar item falls back to the registered-entity credential.          */
  licence: {
    entity:       '',   // TODO — licence holder, if not Tech Drive Sdn. Bhd.
    authority:    '',   // TODO — issuing authority
    number:       '',   // TODO — as printed on the certificate
    jurisdiction: '',   // TODO — jurisdiction of issue
    verifyUrl:    ''    // TODO — public verification link, if the authority offers one
  },

  /* --- Figures quoted across the site ------------------------------------ */
  /* Editorial rule (copy deck §"Editorial rules", 5): every number here must
     be defensible in a sales call.                                          */
  metrics: {
    providerCount:      '200+',
    gameCount:          '10,000+',
    uptimeSla:          '99.9%',
    mitigationCapacity: '1 Tbps',
    engTeamSize:        '20+',   // TODO — in-house engineering headcount
    responseSla:        '15 minutes'    // TODO — support first-response target, e.g. "15 minutes"
  },

  contact: {
    sales:       'sales@techdrivemy.com',
    support:     'support@techdrivemy.com',
    telegram:    '@TechDriveMY',
    telegramUrl: 'https://t.me/TechDriveMY',
    phone:       '+60 11 2424 4888',
    phoneHref:   '+601124244888',
    office:      null   // TODO — set to an address string to show it on /contact
  },

  /* --- About › milestones ------------------------------------------------ */
  /* TODO: pending. While empty, the timeline section is not rendered.       */
  milestones: [
    // { year: '2023', text: 'Tech Drive Sdn. Bhd. incorporated in Kuala Lumpur.' },
  ],

  /* --- Forms ------------------------------------------------------------- */
  /* No back end yet. `endpoint` empty  => UI-only mode: the form validates in
     full, shows its success state, and offers Telegram / email as the live
     channel. Fill `endpoint` with a POST URL to switch the whole site over —
     no other change needed.                                                 */
  forms: {
    endpoint: '',
    method:   'POST',
    // Bot protection placeholder. Load Cloudflare Turnstile (or equivalent)
    // and set the site key here; the widget mounts into [data-captcha].
    captchaSiteKey: ''
  },

  /* --- Feature switches -------------------------------------------------- */
  flags: {
    // Third-party operator marks shown as anonymised, illustrative theme
    // examples only — not presented as clients. Flip to true and add
    // attribution once written permission is held.
    operatorMarksAreClients: false,
    // Set true when provider logo files with confirmed trademark permission
    // replace the text wordmark wall on /games.
    providerLogoFiles: false
  },

  /* --- i18n -------------------------------------------------------------- */
  /* EN only for now. Add 'zh' here and drop assets/js/content/zh.js beside
     en.js to switch the language picker on — no page changes required.      */
  locales: [
    { code: 'en', label: 'EN', name: 'English', default: true }
  ]
};
