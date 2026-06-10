import { SLOTS } from '../utils/mockData.js';
import { getBadge } from '../utils/badges.js';

export function renderCertPage(state) {
  const appliedSlots = [...state.applied]
    .map(id => SLOTS.find(s => s.id === id))
    .filter(Boolean);
  const totalHours = appliedSlots.reduce((sum, s) => sum + s.hours, 0);
  const badge = getBadge(totalHours);

  const rows = appliedSlots.map(s => `
    <tr>
      <td>${s.orgName}</td>
      <td>${s.title}</td>
      <td>${s.date}</td>
      <td class="cert-hours">${s.hours}시간</td>
    </tr>`).join('');

  const emptyMsg = appliedSlots.length === 0
    ? '<p class="cert-empty">아직 신청한 봉사 활동이 없어요.<br>홈에서 봉사를 신청해보세요! 🌿</p>'
    : '';

  return `
    <div class="cert-page">
      <div class="cert-doc">
        <div class="cert-watermark">봉사ON</div>
        <div class="cert-top">
          <div class="cert-logo">봉사<span>ON</span></div>
          <h1 class="cert-title">봉사활동 확인서</h1>
          <p class="cert-subtitle">Certificate of Volunteer Service</p>
        </div>

        <div class="cert-recipient">
          <span class="cert-label">봉사자</span>
          <span class="cert-value">봉사자님</span>
        </div>

        <div class="cert-summary">
          <div class="cert-sum-item">
            <p class="cert-sum-label">총 봉사시간</p>
            <p class="cert-sum-val">${totalHours}<span>시간</span></p>
          </div>
          <div class="cert-sum-item">
            <p class="cert-sum-label">참여 횟수</p>
            <p class="cert-sum-val">${appliedSlots.length}<span>회</span></p>
          </div>
          <div class="cert-sum-item">
            <p class="cert-sum-label">등급</p>
            <p class="cert-sum-val">${badge.emoji}</p>
          </div>
        </div>

        ${emptyMsg}
        ${appliedSlots.length > 0 ? `
          <table class="cert-table">
            <thead>
              <tr><th>기관명</th><th>활동명</th><th>날짜</th><th>시간</th></tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        ` : ''}

        <div class="cert-footer">
          <p>발급일: 2026년 06월 10일</p>
          <p>발급처: 봉사ON 플랫폼</p>
          <div class="cert-stamp">봉사<br>ON</div>
        </div>
      </div>

      <div class="cert-actions">
        <button class="btn-print" data-action="print-cert">🖨️ 인쇄 / PDF 저장</button>
      </div>
    </div>`;
}
