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

export const THEME_KEY = 'markdown-web-preview:theme';
export const WIDE_KEY = 'markdown-web-preview:wide';

export function loadTheme(storage) {
  try {
    const val = storage?.getItem(THEME_KEY);
    return ['light', 'dark', 'auto'].includes(val) ? val : 'auto';
  } catch { return 'auto'; }
}

export function saveTheme(storage, theme) {
  try { storage?.setItem(THEME_KEY, theme); } catch { /* private mode */ }
}

export function loadWide(storage) {
  try {
    return storage?.getItem(WIDE_KEY) === 'true';
  } catch { return false; }
}

export function saveWide(storage, wide) {
  try { storage?.setItem(WIDE_KEY, String(wide)); } catch { /* private mode */ }
}

export const DENSITY_KEY = 'markdown-web-preview:density';

export function loadDensity(storage) {
  try {
    const val = storage?.getItem(DENSITY_KEY);
    return ['compact', 'normal'].includes(val) ? val : 'compact';
  } catch { return 'compact'; }
}

export function saveDensity(storage, density) {
  try { storage?.setItem(DENSITY_KEY, density); } catch { /* private mode */ }
}


