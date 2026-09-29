import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('', { url: 'http://127.0.0.1:19387/' });
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.CSS = dom.window.CSS || { escape: s => s.replace(/[^\w-]/g, '\\$&') };
const { renderMarkdown, computeStats } = await import('../src/render.js');

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

test('formats code blocks with language banner and copy button', () => {
  const { element } = parse('```bash\necho "Hello World"\n```');
  const block = element.querySelector('.mwp-code-block');
  assert.ok(block);
  assert.equal(block.querySelector('.mwp-code-lang').textContent, 'bash');
  assert.equal(block.querySelector('.mwp-code-copy').textContent, '复制');
  assert.equal(block.querySelector('code').textContent.trim(), 'echo "Hello World"');
});

test('wraps markdown tables in responsive container and supports zebra striping', () => {
  const { element } = parse('| 序号 | 名称 |\n|---|---|\n| 1 | 测试 |');
  const wrap = element.querySelector('.mwp-table-wrap');
  assert.ok(wrap);
  assert.ok(wrap.querySelector('table'));
  assert.equal(wrap.querySelectorAll('th').length, 2);
  assert.equal(wrap.querySelectorAll('td').length, 2);
});

test('renders GitHub alerts and task list items cleanly', () => {
  const { element } = parse('> [!WARNING]\n> 请务必备份数据\n\n- [ ] 未完成\n- [x] 已完成');
  const callout = element.querySelector('.mwp-callout-warning');
  assert.ok(callout);
  assert.match(callout.textContent, /警告/);
  assert.match(callout.textContent, /请务必备份数据/);

  const tasks = element.querySelectorAll('.mwp-task-item');
  assert.equal(tasks.length, 2);
  assert.ok(tasks[0].classList.contains('is-unchecked'));
  assert.ok(tasks[1].classList.contains('is-checked'));
});

test('computes character, word count and estimated reading time', () => {
  const stats = computeStats('# 标题\n这是一段测试文档，包含若干汉字和 English words。\n```\ncode\n```');
  assert.ok(stats.characters > 20);
  assert.ok(stats.words > 10);
  assert.equal(typeof stats.readTimeMinutes, 'number');
  assert.ok(stats.readTimeMinutes >= 1);
});
