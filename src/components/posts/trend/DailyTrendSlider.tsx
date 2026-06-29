import { useId } from 'react';
import { useQuery } from '@tanstack/react-query';

import DailyPopularPage from '@/components/posts/trend/carousel/DailyPopularPage';
import Bullets from '@/components/posts/trend/carousel/Bullets';
import { useCarousel } from '@/hooks/post/useCarousel';

import { getDailyPopular } from '@/api/trend';
import { TREND_TEXTS } from '@/constants/texts';

import { styled } from 'styled-system/jsx';
import { Center, Column, Flex } from '@/styles/layout';
import { cx } from 'styled-system/css';

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
      {dailyPopular?.length === 0 && (
        <EmptyContainer>
          <span className={cx(Center, Flex)}>{TREND_TEXTS.emptyMessage}</span>
        </EmptyContainer>
      )}
    </>
  );
};

const Container = styled.div`
  gap: 16px;
`;
const PostsContiner = styled.section`
  width: 100%;
  gap: 20px;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
`;
const EmptyContainer = styled.div`
  padding: 44px 0 28px;
  color: var(--colors-mid-grey);
`;

export default DailyTrendSlider;
