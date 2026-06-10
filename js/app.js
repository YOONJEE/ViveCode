import { renderHomePage }    from './components/homePage.js';
import { renderDetailPage }  from './components/detailPage.js';
import { renderMyPage }      from './components/myPage.js';
import { renderMessagePage } from './components/messagePage.js';
import { renderCalendarPage }from './components/calendarPage.js';
import { renderCertPage }    from './components/certPage.js';
import { renderModal }       from './components/modal.js';
import { renderNotifPanel }  from './components/notifPanel.js';
import { SLOTS }             from './utils/mockData.js';

// ── 단일 상태 객체 ──────────────────────────────
const state = {
  page: 'home',
  selectedId: null,
  categoryFilter: '전체',
  dateFilter: 'today',
  applied: new Set(),
  messages: {},
  chatOrg: null,
  calendarYear: 2026,
  calendarMonth: 6,
  calendarDate: null,
  showCertInline: false,
  notifications: [
    { id: 0, type: 'system',   text: '봉사ON에 오신 것을 환영해요! 🌿', time: '09:00', read: false },
    { id: 1, type: 'reminder', text: '오늘 열린 봉사 슬롯이 3개 있어요 📋', time: '09:00', read: false },
  ],
  nextNotifId: 2,
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
  updateNotifBadge();
  if (state.page === 'message' && state.chatOrg) scrollToBottom();
  if (state.showCertInline) {
    requestAnimationFrame(() =>
      document.getElementById('inline-cert')?.scrollIntoView({ behavior: 'smooth' })
    );
  }
}

function updateHeader() {
  const map = {
    home:     () => { btnBack.classList.add('hidden');    headerTitle.innerHTML = '봉사<span class="logo-on">ON</span>'; headerTitle.style.cssText = 'font-size:20px;font-weight:800'; },
    detail:   () => { btnBack.classList.remove('hidden'); headerTitle.textContent = '봉사 상세';     headerTitle.style.cssText = 'font-size:16px;font-weight:700'; },
    mypage:   () => { btnBack.classList.add('hidden');    headerTitle.textContent = '마이페이지';    headerTitle.style.cssText = 'font-size:16px;font-weight:700'; },
    calendar: () => { btnBack.classList.add('hidden');    headerTitle.textContent = '일정 달력';     headerTitle.style.cssText = 'font-size:16px;font-weight:700'; },
    cert:     () => { btnBack.classList.remove('hidden'); headerTitle.textContent = '봉사활동 확인서'; headerTitle.style.cssText = 'font-size:16px;font-weight:700'; },
    message:  () => {
      if (state.chatOrg) { btnBack.classList.remove('hidden'); headerTitle.textContent = state.chatOrg; }
      else { btnBack.classList.add('hidden'); headerTitle.textContent = '메시지'; }
      headerTitle.style.cssText = 'font-size:16px;font-weight:700';
    },
  };
  (map[state.page] || map.home)();
}

function updateBottomNav() {
  document.querySelectorAll('#bottom-nav .nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === state.page);
  });
}

function updateNotifBadge() {
  const badge = document.getElementById('notif-badge');
  if (!badge) return;
  const count = state.notifications.filter(n => !n.read).length;
  badge.textContent = count > 0 ? (count > 9 ? '9+' : count) : '';
  badge.classList.toggle('hidden', count === 0);
}

// ── 알림 추가 ──────────────────────────────────
function addNotif(type, text) {
  state.notifications.unshift({ id: state.nextNotifId++, type, text, time: getTime(), read: false });
  updateNotifBadge();
}

// ── 알림 패널 ──────────────────────────────────
function openNotifPanel() {
  document.getElementById('notif-panel')?.remove();
  document.body.insertAdjacentHTML('beforeend', renderNotifPanel(state.notifications));
}

function closeNotifPanel() { document.getElementById('notif-panel')?.remove(); }

function markAllRead() {
  state.notifications.forEach(n => n.read = true);
  closeNotifPanel();
  updateNotifBadge();
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
  if (slot) {
    if (!state.messages[slot.orgName]) {
      const t = getTime();
      state.messages[slot.orgName] = [
        { from: 'org', text: `안녕하세요! ${slot.title} 신청해 주셔서 감사합니다 😊`, time: t, read: false },
        { from: 'org', text: `활동 당일 ${slot.timeStart}까지 ${slot.location}으로 와주세요.`, time: t, read: false },
      ];
    }
    const daysLeft = getDaysUntil(slot.date);
    const dayMsg = daysLeft === 0 ? '오늘이에요! 🎉' : `${daysLeft}일 남았어요`;
    addNotif('reminder', `"${slot.title}" 봉사까지 ${dayMsg}`);
  }
  closeModal();
  render();
  showToast('봉사 신청이 완료되었어요! 🎉');
}

// ── 메시지 ─────────────────────────────────────
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
  addNotif('message', `${orgName}에서 새 메시지가 왔어요 💬`);
  render();
}

// ── 유틸 ───────────────────────────────────────
function showToast(message) {
  document.querySelector('.toast')?.remove();
  const el = document.createElement('div');
  el.className = 'toast'; el.textContent = message;
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

function getDaysUntil(dateStr) {
  const target = new Date(dateStr);
  const today = new Date('2026-06-10');
  return Math.max(0, Math.round((target - today) / 86400000));
}

function handleBack() {
  if (state.page === 'cert')    navigate('mypage');
  else if (state.page === 'detail') navigate('home');
  else if (state.page === 'message' && state.chatOrg) { state.chatOrg = null; render(); }
  else navigate('home');
}

// ── 이벤트 위임 ────────────────────────────────
document.addEventListener('click', e => {
  // 알림 패널 오버레이 클릭 → 닫기
  if (e.target.id === 'notif-panel') { closeNotifPanel(); return; }

  const target = e.target.closest('[data-action]');
  const action = target?.dataset.action;
  const id = parseInt(e.target.closest('[data-id]')?.dataset.id);

  switch (action) {
    case 'filter-cat':        state.categoryFilter = target.dataset.value; render(); break;
    case 'filter-date':       state.dateFilter = target.dataset.value; render(); break;
    case 'apply':             e.stopPropagation(); openModal(id); break;
    case 'open-modal':        openModal(id); break;
    case 'modal-cancel':      closeModal(); break;
    case 'modal-confirm':     confirmApply(id); break;
    case 'goto-cert':         navigate('cert'); break;
    case 'print-cert':        window.print(); break;
    case 'toggle-cert-inline':
      state.showCertInline = !state.showCertInline; render(); break;
    case 'open-chat': {
      const org = target.dataset.org;
      if (state.messages[org]) state.messages[org].forEach(m => m.read = true);
      state.chatOrg = org; state.page = 'message'; render(); break;
    }
    case 'send-msg':    sendMessage(target.dataset.org); break;
    case 'select-date': state.calendarDate = target.dataset.date; render(); break;
    case 'cal-prev':
      state.calendarMonth === 1
        ? (state.calendarMonth = 12, state.calendarYear--)
        : state.calendarMonth--;
      state.calendarDate = null; render(); break;
    case 'cal-next':
      state.calendarMonth === 12
        ? (state.calendarMonth = 1, state.calendarYear++)
        : state.calendarMonth++;
      state.calendarDate = null; render(); break;
    case 'open-notif':  openNotifPanel(); break;
    case 'clear-notif': markAllRead(); break;
  }

  // 카드 클릭 → 상세 (지도 링크·신청 버튼 제외)
  const card = e.target.closest('.slot-card');
  if (card && !e.target.closest('[data-action="apply"]') && !e.target.closest('a')) {
    navigate('detail', { selectedId: parseInt(card.dataset.id) });
  }

  if (e.target.id === 'apply-modal') closeModal();
  if (e.target.closest('#btn-back'))  handleBack();
});

document.getElementById('bottom-nav').addEventListener('click', e => {
  const page = e.target.closest('[data-page]')?.dataset.page;
  if (page) navigate(page);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closeNotifPanel(); }
  if (e.key === 'Enter' && state.page === 'message' && state.chatOrg) sendMessage(state.chatOrg);
  if (e.key === 'Enter' && !state.chatOrg) {
    const card = document.activeElement.closest('.slot-card');
    if (card) navigate('detail', { selectedId: parseInt(card.dataset.id) });
  }
});

// ── 초기 렌더링 ────────────────────────────────
render();
