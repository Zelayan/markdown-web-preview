export const DEFAULT_TOC_WIDTH = 211;
export const MIN_TOC_WIDTH = 140;
export const MAX_TOC_WIDTH = 420;
export const TOC_WIDTH_KEY = 'markdown-web-preview:toc-width';

export function clampTocWidth(width, availableWidth) {
  const maximum = Math.min(MAX_TOC_WIDTH, Math.max(MIN_TOC_WIDTH, availableWidth - 180));
  return Math.round(Math.max(MIN_TOC_WIDTH, Math.min(maximum, width)));
}

export function loadTocWidth(storage) {
  try {
    const value = Number(storage?.getItem(TOC_WIDTH_KEY));
    return Number.isFinite(value) && value >= MIN_TOC_WIDTH && value <= MAX_TOC_WIDTH ? value : DEFAULT_TOC_WIDTH;
  } catch { return DEFAULT_TOC_WIDTH; }
}

export function saveTocWidth(storage, width) {
  try { storage?.setItem(TOC_WIDTH_KEY, String(width)); } catch { /* private mode / disabled storage */ }
}
