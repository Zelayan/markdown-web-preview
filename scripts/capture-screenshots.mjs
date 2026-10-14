import { chromium } from 'playwright';
import { mkdtemp, writeFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const browser = await chromium.launch({ headless: true, ...(process.env.MWP_CHROME_EXECUTABLE ? { executablePath: process.env.MWP_CHROME_EXECUTABLE } : {}) });
try {
  const temp = await mkdtemp(join(tmpdir(), 'mwp-screenshots-'));
  const output = resolve('docs/screenshots'); await mkdir(output, { recursive: true });
  const bundle = pathToFileURL(resolve('vscode/webview.js')).href;
  const entry = join(temp, 'index.html');
  await writeFile(entry, `<!doctype html><html><head><meta charset="utf-8"><style>html,body,#root{height:100%;margin:0}body{--vscode-font-family:"PingFang SC",sans-serif}</style></head><body><div id="root"></div><script>window.acquireVsCodeApi=()=>({getState:()=>null,setState:()=>{},postMessage:()=>{}})</script><script src="${bundle}"></script></body></html>`);
  const page = await browser.newPage({ viewport: { width: 1280, height: 860 }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(entry).href);
  const show = async text => {
    await page.evaluate(text => window.dispatchEvent(new MessageEvent('message', { data: { type: 'document', text, dark: false, resourceBase: 'https://webview.test/docs/' } })), text);
    await page.locator('.mwp-prose h1').waitFor();
    await page.evaluate(() => document.fonts.ready);
  };
  await show('# 服务发布运行手册\n\n面向日常发布与故障排查的操作指南。通过大纲快速定位章节，按需调整字号、主题与表格宽度。\n\n## 1. 发布前检查\n\n> [!NOTE]\n> 发布前确认主备节点健康、配置版本一致，并保留回滚所需的备份。\n\n- [x] 配置校验通过\n- [x] 备份已完成\n- [ ] 在维护窗口执行发布\n\n## 2. 执行步骤\n\n在目标节点执行以下命令，检查服务状态和最近的运行日志。\n\n```bash\nsystemctl status example.service\njournalctl -u example.service --since "10 minutes ago"\n```\n\n## 3. 验证与回滚\n\n| 检查项 | 预期结果 | 异常处理 |\n|---|---|---|\n| 服务状态 | `active (running)` | 检查启动日志和配置 |\n| 健康接口 | 返回 `200` | 确认端口与依赖可用 |\n| 主备角色 | 一主一备，角色稳定 | 暂停发布并检查复制状态 |\n| 配置版本 | 与发布版本一致 | 使用备份恢复配置 |\n\n## 4. 操作记录\n\n记录执行时间、版本及验证结果。必要时导出 PDF，归档本次变更。');
  await page.getByRole('button', { name: '调整第 1 列宽度', exact: true }).waitFor();
  await page.screenshot({ path: join(output, 'reading-preview.png') });
  await show('# 配置更新流程\n\nMermaid 图表与正文共用阅读视图；支持明暗主题切换，并可导出至 PDF。\n\n## 1. 节点更新决策\n\n```mermaid\nflowchart LR\n A["接收配置"] --> B{"是否需要更新?"}\n B -->|是| C["执行更新脚本"]\n C --> D["重启并验证服务"]\n B -->|否| E["返回成功"]\n D --> F["记录执行结果"]\n E --> F\n```\n\n## 2. 配置下发时序\n\n```mermaid\nsequenceDiagram\n participant C as 配置中心\n participant N as 业务节点\n C->>N: 下发配置版本\n N->>N: 校验并执行更新\n N-->>C: 返回执行结果\n```');
  await page.waitForFunction(() => document.querySelectorAll('.mwp-mermaid-image').length === 2 && [...document.querySelectorAll('.mwp-mermaid-image')].every(img => img.complete && img.naturalWidth > 0));
  await page.screenshot({ path: join(output, 'mermaid-preview.png') });
  console.log(`Saved actual Webview screenshots to ${output}`);
} finally { await browser.close(); }
