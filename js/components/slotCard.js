import { formatDate } from '../utils/helpers.js';

export function renderSlotCard(slot, isApplied) {
  const spotsPercent = Math.round((slot.spotsLeft / slot.spotsTotal) * 100);
  const isLow = slot.spotsLeft <= 2;
  const itemChips = (slot.items || []).map(i => `<span class="item-chip">🎒 ${i}</span>`).join('');

  return `
    <article class="slot-card" data-id="${slot.id}" role="button" tabindex="0" aria-label="${slot.title} 상세보기">
      <div class="card-top">
        <div class="card-org">
          <div class="org-avatar">${slot.orgEmoji}</div>
          <div>
            <p class="org-name">${slot.orgName}</p>
            <p class="org-rating">⭐ <span>${slot.orgRating}</span> (${slot.orgReviewCount})</p>
          </div>
        </div>
        <div class="card-badges">
          ${isLow ? '<span class="badge badge-urgent">마감임박</span>' : ''}
          <span class="badge badge-category">${slot.categoryEmoji} ${slot.category}</span>
        </div>
      </div>

      <h3 class="card-title">${slot.title}</h3>
      <p class="card-desc">${slot.shortDesc || ''}</p>

      ${itemChips ? `<div class="card-items">${itemChips}</div>` : ''}

      <div class="card-meta">
        <span class="meta-item">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          ${formatDate(slot.date)} ${slot.timeStart}~${slot.timeEnd}
        </span>
        <span class="meta-item">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          ${slot.location}
        </span>
      </div>

      <div class="card-bottom">
        <div class="spots-info">
          <div class="spots-bar">
            <div class="spots-fill ${isLow ? 'low' : ''}" style="width:${spotsPercent}%"></div>
          </div>
          <span class="spots-text ${isLow ? 'low' : ''}">잔여 ${slot.spotsLeft}/${slot.spotsTotal}</span>
        </div>
        <button class="btn-apply ${isApplied ? 'applied' : ''}"
                data-action="apply" data-id="${slot.id}"
                ${isApplied ? 'disabled' : ''}>
          ${isApplied ? '✓ 신청완료' : '신청하기'}
        </button>
      </div>
    </article>
  `;
}
