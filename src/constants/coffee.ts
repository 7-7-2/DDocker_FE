export const COFFEE_TEXTS = {
  header: 'STATS',
  tabs: ['내역', '섭취 분석'],
  description: '이동하고 싶은 달을 선택하세요',
  sum: '나의 카페인 모아보기',
  intake: '카페인 섭취량',
  month: '월',
  year: '년',
  week: '이번 주',
  calendar: '카페인 달력',
  cups: '잔',
  unit: 'mg',
  coffee: '커피',
  caffeine: '카페인',
  containing: '포함된 카페인 함량은 ',
  is: '이에요'
};

export const COFFEE_CALENDAR_TEXTS = {
  title: '카페인 달력',
  weekView: ['일', '월', '화', '수', '목', '금', '토'],
  month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  legend: [
    { className: 'Healthy', number: '200mg 이하' },
    { className: 'Recommended', number: '201-400mg' },
    { className: 'Excessive', number: '400mg 초과' }
  ]
};

export const COFFEE_HISTORY_TEXTS = {
  filter: ['전체', '준수', '초과'],
  count: ['총 ', '건'],
  pre: '+',
  suf: 'mg',
  deleteModal: {
    title: {
      post: `게시물로 등록된 내역이에요
그래도 삭제하시겠어요?`,
      intake: `커피 내역을 삭제하시겠어요?`
    },
    description: {
      post: `삭제된 내역은 복구할 수 없고,
포함된 카페인 데이터도 함께 삭제됩니다.`,
      intake: `삭제된 내역은 복구할 수 없고,
게시물과 카페인 데이터도 함께 삭제됩니다.`
    }
  }
};

export const COFFEE_ANALYSIS_TEXTS = {
  unit: { cup: '잔', day: '일', mg: 'mg' },
  coffeeSum: {
    text: ['일 평균', '월간 누적', '연속 일수'],
    tab: ['카페인', '잔']
  },
  guestUser: `하루 이상 기록하고
주차별 패턴을 확인해보세요`,
  circularChart: {
    summary: {
      pre: '일일 카페인 권장량을',
      point: { recommended: '준수한 날', excessive: '초과한 날' },
      equal: ['준수한 날', '과 ', '초과한 날', '의 횟수가 같아요'],
      suf: '이 더 많아요',
      exception: ['과', '의 횟수가 같아요'],
      null: `카페인 권장량을
얼마나 준수했는지 확인해보세요`
    },
    caption: {
      pre: '커피를 마신 ',
      mid: ' 중 ',
      suf: { recommended: '을 준수했어요', excessive: '을 초과했어요' },
      same: ['일 준수, ', '일 초과했어요']
    },
    legend: { recommended: '권장량 준수', excessive: '권장량 초과' },
    percent: '%'
  },
  brandRanking: {
    summary: ['에서', '가장 많이 마셨어요'],
    guestUser: `일일 카페인 권장량을
준수했는지 비교할 수 있어요`,
    emptyData: '기록없음'
  }
};

export const ANONYMOUS_TEXTS = {
  logInCTA: {
    text: '로그인하면 통계 데이터를 확인하실 수 있어요.',
    btn: '로그인 하기'
  }
};

export const BRANDS = [
  '스타벅스',
  '이디야',
  '메가커피',
  '할리스',
  '파스쿠찌',
  '엔젤리너스',
  '더벤티',
  '빽다방',
  '컴포즈커피',
  '폴바셋',
  '바나프레소',
  '탐앤탐스',
  '커피빈',
  '매머드커피',
  '나만의 카페'
];
