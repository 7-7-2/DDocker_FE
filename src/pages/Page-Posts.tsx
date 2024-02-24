import PostCard from '@/components/posts/PostCard';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { styled } from 'styled-system/jsx';
// import { useQuery } from '@tanstack/react-query';
// import { getFollowingPosts } from '@/api/post';

// const { data: postsData } = useQuery({
//   queryKey: ['postsData'],
//   queryFn: () => {
//     return getFollowingPosts();
//   }
// });
// DATA.MAP => <PostCard />

export const Posts = () => {
  useComposeHeader(true, '', 'icons');

  return (
    <Container>
      <PostCard
        userId="zxc"
        nickname="커피안마셔안마셔"
        caffeine={12345}
      />
      <PostCard
        userId="zxc"
        nickname="커피안마셔안마셔"
        caffeine={12345}
      />
      <PostCard
        userId="zxc"
        nickname="커피안마셔안마셔"
        caffeine={12345}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 20px 0;
`;

export default Posts;
