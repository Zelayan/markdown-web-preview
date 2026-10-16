#!/usr/bin/env node
/**
 * @file Offline installer CLI for Markdown Web Preview
 * @description Installs the pre-built plugin into a DeepSeek Harness profile
 * without requiring pnpm, npm, or an internet connection.
 */

import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { installOfflinePlugin } from './offline-core.mjs';

let scriptDir = '.';
try {
  if (typeof __dirname !== 'undefined') {
    scriptDir = __dirname;
  } else if (typeof import.meta !== 'undefined' && import.meta.url) {
    scriptDir = dirname(fileURLToPath(import.meta.url));
  }
} catch {
  scriptDir = '.';
}

function printUsage() {
  console.log(`
Markdown Web Preview 离线安装器

用法：
  node install-offline.mjs --profile <profile目录> --host-stopped [选项]

必需参数：
  --profile <路径>    目标 DeepSeek Harness profile 目录
                     例如：~/.dsh/profiles/desktop 或 ~/.dsh/profiles/web
  --host-stopped     确认目标 DeepSeek Harness 已完全停止

可选参数：
  --bundle <路径>     离线安装包目录（包含 package/ 和 manifest.json 的目录）
                     默认值：当前目录或本脚本同级目录
  --force            如果已安装过该插件，允许覆盖/更新安装
  -h, --help         显示本帮助信息

示例：
  node install-offline.mjs --profile ~/.dsh/profiles/desktop --host-stopped
  node install-offline.mjs --bundle ./dist/markdown-web-preview-0.4.2-offline --profile ~/.dsh/profiles/web --host-stopped --force
`);
}

async function main() {
  let values;
  try {
    const parsed = parseArgs({
      options: {
        bundle: { type: 'string' },
        profile: { type: 'string' },
        'host-stopped': { type: 'boolean', default: false },
        force: { type: 'boolean', default: false },
        help: { type: 'boolean', short: 'h', default: false },
      },
      allowPositionals: false,
    });
    values = parsed.values;
  } catch (err) {
    console.error(`参数解析错误: ${err.message}`);
    printUsage();
    process.exit(1);
  }

  if (values.help) {
    printUsage();
    process.exit(0);
  }

  if (!values.profile) {
    console.error('错误: 缺少 --profile 参数。');
    printUsage();
    process.exit(1);
  }

  if (!values['host-stopped']) {
    console.error('错误: 缺少 --host-stopped 参数。请先退出目标 DSH，并带上此参数确认。');
    printUsage();
    process.exit(1);
  }

  // Resolve profile path, expanding leading ~ if needed
  let profileDir = values.profile;
  if (profileDir.startsWith('~/') || profileDir === '~') {
    profileDir = join(homedir(), profileDir.slice(1));
  }
  profileDir = resolve(profileDir);

  // Determine bundle directory
  let bundleDir = values.bundle;
  if (!bundleDir) {
    // Check if current directory or script parent directory has package/manifest.json
    if (existsSync(join(process.cwd(), 'manifest.json')) && existsSync(join(process.cwd(), 'package'))) {
      bundleDir = process.cwd();
    } else if (existsSync(join(scriptDir, 'manifest.json')) && existsSync(join(scriptDir, 'package'))) {
      bundleDir = scriptDir;
    } else if (existsSync(join(scriptDir, '..', 'manifest.json')) && existsSync(join(scriptDir, '..', 'package'))) {
      bundleDir = join(scriptDir, '..');
    } else {
      console.error('错误: 未找到离线安装包。请通过 --bundle 指定包含 package/ 和 manifest.json 的目录。');
      process.exit(1);
    }
  }
  bundleDir = resolve(bundleDir);

  console.log(`正在从离线包安装: ${bundleDir}`);
  console.log(`目标 Profile: ${profileDir}`);

  const result = await installOfflinePlugin({
    bundleDirectory: bundleDir,
    profileDirectory: profileDir,
    hostStopped: values['host-stopped'],
    force: values.force,
  });

  console.log('\n✔ 离线安装成功！');
  console.log(`  安装位置: ${result.installedPath}`);
  console.log(`  插件版本: v${result.version}`);
  console.log(`  配置备份: ${result.backupPath}`);
  console.log('\n后续操作：');
  console.log('  1. 启动 DeepSeek Harness');
  console.log('  2. 打开任意 Markdown 文件，在右侧文档预览下拉框中选择「网页阅读」');
}

main().catch(err => {
  console.error(`\n✖ 安装失败: ${err.message}`);
  process.exit(1);
});
