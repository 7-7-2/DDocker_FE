import { useShowReplies } from '@/hooks/useShowReplies';
import CommentProto from '@/components/post/CommentProto';
import CheckReply from '@/components/post/CheckReply';
import Replies from '@/components/post/Replies';
import { Comment } from '@/types/types';

const Comment = ({
  profileUrl,
  nickname,
  content,
  created_at,
  reply_count,
  id
}: Comment) => {
  const { replies, handleShowReplies } = useShowReplies();
  return (
    <>
      <CommentProto
        profileUrl={profileUrl}
        nickname={nickname}
        content={content}
        created_at={created_at}
      />
      <Replies
        replies={replies}
        commentId={id}
      />
      <CheckReply
        count={reply_count}
        replies={replies}
        handleShowReplies={handleShowReplies}
      />
    </>
  );
};

export default Comment;
