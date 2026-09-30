const vscode = require('vscode');
const crypto = require('node:crypto');
const path = require('node:path');
const fs = require('node:fs/promises');
const os = require('node:os');
const { createPrintHtml } = require('./print-html.cjs');

function activate(context) {
  const panels = new Map();
  async function openPreview(uri) {
    uri = uri || vscode.window.activeTextEditor?.document.uri;
    if (!uri) return vscode.window.showInformationMessage('请先打开 Markdown 文件。');
    const doc = await vscode.workspace.openTextDocument(uri);
    if (doc.languageId !== 'markdown' && !/\.(md|markdown)$/i.test(uri.path)) {
      return vscode.window.showInformationMessage('请选择 Markdown 文件。');
    }
    const key = uri.toString();
    if (panels.has(key)) { panels.get(key).reveal(vscode.ViewColumn.Beside); return; }
    const directory = vscode.Uri.joinPath(uri, '..');
    const panel = vscode.window.createWebviewPanel('markdownWebPreview', `预览 · ${path.basename(uri.path)}`,
      vscode.ViewColumn.Beside, { enableScripts: true, retainContextWhenHidden: true,
        localResourceRoots: [context.extensionUri, directory] });
    panels.set(key, panel);
    const webview = panel.webview;
    const nonce = crypto.randomBytes(18).toString('hex');
    const script = webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'webview.js'));
    // Only trusted extension styles are inline. Markdown styles/scripts are forbidden.
    webview.html = `<!doctype html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} https: http:; style-src 'unsafe-inline'; script-src 'nonce-${nonce}';"><style>html,body,#root{height:100%;margin:0;overflow:hidden}body{padding:0}</style></head><body><div id="root"></div><script nonce="${nonce}" src="${script}"></script></body></html>`;
    let timer;
    let disposed = false;
    function update() {
      if (disposed) return;
      const current = vscode.workspace.textDocuments.find(d => d.uri.toString() === key) || doc;
      const dark = [vscode.ColorThemeKind.Dark, vscode.ColorThemeKind.HighContrast].includes(vscode.window.activeColorTheme.kind);
      void webview.postMessage({ type: 'document', text: current.getText(), dark,
        resourceBase: webview.asWebviewUri(directory).toString().replace(/\/$/, '') + '/' });
    }
    const subscriptions = [
      webview.onDidReceiveMessage(async message => {
        if (message?.type === 'ready') update();
        if (message?.type === 'exportPdf' && typeof message.html === 'string') {
          try {
            let html = message.html;
            if (uri.scheme === 'file') {
              const resourceBase = webview.asWebviewUri(directory).toString().replace(/\/$/, '') + '/';
              html = html.replaceAll(resourceBase, directory.toString().replace(/\/$/, '') + '/');
            }
            const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'markdown-web-preview-'));
            const output = path.join(tempDir, 'print.html');
            await fs.writeFile(output, createPrintHtml(html, path.basename(uri.path), crypto.randomBytes(18).toString('hex'), { accent: message.accent }), 'utf8');
            const opened = await vscode.env.openExternal(vscode.Uri.file(output));
            if (!opened) throw new Error('系统未能打开打印页面');
            vscode.window.showInformationMessage('打印页面已打开。点击“打印 / 保存为 PDF”，选择另存为 PDF。');
          } catch (error) {
            vscode.window.showErrorMessage(`导出 PDF 失败：${error.message}`);
          }
        }
        if (message?.type === 'copy' && typeof message.text === 'string' && Number.isSafeInteger(message.id)) {
          try { await vscode.env.clipboard.writeText(message.text); void webview.postMessage({ type: 'copied', id: message.id, ok: true }); }
          catch { void webview.postMessage({ type: 'copied', id: message.id, ok: false }); }
        }
      }),
      vscode.workspace.onDidChangeTextDocument(event => {
        if (event.document.uri.toString() !== key) return;
        clearTimeout(timer); timer = setTimeout(update, 120);
      }),
      vscode.window.onDidChangeActiveColorTheme(update),
      panel.onDidChangeViewState(event => { if (event.webviewPanel.visible) update(); }),
    ];
    panel.onDidDispose(() => {
      disposed = true; clearTimeout(timer); panels.delete(key);
      subscriptions.forEach(s => s.dispose());
    });
  }
  context.subscriptions.push(vscode.commands.registerCommand('markdownWebPreview.openSide', openPreview));
  context.subscriptions.push({ dispose() { for (const panel of panels.values()) panel.dispose(); } });
}
exports.activate = activate;
exports.deactivate = () => {};
