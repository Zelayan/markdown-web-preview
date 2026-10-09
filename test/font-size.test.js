import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTheme, loadAccentColor, DEFAULT_FONT_SIZE, FONT_SIZE_KEY, loadFontSize, saveFontSize } from '../src/resize.js';
test('new readers default to blue, light and 14px without overwriting preferences', () => {
  assert.equal(loadTheme(null), 'light');
  assert.equal(loadAccentColor(null), 'blue');
  assert.equal(loadFontSize(null), 14);
  const disabled = { getItem() { throw new Error('disabled'); } };
  assert.equal(loadTheme(disabled), 'light');
  assert.equal(loadAccentColor(disabled), 'blue');
  assert.equal(loadTheme({ getItem: () => 'dark' }), 'dark');
  assert.equal(loadAccentColor({ getItem: () => 'rose' }), 'rose');
});

test('font size preferences persist and reject invalid or unavailable storage', () => {
  const values = new Map();
  const storage = { getItem: key => values.get(key), setItem: (key, value) => values.set(key, value) };
  assert.equal(loadFontSize(storage), DEFAULT_FONT_SIZE);
  saveFontSize(storage, 18); assert.equal(loadFontSize(storage), 18);
  for (const value of ['0', '99', 'bad', '']) {
    values.set(FONT_SIZE_KEY, value); assert.equal(loadFontSize(storage), DEFAULT_FONT_SIZE);
  }
  assert.equal(loadFontSize({ getItem() { throw new Error('disabled'); } }), DEFAULT_FONT_SIZE);
  assert.doesNotThrow(() => saveFontSize(null, 16));
});
