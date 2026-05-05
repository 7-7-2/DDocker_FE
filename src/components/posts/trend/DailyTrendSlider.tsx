import { useId } from 'react';
import { useQuery } from '@tanstack/react-query';

import PostDiscoveryCTA from '@/components/posts/trend/PostDiscoveryCTA';
import DailyPopularPage from '@/components/posts/trend/carousel/DailyPopularPage';
import Bullets from '@/components/posts/trend/carousel/Bullets';
import { useCarousel } from '@/hooks/post/useCarousel';

import { getDailyPopular } from '@/api/trend';

import { styled } from 'styled-system/jsx';
import { Column, Flex } from '@/styles/layout';

const DailyTrendSlider = () => {
  const { curPage, setCurPage, handleScroll, containerRef } = useCarousel();
  const { data: dailyPopular } = useQuery({
    queryKey: ['dailyPopular'],
    queryFn: getDailyPopular
  });
  const pages = Math.ceil(dailyPopular?.length / 2);
  const id = useId();
  return (
    <>
      <Container className={Column}>
        <PostsContiner
          className={Flex}
          onScroll={handleScroll}
          ref={containerRef}>
          {Array.from({ length: pages }).map((_, idx) => (
            <div key={idx + id}>
              <DailyPopularPage
                page={idx}
                posts={dailyPopular}
              />
            </div>
          ))}
        </PostsContiner>
        <Bullets
          cur={curPage}
          pages={pages}
          setCurPage={setCurPage}
        />
      </Container>
      {dailyPopular && dailyPopular.length === 0 && <PostDiscoveryCTA />}
    </>
  );
};

const Container = styled.div`
  margin: 16px -20px 0;
  padding: 0 20px;
  gap: 16px;
`;
const PostsContiner = styled.section`
  width: 100%;
  gap: 20px;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
`;

export default DailyTrendSlider;
