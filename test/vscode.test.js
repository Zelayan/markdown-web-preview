import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import Module from 'node:module';

// Test the actual extension entry against the VS Code API contract without
// requiring an installed editor or an extension-host download.
test('VS Code command opens a protected panel, updates drafts and copies code', async () => {
  const handlers = {}; const sent = [];
  const uri = { path: '/workspace/docs/readme.md', toString: () => 'file:///workspace/docs/readme.md' };
  let text = '# Initial';
  const doc = { uri, languageId: 'markdown', getText: () => text };
  const disposable = () => ({ dispose() {} });
  const webview = {
    cspSource: 'https://webview.test',
    asWebviewUri: value => ({ toString: () => `https://webview.test${value.path}` }),
    onDidReceiveMessage: cb => { handlers.message = cb; return disposable(); },
    postMessage: async msg => { sent.push(msg); return true; },
  };
  let created = 0; let copied;
  const panel = { webview, reveal() {}, dispose() {},
    onDidDispose: cb => { handlers.dispose = cb; return disposable(); },
    onDidChangeViewState: () => disposable() };
  const vscode = {
    Uri: { joinPath: (base, ...parts) => ({ path: base.path + '/' + parts.join('/') }) },
    ViewColumn: { Beside: 2 }, ColorThemeKind: { Dark: 2, HighContrast: 3 },
    commands: { registerCommand: (id, cb) => { handlers.command = cb; return disposable(); } },
    env: { clipboard: { writeText: async value => { copied = value; } } },
    window: { activeTextEditor: { document: doc }, activeColorTheme: { kind: 2 },
      showInformationMessage() {}, onDidChangeActiveColorTheme: () => disposable(),
      createWebviewPanel: (type, title, column, options) => {
        created++; assert.equal(column, 2); assert.equal(options.enableScripts, true);
        assert.equal(options.localResourceRoots.length, 2); return panel;
      } },
    workspace: { textDocuments: [doc], openTextDocument: async () => doc,
      onDidChangeTextDocument: cb => { handlers.change = cb; return disposable(); } },
  };
  const original = Module._load;
  Module._load = function(id, ...args) { return id === 'vscode' ? vscode : original.call(this, id, ...args); };
  let extension;
  try { extension = createRequire(import.meta.url)('../vscode/extension.cjs'); }
  finally { Module._load = original; }
  extension.activate({ extensionUri: { path: '/extension' }, subscriptions: [] });
  await handlers.command();
  assert.match(webview.html, /default-src 'none'/);
  assert.match(webview.html, /script-src 'nonce-/);
  assert.ok(!webview.html.includes(text));
  await handlers.message({ type: 'ready' });
  assert.equal(sent.at(-1).text, '# Initial');
  text = '# Unsaved edit'; handlers.change({ document: doc });
  await new Promise(resolve => setTimeout(resolve, 160));
  assert.equal(sent.at(-1).text, '# Unsaved edit');
  await handlers.message({ type: 'copy', id: 1, text: 'echo safe' });
  assert.equal(copied, 'echo safe'); assert.equal(sent.at(-1).ok, true);
  await handlers.command(); assert.equal(created, 1);
  handlers.dispose();
});
