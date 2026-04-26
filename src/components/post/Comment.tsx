import CommentProto from '@/components/post/CommentProto';
import CheckReply from '@/components/post/CheckReply';
import Replies from '@/components/post/Replies';
import Icon from '@/components/common/Icon';
import CommentActionModal from '@/components/post/CommentActionModal';

import { useToggle } from '@/hooks/post/useToggle';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { useCommentAction } from '@/hooks/post/useCommentAction';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { CommentType } from '@/types/types';

import { cx } from 'styled-system/css';
import { Between, Flex } from '@/styles/layout';

const Comment = ({
  profileUrl,
  nickname,
  content,
  createdAt,
  replyCount,
  postNum,
  id,
  userId
}: CommentType) => {
  const { toggle, handleToggle } = useToggle();
  const { userId: myId } = useCachedUserInfo();
  const myComment = userId === myId;
  const {
    isActionModal,
    handleActionModal,
    handleOnClickComment,
    handleDelete,
    handleReport
  } = useCommentAction();

  return (
    <>
      {isActionModal && (
        <CommentActionModal
          myComment={myComment}
          handleActionModal={handleActionModal}
          handleDelete={handleDelete}
          handleReport={handleReport}
        />
      )}

      <div className={cx(Flex, Between)}>
        <CommentProto
          profileUrl={profileUrl}
          nickname={nickname}
          content={content}
          createdAt={createdAt}
          postNum={postNum}
          id={id}
          userId={userId}
        />
        <button
          value={id}
          className={Flex}
          onClick={e => {
            handleOnClickComment(e);
            handleActionModal();
          }}>
          <Icon {...iconPropsGenerator('action-comment', '18')} />
        </button>
      </div>
      <Replies
        replies={toggle}
        commentId={id}
        postNum={postNum}
      />
      <CheckReply
        count={replyCount}
        replies={toggle}
        handleShowReplies={handleToggle}
      />
    </>
  );
};

export default Comment;
