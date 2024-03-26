import PostCard from '@/components/posts/following/PostCard';
import { FollowingPostIQParam } from '@/hooks/useInfiniteScroll';
import { useTargetInfiniteScroll } from '@/hooks/useTargetInfiniteScroll';
import { FollowingPost } from '@/types/types';
import React, { useId } from 'react';
import { styled } from 'styled-system/jsx';

const FollowDiscoveryCTA = React.lazy(() => import('./FollowDiscoveryCTA'));
const SignInCTA = React.lazy(() => import('./SignInCTA'));

const PostsFollowing = () => {
  const { data: postsData, ref } =
    useTargetInfiniteScroll(FollowingPostIQParam);
  const id = useId();
  const mapPosts = (post: FollowingPost, idx: number) => {
    return (
      <React.Fragment key={id + idx}>
        <PostCard
          nickname={post.nickname}
          sum={post.sum}
          postTitle={post.postTitle}
          postId={post.postId}
          profileUrl={post.profileUrl}
          createdAt={post.createdAt}
          photo={post.photo}
          caffeine={post.caffeine}
          shot={post.shot}
          menu={post.menu}
          brand={post.brand}
          userId={post.userId}
        />
      </React.Fragment>
    );
  };
  return (
    <>
      {postsData && postsData.length !== 0 && (
        <Container>
          {postsData && postsData.map(mapPosts)}
          <Target ref={ref} />
        </Container>
      )}
      {postsData && postsData.length === 0 && <FollowDiscoveryCTA />}
      {!postsData && <SignInCTA />}
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
