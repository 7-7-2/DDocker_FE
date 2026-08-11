import React from 'react';

import SearchBar from '@/components/search/SearchBar';
import ProductItem from '@/components/brand/ProductItem';
import ProductRankingItem from '@/components/brand/ProductRankingItem';
import SortOptionModal from '@/components/common/SortOptionModal';
import SortBtn from '@/components/common/SortBtn';
import Icon from '@/components/common/Icon';
import Tooltip from '@/components/brand/Tooltip';

import { useBrandDetail } from '@/hooks/brand/useBrandDetail';
import { useShowFooter } from '@/hooks/useShowFooter';
import { useSortOption } from '@/hooks/useSortOption';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { useTooltip } from '@/hooks/brand/useTooltip';

import { BRAND_TEXTS } from '@/constants/texts';
import { SORT_TEXTS } from '@/constants/common';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Between, Column, Flex, FlexCenter } from '@/styles/layout';
import {
  Gap22,
  Gap28,
  colorMainDark,
  SectionDivier,
  Semibold
} from '@/styles/styles';

const { brandDetail } = BRAND_TEXTS;
const BrandDetail = () => {
  useShowFooter(false);

  const { isSelected, selectSortOption, isModal, handleSortOption } =
    useSortOption(SORT_TEXTS.brandDetail[0]);
  const lowest = isSelected === SORT_TEXTS.brandDetail[0];

  const { isTooltipOpen, handleToggleTooltip, anchorRef, anchor } =
    useTooltip();

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
          <Label className={cx(Flex, Align)}>
            <span className={Semibold}>{brandDetail.chart.label}</span>
            <button
              ref={anchorRef}
              onClick={handleToggleTooltip}>
              <Icon {...iconPropsGenerator('toolTip', '20')} />
            </button>
          </Label>
          {isTooltipOpen && <Tooltip anchor={anchor} />}
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
              handleSortOption={handleSortOption}
              isSelected={isSelected}
            />
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
        <SortOptionModal
          option={SORT_TEXTS.brandDetail}
          isSelected={isSelected}
          handleSortOption={handleSortOption}
          selectSortOption={selectSortOption}
        />
      )}
    </>
  );
};

const Container = styled.div`
  margin: 12px 0 10px;
`;

const Label = styled.div`
  font-size: var(--font-sizes-lg);
  gap: 4px;
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
