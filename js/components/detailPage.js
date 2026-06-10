import { SLOTS } from '../utils/mockData.js';
import { formatDate } from '../utils/helpers.js';
import { REVIEWS } from '../utils/reviewData.js';

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

      ${renderReviews(slotId)}

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

function renderReviews(slotId) {
  const list = REVIEWS[slotId];
  if (!list || list.length === 0) return '';

  const avg = (list.reduce((s, r) => s + r.rating, 0) / list.length).toFixed(1);

  const cards = list.map(r => {
    const stars = Array.from({ length: 5 }, (_, i) =>
      `<span class="${i < r.rating ? 'star-on' : 'star-off'}">★</span>`
    ).join('');

    const photos = r.photos ? `
      <div class="review-photos">
        ${r.photos.map(p =>
          `<div class="review-photo" style="background:${p.bg}"><span>${p.emoji}</span></div>`
        ).join('')}
      </div>` : '';

    return `
      <div class="review-card">
        <div class="review-top">
          <div class="review-avatar">${r.reviewer[0]}</div>
          <div class="review-meta">
            <p class="review-name">${r.reviewer}</p>
            <div class="review-stars">${stars}</div>
          </div>
          <span class="review-date">${r.date}</span>
        </div>
        ${photos}
        <p class="review-text">${r.text}</p>
      </div>`;
  }).join('');

  return `
    <div class="detail-section">
      <div class="review-header-row">
        <h2 class="detail-section-title">봉사 후기</h2>
        <div class="review-avg-badge">⭐ ${avg} <span class="review-avg-count">(${list.length}개)</span></div>
      </div>
      <div class="review-list">${cards}</div>
    </div>`;
}
