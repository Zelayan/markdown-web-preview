import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('', { url: 'http://127.0.0.1:19387/' });
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.CSS = dom.window.CSS || { escape: s => s.replace(/[^\w-]/g, '\\$&') };
const { renderMarkdown } = await import('../src/render.js');

function parse(text) {
  const result = renderMarkdown(text, document);
  const element = document.createElement('div');
  element.innerHTML = result.html;
  return { ...result, element };
}

test('renders Chinese headings with stable duplicate-safe directory anchors', () => {
  const { headings, element } = parse('# 问题结论\n## 过程\n## 过程\n\n**已证实**');
  assert.deepEqual(headings.map(x => x.id), ['mwp-问题结论', 'mwp-过程', 'mwp-过程-2']);
  assert.equal(element.querySelectorAll('strong').length, 1);
});

test('never executes raw HTML or event handlers', () => {
  const { html, element } = parse('# Hi\n<script>alert(1)</script>\n<img src=x onerror=alert(1)>\n[bad](javascript:alert(1))');
  assert.equal(element.querySelector('script'), null);
  assert.equal(element.querySelector('[onerror]'), null);
  assert.equal(element.querySelector('a[href^="javascript"]'), null);
  assert.ok(!html.includes('<script>'));
});

test('external links are isolated and relative images are not loaded', () => {
  const { element } = parse('[good](https://example.org) ![private](./secret.png)');
  const link = element.querySelector('a');
  assert.equal(link.getAttribute('rel'), 'noopener noreferrer');
  assert.equal(link.getAttribute('target'), '_blank');
  assert.equal(element.querySelector('img'), null);
  assert.match(element.textContent, /private/);
});
