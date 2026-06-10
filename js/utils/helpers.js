import { TODAY } from './mockData.js';

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

export function formatDate(dateStr) {
  if (dateStr === TODAY) return '오늘';
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()}(${DAY_NAMES[d.getDay()]})`;
}

export function filterSlots(slots, { category, dateRange }) {
  return slots.filter(slot => {
    const catMatch = category === '전체' || slot.category === category;
    let dateMatch = true;
    if (dateRange === 'today') {
      dateMatch = slot.date === TODAY;
    } else if (dateRange === 'week') {
      dateMatch = isThisWeek(slot.date);
    }
    return catMatch && dateMatch;
  });
}

function isThisWeek(dateStr) {
  const target = new Date(dateStr);
  const base = new Date(TODAY);
  const startOfWeek = new Date(base);
  startOfWeek.setDate(base.getDate() - base.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  return target >= startOfWeek && target <= endOfWeek;
}

export function countTodaySlots(slots) {
  return slots.filter(s => s.date === TODAY).length;
}
