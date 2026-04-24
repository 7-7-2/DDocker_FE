import { MouseEventHandler } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useVerifyModalCTA } from '@/hooks/useVerifyModalCTA';
import { deleteComment, deleteReply } from '@/api/post';
import {
  deleteCommentState,
  deleteReplyState,
  footerShowState,
  isActionModalState
} from '@/atoms/atoms';

export const useCommentAction = () => {
  const { postId } = useParams();
  const [isDeleteComment, setIsDeleteComment] =
    useRecoilState(deleteCommentState);
  const [isDeleteReply, setIsDeleteReply] = useRecoilState(deleteReplyState);

  const { isModal, setIsModal } = useVerifyModalCTA();
  const [isActionModal, setIsActionMaodal] = useRecoilState(isActionModalState);
  const displayFooter = useSetRecoilState(footerShowState);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleDelete = () => {
    mutate();
  };

  const handleReport = () => {
    // navigate(`/report/${postId}`, { state: { comment, id } });
    displayFooter(false);
  };

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (postId && !isDeleteReply.replyId) {
        await deleteComment(isDeleteComment.postId, isDeleteComment.commentId);
      } else if (postId && isDeleteReply.replyId) {
        await deleteReply(
          isDeleteReply.postId,
          isDeleteReply.replyId,
          isDeleteReply.commentId
        );
      }
    },
    onSuccess: () => {
      setIsModal(!isModal);
      setIsActionMaodal(!isActionModal);
      if (postId) {
        queryClient.invalidateQueries({ queryKey: ['commentData', postId] });
        queryClient.invalidateQueries({
          queryKey: ['socialCounts', postId]
        });
      } else if (postId && isDeleteReply.replyId) {
        queryClient.invalidateQueries({
          queryKey: ['replyList', isDeleteReply.commentId]
        });
        queryClient.invalidateQueries({
          queryKey: ['socialCounts', postId]
        });
      }
    },
    onError: () => {}
  });

  const handleOnClickComment: MouseEventHandler<HTMLButtonElement> = e => {
    postId &&
      setIsDeleteComment({
        postId: postId,
        commentId: Number(e.currentTarget.value)
      });
    setIsActionMaodal(true);
    displayFooter(false);
  };

  const handleOnClickReply = (commentId: number, replyId: number) => {
    postId &&
      setIsDeleteReply({
        postId: postId,
        commentId: commentId,
        replyId: replyId
      });
    setIsActionMaodal(true);
    displayFooter(false);
  };

  return {
    isActionModal,
    setIsActionMaodal,
    handleOnClickComment,
    handleOnClickReply,
    handleDelete,
    handleReport
  };
};
