import { MouseEventHandler } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useVerifyModalCTA } from '@/hooks/useVerifyModalCTA';
import { useActionModal } from '@/hooks/post/useActionModal';
import { deleteComment, deleteReply } from '@/api/post';
import { deleteCommentState, deleteReplyState } from '@/atoms/atoms';
import { TOAST_TEXT } from '@/constants/common';

export const useCommentAction = () => {
  const { postId } = useParams();
  const { isModal, setIsModal } = useVerifyModalCTA();
  const { isActionModal, handleActionModal, setIsActionModal } =
    useActionModal();

  // 신고
  const navigate = useNavigate();
  const comment = true;
  const handleReport = () => {
    // navigate(`/report/${postId}`, { state: { comment, id} });
  };

  // 삭제
  const queryClient = useQueryClient();
  const [isDeleteComment, setIsDeleteComment] =
    useRecoilState(deleteCommentState);
  const [isDeleteReply, setIsDeleteReply] = useRecoilState(deleteReplyState);

  const handleDelete = () => {
    mutate();
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
      setIsActionModal(false);
      toast.success(TOAST_TEXT.text.comment, TOAST_TEXT.style);
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
    setIsActionModal(true);
  };

  const handleOnClickReply = (commentId: number, replyId: number) => {
    postId &&
      setIsDeleteReply({
        postId: postId,
        commentId: commentId,
        replyId: replyId
      });
    setIsActionModal(true);
  };

  return {
    isActionModal,
    handleActionModal,
    handleOnClickComment,
    handleOnClickReply,
    handleDelete,
    handleReport
  };
};
