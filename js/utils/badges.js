export const BADGE_LEVELS = [
  { min: 0,   name: '새싹 봉사자',  emoji: '🌱', color: '#9EC9A7', bg: '#E8F5EC', nextAt: 4   },
  { min: 4,   name: '새순 봉사자',  emoji: '🌿', color: '#3ECF8E', bg: '#E8F8F1', nextAt: 10  },
  { min: 10,  name: '나무 봉사자',  emoji: '🌳', color: '#2BAF74', bg: '#D4F0E3', nextAt: 20  },
  { min: 20,  name: '숲 지킴이',   emoji: '🏕️', color: '#1B8A56', bg: '#C5EAD8', nextAt: 50  },
  { min: 50,  name: '별빛 봉사자', emoji: '⭐', color: '#F5A623', bg: '#FEF3DC', nextAt: 100 },
  { min: 100, name: '봉사 영웅',   emoji: '🏆', color: '#FF6B4A', bg: '#FFF0EC', nextAt: null },
];

export function getBadge(hours) {
  let current = BADGE_LEVELS[0];
  for (const level of BADGE_LEVELS) {
    if (hours >= level.min) current = level;
  }
  return current;
}

export function getNextBadge(hours) {
  for (const level of BADGE_LEVELS) {
    if (hours < level.min) return level;
  }
  return null;
}

export function getProgress(hours) {
  const badge = getBadge(hours);
  if (!badge.nextAt) return 100;
  return Math.min(100, Math.round(((hours - badge.min) / (badge.nextAt - badge.min)) * 100));
}
