import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { JSDOM } from 'jsdom';
const { createPrintHtml } = createRequire(import.meta.url)('../vscode/print-html.cjs');

test('PDF inline code and links follow selected palette and reject CSS injection', () => {
  for (const accent of ['#2563eb', '#059669', '#d97706']) {
    const html = createPrintHtml('<p><code>15:57:33</code></p>', 'test', 'safe', { accent });
    const style = new JSDOM(html).window.document.querySelector('style').textContent;
    assert.ok(style.includes(`--mwp-print-accent: ${accent}`));
    assert.match(style, /code \{[^}]*color: var\(--mwp-print-accent\)/);
    assert.match(style, /a \{[^}]*color: var\(--mwp-print-accent\)/);
    assert.ok(!style.includes('#a21caf'));
  }
  const invalid = createPrintHtml('', 'test', 'safe', { accent: '</style><script>alert(1)</script>' });
  assert.ok(invalid.includes('--mwp-print-accent: #7c3aed'));
  assert.ok(!invalid.includes('alert(1)'));
});

test('print layout contains only supplied prose with A4 and PDF controls', () => {
  const html = createPrintHtml('<h1>测试</h1><pre><code>a\nb</code></pre>', 'A < B', 'safe-nonce');
  const document = new JSDOM(html).window.document;
  assert.equal(document.title, 'A < B');
  assert.equal(document.querySelector('main code').textContent, 'a\nb');
  assert.ok(!document.querySelector('.mwp-toolbar'));
  assert.ok(!document.querySelector('.mwp-nav'));
  assert.match(document.querySelector('style').textContent, /@page.*size: A4/);
  assert.match(document.querySelector('meta[http-equiv]').content, /default-src 'none'/);
  assert.equal(document.querySelector('script').getAttribute('nonce'), 'safe-nonce');
  assert.match(document.querySelector('script').textContent, /window.print/);
});
