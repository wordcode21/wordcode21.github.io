/* ============================================================================
 * PORTFOLIO — behaviour layer
 * ----------------------------------------------------------------------------
 * Vanilla JS, no dependencies. Everything the page shows is built from
 * window.PORTFOLIO (assets/js/data.js).
 *
 * Data note: all content is inserted with textContent / createElement, never
 * with innerHTML. The only innerHTML use is for the static icon constants
 * below, which are author-controlled and never touch user input. If you add a
 * CMS or an API to this site, keep it that way — that is the whole ballgame
 * with stored XSS.
 * ========================================================================== */

(function () {
  'use strict';

  var root = document.documentElement;
  var data = window.PORTFOLIO;

  /* Safety net: if data.js failed to load, show everything rather than a
     page full of elements stuck at opacity 0. */
  if (!data) {
    root.classList.add('reveal-all');
    console.error('[portfolio] data.js did not load — nothing to render.');
    return;
  }

  /* ------------------------------------------------------------ helpers */

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;   // never innerHTML for data
    return node;
  }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer  = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* Timer bookkeeping so a language switch can cancel in-flight animations. */
  var timers = [];
  function later(fn, ms) { var id = setTimeout(fn, ms); timers.push(id); return id; }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }

  /* --------------------------------------------------------------- state */

  var stored = null;
  try { stored = localStorage.getItem('pf-lang'); } catch (e) { /* private mode */ }
  var lang = stored === 'en' || stored === 'id'
    ? stored
    : ((navigator.language || '').toLowerCase().indexOf('id') === 0 ? 'id' : 'en');

  var storedTheme = null;
  try { storedTheme = localStorage.getItem('pf-theme'); } catch (e) { /* ignore */ }
  if (storedTheme === 'light' || storedTheme === 'dark') root.dataset.theme = storedTheme;

  /* Pick the right string out of a {en, id} object. Plain strings pass through. */
  function t(value) {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    return value[lang] != null ? value[lang] : (value.en != null ? value.en : '');
  }
  function dict(key) {
    var table = data.i18n[lang] || data.i18n.en;
    return table[key] != null ? table[key] : (data.i18n.en[key] != null ? data.i18n.en[key] : key);
  }

  /* --------------------------------------------------------------- icons */
  /* Author-controlled constants only. `filled` icons are brand marks. */
  var ICONS = {
    github: { filled: true, body: '<path d="M12 2.2a9.8 9.8 0 0 0-3.1 19.1c.5.1.7-.2.7-.5v-1.9c-2.7.6-3.3-1.2-3.3-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.4-2.2-.3-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.2-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.4.1 2.6.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.5 4.9.4.4.7 1 .7 2.1v3c0 .3.2.6.7.5A9.8 9.8 0 0 0 12 2.2z"/>' },
    linkedin: { filled: true, body: '<path d="M6.94 5.5a2.44 2.44 0 1 1-4.88 0 2.44 2.44 0 0 1 4.88 0zM2.4 9.2h4.2V21H2.4zM9.6 9.2h4v1.62h.06c.56-.98 1.93-2 3.97-2 4.24 0 5.02 2.6 5.02 5.98V21h-4.2v-5.3c0-1.27-.02-2.9-1.86-2.9-1.86 0-2.15 1.38-2.15 2.81V21H9.6z"/>' },
    x: { filled: true, body: '<path d="M17.53 3h3.2l-6.99 7.99L22 21h-6.44l-5.04-6.6L4.75 21H1.54l7.48-8.55L2 3h6.6l4.56 6.03zM16.4 19.1h1.77L7.7 4.8H5.8z"/>' },
    mail: { body: '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M4.2 7.6l6.9 4.9a2 2 0 0 0 2.3 0l6.9-4.9"/>' },
    code: { body: '<path d="M9 18l-6-6 6-6M15 6l6 6-6 6"/>' },
    shield: { body: '<path d="M12 2.8l7.5 3v5.6c0 4.6-3.1 8.8-7.5 10.2-4.4-1.4-7.5-5.6-7.5-10.2V5.8z"/><path d="M8.8 12.1l2.3 2.3 4.2-4.4"/>' },
    search: { body: '<circle cx="11" cy="11" r="6.2"/><path d="M15.6 15.6L21 21"/>' },
    arrow: { body: '<path d="M5 12h13M13 6l6 6-6 6"/>' },
    external: { body: '<path d="M14 4.5h5.5V10M19.5 4.5L11 13M17.5 14v4.5a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2H10"/>' },
    check: { body: '<path d="M4.5 12.5l5 5L20 6.5"/>' },
    globe: {body: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.4 2.5 3.6 5.5 3.6 9s-1.2 6.5-3.6 9c-2.4-2.5-3.6-5.5-3.6-9S9.6 5.5 12 3z"/>'},
    server: {body: '<rect x="4" y="3" width="16" height="5" rx="1"/><rect x="4" y="10" width="16" height="5" rx="1"/><rect x="4" y="17" width="16" height="4" rx="1"/><path d="M8 5.5h.01M8 12.5h.01M8 19h.01"/><path d="M12 5.5h5M12 12.5h5M12 19h5"/>'},
    services: {body: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.2 2.2-2.8-2.8z"/><path d="M17 4l3 3"/><path d="M19 15l1.5 1.5"/><path d="M16.5 18.5L18 20"/>'
}
  };

  function iconEl(name) {
    var def = ICONS[name];
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.classList.add('ico');
    if (def && def.filled) svg.classList.add('ico-brand');
    svg.innerHTML = def ? def.body : '';
    return svg;
  }

  /* ------------------------------------------------------------ toasts */

  var toastHost = $('#toasts');

  function toast(message, kind) {
    if (!toastHost) return;
    var node = el('div', 'toast' + (kind ? ' toast-' + kind : ''));
    node.appendChild(iconEl(kind === 'error' ? 'external' : 'check'));
    node.appendChild(el('span', null, message));
    toastHost.appendChild(node);

    requestAnimationFrame(function () { node.classList.add('in'); });

    later(function () {
      node.classList.remove('in');
      later(function () { if (node.parentNode) node.parentNode.removeChild(node); }, 320);
    }, 3600);
  }

  /* ================================================================ i18n */

  function applyI18n() {
    root.lang = lang;

    $$('[data-i18n]').forEach(function (node) {
      var value = dict(node.dataset.i18n);
      if (value) node.textContent = value;
    });

    /* data-i18n-attr="placeholder:key,aria-label:key2" */
    $$('[data-i18n-attr]').forEach(function (node) {
      node.dataset.i18nAttr.split(',').forEach(function (pair) {
        var bits = pair.split(':');
        if (bits.length !== 2) return;
        var value = dict(bits[1].trim());
        if (value) node.setAttribute(bits[0].trim(), value);
      });
    });

    document.title = data.owner.name + ' — ' + t(data.owner.title || { en: 'Web Developer & Security Engineer', id: 'Web Developer & Security Engineer' });
    var metaDesc = $('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', dict('hero_lead'));

    var label = $('#langLabel');
    if (label) label.textContent = lang === 'id' ? 'EN' : 'ID';   // shows the *other* language
    var langBtn = $('#langToggle');
    if (langBtn) langBtn.setAttribute('aria-label', lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia');
  }

  /* ============================================================ render */

  function socialLinks(container, className) {
    if (!container) return;
    container.textContent = '';
    data.socials.forEach(function (item) {
      var link = el('a', className || 'social-link');
      link.href = item.url;
      link.title = item.label;
      link.setAttribute('aria-label', item.label);
      /* noopener: never hand window.opener to a third-party page */
      if (/^https?:/i.test(item.url)) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      link.appendChild(iconEl(item.icon));
      container.appendChild(link);
    });
  }

  /* Brand mark: the owner's logo image when one is set, initials otherwise. */
  function paintBrandMark(node, initials) {
    node.textContent = '';

    if (!data.owner.logo) {
      node.classList.remove('has-image');
      node.textContent = initials;
      return;
    }

    node.classList.add('has-image');
    var img = el('img');
    img.src = data.owner.logo;
    img.alt = '';              // decorative — the name always sits next to it
    img.decoding = 'async';
    node.appendChild(img);
  }

  function renderIdentity() {
    var initials = data.owner.initials || data.owner.name.split(/\s+/)
      .map(function (word) { return word.charAt(0); })
      .join('')
      .slice(0, 2)
      .toUpperCase();

    ['#brandMark', '#footerMark'].forEach(function (sel) {
      var node = $(sel);
      if (node) paintBrandMark(node, initials);
    });
    ['#brandName', '#footerName', '#footerOwner', '#heroName'].forEach(function (sel) {
      var node = $(sel);
      if (node) node.textContent = data.owner.name;
    });

    var handle = $('#footerHandle');
    if (handle) {
      handle.textContent = data.owner.handle ? '@' + data.owner.handle : '';
      handle.hidden = !data.owner.handle;
    }

    /* A logo is the natural favicon too, so it travels with the mark. */
    if (data.owner.logo) {
      var icon = $('link[rel="icon"]');
      if (icon) icon.href = data.owner.logo;
    }

    var email = $('#contactEmail');
    if (email) { email.textContent = data.owner.email; email.href = 'mailto:' + data.owner.email; }
    var loc = $('#contactLocation');
    if (loc) loc.textContent = data.owner.location;

    var year = $('#year');
    if (year) year.textContent = String(new Date().getFullYear());

    var termTitle = $('#terminalTitle');
    if (termTitle) termTitle.textContent = data.terminal.title;

    socialLinks($('#heroSocials'), 'social-link');
    socialLinks($('#contactSocials'), 'social-link');
    socialLinks($('#footerSocials'), 'social-link social-link-sm');
  }

  function categoryLabel(id) {
    var found = data.categories.filter(function (c) { return c.id === id; })[0];
    return found ? t(found.label) : id;
  }

  function renderProjects() {
    var grid = $('#projectsGrid');
    var filters = $('#projectFilters');
    if (!grid || !filters) return;

    grid.textContent = '';
    filters.textContent = '';

    /* --- filter buttons --- */
    data.categories.forEach(function (cat, index) {
      var btn = el('button', 'filter-btn' + (index === 0 ? ' is-active' : ''), t(cat.label));
      btn.type = 'button';
      btn.dataset.filter = cat.id;
      btn.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
      filters.appendChild(btn);
    });

    /* --- cards --- */
    data.projects.forEach(function (project, index) {
      var card = el('article', 'project-card reveal');
      card.dataset.category = project.category;
      card.dataset.projectId = project.id;

      var open = el('button', 'card-open');
      open.type = 'button';
      var titleId = 'ptitle-' + project.id;
      open.setAttribute('aria-labelledby', titleId);

      var cover = el('div', 'card-cover');
      cover.dataset.cover = String(project.cover || (index % 6) + 1);

      if (project.image) {
        var img = el('img', 'card-cover-img');
        img.src = project.image;
        img.alt = '';
        img.loading = 'lazy';
        img.decoding = 'async';
        cover.appendChild(img);
      } else {
        /* No screenshot yet: show the project initial as a designed fallback. */
        cover.appendChild(el('span', 'cover-glyph', project.title.charAt(0).toUpperCase()));
      }
      cover.appendChild(el('span', 'cover-year', project.year));
      open.appendChild(cover);

      var body = el('div', 'card-body');
      var top = el('div', 'card-top');
      var heading = el('h3', 'card-title', project.title);
      heading.id = titleId;
      top.appendChild(heading);
      top.appendChild(el('span', 'card-cat', categoryLabel(project.category)));
      body.appendChild(top);

      body.appendChild(el('p', 'card-summary', t(project.summary)));

      var more = el('span', 'card-more');
      more.appendChild(el('span', null, dict('project_open')));
      more.appendChild(iconEl('arrow'));
      body.appendChild(more);

      open.appendChild(body);
      card.appendChild(open);

      if (project.tags && project.tags.length) {
        var tags = el('div', 'card-tags');
        project.tags.forEach(function (tag) { tags.appendChild(el('span', 'tag', tag)); });
        card.appendChild(tags);
      }

      grid.appendChild(card);
    });

    /* Filter behaviour — the container survives re-renders, so bind once. */
    if (filters.dataset.bound) return;

    filters.dataset.bound = '1';
    filters.addEventListener('click', function (event) {
      var btn = event.target.closest('.filter-btn');
      if (!btn) return;

      $$('.filter-btn', filters).forEach(function (other) {
        var on = other === btn;
        other.classList.toggle('is-active', on);
        other.setAttribute('aria-pressed', on ? 'true' : 'false');
      });

      applyFilter(btn.dataset.filter);
    });

    applyFilter('all');
  }

  function applyFilter(category) {
    var visible = 0;

    $$('#projectsGrid .project-card').forEach(function (card) {
      var show = category === 'all' || card.dataset.category === category;

      if (show) {
        visible++;
        if (card.hidden) {
          card.hidden = false;
          /* let the browser paint the un-hidden state before animating back in */
          void card.offsetWidth;
        }
        card.classList.remove('is-out');
        card.classList.add('in');   // already in view during a filter click
      } else if (!card.hidden) {
        card.classList.add('is-out');
        later(function () {
          if (card.classList.contains('is-out')) card.hidden = true;
        }, reduceMotion ? 0 : 200);
      }
    });

    var empty = $('#projectsEmpty');
    if (!visible) {
      if (!empty) {
        empty = el('p', 'empty-note', dict('projects_empty'));
        empty.id = 'projectsEmpty';
        $('#projectsGrid').appendChild(empty);
      }
      empty.textContent = dict('projects_empty');
    } else if (empty && empty.parentNode) {
      empty.parentNode.removeChild(empty);
    }
  }

  function renderServices() {
    var grid = $('#servicesGrid');
    if (!grid) return;
    grid.textContent = '';

    data.services.forEach(function (service) {
      var card = el('article', 'service-card reveal' + (service.featured ? ' is-featured' : ''));

      if (service.featured && service.badge) {
        card.appendChild(el('span', 'service-badge', t(service.badge)));
      }

      var icon = el('span', 'service-icon');
      icon.appendChild(iconEl(service.icon));
      card.appendChild(icon);

      card.appendChild(el('h3', 'service-title', t(service.title)));
      card.appendChild(el('p', 'service-tagline', t(service.tagline)));

      var price = el('div', 'service-price');
      price.appendChild(el('span', 'price-note', t(service.priceNote)));
      price.appendChild(el('span', 'price-amount', service.price));
      card.appendChild(price);

      var list = el('ul', 'service-features');
      (service.features[lang] || service.features.en).forEach(function (feature) {
        var item = el('li');
        item.appendChild(iconEl('check'));
        item.appendChild(el('span', null, feature));
        list.appendChild(item);
      });
      card.appendChild(list);

      var cta = el('a', 'btn ' + (service.featured ? 'btn-primary' : 'btn-ghost') + ' btn-block', t(service.cta));
      cta.href = '#contact';
      card.appendChild(cta);

      grid.appendChild(card);
    });
  }

  function renderStack() {
    var track = $('#stackTrack');
    var track2 = $('#stackTrack2');
    if (!track) return;

    track.textContent = '';
    if (track2) track2.textContent = '';

    var items = data.stack.slice();
    /* Duplicate the list so the CSS translate loop has no visible seam. */
    var doubled = items.concat(items);

    doubled.forEach(function (name) {
      track.appendChild(el('span', 'stack-item', name));
    });
    if (track2) {
      doubled.slice().reverse().forEach(function (name) {
        track2.appendChild(el('span', 'stack-item', name));
      });
    }
  }

  function renderSkills() {
    var host = $('#skillBars');
    if (!host) return;
    host.textContent = '';
    data.skills.forEach(function (skill) {
      var row = el('li', 'skill');
      var head = el('div', 'skill-head');
      head.appendChild(el('span', 'skill-label', t(skill.label)));
      head.appendChild(el('span', 'skill-value', skill.level + '%'));
      row.appendChild(head);

      var bar = el('div', 'skill-bar');
      var fill = el('div', 'skill-fill');
      fill.dataset.level = String(skill.level);
      bar.appendChild(fill);
      row.appendChild(bar);

      host.appendChild(row);
    });
  }

  function renderStats() {
    var host = $('#statsGrid');
    if (!host) return;
    host.textContent = '';
    data.stats.forEach(function (stat) {
      var card = el('div', 'stat reveal');
      var value = el('span', 'stat-value');
      value.dataset.target = String(stat.value);
      value.dataset.suffix = stat.suffix || '';
      value.textContent = '0' + (stat.suffix || '');
      card.appendChild(value);
      card.appendChild(el('span', 'stat-label', t(stat.label)));
      host.appendChild(card);
    });
  }

  function renderTopics() {
    var select = $('#cf-topic');
    if (!select) return;
    select.textContent = '';
    data.contact.topics.forEach(function (topic) {
      var option = el('option', null, t(topic.label));
      option.value = topic.value;
      select.appendChild(option);
    });
  }

  function renderAll() {
    renderIdentity();
    renderProjects();
    renderServices();
    renderStack();
    renderSkills();
    renderStats();
    renderTopics();

    observeOnce($$('#projectsGrid .project-card, #servicesGrid .service-card, #statsGrid .stat'));
    observeCounters($('#statsGrid'));
    observeSkillBars();
  }

  /* ======================================================== animations */

  var revealObserver = null;
  var counterObserver = null;
  var skillObserver = null;

  function observeOnce(nodes) {
    if (!nodes.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      nodes.forEach(function (node) { node.classList.add('in'); });
      return;
    }

    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);   // reveal once, then forget
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    }

    nodes.forEach(function (node) { revealObserver.observe(node); });
  }

  function observeStaticReveals() {
    observeOnce($$('.reveal').filter(function (node) {
      return !node.closest('#projectsGrid, #servicesGrid, #statsGrid');
    }));
  }

  function observeCounters(host) {
    if (!host) return;
    var values = $$('.stat-value', host);
    if (!values.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      values.forEach(function (node) { node.textContent = node.dataset.target + node.dataset.suffix; });
      return;
    }

    /* Re-rendered on language switch: drop the previous observer first. */
    if (counterObserver) counterObserver.disconnect();

    counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        countUp(entry.target);
        counterObserver.unobserve(entry.target);
      });
    }, { threshold: 0.4 });

    values.forEach(function (node) { counterObserver.observe(node); });
  }

  function countUp(node) {
    var target = parseFloat(node.dataset.target) || 0;
    var suffix = node.dataset.suffix || '';
    var duration = 1400;
    var start = null;

    function frame(now) {
      if (start === null) start = now;
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);           // easeOutCubic
      node.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function observeSkillBars() {
    var host = $('#skillBars');
    if (!host) return;
    var fills = $$('.skill-fill', host);
    if (!fills.length) return;

    function run() {
      fills.forEach(function (fill) {
        fill.style.width = fill.dataset.level + '%';
      });
    }

    if (reduceMotion || !('IntersectionObserver' in window)) { run(); return; }

    if (skillObserver) skillObserver.disconnect();

    skillObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        run();
        skillObserver.disconnect();
      });
    }, { threshold: 0.3 });

    skillObserver.observe(host);
  }

  /* ------------------------------------------------- hero: role rotation */

  function rotateRoles() {
    var host = $('#roleFlip');
    if (!host) return;

    var roles = data.roles[lang] || data.roles.en;
    var index = 0;
    host.textContent = roles[0];
    host.classList.remove('is-out');

    if (reduceMotion || roles.length < 2) return;

    function step() {
      later(function () {
        host.classList.add('is-out');
        later(function () {
          index = (index + 1) % roles.length;
          host.textContent = roles[index];
          host.classList.remove('is-out');
          later(step, 2300);
        }, 380);
      }, 2600);
    }
    later(step, 2600);
  }

  /* ------------------------------------------------ hero: terminal typing */

  function typeTerminal() {
    var host = $('#terminalBody');
    if (!host) return;
    host.textContent = '';

    var lines = data.terminal.lines;

    function addLine(kind, text) {
      var line = el('div', 'term-line' + (kind ? ' ' + kind : ''));
      return { node: line, text: text };
    }

    if (reduceMotion) {
      lines.forEach(function (line) {
        var cmd = addLine('term-cmd');
        cmd.node.appendChild(el('span', 'term-prompt', '$'));
        cmd.node.appendChild(el('span', 'term-text', line.cmd));
        host.appendChild(cmd.node);

        var out = addLine('term-out');
        out.node.textContent = line.out;
        host.appendChild(out.node);
      });
      var end = el('div', 'term-line term-cmd');
      end.appendChild(el('span', 'term-prompt', '$'));
      end.appendChild(el('span', 'term-caret'));
      host.appendChild(end);
      return;
    }

    var li = 0;

    function nextCommand() {
      if (li >= lines.length) {
        var end = el('div', 'term-line term-cmd');
        end.appendChild(el('span', 'term-prompt', '$'));
        end.appendChild(el('span', 'term-caret'));
        host.appendChild(end);
        return;
      }

      var line = lines[li];
      var row = el('div', 'term-line term-cmd');
      row.appendChild(el('span', 'term-prompt', '$'));
      var typed = el('span', 'term-text');
      var caret = el('span', 'term-caret');
      row.appendChild(typed);
      row.appendChild(caret);
      host.appendChild(row);

      var i = 0;
      function typeChar() {
        if (i <= line.cmd.length) {
          typed.textContent = line.cmd.slice(0, i);
          i++;
          later(typeChar, 38);
        } else {
          row.removeChild(caret);
          var out = el('div', 'term-line term-out');
          out.textContent = line.out;
          host.appendChild(out);
          requestAnimationFrame(function () { out.classList.add('in'); });
          li++;
          later(nextCommand, 420);
        }
      }
      later(typeChar, 180);
    }

    later(nextCommand, 500);
  }

  /* ---------------------------------------------- pointer-driven effects */

  function initCursorGlow() {
    var glow = $('#cursorGlow');
    if (!glow || !finePointer || reduceMotion) return;

    var targetX = window.innerWidth / 2, targetY = window.innerHeight / 3;
    var x = targetX, y = targetY;
    var active = false;

    window.addEventListener('pointermove', function (event) {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!active) { active = true; glow.classList.add('is-on'); }
    }, { passive: true });

    document.addEventListener('pointerleave', function () {
      active = false;
      glow.classList.remove('is-on');
    });

    (function loop() {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      glow.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
  }

  function initTilt() {
    if (!finePointer || reduceMotion) return;

    $$('[data-tilt], .project-card').forEach(function (node) {
      if (node.dataset.tiltBound) return;
      node.dataset.tiltBound = '1';

      var raf = null;
      var strength = node.classList.contains('project-card') ? 5 : 7;

      node.addEventListener('pointermove', function (event) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = null;
          var box = node.getBoundingClientRect();
          var px = (event.clientX - box.left) / box.width - 0.5;
          var py = (event.clientY - box.top) / box.height - 0.5;
          node.style.transform =
            'perspective(900px) rotateY(' + (px * strength).toFixed(2) + 'deg)' +
            ' rotateX(' + (-py * strength).toFixed(2) + 'deg) translateY(-6px)';
          node.style.setProperty('--mx', ((px + 0.5) * 100).toFixed(1) + '%');
          node.style.setProperty('--my', ((py + 0.5) * 100).toFixed(1) + '%');
        });
      }, { passive: true });

      node.addEventListener('pointerleave', function () {
        node.style.transform = '';
      });
    });
  }

  function initMagnetic() {
    if (!finePointer || reduceMotion) return;

    $$('[data-magnetic]').forEach(function (node) {
      node.addEventListener('pointermove', function (event) {
        var box = node.getBoundingClientRect();
        var dx = (event.clientX - (box.left + box.width / 2)) / box.width;
        var dy = (event.clientY - (box.top + box.height / 2)) / box.height;
        node.style.transform = 'translate(' + (dx * 8).toFixed(1) + 'px,' + (dy * 6).toFixed(1) + 'px)';
      });
      node.addEventListener('pointerleave', function () { node.style.transform = ''; });
    });
  }

  function initHeroParallax() {
    if (!finePointer || reduceMotion) return;
    var hero = $('#hero');
    var floaters = $$('[data-float]');
    if (!hero || !floaters.length) return;

    var raf = null;
    hero.addEventListener('pointermove', function (event) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        var box = hero.getBoundingClientRect();
        var px = (event.clientX - box.left) / box.width - 0.5;
        var py = (event.clientY - box.top) / box.height - 0.5;
        floaters.forEach(function (node, index) {
          var depth = (index + 1) * 14;
          node.style.transform = 'translate3d(' + (-px * depth).toFixed(1) + 'px,' + (-py * depth).toFixed(1) + 'px,0)';
        });
      });
    }, { passive: true });
  }

  /* ========================================================== navigation */

  function initNav() {
    var nav = $('#siteNav');
    var burger = $('#navBurger');
    var menu = $('#mobileMenu');
    var lastY = window.scrollY;

    window.addEventListener('scroll', function () {
      var y = window.scrollY;

      if (nav) {
        nav.classList.toggle('is-stuck', y > 24);
        if (!menu || menu.hidden) {
          var goingDown = y > lastY && y > 320;
          nav.classList.toggle('is-hidden', goingDown);
        }
      }
      lastY = y;
    }, { passive: true });

    if (!burger || !menu) return;

    function setMenu(open) {
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      menu.hidden = !open;
      document.body.classList.toggle('is-locked', open);
      if (open) {
        requestAnimationFrame(function () { menu.classList.add('is-open'); });
      } else {
        menu.classList.remove('is-open');
      }
    }

    burger.addEventListener('click', function () {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });

    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenu(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        burger.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860 && !menu.hidden) setMenu(false);
    });
  }

  function initScrollSpy() {
    var links = $$('[data-spy]');
    if (!links.length || !('IntersectionObserver' in window)) return;

    var sections = links
      .map(function (link) { return document.getElementById(link.dataset.spy); })
      .filter(Boolean);

    if (!sections.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.toggle('is-active', link.dataset.spy === entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (section) { observer.observe(section); });
  }

  function initScrollProgress() {
    /* The bar scales the inner <span>; the outer element is just the fixed
       track. Scaling the track instead leaves the span at its CSS scaleX(0). */
    var track = $('#scrollProgress');
    var bar = track ? $('span', track) : null;
    var toTop = $('#toTop');
    if (!bar && !toTop) return;

    var raf = null;
    function update() {
      raf = null;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (bar) bar.style.transform = 'scaleX(' + ratio.toFixed(4) + ')';
      if (toTop) toTop.classList.toggle('is-on', window.scrollY > 700);
    }

    window.addEventListener('scroll', function () {
      if (!raf) raf = requestAnimationFrame(update);
    }, { passive: true });

    window.addEventListener('resize', update, { passive: true });
    update();

    if (toTop) {
      toTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    }
  }

  /* =============================================================== modal */

  var modalState = { lastFocus: null };

  function initModal() {
    var modal = $('#projectModal');
    if (!modal) return;

    modal.addEventListener('click', function (event) {
      if (event.target.closest('[data-close-modal]')) closeModal();
    });

    document.addEventListener('keydown', function (event) {
      if (modal.hidden) return;

      if (event.key === 'Escape') { closeModal(); return; }

      if (event.key === 'Tab') {
        var focusable = $$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', modal)
          .filter(function (node) { return node.offsetParent !== null; });
        if (!focusable.length) return;

        var first = focusable[0];
        var last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    document.addEventListener('click', function (event) {
      var trigger = event.target.closest('.card-open');
      if (!trigger) return;
      var card = trigger.closest('[data-project-id]');
      if (!card) return;
      openModal(card.dataset.projectId);
    });
  }

  function openModal(projectId) {
    var modal = $('#projectModal');
    var body = $('#modalBody');
    var project = data.projects.filter(function (p) { return p.id === projectId; })[0];
    if (!modal || !body || !project) return;

    modalState.lastFocus = document.activeElement;
    body.textContent = '';

    var meta = el('div', 'modal-meta');
    meta.appendChild(el('span', 'tag tag-accent', categoryLabel(project.category)));
    meta.appendChild(el('span', 'modal-year', project.year));
    body.appendChild(meta);

    var title = el('h2', 'modal-title', project.title);
    title.id = 'modalTitle';
    body.appendChild(title);

    body.appendChild(el('p', 'modal-summary', t(project.summary)));

    var highlights = project.highlights[lang] || project.highlights.en;
    body.appendChild(el('h3', 'modal-sub', dict('project_highlights')));
    var ul = el('ul', 'modal-list');
    highlights.forEach(function (item) {
      var li = el('li');
      li.appendChild(iconEl('check'));
      li.appendChild(el('span', null, item));
      ul.appendChild(li);
    });
    body.appendChild(ul);

    if (project.tags && project.tags.length) {
      body.appendChild(el('h3', 'modal-sub', dict('project_stack')));
      var tags = el('div', 'modal-tags');
      project.tags.forEach(function (tag) { tags.appendChild(el('span', 'tag', tag)); });
      body.appendChild(tags);
    }

    var actions = el('div', 'modal-actions');
    var hasLink = false;

    [['demo', 'project_demo'], ['repo', 'project_repo']].forEach(function (pair) {
      var url = project.links && project.links[pair[0]];
      if (!url) return;
      hasLink = true;
      var link = el('a', 'btn btn-ghost btn-sm');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';   // never leak window.opener
      link.appendChild(el('span', null, dict(pair[1])));
      link.appendChild(iconEl('external'));
      actions.appendChild(link);
    });

    if (!hasLink) actions.appendChild(el('span', 'modal-nolink', dict('project_nolink')));
    body.appendChild(actions);

    modal.hidden = false;
    document.body.classList.add('is-locked');

    /* Focus and the open class must wait for the next frame: calling focus()
       in the same tick as un-hiding the modal does not take effect, and focus
       would silently stay on <body> instead of moving into the dialog. */
    requestAnimationFrame(function () {
      modal.classList.add('is-open');
      var closeBtn = $('.modal-close', modal);
      if (closeBtn) closeBtn.focus();
    });
  }

  function closeModal() {
    var modal = $('#projectModal');
    if (!modal || modal.hidden) return;

    modal.classList.remove('is-open');
    document.body.classList.remove('is-locked');

    later(function () {
      modal.hidden = true;
      if (modalState.lastFocus && modalState.lastFocus.focus) modalState.lastFocus.focus();
    }, reduceMotion ? 0 : 240);
  }

  /* ================================================================ form */

  function initForm() {
    var form = $('#contactForm');
    if (!form) return;

    var rules = {
      name: function (value) { return value.trim().length >= 2 || dict('form_err_name'); },
      email: function (value) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) || dict('form_err_email'); },
      message: function (value) { return value.trim().length >= 10 || dict('form_err_message'); },
    };

    /* form.elements.name would collide with named-property lookups; be explicit. */
    function field(name) { return form.querySelector('[name="' + name + '"]'); }

    function showError(node, message) {
      var slot = $('[data-error-for="' + node.name + '"]', form);
      if (slot) slot.textContent = message || '';
      node.classList.toggle('has-error', Boolean(message));
      node.setAttribute('aria-invalid', message ? 'true' : 'false');
    }

    function validate() {
      var ok = true;
      Object.keys(rules).forEach(function (name) {
        var node = field(name);
        if (!node) return;
        var result = rules[name](node.value);
        if (result === true) {
          showError(node, '');
        } else {
          showError(node, result);
          ok = false;
        }
      });
      return ok;
    }

    form.addEventListener('input', function (event) {
      var node = event.target;
      if (node.name && rules[node.name]) showError(node, '');
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!validate()) {
        var firstBad = $('.has-error', form);
        if (firstBad) firstBad.focus();
        return;
      }

      var button = $('#cfSubmit');
      var payload = {
        name: field('name').value.trim(),
        email: field('email').value.trim(),
        topic: field('topic').value,
        message: field('message').value.trim(),
      };

      /* No endpoint configured: hand off to the visitor's mail client. */
      if (!data.contact.endpoint) {
        var subject = 'Project enquiry — ' + payload.topic;
        var bodyText = payload.message + '\n\n—\n' + payload.name + '\n' + payload.email;
        window.location.href = 'mailto:' + data.owner.email +
          '?subject=' + encodeURIComponent(subject) +
          '&body=' + encodeURIComponent(bodyText);
        toast(dict('toast_mailto'));
        return;
      }

      var original = button.innerHTML;
      button.disabled = true;
      button.textContent = dict('form_sending');

      fetch(data.contact.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(function (response) {
          if (!response.ok) throw new Error('HTTP ' + response.status);
          toast(dict('toast_sent'));
          form.reset();
        })
        .catch(function (error) {
          console.error('[portfolio] form submit failed:', error);
          toast(dict('toast_error'), 'error');
        })
        .then(function () {
          button.disabled = false;
          button.innerHTML = original;
        });
    });
  }

  /* ============================================================== toggles */

  function initTheme() {
    var button = $('#themeToggle');
    if (!button) return;

    button.addEventListener('click', function () {
      var next = root.dataset.theme === 'light' ? 'dark' : 'light';
      root.dataset.theme = next;
      try { localStorage.setItem('pf-theme', next); } catch (e) { /* ignore */ }

      var meta = $('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', next === 'light' ? '#f7f8fb' : '#07080c');

      toast(dict('toast_theme'));
    });
  }

  function initLang() {
    var button = $('#langToggle');
    if (!button) return;

    button.addEventListener('click', function () {
      lang = lang === 'id' ? 'en' : 'id';
      try { localStorage.setItem('pf-lang', lang); } catch (e) { /* ignore */ }

      clearTimers();
      applyI18n();
      renderAll();
      rotateRoles();
      typeTerminal();

      /* Re-rendered cards are new nodes and need tilt bound; the terminal
         persists and keeps its own binding, so nothing needs unbinding. */
      initTilt();

      toast(dict('toast_lang'));
    });
  }

  function initCopyEmail() {
    var button = $('#copyEmail');
    var link = $('#contactEmail');
    if (!button || !link) return;

    button.addEventListener('click', function () {
      var address = data.owner.email;

      function fallback() {
        /* clipboard API needs a secure context; file:// and plain http do not qualify */
        var range = document.createRange();
        range.selectNodeContents(link);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        toast(dict('toast_copy_fail'), 'error');
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(address)
          .then(function () { toast(dict('toast_copied')); })
          .catch(fallback);
      } else {
        fallback();
      }
    });
  }

  /* ================================================================ boot */

  function init() {
    applyI18n();
    renderAll();
    observeStaticReveals();
    rotateRoles();
    typeTerminal();

    initNav();
    initScrollSpy();
    initScrollProgress();
    initModal();
    initForm();
    initTheme();
    initLang();
    initCopyEmail();
    initTilt();
    initMagnetic();
    initCursorGlow();
    initHeroParallax();
  }

  try {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  } catch (error) {
    /* A broken script must never leave the page invisible. */
    root.classList.add('reveal-all');
    console.error('[portfolio] init failed:', error);
  }
})();
