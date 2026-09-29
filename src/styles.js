export const styles = `
/* ==========================================================================
   Markdown Web Preview - Compact & Refined Editorial Reader Theme
   ========================================================================== */

.mwp-root {
  /* Light Theme Variables */
  --mwp-bg: #f9fafb;
  --mwp-surface: #ffffff;
  --mwp-sidebar-bg: #f3f5f7;
  --mwp-ink: #1f2937;
  --mwp-ink-secondary: #4b5563;
  --mwp-mute: #9ca3af;
  --mwp-line: #e5e7eb;
  --mwp-line-subtle: #f3f4f6;
  --mwp-accent: #0f766e;
  --mwp-accent-light: #f0fdfa;
  --mwp-accent-hover: #115e59;
  --mwp-code-bg: #f3f4f6;
  --mwp-pre-bg: #111827;
  --mwp-pre-header-bg: #1f2937;
  --mwp-pre-ink: #f9fafb;
  --mwp-table-alt: #f9fafb;
  --mwp-table-th: #f3f4f6;
  --mwp-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --mwp-shadow-md: 0 4px 12px rgba(0, 0, 0, 0.06);

  /* Backwards compatibility */
  --ink: var(--mwp-ink);
  --mute: var(--mwp-mute);
  --line: var(--mwp-line);
  --paper: var(--mwp-bg);
  --accent: var(--mwp-accent);

  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  background: var(--mwp-bg);
  color: var(--mwp-ink);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  position: relative;
  font-size: 13px;
}

/* Dark Theme Overrides */
.mwp-root.theme-dark {
  --mwp-bg: #0f1412;
  --mwp-surface: #151c18;
  --mwp-sidebar-bg: #121714;
  --mwp-ink: #e5ede7;
  --mwp-ink-secondary: #9cb1a4;
  --mwp-mute: #6f8275;
  --mwp-line: #222d25;
  --mwp-line-subtle: #19221c;
  --mwp-accent: #2dd4bf;
  --mwp-accent-light: #13332a;
  --mwp-accent-hover: #5eead4;
  --mwp-code-bg: #1b241e;
  --mwp-pre-bg: #0a0e0c;
  --mwp-pre-header-bg: #121814;
  --mwp-pre-ink: #f0fdf4;
  --mwp-table-alt: #121815;
  --mwp-table-th: #18211b;
  --mwp-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
  --mwp-shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
}

@media (prefers-color-scheme: dark) {
  .mwp-root:not(.theme-light) {
    --mwp-bg: #0f1412;
    --mwp-surface: #151c18;
    --mwp-sidebar-bg: #121714;
    --mwp-ink: #e5ede7;
    --mwp-ink-secondary: #9cb1a4;
    --mwp-mute: #6f8275;
    --mwp-line: #222d25;
    --mwp-line-subtle: #19221c;
    --mwp-accent: #2dd4bf;
    --mwp-accent-light: #13332a;
    --mwp-accent-hover: #5eead4;
    --mwp-code-bg: #1b241e;
    --mwp-pre-bg: #0a0e0c;
    --mwp-pre-header-bg: #121814;
    --mwp-pre-ink: #f0fdf4;
    --mwp-table-alt: #121815;
    --mwp-table-th: #18211b;
    --mwp-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
    --mwp-shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
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
  top: 40px;
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
  background: linear-gradient(90deg, var(--mwp-accent), #38b2ac);
  transition: width 0.08s ease-out;
}

/* --------------------------------------------------------------------------
   Header / Toolbar (Compact: 40px height)
   -------------------------------------------------------------------------- */
.mwp-toolbar {
  height: 40px;
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
  gap: 7px;
  white-space: nowrap;
  min-width: 0;
}

.mwp-monogram {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: var(--mwp-accent);
  color: #ffffff;
  font: 700 11px/1 'SFMono-Regular', Menlo, monospace;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
  flex-shrink: 0;
}

.mwp-name {
  font-size: 12px;
  font-weight: 650;
  letter-spacing: -0.01em;
  color: var(--mwp-ink);
}

.mwp-separator {
  color: var(--mwp-line);
  font-size: 12px;
}

.mwp-format {
  color: var(--mwp-mute);
  font: 600 9.5px/1 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.08em;
}

.mwp-stats-badge {
  display: inline-flex;
  align-items: center;
  padding: 1px 6px;
  border-radius: 3px;
  background: var(--mwp-line-subtle);
  color: var(--mwp-ink-secondary);
  font-size: 11px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  margin-left: 4px;
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
  gap: 4px;
  height: 26px;
  padding: 0 7px;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  color: var(--mwp-ink-secondary);
  font-size: 11.5px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.12s ease;
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
  gap: 5px;
  height: 26px;
  padding: 0 7px;
  border: 1px solid var(--mwp-line);
  border-radius: 4px;
  background: var(--mwp-surface);
  color: var(--mwp-ink-secondary);
  font-size: 11.5px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.12s ease;
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
  padding: 1px 4px;
  border-radius: 8px;
  background: var(--mwp-line-subtle);
  color: var(--mwp-mute);
  font: 600 9.5px 'SFMono-Regular', Menlo, monospace;
}
.mwp-toggle.is-active .mwp-count {
  background: rgba(15, 118, 110, 0.12);
  color: var(--mwp-accent);
}

/* --------------------------------------------------------------------------
   Layout & Table of Contents Sidebar (Compact: default 210px)
   -------------------------------------------------------------------------- */
.mwp-layout {
  display: flex;
  min-height: 0;
  flex: 1;
  position: relative;
}

.mwp-nav {
  width: var(--mwp-toc-width, 210px);
  min-width: var(--mwp-toc-width, 210px);
  flex: 0 0 var(--mwp-toc-width, 210px);
  display: flex;
  flex-direction: column;
  background: var(--mwp-sidebar-bg);
  padding: 10px 8px 8px 10px;
  user-select: none;
}

.mwp-nav-kicker {
  padding-left: 4px;
  color: var(--mwp-mute);
  font: 700 9.5px/1 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.1em;
}

.mwp-search-row {
  position: relative;
  display: flex;
  align-items: center;
  margin: 8px 0 6px;
}

.mwp-search {
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
  padding: 4px 7px;
  border: 1px solid var(--mwp-line);
  background: var(--mwp-surface);
  border-radius: 4px;
  color: var(--mwp-mute);
  transition: border-color 0.12s ease, box-shadow 0.12s ease;
}

.mwp-search:focus-within {
  border-color: var(--mwp-accent);
  box-shadow: 0 0 0 1.5px var(--mwp-accent-light);
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
  font-size: 11px;
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
  border-radius: 4px;
  padding: 4px 6px 4px calc(6px + var(--mwp-level, 0) * 8px);
  background: transparent;
  color: var(--mwp-ink-secondary);
  text-align: left;
  font-size: 11px;
  line-height: 1.35;
  cursor: pointer;
  transition: all 0.1s ease;
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
  opacity: 0.5;
}
.mwp-nav-item.is-current .mwp-level-dot {
  background: var(--mwp-accent);
  opacity: 1;
  transform: scale(1.3);
}

.mwp-empty {
  font-size: 10.5px;
  color: var(--mwp-mute);
  padding: 8px 4px;
  text-align: center;
}

.mwp-nav-footer {
  padding: 8px 4px 0;
  border-top: 1px solid var(--mwp-line-subtle);
  color: var(--mwp-mute);
  font: 700 8.5px/1 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.08em;
}

/* --------------------------------------------------------------------------
   Divider / Resizer Handle
   -------------------------------------------------------------------------- */
.mwp-resize {
  position: relative;
  z-index: 4;
  flex: 0 0 6px;
  align-self: stretch;
  cursor: col-resize;
  background: var(--mwp-sidebar-bg);
  border-right: 1px solid var(--mwp-line);
  outline: none;
  touch-action: none;
  transition: background 0.12s ease, border-color 0.12s ease;
}

.mwp-resize:hover,
.mwp-resize:focus-visible,
.mwp-layout.is-resizing .mwp-resize {
  background: var(--mwp-accent-light);
  border-right-color: var(--mwp-accent);
}

.mwp-resize-grip {
  position: absolute;
  top: 50%;
  left: 1px;
  transform: translateY(-50%);
  height: 24px;
  width: 2px;
  border-left: 2px dotted var(--mwp-mute);
  opacity: 0.6;
}

.mwp-layout.is-resizing {
  user-select: none;
  cursor: col-resize;
}

/* --------------------------------------------------------------------------
   Article / Document Viewport (Tightened Layout & Spacing)
   -------------------------------------------------------------------------- */
.mwp-scroller {
  min-width: 0;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  scroll-behavior: smooth;
  position: relative;
}

.mwp-article {
  max-width: 900px;
  margin: 0 auto;
  padding: 16px 28px 60px;
  transition: max-width 0.15s ease;
}

.mwp-article.is-wide {
  max-width: 100%;
  padding-left: 24px;
  padding-right: 24px;
}

.mwp-article-eyebrow {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px dashed var(--mwp-line);
  color: var(--mwp-mute);
  font: 600 10.5px/1 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.04em;
}

.mwp-dot {
  height: 6px;
  width: 6px;
  background: var(--mwp-accent);
  border-radius: 50%;
  box-shadow: 0 0 0 2px var(--mwp-accent-light);
}

.mwp-eyebrow-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

/* --------------------------------------------------------------------------
   Prose / Markdown Content Typography (Tightened & Compact)
   -------------------------------------------------------------------------- */
.mwp-prose {
  font-size: 13.5px;
  line-height: 1.68;
  color: var(--mwp-ink);
  overflow-wrap: anywhere;
}

.mwp-prose h1,
.mwp-prose h2,
.mwp-prose h3,
.mwp-prose h4 {
  scroll-margin-top: 24px;
  line-height: 1.3;
  color: var(--mwp-ink);
  font-weight: 700;
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

.mwp-prose h1 {
  font-size: 22px;
  letter-spacing: -0.02em;
  margin: 6px 0 14px;
  padding-bottom: 8px;
  border-bottom: 1.5px solid var(--mwp-line);
}

.mwp-prose h2 {
  font-size: 16.5px;
  letter-spacing: -0.01em;
  margin: 24px 0 10px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--mwp-line);
}

.mwp-prose h3 {
  font-size: 14.5px;
  margin: 18px 0 8px;
}

.mwp-prose h4 {
  font-size: 13.5px;
  margin: 14px 0 6px;
  color: var(--mwp-ink-secondary);
}

.mwp-prose p {
  margin: 8px 0;
}

.mwp-prose a {
  color: var(--mwp-accent);
  text-decoration: underline;
  text-decoration-color: rgba(15, 118, 110, 0.35);
  text-underline-offset: 2.5px;
  transition: color 0.12s ease, text-decoration-color 0.12s ease;
}

.mwp-prose a:hover {
  color: var(--mwp-accent-hover);
  text-decoration-color: currentColor;
}

.mwp-prose strong {
  color: var(--mwp-ink);
  font-weight: 650;
}

/* Compact Lists (eliminate loose spacing) */
.mwp-prose ul,
.mwp-prose ol {
  padding-left: 20px;
  margin: 6px 0 8px;
}

.mwp-prose li {
  margin: 2px 0;
  padding-left: 1px;
}

.mwp-prose li > p {
  margin: 2px 0;
}

.mwp-prose li > ul,
.mwp-prose li > ol {
  margin: 2px 0 4px;
}

.mwp-prose li::marker {
  color: var(--mwp-accent);
}

/* Task Lists */
.mwp-task-item {
  list-style-type: none;
  margin-left: -16px !important;
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.mwp-task-check {
  display: inline-grid;
  place-items: center;
  width: 13px;
  height: 13px;
  border: 1px solid var(--mwp-line);
  border-radius: 3px;
  background: var(--mwp-surface);
  font-size: 9px;
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
  font-family: 'SFMono-Regular', Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
  font-size: 0.88em;
  background: var(--mwp-code-bg);
  border-radius: 3px;
  padding: 1.5px 5px;
  color: var(--mwp-ink);
  border: 1px solid var(--mwp-line-subtle);
}

/* Code Blocks */
.mwp-code-block {
  margin: 12px 0;
  border-radius: 6px;
  background: var(--mwp-pre-bg);
  border: 1px solid var(--mwp-line);
  overflow: hidden;
  box-shadow: var(--mwp-shadow-sm);
}

.mwp-code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 12px;
  background: var(--mwp-pre-header-bg);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.mwp-code-lang {
  color: var(--mwp-mute);
  font: 600 9.5px/1 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.mwp-code-copy {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 2px 7px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.06);
  color: #cfdad2;
  font-size: 10.5px;
  cursor: pointer;
  transition: all 0.12s ease;
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
  padding: 10px 14px;
  overflow-x: auto;
  line-height: 1.5;
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
  padding: 8px 12px;
  overflow-x: auto;
  font-size: 11.5px;
  white-space: pre-wrap;
}

/* Tables */
.mwp-table-wrap {
  width: 100%;
  overflow-x: auto;
  margin: 12px 0;
  border: 1px solid var(--mwp-line);
  border-radius: 6px;
  box-shadow: var(--mwp-shadow-sm);
  background: var(--mwp-surface);
}

.mwp-prose table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11.5px;
  line-height: 1.5;
}

.mwp-prose th,
.mwp-prose td {
  padding: 7px 10px;
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
  margin: 12px 0;
  padding: 6px 14px;
  border-left: 3px solid var(--mwp-accent);
  background: var(--mwp-accent-light);
  border-radius: 0 4px 4px 0;
  color: var(--mwp-ink-secondary);
}

.mwp-callout {
  border-left-width: 3.5px;
}

.mwp-callout-title {
  font: 700 10px/1 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.06em;
  margin-bottom: 4px;
  text-transform: uppercase;
}

.mwp-callout-note {
  border-left-color: #2b7fff;
  background: rgba(43, 127, 255, 0.07);
}
.mwp-callout-note .mwp-callout-title { color: #2b7fff; }

.mwp-callout-tip {
  border-left-color: #10b981;
  background: rgba(16, 185, 129, 0.07);
}
.mwp-callout-tip .mwp-callout-title { color: #10b981; }

.mwp-callout-important {
  border-left-color: #8b5cf6;
  background: rgba(139, 92, 246, 0.07);
}
.mwp-callout-important .mwp-callout-title { color: #8b5cf6; }

.mwp-callout-warning {
  border-left-color: #f59e0b;
  background: rgba(245, 158, 11, 0.07);
}
.mwp-callout-warning .mwp-callout-title { color: #f59e0b; }

.mwp-callout-caution {
  border-left-color: #ef4444;
  background: rgba(239, 68, 68, 0.07);
}
.mwp-callout-caution .mwp-callout-title { color: #ef4444; }

.mwp-prose hr {
  border: 0;
  border-top: 1px dashed var(--mwp-line);
  margin: 20px 0;
}

.mwp-prose img {
  max-width: 100%;
  border-radius: 4px;
  box-shadow: var(--mwp-shadow-sm);
}

.mwp-page-note {
  text-align: center;
  padding: 16px 0;
  color: var(--mwp-mute);
  font-size: 11px;
}

.mwp-document-end {
  text-align: center;
  border-top: 1px solid var(--mwp-line);
  margin-top: 32px;
  padding-top: 16px;
  color: var(--mwp-mute);
  font: 600 9.5px 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.1em;
}

/* Floating Back-To-Top Button */
.mwp-back-to-top {
  position: absolute;
  right: 18px;
  bottom: 18px;
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 4px 10px;
  border-radius: 16px;
  border: 1px solid var(--mwp-line);
  background: var(--mwp-surface);
  color: var(--mwp-ink-secondary);
  font-size: 10.5px;
  font-weight: 600;
  box-shadow: var(--mwp-shadow-md);
  cursor: pointer;
  transition: all 0.15s ease;
  z-index: 10;
  opacity: 0.9;
}

.mwp-back-to-top:hover {
  opacity: 1;
  background: var(--mwp-accent-light);
  color: var(--mwp-accent);
  border-color: var(--mwp-accent);
  transform: translateY(-1.5px);
}

/* --------------------------------------------------------------------------
   Responsive & Mobile Adaptations
   -------------------------------------------------------------------------- */
@media (max-width: 700px) {
  .mwp-article {
    padding: 14px 14px 60px;
  }
  .mwp-prose h1 { font-size: 19px; }
  .mwp-prose h2 { font-size: 15.5px; }
  .mwp-stats-badge { display: none; }
}

@media (max-width: 480px) {
  .mwp-root.mwp-toc-open .mwp-nav {
    position: absolute;
    z-index: 20;
    top: 40px;
    bottom: 0;
    box-shadow: 6px 0 18px rgba(0, 0, 0, 0.2);
  }
  .mwp-layout {
    position: relative;
  }
  .mwp-resize {
    position: absolute;
    top: 0;
    bottom: 0;
    left: var(--mwp-toc-width, 210px);
    z-index: 21;
  }
  .mwp-identity .mwp-format,
  .mwp-identity .mwp-separator {
    display: none;
  }
}
`;
