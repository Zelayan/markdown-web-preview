import { build } from 'esbuild';
const common = { bundle: true, platform: 'browser', format: 'iife', target: 'es2022', minify: true, define: { 'process.env.NODE_ENV': '"production"' }, logLevel: 'info' };
const target = process.argv[2];
if (target && !['harness', 'vscode'].includes(target)) throw new Error('Unknown build target');
if (!target || target === 'harness') await build({ ...common, entryPoints: ['src/client.js'], outfile: 'lib/client.js' });
if (!target || target === 'vscode') await build({ ...common, entryPoints: ['src/vscode-webview.js'], outfile: 'vscode/webview.js' });
