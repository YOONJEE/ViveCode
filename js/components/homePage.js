import { SLOTS } from '../utils/mockData.js';
import { filterSlots, countTodaySlots } from '../utils/helpers.js';
import { renderSlotCard } from './slotCard.js';
import { renderFilterBar } from './filterBar.js';

export function renderHomePage(state) {
  const filtered = filterSlots(SLOTS, {
    category: state.categoryFilter,
    dateRange: state.dateFilter,
  });
  const todayCount = countTodaySlots(SLOTS);

  const cardList = filtered.length > 0
    ? filtered.map(slot => renderSlotCard(slot, state.applied.has(slot.id))).join('')
    : `<div class="empty-state">
         <div class="empty-state-icon">🔍</div>
         <p>해당 조건의 봉사 슬롯이 없어요.<br>다른 카테고리나 날짜를 확인해 보세요.</p>
       </div>`;

  return `
    <section class="home-hero">
      <p class="hero-greeting">안녕하세요! 오늘도 따뜻한 하루를 만들어봐요.</p>
      <h2 class="hero-title">지금 바로 시작할 수 있는<br>봉사 활동이 있어요 🌿</h2>
      <div class="hero-badge">
        <span class="hero-dot"></span>
        오늘 열린 슬롯 ${todayCount}개
      </div>
    </section>
    ${renderFilterBar(state.categoryFilter, state.dateFilter)}
    <section aria-label="봉사 목록">
      <div class="slot-list-header">
        <p class="slot-count"><span>${filtered.length}</span>개의 봉사 활동</p>
      </div>
      <div class="slot-list" id="slot-list">
        ${cardList}
      </div>
    </section>
  `;
}
