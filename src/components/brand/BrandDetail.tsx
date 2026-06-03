import SearchBar from '@/components/search/SearchBar';
import ProductItem from '@/components/brand/ProductItem';
import ProductRankingItem from '@/components/brand/ProductRankingItem';

import { useBrandDetail } from '@/hooks/brand/useBrandDetail';
import { useSearchInput } from '@/hooks/search/useSearchInput';

import { BRAND_TEXTS } from '@/constants/texts';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Column, Flex, FlexCenter } from '@/styles/layout';
import {
  Gap22,
  Gap28,
  colorMainDark,
  SectionDivier,
  Semibold
} from '@/styles/styles';
import { useShowFooter } from '@/hooks/useShowFooter';

const { brandDetail } = BRAND_TEXTS;
const BrandDetail = () => {
  useShowFooter(false);
  const { brand, rankingData, menuList, navToDetail } = useBrandDetail();
  const { search, handleChange } = useSearchInput();

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
            {rankingData && rankingData.length === 3 ? (
              <Ranking className={cx(Flex, Gap22, Align)}>
                {rankingData.map((item, idx) => (
                  <ProductRankingItem
                    key={item.productName}
                    rankingData={item}
                    ranking={idx + 1}
                  />
                ))}
              </Ranking>
            ) : (
              <Description>
                <span>{brandDetail.chart.description}</span>
              </Description>
            )}
          </div>
        </div>
        <div className={SectionDivier} />

        <ProductList>
          <span>
            {brandDetail.list.pre}
            <span className={cx(Semibold, colorMainDark)}>
              {menuList && menuList.length}
            </span>
            {brandDetail.list.suf}
          </span>
          <div className={cx(Column, Gap28)}>
            {menuList &&
              menuList.map(item => (
                <div
                  key={item.menu}
                  onClick={() => navToDetail(item)}>
                  <ProductItem data={item} />
                </div>
              ))}
          </div>
        </ProductList>
      </Container>
    </>
  );
};

const Container = styled.div`
  margin-top: 20px;
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
