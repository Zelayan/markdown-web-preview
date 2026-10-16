/**
 * @file Offline packaging and installation core for DeepSeek Harness plugins
 * @description Provides hash verification, manifest creation, and zero-pnpm offline installation
 * into DeepSeek Harness profiles.
 */

import { createHash, randomUUID } from 'node:crypto';
import { constants } from 'node:fs';
import {
  copyFile,
  lstat,
  mkdir,
  readFile,
  readdir,
  realpath,
  rename,
  rm,
  writeFile,
} from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

/** Expected package name */
export const PLUGIN_NAME = '@local/markdown-web-preview';

/**
 * Validates whether an unknown value is a plain non-null object.
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
export function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Calculates SHA-256 hash of a file.
 * @param {string} filePath
 * @returns {Promise<string>} Hex digest
 */
export async function hashFile(filePath) {
  const content = await readFile(filePath);
  return createHash('sha256').update(content).digest('hex');
}

/**
 * Recursively lists all plain files in a directory, rejecting symlinks and special files.
 * @param {string} directory - Root directory
 * @param {string} [prefix=''] - Relative path prefix
 * @returns {Promise<string[]>} Sorted relative POSIX file paths
 */
export async function listPlainFiles(directory, prefix = '') {
  const files = [];
  const entries = await readdir(join(directory, prefix), { withFileTypes: true });
  for (const entry of entries) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      files.push(...await listPlainFiles(directory, relative));
    } else if (entry.isFile()) {
      files.push(relative);
    } else {
      throw new Error(`离线插件包不接受符号链接或特殊文件：${join(directory, relative)}`);
    }
  }
  return files.sort();
}

/**
 * Hashes all files in a directory.
 * @param {string} directory
 * @returns {Promise<Record<string, string>>}
 */
export async function hashDirectory(directory) {
  const fileList = await listPlainFiles(directory);
  const hashes = {};
  for (const file of fileList) {
    hashes[file] = await hashFile(join(directory, file));
  }
  return hashes;
}

/**
 * Validates and parses the offline plugin manifest.
 * @param {unknown} value
 * @param {string} path
 * @returns {{ format: number, name: string, version: string, files: Record<string, string> }}
 */
export function parsePluginManifest(value, path) {
  if (
    !isRecord(value) ||
    value.format !== 1 ||
    value.name !== PLUGIN_NAME ||
    typeof value.version !== 'string' ||
    !/^\d+\.\d+\.\d+(?:-[\w.-]+)?$/.test(value.version) ||
    !isRecord(value.files) ||
    !Object.values(value.files).every(h => typeof h === 'string' && /^[a-f0-9]{64}$/.test(h))
  ) {
    throw new Error(`离线插件清单格式无效：${path}`);
  }
  const files = {};
  for (const [k, v] of Object.entries(value.files)) {
    if (typeof v === 'string') files[k] = v;
  }
  return { format: 1, name: value.name, version: value.version, files };
}

/**
 * Validates that the package is self-contained and declares no runtime dependencies.
 * @param {unknown} value - Parsed package.json
 * @param {{ name: string, version: string }} manifest - Validated manifest
 * @param {string} path - package.json path
 */
export function assertSelfContainedPackage(value, manifest, path) {
  if (
    !isRecord(value) ||
    value.name !== manifest.name ||
    value.version !== manifest.version ||
    value.type !== 'module' ||
    (value.dependencies !== undefined &&
      (!isRecord(value.dependencies) || Object.keys(value.dependencies).length > 0)) ||
    !isRecord(value.dsh) ||
    !isRecord(value.dsh.bundle) ||
    typeof value.dsh.bundle.patch !== 'string' ||
    value.dsh.bundle.patch.length === 0
  ) {
    throw new Error(`离线插件包必须自包含且无外部运行时依赖：${path}`);
  }
}

/**
 * Validates the DSH profile manifest structure.
 * @param {unknown} value
 * @param {string} path
 */
export function assertProfileManifest(value, path) {
  if (
    !isRecord(value) ||
    !isRecord(value.dsh) ||
    !isRecord(value.dsh.profile) ||
    !Array.isArray(value.dsh.profile.bundles) ||
    !value.dsh.profile.bundles.every(b => typeof b === 'string') ||
    (value.dependencies !== undefined &&
      (!isRecord(value.dependencies) ||
        !Object.values(value.dependencies).every(d => typeof d === 'string')))
  ) {
    throw new Error(`目标不是已初始化的 DSH profile：${path}；请先启动一次目标 DSH 宿主。`);
  }
}

/**
 * Asserts that none of the path ancestors or the directory itself is a symlink.
 * @param {string} path
 */
export async function assertPlainDirectory(path) {
  const parent = dirname(path);
  if (parent !== path) await assertPlainDirectory(parent);
  try {
    const info = await lstat(path);
    if (!info.isDirectory() || info.isSymbolicLink()) {
      throw new Error(`目标必须是普通目录，不可为符号链接：${path}`);
    }
  } catch (err) {
    if (!isRecord(err) || err.code !== 'ENOENT') throw err;
  }
}

/**
 * Copies a list of files from source to target directory.
 * @param {string} source
 * @param {string} target
 * @param {string[]} files
 */
export async function copyFiles(source, target, files) {
  await mkdir(target, { recursive: true });
  for (const file of files) {
    const dest = join(target, file);
    await mkdir(dirname(dest), { recursive: true });
    await copyFile(join(source, file), dest, constants.COPYFILE_EXCL);
  }
}

/**
 * Performs a zero-pnpm, completely offline installation of the plugin into a DSH profile.
 * @param {object} options
 * @param {string} options.bundleDirectory - Directory containing package/ and manifest.json
 * @param {string} options.profileDirectory - Path to the DSH profile directory
 * @param {boolean} options.hostStopped - Flag confirming target DSH host is completely stopped
 * @param {boolean} [options.force=false] - Reinstall or update if already present
 * @returns {Promise<{ installedPath: string, backupPath: string, version: string }>}
 */
export async function installOfflinePlugin({
  bundleDirectory,
  profileDirectory,
  hostStopped,
  force = false,
}) {
  if (!hostStopped) {
    throw new Error('安装前请先完全退出目标 DSH 进程，并传入 --host-stopped 确认。');
  }

  // 1. Resolve and validate paths
  const source = await realpath(join(bundleDirectory, 'package'));
  const profile = await realpath(resolve(profileDirectory));
  await assertPlainDirectory(profile);

  const manifestPath = join(bundleDirectory, 'manifest.json');
  const manifestRaw = await readFile(manifestPath, 'utf8');
  const manifest = parsePluginManifest(JSON.parse(manifestRaw), manifestPath);

  // Check file hashes against manifest
  const hashes = await hashDirectory(source);
  const actualEntries = JSON.stringify(Object.entries(hashes).sort());
  const expectedEntries = JSON.stringify(Object.entries(manifest.files).sort());
  if (actualEntries !== expectedEntries) {
    throw new Error(`离线插件文件校验失败：文件列表或 SHA-256 摘要与 manifest.json 不一致 (${source})`);
  }

  const pkgJsonPath = join(source, 'package.json');
  const pkgJson = JSON.parse(await readFile(pkgJsonPath, 'utf8'));
  assertSelfContainedPackage(pkgJson, manifest, pkgJsonPath);

  // 2. Lock profile
  const lockDir = join(profile, '.mwp-offline-install.lock');
  try {
    await mkdir(lockDir);
  } catch (err) {
    if (isRecord(err) && err.code === 'EEXIST') {
      throw new Error(`检测到已存在的安装锁：${lockDir}；请确认无其他安装进程正在运行。`);
    }
    throw err;
  }

  const id = randomUUID();
  const nodeModules = join(profile, 'node_modules');
  const sources = join(profile, 'offline-packages');
  // Handle scoped package name e.g. @local/markdown-web-preview
  const target = join(nodeModules, manifest.name);
  const safePkgFolder = manifest.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const sourceFolderName = `${safePkgFolder}-${manifest.version}-${id}`;
  const stableSource = join(sources, sourceFolderName);
  const staging = join(nodeModules, `.mwp-staging-${id}`);
  const tempManifest = join(profile, `.package-${id}.json`);
  const backupPath = join(profile, `package.json.offline-backup-${id}`);

  let isPublished = false;
  let isCommitted = false;

  try {
    const profileManifestPath = join(profile, 'package.json');
    const profileInfo = await lstat(profileManifestPath);
    if (!profileInfo.isFile() || profileInfo.isSymbolicLink()) {
      throw new Error(`profile package.json 必须是普通文件：${profileManifestPath}`);
    }

    const beforeContent = await readFile(profileManifestPath, 'utf8');
    const currentProfile = JSON.parse(beforeContent);
    assertProfileManifest(currentProfile, profileManifestPath);

    const isAlreadyInstalled =
      Boolean(currentProfile.dependencies?.[manifest.name]) ||
      currentProfile.dsh.profile.bundles.includes(manifest.name);

    if (isAlreadyInstalled && !force) {
      throw new Error(
        `此 profile (${profile}) 已登记插件 ${manifest.name}。如需覆盖或重新安装，请添加 --force 参数。`
      );
    }

    await assertPlainDirectory(nodeModules);
    await assertPlainDirectory(sources);
    await mkdir(nodeModules, { recursive: true });
    await mkdir(sources, { recursive: true });

    // Copy to stable source in offline-packages
    const files = Object.keys(hashes);
    await copyFiles(source, stableSource, files);
    // Copy to staging area in node_modules
    await copyFiles(stableSource, staging, files);

    // Verify staging integrity before publishing
    const stagingHashes = await hashDirectory(staging);
    if (JSON.stringify(Object.entries(stagingHashes).sort()) !== actualEntries) {
      throw new Error(`暂存区文件校验失败：${staging}`);
    }

    // Update profile manifest structure
    const updatedProfile = { ...currentProfile };
    updatedProfile.dependencies = {
      ...updatedProfile.dependencies,
      [manifest.name]: `file:./offline-packages/${sourceFolderName}`,
    };
    if (!updatedProfile.dsh.profile.bundles.includes(manifest.name)) {
      updatedProfile.dsh.profile.bundles = [...updatedProfile.dsh.profile.bundles, manifest.name];
    }

    await writeFile(tempManifest, `${JSON.stringify(updatedProfile, null, 2)}\n`, {
      flag: 'wx',
      mode: 0o600,
    });

    // Verify profile wasn't modified concurrently
    if ((await readFile(profileManifestPath, 'utf8')) !== beforeContent) {
      throw new Error(`安装期间 profile package.json 被外部进程修改，已中止本次安装。`);
    }

    // Write backup
    await writeFile(backupPath, beforeContent, { flag: 'wx', mode: 0o600 });

    // If target exists and force is true, remove existing directory
    try {
      await rm(target, { recursive: true, force: true });
    } catch {
      // ignore
    }

    await mkdir(dirname(target), { recursive: true });
    await rename(staging, target);
    isPublished = true;

    await rename(tempManifest, profileManifestPath);
    isCommitted = true;

    return {
      installedPath: target,
      backupPath,
      version: manifest.version,
    };
  } finally {
    await rm(tempManifest, { force: true });
    await rm(staging, { recursive: true, force: true });
    if (!isCommitted) {
      if (isPublished) await rm(target, { recursive: true, force: true });
      await rm(stableSource, { recursive: true, force: true });
    }
    await rm(lockDir, { recursive: true, force: true });
  }
}
