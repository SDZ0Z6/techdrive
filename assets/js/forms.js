/* ==========================================================================
   Tech Drive — form handling
   --------------------------------------------------------------------------
   Full client-side validation plus the success state, for all three forms
   (Demo, Contact, API documentation).

   There is no back end yet. While config.forms.endpoint is empty the form
   runs in UI-only mode: it validates completely, then hands the visitor the
   live channels (Telegram / email / clipboard) with their details already
   composed — it never claims a submission was sent when it was not.

   Set config.forms.endpoint to a POST URL and the same forms switch to real
   submission. Nothing else needs to change.
   ========================================================================== */

(function () {
  'use strict';

  const CFG = window.TD_CONFIG;
  const M   = window.TD_CONTENT_EN.forms;

  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
  const FREE  = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com',
                 'icloud.com', 'aol.com', 'proton.me', 'protonmail.com', 'qq.com',
                 '163.com', '126.com', 'msn.com', 'mail.com', 'yandex.com'];

  /* --------------------------------------------------------- validation */

  function setError(field, msg) {
    field.classList.add('is-err');
    const el = $('.err', field);
    if (el) el.textContent = msg;
  }
  function clearError(field) {
    field.classList.remove('is-err');
  }

  function validateControl(el) {
    const field = el.closest('.field') || el.closest('.check')?.parentElement;
    if (!field) return true;
    const v = (el.value || '').trim();

    if (el.type === 'checkbox') {
      if (el.required && !el.checked) { setError(field, M.consent); return false; }
      clearError(field); return true;
    }
    if (el.required && !v) { setError(field, M.required); return false; }

    if (el.type === 'email' && v) {
      if (!EMAIL.test(v)) { setError(field, M.invalidEmail); return false; }
      // Non-blocking nudge towards a business address.
      const dom = v.split('@')[1].toLowerCase();
      field.classList.toggle('is-warn', FREE.indexOf(dom) >= 0);
      const w = $('.warn-soft', field);
      if (w) w.textContent = M.freeEmail;
    }
    if (el.type === 'tel' && v && !/^\+[\d\s()-]{7,}$/.test(v)) {
      setError(field, M.invalidPhone); return false;
    }
    clearError(field);
    return true;
  }

  /** Demo form rule: Telegram or phone, at least one (spec §7.1). */
  function validateReachable(form) {
    if (!form.hasAttribute('data-need-contact')) return true;
    const tg = $('[name="telegram"]', form);
    const ph = $('[name="phone"]', form);
    if (!tg || !ph) return true;
    const ok = !!(tg.value.trim() || ph.value.trim());
    const field = tg.closest('.field');
    ok ? clearError(field) : setError(field, M.contactNeeded);
    return ok;
  }

  /* ----------------------------------------------------------- payload */

  function collect(form) {
    const out = {};
    $$('input,select,textarea', form).forEach((el) => {
      if (!el.name) return;
      out[el.name] = el.type === 'checkbox' ? el.checked : el.value.trim();
    });
    return out;
  }

  function labelFor(form, name) {
    const el = $('[name="' + name + '"]', form);
    const lab = el && (el.closest('.field') || {}).querySelector
      ? $('label', el.closest('.field')) : null;
    return lab ? lab.textContent.replace(/\*$/, '').trim() : name;
  }

  function asText(form, data) {
    const lines = ['Tech Drive — ' + (form.dataset.formName || 'enquiry'), ''];
    Object.keys(data).forEach((k) => {
      if (k === 'consent' || data[k] === '' || data[k] === false) return;
      lines.push(labelFor(form, k) + ': ' + data[k]);
    });
    return lines.join('\n');
  }

  /* ------------------------------------------------------ success state */

  function showSuccess(form, text) {
    const ok = $('#' + form.dataset.success);
    if (!ok) return;

    // UI-only mode: give the visitor the live channels, pre-composed.
    const box = $('[data-channels]', ok);
    if (box && !CFG.forms.endpoint) {
      const subject = encodeURIComponent('Tech Drive — ' + (form.dataset.formName || 'enquiry'));
      const body    = encodeURIComponent(text);
      box.innerHTML =
        '<div class="btn-row" style="justify-content:center">' +
          '<a class="btn btn-pri" href="' + CFG.contact.telegramUrl + '" target="_blank" ' +
            'rel="noopener">' + window.TD_ICONS.telegram + ' Message ' +
            CFG.contact.telegram + '</a>' +
          '<a class="btn btn-ghost" href="mailto:' + CFG.contact.sales +
            '?subject=' + subject + '&body=' + body + '">Send by email</a>' +
          '<button class="btn btn-quiet" type="button" data-copy>Copy my details</button>' +
        '</div>';
      const btn = $('[data-copy]', box);
      btn.addEventListener('click', () => {
        const done = () => { btn.textContent = 'Copied'; setTimeout(() => {
          btn.textContent = 'Copy my details'; }, 2000); };
        if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done);
        else {
          const ta = document.createElement('textarea');
          ta.value = text; document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); } catch (e) { /* ignore */ }
          document.body.removeChild(ta); done();
        }
      });
    }

    form.classList.add('is-hidden');
    // Hide the form's own heading/intro too, so the success panel stands alone.
    const head = form.parentElement && form.parentElement.querySelector('[data-form-head]');
    if (head) head.hidden = true;
    ok.classList.add('is-on');
    ok.setAttribute('tabindex', '-1');
    ok.focus();
    ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /* ------------------------------------------------------------ wire up */

  function wire(form) {
    const submit = $('[type="submit"]', form);
    const label  = submit ? submit.textContent : '';

    $$('input,select,textarea', form).forEach((el) => {
      el.addEventListener('blur', () => validateControl(el));
      el.addEventListener('input', () => {
        const f = el.closest('.field');
        if (f && f.classList.contains('is-err')) validateControl(el);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let ok = true;
      $$('input,select,textarea', form).forEach((el) => {
        if (!validateControl(el)) ok = false;
      });
      if (!validateReachable(form)) ok = false;

      if (!ok) {
        const bad = $('.field.is-err', form);
        if (bad) {
          bad.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const c = $('input,select,textarea', bad);
          if (c) c.focus({ preventScroll: true });
        }
        return;
      }

      const data = collect(form);
      data._form = form.dataset.formName || 'enquiry';
      data._page = location.pathname;
      const text = asText(form, data);

      // No endpoint configured — hand over to the live channels instead.
      if (!CFG.forms.endpoint) { showSuccess(form, text); return; }

      if (submit) { submit.disabled = true; submit.textContent = M.sending; }
      fetch(CFG.forms.endpoint, {
        method: CFG.forms.method || 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then((r) => {
          if (r.status === 429) throw new Error('rate');
          if (!r.ok) throw new Error('http');
          showSuccess(form, text);
        })
        .catch((err) => {
          const note = $('[data-form-error]', form);
          if (note) {
            note.textContent = err.message === 'rate' ? M.rateLimited : M.failed;
            note.style.display = 'block';
          }
        })
        .finally(() => {
          if (submit) { submit.disabled = false; submit.textContent = label; }
        });
    });
  }

  function init() {
    const forms = $$('form[data-form-name]');
    if (!forms.length) return;
    forms.forEach(wire);
    if (!CFG.forms.endpoint) {
      console.warn('%cTech Drive · forms', 'color:#F5C04A;font-weight:700',
        '\nNo submit endpoint configured — forms are in UI-only mode.' +
        '\nSet TD_CONFIG.forms.endpoint in assets/js/config.js before launch.');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
