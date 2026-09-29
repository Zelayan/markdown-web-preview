import { renderMarkdown } from './render.js';
import { styles } from './styles.js';
import { clampTocWidth, DEFAULT_TOC_WIDTH, loadTocWidth, saveTocWidth } from './resize.js';

window.__ModuleLoader__.load({
  id: '@local/markdown-web-preview',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const ID = '@local/markdown-web-preview/web';
    const storage = () => { try { return window.localStorage; } catch { return null; } };

    function MarkdownWebBody({ content, scrollportRef }) {
      const text = content?.kind === 'text' ? content.text : '';
      const { html, headings } = React.useMemo(() => renderMarkdown(text), [text]);
      const [tocOpen, setTocOpen] = React.useState(true);
      const [tocWidth, setTocWidth] = React.useState(() => loadTocWidth(storage()));
      const [resizing, setResizing] = React.useState(false);
      const layoutRef = React.useRef(null);
      const cleanupResize = React.useRef(null);
      React.useEffect(() => () => cleanupResize.current?.(), []);
      React.useEffect(() => {
        if (!layoutRef.current || typeof ResizeObserver === 'undefined') return;
        const observer = new ResizeObserver(entries => {
          const available = entries[0]?.contentRect.width;
          if (available) setTocWidth(width => clampTocWidth(width, available));
        });
        observer.observe(layoutRef.current);
        return () => observer.disconnect();
      }, []);
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
      const [filter, setFilter] = React.useState('');
      const [active, setActive] = React.useState('');
      const scrollElement = React.useRef(null);
      const setScroller = React.useCallback(node => {
        scrollElement.current = node;
        if (typeof scrollportRef === 'function') scrollportRef(node);
        else if (scrollportRef) scrollportRef.current = node;
      }, [scrollportRef]);
      const goTo = React.useCallback(id => {
        const container = scrollElement.current;
        const target = Array.from(container?.querySelectorAll('[id]') || []).find(el => el.id === id);
        if (!target || !container) return;
        container.scrollTo({ top: target.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop - 28, behavior: 'smooth' });
        setActive(id);
      }, []);
      const shownHeadings = headings.filter(entry => entry.title.toLocaleLowerCase().includes(filter.trim().toLocaleLowerCase()));
      return h('section', { className: `mwp-root${tocOpen ? ' mwp-toc-open' : ''}`, 'data-document-markdown-web': 'true' },
        h('style', null, styles),
        h('header', { className: 'mwp-toolbar' },
          h('div', { className: 'mwp-identity' }, h('span', { className: 'mwp-monogram', 'aria-hidden': true }, 'M'),
            h('span', { className: 'mwp-name' }, '文档阅读器'), h('span', { className: 'mwp-separator', 'aria-hidden': true }, '/'), h('span', { className: 'mwp-format' }, 'MARKDOWN')),
          h('button', { type: 'button', className: `mwp-toggle${tocOpen ? ' is-active' : ''}`, 'aria-expanded': tocOpen, 'aria-label': tocOpen ? '收起目录' : '展开目录', onClick: () => setTocOpen(!tocOpen) },
            h('span', { 'aria-hidden': true }, '☷'), h('span', null, '目录'), h('span', { className: 'mwp-count' }, String(headings.length).padStart(2, '0')))),
        h('div', { className: `mwp-layout${resizing ? ' is-resizing' : ''}`, ref: layoutRef, style: { '--mwp-toc-width': `${tocWidth}px` } },
          tocOpen && h('nav', { className: 'mwp-nav', 'aria-label': '文档目录' },
            h('div', { className: 'mwp-nav-kicker' }, 'ON THIS PAGE'),
            h('label', { className: 'mwp-search' }, h('span', { 'aria-hidden': true }, '⌕'),
              h('input', { value: filter, type: 'search', placeholder: '筛选章节', 'aria-label': '筛选章节', onChange: event => setFilter(event.target.value) })),
            h('div', { className: 'mwp-nav-items' }, shownHeadings.length
              ? shownHeadings.map(entry => h('button', {
                  key: entry.id, type: 'button', className: `mwp-nav-item${active === entry.id ? ' is-current' : ''}`,
                  style: { '--mwp-level': Math.min(3, entry.level - 1) }, title: entry.title,
                  onClick: () => goTo(entry.id),
                }, entry.title))
              : h('p', { className: 'mwp-empty' }, headings.length ? '没有匹配的章节' : '文档暂无章节')),
            h('span', { className: 'mwp-nav-footer' }, 'DEEPSEEK HARNESS · PREVIEW')),
          tocOpen && h('div', { className: 'mwp-resize', role: 'separator', tabIndex: 0, 'aria-label': '调整目录宽度', 'aria-orientation': 'vertical', 'aria-valuemin': 140, 'aria-valuemax': 420, 'aria-valuenow': tocWidth, title: '拖动调整目录宽度 · 双击恢复默认', onPointerDown: beginResize, onKeyDown: resizeWithKeys, onDoubleClick: () => { setTocWidth(DEFAULT_TOC_WIDTH); saveTocWidth(storage(), DEFAULT_TOC_WIDTH); } }, h('span', { className: 'mwp-resize-grip', 'aria-hidden': true })),
          h('div', { className: 'mwp-scroller', ref: setScroller },
            h('article', { className: 'mwp-article' },
              h('div', { className: 'mwp-article-eyebrow' }, h('span', { className: 'mwp-dot' }), 'DOCUMENT / 阅读视图'),
              h('div', { className: 'mwp-prose', dangerouslySetInnerHTML: { __html: html } }),
              content?.kind === 'text' && !content.eof && h('div', { className: 'mwp-page-note', role: 'status' }, '文档正在分页加载 · 滚动到底部可读取后续内容'),
              h('footer', { className: 'mwp-document-end' }, '— 文档结束 —')))));
    }
    return {
      inject: ['slots', 'documentPreviews'],
      apply(ctx) {
        ctx.effect(() => ctx.documentPreviews.register({ id: ID, extensions: ['md', 'markdown'], priority: 'extension', title: () => '网页阅读', loading: 'text-pages', wrap: false }));
        ctx.effect(() => ctx.slots.inject('sidebar.right.tab.document', () => ctx.slots.register({ name: 'sidebar.right.tab.document', key: ID }, MarkdownWebBody)));
      },
    };
  },
});
