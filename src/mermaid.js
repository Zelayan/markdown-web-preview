import DOMPurify from 'dompurify';
import mermaid from 'mermaid';

let sequence = 0;
let queue = Promise.resolve();

// Mermaid configuration is process-global. Serialize all diagrams (including
// multiple open documents) to keep each render's theme and policy isolated.
async function draw(source, dark) {
  const job = queue.catch(() => {}).then(async () => {
    if (source.length > 50000) throw new Error('图表源码超过 50,000 字符限制');
    if (/%%\s*\{/.test(source) || /^\s*---\s*\n/.test(source)) {
      throw new Error('为保证安全，暂不支持 Mermaid 初始化指令或 YAML frontmatter');
    }
    mermaid.initialize({ startOnLoad: false, securityLevel: 'strict',
      theme: dark ? 'dark' : 'base', suppressErrorRendering: true,
      themeVariables: dark ? {} : { primaryColor: '#eff6ff', primaryBorderColor: '#2563eb', primaryTextColor: '#1f2937', lineColor: '#64748b', secondaryColor: '#f1f5f9', tertiaryColor: '#f8fafc' },
      maxTextSize: 50000, maxEdges: 500, htmlLabels: false,
      flowchart: { htmlLabels: false },
      secure: ['securityLevel', 'startOnLoad', 'maxTextSize', 'maxEdges', 'htmlLabels', 'theme', 'themeCSS'] });
    const id = `mwp-diagram-${++sequence}`;
    try {
      const { svg } = await mermaid.render(id, source);
      return svg;
    } finally {
      // Mermaid can leave an error container when parsing fails.
      document.getElementById(id)?.remove();
      document.getElementById(`d${id}`)?.remove();
    }
  });
  queue = job;
  return job;
}

export function svgImageUri(svg) {
  const safe = DOMPurify.sanitize(svg, {
    USE_PROFILES: { svg: true, svgFilters: true },
    ADD_TAGS: ['style'],
    FORBID_TAGS: ['script', 'foreignObject', 'a', 'image', 'iframe', 'animate', 'set'],
    FORBID_ATTR: ['href', 'xlink:href', 'onload', 'onclick'],
  });
  // Render as a standalone SVG image, not active inline HTML. No interaction
  // bindings, HTML labels or external diagram image resources are executed.
  const template = document.createElement('template');
  template.innerHTML = safe;
  const root = template.content.querySelector('svg');
  const viewBox = root?.getAttribute('viewBox')?.trim().split(/[\s,]+/).map(Number);
  if (root && viewBox?.length === 4 && viewBox.every(Number.isFinite) && viewBox[2] > 0 && viewBox[3] > 0) {
    root.setAttribute('width', String(viewBox[2]));
    root.setAttribute('height', String(viewBox[3]));
  }
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(template.innerHTML)}`;
}

export async function renderMermaidHtml(html, { dark = false, cancelled = () => false,
  render = draw, environment = document } = {}) {
  const template = environment.createElement('template');
  template.innerHTML = html;
  for (const block of template.content.querySelectorAll('.mwp-code-block[data-lang]')) {
    if (block.getAttribute('data-lang').toLowerCase() !== 'mermaid') continue;
    if (cancelled()) return null;
    const source = block.querySelector('pre code')?.textContent || '';
    try {
      const svg = await render(source, dark);
      if (cancelled()) return null;
      const figure = environment.createElement('figure');
      figure.className = 'mwp-mermaid';
      figure.setAttribute('aria-label', 'Mermaid 图表');
      const image = environment.createElement('img');
      image.className = 'mwp-mermaid-image';
      image.alt = 'Mermaid 图表';
      image.src = svgImageUri(svg);
      figure.appendChild(image);
      const details = environment.createElement('details');
      details.className = 'mwp-mermaid-source';
      const summary = environment.createElement('summary');
      summary.textContent = '查看 Mermaid 源码';
      details.appendChild(summary);
      details.appendChild(block.cloneNode(true));
      figure.appendChild(details);
      block.replaceWith(figure);
    } catch (error) {
      if (cancelled()) return null;
      const message = environment.createElement('div');
      message.className = 'mwp-mermaid-error';
      message.setAttribute('role', 'status');
      message.textContent = `Mermaid 渲染失败，已保留源码：${String(error?.message || error).slice(0, 400)}`;
      block.before(message);
    }
  }
  return cancelled() ? null : template.innerHTML;
}
