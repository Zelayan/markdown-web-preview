import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { createRequire } from 'node:module';
import { styles } from '../src/styles.js';
const { createPrintHtml } = createRequire(import.meta.url)('../vscode/print-html.cjs');
const dom = new JSDOM('', { url: 'https://preview.test/' });
globalThis.window = dom.window; globalThis.document = dom.window.document;
const { renderMarkdown } = await import('../src/render.js');

test('thematic breaks, setext headings, code and table delimiters keep Markdown semantics', () => {
  const parse = source => new JSDOM(renderMarkdown(source).html).window.document;
  assert.equal(parse('上一段\n\n---\n\n下一段').querySelectorAll('hr').length, 1);
  const heading = parse('二级标题\n---');
  assert.equal(heading.querySelector('h2').textContent, '二级标题');
  assert.equal(heading.querySelectorAll('hr').length, 0);
  const code = parse('```text\n---\n```');
  assert.equal(code.querySelector('code').textContent, '---');
  assert.equal(code.querySelectorAll('hr').length, 0);
  const table = parse('| A | B |\n|---|---|\n| 1 | 2 |');
  assert.equal(table.querySelectorAll('table').length, 1);
  assert.equal(table.querySelectorAll('hr').length, 0);
});

test('reading dividers use neutral theme borders without decorations', () => {
  const doc = new JSDOM(`<style>${styles}</style><div class="mwp-root"><main class="mwp-prose"><hr></main></div>`).window.document;
  const rules = [...doc.styleSheets[0].cssRules];
  const rule = rules.find(rule => rule.selectorText === '.mwp-prose hr');
  assert.equal(rule.style.getPropertyValue('border-top'), '1px solid var(--mwp-border)');
  assert.equal(rule.style.getPropertyValue('margin-top'), '24px');
  assert.equal(rule.style.getPropertyValue('margin-left'), '0px');
  assert.equal(rule.style.getPropertyValue('width'), '100%');
  assert.equal(rule.style.getPropertyValue('background'), 'none');
  assert.equal(rule.style.getPropertyValue('box-shadow'), 'none');
});

test('paper dividers use the same thin neutral rule, independent of accent', () => {
  const page = new JSDOM(createPrintHtml('<p>Before</p><hr><p>After</p>', 'Divider', 'test', { accent: '#dc2626' }));
  const doc = page.window.document;
  const rule = [...doc.styleSheets[0].cssRules].find(rule => rule.selectorText === 'hr');
  assert.equal(rule.style.getPropertyValue('border-top'), '1px solid rgb(229, 231, 235)');
  assert.equal(rule.style.getPropertyValue('margin-top'), '24px');
  assert.equal(rule.style.getPropertyValue('margin-left'), '0px');
  assert.equal(rule.style.getPropertyValue('background'), 'none');
  assert.equal(doc.querySelectorAll('main hr').length, 1);
});
