import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createMarkdownPreview } from './preview.js';

const api = acquireVsCodeApi();
// Persist preferences through VS Code state, rather than depending on Webview
// localStorage surviving restarts. The shared component uses the Storage API.
const saved = api.getState() || {};
try {
  for (const [key, value] of Object.entries(saved)) window.localStorage.setItem(key, value);
  const original = Storage.prototype.setItem;
  Storage.prototype.setItem = function(key, value) {
    original.call(this, key, value);
    if (key.startsWith('markdown-web-preview:')) { saved[key] = String(value); api.setState(saved); }
  };
} catch { /* Private/disabled storage keeps shared safe defaults. */ }

const Preview = createMarkdownPreview(React);
const root = createRoot(document.getElementById('root'));
let nextId = 0;
const pending = new Map();
function copyText(text) {
  return new Promise((resolve, reject) => {
    const id = ++nextId;
    const timeout = setTimeout(() => { pending.delete(id); reject(new Error('Copy timeout')); }, 5000);
    pending.set(id, { resolve, reject, timeout });
    api.postMessage({ type: 'copy', id, text });
  });
}

function resolveImage(src, base) {
  // Never accept explicit schemes, absolute paths, protocol-relative paths,
  // or traversal outside the Markdown directory.
  if (!src || /^(?:[a-z][a-z0-9+.-]*:|\/|\\)/i.test(src)) return null;
  try {
    const uri = new URL(src, base);
    return uri.href.startsWith(base) ? uri.href : null;
  } catch { return null; }
}

window.addEventListener('message', event => {
  const message = event.data;
  if (message?.type === 'copied') {
    const request = pending.get(message.id);
    if (!request) return;
    clearTimeout(request.timeout); pending.delete(message.id);
    message.ok ? request.resolve() : request.reject(new Error('Copy failed'));
  }
  if (message?.type !== 'document' || typeof message.text !== 'string') return;
  root.render(React.createElement(React.Fragment, null,
    React.createElement('style', null, `
      body.vscode-dark .mwp-root:not(.theme-light), body.vscode-high-contrast .mwp-root:not(.theme-light),
      body.vscode-light .mwp-root:not(.theme-dark), body.vscode-high-contrast-light .mwp-root:not(.theme-dark) {
        --mwp-bg: var(--vscode-editor-background);
        --mwp-surface: var(--vscode-editor-background);
        --mwp-sidebar-bg: var(--vscode-sideBar-background, var(--vscode-editor-background));
        --mwp-ink: var(--vscode-editor-foreground);
        --mwp-ink-secondary: var(--vscode-foreground);
        --mwp-mute: var(--vscode-descriptionForeground);
        --mwp-border: var(--vscode-panel-border, #88888840);
        --mwp-border-subtle: var(--vscode-panel-border, #88888820);
        --mwp-code-bg: var(--vscode-textCodeBlock-background, var(--vscode-editor-background));
        --mwp-code-header-bg: var(--vscode-sideBar-background, var(--vscode-editor-background));
        --mwp-code-ink: var(--vscode-editor-foreground);
      }
      .mwp-root { font-family: var(--vscode-font-family); }
    `),
    React.createElement(Preview, { content: { kind: 'text', text: message.text, eof: true }, copyText, hostTheme: message.dark ? 'dark' : 'light',
      exportPdf: (html, options) => api.postMessage({ type: 'exportPdf', html, accent: options.accent }),
      renderOptions: { resolveImage: src => resolveImage(src, message.resourceBase) } })
  ));
});
api.postMessage({ type: 'ready' });
