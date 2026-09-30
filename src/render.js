import { marked } from 'marked';
import DOMPurify from 'dompurify';

const escapeHTML = (value) => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);

const renderer = new marked.Renderer();

// Markdown is untrusted content. Render raw HTML as visible text, never as markup.
renderer.html = (token) => `<pre class="mwp-raw-html">${escapeHTML(typeof token === 'string' ? token : token.text || '')}</pre>`;

// Enhanced code block with terminal window dots, language banner, and copy button
renderer.code = (token, maybeLang) => {
  const codeText = typeof token === 'string' ? token : (token?.text ?? '');
  const rawLang = typeof token === 'string' ? maybeLang : (token?.lang ?? '');
  const language = (rawLang || '').trim().split(/\s+/)[0];
  const langLabel = language ? escapeHTML(language) : 'code';
  // Keep wrapper markup compact. Harness can apply `white-space: pre-wrap` to
  // document content; indentation/newlines between block elements would then
  // become visible blank rows around the header and <pre>.
  return `<div class="mwp-code-block" data-lang="${langLabel}"><div class="mwp-code-header"><div class="mwp-code-header-left"><div class="mwp-code-dots" aria-hidden="true"><span class="mwp-code-dot mwp-dot-red"></span><span class="mwp-code-dot mwp-dot-yellow"></span><span class="mwp-code-dot mwp-dot-green"></span></div><span class="mwp-code-lang">${langLabel}</span></div><button type="button" class="mwp-code-copy" aria-label="复制代码" title="复制代码">复制</button></div><pre><code class="language-${langLabel}">${escapeHTML(codeText)}</code></pre></div>`;
};

// Safe task list checkboxes without insecure input elements
renderer.checkbox = (token) => {
  const checked = Boolean(typeof token === 'object' ? token?.checked : token);
  return `<span class="mwp-task-check ${checked ? 'is-checked' : 'is-unchecked'}" aria-hidden="true">${checked ? '✓' : ''}</span> `;
};

marked.setOptions({ gfm: true, breaks: true, renderer });

function safeLink(href) {
  try {
    const url = new URL(href, document.baseURI);
    return ['http:', 'https:', 'mailto:'].includes(url.protocol);
  } catch { return false; }
}

export function computeStats(text) {
  if (!text) return { characters: 0, words: 0, readTimeMinutes: 1 };
  const characters = text.length;
  const cjk = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  const latinWords = (text.replace(/[\u4e00-\u9fa5]/g, ' ').match(/[a-zA-Z0-9_-]+/g) || []).length;
  const totalWords = cjk + latinWords;
  const readTimeMinutes = Math.max(1, Math.ceil(totalWords / 350));
  return { characters, words: totalWords, readTimeMinutes };
}

export function renderMarkdown(source, environment = document, options = {}) {
  const parsed = marked.parse(source || '');
  const clean = DOMPurify.sanitize(parsed, {
    FORBID_TAGS: ['style', 'script', 'iframe', 'object', 'embed', 'form', 'input', 'video', 'audio'],
    FORBID_ATTR: ['style', 'srcset'],
    ALLOW_DATA_ATTR: true,
  });

  const template = environment.createElement('template');
  template.innerHTML = clean;

  const headings = [];
  const used = new Map();
  for (const heading of template.content.querySelectorAll('h1,h2,h3,h4,h5,h6')) {
    const title = heading.textContent.trim();
    const base = title.toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '') || 'section';
    const number = used.get(base) || 0;
    used.set(base, number + 1);
    const id = `mwp-${base}${number ? `-${number + 1}` : ''}`;
    heading.id = id;
    headings.push({ id, title, level: Number(heading.tagName[1]) });
  }

  // Wrap tables with responsive scrollable container
  for (const table of template.content.querySelectorAll('table')) {
    if (table.parentElement?.classList.contains('mwp-table-wrap')) continue;
    const wrap = environment.createElement('div');
    wrap.className = 'mwp-table-wrap';
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
  }

  // Detect and format GitHub-style callouts/alerts in blockquotes
  for (const quote of template.content.querySelectorAll('blockquote')) {
    const firstP = quote.querySelector('p');
    if (firstP) {
      const match = firstP.textContent.match(/^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);
      if (match) {
        const type = match[1].toLowerCase();
        quote.classList.add('mwp-callout', `mwp-callout-${type}`);
        const badge = environment.createElement('div');
        badge.className = 'mwp-callout-title';
        const labels = {
          note: '备注 NOTE',
          tip: '提示 TIP',
          important: '重要 IMPORTANT',
          warning: '警告 WARNING',
          caution: '注意 CAUTION',
        };
        badge.textContent = labels[type] || type.toUpperCase();
        firstP.innerHTML = firstP.innerHTML.replace(/^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i, '').trim();
        quote.insertBefore(badge, firstP);
      }
    }
  }

  // Mark task list items for styling
  for (const check of template.content.querySelectorAll('.mwp-task-check')) {
    const li = check.closest('li');
    if (li) {
      li.classList.add('mwp-task-item', check.classList.contains('is-checked') ? 'is-checked' : 'is-unchecked');
    }
  }

  for (const link of template.content.querySelectorAll('a[href]')) {
    const href = link.getAttribute('href');
    if (href.startsWith('#') && template.content.querySelector(`#${CSS.escape(href.slice(1))}`)) continue;
    if (!safeLink(href)) { link.removeAttribute('href'); continue; }
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  }

  // Only web images are allowed. Do not leak a local file path to a remote origin.
  for (const image of template.content.querySelectorAll('img')) {
    const src = image.getAttribute('src') || '';
    const resolved = /^https?:\/\//i.test(src) ? src : options.resolveImage?.(src);
    if (!resolved || !/^https?:\/\//i.test(resolved)) {
      image.replaceWith(environment.createTextNode(image.alt || '[本地图片]'));
    } else {
      image.setAttribute('src', resolved);
      image.setAttribute('loading', 'lazy');
    }
  }

  return { html: template.innerHTML, headings, stats: computeStats(source) };
}
