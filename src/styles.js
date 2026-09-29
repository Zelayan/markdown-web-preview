export const styles = `
/* ==========================================================================
   Markdown Web Preview - Obsidian Reading Experience
   Aesthetic: Obsidian Workspace · Purple Accent · Clean Markdown Note
   ========================================================================== */

.mwp-root {
  /* Obsidian Light Theme */
  --mwp-bg: #ffffff;
  --mwp-surface: #ffffff;
  --mwp-sidebar-bg: #f8f9fa;
  --mwp-border: #e6e8eb;
  --mwp-border-subtle: #f0f2f5;
  --mwp-ink: #22252a;
  --mwp-ink-secondary: #5c6370;
  --mwp-mute: #8c92a4;
  --mwp-accent: #7c3aed; /* Obsidian Purple */
  --mwp-accent-light: #f5f3ff;
  --mwp-accent-hover: #6d28d9;
  --mwp-code-bg: #f3f4f6;
  --mwp-code-ink: #c026d3;
  --mwp-pre-bg: #1e1e2e;
  --mwp-pre-header-bg: #181825;
  --mwp-pre-ink: #cdd6f4;
  --mwp-table-alt: #fafbfc;
  --mwp-table-th: #f3f4f6;
  --mwp-callout-bg: #f5f3ff;
  --mwp-callout-border: #7c3aed;

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

/* Obsidian Dark Theme (Obsidian Default Dark Mode) */
.mwp-root.theme-dark {
  --mwp-bg: #1e1e1e;
  --mwp-surface: #1e1e1e;
  --mwp-sidebar-bg: #181818;
  --mwp-border: #2d2d2d;
  --mwp-border-subtle: #242424;
  --mwp-ink: #dcddde;
  --mwp-ink-secondary: #a6abb4;
  --mwp-mute: #727782;
  --mwp-accent: #a78bfa; /* Obsidian Light Purple */
  --mwp-accent-light: #2e2646;
  --mwp-accent-hover: #c4b5fd;
  --mwp-code-bg: #282828;
  --mwp-code-ink: #e879f9;
  --mwp-pre-bg: #161616;
  --mwp-pre-header-bg: #1e1e1e;
  --mwp-pre-ink: #d4d4d4;
  --mwp-table-alt: #1c1c1c;
  --mwp-table-th: #262626;
  --mwp-callout-bg: #272138;
  --mwp-callout-border: #a78bfa;
}

@media (prefers-color-scheme: dark) {
  .mwp-root:not(.theme-light) {
    --mwp-bg: #1e1e1e;
    --mwp-surface: #1e1e1e;
    --mwp-sidebar-bg: #181818;
    --mwp-border: #2d2d2d;
    --mwp-border-subtle: #242424;
    --mwp-ink: #dcddde;
    --mwp-ink-secondary: #a6abb4;
    --mwp-mute: #727782;
    --mwp-accent: #a78bfa;
    --mwp-accent-light: #2e2646;
    --mwp-accent-hover: #c4b5fd;
    --mwp-code-bg: #282828;
    --mwp-code-ink: #e879f9;
    --mwp-pre-bg: #161616;
    --mwp-pre-header-bg: #1e1e1e;
    --mwp-pre-ink: #d4d4d4;
    --mwp-table-alt: #1c1c1c;
    --mwp-table-th: #262626;
    --mwp-callout-bg: #272138;
    --mwp-callout-border: #a78bfa;
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
   Obsidian Top Header Toolbar (36px)
   -------------------------------------------------------------------------- */
.mwp-toolbar {
  height: 36px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  background: var(--mwp-surface);
  border-bottom: 1px solid var(--mwp-border);
  position: relative;
  z-index: 5;
}

.mwp-toolbar-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mwp-obsidian-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  font-size: 12.5px;
  color: var(--mwp-ink);
}

.mwp-obsidian-icon {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background: var(--mwp-accent);
  color: #ffffff;
  font-size: 11px;
  font-weight: bold;
}

.mwp-toolbar-center {
  flex: 1;
  max-width: 280px;
  margin: 0 12px;
}

.mwp-obsidian-search {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  height: 26px;
  padding: 0 8px;
  border: 1px solid var(--mwp-border);
  border-radius: 4px;
  background: var(--mwp-sidebar-bg);
  color: var(--mwp-mute);
  transition: all 0.15s ease;
}

.mwp-obsidian-search:focus-within {
  background: var(--mwp-surface);
  border-color: var(--mwp-accent);
}

.mwp-obsidian-search span {
  font-size: 12px;
  line-height: 1;
}

.mwp-obsidian-search input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--mwp-ink);
  font-size: 11.5px;
  font-family: inherit;
}

.mwp-obsidian-search input::placeholder {
  color: var(--mwp-mute);
}

.mwp-search-clear {
  display: grid;
  place-items: center;
  width: 14px;
  height: 14px;
  border: 0;
  border-radius: 50%;
  background: var(--mwp-border);
  color: var(--mwp-ink-secondary);
  font-size: 9.5px;
  cursor: pointer;
}

.mwp-toolbar-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

.mwp-stats-badge {
  display: inline-flex;
  align-items: center;
  padding: 1px 6px;
  border-radius: 3px;
  background: var(--mwp-border-subtle);
  color: var(--mwp-mute);
  font-size: 11px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  margin-right: 4px;
}

.mwp-tool-btn {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  height: 25px;
  padding: 0 7px;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  color: var(--mwp-ink-secondary);
  font-size: 11.5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.1s ease;
}

.mwp-tool-btn:hover {
  background: var(--mwp-border-subtle);
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
  border: 1px solid var(--mwp-border);
  border-radius: 4px;
  background: var(--mwp-surface);
  color: var(--mwp-ink-secondary);
  font-size: 11.5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.1s ease;
}

.mwp-toggle:hover {
  background: var(--mwp-border-subtle);
  color: var(--mwp-ink);
}

.mwp-toggle.is-active {
  background: var(--mwp-accent-light);
  border-color: var(--mwp-accent);
  color: var(--mwp-accent);
  font-weight: 600;
}

.mwp-count {
  display: inline-block;
  padding: 0.5px 4px;
  border-radius: 8px;
  background: var(--mwp-border-subtle);
  color: var(--mwp-mute);
  font: 600 9px 'SFMono-Regular', Menlo, monospace;
}

/* --------------------------------------------------------------------------
   Obsidian Outline Sidebar (Left Pane)
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
  border-right: 1px solid var(--mwp-border);
  padding: 10px 8px 8px 10px;
  user-select: none;
}

.mwp-nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
  padding-left: 2px;
}

.mwp-nav-title {
  font-size: 11.5px;
  font-weight: 700;
  color: var(--mwp-mute);
  text-transform: uppercase;
  letter-spacing: 0.05em;
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
  background: var(--mwp-border);
  border-radius: 2px;
}

.mwp-nav-item {
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
  border: 0;
  border-radius: 4px;
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
  background: var(--mwp-border-subtle);
  color: var(--mwp-ink);
}

.mwp-nav-item.is-current {
  background: var(--mwp-accent-light);
  color: var(--mwp-accent);
  font-weight: 600;
}

.mwp-nav-item-indicator {
  color: var(--mwp-mute);
  font-size: 9px;
  font-family: 'SFMono-Regular', Menlo, monospace;
}

.mwp-empty {
  font-size: 11px;
  color: var(--mwp-mute);
  padding: 10px 4px;
  text-align: center;
}

/* Resizer Divider */
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
   Obsidian Note Viewport (Full Bleed Clean Note Canvas)
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
  /* Obsidian Default Note Flow */
  max-width: 900px;
  margin: 0;
  padding: 16px 28px 60px;
  transition: max-width 0.1s ease;
}

.mwp-article.is-wide {
  max-width: 100%;
  padding-left: 24px;
  padding-right: 24px;
}

/* --------------------------------------------------------------------------
   Obsidian Note Typography & Elements
   -------------------------------------------------------------------------- */
.mwp-prose {
  font-size: 14px;
  line-height: 1.6;
  color: var(--mwp-ink);
  overflow-wrap: anywhere;
}

/* Obsidian Clean Headings */
.mwp-prose h1 {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.015em;
  margin: 0 0 14px 0;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--mwp-border);
  color: var(--mwp-ink);
  line-height: 1.3;
}

.mwp-prose h2 {
  font-size: 19px;
  font-weight: 650;
  letter-spacing: -0.01em;
  margin: 24px 0 10px 0;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--mwp-border-subtle);
  color: var(--mwp-ink);
  line-height: 1.35;
}

.mwp-prose h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 18px 0 8px 0;
  color: var(--mwp-ink);
  line-height: 1.4;
}

.mwp-prose h4 {
  font-size: 14px;
  font-weight: 600;
  margin: 14px 0 6px 0;
  color: var(--mwp-ink-secondary);
}

.mwp-prose h1,
.mwp-prose h2,
.mwp-prose h3,
.mwp-prose h4 {
  scroll-margin-top: 18px;
  position: relative;
}

.mwp-prose h1:hover::after,
.mwp-prose h2:hover::after,
.mwp-prose h3:hover::after,
.mwp-prose h4:hover::after {
  content: ' §';
  color: var(--mwp-accent);
  opacity: 0.35;
  font-weight: 400;
  font-size: 0.85em;
}

.mwp-prose p {
  margin: 8px 0;
}

/* Obsidian Internal / External Links */
.mwp-prose a {
  color: var(--mwp-accent);
  text-decoration: underline;
  text-decoration-color: rgba(124, 58, 237, 0.35);
  text-underline-offset: 2.5px;
  transition: all 0.1s ease;
}

.mwp-prose a:hover {
  color: var(--mwp-accent-hover);
  text-decoration-color: currentColor;
}

.mwp-prose strong {
  color: var(--mwp-ink);
  font-weight: 650;
}

/* Obsidian Lists: clean indent, no excessive gaps */
.mwp-prose ul,
.mwp-prose ol {
  padding-left: 22px;
  margin: 4px 0 8px 0;
}

.mwp-prose li {
  margin: 2px 0;
  padding-left: 2px;
}

.mwp-prose li > p {
  margin: 1px 0 !important;
}

.mwp-prose li > ul,
.mwp-prose li > ol {
  margin: 2px 0 3px !important;
}

.mwp-prose li::marker {
  color: var(--mwp-accent);
}

/* Obsidian Task List Checkboxes */
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
  border: 1.5px solid var(--mwp-mute);
  border-radius: 3px;
  background: var(--mwp-surface);
  font-size: 10px;
  line-height: 1;
  color: #ffffff;
  flex-shrink: 0;
  transition: all 0.12s ease;
}

.mwp-task-check.is-checked {
  background: var(--mwp-accent);
  border-color: var(--mwp-accent);
  font-weight: bold;
}

/* Obsidian Inline Code (Magenta / Red-Violet Highlight) */
.mwp-prose code {
  font-family: 'SFMono-Regular', Menlo, Monaco, Consolas, monospace;
  font-size: 12.5px;
  background: var(--mwp-code-bg);
  color: var(--mwp-code-ink);
  border-radius: 4px;
  padding: 1.5px 5px;
}

/* Obsidian Code Blocks */
.mwp-code-block {
  margin: 12px 0;
  border-radius: 6px;
  background: var(--mwp-pre-bg);
  border: 1px solid var(--mwp-border);
  overflow: hidden;
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
  color: #a6adc8;
  font: 600 10px/1 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.mwp-code-copy {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 2px 7px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
  color: #cdd6f4;
  font-size: 11px;
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
  font-size: 12px;
}

/* Fallback Raw HTML */
.mwp-prose pre.mwp-raw-html {
  border: 1px solid var(--mwp-border);
  border-radius: 6px;
  background: var(--mwp-code-bg);
  padding: 8px 12px;
  overflow-x: auto;
  font-size: 12px;
  white-space: pre-wrap;
  margin: 8px 0;
}

/* Obsidian Tables */
.mwp-table-wrap {
  width: 100%;
  overflow-x: auto;
  margin: 12px 0;
  border: 1px solid var(--mwp-border);
  border-radius: 6px;
  background: var(--mwp-surface);
}

.mwp-prose table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  line-height: 1.5;
}

.mwp-prose th,
.mwp-prose td {
  padding: 7px 12px;
  border-bottom: 1px solid var(--mwp-border);
  text-align: left;
  vertical-align: top;
}

.mwp-prose th {
  background: var(--mwp-table-th);
  color: var(--mwp-ink);
  font-weight: 650;
  white-space: nowrap;
}

.mwp-prose tr:nth-child(even) td {
  background: var(--mwp-table-alt);
}

.mwp-prose tr:last-child td {
  border-bottom: 0;
}

/* Obsidian Native Callouts (Icon + Border-left + Header) */
.mwp-prose blockquote {
  margin: 12px 0;
  padding: 10px 14px;
  border-left: 4px solid var(--mwp-accent);
  background: var(--mwp-callout-bg);
  border-radius: 4px;
  color: var(--mwp-ink);
}

.mwp-callout {
  border-left-width: 4px;
}

.mwp-callout-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font: 700 12px/1 -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: -0.01em;
  margin-bottom: 6px;
  text-transform: uppercase;
}

.mwp-callout-note {
  border-left-color: #3b82f6;
  background: rgba(59, 130, 246, 0.08);
}
.mwp-callout-note .mwp-callout-title { color: #2563eb; }

.mwp-callout-tip {
  border-left-color: #10b981;
  background: rgba(16, 185, 129, 0.08);
}
.mwp-callout-tip .mwp-callout-title { color: #059669; }

.mwp-callout-important {
  border-left-color: #8b5cf6;
  background: rgba(139, 92, 246, 0.08);
}
.mwp-callout-important .mwp-callout-title { color: #7c3aed; }

.mwp-callout-warning {
  border-left-color: #f59e0b;
  background: rgba(245, 158, 11, 0.08);
}
.mwp-callout-warning .mwp-callout-title { color: #d97706; }

.mwp-callout-caution {
  border-left-color: #ef4444;
  background: rgba(239, 68, 68, 0.08);
}
.mwp-callout-caution .mwp-callout-title { color: #dc2626; }

.mwp-prose hr {
  border: 0;
  border-top: 1px solid var(--mwp-border);
  margin: 20px 0;
}

.mwp-prose img {
  max-width: 100%;
  border-radius: 4px;
  border: 1px solid var(--mwp-border);
}

.mwp-document-end {
  text-align: center;
  border-top: 1px solid var(--mwp-border);
  margin-top: 36px;
  padding-top: 16px;
  color: var(--mwp-mute);
  font: 600 10px 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.08em;
}

/* Floating Back-To-Top Button */
.mwp-back-to-top {
  position: absolute;
  right: 20px;
  bottom: 20px;
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 4px 10px;
  border-radius: 14px;
  border: 1px solid var(--mwp-border);
  background: var(--mwp-surface);
  color: var(--mwp-ink-secondary);
  font-size: 11px;
  font-weight: 500;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
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

/* Responsive */
@media (max-width: 700px) {
  .mwp-article {
    padding: 12px 16px 40px;
  }
  .mwp-prose h1 { font-size: 20px; }
  .mwp-prose h2 { font-size: 17px; }
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
