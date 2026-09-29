import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

test('built plugin registers a callable title and matching document slot', () => {
  const source = readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8');
  let plugin;
  vm.runInNewContext(source, {
    window: { __ModuleLoader__: { load(value) { plugin = value; } } },
  });
  assert.equal(plugin.id, '@local/markdown-web-preview');
  const module = plugin.factory(name => {
    assert.equal(name, 'react');
    return { createElement() {} };
  });
  const services = {};
  module.apply({
    effect(callback) { callback(); },
    documentPreviews: { register(definition) { services.definition = definition; } },
    slots: {
      inject(name, callback) { assert.equal(name, 'sidebar.right.tab.document'); callback(); },
      register(definition, component) { services.slot = definition; services.component = component; },
    },
  });
  assert.equal(services.definition.id, services.slot.key);
  assert.equal(services.definition.title(), '网页阅读');
  assert.equal(services.definition.loading, 'text-pages');
  assert.equal(services.definition.priority, 'extension');
  assert.deepEqual(Array.from(services.definition.extensions), ['md', 'markdown']);
  assert.equal(typeof services.component, 'function');
});
