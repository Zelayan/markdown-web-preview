const MIN_COLUMN = 48;
const MAX_TABLE = 6000;

// Widths are CSS pixels in the prose coordinate system, not screen pixels.
export function installTableResize(root, saved = new Map()) {
  const document = root.ownerDocument;
  const window = document.defaultView;
  const cleanups = [];
  let stopDrag = null;
  root.querySelectorAll('.mwp-table-wrap table').forEach((table, index) => {
    const row = table.rows[0];
    if (!row || [...row.cells].some(cell => cell.colSpan !== 1)) return;
    const cells = [...row.cells];
    const positions = cells.map(cell => cell.style.position);
    const key = `${index}:${cells.map(cell => cell.textContent).join('|')}`;
    let widths = saved.get(key)?.slice();
    const originalWidth = table.style.width;
    const originalLayout = table.style.tableLayout;
    const group = document.createElement('colgroup');
    const columns = cells.map(() => document.createElement('col'));
    group.append(...columns);
    table.prepend(group);
    function measure() {
      const scale = table.getBoundingClientRect().width / (table.offsetWidth || table.getBoundingClientRect().width || 1);
      return cells.map(cell => Math.max(MIN_COLUMN, cell.getBoundingClientRect().width / scale || 120));
    }
    function apply() {
      table.style.tableLayout = 'fixed';
      table.style.width = `${widths.reduce((a, b) => a + b, 0)}px`;
      columns.forEach((col, i) => { col.style.width = `${widths[i]}px`; });
      saved.set(key, widths.slice());
    }
    function reset() {
      stopDrag?.(); widths = null; saved.delete(key);
      table.style.width = originalWidth; table.style.tableLayout = originalLayout;
      columns.forEach(col => { col.style.width = ''; });
    }
    if (widths?.length === cells.length) apply();
    else widths = null;
    const handles = cells.map((cell, column) => ({ cell, column, whole: false }));
    handles.push({ cell: cells.at(-1), column: cells.length - 1, whole: true });
    handles.forEach(({ cell, column, whole }) => {
      const handle = document.createElement('button');
      handle.type = 'button';
      handle.className = `mwp-table-resize${whole ? ' is-table-edge' : ''}`;
      handle.setAttribute('aria-label', whole ? '调整表格宽度' : `调整第 ${column + 1} 列宽度`);
      handle.title = `${whole ? '拖动调整整表宽度' : '拖动调整列宽'}；方向键微调；双击恢复自动宽度`;
      cell.style.position = 'relative'; cell.append(handle);
      function change(delta, start) {
        if (whole) {
          const total = start.reduce((a, b) => a + b, 0);
          const minimum = Math.max(...start.map(width => MIN_COLUMN / width)) * total;
          const target = Math.max(minimum, Math.min(MAX_TABLE, total + delta));
          widths = start.map(width => width * target / total);
        } else {
          widths = start.slice();
          const others = start.reduce((a, b) => a + b, 0) - start[column];
          widths[column] = Math.max(MIN_COLUMN, Math.min(MAX_TABLE - others, start[column] + delta));
        }
        apply();
      }
      function down(event) {
        if (event.button !== 0) return;
        event.preventDefault(); event.stopPropagation(); stopDrag?.();
        const start = widths?.slice() || measure();
        const x = event.clientX;
        const scale = table.getBoundingClientRect().width / (table.offsetWidth || 1) || 1;
        const move = e => { if (e.pointerId === event.pointerId) change((e.clientX - x) / scale, start); };
        const previousCursor = document.body.style.cursor;
        const previousSelection = document.body.style.userSelect;
        document.body.style.cursor = 'col-resize'; document.body.style.userSelect = 'none';
        const stop = () => {
          window.removeEventListener('pointermove', move);
          window.removeEventListener('pointerup', stop);
          window.removeEventListener('pointercancel', stop);
          window.removeEventListener('blur', stop);
          document.body.style.cursor = previousCursor; document.body.style.userSelect = previousSelection;
          stopDrag = null;
        };
        stopDrag = stop;
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', stop);
        window.addEventListener('pointercancel', stop);
        window.addEventListener('blur', stop);
      }
      const keyboard = event => {
        if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
          event.preventDefault(); event.stopPropagation();
          change((event.key === 'ArrowLeft' ? -1 : 1) * (event.shiftKey ? 24 : 8), widths?.slice() || measure());
        } else if (event.key === 'Home') { event.preventDefault(); reset(); }
      };
      const doubleClick = event => { event.preventDefault(); event.stopPropagation(); reset(); };
      handle.addEventListener('pointerdown', down);
      handle.addEventListener('keydown', keyboard);
      handle.addEventListener('dblclick', doubleClick);
      cleanups.push(() => { handle.remove(); });
    });
    cleanups.push(() => { cells.forEach((cell, i) => { cell.style.position = positions[i]; }); group.remove(); table.style.width = originalWidth; table.style.tableLayout = originalLayout; });
  });
  return () => { stopDrag?.(); cleanups.forEach(cleanup => cleanup()); };
}
