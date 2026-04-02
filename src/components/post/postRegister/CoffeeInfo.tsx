import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { caffineModalStyle, Semibold } from '@/styles/styles';

const CoffeeInfo = ({
  contents,
  type
}: {
  contents: Array<string | number>;
  type?: string;
}) => {
  return (
    <>
      <Item>{contents[0]}</Item>
      <ProductNameItem
        className={cx(type === 'modal' ? caffineModalStyle : Semibold)}>
        {contents[1]}
      </ProductNameItem>
      <Item>({contents[2]})</Item>
    </>
  );
};

const ProductNameItem = styled.span`
  line-height: 24px;
  font-size: var(--font-sizes-base);
  color: var(--colors-main-dark);
`;

const Item = styled.div`
  line-height: 20px;
  font-size: var(--font-sizes-xs);
  color: var(--colors-mid-grey);
`;

export default CoffeeInfo;
