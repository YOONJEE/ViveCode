import { renderHomePage }    from './components/homePage.js';
import { renderDetailPage }  from './components/detailPage.js';
import { renderMyPage }      from './components/myPage.js';
import { renderMessagePage } from './components/messagePage.js';
import { renderCalendarPage }from './components/calendarPage.js';
import { renderCertPage }    from './components/certPage.js';
import { renderModal }       from './components/modal.js';
import { SLOTS }             from './utils/mockData.js';

// ── 단일 상태 객체 ──────────────────────────────
const state = {
  page: 'home',
  selectedId: null,
  categoryFilter: '전체',
  dateFilter: 'today',
  applied: new Set(),
  messages: {},      // { orgName: [{ from, text, time, read }] }
  chatOrg: null,     // 현재 열린 채팅 기관명
  calendarYear: 2026,
  calendarMonth: 6,
  calendarDate: null,
};

// ── DOM 참조 ───────────────────────────────────
const pageRoot    = document.getElementById('page-root');
const btnBack     = document.getElementById('btn-back');
const headerTitle = document.getElementById('header-title');

// ── 렌더링 ─────────────────────────────────────
function render() {
  switch (state.page) {
    case 'home':     pageRoot.innerHTML = renderHomePage(state);    break;
    case 'detail':   pageRoot.innerHTML = renderDetailPage(state.selectedId, state.applied); break;
    case 'mypage':   pageRoot.innerHTML = renderMyPage(state);     break;
    case 'message':  pageRoot.innerHTML = renderMessagePage(state); break;
    case 'calendar': pageRoot.innerHTML = renderCalendarPage(state);break;
    case 'cert':     pageRoot.innerHTML = renderCertPage(state);    break;
  }
  pageRoot.classList.remove('page-enter');
  void pageRoot.offsetWidth;
  pageRoot.classList.add('page-enter');
  updateHeader();
  updateBottomNav();
  if (state.page === 'message' && state.chatOrg) scrollToBottom();
}

function updateHeader() {
  const titles = {
    home: () => { btnBack.classList.add('hidden'); headerTitle.innerHTML = '봉사<span class="logo-on">ON</span>'; headerTitle.style.cssText='font-size:20px;font-weight:800'; },
    detail: () => { btnBack.classList.remove('hidden'); headerTitle.textContent='봉사 상세'; headerTitle.style.cssText='font-size:16px;font-weight:700'; },
    mypage: () => { btnBack.classList.add('hidden'); headerTitle.textContent='마이페이지'; headerTitle.style.cssText='font-size:16px;font-weight:700'; },
    message: () => {
      if (state.chatOrg) { btnBack.classList.remove('hidden'); headerTitle.textContent=state.chatOrg; }
      else { btnBack.classList.add('hidden'); headerTitle.textContent='메시지'; }
      headerTitle.style.cssText='font-size:16px;font-weight:700';
    },
    calendar: () => { btnBack.classList.add('hidden'); headerTitle.textContent='일정 달력'; headerTitle.style.cssText='font-size:16px;font-weight:700'; },
    cert: () => { btnBack.classList.remove('hidden'); headerTitle.textContent='봉사활동 확인서'; headerTitle.style.cssText='font-size:16px;font-weight:700'; },
  };
  (titles[state.page] || titles.home)();
}

function updateBottomNav() {
  document.querySelectorAll('#bottom-nav .nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === state.page);
  });
}

// ── 네비게이션 ─────────────────────────────────
function navigate(page, extra = {}) {
  Object.assign(state, { page, selectedId: null, chatOrg: null }, extra);
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

function closeModal() { document.getElementById('apply-modal')?.remove(); }

function confirmApply(slotId) {
  state.applied.add(slotId);
  const slot = SLOTS.find(s => s.id === slotId);
  if (slot && !state.messages[slot.orgName]) {
    const t = getTime();
    state.messages[slot.orgName] = [
      { from: 'org', text: `안녕하세요! ${slot.title} 봉사 신청해 주셔서 감사합니다 😊`, time: t, read: false },
      { from: 'org', text: `활동 당일 ${slot.timeStart}까지 ${slot.location}으로 와주세요.`, time: t, read: false },
    ];
  }
  closeModal();
  render();
  showToast('봉사 신청이 완료되었어요! 🎉');
}

// ── 메시지 전송 ────────────────────────────────
function sendMessage(orgName) {
  const input = document.getElementById('chat-input');
  const text = input?.value.trim();
  if (!text) return;
  if (!state.messages[orgName]) state.messages[orgName] = [];
  state.messages[orgName].push({ from: 'me', text, time: getTime(), read: true });
  input.value = '';
  render();
  setTimeout(autoReply, 1200, orgName);
}

function autoReply(orgName) {
  const replies = [
    '네, 확인했습니다! 궁금한 점이 있으면 편하게 연락 주세요 😊',
    '감사합니다! 당일 뵙겠습니다 🌿',
    '알겠습니다! 봉사 활동 날 기다릴게요.',
  ];
  const text = replies[Math.floor(Math.random() * replies.length)];
  state.messages[orgName].push({ from: 'org', text, time: getTime(), read: false });
  render();
}

// ── 인쇄 ───────────────────────────────────────
function printCert() { window.print(); }

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

function scrollToBottom() {
  const el = document.getElementById('chat-messages');
  if (el) el.scrollTop = el.scrollHeight;
}

function getTime() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
}

// ── 이벤트 위임 ────────────────────────────────
document.addEventListener('click', e => {
  const target = e.target.closest('[data-action]');
  const action = target?.dataset.action;
  const id = parseInt(e.target.closest('[data-id]')?.dataset.id);

  switch (action) {
    case 'filter-cat':   state.categoryFilter = target.dataset.value; render(); break;
    case 'filter-date':  state.dateFilter = target.dataset.value; render(); break;
    case 'apply':        e.stopPropagation(); openModal(id); break;
    case 'open-modal':   openModal(id); break;
    case 'modal-cancel': closeModal(); break;
    case 'modal-confirm':confirmApply(id); break;
    case 'goto-cert':    navigate('cert'); break;
    case 'print-cert':   printCert(); break;
    case 'open-chat': {
      const org = target.dataset.org;
      if (state.messages[org]) state.messages[org].forEach(m => m.read = true);
      state.chatOrg = org; state.page = 'message'; render(); break;
    }
    case 'send-msg':     sendMessage(target.dataset.org); break;
    case 'select-date':  state.calendarDate = target.dataset.date; render(); break;
    case 'cal-prev':
      if (state.calendarMonth === 1) { state.calendarMonth = 12; state.calendarYear--; }
      else state.calendarMonth--;
      state.calendarDate = null; render(); break;
    case 'cal-next':
      if (state.calendarMonth === 12) { state.calendarMonth = 1; state.calendarYear++; }
      else state.calendarMonth++;
      state.calendarDate = null; render(); break;
  }

  const card = e.target.closest('.slot-card');
  if (card && !e.target.closest('[data-action="apply"]')) {
    navigate('detail', { selectedId: parseInt(card.dataset.id) });
  }

  if (e.target.id === 'apply-modal') closeModal();
  if (e.target.closest('#btn-back')) handleBack();
});

function handleBack() {
  if (state.page === 'detail')  navigate('home');
  else if (state.page === 'cert') navigate('mypage');
  else if (state.page === 'message' && state.chatOrg) { state.chatOrg = null; render(); }
  else navigate('home');
}

document.getElementById('bottom-nav').addEventListener('click', e => {
  const page = e.target.closest('[data-page]')?.dataset.page;
  if (page) navigate(page);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
  if (e.key === 'Enter' && state.page === 'message' && state.chatOrg) {
    sendMessage(state.chatOrg);
  }
  if (e.key === 'Enter' && !state.chatOrg) {
    const card = document.activeElement.closest('.slot-card');
    if (card) navigate('detail', { selectedId: parseInt(card.dataset.id) });
  }
});

// ── 초기 렌더링 ────────────────────────────────
render();
