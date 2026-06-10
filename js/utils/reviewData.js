// slotId를 키로 하는 봉사 후기 데이터
// photos: null → 텍스트만 / photos: [...] → 사진 + 텍스트
export const REVIEWS = {
  1: [ // 마포노인복지관
    {
      id: 'r1-1', reviewer: '이현수', rating: 5, date: '2026.05.15',
      text: '처음엔 어색할 줄 알았는데 어르신들이 먼저 말을 걸어주셔서 금방 편해졌어요. 손자처럼 대해주셔서 오히려 제가 더 힐링하고 왔습니다 😊 다음에도 꼭 참여하고 싶어요.',
      photos: [
        { bg: 'linear-gradient(135deg,#FFF3E0,#FFD89B)', emoji: '☕' },
        { bg: 'linear-gradient(135deg,#E8F8F1,#b2f0d4)', emoji: '😊' },
      ],
    },
    {
      id: 'r1-2', reviewer: '박서연', rating: 5, date: '2026.04.22',
      text: '봉사 시간이 2시간인데 매우 알차게 느껴졌어요. 어르신들의 살아오신 이야기가 정말 재미있고 감동적이었습니다. 기관 담당자분도 친절하게 안내해주셔서 처음 봉사자도 금방 적응할 수 있었어요.',
      photos: null,
    },
    {
      id: 'r1-3', reviewer: '최준혁', rating: 4, date: '2026.03.10',
      text: '어르신이 직접 만들어주신 수제 쿠키를 먹으면서 이야기를 나눴어요. 이런 소소한 행복이 봉사의 매력인 것 같습니다.',
      photos: [
        { bg: 'linear-gradient(135deg,#FEF3DC,#F5D78E)', emoji: '🍪' },
        { bg: 'linear-gradient(135deg,#E8F8F1,#b2f0d4)', emoji: '🌿' },
      ],
    },
  ],
  2: [ // 서울동물보호소
    {
      id: 'r2-1', reviewer: '강지민', rating: 5, date: '2026.05.20',
      text: '강아지들이 산책을 너무 좋아해서 2시간이 어떻게 갔는지 모르겠어요. 입양을 고려하고 계신 분이라면 더욱 강력 추천합니다!',
      photos: null,
    },
    {
      id: 'r2-2', reviewer: '윤아름', rating: 5, date: '2026.04.30',
      text: '처음엔 큰 강아지가 무서웠는데 보호소 직원분이 잘 안내해줘서 걱정 없었어요. 리드줄도 현장 제공이라 빈손으로 오셔도 됩니다 :)',
      photos: [
        { bg: 'linear-gradient(135deg,#D5F5E3,#82E0AA)', emoji: '🐕' },
        { bg: 'linear-gradient(135deg,#FFF3E0,#FFD89B)', emoji: '🌞' },
        { bg: 'linear-gradient(135deg,#E8F8F1,#b2f0d4)', emoji: '🐾' },
      ],
    },
    {
      id: 'r2-3', reviewer: '정민우', rating: 4, date: '2026.04.05',
      text: '유기견들이 사람의 손길을 얼마나 좋아하는지 느낄 수 있었어요. 봉사 후 마음이 따뜻해져서 일주일에 한 번은 꼭 오고 싶어졌습니다.',
      photos: null,
    },
  ],
  3: [ // 초록우산 어린이재단
    {
      id: 'r3-1', reviewer: '이수진', rating: 5, date: '2026.05.18',
      text: '담당 아이와 수학 공부를 함께했는데 너무 집중하는 모습에 감동받았어요. 교재도 잘 되어있고 지도 방향도 명확해서 교육 경험 없어도 금방 할 수 있었습니다.',
      photos: [
        { bg: 'linear-gradient(135deg,#EBF5FB,#AED6F1)', emoji: '📚' },
        { bg: 'linear-gradient(135deg,#FEF3DC,#F5D78E)', emoji: '✏️' },
      ],
    },
    {
      id: 'r3-2', reviewer: '한동현', rating: 5, date: '2026.04.14',
      text: '아이들이 열심히 따라오는 모습을 보면서 저도 더 잘 가르쳐야겠다는 의욕이 생겼어요. 한 시즌 함께하면서 아이 실력도 눈에 띄게 늘었고 보람이 정말 컸습니다.',
      photos: null,
    },
    {
      id: 'r3-3', reviewer: '조예린', rating: 5, date: '2026.03.25',
      text: '독서 멘토링이라 책 이야기를 나눴는데 아이의 풍부한 상상력에 제가 오히려 감탄했어요. 부담 없는 분위기에서 함께 이야기 나눌 수 있어서 좋았습니다.',
      photos: [
        { bg: 'linear-gradient(135deg,#F9EBEA,#F5B7B1)', emoji: '📖' },
        { bg: 'linear-gradient(135deg,#E8F8F1,#b2f0d4)', emoji: '😄' },
      ],
    },
  ],
  4: [ // 환경운동연합
    {
      id: 'r4-1', reviewer: '문재원', rating: 5, date: '2026.05.10',
      text: '운동도 하고 환경도 지키고 일석이조라는 말이 딱 맞아요. 처음에는 쑥스러웠는데 다들 함께하니까 오히려 뿌듯하더라고요. 쓰레기를 줍고 나니 한강이 더 예뻐 보였습니다.',
      photos: null,
    },
    {
      id: 'r4-2', reviewer: '신지혜', rating: 5, date: '2026.04.28',
      text: '가족과 함께 참여했는데 아이들도 너무 좋아했어요. 환경 교육도 되고 나들이도 되고! 봉사 후에 제공된 음료가 정말 달달하게 느껴졌어요 😄',
      photos: [
        { bg: 'linear-gradient(135deg,#D5F5E3,#82E0AA)', emoji: '🌊' },
        { bg: 'linear-gradient(135deg,#EBF5FB,#85C1E9)', emoji: '👨‍👩‍👧' },
        { bg: 'linear-gradient(135deg,#FEF3DC,#F5D78E)', emoji: '🌱' },
      ],
    },
    {
      id: 'r4-3', reviewer: '임현우', rating: 4, date: '2026.03.30',
      text: '플로깅이 생각보다 전혀 힘들지 않아요. 가볍게 걷는 수준이라 누구나 부담 없이 참여할 수 있습니다. 한강을 조금이나마 깨끗하게 만들었다는 뿌듯함이 남아요.',
      photos: null,
    },
  ],
  5: [ // 장애인자립생활센터
    {
      id: 'r5-1', reviewer: '배소영', rating: 5, date: '2026.05.08',
      text: '처음에는 제대로 도움이 될 수 있을지 걱정했는데 현장 교육 30분으로 빠르게 익힐 수 있었어요. 이용자분이 "고맙다"고 하실 때 마음이 뭉클했습니다.',
      photos: [
        { bg: 'linear-gradient(135deg,#FDEBD0,#FAD7A0)', emoji: '🤝' },
        { bg: 'linear-gradient(135deg,#E8F8F1,#b2f0d4)', emoji: '💚' },
      ],
    },
    {
      id: 'r5-2', reviewer: '고태준', rating: 5, date: '2026.04.20',
      text: '단순한 이동 지원처럼 보이지만 이용자분들에게는 외부 세계와 연결되는 소중한 시간이더라고요. 그 의미를 깨달으니 더욱 정성껏 하게 됐습니다.',
      photos: null,
    },
    {
      id: 'r5-3', reviewer: '류민경', rating: 5, date: '2026.03.18',
      text: '봉사 후 이용자분이 좋아하시는 카페에서 잠깐 이야기 나눴는데 정말 따뜻한 시간이었어요. 나도 언젠가 도움이 필요할 때 이런 분이 있으면 좋겠다 싶었습니다.',
      photos: [
        { bg: 'linear-gradient(135deg,#FFF3E0,#FFD89B)', emoji: '☕' },
        { bg: 'linear-gradient(135deg,#F9EBEA,#F5B7B1)', emoji: '🌸' },
      ],
    },
  ],
  6: [ // 다문화가족지원센터
    {
      id: 'r6-1', reviewer: '오지현', rating: 5, date: '2026.05.25',
      text: '한국어 교육이라서 어렵게 생각했는데 센터에서 커리큘럼을 잘 짜줘서 그냥 따라가면 됐어요. 수업 후 어머니들이 웃으며 고맙다고 인사해주셔서 너무 보람찼습니다.',
      photos: null,
    },
    {
      id: 'r6-2', reviewer: '김태환', rating: 5, date: '2026.04.17',
      text: '다양한 나라에서 오신 분들과 이야기하면서 오히려 제가 더 많이 배웠어요. 한국어로 소통하는 기쁨을 함께 나눌 수 있어서 정말 좋은 경험이었습니다.',
      photos: [
        { bg: 'linear-gradient(135deg,#EBF5FB,#AED6F1)', emoji: '🌍' },
        { bg: 'linear-gradient(135deg,#E8F8F1,#b2f0d4)', emoji: '💬' },
      ],
    },
    {
      id: 'r6-3', reviewer: '서은비', rating: 4, date: '2026.03.22',
      text: '매주 오다 보니 어머니들 얼굴도 익고 이름도 외우게 됐어요. 조금씩 발전하는 모습을 가까이서 볼 수 있다는 게 큰 보람이에요. 꾸준히 이어갈 수 있어 감사합니다.',
      photos: null,
    },
  ],
};
