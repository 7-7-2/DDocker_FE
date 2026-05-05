import { useId } from 'react';
import DailyTrendCard from '@/components/posts/trend/DailyTrendCard';
import { DailyTrendCardProps } from '@/types/types';
import { styled } from 'styled-system/jsx';
import { Column } from '@/styles/layout';

const DailyPopularPage = ({
  page,
  posts
}: {
  page: number;
  posts: DailyTrendCardProps[];
}) => {
  const id = useId();
  const range = [...Array(2).keys()];
  const slice = page * 2;
  const dataKeys = range.map(i => slice + i);

  return (
    <Page className={Column}>
      {dataKeys.map(item => (
        <div key={posts[item]?.postId + id}>
          {posts[item] && <DailyTrendCard post={posts[item]} />}
        </div>
      ))}
    </Page>
  );
};

const Page = styled.div`
  width: calc(100dvw - 40px);
  gap: 12px;
  scroll-snap-align: start;
  scroll-snap-stop: always;
`;

export default DailyPopularPage;
