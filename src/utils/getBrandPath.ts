const pathMap = (brand: string) => {
  const brandObj: Record<string, string> = {
    스타벅스: '/png/starbucks.png',
    이디야: '/png/ediya.png',
    메가커피: '/png/megacoffee.png',
    할리스: '/png/hollys.png',
    파스쿠찌: '/png/pascucci.png',
    엔젤리너스: '/png/angelinus.png',
    더벤티: '/png/theventi.png',
    빽다방: '/png/bbak.png',
    컴포즈커피: '/png/compose.png',
    폴바셋: '/png/paulbassett.png'
  };
  return brandObj[brand];
};

export default pathMap;

export const getBrandPath = (brand: string) => {
  const brandMap: Record<string, string> = {
    starbucks: '스타벅스',
    ediya: '이디야',
    megacoffee: '메가커피',
    hollys: '할리스',
    pascucci: '파스쿠찌',
    angelinus: '엔젤리너스',
    theventi: '더벤티',
    bbak: '빽다방',
    compose: '컴포즈커피',
    paulbassett: '폴바셋'
  };
  return brandMap[brand];
};
