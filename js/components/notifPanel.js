const TYPE_ICON = { message: '💬', reminder: '📅', system: '🌿' };

export function renderNotifPanel(notifications) {
  const unread = notifications.filter(n => !n.read).length;

  const items = notifications.length > 0
    ? notifications.map(n => `
        <div class="notif-item ${n.read ? 'read' : 'unread'}" data-notif-id="${n.id}">
          <div class="notif-icon">${TYPE_ICON[n.type] || '🔔'}</div>
          <div class="notif-body">
            <p class="notif-text">${n.text}</p>
            <span class="notif-time">${n.time}</span>
          </div>
          ${!n.read ? '<span class="notif-dot"></span>' : ''}
        </div>`).join('')
    : '<p class="notif-empty">새로운 알림이 없어요 🌿</p>';

  return `
    <div class="notif-overlay" id="notif-panel" role="dialog" aria-label="알림">
      <div class="notif-sheet">
        <div class="notif-handle"></div>
        <div class="notif-sheet-header">
          <h2 class="notif-title">알림${unread > 0 ? ` <span class="notif-count">${unread}</span>` : ''}</h2>
          ${notifications.length > 0
            ? '<button class="notif-clear-btn" data-action="clear-notif">모두 읽음</button>'
            : ''}
        </div>
        <div class="notif-list">${items}</div>
      </div>
    </div>`;
}
