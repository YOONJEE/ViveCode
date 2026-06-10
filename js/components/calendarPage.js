import { SLOTS } from '../utils/mockData.js';
import { renderSlotCard } from './slotCard.js';

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];
const MONTH_NAMES = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];

export function renderCalendarPage(state) {
  const { calendarYear: y, calendarMonth: m, calendarDate } = state;
  const grid = buildGrid(y, m);
  const slotDates = getSlotDates(y, m);

  const cells = grid.map(day => {
    if (!day) return '<div class="cal-cell empty"></div>';
    const dateStr = `${y}-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const hasDot = slotDates.has(dateStr);
    const isToday = dateStr === '2026-06-10';
    const isSelected = dateStr === calendarDate;
    return `
      <button class="cal-cell ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${hasDot ? 'has-slots' : ''}"
              data-action="select-date" data-date="${dateStr}">
        <span class="cal-day">${day}</span>
        ${hasDot ? '<span class="cal-dot"></span>' : ''}
      </button>`;
  }).join('');

  const dayHeaders = DAY_LABELS.map((d, i) =>
    `<div class="cal-day-header ${i === 0 ? 'sun' : i === 6 ? 'sat' : ''}">${d}</div>`
  ).join('');

  const selectedSlots = calendarDate
    ? SLOTS.filter(s => s.date === calendarDate)
    : [];

  const slotSection = calendarDate ? `
    <div class="cal-slot-section">
      <p class="cal-slot-title">${formatCalDate(calendarDate)}의 봉사 활동</p>
      ${selectedSlots.length > 0
        ? `<div class="slot-list" style="padding:0">${selectedSlots.map(s => renderSlotCard(s, state.applied.has(s.id))).join('')}</div>`
        : '<p class="cal-no-slot">이 날짜에는 봉사 활동이 없어요.</p>'}
    </div>` : '';

  return `
    <div class="calendar-wrap">
      <div class="cal-header">
        <button class="cal-nav" data-action="cal-prev">&#8249;</button>
        <span class="cal-month">${y}년 ${MONTH_NAMES[m - 1]}</span>
        <button class="cal-nav" data-action="cal-next">&#8250;</button>
      </div>
      <div class="cal-grid-header">${dayHeaders}</div>
      <div class="cal-grid">${cells}</div>
    </div>
    ${slotSection}`;
}

function buildGrid(year, month) {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function getSlotDates(year, month) {
  const set = new Set();
  SLOTS.forEach(s => {
    const d = new Date(s.date);
    if (d.getFullYear() === year && d.getMonth() + 1 === month) set.add(s.date);
  });
  return set;
}

function formatCalDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
}
