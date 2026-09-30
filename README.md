# Markdown Web Preview · Harness / VS Code / Cursor

两个平台共用 Markdown 渲染、阅读组件与排版样式。在 Harness 中提供网页阅读视图，在 VS Code / Cursor 中提供独立侧边预览；不替换各平台的内置 Markdown 编辑器。

## 安装到 VS Code / Cursor

从 [GitHub Releases](https://github.com/Zelayan/markdown-web-preview/releases) 下载 `.vsix`，在扩展面板菜单选择 **Install from VSIX…** 安装。

打开 Markdown 文件后，在正文右键菜单选择 **Markdown: 打开增强预览**。也可通过命令面板、编辑器右上角按钮或文件树右键打开。

支持未保存内容实时更新、相对路径图片、VS Code 主题跟随及代码复制。详细开发与安全说明见 [VS Code 说明](vscode/README.md)。

## 功能

- **左侧目录 (TOC)**：多级中文标题自动唯一锚点；支持目录搜索筛选、平滑滚动定位与当前章节高亮联动。
- **宽度自由拖拽**：拖动目录与正文间的边界调整宽度（140–420 px），双击恢复默认；支持键盘方向键微调与持久化记忆。
- **现代化阅读体验**：
  - 顶部动态阅读进度条与字数/用时预估徽章。
  - 代码块语言标签 + 一键复制按钮。
  - 响应式表格卡片包装（横向滚动防溢出 + 斑马纹）。
  - GitHub 风格 Callout 警告/提示块（`[!NOTE]`, `[!TIP]`, `[!WARNING]` 等）。
  - GFM 任务清单图标。
  - 明亮 / 暗黑 / 跟随系统主题切换与「通栏 / 居中」排版切换。
  - 浮动「回到顶部」按钮。
- **自动刷新与联动**：基于 Harness 自身的资源监听与分页加载，修改文档即时感知，支持滚动到底部自动加载长文。
- **安全沙箱**：原生 HTML 纯文本化展示；DOMPurify 严格过滤危险标签；链接隔离并限制安全协议；本地敏感相对路径不向外泄露。

## 开发与测试

需要 Node.js 与 pnpm。在插件目录执行：

```bash
pnpm install
pnpm test
pnpm run build
```

构建产物是 `lib/client.js`；已经随此目录一起提供。修改 `src` 后必须重新构建。

## 安装到当前 Harness

在 DeepSeek Harness 的「插件」页选择安装**本地组合包**，输入克隆后本目录的绝对路径（例如 `$HOME/projects/markdown-web-preview`）。若安装器要求授权依赖的构建脚本，请先确认包名再决定是否授权。安装成功后打开 `.md` 文件，在右侧预览的查看器选项中选择「网页阅读」。已有的 Markdown/纯文本查看方式仍在。

> 安装会影响此 profile 的全部会话，需由使用者在插件页确认。只复制文件到工作区不会自动安装或更新当前 GUI。安装后若当前页面未同步，请刷新已有 GUI 页面；已安装包中的 JavaScript 被覆盖后可能需要重启 Harness。

## 范围与限制

当前版本支持 `.md` 与 `.markdown`。Harness 版仅支持 HTTP(S) 远程图片，相对图片以 alt 文本占位，并沿用 Harness 的分页加载。VS Code / Cursor 版支持文档所在目录及子目录的相对路径图片，禁止向上跳转与绝对路径。两端均不执行 Markdown 内的脚本或原生 HTML。

目前不支持代码语法高亮、Wiki 双链及编辑器双向滚动同步。VS Code 入口已通过 API mock 自动化测试，真实 VS Code / Cursor 安装和视觉兼容性仍需用户验收。
