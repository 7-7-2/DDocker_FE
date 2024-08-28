import CafeDetail from '@/components/post/CafeDetail';
import { styled } from 'styled-system/jsx';
import { Align, Flex } from '@/styles/layout';
import { PaddingL12 } from '@/styles/styles';
import { cx } from 'styled-system/css';
import pathMap from '@/utils/getBrandPath';

const CaffeineInfo = ({
  brand,
  menu,
  caffeine,
  shot,
  intensity,
  size
}: {
  brand: string;
  menu: string;
  caffeine: number;
  shot: number;
  intensity: string;
  size: number;
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
        intensity={intensity}
        size={size}
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
