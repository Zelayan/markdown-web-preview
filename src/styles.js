export const styles = `
/* ==========================================================================
   Markdown Web Preview - Classic Wiki / Confluence Reading Theme
   Focus: Wiki typography, structured headings, bordered tables, panel callouts
   ========================================================================== */

.mwp-root {
  /* Light Theme (Confluence / MediaWiki Classical Style) */
  --mwp-bg: #f4f5f7;
  --mwp-page-bg: #ffffff;
  --mwp-surface: #ffffff;
  --mwp-sidebar-bg: #f4f5f7;
  --mwp-sidebar-border: #dfe1e6;
  --mwp-ink: #172b4d;
  --mwp-ink-secondary: #42526e;
  --mwp-mute: #6b778c;
  --mwp-line: #dfe1e6;
  --mwp-line-subtle: #ebecf0;
  --mwp-accent: #0052cc;
  --mwp-accent-light: #deebff;
  --mwp-accent-hover: #0747a6;
  --mwp-code-bg: #f4f5f7;
  --mwp-pre-bg: #f4f5f7;
  --mwp-pre-header-bg: #ebecf0;
  --mwp-pre-ink: #172b4d;
  --mwp-table-alt: #fafbfc;
  --mwp-table-th: #f4f5f7;
  --mwp-shadow-page: 0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31);

  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  background: var(--mwp-bg);
  color: var(--mwp-ink);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  position: relative;
  font-size: 14px;
}

/* Dark Theme */
.mwp-root.theme-dark {
  --mwp-bg: #101214;
  --mwp-page-bg: #1c2127;
  --mwp-surface: #1c2127;
  --mwp-sidebar-bg: #161a1f;
  --mwp-sidebar-border: #2c333a;
  --mwp-ink: #dcdfe4;
  --mwp-ink-secondary: #9fadbc;
  --mwp-mute: #738496;
  --mwp-line: #2c333a;
  --mwp-line-subtle: #22272b;
  --mwp-accent: #579dff;
  --mwp-accent-light: #1c2b42;
  --mwp-accent-hover: #85b8ff;
  --mwp-code-bg: #22272b;
  --mwp-pre-bg: #161a1f;
  --mwp-pre-header-bg: #22272b;
  --mwp-pre-ink: #dcdfe4;
  --mwp-table-alt: #181c22;
  --mwp-table-th: #22272b;
  --mwp-shadow-page: 0 1px 3px rgba(0, 0, 0, 0.4);
}

@media (prefers-color-scheme: dark) {
  .mwp-root:not(.theme-light) {
    --mwp-bg: #101214;
    --mwp-page-bg: #1c2127;
    --mwp-surface: #1c2127;
    --mwp-sidebar-bg: #161a1f;
    --mwp-sidebar-border: #2c333a;
    --mwp-ink: #dcdfe4;
    --mwp-ink-secondary: #9fadbc;
    --mwp-mute: #738496;
    --mwp-line: #2c333a;
    --mwp-line-subtle: #22272b;
    --mwp-accent: #579dff;
    --mwp-accent-light: #1c2b42;
    --mwp-accent-hover: #85b8ff;
    --mwp-code-bg: #22272b;
    --mwp-pre-bg: #161a1f;
    --mwp-pre-header-bg: #22272b;
    --mwp-pre-ink: #dcdfe4;
    --mwp-table-alt: #181c22;
    --mwp-table-th: #22272b;
    --mwp-shadow-page: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
}

.mwp-root * {
  box-sizing: border-box;
}

/* --------------------------------------------------------------------------
   Reading Progress Bar
   -------------------------------------------------------------------------- */
.mwp-progress-track {
  position: absolute;
  top: 36px;
  left: 0;
  right: 0;
  height: 2px;
  background: transparent;
  z-index: 10;
  pointer-events: none;
}
.mwp-progress-fill {
  height: 100%;
  width: var(--mwp-progress, 0%);
  background: var(--mwp-accent);
  transition: width 0.08s ease-out;
}

/* --------------------------------------------------------------------------
   Header / Toolbar (Wiki Top Bar: 36px)
   -------------------------------------------------------------------------- */
.mwp-toolbar {
  height: 36px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  background: var(--mwp-surface);
  border-bottom: 1px solid var(--mwp-line);
  position: relative;
  z-index: 5;
}

.mwp-identity {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  min-width: 0;
}

.mwp-monogram {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  background: var(--mwp-accent);
  color: #ffffff;
  font: 700 11px/1 'SFMono-Regular', Menlo, monospace;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
}

.mwp-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--mwp-ink);
}

.mwp-separator {
  color: var(--mwp-line);
  font-size: 12px;
}

.mwp-stats-badge {
  display: inline-flex;
  align-items: center;
  padding: 1px 6px;
  border-radius: 3px;
  background: var(--mwp-line-subtle);
  color: var(--mwp-ink-secondary);
  font-size: 11px;
  margin-left: 2px;
}

.mwp-toolbar-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.mwp-tool-btn {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  height: 25px;
  padding: 0 7px;
  border: 1px solid transparent;
  border-radius: 3px;
  background: transparent;
  color: var(--mwp-ink-secondary);
  font-size: 11.5px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.1s ease;
}

.mwp-tool-btn:hover {
  background: var(--mwp-line-subtle);
  color: var(--mwp-ink);
}

.mwp-tool-btn.is-active {
  background: var(--mwp-accent-light);
  color: var(--mwp-accent);
  font-weight: 600;
}

.mwp-toggle {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 25px;
  padding: 0 7px;
  border: 1px solid var(--mwp-line);
  border-radius: 3px;
  background: var(--mwp-surface);
  color: var(--mwp-ink-secondary);
  font-size: 11.5px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.1s ease;
}

.mwp-toggle:hover {
  background: var(--mwp-line-subtle);
  color: var(--mwp-ink);
}

.mwp-toggle.is-active {
  background: var(--mwp-accent-light);
  border-color: transparent;
  color: var(--mwp-accent);
  font-weight: 600;
}

.mwp-count {
  display: inline-block;
  padding: 0.5px 4px;
  border-radius: 6px;
  background: var(--mwp-line-subtle);
  color: var(--mwp-mute);
  font: 600 9px 'SFMono-Regular', Menlo, monospace;
}

/* --------------------------------------------------------------------------
   Layout & Wiki Sidebar / Tree
   -------------------------------------------------------------------------- */
.mwp-layout {
  display: flex;
  min-height: 0;
  flex: 1;
  position: relative;
}

.mwp-nav {
  width: var(--mwp-toc-width, 220px);
  min-width: var(--mwp-toc-width, 220px);
  flex: 0 0 var(--mwp-toc-width, 220px);
  display: flex;
  flex-direction: column;
  background: var(--mwp-sidebar-bg);
  border-right: 1px solid var(--mwp-sidebar-border);
  padding: 10px 8px 8px 10px;
  user-select: none;
}

.mwp-nav-kicker {
  padding-left: 4px;
  color: var(--mwp-mute);
  font: 700 10px/1 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.08em;
}

.mwp-search-row {
  position: relative;
  display: flex;
  align-items: center;
  margin: 6px 0 6px;
}

.mwp-search {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  padding: 4px 6px;
  border: 1px solid var(--mwp-line);
  background: var(--mwp-surface);
  border-radius: 3px;
  color: var(--mwp-mute);
}

.mwp-search:focus-within {
  border-color: var(--mwp-accent);
}

.mwp-search span {
  font-size: 12px;
  line-height: 1;
  flex-shrink: 0;
}

.mwp-search input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--mwp-ink);
  font-size: 11.5px;
  font-family: inherit;
}

.mwp-search input::placeholder {
  color: var(--mwp-mute);
}

.mwp-search-clear {
  position: absolute;
  right: 5px;
  display: grid;
  place-items: center;
  width: 15px;
  height: 15px;
  border: 0;
  border-radius: 50%;
  background: var(--mwp-line);
  color: var(--mwp-ink-secondary);
  font-size: 10px;
  cursor: pointer;
}

.mwp-search-clear:hover {
  background: var(--mwp-accent);
  color: #fff;
}

.mwp-nav-items {
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  padding-right: 2px;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.mwp-nav-items::-webkit-scrollbar {
  width: 4px;
}
.mwp-nav-items::-webkit-scrollbar-thumb {
  background: var(--mwp-line);
  border-radius: 2px;
}

.mwp-nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  border: 0;
  border-radius: 3px;
  padding: 4px 6px 4px calc(6px + var(--mwp-level, 0) * 10px);
  background: transparent;
  color: var(--mwp-ink-secondary);
  text-align: left;
  font-size: 11.5px;
  line-height: 1.35;
  cursor: pointer;
  transition: all 0.08s ease;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mwp-nav-item:hover {
  background: var(--mwp-line-subtle);
  color: var(--mwp-ink);
}

.mwp-nav-item.is-current {
  background: var(--mwp-accent-light);
  color: var(--mwp-accent);
  font-weight: 600;
}

.mwp-level-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--mwp-mute);
  flex-shrink: 0;
  opacity: 0.4;
}
.mwp-nav-item.is-current .mwp-level-dot {
  background: var(--mwp-accent);
  opacity: 1;
  transform: scale(1.2);
}

.mwp-empty {
  font-size: 11px;
  color: var(--mwp-mute);
  padding: 8px 4px;
  text-align: center;
}

.mwp-nav-footer {
  padding: 6px 4px 0;
  border-top: 1px solid var(--mwp-line-subtle);
  color: var(--mwp-mute);
  font: 700 8.5px/1 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.06em;
}

/* --------------------------------------------------------------------------
   Divider / Resizer Handle
   -------------------------------------------------------------------------- */
.mwp-resize {
  position: relative;
  z-index: 4;
  flex: 0 0 5px;
  align-self: stretch;
  cursor: col-resize;
  background: transparent;
  margin-left: -3px;
  margin-right: -2px;
  outline: none;
  touch-action: none;
}

.mwp-resize:hover,
.mwp-resize:focus-visible,
.mwp-layout.is-resizing .mwp-resize {
  background: var(--mwp-accent);
}

.mwp-layout.is-resizing {
  user-select: none;
  cursor: col-resize;
}

/* --------------------------------------------------------------------------
   Wiki Content Viewport & White Canvas Paper
   -------------------------------------------------------------------------- */
.mwp-scroller {
  min-width: 0;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  scroll-behavior: smooth;
  position: relative;
  background: var(--mwp-bg);
  padding: 16px 20px 48px;
}

.mwp-article {
  /* Wiki Paper Container */
  max-width: 980px;
  margin: 0;
  background: var(--mwp-page-bg);
  border: 1px solid var(--mwp-sidebar-border);
  border-radius: 3px;
  box-shadow: var(--mwp-shadow-page);
  padding: 24px 32px 40px;
  transition: max-width 0.1s ease;
}

.mwp-article.is-wide {
  max-width: 100%;
}

/* --------------------------------------------------------------------------
   Wiki Typography & Section Styles (Confluence Look & Feel)
   -------------------------------------------------------------------------- */
.mwp-prose {
  font-size: 14px;
  line-height: 1.6;
  color: var(--mwp-ink);
  overflow-wrap: anywhere;
}

/* Headings with Wiki hierarchy */
.mwp-prose h1 {
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--mwp-line);
  color: var(--mwp-ink);
  line-height: 1.25;
}

.mwp-prose h2 {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 24px 0 10px 0;
  padding-bottom: 5px;
  border-bottom: 1px solid var(--mwp-line);
  color: var(--mwp-ink);
  line-height: 1.3;
}

.mwp-prose h3 {
  font-size: 15px;
  font-weight: 600;
  margin: 18px 0 6px 0;
  color: var(--mwp-ink);
  line-height: 1.35;
}

.mwp-prose h4 {
  font-size: 13.5px;
  font-weight: 600;
  margin: 14px 0 4px 0;
  color: var(--mwp-ink-secondary);
}

.mwp-prose h1,
.mwp-prose h2,
.mwp-prose h3,
.mwp-prose h4 {
  scroll-margin-top: 16px;
  position: relative;
}

.mwp-prose h1:hover::after,
.mwp-prose h2:hover::after,
.mwp-prose h3:hover::after,
.mwp-prose h4:hover::after {
  content: ' #';
  color: var(--mwp-accent);
  opacity: 0.35;
  font-weight: 400;
  font-size: 0.85em;
}

.mwp-prose p {
  margin: 8px 0;
}

/* Wiki Links */
.mwp-prose a {
  color: var(--mwp-accent);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.1s ease;
}

.mwp-prose a:hover {
  color: var(--mwp-accent-hover);
  text-decoration: underline;
}

.mwp-prose strong {
  color: var(--mwp-ink);
  font-weight: 600;
}

/* Wiki Lists */
.mwp-prose ul,
.mwp-prose ol {
  padding-left: 24px;
  margin: 6px 0 10px;
}

.mwp-prose li {
  margin: 3px 0;
  padding-left: 2px;
}

.mwp-prose li > p {
  margin: 2px 0 !important;
}

.mwp-prose li > ul,
.mwp-prose li > ol {
  margin: 3px 0 4px !important;
}

.mwp-prose li::marker {
  color: var(--mwp-mute);
}

/* Task Lists */
.mwp-task-item {
  list-style-type: none;
  margin-left: -18px !important;
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.mwp-task-check {
  display: inline-grid;
  place-items: center;
  width: 14px;
  height: 14px;
  border: 1px solid var(--mwp-line);
  border-radius: 2px;
  background: var(--mwp-surface);
  font-size: 10px;
  line-height: 1;
  color: var(--mwp-accent);
  flex-shrink: 0;
}

.mwp-task-check.is-checked {
  background: var(--mwp-accent);
  border-color: var(--mwp-accent);
  color: #ffffff;
  font-weight: bold;
}

/* Wiki Inline Code */
.mwp-prose code {
  font-family: 'SFMono-Regular', Menlo, Monaco, Consolas, monospace;
  font-size: 12.5px;
  background: var(--mwp-code-bg);
  border-radius: 3px;
  padding: 1.5px 4.5px;
  color: var(--mwp-ink);
  border: 1px solid var(--mwp-line);
}

/* Wiki Code Macro Block (Confluence styled) */
.mwp-code-block {
  margin: 12px 0;
  border-radius: 3px;
  background: var(--mwp-pre-bg);
  border: 1px solid var(--mwp-line);
  overflow: hidden;
}

.mwp-code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 12px;
  background: var(--mwp-pre-header-bg);
  border-bottom: 1px solid var(--mwp-line);
}

.mwp-code-lang {
  color: var(--mwp-ink-secondary);
  font: 600 10.5px/1 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.mwp-code-copy {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 2px 7px;
  border: 1px solid var(--mwp-line);
  border-radius: 3px;
  background: var(--mwp-surface);
  color: var(--mwp-ink-secondary);
  font-size: 11px;
  cursor: pointer;
  transition: all 0.1s ease;
}

.mwp-code-copy:hover {
  background: var(--mwp-line-subtle);
  color: var(--mwp-ink);
}

.mwp-code-copy.is-copied {
  background: var(--mwp-accent);
  border-color: var(--mwp-accent);
  color: #ffffff;
  font-weight: 600;
}

.mwp-code-block pre {
  margin: 0;
  padding: 10px 14px;
  overflow-x: auto;
  line-height: 1.45;
  background: transparent;
  border: 0;
}

.mwp-code-block pre code {
  background: transparent;
  padding: 0;
  border: 0;
  color: var(--mwp-pre-ink);
  font-size: 12px;
}

/* Fallback Raw HTML code blocks */
.mwp-prose pre.mwp-raw-html {
  border: 1px solid var(--mwp-line);
  border-radius: 3px;
  background: var(--mwp-code-bg);
  padding: 8px 12px;
  overflow-x: auto;
  font-size: 12px;
  white-space: pre-wrap;
  margin: 8px 0;
}

/* Wiki Tables (Classic Confluence bordered grid) */
.mwp-table-wrap {
  width: 100%;
  overflow-x: auto;
  margin: 14px 0;
  border-radius: 2px;
}

.mwp-prose table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  line-height: 1.5;
  border: 1px solid var(--mwp-line);
}

.mwp-prose th,
.mwp-prose td {
  padding: 7px 12px;
  border: 1px solid var(--mwp-line);
  text-align: left;
  vertical-align: top;
}

.mwp-prose th {
  background: var(--mwp-table-th);
  color: var(--mwp-ink);
  font-weight: 600;
  white-space: nowrap;
}

.mwp-prose tr:nth-child(even) td {
  background: var(--mwp-table-alt);
}

/* Confluence Info / Warning / Note Panels */
.mwp-prose blockquote {
  margin: 12px 0;
  padding: 10px 14px;
  border-left: 4px solid var(--mwp-accent);
  background: var(--mwp-accent-light);
  border-radius: 3px;
  color: var(--mwp-ink);
}

.mwp-callout {
  border-left-width: 4px;
}

.mwp-callout-title {
  font: 700 11px/1 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.04em;
  margin-bottom: 4px;
  text-transform: uppercase;
}

.mwp-callout-note {
  border-left-color: #0052cc;
  background: #deebff;
}
.mwp-callout-note .mwp-callout-title { color: #0747a6; }

.mwp-callout-tip {
  border-left-color: #36b37e;
  background: #e3fcef;
}
.mwp-callout-tip .mwp-callout-title { color: #006644; }

.mwp-callout-important {
  border-left-color: #6554c0;
  background: #eae6ff;
}
.mwp-callout-important .mwp-callout-title { color: #403294; }

.mwp-callout-warning {
  border-left-color: #ffab00;
  background: #fff0b3;
}
.mwp-callout-warning .mwp-callout-title { color: #172b4d; }

.mwp-callout-caution {
  border-left-color: #ff5630;
  background: #ffebe6;
}
.mwp-callout-caution .mwp-callout-title { color: #bf2600; }

.mwp-prose hr {
  border: 0;
  border-top: 1px solid var(--mwp-line);
  margin: 20px 0;
}

.mwp-prose img {
  max-width: 100%;
  border-radius: 3px;
  border: 1px solid var(--mwp-line);
}

.mwp-page-note {
  text-align: center;
  padding: 12px 0;
  color: var(--mwp-mute);
  font-size: 11px;
}

.mwp-document-end {
  text-align: center;
  border-top: 1px solid var(--mwp-line);
  margin-top: 32px;
  padding-top: 16px;
  color: var(--mwp-mute);
  font: 600 10px 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.08em;
}

/* Floating Back-To-Top Button */
.mwp-back-to-top {
  position: absolute;
  right: 24px;
  bottom: 24px;
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 4px 10px;
  border-radius: 14px;
  border: 1px solid var(--mwp-line);
  background: var(--mwp-surface);
  color: var(--mwp-ink-secondary);
  font-size: 11px;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(9, 30, 66, 0.15);
  cursor: pointer;
  transition: all 0.1s ease;
  z-index: 10;
  opacity: 0.9;
}

.mwp-back-to-top:hover {
  opacity: 1;
  background: var(--mwp-accent-light);
  color: var(--mwp-accent);
  border-color: var(--mwp-accent);
}

/* --------------------------------------------------------------------------
   Responsive & Mobile Adaptations
   -------------------------------------------------------------------------- */
@media (max-width: 700px) {
  .mwp-scroller {
    padding: 10px 10px 30px;
  }
  .mwp-article {
    padding: 16px 16px 30px;
  }
  .mwp-prose h1 { font-size: 20px; }
  .mwp-prose h2 { font-size: 16px; }
  .mwp-stats-badge { display: none; }
}

@media (max-width: 480px) {
  .mwp-root.mwp-toc-open .mwp-nav {
    position: absolute;
    z-index: 20;
    top: 36px;
    bottom: 0;
    box-shadow: 4px 0 14px rgba(0, 0, 0, 0.2);
  }
  .mwp-layout {
    position: relative;
  }
  .mwp-resize {
    position: absolute;
    top: 0;
    bottom: 0;
    left: var(--mwp-toc-width, 220px);
    z-index: 21;
  }
}
`;
