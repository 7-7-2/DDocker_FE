import PostCard from '@/components/posts/PostCard';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { styled } from 'styled-system/jsx';
import React, { useId } from 'react';
import { FollowingPost } from '@/types/types';
import { useTargetInfiniteScroll } from '@/hooks/useTargetInfiniteScroll';
import { FollowingPostIQParam } from '@/hooks/useInfiniteScroll';

export const Posts = () => {
  useComposeHeader(true, '', 'icons');

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
    <Container>
      {postsData && postsData.map(mapPosts)}
      <Target ref={ref} />
    </Container>
  );
};

const Container = styled.div`
  padding: 20px 0;
`;
const Target = styled.div`
  padding: 1px;
`;
export default Posts;
