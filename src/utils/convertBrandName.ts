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
  return `${brandName}`;
};

export default changeVisitPurpose;
