import { marked } from 'marked';
import DOMPurify from 'dompurify';

const escapeHTML = (value) => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);

const renderer = new marked.Renderer();
// Markdown is untrusted content. Render raw HTML as visible text, never as markup.
renderer.html = (token) => `<pre class="mwp-raw-html">${escapeHTML(typeof token === 'string' ? token : token.text || '')}</pre>`;
marked.setOptions({ gfm: true, breaks: false, renderer });

function safeLink(href) {
  try {
    const url = new URL(href, document.baseURI);
    return ['http:', 'https:', 'mailto:'].includes(url.protocol);
  } catch { return false; }
}

export function renderMarkdown(source, environment = document) {
  const parsed = marked.parse(source || '');
  const clean = DOMPurify.sanitize(parsed, {
    FORBID_TAGS: ['style', 'script', 'iframe', 'object', 'embed', 'form', 'input', 'video', 'audio'],
    FORBID_ATTR: ['style', 'srcset'],
    ALLOW_DATA_ATTR: false,
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
    if (!/^https?:\/\//i.test(src)) image.replaceWith(environment.createTextNode(image.alt || '[本地图片]'));
    else image.setAttribute('loading', 'lazy');
  }
  return { html: template.innerHTML, headings };
}
