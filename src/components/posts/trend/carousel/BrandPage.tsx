import { styled } from 'styled-system/jsx';
import BrandCard from '@/components/posts/trend/carousel/BrandCard';
import { BRANDS } from '@/constants/coffee';
import { Between, Flex } from '@/styles/layout';
import { cx } from 'styled-system/css';
import { useState } from 'react';

const BrandPage = ({
  curPage,
  ownPage,
  setSelected,
  selected
}: {
  curPage: number;
  ownPage: number;
  setSelected: (brand: string) => void;
  selected: string;
}) => {
  const range = [...Array(5).keys()];
  const slice5 = ownPage * 5;
  const brandsKeys = range.map(i => slice5 + i);
  return (
    <Page className={cx(Flex, Between)}>
      {brandsKeys.map(brand => (
        <BrandCard
          key={brand}
          brand={BRANDS[brand]}
          setSelected={setSelected}
          selected={selected}
        />
      ))}
    </Page>
  );
};

const Page = styled.div`
  min-width: calc(100vw - 40px);
  scroll-snap-align: start;
  scroll-snap-stop: always;
`;

export default BrandPage;
