import { productRankingItemTypes } from '@/types/types';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Bold, Gap12, Semibold } from '@/styles/styles';
import { Align, Center, Column, FlexCenter } from '@/styles/layout';
import { BRAND_TEXTS } from '@/constants/texts';

const ProductRankingItem = ({
  rankingData,
  ranking
}: {
  rankingData: productRankingItemTypes;
  ranking: number;
}) => {
  const itemOrder = () => {
    if (ranking === 1) return { order: '2' };
    if (ranking === 2) return { order: '1' };
    else return { order: '3' };
  };
  const imgContainerStyle = () => {
    if (ranking === 1) return { width: '111px' };
    else return { width: '90px', marginTop: '12px' };
  };

  const rankingLabelStyle = () => {
    if (ranking === 1)
      return {
        width: '28px',
        backgroundColor: 'var(--colors-main)',
        fontSize: 'var(--font-sizes-base)'
      };
    if (ranking === 2) return { backgroundColor: '#8f8f8f' };
    else return { backgroundColor: '#c0c0c0' };
  };

  return (
    <Container
      style={{ ...itemOrder() }}
      className={cx(Column, Gap12)}>
      <ImgContainer
        className={FlexCenter}
        style={{ ...imgContainerStyle() }}>
        <RakingLabel
          className={FlexCenter}
          style={{ ...rankingLabelStyle() }}>
          {ranking}
        </RakingLabel>
      </ImgContainer>
      <div className={cx(Column, Align)}>
        <ProductName className={Semibold}>
          {rankingData.productName}
        </ProductName>
        <Caffeine className={Center}>
          <span className={Bold}>
            {rankingData.caffeine}
            {BRAND_TEXTS.unit}
          </span>
        </Caffeine>
      </div>
    </Container>
  );
};

const Container = styled.div`
  align-self: flex-start;
`;

const ImgContainer = styled.div`
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: var(--colors-tertiary);
  position: relative;
`;

const RakingLabel = styled.div`
  width: 26px;
  aspect-ratio: 1;
  border-radius: 50%;
  font-weight: 600;
  font-size: var(--font-sizes-sm);
  color: #fff;
  position: absolute;
  top: -4px;
  left: 0;
`;

const Caffeine = styled.div`
  padding: 3px 9px;
  margin-top: 8px;
  line-height: 20px;
  font-size: var(--font-sizes-xs);
  color: var(--colors-main);
  border: solid 1px var(--colors-main);
  border-radius: 20px;
`;

const ProductName = styled.span`
  text-align: center;
  word-break: keep-all;
`;
export default ProductRankingItem;
