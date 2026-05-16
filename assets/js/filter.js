/**
 * filter.js - Universal Filter Engine
 * Dùng chung cho tất cả trang danh sách trong hệ thống
 */

const FilterEngine = {
    /**
     * Khởi tạo bộ lọc cho một trang
     * @param {Object} cfg
     * @param {string} cfg.tableBodyId   - id của <tbody>
     * @param {string} [cfg.searchId]    - id của input tìm kiếm
     * @param {string} [cfg.statusId]    - id của select trạng thái
     * @param {string} [cfg.dateFromId]  - id của input date từ
     * @param {string} [cfg.dateToId]    - id của input date đến
     * @param {string} [cfg.counterId]   - id của element hiển thị số kết quả
     * @param {string} [cfg.resetId]     - id của nút reset
     * @param {Function} [cfg.getStatus] - fn(row) => string trạng thái của row
     * @param {Function} [cfg.getDate]   - fn(row) => Date object của row
     * @param {number[]} [cfg.searchCols]- index các cột cần search (mặc định tất cả)
     */
    init(cfg) {
        this._cfg = cfg;
        this._allRows = null;

        const run = this._debounce(() => this._apply(), 180);

        const search = cfg.searchId && document.getElementById(cfg.searchId);
        const status = cfg.statusId && document.getElementById(cfg.statusId);
        const dateFrom = cfg.dateFromId && document.getElementById(cfg.dateFromId);
        const dateTo = cfg.dateToId && document.getElementById(cfg.dateToId);
        const reset = cfg.resetId && document.getElementById(cfg.resetId);

        if (search) search.addEventListener('input', run);
        if (status) status.addEventListener('change', run);
        if (dateFrom) dateFrom.addEventListener('change', run);
        if (dateTo) dateTo.addEventListener('change', run);
        if (reset) reset.addEventListener('click', () => this._reset());

        // Chạy lần đầu để set counter
        this._apply();
    },

    _getRows() {
        const tbody = document.getElementById(this._cfg.tableBodyId);
        if (!tbody) return [];
        if (!this._allRows) {
            this._allRows = Array.from(tbody.querySelectorAll('tr'));
        }
        return this._allRows;
    },

    _apply() {
        const cfg = this._cfg;
        const rows = this._getRows();
        if (!rows.length) return;

        const searchEl = cfg.searchId && document.getElementById(cfg.searchId);
        const statusEl = cfg.statusId && document.getElementById(cfg.statusId);
        const dateFromEl = cfg.dateFromId && document.getElementById(cfg.dateFromId);
        const dateToEl = cfg.dateToId && document.getElementById(cfg.dateToId);

        const keyword = searchEl ? searchEl.value.trim().toLowerCase() : '';
        const statusVal = statusEl ? statusEl.value : '';
        const dateFrom = dateFromEl && dateFromEl.value ? new Date(dateFromEl.value + 'T00:00:00') : null;
        const dateTo = dateToEl && dateToEl.value ? new Date(dateToEl.value + 'T23:59:59') : null;

        let visible = 0;

        rows.forEach(row => {
            let show = true;

            // --- Search ---
            if (keyword) {
                const cols = cfg.searchCols
                    ? cfg.searchCols.map(i => row.cells[i])
                    : Array.from(row.cells);
                const text = cols.map(c => c ? c.textContent : '').join(' ').toLowerCase();
                show = text.includes(keyword);
            }

            // --- Status filter ---
            if (show && statusVal && statusVal !== 'Tất cả trạng thái' && statusVal !== 'Tất cả danh mục' && statusVal !== 'Tất cả') {
                if (cfg.getStatus) {
                    show = cfg.getStatus(row).toLowerCase().includes(statusVal.toLowerCase());
                } else {
                    // Auto-detect: tìm cell có badge/span trạng thái
                    const statusCell = row.querySelector('[data-status], .badge-status, td:last-child span, td span[class*="rounded-full"]');
                    show = statusCell ? statusCell.textContent.trim().toLowerCase().includes(statusVal.toLowerCase()) : true;
                }
            }

            // --- Date range filter ---
            if (show && (dateFrom || dateTo)) {
                let rowDate = null;
                if (cfg.getDate) {
                    rowDate = cfg.getDate(row);
                } else {
                    // Auto-detect: tìm cell thứ 2 (thường là ngày)
                    const dateCell = row.cells[cfg.dateCol !== undefined ? cfg.dateCol : 1];
                    if (dateCell) rowDate = this._parseDate(dateCell.textContent.trim());
                }
                if (rowDate) {
                    if (dateFrom && rowDate < dateFrom) show = false;
                    if (dateTo && rowDate > dateTo) show = false;
                } else {
                    // Không parse được ngày → không lọc theo ngày
                }
            }

            row.style.display = show ? '' : 'none';
            if (show) visible++;
        });

        // Highlight search keyword
        if (keyword) {
            this._highlight(rows, keyword);
        } else {
            this._clearHighlight(rows);
        }

        // Update counter
        this._updateCounter(visible, rows.length);

        // Empty state
        this._toggleEmpty(visible === 0);
    },

    _reset() {
        const cfg = this._cfg;
        ['searchId', 'statusId', 'dateFromId', 'dateToId'].forEach(key => {
            if (!cfg[key]) return;
            const el = document.getElementById(cfg[key]);
            if (!el) return;
            if (el.tagName === 'SELECT') el.selectedIndex = 0;
            else el.value = '';
        });
        this._apply();
    },

    _updateCounter(visible, total) {
        const cfg = this._cfg;
        if (!cfg.counterId) return;
        const el = document.getElementById(cfg.counterId);
        if (!el) return;
        if (visible === total) {
            el.textContent = `Hiển thị ${total} kết quả`;
        } else {
            el.innerHTML = `Tìm thấy <strong class="text-blue-600">${visible}</strong> / ${total} kết quả`;
        }
    },

    _toggleEmpty(isEmpty) {
        const cfg = this._cfg;
        const tbody = document.getElementById(cfg.tableBodyId);
        if (!tbody) return;
        let emptyRow = tbody.querySelector('.filter-empty-row');
        if (isEmpty) {
            if (!emptyRow) {
                const cols = this._getRows()[0]?.cells.length || 6;
                emptyRow = document.createElement('tr');
                emptyRow.className = 'filter-empty-row';
                emptyRow.innerHTML = `<td colspan="${cols}" class="py-12 text-center text-slate-400">
                    <i class="fas fa-search text-3xl mb-3 block opacity-30"></i>
                    <p class="text-sm font-medium">Không tìm thấy kết quả phù hợp</p>
                    <p class="text-xs mt-1">Thử thay đổi từ khóa hoặc bộ lọc</p>
                </td>`;
                tbody.appendChild(emptyRow);
            }
            emptyRow.style.display = '';
        } else if (emptyRow) {
            emptyRow.style.display = 'none';
        }
    },

    _highlight(rows, keyword) {
        rows.forEach(row => {
            if (row.style.display === 'none') return;
            Array.from(row.cells).forEach(cell => {
                // Chỉ highlight text node trực tiếp, không đụng vào icon/badge
                const walker = document.createTreeWalker(cell, NodeFilter.SHOW_TEXT);
                const nodes = [];
                let node;
                while ((node = walker.nextNode())) nodes.push(node);
                nodes.forEach(n => {
                    if (!n.parentElement.closest('button, i, input')) {
                        const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                        const html = n.textContent.replace(
                            new RegExp(`(${escaped})`, 'gi'),
                            '<mark class="bg-yellow-200 text-yellow-900 rounded px-0.5">$1</mark>'
                        );
                        if (html !== n.textContent) {
                            const span = document.createElement('span');
                            span.innerHTML = html;
                            n.parentNode.replaceChild(span, n);
                        }
                    }
                });
            });
        });
    },

    _clearHighlight(rows) {
        rows.forEach(row => {
            row.querySelectorAll('mark').forEach(mark => {
                mark.replaceWith(document.createTextNode(mark.textContent));
            });
            // Unwrap highlight spans
            row.querySelectorAll('span').forEach(span => {
                if (span.querySelector('mark') === null && span.parentElement && !span.className) {
                    span.replaceWith(document.createTextNode(span.textContent));
                }
            });
        });
    },

    /**
     * Parse ngày từ string DD/MM/YYYY hoặc DD/MM/YYYY HH:mm
     */
    _parseDate(str) {
        if (!str) return null;
        const m = str.match(/(\d{2})\/(\d{2})\/(\d{4})/);
        if (!m) return null;
        return new Date(`${m[3]}-${m[2]}-${m[1]}T00:00:00`);
    },

    _debounce(fn, delay) {
        let t;
        return function (...args) {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(this, args), delay);
        };
    }
};

window.FilterEngine = FilterEngine;
