# Markdown Web Preview for VS Code

与 DeepSeek Harness 版共用 Markdown 渲染、样式及阅读组件。提供可拖拽大纲、六种强调色、明暗主题、代码复制和紧凑阅读排版。

## 本地试用

1. 在 VS Code 打开项目根目录（不是 vscode 子目录）。
2. 在项目根目录执行 `pnpm install` 和 `pnpm run build`。
3. 按 F5，选择“调试 Markdown Web Preview (VS Code)”。
4. 在新开的扩展开发宿主窗口打开一个 Markdown 文件。
5. 从命令面板执行 **Markdown: 打开增强预览**，或点击编辑器右上角的预览按钮。

修改内容后约 120ms 自动刷新，不需要先保存。每个文档独立维护一个预览面板；再次执行命令会复用已有面板。

## 打包安装

在本目录执行：

```sh
pnpm dlx @vscode/vsce package --allow-missing-repository --skip-license --no-dependencies
```

在 VS Code 扩展面板的菜单选择 **Install from VSIX…** 安装生成的扩展包。这里只描述本地打包；未发布到 Marketplace。

## 安全与范围

- Markdown 中原生 HTML 以文字显示，不执行脚本。
- 使用 CSP 限制脚本来源，只允许扩展自己的脚本。
- 本地图片仅允许文档所在目录及其子目录中的相对路径，禁止绝对路径和向上跳转；远程 HTTP/HTTPS 图片保持支持。
- 剪贴板操作经扩展宿主执行，避免 Webview 剪贴板权限问题。
- 配色和阅读偏好通过 VS Code Webview state 保存。
- 自动主题跟随 VS Code 明暗模式，手动亮色/暗色优先。
- 当前版本未实现编辑器与预览双向滚动同步、Wiki 双链解析、代码语法高亮，也不会替换内置预览。

## 验证状态

两端构建及自动化测试通过。VS Code 入口采用 API mock 验证命令、面板复用、未保存文档更新、CSP 和剪贴板消息通道；仍需在真实 VS Code 扩展宿主中进行最终安装与视觉验收。
