import { SLOTS } from '../utils/mockData.js';

export function renderMessagePage(state) {
  if (state.chatOrg) return renderChatView(state);
  return renderConvList(state);
}

function renderConvList(state) {
  const orgs = Object.keys(state.messages);
  if (orgs.length === 0) {
    return `
      <div class="msg-empty">
        <div class="msg-empty-icon">💬</div>
        <p>아직 메시지가 없어요.<br>봉사 신청 후 기관과 소통해보세요!</p>
      </div>`;
  }

  const items = orgs.map(orgName => {
    const msgs = state.messages[orgName];
    const last = msgs[msgs.length - 1];
    const orgEmoji = SLOTS.find(s => s.orgName === orgName)?.orgEmoji || '🏢';
    const unread = msgs.filter(m => m.from === 'org' && !m.read).length;
    return `
      <button class="conv-item" data-action="open-chat" data-org="${orgName}">
        <div class="conv-avatar">${orgEmoji}</div>
        <div class="conv-info">
          <div class="conv-top">
            <span class="conv-name">${orgName}</span>
            <span class="conv-time">${last.time}</span>
          </div>
          <div class="conv-bottom">
            <span class="conv-preview">${last.from === 'me' ? '나: ' : ''}${last.text}</span>
            ${unread > 0 ? `<span class="conv-unread">${unread}</span>` : ''}
          </div>
        </div>
      </button>`;
  }).join('');

  return `
    <div class="conv-list-header">
      <h2 class="section-title" style="padding:20px 16px 0">메시지</h2>
    </div>
    <div class="conv-list">${items}</div>`;
}

function renderChatView(state) {
  const orgName = state.chatOrg;
  const msgs = state.messages[orgName] || [];
  const orgEmoji = SLOTS.find(s => s.orgName === orgName)?.orgEmoji || '🏢';

  const bubbles = msgs.map(m => `
    <div class="bubble-wrap ${m.from === 'me' ? 'mine' : 'theirs'}">
      ${m.from === 'org' ? `<div class="bubble-avatar">${orgEmoji}</div>` : ''}
      <div class="bubble">
        <p>${m.text}</p>
        <span class="bubble-time">${m.time}</span>
      </div>
    </div>`).join('');

  return `
    <div class="chat-org-bar">
      <div class="chat-org-avatar">${orgEmoji}</div>
      <span class="chat-org-name">${orgName}</span>
    </div>
    <div class="chat-messages" id="chat-messages">${bubbles}</div>
    <div class="chat-input-bar">
      <input class="chat-input" id="chat-input" type="text"
             placeholder="메시지를 입력하세요..." maxlength="200"
             autocomplete="off" />
      <button class="chat-send" data-action="send-msg" data-org="${orgName}">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
        </svg>
      </button>
    </div>`;
}
