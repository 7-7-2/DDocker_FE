import { styled } from 'styled-system/jsx';
import BrandPage from '@/components/posts/trend/carousel/BrandPage';
import { Flex } from '@/styles/layout';
import Bullets from '@/components/posts/trend/carousel/Bullets';
import { BRANDS } from '@/constants/coffee';
import { useCarousel } from '@/hooks/post/useCarousel';
import { LeftCardSpacer } from '@/styles/styles';
import React, { useId } from 'react';
import { useSetInitialBrand } from '@/hooks/post/useSetInitialBrand';

const pages = Math.ceil(BRANDS.length / 5);

const BrandCarousel = () => {
  const { curPage, setCurPage, handleScroll, containerRef } = useCarousel();
  const id = useId();
  const { selected, setSelected } = useSetInitialBrand();
  return (
    <>
      <Container
        className={Flex}
        onScroll={handleScroll}
        ref={containerRef}>
        {Array.from({ length: pages }).map((_, i) => (
          <React.Fragment key={id + i}>
            <BrandPage
              ownPage={i}
              setSelected={setSelected}
              selected={selected}
            />
            <LeftCardSpacer />
          </React.Fragment>
        ))}
      </Container>
      <Bullets
        cur={curPage}
        pages={pages}
        setCurPage={setCurPage}
      />
    </>
  );
};

const Container = styled.section`
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  margin-top: 24px;
  margin-bottom: 14px;
`;

export default BrandCarousel;
