import { deleteComment, deleteReply } from '@/api/post';
import { CommentPrototype } from '@/types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import Icon from '@/components/common/Icon';
import { FlexCenter } from '@/styles/layout';
import { useNavigate, useParams } from 'react-router-dom';
import { footerShowState } from '@/atoms/atoms';
import { useSetRecoilState } from 'recoil';

const CommentAction = ({
  myComment,
  comment,
  id,
  postNum,
  parentCommentId
}: Pick<CommentPrototype, 'comment' | 'id' | 'postNum' | 'parentCommentId'> & {
  myComment: boolean;
}) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const displayFooter = useSetRecoilState(footerShowState);

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
    onError: () => {}
  });

  const handleDelete = () => {
    mutate();
  };

  const handleReport = () => {
    navigate(`/report/${postId}`, { state: { comment, id } });
    displayFooter(false);
  };

  return (
    <Container
      className={cx(FlexCenter, myComment ? Delete : Report)}
      onClick={myComment ? handleDelete : handleReport}>
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
