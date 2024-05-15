import { deleteComment, deleteReply } from '@/api/post';
import { CommentProto } from '@/types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import Icon from '@/components/common/Icon';
import { FlexCenter } from '@/styles/layout';

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
        queryClient.invalidateQueries({ queryKey: ['socialCounts', postNum] });
      } else {
        queryClient.invalidateQueries({
          queryKey: ['replyList', parentCommentId]
        });
        queryClient.invalidateQueries({ queryKey: ['socialCounts', postNum] });
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
    <Container
      className={cx(FlexCenter, myComment ? Delete : Report)}
      onClick={handleDelete}>
      <Icon
        {...iconPropsGenerator(myComment ? 'delete-comment' : 'report-comment')}
      />
    </Container>
  );
};

const Container = styled.div`
  min-width: 60px;
  scroll-snap-align: end;
  scroll-snap-stop: always;
`;

const Report = css`
  background-color: var(--colors-report-grey);
`;
const Delete = css`
  background-color: var(--colors-delete-red);
`;

export default CommentAction;
