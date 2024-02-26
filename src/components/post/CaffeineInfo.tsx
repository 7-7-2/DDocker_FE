import CafeDetail from '@/components/post/CafeDetail';
import { styled } from 'styled-system/jsx';
import { Align, Flex } from '@/styles/layout';
import { PaddingL12 } from '@/styles/styles';
import { cx } from 'styled-system/css';

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

const CaffeineInfo = ({
  brand,
  menu,
  caffeine,
  shot
}: {
  brand: string;
  menu: string;
  caffeine: number;
  shot: number;
}) => {
  return (
    <Container className={cx(Flex, Align)}>
      <CafeIcon src={pathMap(brand)} />
      <CafeDetail
        brand={brand}
        className={PaddingL12}
        caffeine={caffeine}
        menu={menu}
        shot={shot}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 10px;
`;

const CafeIcon = styled.img`
  min-width: 50px;
  max-height: 50px;
  min-height: 50px;
`;

export default CaffeineInfo;
