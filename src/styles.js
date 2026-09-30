export const styles = `
/* ==========================================================================
   Markdown Web Preview - Obsidian Reading Experience
   Features: Color Themes · Compact Typography · Modern Developer Code Blocks
   ========================================================================== */

.mwp-root {
  /* Obsidian Light Theme */
  --mwp-bg: #ffffff;
  --mwp-surface: #ffffff;
  --mwp-sidebar-bg: #f9fafb;
  --mwp-border: #e5e7eb;
  --mwp-border-subtle: #f3f4f6;
  --mwp-ink: #1f2937;
  --mwp-ink-secondary: #4b5563;
  --mwp-mute: #9ca3af;
  --mwp-accent: #7c3aed; /* Obsidian Purple Default */
  --mwp-accent-light: rgba(124, 58, 237, 0.08);
  --mwp-accent-hover: #6d28d9;

  /* Modern clean code styling */
  --mwp-inline-code-bg: #f1f3f5;
  --mwp-inline-code-ink: #c026d3;
  --mwp-inline-code-border: #e2e8f0;
  --mwp-code-bg: #1e1e2e;
  --mwp-code-header-bg: #181825;
  --mwp-code-ink: #cdd6f4;
  --mwp-table-alt: #f9fafb;
  --mwp-table-th: #f3f4f6;

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
  font-size: 13.5px;
}

/* Obsidian Dark Theme */
.mwp-root.theme-dark {
  --mwp-bg: #161618;
  --mwp-surface: #1e1e20;
  --mwp-sidebar-bg: #121214;
  --mwp-border: #2c2c30;
  --mwp-border-subtle: #222226;
  --mwp-ink: #e2e2e5;
  --mwp-ink-secondary: #a0a0a8;
  --mwp-mute: #70707a;
  --mwp-accent: #a78bfa;
  --mwp-accent-light: rgba(167, 139, 250, 0.12);
  --mwp-accent-hover: #c4b5fd;

  --mwp-inline-code-bg: #27272a;
  --mwp-inline-code-ink: #f472b6;
  --mwp-inline-code-border: #3f3f46;
  --mwp-code-bg: #0d0e12;
  --mwp-code-header-bg: #181920;
  --mwp-code-ink: #d4d4d8;
  --mwp-table-alt: #1a1a1d;
  --mwp-table-th: #242428;
}

@media (prefers-color-scheme: dark) {
  .mwp-root:not(.theme-light) {
    --mwp-bg: #161618;
    --mwp-surface: #1e1e20;
    --mwp-sidebar-bg: #121214;
    --mwp-border: #2c2c30;
    --mwp-border-subtle: #222226;
    --mwp-ink: #e2e2e5;
    --mwp-ink-secondary: #a0a0a8;
    --mwp-mute: #70707a;
    --mwp-accent: #a78bfa;
    --mwp-accent-light: rgba(167, 139, 250, 0.12);
    --mwp-accent-hover: #c4b5fd;

    --mwp-inline-code-bg: #27272a;
    --mwp-inline-code-ink: #f472b6;
    --mwp-inline-code-border: #3f3f46;
    --mwp-code-bg: #0d0e12;
    --mwp-code-header-bg: #181920;
    --mwp-code-ink: #d4d4d8;
    --mwp-table-alt: #1a1a1d;
    --mwp-table-th: #242428;
  }
}

/* Palette Presets */
.mwp-root.color-blue { --mwp-accent: #2563eb; --mwp-accent-hover: #1d4ed8; --mwp-accent-light: rgba(37, 99, 235, 0.1); }
.mwp-root.color-blue.theme-dark { --mwp-accent: #60a5fa; --mwp-accent-hover: #93c5fd; --mwp-accent-light: rgba(96, 165, 250, 0.15); }

.mwp-root.color-emerald { --mwp-accent: #059669; --mwp-accent-hover: #047857; --mwp-accent-light: rgba(5, 150, 105, 0.1); }
.mwp-root.color-emerald.theme-dark { --mwp-accent: #34d399; --mwp-accent-hover: #6ee7b7; --mwp-accent-light: rgba(52, 211, 153, 0.15); }

.mwp-root.color-amber { --mwp-accent: #d97706; --mwp-accent-hover: #b45309; --mwp-accent-light: rgba(217, 119, 6, 0.1); }
.mwp-root.color-amber.theme-dark { --mwp-accent: #fbbf24; --mwp-accent-hover: #fcd34d; --mwp-accent-light: rgba(251, 191, 36, 0.15); }

.mwp-root.color-rose { --mwp-accent: #e11d48; --mwp-accent-hover: #be123c; --mwp-accent-light: rgba(225, 29, 72, 0.1); }
.mwp-root.color-rose.theme-dark { --mwp-accent: #fb7185; --mwp-accent-hover: #fda4af; --mwp-accent-light: rgba(251, 113, 133, 0.15); }

.mwp-root.color-slate { --mwp-accent: #475569; --mwp-accent-hover: #334155; --mwp-accent-light: rgba(71, 85, 105, 0.1); }
.mwp-root.color-slate.theme-dark { --mwp-accent: #94a3b8; --mwp-accent-hover: #cbd5e1; --mwp-accent-light: rgba(148, 163, 184, 0.15); }

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
   Top Toolbar (Clean & Distraction Free: 36px)
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
  height: 25px;
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
  gap: 5px;
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
  margin-right: 2px;
}

/* Color Palette Picker */
.mwp-color-picker-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.mwp-color-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 24px;
  padding: 0 6px;
  border: 1px solid var(--mwp-border);
  border-radius: 4px;
  background: var(--mwp-surface);
  color: var(--mwp-ink-secondary);
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
}

.mwp-color-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--mwp-accent);
}

.mwp-color-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  padding: 6px;
  background: var(--mwp-surface);
  border: 1px solid var(--mwp-border);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  gap: 6px;
  z-index: 50;
}

.mwp-color-chip {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform 0.1s ease;
}

.mwp-color-chip:hover {
  transform: scale(1.15);
}

.mwp-color-chip.is-active {
  border-color: var(--mwp-ink);
  transform: scale(1.1);
}

.mwp-tool-btn {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  height: 24px;
  padding: 0 7px;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  color: var(--mwp-ink-secondary);
  font-size: 11px;
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
  height: 24px;
  padding: 0 7px;
  border: 1px solid var(--mwp-border);
  border-radius: 4px;
  background: var(--mwp-surface);
  color: var(--mwp-ink-secondary);
  font-size: 11px;
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
  width: var(--mwp-toc-width, 210px);
  min-width: var(--mwp-toc-width, 210px);
  flex: 0 0 var(--mwp-toc-width, 210px);
  display: flex;
  flex-direction: column;
  background: var(--mwp-sidebar-bg);
  border-right: 1px solid var(--mwp-border);
  padding: 8px 6px 6px 8px;
  user-select: none;
}

.mwp-nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  padding-left: 2px;
}

.mwp-nav-title {
  font-size: 11px;
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
  border-radius: 3px;
  padding: 3px 5px 3px calc(5px + var(--mwp-level, 0) * 9px);
  background: transparent;
  color: var(--mwp-ink-secondary);
  text-align: left;
  font-size: 11.5px;
  line-height: 1.3;
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
  padding: 8px 4px;
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
   Obsidian Note Viewport (Natural Flow, Clean Padding)
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
  max-width: 880px;
  margin: 0;
  padding: 12px 24px 50px;
  transition: max-width 0.1s ease;
}

.mwp-article.is-wide {
  max-width: 100%;
  padding-left: 20px;
  padding-right: 20px;
}

/* --------------------------------------------------------------------------
   Obsidian Note Typography & Elements
   Rhythm model: readable lines, restrained paragraph gaps, clear sections.
   -------------------------------------------------------------------------- */
.mwp-prose {
  font-size: 13.5px;
  line-height: 1.52 !important;
  color: var(--mwp-ink);
  overflow-wrap: anywhere;
  /* Harness may inherit pre-wrap into document previews. That makes the
     formatting whitespace between block tags visible as fake blank rows. */
  white-space: normal !important;
}

/* Section rhythm: headings create hierarchy without opening large voids. */
.mwp-prose h1 {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.015em;
  margin: 0 0 10px !important;
  padding-bottom: 5px;
  border-bottom: 1.5px solid var(--mwp-border);
  color: var(--mwp-ink);
  line-height: 1.28 !important;
}

.mwp-prose h2 {
  font-size: 16px;
  font-weight: 650;
  letter-spacing: -0.01em;
  margin: 18px 0 7px !important;
  padding-bottom: 3px;
  border-bottom: 1px solid var(--mwp-border-subtle);
  color: var(--mwp-ink);
  line-height: 1.3 !important;
}

.mwp-prose h3 {
  font-size: 14.5px;
  font-weight: 650;
  margin: 14px 0 5px !important;
  color: var(--mwp-ink);
  line-height: 1.35 !important;
}

.mwp-prose h4 {
  font-size: 13.5px;
  font-weight: 650;
  margin: 10px 0 4px !important;
  color: var(--mwp-ink-secondary);
  line-height: 1.4 !important;
}

.mwp-prose h1,
.mwp-prose h2,
.mwp-prose h3,
.mwp-prose h4 {
  scroll-margin-top: 10px;
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
  margin: 0 0 7px !important;
  line-height: 1.52 !important;
  white-space: normal !important;
}

.mwp-prose p:last-child {
  margin-bottom: 0 !important;
}

/* A source line break stays within the same paragraph and therefore follows
   line-height only; it never receives additional paragraph spacing. */
.mwp-prose p > br {
  display: initial;
  content: normal;
  margin: 0;
  line-height: inherit;
}

/* Links */
.mwp-prose a {
  color: var(--mwp-accent);
  text-decoration: underline;
  text-decoration-color: rgba(124, 58, 237, 0.3);
  text-underline-offset: 1.5px;
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

/* Lists use the same readable line rhythm with smaller item gaps. */
.mwp-prose ul,
.mwp-prose ol {
  padding-left: 20px !important;
  margin: 3px 0 8px !important;
  line-height: 1.48 !important;
  white-space: normal !important;
}

.mwp-prose li {
  margin: 0 0 3px !important;
  padding-left: 2px !important;
  line-height: 1.48 !important;
  white-space: normal !important;
}

.mwp-prose li:last-child {
  margin-bottom: 0 !important;
}

.mwp-prose li > p {
  margin: 0 !important;
  padding: 0 !important;
  display: inline !important;
  line-height: inherit !important;
}

.mwp-prose li > ul,
.mwp-prose li > ol {
  margin: 3px 0 1px !important;
  display: block !important;
}

.mwp-prose li::marker {
  color: var(--mwp-accent);
}

/* Task List Checkboxes */
.mwp-task-item {
  list-style-type: none;
  margin-left: -16px !important;
  display: flex;
  align-items: baseline;
  gap: 5px;
}

.mwp-task-check {
  display: inline-grid;
  place-items: center;
  width: 13px;
  height: 13px;
  border: 1.5px solid var(--mwp-mute);
  border-radius: 2.5px;
  background: var(--mwp-surface);
  font-size: 9px;
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

/* --------------------------------------------------------------------------
   Redesigned Beautiful Code Styling
   -------------------------------------------------------------------------- */
/* Inline Code Pill */
.mwp-prose code {
  font-family: 'SFMono-Regular', Menlo, Monaco, Consolas, 'Fira Code', monospace;
  font-size: 12px;
  background: var(--mwp-inline-code-bg);
  color: var(--mwp-inline-code-ink);
  border: 1px solid var(--mwp-inline-code-border);
  border-radius: 4px;
  padding: 1px 5px;
  font-weight: 500;
}

/* Code Block: Mac Terminal Window Style with Window Buttons */
.mwp-code-block {
  margin: 4px 0;
  border-radius: 5px;
  background: var(--mwp-code-bg);
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  display: block;
  white-space: normal !important;
  line-height: normal !important;
}

.mwp-code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 22px;
  padding: 0 8px;
  background: var(--mwp-code-header-bg);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.mwp-code-header-left {
  display: flex;
  align-items: center;
  gap: 6px;
}

.mwp-code-dots {
  display: flex;
  align-items: center;
  gap: 5px;
}

.mwp-code-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}
.mwp-dot-red { background: #ff5f56; }
.mwp-dot-yellow { background: #ffbd2e; }
.mwp-dot-green { background: #27c93f; }

.mwp-code-lang {
  color: #9399b2;
  font: 600 10px/1 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-left: 6px;
}

.mwp-code-copy {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  height: 17px;
  padding: 0 5px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.06);
  color: #cdd6f4;
  font-size: 9.5px;
  line-height: 1;
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
  margin: 0 !important;
  padding: 4px 10px 5px !important;
  overflow-x: auto;
  line-height: 1.28 !important;
  background: transparent !important;
  border: 0 !important;
}

.mwp-code-block pre code {
  background: transparent !important;
  color: var(--mwp-code-ink) !important;
  border: 0 !important;
  padding: 0 !important;
  font-size: 11.5px;
  line-height: 1.28 !important;
  font-family: 'SFMono-Regular', Menlo, Monaco, Consolas, monospace;
  display: block;
  white-space: pre;
}

/* Fallback Raw HTML */
.mwp-prose pre.mwp-raw-html {
  border: 1px solid var(--mwp-border);
  border-radius: 6px;
  background: var(--mwp-sidebar-bg);
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
  border: 1px solid var(--mwp-border);
  border-radius: 6px;
  background: var(--mwp-surface);
}

.mwp-prose table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12.5px;
  line-height: 1.4;
}

.mwp-prose th,
.mwp-prose td {
  padding: 5px 9px;
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

/* Callouts */
.mwp-prose blockquote {
  margin: 8px 0;
  padding: 8px 12px;
  border-left: 3.5px solid var(--mwp-accent);
  background: var(--mwp-accent-light);
  border-radius: 4px;
  color: var(--mwp-ink);
}

.mwp-callout {
  border-left-width: 3.5px;
}

.mwp-callout-title {
  display: flex;
  align-items: center;
  gap: 5px;
  font: 700 11px/1 -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: -0.01em;
  margin-bottom: 4px;
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
  margin: 16px 0;
}

.mwp-prose img {
  max-width: 100%;
  border-radius: 4px;
  border: 1px solid var(--mwp-border);
}

.mwp-page-note {
  text-align: center;
  padding: 8px 0;
  color: var(--mwp-mute);
  font-size: 11px;
}

.mwp-document-end {
  text-align: center;
  border-top: 1px solid var(--mwp-border);
  margin-top: 24px;
  padding-top: 12px;
  color: var(--mwp-mute);
  font: 600 9.5px 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.08em;
}

/* Floating Back-To-Top Button */
.mwp-back-to-top {
  position: absolute;
  right: 18px;
  bottom: 18px;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 3px 8px;
  border-radius: 12px;
  border: 1px solid var(--mwp-border);
  background: var(--mwp-surface);
  color: var(--mwp-ink-secondary);
  font-size: 10.5px;
  font-weight: 500;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
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
    padding: 10px 14px 30px;
  }
  .mwp-prose h1 { font-size: 18px; }
  .mwp-prose h2 { font-size: 15px; }
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
    left: var(--mwp-toc-width, 210px);
    z-index: 21;
  }
}
`;
