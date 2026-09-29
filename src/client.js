import { renderMarkdown } from './render.js';
import { styles } from './styles.js';
import {
  clampTocWidth,
  DEFAULT_TOC_WIDTH,
  loadTocWidth,
  saveTocWidth,
  loadTheme,
  saveTheme,
  loadWide,
  saveWide,
} from './resize.js';

window.__ModuleLoader__.load({
  id: '@local/markdown-web-preview',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const ID = '@local/markdown-web-preview/web';
    const storage = () => { try { return window.localStorage; } catch { return null; } };

    const findHeading = (container, id) => {
      if (!container || !id) return null;
      if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') {
        try {
          return container.querySelector(`#${CSS.escape(id)}`);
        } catch {}
      }
      return Array.from(container.querySelectorAll('[id]')).find(el => el.id === id) || null;
    };

    function MarkdownWebBody({ content, scrollportRef }) {
      const text = content?.kind === 'text' ? content.text : '';
      const { html, headings, stats } = React.useMemo(() => renderMarkdown(text), [text]);

      const [tocOpen, setTocOpen] = React.useState(true);
      const [tocWidth, setTocWidth] = React.useState(() => loadTocWidth(storage()));
      const [theme, setTheme] = React.useState(() => loadTheme(storage()));
      const [isWide, setIsWide] = React.useState(() => loadWide(storage()));
      const [resizing, setResizing] = React.useState(false);
      const [filter, setFilter] = React.useState('');
      const [active, setActive] = React.useState('');
      const [progress, setProgress] = React.useState(0);
      const [showBackToTop, setShowBackToTop] = React.useState(false);

      const layoutRef = React.useRef(null);
      const scrollElement = React.useRef(null);
      const navItemsRef = React.useRef(null);
      const cleanupResize = React.useRef(null);

      // Clean up resize listener on unmount
      React.useEffect(() => () => cleanupResize.current?.(), []);

      // Observe container width changes to prevent overflow
      React.useEffect(() => {
        if (!layoutRef.current || typeof ResizeObserver === 'undefined') return;
        const observer = new ResizeObserver(entries => {
          const available = entries[0]?.contentRect.width;
          if (available) setTocWidth(width => clampTocWidth(width, available));
        });
        observer.observe(layoutRef.current);
        return () => observer.disconnect();
      }, []);

      // Scrollspy: update reading progress, active heading, and back-to-top visibility
      React.useEffect(() => {
        const scroller = scrollElement.current;
        if (!scroller) return;

        let ticking = false;
        const onScroll = () => {
          if (ticking) return;
          ticking = true;
          window.requestAnimationFrame(() => {
            const scrollRange = scroller.scrollHeight - scroller.clientHeight;
            const currentProgress = scrollRange > 0 ? Math.min(100, Math.max(0, (scroller.scrollTop / scrollRange) * 100)) : 0;
            setProgress(Math.round(currentProgress));
            setShowBackToTop(scroller.scrollTop > 300);

            // Active section detection
            if (headings.length > 0) {
              const scrollerTop = scroller.getBoundingClientRect().top;
              let currentActive = headings[0].id;
              for (const entry of headings) {
                const el = findHeading(scroller, entry.id);
                if (el) {
                  const rect = el.getBoundingClientRect();
                  if (rect.top - scrollerTop <= 60) {
                    currentActive = entry.id;
                  } else {
                    break;
                  }
                }
              }
              setActive(currentActive);
            }
            ticking = false;
          });
        };

        scroller.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => scroller.removeEventListener('scroll', onScroll);
      }, [headings]);

      // Auto-scroll TOC active item into view
      React.useEffect(() => {
        if (!active || !navItemsRef.current) return;
        const activeItem = navItemsRef.current.querySelector('.mwp-nav-item.is-current');
        if (activeItem && typeof activeItem.scrollIntoView === 'function') {
          activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }, [active]);

      // Handle copy code button clicks and anchor jumps
      const handleProseClick = React.useCallback(event => {
        const copyButton = event.target.closest('.mwp-code-copy');
        if (copyButton) {
          const codeBlock = copyButton.closest('.mwp-code-block');
          const codeElement = codeBlock?.querySelector('code');
          if (codeElement && navigator.clipboard) {
            navigator.clipboard.writeText(codeElement.textContent).then(() => {
              copyButton.textContent = '已复制 ✓';
              copyButton.classList.add('is-copied');
              setTimeout(() => {
                copyButton.textContent = '复制';
                copyButton.classList.remove('is-copied');
              }, 2000);
            }).catch(() => {
              copyButton.textContent = '重试';
              setTimeout(() => { copyButton.textContent = '复制'; }, 1500);
            });
          }
        }
      }, []);

      // Drag to resize TOC
      const beginResize = React.useCallback(event => {
        if (event.button !== 0) return;
        event.preventDefault();
        const layout = layoutRef.current;
        if (!layout) return;
        const startX = event.clientX;
        const startWidth = layout.querySelector('.mwp-nav')?.getBoundingClientRect().width || DEFAULT_TOC_WIDTH;
        const available = () => layout.getBoundingClientRect().width;
        const previousCursor = document.body.style.cursor;
        const previousSelection = document.body.style.userSelect;
        let nextWidth = startWidth;

        const move = pointer => {
          nextWidth = clampTocWidth(startWidth + pointer.clientX - startX, available());
          setTocWidth(nextWidth);
        };
        const cleanup = () => {
          window.removeEventListener('pointermove', move);
          window.removeEventListener('pointerup', finish);
          window.removeEventListener('pointercancel', finish);
          document.body.style.cursor = previousCursor;
          document.body.style.userSelect = previousSelection;
          cleanupResize.current = null;
        };
        const finish = () => {
          cleanup();
          setResizing(false);
          saveTocWidth(storage(), nextWidth);
        };

        cleanupResize.current?.();
        cleanupResize.current = cleanup;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', finish);
        window.addEventListener('pointercancel', finish);
        setResizing(true);
      }, []);

      const resizeWithKeys = React.useCallback(event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const delta = event.shiftKey ? 32 : 12;
        const width = event.key === 'Home' ? 140 : event.key === 'End' ? 420 : tocWidth + (event.key === 'ArrowLeft' ? -delta : delta);
        const nextWidth = clampTocWidth(width, layoutRef.current?.getBoundingClientRect().width || 900);
        setTocWidth(nextWidth);
        saveTocWidth(storage(), nextWidth);
      }, [tocWidth]);

      const toggleTheme = React.useCallback(() => {
        const nextTheme = theme === 'auto' ? 'light' : theme === 'light' ? 'dark' : 'auto';
        setTheme(nextTheme);
        saveTheme(storage(), nextTheme);
      }, [theme]);

      const toggleWide = React.useCallback(() => {
        const nextWide = !isWide;
        setIsWide(nextWide);
        saveWide(storage(), nextWide);
      }, [isWide]);

      const setScroller = React.useCallback(node => {
        scrollElement.current = node;
        if (typeof scrollportRef === 'function') scrollportRef(node);
        else if (scrollportRef) scrollportRef.current = node;
      }, [scrollportRef]);

      const goTo = React.useCallback(id => {
        const container = scrollElement.current;
        const target = findHeading(container, id);
        if (!target || !container) return;
        container.scrollTo({
          top: target.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop - 12,
          behavior: 'smooth',
        });
        setActive(id);
      }, []);

      const scrollToTop = React.useCallback(() => {
        scrollElement.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }, []);

      const shownHeadings = headings.filter(entry =>
        entry.title.toLocaleLowerCase().includes(filter.trim().toLocaleLowerCase())
      );

      const themeClass = theme === 'dark' ? ' theme-dark' : theme === 'light' ? ' theme-light' : '';
      const themeLabel = theme === 'dark' ? '暗色' : theme === 'light' ? '亮色' : '自动';
      const themeIcon = theme === 'dark' ? '🌙' : theme === 'light' ? '☀️' : '🌓';

      const statsText = stats?.words
        ? `${headings.length} 节 · ${stats.words.toLocaleString()} 字 · ${stats.readTimeMinutes} 分钟`
        : `${headings.length} 节`;

      return h('section', {
        className: `mwp-root${tocOpen ? ' mwp-toc-open' : ''}${themeClass}`,
        'data-document-markdown-web': 'true',
      },
        h('style', null, styles),
        // Reading Progress Line
        h('div', { className: 'mwp-progress-track' },
          h('div', { className: 'mwp-progress-fill', style: { '--mwp-progress': `${progress}%` } })
        ),
        // Header / Toolbar
        h('header', { className: 'mwp-toolbar' },
          h('div', { className: 'mwp-identity' },
            h('span', { className: 'mwp-monogram', 'aria-hidden': true }, 'M'),
            h('span', { className: 'mwp-name' }, 'Markdown 阅读'),
            h('span', { className: 'mwp-separator', 'aria-hidden': true }, '/'),
            h('span', { className: 'mwp-stats-badge', title: '章节数 · 字数 · 预估用时' }, statsText)
          ),
          h('div', { className: 'mwp-toolbar-actions' },
            h('button', {
              type: 'button',
              className: `mwp-tool-btn${isWide ? ' is-active' : ''}`,
              title: isWide ? '切换为居中排版' : '切换为全宽通栏排版',
              onClick: toggleWide,
            }, isWide ? '通栏' : '居中'),
            h('button', {
              type: 'button',
              className: 'mwp-tool-btn',
              title: `切换界面主题（当前: ${themeLabel}）`,
              onClick: toggleTheme,
            }, `${themeIcon} ${themeLabel}`),
            h('button', {
              type: 'button',
              className: `mwp-toggle${tocOpen ? ' is-active' : ''}`,
              'aria-expanded': tocOpen,
              'aria-label': tocOpen ? '收起目录' : '展开目录',
              title: tocOpen ? '收起左侧目录' : '展开左侧目录',
              onClick: () => setTocOpen(!tocOpen),
            },
              h('span', { 'aria-hidden': true }, '☷'),
              h('span', null, '目录'),
              h('span', { className: 'mwp-count' }, String(headings.length).padStart(2, '0'))
            )
          )
        ),
        // Main Layout
        h('div', {
          className: `mwp-layout${resizing ? ' is-resizing' : ''}`,
          ref: layoutRef,
          style: { '--mwp-toc-width': `${tocWidth}px` },
        },
          // Table of Contents Sidebar
          tocOpen && h('nav', { className: 'mwp-nav', 'aria-label': '文档目录' },
            h('div', { className: 'mwp-nav-kicker' }, 'TOC / 章节目录'),
            h('div', { className: 'mwp-search-row' },
              h('label', { className: 'mwp-search' },
                h('span', { 'aria-hidden': true }, '⌕'),
                h('input', {
                  value: filter,
                  type: 'search',
                  placeholder: '筛选章节...',
                  'aria-label': '筛选章节',
                  onChange: event => setFilter(event.target.value),
                })
              ),
              filter && h('button', {
                type: 'button',
                className: 'mwp-search-clear',
                'aria-label': '清除筛选',
                title: '清除筛选',
                onClick: () => setFilter(''),
              }, '×')
            ),
            h('div', { className: 'mwp-nav-items', ref: navItemsRef },
              shownHeadings.length
                ? shownHeadings.map(entry => h('button', {
                    key: entry.id,
                    type: 'button',
                    className: `mwp-nav-item${active === entry.id ? ' is-current' : ''}`,
                    style: { '--mwp-level': Math.min(3, entry.level - 1) },
                    title: `${entry.title} (H${entry.level})`,
                    onClick: () => goTo(entry.id),
                  },
                    h('span', { className: 'mwp-level-dot', 'aria-hidden': true }),
                    h('span', { style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, entry.title)
                  ))
                : h('p', { className: 'mwp-empty' }, headings.length ? '没有匹配的章节' : '文档暂无标题')
            ),
            h('span', { className: 'mwp-nav-footer' }, 'HARNESS DOCS')
          ),
          // Resizer Divider
          tocOpen && h('div', {
            className: 'mwp-resize',
            role: 'separator',
            tabIndex: 0,
            'aria-label': '调整目录宽度',
            'aria-orientation': 'vertical',
            'aria-valuemin': 140,
            'aria-valuemax': 420,
            'aria-valuenow': tocWidth,
            title: '拖动调整目录宽度 · 双击恢复默认',
            onPointerDown: beginResize,
            onKeyDown: resizeWithKeys,
            onDoubleClick: () => {
              setTocWidth(DEFAULT_TOC_WIDTH);
              saveTocWidth(storage(), DEFAULT_TOC_WIDTH);
            },
          }),
          // Document Scroller
          h('div', { className: 'mwp-scroller', ref: setScroller, onClick: handleProseClick },
            h('article', { className: `mwp-article${isWide ? ' is-wide' : ''}` },
              h('div', { className: 'mwp-prose', dangerouslySetInnerHTML: { __html: html } }),
              content?.kind === 'text' && !content.eof && h('div', { className: 'mwp-page-note', role: 'status' }, '文档正在分页加载 · 滚动到底部可读取后续内容'),
              h('footer', { className: 'mwp-document-end' }, '— 文档结束 —')
            ),
            // Floating Back-to-Top Button
            showBackToTop && h('button', {
              type: 'button',
              className: 'mwp-back-to-top',
              'aria-label': '回到顶部',
              title: '平滑滚动回到顶部',
              onClick: scrollToTop,
            }, '↑ 顶部')
          )
        )
      );
    }

    return {
      inject: ['slots', 'documentPreviews'],
      apply(ctx) {
        ctx.effect(() => ctx.documentPreviews.register({
          id: ID,
          extensions: ['md', 'markdown'],
          priority: 'extension',
          title: () => '网页阅读',
          loading: 'text-pages',
          wrap: false,
        }));
        ctx.effect(() => ctx.slots.inject('sidebar.right.tab.document', () => ctx.slots.register({
          name: 'sidebar.right.tab.document',
          key: ID,
        }, MarkdownWebBody)));
      },
    };
  },
});
