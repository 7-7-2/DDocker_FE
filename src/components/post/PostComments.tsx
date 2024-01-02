import Comment from '@/components/post/Comment';
import { styled } from 'styled-system/jsx';
import { CommentLength } from '@/styles/styles';

const PostComments = ({ length }: { length: number }) => {
  return (
    <Container>
      <div className={CommentLength}>{length}개의 댓글</div>
      <Comment />
    </Container>
  );
};

const Container = styled.div`
  padding-top: 16px;
`;

export default PostComments;
