import SearchBar from '@/components/search/SearchBar';
import ProductItem from '@/components/brand/ProductItem';
import ProductRankingItem from '@/components/brand/ProductRankingItem';
import ActionModal from '@/components/common/ActionModal';
import Icon from '@/components/common/Icon';
import { Option } from '@/components/post/overlay/Option';

import { useBrandDetail } from '@/hooks/brand/useBrandDetail';
import { useShowFooter } from '@/hooks/useShowFooter';
import { useSortOption } from '@/hooks/useSortOption';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { BRAND_TEXTS } from '@/constants/texts';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Between, Column, Flex, FlexCenter } from '@/styles/layout';
import {
  Gap22,
  Gap28,
  colorMainDark,
  SectionDivier,
  Semibold,
  Medium
} from '@/styles/styles';
import React from 'react';

const { brandDetail } = BRAND_TEXTS;
const BrandDetail = () => {
  useShowFooter(false);
  const { isSelected, selectSortOption, isModal, handleSortOption } =
    useSortOption(brandDetail.sort.lowest);
  const lowest = isSelected === brandDetail.sort.lowest;
  const highest = isSelected === brandDetail.sort.highest;

  const {
    brand,
    rankingData,
    productData,
    navToDetail,
    search,
    reset,
    handleChange
  } = useBrandDetail(lowest);

  return (
    <>
      <SearchBar
        search={search}
        reset={reset}
        handleChange={handleChange}
        type={'brand'}
        placeholder={`${brand} ${brandDetail.search}`}
      />

      <Container className={Column}>
        <React.Fragment>
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
        </React.Fragment>
        <div className={SectionDivier} />

        <ProductList>
          <div className={cx(Flex, Between)}>
            <span>
              {brandDetail.list.pre}
              <span className={cx(Semibold, colorMainDark)}>
                {productData && productData.length}
              </span>
              {brandDetail.list.suf}
            </span>
            <SortBtn
              className={Flex}
              onClick={handleSortOption}>
              <span className={Medium}>{isSelected}</span>
              <Icon {...iconPropsGenerator('sort', '20')} />
            </SortBtn>
          </div>
          <div className={cx(Column, Gap28)}>
            {productData &&
              productData.map(item => (
                <div
                  key={item.menu}
                  onClick={() => navToDetail(item)}>
                  <ProductItem data={item} />
                </div>
              ))}
          </div>
        </ProductList>
      </Container>

      {isModal && (
        <ActionModal handleActionModal={handleSortOption}>
          <Option
            option={brandDetail.sort.lowest}
            onClick={selectSortOption}
            icon={lowest ? 'check-option' : undefined}
            type={lowest ? 'left' : undefined}
          />
          <Option
            option={brandDetail.sort.highest}
            onClick={selectSortOption}
            icon={highest ? 'check-option' : undefined}
            type={highest ? 'left' : undefined}
          />
        </ActionModal>
      )}
    </>
  );
};

const Container = styled.div`
  margin: 20px 0 10px;
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

const SortBtn = styled.button`
  color: var(--colors-main-dark);
`;
export default BrandDetail;
