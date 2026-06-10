import { SLOTS } from '../utils/mockData.js';
import { formatDate } from '../utils/helpers.js';
import { BADGE_LEVELS, getBadge, getProgress } from '../utils/badges.js';

export function renderMyPage(state) {
  const appliedSlots = [...state.applied]
    .map(id => SLOTS.find(s => s.id === id))
    .filter(Boolean);

  const totalHours = appliedSlots.reduce((sum, s) => sum + s.hours, 0);
  const orgCount = new Set(appliedSlots.map(s => s.orgName)).size;
  const badge = getBadge(totalHours);
  const progress = getProgress(totalHours);
  const nextBadge = BADGE_LEVELS.find(l => l.min > totalHours) || null;

  return `
    <section class="mypage-header">
      <div class="mypage-avatar-row">
        <div class="mypage-avatar">🙋</div>
        <div>
          <p class="mypage-name">봉사자님</p>
          <p class="mypage-join">봉사ON과 함께하고 있어요 🌿</p>
        </div>
      </div>
      <div class="stats-grid">
        <div class="stat-card">
          <p class="stat-num">${totalHours}</p>
          <p class="stat-label">총 봉사시간</p>
        </div>
        <div class="stat-card">
          <p class="stat-num">${appliedSlots.length}</p>
          <p class="stat-label">참여 횟수</p>
        </div>
        <div class="stat-card">
          <p class="stat-num">${orgCount}</p>
          <p class="stat-label">방문 기관</p>
        </div>
      </div>
    </section>

    <section class="mypage-body">
      <!-- 뱃지/등급 -->
      <div class="badge-card">
        <div class="badge-current">
          <div class="badge-emoji-wrap" style="background:${badge.bg}">
            <span class="badge-emoji-lg">${badge.emoji}</span>
          </div>
          <div class="badge-info">
            <p class="badge-name" style="color:${badge.color}">${badge.name}</p>
            <p class="badge-desc">${nextBadge
              ? `다음 등급까지 <strong>${nextBadge.min - totalHours}시간</strong> 남았어요`
              : '최고 등급에 도달하셨어요! 🎉'}</p>
            <div class="badge-progress-track">
              <div class="badge-progress-fill" style="width:${progress}%;background:${badge.color}"></div>
            </div>
          </div>
        </div>
        <div class="badge-grid">
          ${BADGE_LEVELS.map(l => {
            const unlocked = totalHours >= l.min;
            return `<div class="badge-item ${unlocked ? 'unlocked' : 'locked'}" title="${l.name} (${l.min}h+)">
              <span class="badge-item-emoji">${unlocked ? l.emoji : '🔒'}</span>
              <span class="badge-item-name">${l.name}</span>
              <span class="badge-item-req">${l.min}h+</span>
            </div>`;
          }).join('')}
        </div>
      </div>

      <!-- 봉사 이력 -->
      <div class="section-header">
        <h2 class="section-title">봉사 이력</h2>
        ${appliedSlots.length > 0
          ? '<button class="btn-cert" data-action="goto-cert">📄 확인서 발급</button>'
          : ''}
      </div>
      <div class="history-list">
        ${renderHistory(appliedSlots)}
      </div>
      ${appliedSlots.length > 0 ? renderBreakdown(appliedSlots) : ''}
    </section>
  `;
}

function renderHistory(slots) {
  if (slots.length === 0) {
    return `<div class="empty-history">
      아직 신청한 봉사 활동이 없어요.<br>홈에서 첫 봉사를 신청해보세요! 🌿
    </div>`;
  }
  return slots.map(slot => `
    <div class="history-item">
      <div class="history-icon">${slot.categoryEmoji}</div>
      <div class="history-info">
        <p class="history-title">${slot.title}</p>
        <p class="history-org">${slot.orgName} · ${formatDate(slot.date)}</p>
      </div>
      <span class="history-hours">${slot.hours}h</span>
    </div>
  `).join('');
}

function renderBreakdown(slots) {
  const catHours = {};
  slots.forEach(s => { catHours[s.category] = (catHours[s.category] || 0) + s.hours; });
  const maxH = Math.max(...Object.values(catHours), 1);
  const bars = Object.entries(catHours).map(([cat, h]) => `
    <div class="cat-bar-item">
      <div class="cat-bar-label"><span>${cat}</span><span>${h}시간</span></div>
      <div class="cat-bar-track">
        <div class="cat-bar-fill" style="width:${Math.round((h / maxH) * 100)}%"></div>
      </div>
    </div>
  `).join('');

  return `
    <div class="section-header" style="margin-top:8px">
      <h2 class="section-title">활동 분야 현황</h2>
    </div>
    <div class="category-breakdown">${bars}</div>
  `;
}
