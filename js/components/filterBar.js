import { CATEGORIES } from '../utils/mockData.js';

const DATE_TABS = [
  { value: 'today', label: '오늘' },
  { value: 'week',  label: '이번 주' },
  { value: 'all',   label: '전체' },
];

export function renderFilterBar(categoryFilter, dateFilter) {
  const chips = CATEGORIES.map(cat => `
    <button class="chip ${cat === categoryFilter ? 'active' : ''}"
            data-action="filter-cat" data-value="${cat}">
      ${cat}
    </button>
  `).join('');

  const tabs = DATE_TABS.map(tab => `
    <button class="date-tab ${tab.value === dateFilter ? 'active' : ''}"
            data-action="filter-date" data-value="${tab.value}"
            role="tab" aria-selected="${tab.value === dateFilter}">
      ${tab.label}
    </button>
  `).join('');

  return `
    <div class="filter-section" id="filter-bar">
      <div class="category-filter" role="list" aria-label="카테고리 필터">
        ${chips}
      </div>
      <div class="date-filter" role="tablist" aria-label="날짜 필터">
        ${tabs}
      </div>
    </div>
  `;
}
