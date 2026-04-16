import CafeDetail from '@/components/post/CafeDetail';
import { brandMapToKor } from '@/utils/convertBrandName';
import pathMap from '@/utils/getBrandPath';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Flex } from '@/styles/layout';
import { PaddingL12 } from '@/styles/styles';

const CaffeineInfo = ({
  brand,
  productName,
  caffeine,
  shot,
  intensity,
  size
}: {
  brand: string;
  productName: string;
  caffeine: number;
  shot: number;
  intensity: string;
  size: string;
}) => {
  const converted = brandMapToKor(brand);
  return (
    <Container className={cx(Flex, Align)}>
      <CafeIcon src={pathMap(converted)} />
      <CafeDetail
        brand={converted}
        className={PaddingL12}
        caffeine={caffeine}
        productName={productName}
        shot={shot}
        intensity={intensity}
        size={size}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 88px;
  border: 1px solid var(--colors-btn-grey);
  padding: 12px;
  border-radius: 10px;
  margin-top: 10px;
`;

const CafeIcon = styled.img`
  min-width: 50px;
  max-height: 50px;
  min-height: 50px;
`;

export default CaffeineInfo;
