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

export const COLOR_KEY = 'markdown-web-preview:accent-color';
export const ACCENT_COLORS = [
  { id: 'purple', name: '紫色', hex: '#7c3aed', darkHex: '#a78bfa' },
  { id: 'blue', name: '经典蓝', hex: '#2563eb', darkHex: '#60a5fa' },
  { id: 'emerald', name: '翡翠绿', hex: '#059669', darkHex: '#34d399' },
  { id: 'amber', name: '琥珀橙', hex: '#d97706', darkHex: '#fbbf24' },
  { id: 'rose', name: '玫瑰红', hex: '#e11d48', darkHex: '#fb7185' },
  { id: 'slate', name: '极客灰', hex: '#475569', darkHex: '#94a3b8' },
];

export function loadAccentColor(storage) {
  try {
    const val = storage?.getItem(COLOR_KEY);
    return ACCENT_COLORS.some(c => c.id === val) ? val : 'purple';
  } catch { return 'purple'; }
}

export function saveAccentColor(storage, colorId) {
  try { storage?.setItem(COLOR_KEY, colorId); } catch { /* private mode */ }
}
