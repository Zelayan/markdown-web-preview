import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
const dom = new JSDOM('', { url: 'https://preview.test/' });
globalThis.window = dom.window; globalThis.document = dom.window.document;
globalThis.CSS = { escape: value => value.replace(/[^\w-]/g, '\\$&') };
const { renderMarkdown } = await import('../src/render.js');
const { renderMermaidHtml, svgImageUri } = await import('../src/mermaid.js');
const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40"><text x="10" y="20">节点</text></svg>';

test('Mermaid fences become isolated SVG images with a source disclosure', async () => {
  const { html } = renderMarkdown('```mermaid\nflowchart TD\nA[开始] --> B[结束]\n```');
  let received;
  const rendered = await renderMermaidHtml(html, { dark: true, render: async (source, dark) => { received = { source, dark }; return svg; } });
  const root = new JSDOM(rendered).window.document;
  assert.equal(received.dark, true); assert.match(received.source, /A\[开始\]/);
  assert.match(root.querySelector('.mwp-mermaid-image').src, /^data:image\/svg\+xml/);
  assert.ok(root.querySelector('details code').textContent.includes('flowchart TD'));
});

test('bad diagrams retain source and do not block later diagrams', async () => {
  const { html } = renderMarkdown('```mermaid\nbad diagram\n```\n\n```mermaid\nflowchart TD\nA --> B\n```');
  const rendered = await renderMermaidHtml(html, { render: async source => { if (source.startsWith('bad')) throw new Error('<img onerror=evil>'); return svg; } });
  const root = new JSDOM(rendered).window.document;
  assert.equal(root.querySelectorAll('.mwp-mermaid-image').length, 1);
  assert.match(root.querySelector('.mwp-mermaid-error').textContent, /<img onerror=evil>/);
  assert.equal(root.querySelector('[onerror]'), null);
  assert.ok(root.querySelector('.mwp-code-block code').textContent.includes('bad diagram'));
});

test('stale diagram jobs do not replace the current document', async () => {
  const { html } = renderMarkdown('```mermaid\nflowchart TD\nA --> B\n```');
  let cancelled = false;
  const result = await renderMermaidHtml(html, { cancelled: () => cancelled, render: async () => { cancelled = true; return svg; } });
  assert.equal(result, null);
});

test('SVG image output removes active content and external links', () => {
  const uri = svgImageUri('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script><foreignObject><div>bad</div></foreignObject><image href="https://evil.test/x"/><a href="javascript:alert(1)"><text>link</text></a><text onclick="evil()">safe</text></svg>');
  const cleaned = decodeURIComponent(uri.split(',')[1]);
  assert.ok(!/<script|foreignObject|<image|onclick|javascript:|https:\/\/evil/.test(cleaned));
  assert.match(cleaned, /safe/);
});

test('diagram configuration overrides and oversized sources are rejected before render', async () => {
  for (const source of ['%%{init: {"securityLevel":"loose"}}}%%\nflowchart TD\nA-->B', '---\nconfig:\n  securityLevel: loose\n---\nflowchart TD\nA-->B', 'x'.repeat(50001)]) {
    const { html } = renderMarkdown(`\`\`\`mermaid\n${source}\n\`\`\``);
    const result = await renderMermaidHtml(html);
    const root = new JSDOM(result).window.document;
    assert.equal(root.querySelector('.mwp-mermaid-image'), null);
    assert.ok(root.querySelector('.mwp-mermaid-error'));
    assert.ok(root.querySelector('code'));
  }
});

test('Markdown image syntax cannot inject data images directly', () => {
  const { html } = renderMarkdown('![unsafe](data:image/svg+xml;base64,PHN2Zz4=)');
  assert.ok(!html.includes('<img'));
});
