import { formatDate } from '../utils/helpers.js';

export function renderModal(slot) {
  return `
    <div class="modal-overlay" id="apply-modal"
         role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal-sheet">
        <div class="modal-handle"></div>
        <h2 class="modal-title" id="modal-title">신청을 완료할까요?</h2>
        <p class="modal-sub">아래 봉사 활동에 참여 신청합니다.</p>
        <div class="modal-summary">
          <div class="modal-row">
            <span class="label">기관</span>
            <span class="value">${slot.orgName}</span>
          </div>
          <div class="modal-row">
            <span class="label">활동명</span>
            <span class="value">${slot.title}</span>
          </div>
          <div class="modal-row">
            <span class="label">일시</span>
            <span class="value">${formatDate(slot.date)} ${slot.timeStart}~${slot.timeEnd}</span>
          </div>
          <div class="modal-row">
            <span class="label">장소</span>
            <span class="value">${slot.location}</span>
          </div>
          <div class="modal-row">
            <span class="label">봉사 시간</span>
            <span class="value">${slot.hours}시간</span>
          </div>
        </div>
        <div class="modal-btn-group">
          <button class="btn-cancel" data-action="modal-cancel">취소</button>
          <button class="btn-confirm" data-action="modal-confirm" data-id="${slot.id}">신청 완료</button>
        </div>
      </div>
    </div>
  `;
}
