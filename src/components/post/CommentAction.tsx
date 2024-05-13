import { deleteComment, deleteReply } from '@/api/post';
import { CommentProto } from '@/types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { styled } from 'styled-system/jsx';

const CommentAction = ({
  myComment,
  comment,
  id,
  postNum,
  parentCommentId
}: Pick<CommentProto, 'comment' | 'id' | 'postNum' | 'parentCommentId'> & {
  myComment: boolean;
}) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      if (comment && postNum) {
        await deleteComment(postNum, id);
      } else {
        await deleteReply(id);
      }
    },
    onSuccess: () => {
      if (comment && postNum) {
        queryClient.invalidateQueries({ queryKey: ['commentData', postNum] });
      } else {
        queryClient.invalidateQueries({
          queryKey: ['replyList', parentCommentId]
        });
      }
    },
    onError: () => {
      console.log('🚀 ~ onError:');
    }
  });
  const handleDelete = () => {
    mutate();
  };

  return (
    <Container onClick={handleDelete}>
      {myComment ? 'delete' : 'report'}
    </Container>
  );
};

const Container = styled.div`
  width: 50px;
  background-color: red;
  scroll-snap-align: end;
  scroll-snap-stop: always;
`;

export default CommentAction;
