import Icon from '@/components/common/Icon';

import { brandMapToKor } from '@/utils/convertBrandName';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { comparisonItemsTypes } from '@/types/types';
import { BRAND_TEXTS } from '@/constants/texts';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Column, Flex, Align } from '@/styles/layout';
import { Semibold, colorMidGrey, Medium, Gap6 } from '@/styles/styles';

const ProductComparisons = ({
  productName,
  comparisonData
}: {
  productName: string;
  comparisonData: comparisonItemsTypes[];
}) => {
  return (
    <Container className={Column}>
      <span
        className={Semibold}
        style={{ fontSize: 'var(--font-sizes-lg)' }}>
        {BRAND_TEXTS.productDetial} '{productName}'
      </span>
      <List className={Flex}>
        {comparisonData?.map(item => (
          <Item>
            <TemporaryImg />
            <Info className={cx(Column, Align)}>
              <span className={colorMidGrey}>
                {brandMapToKor(item.brandName)}
              </span>
              <span
                className={Semibold}
                style={{ fontSize: 'var(--font-sizes-sm)' }}>
                {item.caffeine}
                {BRAND_TEXTS.unit}
              </span>

              <div className={cx(Medium, Flex, Align, Gap6)}>
                <Icon
                  {...iconPropsGenerator(
                    `${Math.sign(item.diff) === 1 ? 'up' : 'down'}`,
                    '7'
                  )}
                />
                <span
                  style={{
                    color: `${Math.sign(item.diff) === 1 ? 'var(--colors-delete-red)' : 'var(--colors-recommended)'}`
                  }}>
                  {Math.abs(item.diff)}
                </span>
              </div>
            </Info>
          </Item>
        ))}
      </List>
    </Container>
  );
};

const TemporaryImg = styled.div`
  width: 72px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: #f1f1f1;
`;
const Container = styled.div`
  padding: 24px 0;
  gap: 20px;
`;
const List = styled.div`
  margin: 0 -20px;
  overflow-x: scroll;
  gap: 14px;
  & > :first-child {
    margin-left: 20px;
  }
  & > :last-child {
    margin-right: 20px;
  }
`;
const Item = styled.div`
  width: fit-content;
  align-content: center;
`;
const Info = styled.div`
  margin-top: 12px;
  font-size: var(--font-sizes-xs);
  gap: 4px;
`;
export default ProductComparisons;
