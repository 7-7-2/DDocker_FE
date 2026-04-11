import { useToggle } from '@/hooks/post/useToggle';
import CommentProto from '@/components/post/CommentProto';
import CheckReply from '@/components/post/CheckReply';
import Replies from '@/components/post/Replies';
import { CommentType } from '@/types/types';

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
  return (
    <>
      <CommentProto
        profileUrl={profileUrl}
        nickname={nickname}
        content={content}
        createdAt={createdAt}
        postNum={postNum}
        id={id}
        userId={userId}
      />
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
