/**
 * @file Offline distribution packager for Markdown Web Preview
 * @description Builds and packages self-contained offline installation artifacts
 * for DeepSeek Harness (tarball + zero-pnpm installer) and VS Code/Cursor (.vsix).
 */

import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';
import { build } from 'esbuild';
import { hashDirectory, listPlainFiles } from './offline-core.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

/**
 * Creates a standard 512-byte ustar tar header.
 */
function createTarHeader(name, size, mtime = Math.floor(Date.now() / 1000), mode = 0o644) {
  const buf = Buffer.alloc(512);
  buf.write(name, 0, 100, 'utf8');
  buf.write(mode.toString(8).padStart(7, '0') + '\0', 100, 8, 'ascii');
  buf.write('0000000\0', 108, 8, 'ascii'); // uid
  buf.write('0000000\0', 116, 8, 'ascii'); // gid
  buf.write(size.toString(8).padStart(11, '0') + '\0', 124, 12, 'ascii');
  buf.write(mtime.toString(8).padStart(11, '0') + '\0', 136, 12, 'ascii');
  buf.fill(32, 148, 156); // 8 spaces for chksum
  buf.write('0', 156, 1, 'ascii'); // regular file
  buf.write('ustar\0', 257, 6, 'ascii');
  buf.write('00', 263, 2, 'ascii');
  let sum = 0;
  for (let i = 0; i < 512; i++) sum += buf[i];
  buf.write(sum.toString(8).padStart(6, '0') + '\0 ', 148, 8, 'ascii');
  return buf;
}

/**
 * Packs a directory of files into a .tgz buffer.
 * @param {string} sourceDir
 * @param {string} archivePrefix - e.g. 'package'
 * @returns {Buffer} Gzip-compressed tar archive
 */
function createTarball(sourceDir, archivePrefix = 'package') {
  const files = listPlainFilesSync(sourceDir);
  const chunks = [];
  for (const relPath of files) {
    const fullPath = join(sourceDir, relPath);
    const content = readFileSync(fullPath);
    const tarName = `${archivePrefix}/${relPath}`.replace(/\\/g, '/');
    chunks.push(createTarHeader(tarName, content.length));
    chunks.push(content);
    const pad = (512 - (content.length % 512)) % 512;
    if (pad > 0) chunks.push(Buffer.alloc(pad));
  }
  // End of archive marker (two 512-byte zero blocks)
  chunks.push(Buffer.alloc(1024));
  return zlib.gzipSync(Buffer.concat(chunks));
}

function listPlainFilesSync(dir, prefix = '') {
  const results = [];
  const entries = fsReaddirSync(join(dir, prefix), { withFileTypes: true });
  for (const entry of entries) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      results.push(...listPlainFilesSync(dir, rel));
    } else if (entry.isFile()) {
      results.push(rel);
    }
  }
  return results.sort();
}

import { readdirSync as fsReaddirSync } from 'node:fs';

async function main() {
  console.log('=== Markdown Web Preview 离线包构建 ===\n');

  // 1. Read metadata
  const rootPkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
  const version = rootPkg.version;
  console.log(`插件版本: v${version}`);

  // 2. Build client and webview bundles
  console.log('\n[1/5] 执行前端构建 (Harness + VS Code)...');
  const common = {
    bundle: true,
    platform: 'browser',
    format: 'iife',
    target: 'es2022',
    minify: true,
    define: { 'process.env.NODE_ENV': '"production"' },
    logLevel: 'error',
  };
  await build({ ...common, entryPoints: [join(ROOT, 'src/client.js')], outfile: join(ROOT, 'lib/client.js') });
  await build({ ...common, entryPoints: [join(ROOT, 'src/vscode-webview.js')], outfile: join(ROOT, 'vscode/webview.js') });
  console.log('✔ 构建完成: lib/client.js, vscode/webview.js');

  // 3. Prepare output directory
  const distDir = join(ROOT, 'dist');
  mkdirSync(distDir, { recursive: true });

  const offlineBundleName = `markdown-web-preview-${version}-offline`;
  const offlineBundleDir = join(distDir, offlineBundleName);
  rmSync(offlineBundleDir, { recursive: true, force: true });
  mkdirSync(offlineBundleDir, { recursive: true });

  const packageDir = join(offlineBundleDir, 'package');
  mkdirSync(join(packageDir, 'lib'), { recursive: true });

  // 4. Assemble package/ directory
  console.log('\n[2/5] 组装自包含插件目录...');
  const filesToCopy = ['cordis.patch.yml', 'index.js', 'lib/client.js', 'README.md'];
  for (const rel of filesToCopy) {
    copyFileSync(join(ROOT, rel), join(packageDir, rel));
  }

  // Create sanitized package.json for offline distribution:
  // dependencies must be empty so pnpm / DSH requires zero network access
  const { devDependencies, scripts, ...cleanPkg } = rootPkg;
  cleanPkg.dependencies = {};
  writeFileSync(join(packageDir, 'package.json'), `${JSON.stringify(cleanPkg, null, 2)}\n`);

  // 5. Generate manifest.json
  console.log('\n[3/5] 计算 SHA-256 完整性清单...');
  const hashes = await hashDirectory(packageDir);
  const manifest = {
    format: 1,
    name: rootPkg.name,
    version,
    files: hashes,
  };
  writeFileSync(join(offlineBundleDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`✔ manifest.json 已生成 (${Object.keys(hashes).length} 个文件)`);

  // 6. Bundle standalone CJS installer
  console.log('\n[4/5] 构建单文件零依赖离线安装器 (install.cjs)...');
  await build({
    entryPoints: [join(ROOT, 'scripts/install-offline.mjs')],
    outfile: join(offlineBundleDir, 'install.cjs'),
    bundle: true,
    platform: 'node',
    target: 'node18',
    format: 'cjs',
    logLevel: 'error',
  });
  console.log('✔ install.cjs 构建完成');

  // Also include install-offline.mjs and offline-core.mjs in bundle for reference
  copyFileSync(join(ROOT, 'scripts/install-offline.mjs'), join(offlineBundleDir, 'install-offline.mjs'));
  copyFileSync(join(ROOT, 'scripts/offline-core.mjs'), join(offlineBundleDir, 'offline-core.mjs'));

  // 7. Generate offline tarball (.tgz) for native DSH "添加插件"
  console.log('\n[5/5] 生成离线压缩包 (.tgz 与 .vsix)...');
  const tgzBuffer = createTarball(packageDir, 'package');
  const tgzFileName = `local-markdown-web-preview-${version}.tgz`;
  const tgzPath = join(distDir, tgzFileName);
  writeFileSync(tgzPath, tgzBuffer);
  // Also keep a copy at repo root for backwards compatibility
  writeFileSync(join(ROOT, tgzFileName), tgzBuffer);
  console.log(`✔ DSH 离线安装包: ${tgzFileName} (${(tgzBuffer.length / 1024).toFixed(1)} KB)`);

  // 8. Zip the offline bundle folder for distribution
  const offlineZipFileName = `${offlineBundleName}.zip`;
  const offlineZipPath = join(distDir, offlineZipFileName);
  const zipBundleScript = `
import zipfile, os

bundle_dir = ${JSON.stringify(offlineBundleDir)}
zip_path = ${JSON.stringify(offlineZipPath)}

with zipfile.ZipFile(zip_path, 'w', compression=zipfile.ZIP_DEFLATED) as zout:
    for root, dirs, files in os.walk(bundle_dir):
        for file in sorted(files):
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, bundle_dir)
            zout.write(full_path, os.path.join(${JSON.stringify(offlineBundleName)}, rel_path))
`;
  execFileSync('python3', ['-c', zipBundleScript]);
  const zipStat = readFileSync(offlineZipPath);
  console.log(`✔ DSH 零依赖离线分发包: ${offlineZipFileName} (${(zipStat.length / 1024).toFixed(1)} KB)`);

  // 9. Package VS Code .vsix
  const vsixFileName = `markdown-web-preview-${version}.vsix`;
  const vsixDistPath = join(distDir, vsixFileName);
  const vsixVscodePath = join(ROOT, 'vscode', vsixFileName);

  // Use python3 zipfile to generate exact VSIX archive
  const vsixScript = `
import zipfile, os

dist_path = ${JSON.stringify(vsixDistPath)}
vscode_dir = ${JSON.stringify(join(ROOT, 'vscode'))}

# Extract template metadata from existing 0.4.2 vsix if available, or write standard manifest
existing_vsix = os.path.join(vscode_dir, 'markdown-web-preview-0.4.2.vsix')
with zipfile.ZipFile(dist_path, 'w', compression=zipfile.ZIP_DEFLATED) as zout:
    if os.path.exists(existing_vsix):
        with zipfile.ZipFile(existing_vsix, 'r') as zin:
            for item in zin.infolist():
                if item.filename in ('extension.vsixmanifest', '[Content_Types].xml'):
                    content = zin.read(item.filename)
                    # update version in vsixmanifest
                    if item.filename == 'extension.vsixmanifest':
                        import re
                        content = re.sub(rb'Version="[0-9.]+"', f'Version="${version}"'.encode('utf-8'), content)
                    zout.writestr(item.filename, content)
    zout.write(os.path.join(vscode_dir, 'README.md'), 'extension/readme.md')
    zout.write(os.path.join(vscode_dir, 'extension.cjs'), 'extension/extension.cjs')
    zout.write(os.path.join(vscode_dir, 'package.json'), 'extension/package.json')
    zout.write(os.path.join(vscode_dir, 'print-html.cjs'), 'extension/print-html.cjs')
    zout.write(os.path.join(vscode_dir, 'webview.js'), 'extension/webview.js')
`;
  execFileSync('python3', ['-c', vsixScript]);
  copyFileSync(vsixDistPath, vsixVscodePath);
  const vsixStat = readFileSync(vsixDistPath);
  console.log(`✔ VS Code 离线扩展包: ${vsixFileName} (${(vsixStat.length / 1024).toFixed(1)} KB)`);

  // 10. Generate SHA256SUMS.txt
  const artifacts = [
    { name: tgzFileName, path: tgzPath },
    { name: offlineZipFileName, path: offlineZipPath },
    { name: vsixFileName, path: vsixDistPath },
  ];
  const sums = [];
  for (const art of artifacts) {
    const hash = createHash('sha256').update(readFileSync(art.path)).digest('hex');
    sums.push(`${hash}  ${art.name}`);
  }
  writeFileSync(join(distDir, 'SHA256SUMS.txt'), sums.join('\n') + '\n');

  console.log('\n========================================');
  console.log('离线安装产物打包完成！');
  console.log('========================================');
  console.log(`1. DeepSeek Harness 独立安装目录:\n   dist/${offlineBundleName}/`);
  console.log(`   用法: node install.cjs --profile ~/.dsh/profiles/desktop --host-stopped`);
  console.log(`\n2. DeepSeek Harness 本地组合包 (.tgz):\n   dist/${tgzFileName}`);
  console.log(`   用法: 在 DSH 侧边栏「插件」中选择「添加插件」，输入此 .tgz 的绝对路径`);
  console.log(`\n3. VS Code / Cursor 扩展包 (.vsix):\n   dist/${vsixFileName}`);
  console.log(`   用法: 在扩展视图中选择「Install from VSIX...」并选择此文件`);
  console.log('========================================\n');
}

main().catch(err => {
  console.error(`\n打包失败: ${err.message}`);
  process.exit(1);
});
