import { brandMapToKor } from '@/utils/convertBrandName';
import { CoffeeItemTypes } from '@/types/types';
import { BRAND_TEXTS } from '@/constants/texts';

import { styled } from 'styled-system/jsx';
import { Column, Flex } from '@/styles/layout';
import { Bold, Semibold } from '@/styles/styles';
const ProductItem = ({ data }: { data: CoffeeItemTypes }) => {
  return (
    <Container className={Flex}>
      <Img></Img>
      <ProductInfo className={Column}>
        <span>{brandMapToKor(data.brand)}</span>
        <Product className={Semibold}>{data.menu}</Product>
        <Caffeine>
          <span className={Bold}>
            {data.caffeine}
            {BRAND_TEXTS.unit}
          </span>
        </Caffeine>
      </ProductInfo>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 16px;
  gap: 16px;
  color: var(--colors-mid-grey);
`;
const Img = styled.div`
  width: 80px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: var(--colors-tertiary);
`;

const ProductInfo = styled.span`
  font-size: var(--font-sizes-xs);
  line-height: 20px;
`;
const Product = styled.span`
  line-height: 22px;
  color: var(--colors-main-dark);
  font-size: var(--font-sizes-sm);
`;
const Caffeine = styled.div`
  width: fit-content;
  padding: 3px 9px;
  margin-top: 7px;
  color: var(--colors-dark-grey);
  border: solid 1px var(--colors-dark-grey);
  border-radius: 20px;
`;
export default ProductItem;
