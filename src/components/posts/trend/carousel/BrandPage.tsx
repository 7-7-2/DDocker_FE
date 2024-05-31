import { styled } from 'styled-system/jsx';
import BrandCard from '@/components/posts/trend/carousel/BrandCard';
import { BRANDS } from '@/constants/coffee';
import { Between, Flex } from '@/styles/layout';
import { cx } from 'styled-system/css';
import { useId } from 'react';

const BrandPage = ({
  ownPage,
  setSelected,
  selected
}: {
  ownPage: number;
  setSelected: (brand: string) => void;
  selected: string;
}) => {
  const range = [...Array(5).keys()];
  const slice5 = ownPage * 5;
  const brandsKeys = range.map(i => slice5 + i);
  const id = useId();

  return (
    <Page className={cx(Flex, Between)}>
      {brandsKeys.map(brand => (
        <BrandCard
          key={id + brand}
          brand={BRANDS[brand]}
          setSelected={setSelected}
          selected={selected}
        />
      ))}
    </Page>
  );
};

const Page = styled.div`
  min-width: 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
`;

export default BrandPage;
