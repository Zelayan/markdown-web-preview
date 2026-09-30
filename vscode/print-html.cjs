function createPrintHtml(html, title = 'Markdown', nonce = 'markdown-print', options = {}) {
  // Use the light palette for paper, validating before interpolating into CSS.
  const accent = typeof options.accent === 'string' && /^#[0-9a-f]{6}$/i.test(options.accent) ? options.accent : '#7c3aed';
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><title>${escape(title)}</title><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src https: http: file:; style-src 'unsafe-inline'; script-src 'nonce-${escape(nonce)}';"><style>
  @page { size: A4; margin: 18mm 16mm; }
  html { --mwp-print-accent: ${accent}; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  li::marker { color: var(--mwp-print-accent); }
  *, *::before, *::after { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { margin: 24px auto; max-width: 860px; padding: 0 24px; color: #24292f; background: white; font: 14px/1.55 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
  h1,h2,h3,h4,h5,h6 { break-after: avoid; line-height: 1.3; margin: 18px 0 7px; }
  h1 { font-size: 24px; } h2 { font-size: 20px; } h3 { font-size: 16px; }
  p { margin: 0 0 8px; } ul,ol { margin: 5px 0 9px; padding-left: 22px; } li { margin-bottom: 3px; }
  a { color: var(--mwp-print-accent); overflow-wrap: anywhere; } img { max-width: 100%; height: auto; }
  code { font: 12px/1.45 monospace; color: var(--mwp-print-accent); background: #f3f4f6; padding: 1px 3px; border-radius: 3px; }
  /* Paper-oriented code extracts, independent of the interactive preview. */
  .mwp-code-block { margin: 10px 0 12px; background: #f8fafc; border: 1px solid #dbe1e8; border-left: 3px solid #64748b; border-radius: 4px; white-space: normal; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
  .mwp-code-header { padding: 6px 12px 0; background: transparent; border: 0; color: #64748b; font: 600 9px/1.3 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; letter-spacing: 0.08em; text-transform: uppercase; break-after: avoid; }
  .mwp-code-block:is([data-lang="text" i], [data-lang="txt" i], [data-lang="plain" i], [data-lang="plaintext" i], [data-lang="code" i], [data-lang=""]) .mwp-code-header { display: none; }
  .mwp-code-block:is([data-lang="text" i], [data-lang="txt" i], [data-lang="plain" i], [data-lang="plaintext" i], [data-lang="code" i], [data-lang=""]) pre { padding-top: 10px; }
  pre { margin: 0; padding: 7px 12px 10px; white-space: pre-wrap; overflow-wrap: anywhere; tab-size: 4; }
  pre code { display: block; padding: 0; border: 0; border-radius: 0; background: none; color: #263244; font: 11.5px/1.55 'SFMono-Regular', Menlo, Consolas, 'Liberation Mono', monospace; white-space: pre-wrap; overflow-wrap: anywhere; }
  .mwp-code-copy,.mwp-code-dots { display: none; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; } th,td { border: 1px solid #dfe1e6; padding: 5px 8px; overflow-wrap: anywhere; } th { background: #f3f4f6; } thead { display: table-header-group; } tr { break-inside: avoid; }
  blockquote { border-left: 3px solid #64748b; background: #f6f8fa; padding: 8px 12px; margin: 9px 0; }
  .mwp-callout-title { font-weight: bold; margin-bottom: 4px; }
  .mwp-callout-note { border-color: #2563eb; background: #eff6ff; } .mwp-callout-note .mwp-callout-title { color: #2563eb; }
  .mwp-callout-tip { border-color: #059669; background: #ecfdf5; } .mwp-callout-tip .mwp-callout-title { color: #047857; }
  .mwp-callout-important { border-color: #7c3aed; background: #f5f3ff; } .mwp-callout-important .mwp-callout-title { color: #6d28d9; }
  .mwp-callout-warning { border-color: #d97706; background: #fffbeb; } .mwp-callout-warning .mwp-callout-title { color: #b45309; }
  .mwp-callout-caution { border-color: #dc2626; background: #fef2f2; } .mwp-callout-caution .mwp-callout-title { color: #b91c1c; }
  .print-controls { margin-bottom: 24px; padding: 12px; background: #f3f4f6; font-size: 13px; }
  button { padding: 6px 12px; cursor: pointer; }
  @media print { body { margin: 0; max-width: none; padding: 0; } .print-controls { display: none; } }
  </style></head><body><div class="print-controls"><button id="print">打印 / 保存为 PDF</button> 在打印窗口选择“另存为 PDF”，并在“更多设置”中勾选“背景图形”以保留背景色。长代码和表格会自动换行。</div><main>${html}</main><script nonce="${escape(nonce)}">document.getElementById('print').addEventListener('click',()=>window.print());</script></body></html>`;
}
module.exports = { createPrintHtml };
