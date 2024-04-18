import { brandState } from '@/atoms/atoms';
import { TREND_TEXTS } from '@/constants/texts';
import { SectionHeader, MarginT28 } from '@/styles/styles';
import { useRecoilValue } from 'recoil';
import { css, cx } from 'styled-system/css';
import { useQuery } from '@tanstack/react-query';
import PostCard from '@/components/posts/following/PostCard';
import {
  getWeeklyPopularBrandMenu,
  getBrandPopularPosts,
  getBrandRecentPosts
} from '@/api/trend';
import { FollowingPost } from '@/types/types';
import { brandMapToEng } from '@/utils/convertBrandName';
import AlertBubble from '@/components/common/AlertBubble';
import TrendBubbleText from '@/components/posts/trend/TrendBubbleText';
import { Between, Flex } from '@/styles/layout';
import PostsSortBy from '@/components/posts/trend/PostsSortBy';
import { useToggle } from '@/hooks/post/useToggle';
import { useId } from 'react';
import { generatePostCardProps } from '@/utils/manageProps';

const PostsBrandPopular = () => {
  const selected = useRecoilValue(brandState);
  // TRUE: latest, FALSE: popularity
  const { toggle: sort, setToggle } = useToggle();
  const id = useId();

  const { data: weeklyPopularBrandMenu } = useQuery({
    queryKey: ['weeklyPopularBrandMenu', selected],
    queryFn: () => {
      return getWeeklyPopularBrandMenu(brandMapToEng(selected));
    },
    enabled: !!selected && !sort
  });

  const { data: brandPopularPosts } = useQuery({
    queryKey: ['brandPopularPosts', selected],
    queryFn: () => {
      return getBrandPopularPosts(brandMapToEng(selected));
    },
    enabled: !!selected && !sort
  });

  const { data: brandRecentPosts } = useQuery({
    queryKey: ['brandRecentPosts', selected],
    queryFn: () => {
      return getBrandRecentPosts(brandMapToEng(selected));
    },
    enabled: !!selected && sort
  });

  return (
    <div className={Container}>
      {weeklyPopularBrandMenu && weeklyPopularBrandMenu.data[0] && (
        <AlertBubble
          type="trends"
          message={
            <TrendBubbleText menu={weeklyPopularBrandMenu.data[0].menu} />
          }
        />
      )}

      <div className={cx(Flex, Between)}>
        <h3 className={cx(SectionHeader, MarginT28)}>
          <span className={Selected}>{selected}</span>
          {sort ? TREND_TEXTS.latestPost : TREND_TEXTS.popularPost}
        </h3>
        <PostsSortBy
          sort={sort}
          setSort={setToggle}
        />
      </div>

      {!sort &&
        brandPopularPosts &&
        brandPopularPosts.data.map((post: FollowingPost, idx: number) => (
          <PostCard {...generatePostCardProps(post, id, idx, selected)} />
        ))}

      {sort &&
        brandRecentPosts &&
        brandRecentPosts.data.map((post: FollowingPost, idx: number) => (
          <PostCard {...generatePostCardProps(post, id, idx, selected)} />
        ))}
    </div>
  );
};

const Selected = css`
  color: var(--colors-main);
`;

const Container = css`
  margin-top: 28px;
`;

export default PostsBrandPopular;
