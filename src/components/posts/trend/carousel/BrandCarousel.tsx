import { styled } from 'styled-system/jsx';
import BrandPage from '@/components/posts/trend/carousel/BrandPage';
import { Flex } from '@/styles/layout';
import Bullets from '@/components/posts/trend/carousel/Bullets';
import { BRANDS } from '@/constants/coffee';
import { useCarousel } from '@/hooks/useCarousel';
import { useRecoilState } from 'recoil';
import { brandState } from '@/atoms/atoms';

const pages = Math.ceil(BRANDS.length / 5);

const BrandCarousel = () => {
  const { curPage, setCurPage, handleScroll, containerRef } = useCarousel();
  const [selected, setSelected] = useRecoilState(brandState);

  return (
    <>
      <Container
        className={Flex}
        onScroll={handleScroll}
        ref={containerRef}>
        {Array.from({ length: pages }).map((_, i) => (
          <BrandPage
            key={i}
            ownPage={i}
            setSelected={setSelected}
            selected={selected}
          />
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
  margin-top: 56px;
  margin-bottom: 14px;
`;

export default BrandCarousel;
