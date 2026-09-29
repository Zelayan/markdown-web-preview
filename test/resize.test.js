import test from 'node:test';
import assert from 'node:assert/strict';
import { clampTocWidth, DEFAULT_TOC_WIDTH, loadTocWidth, saveTocWidth, TOC_WIDTH_KEY } from '../src/resize.js';

test('dragged table of contents remains usable and leaves room for document', () => {
  assert.equal(clampTocWidth(-1000, 900), 140);
  assert.equal(clampTocWidth(9999, 900), 420);
  assert.equal(clampTocWidth(400, 500), 320);
  assert.equal(clampTocWidth(270.7, 900), 271);
});

test('remembers a valid width while tolerating disabled storage', () => {
  const entries = new Map();
  const storage = { getItem: key => entries.get(key), setItem: (key, value) => entries.set(key, value) };
  assert.equal(loadTocWidth(storage), DEFAULT_TOC_WIDTH);
  saveTocWidth(storage, 280);
  assert.equal(entries.get(TOC_WIDTH_KEY), '280');
  assert.equal(loadTocWidth(storage), 280);
  entries.set(TOC_WIDTH_KEY, '-1');
  assert.equal(loadTocWidth(storage), DEFAULT_TOC_WIDTH);
  assert.equal(loadTocWidth({ getItem() { throw Error('blocked'); } }), DEFAULT_TOC_WIDTH);
});
