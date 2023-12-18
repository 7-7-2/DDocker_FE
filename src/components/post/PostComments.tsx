import { styled } from 'styled-system/jsx';
import Comment from '@/components/post/Comment';
const PostComments = ({ length }: { length: number }) => {
  return (
    <Container>
      <Length>{length}개의 댓글</Length>
      <Comment />
    </Container>
  );
};

const Container = styled.div`
  padding-top: 16px;
`;

const Length = styled.div`
  font-size: var(--font-sizes-sm);
  line-height: 22px;
  color: #767676;
`;

export default PostComments;
