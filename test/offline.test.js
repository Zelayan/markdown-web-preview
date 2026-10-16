import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  PLUGIN_NAME,
  hashFile,
  hashDirectory,
  parsePluginManifest,
  assertSelfContainedPackage,
  assertProfileManifest,
  installOfflinePlugin,
} from '../scripts/offline-core.mjs';

function createTempDir(prefix = 'mwp-test-') {
  return mkdtempSync(join(tmpdir(), prefix));
}

test('hashFile and hashDirectory compute correct SHA-256 digests', async () => {
  const dir = createTempDir('mwp-hash-');
  try {
    writeFileSync(join(dir, 'a.txt'), 'hello');
    writeFileSync(join(dir, 'b.txt'), 'world');
    const hashA = await hashFile(join(dir, 'a.txt'));
    // echo -n "hello" | shasum -a 256 -> 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
    assert.equal(hashA, '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824');

    const hashes = await hashDirectory(dir);
    assert.deepEqual(Object.keys(hashes), ['a.txt', 'b.txt']);
    assert.equal(hashes['a.txt'], hashA);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('parsePluginManifest validates format and rejects invalid manifests', () => {
  const valid = {
    format: 1,
    name: '@zelayan/markdown-web-preview',
    version: '0.4.2',
    files: {
      'index.js': '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
    },
  };
  const parsed = parsePluginManifest(valid, 'manifest.json');
  assert.equal(parsed.name, '@zelayan/markdown-web-preview');
  assert.equal(parsed.version, '0.4.2');

  // Invalid format version
  assert.throws(() => parsePluginManifest({ ...valid, format: 2 }, 'm.json'), /格式无效/);
  // Invalid plugin name
  assert.throws(() => parsePluginManifest({ ...valid, name: 'other-pkg' }, 'm.json'), /格式无效/);
  // Invalid hash length
  assert.throws(
    () => parsePluginManifest({ ...valid, files: { 'a.js': 'short-hash' } }, 'm.json'),
    /格式无效/
  );
});

test('assertSelfContainedPackage requires empty dependencies and valid dsh bundle', () => {
  const manifest = { name: PLUGIN_NAME, version: '0.4.2' };
  const validPkg = {
    name: PLUGIN_NAME,
    version: '0.4.2',
    type: 'module',
    dsh: { bundle: { patch: './cordis.patch.yml' } },
    dependencies: {},
  };
  // Valid package passes
  assertSelfContainedPackage(validPkg, manifest, 'package.json');

  // Rejects package with non-empty external dependencies (requires network)
  assert.throws(
    () =>
      assertSelfContainedPackage(
        { ...validPkg, dependencies: { marked: '^15.0.0' } },
        manifest,
        'package.json'
      ),
    /离线插件包必须自包含且无外部运行时依赖/
  );

  // Rejects package without dsh.bundle
  assert.throws(
    () =>
      assertSelfContainedPackage(
        { ...validPkg, dsh: {} },
        manifest,
        'package.json'
      ),
    /离线插件包必须自包含且无外部运行时依赖/
  );
});

test('assertProfileManifest validates target DSH profile structure', () => {
  const validProfile = {
    name: 'my-profile',
    dependencies: {},
    dsh: { profile: { bundles: [] } },
  };
  assertProfileManifest(validProfile, 'profile/package.json');

  // Rejects uninitialized profile
  assert.throws(
    () => assertProfileManifest({ name: 'empty' }, 'profile/package.json'),
    /不是已初始化的 DSH profile/
  );
});

test('installOfflinePlugin installs into a mock DSH profile without network', async () => {
  const bundleDir = createTempDir('mwp-bundle-');
  const profileDir = createTempDir('mwp-profile-');

  try {
    // 1. Setup bundle directory
    const packageDir = join(bundleDir, 'package');
    mkdirSync(join(packageDir, 'lib'), { recursive: true });
    writeFileSync(join(packageDir, 'index.js'), 'export function apply() {}');
    writeFileSync(join(packageDir, 'lib', 'client.js'), 'console.log("mwp");');
    writeFileSync(join(packageDir, 'cordis.patch.yml'), '- insert:\n    - id: mwp\n');
    writeFileSync(join(packageDir, 'README.md'), '# Markdown Web Preview');
    const pkgJson = {
      name: PLUGIN_NAME,
      version: '0.4.2',
      type: 'module',
      dependencies: {},
      dsh: { bundle: { patch: './cordis.patch.yml' } },
    };
    writeFileSync(join(packageDir, 'package.json'), JSON.stringify(pkgJson, null, 2));

    const hashes = await hashDirectory(packageDir);
    const manifest = {
      format: 1,
      name: PLUGIN_NAME,
      version: '0.4.2',
      files: hashes,
    };
    writeFileSync(join(bundleDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

    // 2. Setup mock profile directory
    const initialProfile = {
      name: 'desktop-profile',
      dependencies: {
        'some-other-plugin': '1.0.0',
      },
      dsh: {
        profile: {
          bundles: ['some-other-plugin'],
        },
      },
    };
    writeFileSync(join(profileDir, 'package.json'), JSON.stringify(initialProfile, null, 2));

    // 3. Test: hostStopped=false should reject
    await assert.rejects(
      () =>
        installOfflinePlugin({
          bundleDirectory: bundleDir,
          profileDirectory: profileDir,
          hostStopped: false,
        }),
      /请先完全退出目标 DSH 进程/
    );

    // 4. Test: successful installation
    const result = await installOfflinePlugin({
      bundleDirectory: bundleDir,
      profileDirectory: profileDir,
      hostStopped: true,
    });

    assert.equal(result.version, '0.4.2');
    assert.ok(existsSync(result.installedPath));
    assert.ok(existsSync(result.backupPath));

    // Check installed node_modules content
    const installedClient = readFileSync(join(result.installedPath, 'lib', 'client.js'), 'utf8');
    assert.equal(installedClient, 'console.log("mwp");');

    // Check profile package.json updates
    const updatedProfile = JSON.parse(readFileSync(join(profileDir, 'package.json'), 'utf8'));
    assert.ok(updatedProfile.dsh.profile.bundles.includes(PLUGIN_NAME));
    assert.ok(updatedProfile.dependencies[PLUGIN_NAME].startsWith('file:./offline-packages/'));
    // Ensure existing dependencies preserved
    assert.equal(updatedProfile.dependencies['some-other-plugin'], '1.0.0');

    // 5. Test: re-install without force should reject
    await assert.rejects(
      () =>
        installOfflinePlugin({
          bundleDirectory: bundleDir,
          profileDirectory: profileDir,
          hostStopped: true,
          force: false,
        }),
      /已登记插件/
    );

    // 6. Test: re-install with force should succeed
    const reResult = await installOfflinePlugin({
      bundleDirectory: bundleDir,
      profileDirectory: profileDir,
      hostStopped: true,
      force: true,
    });
    assert.ok(existsSync(reResult.installedPath));
  } finally {
    rmSync(bundleDir, { recursive: true, force: true });
    rmSync(profileDir, { recursive: true, force: true });
  }
});

test('installOfflinePlugin detects file tampering and aborts without mutating profile', async () => {
  const bundleDir = createTempDir('mwp-tamper-bundle-');
  const profileDir = createTempDir('mwp-tamper-profile-');

  try {
    const packageDir = join(bundleDir, 'package');
    mkdirSync(packageDir, { recursive: true });
    writeFileSync(join(packageDir, 'index.js'), 'original code');
    const pkgJson = {
      name: PLUGIN_NAME,
      version: '0.4.2',
      type: 'module',
      dependencies: {},
      dsh: { bundle: { patch: './cordis.patch.yml' } },
    };
    writeFileSync(join(packageDir, 'package.json'), JSON.stringify(pkgJson, null, 2));

    const hashes = await hashDirectory(packageDir);
    const manifest = {
      format: 1,
      name: PLUGIN_NAME,
      version: '0.4.2',
      files: hashes,
    };
    writeFileSync(join(bundleDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

    // Tamper with index.js AFTER manifest was generated
    writeFileSync(join(packageDir, 'index.js'), 'TAMPERED CODE');

    const initialProfile = {
      dsh: { profile: { bundles: [] } },
      dependencies: {},
    };
    const profileJsonPath = join(profileDir, 'package.json');
    writeFileSync(profileJsonPath, JSON.stringify(initialProfile, null, 2));

    await assert.rejects(
      () =>
        installOfflinePlugin({
          bundleDirectory: bundleDir,
          profileDirectory: profileDir,
          hostStopped: true,
        }),
      /离线插件文件校验失败/
    );

    // Profile must NOT have been modified
    const profileContentAfter = JSON.parse(readFileSync(profileJsonPath, 'utf8'));
    assert.deepEqual(profileContentAfter, initialProfile);
  } finally {
    rmSync(bundleDir, { recursive: true, force: true });
    rmSync(profileDir, { recursive: true, force: true });
  }
});
