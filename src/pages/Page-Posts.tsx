import PostCard from '@/components/posts/PostCard';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { styled } from 'styled-system/jsx';
import { useQuery } from '@tanstack/react-query';
import { getFollowingPosts } from '@/api/post';
import useGetCacheData from '@/hooks/useGetCacheData';
import React, { useId } from 'react';
import { FollowingPost } from '@/types/types';

export const Posts = () => {
  useComposeHeader(true, '', 'icons');

  const { data: signedIn } = useQuery({
    queryKey: ['signedIn'],
    queryFn: () => useGetCacheData('user', '/accessToken')
  });
  const { data: postsData } = useQuery({
    queryKey: ['postsData'],
    queryFn: () => {
      return getFollowingPosts();
    },
    enabled: !!signedIn
  });

  const id = useId();
  const mapPosts = (post: FollowingPost, idx: number) => {
    return (
      <React.Fragment key={id + idx}>
        <PostCard
          nickname={post.nickname}
          sum={post.sum}
          postTitle={post.postTitle}
          totalComments={post.totalComments}
          likeCounts={post.likeCounts}
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
      {postsData && postsData.data.map(mapPosts)}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px 0;
`;

export default Posts;
