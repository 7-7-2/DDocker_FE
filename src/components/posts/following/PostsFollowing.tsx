import React, { Suspense, useId } from 'react';

import PostCard from '@/components/posts/following/PostCard';
import SEOMeta from '@/components/common/SEOMeta';
import SEO_DATA from '@/constants/SEOData';

import { FollowingPostIQParam } from '@/hooks/useInfiniteScroll';
import { useTargetInfiniteScroll } from '@/hooks/useTargetInfiniteScroll';
import { FollowingPost, InfinitePosts } from '@/types/types';
import { generatePostCardProps } from '@/utils/manageProps';

import { styled } from 'styled-system/jsx';

const FollowDiscoveryCTA = React.lazy(() => import('./FollowDiscoveryCTA'));
const SignInCTA = React.lazy(() => import('./SignInCTA'));

const PostsFollowing = () => {
  const { data: postsData, ref } = useTargetInfiniteScroll(
    FollowingPostIQParam as InfinitePosts
  );
  const id = useId();

  const mapPosts = (post: FollowingPost, idx: number) => {
    return <PostCard {...generatePostCardProps(post, id, idx)} />;
  };

  return (
    <>
      <SEOMeta pageData={SEO_DATA.postsFollowing} />
      {postsData && postsData.length !== 0 && (
        <Container>
          {postsData && postsData.map(mapPosts)}
          <Target ref={ref} />
        </Container>
      )}
      {postsData && postsData.length === 0 && (
        <Suspense>
          <FollowDiscoveryCTA />
        </Suspense>
      )}
      {!postsData && (
        <Suspense>
          <SignInCTA />
        </Suspense>
      )}
    </>
  );
};

const Container = styled.div`
  padding: 20px 0;
`;
const Target = styled.div`
  padding: 1px;
`;

export default PostsFollowing;
