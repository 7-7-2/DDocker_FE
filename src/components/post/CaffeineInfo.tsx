import CafeDetail from '@/components/post/CafeDetail';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import { Flex, Align } from '@/styles/layout';
import { PaddingL12 } from '@/styles/styles';

const CaffeineInfo = ({ brand }: { brand: string }) => {
  return (
    <Container className={cx(Flex, Align)}>
      <CafeIcon />
      <CafeDetail
        brand={brand}
        className={PaddingL12}
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
