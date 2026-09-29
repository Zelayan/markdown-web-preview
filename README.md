# Markdown Web Preview · Harness 插件

用网页阅读视图替换 `.md` / `.markdown` 文件预览（内置 Markdown 仍保留在查看器下拉菜单中）。

## 功能

- 左侧目录：中文标题、同名标题自动生成唯一锚点；目录筛选与点击跳转。拖动目录右侧边界调整宽度（140–420 px），双击恢复默认；也支持方向键、Home/End，宽度自动记忆。
- 正文：GFM 表格、代码块、引用、列表等排版；响应式阅读布局。
- 自动刷新和手动刷新：使用 Harness 文档预览原有的资源监听、分页加载和刷新按钮，无需轮询文件。
- 安全：原生 HTML 只显示为文字；DOMPurify 再清理渲染结果；链接限制为 HTTP(S)/mailto 并隔离新窗口；不加载本地相对图片（防止误向外部域名泄漏本地路径）。

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

当前版本仅接管 `.md` 与 `.markdown`，仅支持 HTTP(S) 远程图片；相对图片以 alt 文本占位。全文内容较长时沿用 Harness 的分页加载，向下滚动触发加载后续内容。外部链接会在新标签页打开。此插件不执行 Markdown 内的脚本或 HTML。
