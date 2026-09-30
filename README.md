# Markdown Web Preview · Harness / VS Code / Cursor

两个平台共用 Markdown 渲染、阅读组件与排版样式。在 Harness 中提供网页阅读视图，在 VS Code / Cursor 中提供独立侧边预览；不替换各平台的内置 Markdown 编辑器。

## 安装到 VS Code / Cursor

从 [GitHub Releases](https://github.com/Zelayan/markdown-web-preview/releases) 下载 `.vsix`，在扩展面板菜单选择 **Install from VSIX…** 安装。更新时安装新版即可；如果仍显示旧界面，执行 **Developer: Reload Window** 并重新打开增强预览。

打开 Markdown 文件后，在正文右键菜单选择 **Markdown: 打开增强预览**。也可通过命令面板、编辑器右上角按钮或文件树右键打开。

支持未保存内容实时更新、相对路径图片、VS Code 主题跟随及代码复制。详细开发与安全说明见 [VS Code 说明](vscode/README.md)。

## 功能

- **左侧目录 (TOC)**：多级中文标题自动唯一锚点；支持目录搜索、平滑滚动定位与当前章节高亮。
- **宽度自由拖拽**：拖动目录与正文间的边界调整宽度（140–420 px），双击恢复默认；支持键盘方向键微调与持久化记忆。
- **阅读排版**：舒适行距、克制段距和分层标题间距；支持「通栏 / 居中」、阅读进度、字数/用时预估及回到顶部。
- **主题与配色**：明亮、暗黑、自动主题；六种强调色。行内代码、链接和列表序号跟随强调色，多行代码块跟随明暗主题。在 VS Code / Cursor 中，自动模式跟随编辑器主题。
- **Markdown 元素**：代码块语言标签与复制按钮、可横向滚动的表格、GFM 任务清单、GitHub 风格 Callout（`[!NOTE]`、`[!TIP]`、`[!WARNING]` 等）。
- **实时更新**：VS Code / Cursor 编辑停止约 120ms 后同步未保存内容；Harness 依赖宿主资源监听，保存到磁盘后更新，长文沿用分页加载。
- **PDF 导出**：打开专用 A4 打印版，经浏览器打印窗口保存为 PDF，详见下节。
- **安全处理**：原生 HTML 以文字显示；DOMPurify 过滤危险标签；限制链接和图片协议，避免将本地图片路径发送到远程图片服务器。

## 导出 PDF

1. 在增强预览工具栏点击 **导出 PDF**。
2. 浏览器打开正文打印版，点击 **打印 / 保存为 PDF**。
3. 在打印窗口选择 **另存为 PDF**；在 **更多设置** 中勾选 **背景图形**，保留代码、表格和提示框背景色。

这是浏览器打印流程，需要手动确认保存，不是直接生成 PDF 的独立引擎。浏览器的打印选项优先于页面颜色设置。

打印版特性：

- A4 纸张，去除大纲、工具栏和复制按钮，统一采用浅色纸张排版。
- 行内代码、链接和列表序号使用导出时选择的配色；提示框保留独立的语义颜色。
- 多行代码使用浅灰底、细边框及灰蓝左边线，等宽字体与较宽松行距；长行自动换行。
- 纯文本代码块隐藏 `text`、`txt`、`plain`、`plaintext` 和默认语言标签；`bash`、`json` 等明确语言标签仍保留。
- 表格支持重复表头，行尽量避免跨页拆分；具体分页效果由浏览器决定。
- Harness 文档未分页加载完整时禁用导出，避免遗漏正文。

切换配色或修改文档后，需重新点击导出；已打开的打印页面是静态快照，不会自动更新。VS Code / Cursor 的打印页面写入系统临时目录后由系统打开；依赖本机 HTML 文件关联和浏览器打印能力，远程扩展宿主场景尚未验证。

## 开发与测试

需要 Node.js 与 pnpm。在项目根目录执行：

```sh
pnpm install
pnpm run build
pnpm test
```

构建会同时输出 Harness 的 `lib/client.js` 和 VS Code / Cursor 的 `vscode/webview.js`。修改渲染组件或样式后需重新构建。

在 VS Code 中打开项目根目录，按 F5，选择 **调试 Markdown Web Preview (VS Code)**，即可在扩展开发宿主试用。

打包 VSIX：

```sh
cd vscode
pnpm dlx @vscode/vsce package --allow-missing-repository --skip-license --no-dependencies
```

安装包作为 GitHub Release 附件发布，不提交到源码仓库。当前未发布到 VS Code Marketplace。

## 安装到 Harness

在 DeepSeek Harness 的「插件」页选择安装**本地组合包**，输入克隆后本目录的绝对路径（例如 `$HOME/projects/markdown-web-preview`）。若安装器要求授权依赖的构建脚本，请先确认包名再决定是否授权。安装成功后打开 `.md` 文件，在右侧预览的查看器选项中选择「网页阅读」。已有 Markdown/纯文本查看方式仍保留。

> 安装会影响此 profile 的全部会话，需由使用者在插件页确认。只复制文件到工作区不会自动安装或更新当前 GUI。安装后若当前页面未同步，请刷新已有 GUI；已安装包中的 JavaScript 被覆盖后可能需要重启 Harness。

## 范围与验证

支持 `.md` 与 `.markdown`。Harness 版仅支持 HTTP(S) 远程图片，相对图片以 alt 文本占位。VS Code / Cursor 版支持文档所在目录及子目录中的相对路径图片，禁止向上跳转与绝对路径。

不支持代码语法高亮、Wiki 双链及编辑器双向滚动同步。两端均不执行 Markdown 内的脚本或原生 HTML。

自动化测试覆盖 Harness 注册与交互、渲染安全、VS Code API 消息通道及打印版布局和配色。VS Code 入口使用 API mock 测试；真实编辑器主题、图片加载与最终 PDF 分页效果仍需实际验收。

## v0.3.8 更新

相对于 v0.3.1：

- 代码块背景、标签与复制按钮跟随全局明暗主题。
- 修复行内代码和链接下划线固定紫色的问题。
- 新增两端 PDF 打印导出、彩色打印提示与提示框语义配色。
- PDF 使用独立的文档摘录式代码块，隐藏纯文本语言标签。
- 修复 PDF 配色未接收当前预览选择的问题，并增加回归测试。

完整安装包见 [v0.3.8 Release](https://github.com/Zelayan/markdown-web-preview/releases/tag/v0.3.8)。
