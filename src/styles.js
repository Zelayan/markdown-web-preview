export const styles = `
/* ==========================================================================
   Markdown Web Preview - Modern Editorial Reader Theme
   ========================================================================== */

.mwp-root {
  /* Light Theme Variables */
  --mwp-bg: #f8faf8;
  --mwp-surface: #ffffff;
  --mwp-sidebar-bg: #f2f5f2;
  --mwp-ink: #1c2621;
  --mwp-ink-secondary: #4a5c52;
  --mwp-mute: #7c8e82;
  --mwp-line: #e1e7e2;
  --mwp-line-subtle: #ebf0ec;
  --mwp-accent: #1e6b52;
  --mwp-accent-light: #e8f3ee;
  --mwp-accent-hover: #16533f;
  --mwp-code-bg: #eef3f0;
  --mwp-pre-bg: #141b18;
  --mwp-pre-header-bg: #1b2420;
  --mwp-pre-ink: #e3ece6;
  --mwp-table-alt: #f7faf7;
  --mwp-table-th: #ecf3ed;
  --mwp-shadow-sm: 0 1px 2px rgba(20, 32, 25, 0.05);
  --mwp-shadow-md: 0 4px 14px rgba(20, 32, 25, 0.08);

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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  position: relative;
}

/* Dark Theme Overrides */
.mwp-root.theme-dark {
  --mwp-bg: #111614;
  --mwp-surface: #171e1a;
  --mwp-sidebar-bg: #141a17;
  --mwp-ink: #e3ede6;
  --mwp-ink-secondary: #9cb1a4;
  --mwp-mute: #6f8275;
  --mwp-line: #26332b;
  --mwp-line-subtle: #1e2822;
  --mwp-accent: #45b793;
  --mwp-accent-light: #16362b;
  --mwp-accent-hover: #58cda8;
  --mwp-code-bg: #1f2a24;
  --mwp-pre-bg: #0d1210;
  --mwp-pre-header-bg: #151c18;
  --mwp-pre-ink: #dbe7df;
  --mwp-table-alt: #141b18;
  --mwp-table-th: #1b2420;
  --mwp-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
  --mwp-shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
}

@media (prefers-color-scheme: dark) {
  .mwp-root:not(.theme-light) {
    --mwp-bg: #111614;
    --mwp-surface: #171e1a;
    --mwp-sidebar-bg: #141a17;
    --mwp-ink: #e3ede6;
    --mwp-ink-secondary: #9cb1a4;
    --mwp-mute: #6f8275;
    --mwp-line: #26332b;
    --mwp-line-subtle: #1e2822;
    --mwp-accent: #45b793;
    --mwp-accent-light: #16362b;
    --mwp-accent-hover: #58cda8;
    --mwp-code-bg: #1f2a24;
    --mwp-pre-bg: #0d1210;
    --mwp-pre-header-bg: #151c18;
    --mwp-pre-ink: #dbe7df;
    --mwp-table-alt: #141b18;
    --mwp-table-th: #1b2420;
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
  top: 50px;
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
   Header / Toolbar
   -------------------------------------------------------------------------- */
.mwp-toolbar {
  height: 50px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px 0 16px;
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
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: var(--mwp-accent);
  color: #ffffff;
  font: 700 13px/1 'SFMono-Regular', Menlo, monospace;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
}

.mwp-name {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--mwp-ink);
}

.mwp-separator {
  color: var(--mwp-line);
  font-size: 14px;
}

.mwp-format {
  color: var(--mwp-mute);
  font: 600 10px/1 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.1em;
}

.mwp-stats-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 7px;
  border-radius: 4px;
  background: var(--mwp-line-subtle);
  color: var(--mwp-mute);
  font-size: 11px;
  font-family: 'SFMono-Regular', Menlo, monospace;
  margin-left: 6px;
}

.mwp-toolbar-actions {
  display: flex;
  align-items: center;
  gap: 5px;
}

.mwp-tool-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 28px;
  padding: 0 8px;
  border: 1px solid transparent;
  border-radius: 5px;
  background: transparent;
  color: var(--mwp-ink-secondary);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
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
  gap: 6px;
  height: 28px;
  padding: 0 8px;
  border: 1px solid var(--mwp-line);
  border-radius: 5px;
  background: var(--mwp-surface);
  color: var(--mwp-ink-secondary);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
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
  padding: 1px 5px;
  border-radius: 10px;
  background: var(--mwp-line-subtle);
  color: var(--mwp-mute);
  font: 600 10px 'SFMono-Regular', Menlo, monospace;
}
.mwp-toggle.is-active .mwp-count {
  background: rgba(30, 107, 82, 0.15);
  color: var(--mwp-accent);
}

/* --------------------------------------------------------------------------
   Layout & Table of Contents Sidebar
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
  padding: 16px 10px 14px 12px;
  user-select: none;
}

.mwp-nav-kicker {
  padding-left: 6px;
  color: var(--mwp-mute);
  font: 700 10px/1 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.12em;
}

.mwp-search-row {
  position: relative;
  display: flex;
  align-items: center;
  margin: 12px 0 10px;
}

.mwp-search {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 5px 8px;
  border: 1px solid var(--mwp-line);
  background: var(--mwp-surface);
  border-radius: 6px;
  color: var(--mwp-mute);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.mwp-search:focus-within {
  border-color: var(--mwp-accent);
  box-shadow: 0 0 0 2px var(--mwp-accent-light);
}

.mwp-search span {
  font-size: 14px;
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
  right: 6px;
  display: grid;
  place-items: center;
  width: 16px;
  height: 16px;
  border: 0;
  border-radius: 50%;
  background: var(--mwp-line);
  color: var(--mwp-ink-secondary);
  font-size: 11px;
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
  padding-right: 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
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
  border-radius: 5px;
  padding: 6px 8px 6px calc(8px + var(--mwp-level, 0) * 11px);
  background: transparent;
  color: var(--mwp-ink-secondary);
  text-align: left;
  font-size: 11.5px;
  line-height: 1.4;
  cursor: pointer;
  transition: all 0.12s ease;
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
  opacity: 0.6;
}
.mwp-nav-item.is-current .mwp-level-dot {
  background: var(--mwp-accent);
  opacity: 1;
  transform: scale(1.2);
}

.mwp-empty {
  font-size: 11px;
  color: var(--mwp-mute);
  padding: 12px 6px;
  text-align: center;
}

.mwp-nav-footer {
  padding: 12px 6px 0;
  border-top: 1px solid var(--mwp-line-subtle);
  color: var(--mwp-mute);
  font: 700 9px/1 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.08em;
}

/* --------------------------------------------------------------------------
   Divider / Resizer Handle
   -------------------------------------------------------------------------- */
.mwp-resize {
  position: relative;
  z-index: 4;
  flex: 0 0 8px;
  align-self: stretch;
  cursor: col-resize;
  background: var(--mwp-sidebar-bg);
  border-right: 1px solid var(--mwp-line);
  outline: none;
  touch-action: none;
  transition: background 0.15s ease, border-color 0.15s ease;
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
  left: 2px;
  transform: translateY(-50%);
  height: 28px;
  width: 3px;
  border-left: 2px dotted var(--mwp-mute);
  opacity: 0.7;
}

.mwp-layout.is-resizing {
  user-select: none;
  cursor: col-resize;
}

/* --------------------------------------------------------------------------
   Article / Document Viewport
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
  max-width: 860px;
  margin: 0 auto;
  padding: 36px clamp(18px, 4vw, 54px) 100px;
  transition: max-width 0.2s ease;
}

.mwp-article.is-wide {
  max-width: 100%;
  padding-left: clamp(20px, 4vw, 60px);
  padding-right: clamp(20px, 4vw, 60px);
}

.mwp-article-eyebrow {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
  padding-bottom: 14px;
  border-bottom: 1px dashed var(--mwp-line);
  color: var(--mwp-mute);
  font: 600 11px/1 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.05em;
}

.mwp-dot {
  height: 7px;
  width: 7px;
  background: var(--mwp-accent);
  border-radius: 50%;
  box-shadow: 0 0 0 3px var(--mwp-accent-light);
}

.mwp-eyebrow-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

/* --------------------------------------------------------------------------
   Prose / Markdown Content Typography
   -------------------------------------------------------------------------- */
.mwp-prose {
  font-size: 14px;
  line-height: 1.8;
  color: var(--mwp-ink);
  overflow-wrap: anywhere;
}

.mwp-prose h1,
.mwp-prose h2,
.mwp-prose h3,
.mwp-prose h4 {
  scroll-margin-top: 36px;
  line-height: 1.35;
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
  opacity: 0.5;
  font-weight: 400;
  font-size: 0.85em;
}

.mwp-prose h1 {
  font-size: 26px;
  letter-spacing: -0.025em;
  margin: 12px 0 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--mwp-line);
}

.mwp-prose h2 {
  font-size: 20px;
  letter-spacing: -0.015em;
  margin: 40px 0 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--mwp-line);
}

.mwp-prose h3 {
  font-size: 16px;
  margin: 28px 0 12px;
}

.mwp-prose h4 {
  font-size: 14px;
  margin: 22px 0 10px;
  color: var(--mwp-ink-secondary);
}

.mwp-prose p {
  margin: 12px 0;
}

.mwp-prose a {
  color: var(--mwp-accent);
  text-decoration: underline;
  text-decoration-color: rgba(30, 107, 82, 0.35);
  text-underline-offset: 3px;
  transition: color 0.15s ease, text-decoration-color 0.15s ease;
}

.mwp-prose a:hover {
  color: var(--mwp-accent-hover);
  text-decoration-color: currentColor;
}

.mwp-prose strong {
  color: var(--mwp-ink);
  font-weight: 650;
}

.mwp-prose ul,
.mwp-prose ol {
  padding-left: 22px;
  margin: 12px 0;
}

.mwp-prose li {
  margin: 6px 0;
  padding-left: 2px;
}

.mwp-prose li::marker {
  color: var(--mwp-accent);
}

/* Task Lists */
.mwp-task-item {
  list-style-type: none;
  margin-left: -18px !important;
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.mwp-task-check {
  display: inline-grid;
  place-items: center;
  width: 14px;
  height: 14px;
  border: 1px solid var(--mwp-line);
  border-radius: 3px;
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

/* Inline Code */
.mwp-prose code {
  font-family: 'SFMono-Regular', Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
  font-size: 0.88em;
  background: var(--mwp-code-bg);
  border-radius: 4px;
  padding: 2px 6px;
  color: var(--mwp-ink);
  border: 1px solid var(--mwp-line-subtle);
}

/* Code Blocks */
.mwp-code-block {
  margin: 18px 0;
  border-radius: 8px;
  background: var(--mwp-pre-bg);
  border: 1px solid var(--mwp-line);
  overflow: hidden;
  box-shadow: var(--mwp-shadow-sm);
}

.mwp-code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 14px;
  background: var(--mwp-pre-header-bg);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.mwp-code-lang {
  color: var(--mwp-mute);
  font: 600 10px/1 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.mwp-code-copy {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
  color: #cfdad2;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.15s ease;
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
  padding: 14px 16px;
  overflow-x: auto;
  line-height: 1.55;
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
  border-radius: 6px;
  background: var(--mwp-code-bg);
  padding: 12px 14px;
  overflow-x: auto;
  font-size: 12px;
  white-space: pre-wrap;
}

/* Tables */
.mwp-table-wrap {
  width: 100%;
  overflow-x: auto;
  margin: 20px 0;
  border: 1px solid var(--mwp-line);
  border-radius: 8px;
  box-shadow: var(--mwp-shadow-sm);
  background: var(--mwp-surface);
}

.mwp-prose table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  line-height: 1.6;
}

.mwp-prose th,
.mwp-prose td {
  padding: 10px 14px;
  border-bottom: 1px solid var(--mwp-line);
  text-align: left;
  vertical-align: top;
}

.mwp-prose th {
  background: var(--mwp-table-th);
  color: var(--mwp-ink);
  font-weight: 650;
  border-bottom: 2px solid var(--mwp-line);
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
  margin: 18px 0;
  padding: 10px 18px;
  border-left: 3px solid var(--mwp-accent);
  background: var(--mwp-accent-light);
  border-radius: 0 6px 6px 0;
  color: var(--mwp-ink-secondary);
}

.mwp-callout {
  border-left-width: 4px;
}

.mwp-callout-title {
  font: 700 11px/1 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.08em;
  margin-bottom: 6px;
  text-transform: uppercase;
}

.mwp-callout-note {
  border-left-color: #2b7fff;
  background: rgba(43, 127, 255, 0.08);
}
.mwp-callout-note .mwp-callout-title { color: #2b7fff; }

.mwp-callout-tip {
  border-left-color: #10b981;
  background: rgba(16, 185, 129, 0.08);
}
.mwp-callout-tip .mwp-callout-title { color: #10b981; }

.mwp-callout-important {
  border-left-color: #8b5cf6;
  background: rgba(139, 92, 246, 0.08);
}
.mwp-callout-important .mwp-callout-title { color: #8b5cf6; }

.mwp-callout-warning {
  border-left-color: #f59e0b;
  background: rgba(245, 158, 11, 0.08);
}
.mwp-callout-warning .mwp-callout-title { color: #f59e0b; }

.mwp-callout-caution {
  border-left-color: #ef4444;
  background: rgba(239, 68, 68, 0.08);
}
.mwp-callout-caution .mwp-callout-title { color: #ef4444; }

.mwp-prose hr {
  border: 0;
  border-top: 1px dashed var(--mwp-line);
  margin: 32px 0;
}

.mwp-prose img {
  max-width: 100%;
  border-radius: 6px;
  box-shadow: var(--mwp-shadow-sm);
}

.mwp-page-note {
  text-align: center;
  padding: 24px 0;
  color: var(--mwp-mute);
  font-size: 11px;
}

.mwp-document-end {
  text-align: center;
  border-top: 1px solid var(--mwp-line);
  margin-top: 48px;
  padding-top: 24px;
  color: var(--mwp-mute);
  font: 600 10px 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.12em;
}

/* Floating Back-To-Top Button */
.mwp-back-to-top {
  position: absolute;
  right: 24px;
  bottom: 24px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid var(--mwp-line);
  background: var(--mwp-surface);
  color: var(--mwp-ink-secondary);
  font-size: 11px;
  font-weight: 600;
  box-shadow: var(--mwp-shadow-md);
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
  opacity: 0.92;
}

.mwp-back-to-top:hover {
  opacity: 1;
  background: var(--mwp-accent-light);
  color: var(--mwp-accent);
  border-color: var(--mwp-accent);
  transform: translateY(-2px);
}

/* --------------------------------------------------------------------------
   Responsive & Mobile Adaptations
   -------------------------------------------------------------------------- */
@media (max-width: 700px) {
  .mwp-article {
    padding: 24px 16px 80px;
  }
  .mwp-prose h1 { font-size: 22px; }
  .mwp-prose h2 { font-size: 18px; }
  .mwp-stats-badge { display: none; }
}

@media (max-width: 480px) {
  .mwp-root.mwp-toc-open .mwp-nav {
    position: absolute;
    z-index: 20;
    top: 50px;
    bottom: 0;
    box-shadow: 8px 0 24px rgba(0, 0, 0, 0.2);
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
  .mwp-identity .mwp-format,
  .mwp-identity .mwp-separator {
    display: none;
  }
}
`;
