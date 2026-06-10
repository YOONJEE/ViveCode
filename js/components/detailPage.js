import { SLOTS } from '../utils/mockData.js';
import { formatDate } from '../utils/helpers.js';

export function renderDetailPage(slotId, applied) {
  const slot = SLOTS.find(s => s.id === slotId);
  if (!slot) return '<p style="padding:40px;text-align:center;color:#999">슬롯을 찾을 수 없습니다.</p>';

  const isApplied = applied.has(slotId);
  const isLow = slot.spotsLeft <= 2;
  const reqItems = slot.requirements.map(r => `<li>${r}</li>`).join('');

  return `
    <div class="detail-hero" aria-hidden="true">${slot.categoryEmoji}</div>
    <section class="detail-body">
      <div class="detail-category-row">
        <span class="badge badge-category">${slot.categoryEmoji} ${slot.category}</span>
        ${isLow ? '<span class="badge badge-urgent">마감임박</span>' : ''}
      </div>
      <h1 class="detail-title">${slot.title}</h1>

      <div class="detail-org-card">
        <div class="detail-org-avatar">${slot.orgEmoji}</div>
        <div>
          <p class="detail-org-name">${slot.orgName}</p>
          <p class="detail-org-rating">⭐ ${slot.orgRating} · 후기 ${slot.orgReviewCount}개</p>
        </div>
      </div>

      <div class="detail-info-grid">
        <div class="info-item">
          <p class="info-label">날짜</p>
          <p class="info-value">${formatDate(slot.date)}</p>
        </div>
        <div class="info-item">
          <p class="info-label">시간</p>
          <p class="info-value">${slot.timeStart}~${slot.timeEnd}</p>
        </div>
        <div class="info-item">
          <p class="info-label">장소</p>
          <a class="info-value map-link-detail"
             href="https://map.naver.com/v5/search/${encodeURIComponent(slot.location)}"
             target="_blank" rel="noopener noreferrer">
            📍 ${slot.location}
          </a>
        </div>
        <div class="info-item">
          <p class="info-label">봉사 시간</p>
          <p class="info-value">${slot.hours}시간</p>
        </div>
      </div>

      <div class="detail-section">
        <h2 class="detail-section-title">활동 소개</h2>
        <p class="detail-desc">${slot.description}</p>
      </div>

      <div class="detail-section">
        <h2 class="detail-section-title">참가 조건</h2>
        <ul class="req-list">${reqItems}</ul>
      </div>

      <div class="detail-section">
        <h2 class="detail-section-title">모집 현황</h2>
        <p class="spots-text-large">잔여 <strong>${slot.spotsLeft}</strong>명 / 총 ${slot.spotsTotal}명</p>
      </div>

      <div class="detail-spacer"></div>
    </section>
    <div class="detail-cta">
      <button class="btn-cta ${isApplied ? 'applied' : ''}"
              data-action="open-modal" data-id="${slotId}"
              ${isApplied ? 'disabled' : ''}>
        ${isApplied ? '✓ 신청 완료되었어요' : '지금 바로 신청하기'}
      </button>
    </div>
  `;
}
