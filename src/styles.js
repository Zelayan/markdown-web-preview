export const styles = `
/* ==========================================================================
   Markdown Web Preview - High-Density Technical Documentation Engine
   Design Direction: Technical / Developer Docs (Stripe / GitHub / Linear style)
   ========================================================================== */

.mwp-root {
  /* Light Theme Variables - Crisp Engineering Palette */
  --mwp-bg: #ffffff;
  --mwp-surface: #ffffff;
  --mwp-sidebar-bg: #f8fafc;
  --mwp-sidebar-border: #e2e8f0;
  --mwp-ink: #0f172a;
  --mwp-ink-secondary: #334155;
  --mwp-mute: #64748b;
  --mwp-line: #e2e8f0;
  --mwp-line-subtle: #f1f5f9;
  --mwp-accent: #0284c7;
  --mwp-accent-light: #f0f9ff;
  --mwp-accent-hover: #0369a1;
  --mwp-code-bg: #f1f5f9;
  --mwp-pre-bg: #0f172a;
  --mwp-pre-header-bg: #1e293b;
  --mwp-pre-ink: #f8fafc;
  --mwp-table-alt: #f8fafc;
  --mwp-table-th: #f1f5f9;
  --mwp-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --mwp-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08);

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
  font-size: 13px;
}

/* Dark Theme Overrides - High Contrast Deep Slate */
.mwp-root.theme-dark {
  --mwp-bg: #090d16;
  --mwp-surface: #0f172a;
  --mwp-sidebar-bg: #0c1220;
  --mwp-sidebar-border: #1e293b;
  --mwp-ink: #f1f5f9;
  --mwp-ink-secondary: #cbd5e1;
  --mwp-mute: #94a3b8;
  --mwp-line: #1e293b;
  --mwp-line-subtle: #131d31;
  --mwp-accent: #38bdf8;
  --mwp-accent-light: #082f49;
  --mwp-accent-hover: #7dd3fc;
  --mwp-code-bg: #1e293b;
  --mwp-pre-bg: #050811;
  --mwp-pre-header-bg: #0c1220;
  --mwp-pre-ink: #f8fafc;
  --mwp-table-alt: #0c1220;
  --mwp-table-th: #131d31;
  --mwp-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --mwp-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
}

@media (prefers-color-scheme: dark) {
  .mwp-root:not(.theme-light) {
    --mwp-bg: #090d16;
    --mwp-surface: #0f172a;
    --mwp-sidebar-bg: #0c1220;
    --mwp-sidebar-border: #1e293b;
    --mwp-ink: #f1f5f9;
    --mwp-ink-secondary: #cbd5e1;
    --mwp-mute: #94a3b8;
    --mwp-line: #1e293b;
    --mwp-line-subtle: #131d31;
    --mwp-accent: #38bdf8;
    --mwp-accent-light: #082f49;
    --mwp-accent-hover: #7dd3fc;
    --mwp-code-bg: #1e293b;
    --mwp-pre-bg: #050811;
    --mwp-pre-header-bg: #0c1220;
    --mwp-pre-ink: #f8fafc;
    --mwp-table-alt: #0c1220;
    --mwp-table-th: #131d31;
    --mwp-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
    --mwp-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
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
  background: linear-gradient(90deg, var(--mwp-accent), #6366f1);
  transition: width 0.08s ease-out;
}

/* --------------------------------------------------------------------------
   Header / Toolbar (Compact: 36px height)
   -------------------------------------------------------------------------- */
.mwp-toolbar {
  height: 36px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  background: var(--mwp-surface);
  border-bottom: 1px solid var(--mwp-line);
  position: relative;
  z-index: 5;
}

.mwp-identity {
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  min-width: 0;
}

.mwp-monogram {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 3px;
  background: var(--mwp-accent);
  color: #ffffff;
  font: 700 10px/1 'SFMono-Regular', Menlo, monospace;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.mwp-name {
  font-size: 11.5px;
  font-weight: 650;
  letter-spacing: -0.01em;
  color: var(--mwp-ink);
}

.mwp-separator {
  color: var(--mwp-line);
  font-size: 11px;
}

.mwp-format {
  color: var(--mwp-mute);
  font: 700 9px/1 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.06em;
}

.mwp-stats-badge {
  display: inline-flex;
  align-items: center;
  padding: 1px 5px;
  border-radius: 3px;
  background: var(--mwp-line-subtle);
  color: var(--mwp-ink-secondary);
  font-size: 10.5px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  margin-left: 3px;
}

.mwp-toolbar-actions {
  display: flex;
  align-items: center;
  gap: 3px;
  flex-shrink: 0;
}

.mwp-tool-btn {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  height: 24px;
  padding: 0 6px;
  border: 1px solid transparent;
  border-radius: 3px;
  background: transparent;
  color: var(--mwp-ink-secondary);
  font-size: 11px;
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
  height: 24px;
  padding: 0 6px;
  border: 1px solid var(--mwp-line);
  border-radius: 3px;
  background: var(--mwp-surface);
  color: var(--mwp-ink-secondary);
  font-size: 11px;
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
  padding: 0.5px 3.5px;
  border-radius: 6px;
  background: var(--mwp-line-subtle);
  color: var(--mwp-mute);
  font: 600 9px 'SFMono-Regular', Menlo, monospace;
}
.mwp-toggle.is-active .mwp-count {
  background: rgba(2, 132, 199, 0.12);
  color: var(--mwp-accent);
}

/* --------------------------------------------------------------------------
   Layout & Table of Contents Sidebar (High Density: 200px)
   -------------------------------------------------------------------------- */
.mwp-layout {
  display: flex;
  min-height: 0;
  flex: 1;
  position: relative;
}

.mwp-nav {
  width: var(--mwp-toc-width, 200px);
  min-width: var(--mwp-toc-width, 200px);
  flex: 0 0 var(--mwp-toc-width, 200px);
  display: flex;
  flex-direction: column;
  background: var(--mwp-sidebar-bg);
  border-right: 1px solid var(--mwp-sidebar-border);
  padding: 8px 6px 6px 8px;
  user-select: none;
}

.mwp-nav-kicker {
  padding-left: 4px;
  color: var(--mwp-mute);
  font: 700 9px/1 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.08em;
}

.mwp-search-row {
  position: relative;
  display: flex;
  align-items: center;
  margin: 6px 0 5px;
}

.mwp-search {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  padding: 3px 6px;
  border: 1px solid var(--mwp-line);
  background: var(--mwp-surface);
  border-radius: 3px;
  color: var(--mwp-mute);
  transition: border-color 0.1s ease;
}

.mwp-search:focus-within {
  border-color: var(--mwp-accent);
}

.mwp-search span {
  font-size: 11px;
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
  font-size: 11px;
  font-family: inherit;
}

.mwp-search input::placeholder {
  color: var(--mwp-mute);
}

.mwp-search-clear {
  position: absolute;
  right: 4px;
  display: grid;
  place-items: center;
  width: 14px;
  height: 14px;
  border: 0;
  border-radius: 50%;
  background: var(--mwp-line);
  color: var(--mwp-ink-secondary);
  font-size: 9.5px;
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
  width: 3px;
}
.mwp-nav-items::-webkit-scrollbar-thumb {
  background: var(--mwp-line);
  border-radius: 2px;
}

.mwp-nav-item {
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
  border: 0;
  border-radius: 3px;
  padding: 3px 5px 3px calc(5px + var(--mwp-level, 0) * 8px);
  background: transparent;
  color: var(--mwp-ink-secondary);
  text-align: left;
  font-size: 11px;
  line-height: 1.3;
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
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--mwp-mute);
  flex-shrink: 0;
  opacity: 0.4;
}
.mwp-nav-item.is-current .mwp-level-dot {
  background: var(--mwp-accent);
  opacity: 1;
  transform: scale(1.3);
}

.mwp-empty {
  font-size: 10px;
  color: var(--mwp-mute);
  padding: 6px 3px;
  text-align: center;
}

.mwp-nav-footer {
  padding: 6px 3px 0;
  border-top: 1px solid var(--mwp-line-subtle);
  color: var(--mwp-mute);
  font: 700 8px/1 'SFMono-Regular', Menlo, monospace;
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

.mwp-resize-grip {
  display: none;
}

.mwp-layout.is-resizing {
  user-select: none;
  cursor: col-resize;
}

/* --------------------------------------------------------------------------
   Article / Document Viewport (Dense & Direct, High Content Fill Rate)
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
}

.mwp-article {
  max-width: 960px;
  margin: 0 auto;
  padding: 14px 24px 48px;
  transition: max-width 0.1s ease;
}

.mwp-article.is-wide {
  max-width: 100%;
  padding-left: 20px;
  padding-right: 20px;
}

/* --------------------------------------------------------------------------
   Prose / Markdown Content Typography (Ultra High Density & Pro Docs Style)
   -------------------------------------------------------------------------- */
.mwp-prose {
  font-size: 13px;
  line-height: 1.55;
  color: var(--mwp-ink);
  overflow-wrap: anywhere;
}

/* Default Density Settings */
.mwp-prose h1 {
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -0.015em;
  margin: 0 0 8px;
  padding-bottom: 5px;
  border-bottom: 1px solid var(--mwp-line);
  color: var(--mwp-ink);
  line-height: 1.25;
}

.mwp-prose h2 {
  font-size: 15px;
  font-weight: 650;
  letter-spacing: -0.01em;
  margin: 14px 0 6px;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--mwp-line-subtle);
  color: var(--mwp-ink);
  line-height: 1.3;
}

.mwp-prose h3 {
  font-size: 13.5px;
  font-weight: 650;
  margin: 10px 0 4px;
  color: var(--mwp-ink);
  line-height: 1.35;
}

.mwp-prose h4 {
  font-size: 12.5px;
  font-weight: 600;
  margin: 8px 0 3px;
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
  opacity: 0.4;
  font-weight: 400;
  font-size: 0.85em;
}

.mwp-prose p {
  margin: 5px 0;
}

.mwp-prose a {
  color: var(--mwp-accent);
  text-decoration: underline;
  text-decoration-color: rgba(2, 132, 199, 0.35);
  text-underline-offset: 2px;
  transition: color 0.1s ease;
}

.mwp-prose a:hover {
  color: var(--mwp-accent-hover);
  text-decoration-color: currentColor;
}

.mwp-prose strong {
  color: var(--mwp-ink);
  font-weight: 650;
}

/* Zero loose space lists */
.mwp-prose ul,
.mwp-prose ol {
  padding-left: 18px;
  margin: 3px 0 5px;
}

.mwp-prose li {
  margin: 1.5px 0;
  padding-left: 1px;
}

.mwp-prose li > p {
  margin: 1px 0 !important;
}

.mwp-prose li > ul,
.mwp-prose li > ol {
  margin: 1px 0 2px !important;
}

.mwp-prose li::marker {
  color: var(--mwp-mute);
  font-size: 0.9em;
}

/* Task Lists */
.mwp-task-item {
  list-style-type: none;
  margin-left: -15px !important;
  display: flex;
  align-items: baseline;
  gap: 5px;
}

.mwp-task-check {
  display: inline-grid;
  place-items: center;
  width: 12px;
  height: 12px;
  border: 1px solid var(--mwp-line);
  border-radius: 2.5px;
  background: var(--mwp-surface);
  font-size: 8.5px;
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

/* Inline Code */
.mwp-prose code {
  font-family: 'SFMono-Regular', Menlo, Monaco, Consolas, monospace;
  font-size: 11.5px;
  background: var(--mwp-code-bg);
  border-radius: 3px;
  padding: 1px 4px;
  color: var(--mwp-ink);
  border: 1px solid var(--mwp-line);
}

/* Code Blocks */
.mwp-code-block {
  margin: 8px 0;
  border-radius: 4px;
  background: var(--mwp-pre-bg);
  border: 1px solid var(--mwp-line);
  overflow: hidden;
  box-shadow: var(--mwp-shadow-sm);
}

.mwp-code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 10px;
  background: var(--mwp-pre-header-bg);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.mwp-code-lang {
  color: #94a3b8;
  font: 600 9px/1 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.mwp-code-copy {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 1.5px 5px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.06);
  color: #cbd5e1;
  font-size: 10px;
  cursor: pointer;
  transition: all 0.1s ease;
}

.mwp-code-copy:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
}

.mwp-code-copy.is-copied {
  background: var(--mwp-accent);
  border-color: var(--mwp-accent);
  color: #ffffff;
  font-weight: 600;
}

.mwp-code-block pre {
  margin: 0;
  padding: 8px 12px;
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
  font-size: 11.5px;
}

/* Fallback Raw HTML code blocks */
.mwp-prose pre.mwp-raw-html {
  border: 1px solid var(--mwp-line);
  border-radius: 4px;
  background: var(--mwp-code-bg);
  padding: 6px 10px;
  overflow-x: auto;
  font-size: 11.5px;
  white-space: pre-wrap;
  margin: 6px 0;
}

/* Tables */
.mwp-table-wrap {
  width: 100%;
  overflow-x: auto;
  margin: 8px 0;
  border: 1px solid var(--mwp-line);
  border-radius: 4px;
  box-shadow: var(--mwp-shadow-sm);
  background: var(--mwp-surface);
}

.mwp-prose table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11.5px;
  line-height: 1.45;
}

.mwp-prose th,
.mwp-prose td {
  padding: 5px 8px;
  border-bottom: 1px solid var(--mwp-line);
  text-align: left;
  vertical-align: top;
}

.mwp-prose th {
  background: var(--mwp-table-th);
  color: var(--mwp-ink);
  font-weight: 650;
  border-bottom: 1.5px solid var(--mwp-line);
  white-space: nowrap;
}

.mwp-prose tr:nth-child(even) td {
  background: var(--mwp-table-alt);
}

.mwp-prose tr:last-child td {
  border-bottom: 0;
}

/* Blockquotes & Callouts */
.mwp-prose blockquote {
  margin: 8px 0;
  padding: 4px 10px;
  border-left: 3px solid var(--mwp-accent);
  background: var(--mwp-accent-light);
  border-radius: 0 3px 3px 0;
  color: var(--mwp-ink-secondary);
}

.mwp-callout {
  border-left-width: 3px;
}

.mwp-callout-title {
  font: 700 9.5px/1 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.05em;
  margin-bottom: 3px;
  text-transform: uppercase;
}

.mwp-callout-note {
  border-left-color: #0284c7;
  background: rgba(2, 132, 199, 0.06);
}
.mwp-callout-note .mwp-callout-title { color: #0284c7; }

.mwp-callout-tip {
  border-left-color: #10b981;
  background: rgba(16, 185, 129, 0.06);
}
.mwp-callout-tip .mwp-callout-title { color: #10b981; }

.mwp-callout-important {
  border-left-color: #8b5cf6;
  background: rgba(139, 92, 246, 0.06);
}
.mwp-callout-important .mwp-callout-title { color: #8b5cf6; }

.mwp-callout-warning {
  border-left-color: #f59e0b;
  background: rgba(245, 158, 11, 0.06);
}
.mwp-callout-warning .mwp-callout-title { color: #f59e0b; }

.mwp-callout-caution {
  border-left-color: #ef4444;
  background: rgba(239, 68, 68, 0.06);
}
.mwp-callout-caution .mwp-callout-title { color: #ef4444; }

.mwp-prose hr {
  border: 0;
  border-top: 1px solid var(--mwp-line);
  margin: 14px 0;
}

.mwp-prose img {
  max-width: 100%;
  border-radius: 3px;
  box-shadow: var(--mwp-shadow-sm);
}

.mwp-page-note {
  text-align: center;
  padding: 10px 0;
  color: var(--mwp-mute);
  font-size: 10.5px;
}

.mwp-document-end {
  text-align: center;
  border-top: 1px solid var(--mwp-line);
  margin-top: 20px;
  padding-top: 10px;
  color: var(--mwp-mute);
  font: 600 9px 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.08em;
}

/* Floating Back-To-Top Button */
.mwp-back-to-top {
  position: absolute;
  right: 14px;
  bottom: 14px;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 3px 8px;
  border-radius: 12px;
  border: 1px solid var(--mwp-line);
  background: var(--mwp-surface);
  color: var(--mwp-ink-secondary);
  font-size: 10px;
  font-weight: 600;
  box-shadow: var(--mwp-shadow-sm);
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
  .mwp-article {
    padding: 10px 12px 40px;
  }
  .mwp-prose h1 { font-size: 17px; }
  .mwp-prose h2 { font-size: 14px; }
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
    left: var(--mwp-toc-width, 200px);
    z-index: 21;
  }
  .mwp-identity .mwp-format,
  .mwp-identity .mwp-separator {
    display: none;
  }
}
`;
