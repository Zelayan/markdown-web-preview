import { build } from 'esbuild';
const common = { bundle: true, platform: 'browser', format: 'iife', target: 'es2022', logLevel: 'info' };
await build({ ...common, entryPoints: ['src/client.js'], outfile: 'lib/client.js' });
await build({ ...common, entryPoints: ['src/vscode-webview.js'], outfile: 'vscode/webview.js' });
