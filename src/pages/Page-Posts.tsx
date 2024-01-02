import PostCard from '@/components/posts/PostCard';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { styled } from 'styled-system/jsx';

export const Posts = () => {
  useComposeHeader(true, '', 'icons');

  // DATA.MAP => <PostCard />
  return (
    <Container>
      <PostCard
        userId="zxc"
        NickName="커피안마셔안마셔"
        caffeine={12345}
      />
      <PostCard
        userId="zxc"
        NickName="커피안마셔안마셔"
        caffeine={12345}
      />
      <PostCard
        userId="zxc"
        NickName="커피안마셔안마셔"
        caffeine={12345}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 20px 0;
`;

export default Posts;
