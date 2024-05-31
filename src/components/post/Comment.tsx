import { useToggle } from '@/hooks/post/useToggle';
import CommentProto from '@/components/post/CommentProto';
import CheckReply from '@/components/post/CheckReply';
import Replies from '@/components/post/Replies';
import { CommentType } from '@/types/types';

const Comment = ({
  profileUrl,
  nickname,
  content,
  created_at,
  reply_count,
  postNum,
  id
}: CommentType) => {
  const { toggle, handleToggle } = useToggle();
  return (
    <>
      <CommentProto
        profileUrl={profileUrl}
        nickname={nickname}
        content={content}
        created_at={created_at}
        postNum={postNum}
        id={id}
      />
      <Replies
        replies={toggle}
        commentId={id}
      />
      <CheckReply
        count={reply_count}
        replies={toggle}
        handleShowReplies={handleToggle}
      />
    </>
  );
};

export default Comment;
