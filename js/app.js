import { renderHomePage }   from './components/homePage.js';
import { renderDetailPage } from './components/detailPage.js';
import { renderMyPage }     from './components/myPage.js';
import { renderModal }      from './components/modal.js';
import { SLOTS }            from './utils/mockData.js';

// ── 단일 상태 객체 ──────────────────────────────
const state = {
  page: 'home',
  selectedId: null,
  categoryFilter: '전체',
  dateFilter: 'today',
  applied: new Set(),
};

// ── DOM 참조 ───────────────────────────────────
const pageRoot  = document.getElementById('page-root');
const btnBack   = document.getElementById('btn-back');
const headerTitle = document.getElementById('header-title');

// ── 렌더링 ─────────────────────────────────────
function render() {
  if (state.page === 'home')       pageRoot.innerHTML = renderHomePage(state);
  else if (state.page === 'detail') pageRoot.innerHTML = renderDetailPage(state.selectedId, state.applied);
  else if (state.page === 'mypage') pageRoot.innerHTML = renderMyPage(state);

  pageRoot.classList.remove('page-enter');
  void pageRoot.offsetWidth; // reflow to restart animation
  pageRoot.classList.add('page-enter');

  updateHeader();
  updateBottomNav();
}

function updateHeader() {
  if (state.page === 'detail') {
    btnBack.classList.remove('hidden');
    headerTitle.textContent = '봉사 상세';
    headerTitle.style.cssText = 'font-size:16px;font-weight:700';
  } else {
    btnBack.classList.add('hidden');
    headerTitle.innerHTML = '봉사<span class="logo-on">ON</span>';
    headerTitle.style.cssText = 'font-size:20px;font-weight:800';
  }
}

function updateBottomNav() {
  document.querySelectorAll('#bottom-nav .nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === state.page);
  });
}

// ── 네비게이션 ─────────────────────────────────
function navigate(page, selectedId = null) {
  state.page = page;
  state.selectedId = selectedId;
  window.scrollTo({ top: 0, behavior: 'instant' });
  render();
}

// ── 모달 ───────────────────────────────────────
function openModal(slotId) {
  if (state.applied.has(slotId)) return;
  const slot = SLOTS.find(s => s.id === slotId);
  if (!slot) return;
  document.body.insertAdjacentHTML('beforeend', renderModal(slot));
}

function closeModal() {
  document.getElementById('apply-modal')?.remove();
}

function confirmApply(slotId) {
  state.applied.add(slotId);
  closeModal();
  render();
  showToast('봉사 신청이 완료되었어요! 🎉');
}

// ── 토스트 ─────────────────────────────────────
function showToast(message) {
  document.querySelector('.toast')?.remove();
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    el.addEventListener('transitionend', () => el.remove(), { once: true });
  }, 2600);
}

// ── 인증서 출력 ────────────────────────────────
function printCert() {
  const slots = [...state.applied].map(id => SLOTS.find(s => s.id === id)).filter(Boolean);
  const totalHours = slots.reduce((sum, s) => sum + s.hours, 0);
  const rows = slots.map(s => `
    <tr>
      <td>${s.orgName}</td><td>${s.title}</td>
      <td>${s.date}</td><td style="text-align:center">${s.hours}시간</td>
    </tr>`).join('');

  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html><html lang="ko"><head>
    <meta charset="UTF-8"><title>봉사활동 확인서</title>
    <style>
      body{font-family:'Malgun Gothic',sans-serif;max-width:620px;margin:48px auto;padding:0 20px;color:#1a2b22}
      h1{text-align:center;font-size:26px;margin-bottom:6px}
      .sub{text-align:center;color:#6b7c74;font-size:14px;margin-bottom:32px}
      table{width:100%;border-collapse:collapse;margin-bottom:16px}
      th,td{border:1px solid #e2eae6;padding:10px 12px;font-size:13px;text-align:left}
      th{background:#f4f7f5;font-weight:700}
      .total{text-align:right;font-weight:700;font-size:15px;margin-bottom:40px}
      .total span{color:#3ecf8e;font-size:20px}
      .footer{text-align:center;color:#9aaba3;font-size:12px;margin-top:40px}
      .btn{margin-top:24px;padding:12px 24px;background:#3ecf8e;color:#fff;border:none;
           border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;display:block;margin:24px auto 0}
      @media print{.btn{display:none}}
    </style></head><body>
    <h1>봉사활동 확인서</h1>
    <p class="sub">발급처: 봉사ON 플랫폼 | 발급일: 2026-06-10</p>
    <table><thead><tr><th>기관명</th><th>활동명</th><th>날짜</th><th>봉사시간</th></tr></thead>
    <tbody>${rows}</tbody></table>
    <p class="total">총 봉사 시간: <span>${totalHours}시간</span></p>
    <p class="footer">본 확인서는 봉사ON 플랫폼에서 자동 발급된 문서입니다.</p>
    <button class="btn" onclick="window.print()">🖨️ 인쇄하기</button>
  </body></html>`);
  win.document.close();
}

// ── 이벤트 위임 (document 단일 리스너) ──────────
document.addEventListener('click', e => {
  const target = e.target.closest('[data-action]');
  const action = target?.dataset.action;
  const id = parseInt(e.target.closest('[data-id]')?.dataset.id);

  switch (action) {
    case 'filter-cat':
      state.categoryFilter = target.dataset.value;
      render();
      break;
    case 'filter-date':
      state.dateFilter = target.dataset.value;
      render();
      break;
    case 'apply':
      e.stopPropagation();
      openModal(id);
      break;
    case 'open-modal':
      openModal(id);
      break;
    case 'modal-cancel':
      closeModal();
      break;
    case 'modal-confirm':
      confirmApply(id);
      break;
    case 'print-cert':
      printCert();
      break;
  }

  // 카드 클릭 → 상세 페이지
  const card = e.target.closest('.slot-card');
  if (card && !e.target.closest('[data-action="apply"]')) {
    navigate('detail', parseInt(card.dataset.id));
  }

  // 모달 오버레이 바깥 클릭 → 닫기
  if (e.target.id === 'apply-modal') closeModal();

  // 뒤로가기 버튼
  if (e.target.closest('#btn-back')) navigate('home');
});

// 하단 네비게이션
document.getElementById('bottom-nav').addEventListener('click', e => {
  const page = e.target.closest('[data-page]')?.dataset.page;
  if (page) navigate(page);
});

// 키보드: Escape → 모달 닫기 / Enter → 카드 상세
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
  if (e.key === 'Enter') {
    const card = document.activeElement.closest('.slot-card');
    if (card) navigate('detail', parseInt(card.dataset.id));
  }
});

// ── 초기 렌더링 ────────────────────────────────
render();
