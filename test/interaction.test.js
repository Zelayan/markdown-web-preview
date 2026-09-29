import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const dom = new JSDOM('<div id="root"></div>', { url: 'http://127.0.0.1:19387/', pretendToBeVisual: true });
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const React = await import('react');
const { createRoot } = await import('react-dom/client');
const { act } = React;
let plugin;
window.__ModuleLoader__ = { load(value) { plugin = value; } };
vm.runInNewContext(readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8'), {
  window, document,
});
const components = {};
plugin.factory(name => { assert.equal(name, 'react'); return React; }).apply({
  effect(callback) { callback(); },
  documentPreviews: { register(definition) { components.definition = definition; } },
  slots: {
    inject(_slot, callback) { callback(); },
    register(_metadata, component) { components.Body = component; },
  },
});

test('dragging and keyboard input resize table of contents in rendered component', async () => {
  const host = document.querySelector('#root');
  const root = createRoot(host);
  await act(async () => root.render(React.createElement(components.Body, {
    content: { kind: 'text', text: '# 第一章\n## 第二章\n正文', eof: true },
    scrollportRef() {},
  })));
  const layout = host.querySelector('.mwp-layout');
  const nav = host.querySelector('.mwp-nav');
  const divider = host.querySelector('[role="separator"]');
  assert.ok(nav && divider);
  assert.equal(host.querySelectorAll('.mwp-nav-item').length, 2);
  layout.getBoundingClientRect = () => ({ width: 650 });
  nav.getBoundingClientRect = () => ({ width: 211 });
  await act(async () => {
    divider.dispatchEvent(new window.MouseEvent('pointerdown', { bubbles: true, button: 0, clientX: 211 }));
    window.dispatchEvent(new window.MouseEvent('pointermove', { clientX: 341 }));
    window.dispatchEvent(new window.MouseEvent('pointerup'));
  });
  assert.equal(layout.style.getPropertyValue('--mwp-toc-width'), '341px');
  assert.equal(window.localStorage.getItem('markdown-web-preview:toc-width'), '341');
  await act(async () => divider.dispatchEvent(new window.KeyboardEvent('keydown', { bubbles: true, key: 'ArrowLeft' })));
  assert.equal(layout.style.getPropertyValue('--mwp-toc-width'), '329px');
  await act(async () => divider.dispatchEvent(new window.MouseEvent('dblclick', { bubbles: true })));
  assert.equal(layout.style.getPropertyValue('--mwp-toc-width'), '211px');
  await act(async () => root.unmount());
});

test('toolbar toggles theme and wide reading width', async () => {
  const host = document.querySelector('#root');
  const root = createRoot(host);
  await act(async () => root.render(React.createElement(components.Body, {
    content: { kind: 'text', text: '# 标题\n```js\nconsole.log(42);\n```', eof: true },
    scrollportRef() {},
  })));

  const themeBtn = Array.from(host.querySelectorAll('.mwp-tool-btn')).find(b =>
    b.textContent.includes('自动') || b.textContent.includes('亮色') || b.textContent.includes('暗色')
  );
  assert.ok(themeBtn);
  await act(async () => themeBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true })));
  assert.match(host.querySelector('.mwp-root').className, /theme-(light|dark)/);

  const wideBtn = Array.from(host.querySelectorAll('.mwp-tool-btn')).find(b =>
    b.textContent.includes('居中') || b.textContent.includes('通栏')
  );
  assert.ok(wideBtn);
  await act(async () => wideBtn.dispatchEvent(new window.MouseEvent('click', { bubbles: true })));
  assert.ok(host.querySelector('.mwp-article.is-wide'));

  await act(async () => root.unmount());
});
