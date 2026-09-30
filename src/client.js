import { createMarkdownPreview } from './preview.js';

window.__ModuleLoader__.load({
  id: '@local/markdown-web-preview',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const ID = '@local/markdown-web-preview/web';
    const MarkdownWebBody = createMarkdownPreview(React);

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
