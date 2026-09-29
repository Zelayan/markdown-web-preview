export const styles = `
/* ==========================================================================
   Markdown Web Preview - Modern Docs Style (VitePress / Docusaurus)
   Layout: Left Navigation Tree + Center Reading Article + Right "On this page" TOC
   ========================================================================== */

.mwp-root {
  /* Modern Clean Light Theme */
  --mwp-bg: #ffffff;
  --mwp-surface: #ffffff;
  --mwp-sidebar-bg: #f8fafc;
  --mwp-border: #e2e8f0;
  --mwp-border-subtle: #f1f5f9;
  --mwp-ink: #0f172a;
  --mwp-ink-secondary: #475569;
  --mwp-mute: #94a3b8;
  --mwp-accent: #2563eb;
  --mwp-accent-light: #eff6ff;
  --mwp-accent-hover: #1d4ed8;
  --mwp-code-bg: #f1f5f9;
  --mwp-pre-bg: #0f172a;
  --mwp-pre-header-bg: #1e293b;
  --mwp-pre-ink: #f8fafc;
  --mwp-table-alt: #f8fafc;
  --mwp-table-th: #f1f5f9;
  --mwp-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

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

/* Dark Theme */
.mwp-root.theme-dark {
  --mwp-bg: #0b0f17;
  --mwp-surface: #0f172a;
  --mwp-sidebar-bg: #090d15;
  --mwp-border: #1e293b;
  --mwp-border-subtle: #141c2c;
  --mwp-ink: #f1f5f9;
  --mwp-ink-secondary: #cbd5e1;
  --mwp-mute: #64748b;
  --mwp-accent: #3b82f6;
  --mwp-accent-light: #172554;
  --mwp-accent-hover: #60a5fa;
  --mwp-code-bg: #1e293b;
  --mwp-pre-bg: #030712;
  --mwp-pre-header-bg: #0f172a;
  --mwp-pre-ink: #f8fafc;
  --mwp-table-alt: #0c1220;
  --mwp-table-th: #131d31;
  --mwp-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
}

@media (prefers-color-scheme: dark) {
  .mwp-root:not(.theme-light) {
    --mwp-bg: #0b0f17;
    --mwp-surface: #0f172a;
    --mwp-sidebar-bg: #090d15;
    --mwp-border: #1e293b;
    --mwp-border-subtle: #141c2c;
    --mwp-ink: #f1f5f9;
    --mwp-ink-secondary: #cbd5e1;
    --mwp-mute: #64748b;
    --mwp-accent: #3b82f6;
    --mwp-accent-light: #172554;
    --mwp-accent-hover: #60a5fa;
    --mwp-code-bg: #1e293b;
    --mwp-pre-bg: #030712;
    --mwp-pre-header-bg: #0f172a;
    --mwp-pre-ink: #f8fafc;
    --mwp-table-alt: #0c1220;
    --mwp-table-th: #131d31;
    --mwp-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
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
  top: 42px;
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
   Modern Navigation Navbar (42px)
   -------------------------------------------------------------------------- */
.mwp-toolbar {
  height: 42px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: var(--mwp-surface);
  border-bottom: 1px solid var(--mwp-border);
  position: relative;
  z-index: 5;
}

.mwp-navbar-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.mwp-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 13.5px;
  color: var(--mwp-ink);
  letter-spacing: -0.01em;
}

.mwp-brand-icon {
  font-size: 16px;
  line-height: 1;
}

.mwp-navbar-center {
  flex: 1;
  max-width: 320px;
  margin: 0 16px;
}

.mwp-quick-search {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  height: 28px;
  padding: 0 8px;
  border: 1px solid var(--mwp-border);
  border-radius: 6px;
  background: var(--mwp-sidebar-bg);
  color: var(--mwp-mute);
  transition: all 0.15s ease;
}

.mwp-quick-search:focus-within {
  background: var(--mwp-surface);
  border-color: var(--mwp-accent);
  box-shadow: 0 0 0 2px var(--mwp-accent-light);
}

.mwp-quick-search span {
  font-size: 13px;
  line-height: 1;
}

.mwp-quick-search input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--mwp-ink);
  font-size: 12px;
  font-family: inherit;
}

.mwp-quick-search input::placeholder {
  color: var(--mwp-mute);
}

.mwp-search-clear {
  display: grid;
  place-items: center;
  width: 16px;
  height: 16px;
  border: 0;
  border-radius: 50%;
  background: var(--mwp-border);
  color: var(--mwp-ink-secondary);
  font-size: 10px;
  cursor: pointer;
}

.mwp-navbar-right {
  display: flex;
  align-items: center;
  gap: 6px;
}

.mwp-stats-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 7px;
  border-radius: 4px;
  background: var(--mwp-border-subtle);
  color: var(--mwp-mute);
  font-size: 11px;
  margin-right: 4px;
}

.mwp-tool-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 28px;
  padding: 0 8px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  color: var(--mwp-ink-secondary);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.12s ease;
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
  gap: 5px;
  height: 28px;
  padding: 0 8px;
  border: 1px solid var(--mwp-border);
  border-radius: 6px;
  background: var(--mwp-surface);
  color: var(--mwp-ink-secondary);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.12s ease;
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
  font: 600 9.5px 'SFMono-Regular', Menlo, monospace;
}

/* --------------------------------------------------------------------------
   Three-Column Layout: Left Nav + Center Content + Right Mini TOC
   -------------------------------------------------------------------------- */
.mwp-layout {
  display: flex;
  min-height: 0;
  flex: 1;
  position: relative;
}

/* Left Sidebar (Book / Chapter Hierarchy Style) */
.mwp-nav {
  width: var(--mwp-toc-width, 240px);
  min-width: var(--mwp-toc-width, 240px);
  flex: 0 0 var(--mwp-toc-width, 240px);
  display: flex;
  flex-direction: column;
  background: var(--mwp-sidebar-bg);
  border-right: 1px solid var(--mwp-border);
  padding: 14px 10px 10px 14px;
  user-select: none;
}

.mwp-nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.mwp-nav-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--mwp-ink);
  letter-spacing: -0.01em;
}

.mwp-nav-items {
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  padding-right: 2px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.mwp-nav-items::-webkit-scrollbar {
  width: 4px;
}
.mwp-nav-items::-webkit-scrollbar-thumb {
  background: var(--mwp-border);
  border-radius: 2px;
}

.mwp-nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 0;
  border-radius: 6px;
  padding: 6px 8px 6px calc(8px + var(--mwp-level, 0) * 12px);
  background: transparent;
  color: var(--mwp-ink-secondary);
  text-align: left;
  font-size: 12px;
  line-height: 1.4;
  cursor: pointer;
  transition: all 0.1s ease;
  overflow: hidden;
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

.mwp-nav-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mwp-nav-h1 {
  font-weight: 650;
  color: var(--mwp-ink);
}

.mwp-empty {
  font-size: 11px;
  color: var(--mwp-mute);
  padding: 12px 4px;
  text-align: center;
}

/* Resizer Divider */
.mwp-resize {
  position: relative;
  z-index: 4;
  flex: 0 0 6px;
  align-self: stretch;
  cursor: col-resize;
  background: transparent;
  margin-left: -3px;
  margin-right: -3px;
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
   Center Article Viewport & Right In-Page Outline (Modern Docs)
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

.mwp-scroller-inner {
  display: flex;
  justify-content: flex-start;
  min-height: 100%;
}

.mwp-article {
  flex: 1;
  min-width: 0;
  max-width: 860px;
  padding: 20px 36px 64px;
  transition: max-width 0.15s ease;
}

.mwp-article.is-wide {
  max-width: 100%;
  padding-left: 28px;
  padding-right: 28px;
}

/* Breadcrumb Header */
.mwp-breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--mwp-mute);
  margin-bottom: 16px;
}

.mwp-breadcrumb a,
.mwp-breadcrumb span.mwp-crumb-link {
  color: var(--mwp-ink-secondary);
  text-decoration: none;
  cursor: pointer;
}

.mwp-breadcrumb a:hover,
.mwp-breadcrumb span.mwp-crumb-link:hover {
  color: var(--mwp-accent);
}

.mwp-breadcrumb-current {
  color: var(--mwp-accent);
  font-weight: 500;
}

/* Right In-Page "本页目录" TOC Column */
.mwp-on-this-page {
  width: 180px;
  flex: 0 0 180px;
  position: sticky;
  top: 0;
  height: calc(100vh - 42px);
  max-height: 100%;
  overflow-y: auto;
  padding: 20px 12px 40px 10px;
  border-left: 1px solid var(--mwp-border-subtle);
  user-select: none;
}

.mwp-on-this-page-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--mwp-ink);
  margin-bottom: 10px;
}

.mwp-outline-item {
  display: block;
  width: 100%;
  border: 0;
  background: transparent;
  text-align: left;
  font-size: 11.5px;
  line-height: 1.4;
  padding: 4px 6px 4px calc(6px + var(--mwp-sublevel, 0) * 10px);
  color: var(--mwp-ink-secondary);
  border-left: 2px solid transparent;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: all 0.1s ease;
}

.mwp-outline-item:hover {
  color: var(--mwp-ink);
}

.mwp-outline-item.is-current {
  color: var(--mwp-accent);
  font-weight: 600;
  border-left-color: var(--mwp-accent);
  background: var(--mwp-accent-light);
}

/* --------------------------------------------------------------------------
   Prose / Technical Docs Typography
   -------------------------------------------------------------------------- */
.mwp-prose {
  font-size: 13.5px;
  line-height: 1.65;
  color: var(--mwp-ink);
  overflow-wrap: anywhere;
}

.mwp-prose h1 {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 12px 0;
  padding-bottom: 6px;
  color: var(--mwp-ink);
  line-height: 1.3;
}

.mwp-prose h2 {
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 28px 0 10px 0;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--mwp-border-subtle);
  color: var(--mwp-ink);
  line-height: 1.35;
}

.mwp-prose h3 {
  font-size: 14.5px;
  font-weight: 650;
  margin: 20px 0 8px 0;
  color: var(--mwp-ink);
  line-height: 1.4;
}

.mwp-prose h4 {
  font-size: 13.5px;
  font-weight: 650;
  margin: 16px 0 6px 0;
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
  content: ' #';
  color: var(--mwp-accent);
  opacity: 0.4;
  font-weight: 400;
  font-size: 0.85em;
}

.mwp-prose p {
  margin: 8px 0;
}

.mwp-prose a {
  color: var(--mwp-accent);
  text-decoration: underline;
  text-decoration-color: rgba(37, 99, 235, 0.35);
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

/* Modern Card Badges / Quick Links (Grid Cards in Markdown) */
.mwp-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin: 16px 0 20px;
}

.mwp-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid var(--mwp-border);
  border-radius: 8px;
  background: var(--mwp-surface);
  box-shadow: var(--mwp-shadow-sm);
  transition: border-color 0.15s ease, transform 0.15s ease;
}

.mwp-card:hover {
  border-color: var(--mwp-accent);
  transform: translateY(-1px);
}

/* Lists with Circular Bullet Badges */
.mwp-prose ul,
.mwp-prose ol {
  padding-left: 22px;
  margin: 6px 0 10px;
}

.mwp-prose li {
  margin: 4px 0;
  padding-left: 2px;
}

.mwp-prose li > p {
  margin: 2px 0 !important;
}

.mwp-prose li > ul,
.mwp-prose li > ol {
  margin: 3px 0 4px !important;
}

/* Numbered Steps / Badge Numbering */
.mwp-prose ol {
  counter-reset: mwp-step;
  list-style: none;
  padding-left: 0;
}

.mwp-prose ol > li {
  counter-increment: mwp-step;
  position: relative;
  padding-left: 28px;
  margin: 8px 0;
}

.mwp-prose ol > li::before {
  content: counter(mwp-step);
  position: absolute;
  left: 0;
  top: 1px;
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--mwp-accent);
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
}

/* Inline Code Pill */
.mwp-prose code {
  font-family: 'SFMono-Regular', Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
  background: var(--mwp-code-bg);
  border-radius: 4px;
  padding: 1.5px 5px;
  color: var(--mwp-ink);
  border: 1px solid var(--mwp-border);
}

/* Code Blocks */
.mwp-code-block {
  margin: 12px 0;
  border-radius: 8px;
  background: var(--mwp-pre-bg);
  border: 1px solid var(--mwp-border);
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
  color: #94a3b8;
  font: 600 10px/1 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.05em;
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
  color: #cbd5e1;
  font-size: 11px;
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

/* Modern Tables */
.mwp-table-wrap {
  width: 100%;
  overflow-x: auto;
  margin: 12px 0;
  border: 1px solid var(--mwp-border);
  border-radius: 6px;
  box-shadow: var(--mwp-shadow-sm);
  background: var(--mwp-surface);
}

.mwp-prose table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12.5px;
  line-height: 1.5;
}

.mwp-prose th,
.mwp-prose td {
  padding: 8px 12px;
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

/* Modern Callout / Alert Panels (Exact Match to Screenshot) */
.mwp-prose blockquote {
  margin: 12px 0;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #bfdbfe;
  background: #eff6ff;
  color: #1e3a8a;
}

.mwp-callout {
  border-width: 1px;
}

.mwp-callout-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font: 700 12px/1 -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: -0.01em;
  margin-bottom: 6px;
  text-transform: none;
}

.mwp-callout-note {
  border-color: #bfdbfe;
  background: #eff6ff;
  color: #1e3a8a;
}
.mwp-callout-note .mwp-callout-title { color: #1d4ed8; }

.mwp-callout-tip {
  border-color: #bbf7d0;
  background: #f0fdf4;
  color: #14532d;
}
.mwp-callout-tip .mwp-callout-title { color: #15803d; }

.mwp-callout-important {
  border-color: #ddd6fe;
  background: #f5f3ff;
  color: #4c1d95;
}
.mwp-callout-important .mwp-callout-title { color: #6d28d9; }

.mwp-callout-warning {
  border-color: #fde68a;
  background: #fefce8;
  color: #713f12;
}
.mwp-callout-warning .mwp-callout-title { color: #b45309; }

.mwp-callout-caution {
  border-color: #fecaca;
  background: #fef2f2;
  color: #7f1d1d;
}
.mwp-callout-caution .mwp-callout-title { color: #b91c1c; }

.mwp-prose hr {
  border: 0;
  border-top: 1px solid var(--mwp-border-subtle);
  margin: 20px 0;
}

.mwp-prose img {
  max-width: 100%;
  border-radius: 6px;
  border: 1px solid var(--mwp-border);
}

.mwp-document-end {
  text-align: center;
  border-top: 1px solid var(--mwp-border-subtle);
  margin-top: 32px;
  padding-top: 16px;
  color: var(--mwp-mute);
  font: 600 10px 'SFMono-Regular', Menlo, monospace;
  letter-spacing: 0.08em;
}

/* Back-to-Top Button */
.mwp-back-to-top {
  position: absolute;
  right: 20px;
  bottom: 20px;
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 4px 10px;
  border-radius: 16px;
  border: 1px solid var(--mwp-border);
  background: var(--mwp-surface);
  color: var(--mwp-ink-secondary);
  font-size: 11px;
  font-weight: 500;
  box-shadow: var(--mwp-shadow-sm);
  cursor: pointer;
  transition: all 0.12s ease;
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
@media (max-width: 900px) {
  .mwp-on-this-page { display: none; }
  .mwp-navbar-center { display: none; }
}

@media (max-width: 700px) {
  .mwp-article { padding: 14px 16px 40px; }
  .mwp-stats-badge { display: none; }
}
`;
