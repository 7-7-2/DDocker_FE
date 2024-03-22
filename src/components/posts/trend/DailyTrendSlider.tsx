import { styled } from 'styled-system/jsx';
import DailyTrendCard from '@/components/posts/trend/DailyTrendCard';
import { Flex } from '@/styles/layout';
import { LeftCardSpacer, RightCardSpacer } from '@/styles/styles';
import { getDailyPopular } from '@/api/trend';
import { useQuery } from '@tanstack/react-query';
import { DailyTrendCardProps } from '@/types/types';
import { useId } from 'react';
import React from 'react';
import PostDiscoveryCTA from '@/components/posts/trend/PostDiscoveryCTA';

const DailyTrendSlider = () => {
  const { data: dailyPopular } = useQuery({
    queryKey: ['dailyPopular'],
    queryFn: getDailyPopular
  });
  const id = useId();

  return (
    <>
      <Container className={Flex}>
        <LeftCardSpacer />
        {dailyPopular &&
          dailyPopular.data.map((post: DailyTrendCardProps, idx: number) => (
            <React.Fragment key={id + idx}>
              <DailyTrendCard post={post} />
            </React.Fragment>
          ))}
        <RightCardSpacer />
      </Container>
      {dailyPopular && dailyPopular.data.length === 0 && <PostDiscoveryCTA />}
    </>
  );
};

const Container = styled.section`
  overflow-x: scroll;
  margin-left: -20px;
  margin-right: -20px;
`;

export default DailyTrendSlider;
