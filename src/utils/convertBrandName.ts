//  방문 목적 한/영 변환 유틸 함수
const changeVisitPurpose = (brandName: string) => {
  if (brandName === 'angelinus') {
    return '엔젤리너스';
  }
  if (brandName === 'bbak') {
    return '빽다방';
  }
  if (brandName === 'compose') {
    return '컴포즈커피';
  }
  if (brandName === 'ediya') {
    return '이디야';
  }
  if (brandName === 'hollys') {
    return '할리스';
  }
  if (brandName === 'megacoffee') {
    return '메가커피';
  }
  if (brandName === 'pascucci') {
    return '파스쿠찌';
  }
  if (brandName === 'paulbassett') {
    return '폴바셋';
  }
  if (brandName === 'starbucks') {
    return '스타벅스';
  }
  if (brandName === 'theventi') {
    return '더벤티';
  }
  if (brandName === 'banapresso') {
    return '바나프레소';
  }
  if (brandName === 'hasamdong') {
    return '하삼동커피';
  }
  if (brandName === 'coffeebean') {
    return '커피빈';
  }
  if (brandName === 'mammoth') {
    return '매머드커피';
  }
  if (brandName === 'private') {
    return '나만의 카페';
  }
  return `${brandName}`;
};

export default changeVisitPurpose;

export const brandMapToEng = (brandName: string) => {
  const brandObj: Record<string, string> = {
    스타벅스: 'starbucks',
    이디야: 'ediya',
    메가커피: 'megacoffee',
    할리스: 'hollys',
    파스쿠찌: 'pascucci',
    엔젤리너스: 'angelinus',
    더벤티: 'theventi',
    빽다방: 'bbak',
    컴포즈커피: 'compose',
    폴바셋: 'paulbassett',
    바나프레소: 'banapresso',
    하삼동커피: 'hasamdong',
    커피빈: 'coffeebean',
    매머드커피: 'mammoth',
    '나만의 카페': 'private'
  };
  return brandObj[brandName];
};
