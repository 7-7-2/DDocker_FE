import { useId } from 'react';

import PostCard from '@/components/posts/following/PostCard';
import SortBtn from '@/components/common/SortBtn';
import AlertBubble from '@/components/common/AlertBubble';
import TrendBubbleText from '@/components/posts/trend/TrendBubbleText';
import PostDiscoveryCTA from '@/components/posts/trend/PostDiscoveryCTA';

import { usePostBrandPopular } from '@/hooks/posts/usePostBrandPopular';
import { generatePostCardProps } from '@/utils/manageProps';

import { FollowingPost } from '@/types/types';
import { TREND_TEXTS } from '@/constants/texts';

import { styled } from 'styled-system/jsx';
import { css, cx } from 'styled-system/css';
import { MarginT28, SectionHeaderText } from '@/styles/styles';
import { Align, Between, Column, Flex } from '@/styles/layout';

const PostsBrandPopular = () => {
  const {
    bodyRef,
    location,
    selected: selectedBrand,
    sort,
    handleSortBtn,
    weeklyPopularBrandMenu,
    brandPopularPosts,
    brandRecentPosts
  } = usePostBrandPopular();
  const id = useId();

  return (
    <div className={cx(MarginT28, Column)}>
      <AlertBubble
        type="trends"
        location={location}
        message={
          <TrendBubbleText productName={weeklyPopularBrandMenu?.productName} />
        }
      />
      <SectionHeader className={cx(Flex, Between, Align)}>
        <h3 className={cx(SectionHeaderText)}>
          {TREND_TEXTS.weekly[0]}
          <span
            ref={bodyRef}
            className={Selected}>
            {selectedBrand}
          </span>
          {TREND_TEXTS.weekly[1]}
        </h3>
        <SortBtn
          btnState={!sort}
          handleOnClick={handleSortBtn}
        />
      </SectionHeader>
      {!sort
        ? brandPopularPosts?.map((post: FollowingPost, idx: number) => (
            <PostCard
              {...generatePostCardProps(post, id, idx, selectedBrand)}
            />
          ))
        : brandRecentPosts?.map((post: FollowingPost, idx: number) => (
            <PostCard
              {...generatePostCardProps(post, id, idx, selectedBrand)}
            />
          ))}
      {brandPopularPosts?.length === 0 && <PostDiscoveryCTA />}
    </div>
  );
};

const Selected = css`
  color: var(--colors-main);
`;

const SectionHeader = styled.div`
  margin: 26px 0 16px 0;
`;

export default PostsBrandPopular;
