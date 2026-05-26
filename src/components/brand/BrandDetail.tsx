import { useParams } from 'react-router-dom';

import SearchBar from '@/components/search/SearchBar';
import ProductItem from '@/components/brand/ProductItem';
import ProductRankingItem from '@/components/brand/ProductRankingItem';

import { useSearchInput } from '@/hooks/search/useSearchInput';
import useGetCoffeeList from '@/hooks/useGetCoffeeList';
import { brandMapToKor } from '@/utils/convertBrandName';
import { BRAND_TEXTS } from '@/constants/texts';
import { CoffeeDataTypes } from '@/types/types';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Column, Flex, FlexCenter } from '@/styles/layout';
import {
  colorMainDark,
  Gap22,
  Gap28,
  SectionDivier,
  Semibold
} from '@/styles/styles';

const { brandDetail } = BRAND_TEXTS;
const data = ['아메리카노', '아메리카노', '아메리카노'];
const BrandDetail = () => {
  const { brandName } = useParams();
  const { search, handleChange } = useSearchInput();
  const coffeeData = useGetCoffeeList() as CoffeeDataTypes;
  const getMenuList = () => {
    const res = brandName && coffeeData?.[brandName]?.map(item => item);
    return res;
  };

  const brand = brandName && brandMapToKor(brandName);
  const menuList = coffeeData && getMenuList();

  return (
    <>
      <SearchBar
        search={search}
        handleChange={handleChange}
        type={'brand'}
        placeholder={`${brand} ${brandDetail.search}`}
      />
      <Container className={Column}>
        <div>
          <Label className={Semibold}>{brandDetail.chart.label}</Label>
          <div className={FlexCenter}>
            {data ? (
              <Ranking className={cx(Flex, Gap22, Align)}>
                {data.map((item, idx) => (
                  <ProductRankingItem
                    key={idx}
                    ranking={idx + 1}
                  />
                ))}
              </Ranking>
            ) : (
              <div>
                <Description>{brandDetail.chart.description}</Description>
              </div>
            )}
          </div>
        </div>
        <div className={SectionDivier} />

        <ProductList>
          <span>
            {brandDetail.list.pre}
            <span className={cx(Semibold, colorMainDark)}>
              {menuList?.length}
            </span>
            {brandDetail.list.suf}
          </span>
          <div className={cx(Column, Gap28)}>
            {menuList &&
              menuList.map(item => (
                <ProductItem
                  key={item.menu}
                  data={item}
                />
              ))}
          </div>
        </ProductList>
      </Container>
    </>
  );
};

const Container = styled.div`
  margin-top: 68px;
`;

const Label = styled.span`
  font-size: var(--font-sizes-lg);
`;
const Ranking = styled.div`
  margin: 20px 0;
`;
const Description = styled.span`
  margin: 60px 0;
`;

const ProductList = styled.div`
  margin-top: 16px;
  gap: 24px;
  color: var(--colors-mid-grey);
`;

export default BrandDetail;
