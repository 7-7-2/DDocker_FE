import { useQuery } from '@tanstack/react-query';
import { getReply } from '@/api/post';
import CommentProto from '@/components/post/CommentProto';
import { Reply } from '@/types/types';
import { styled } from 'styled-system/jsx';
import { useId } from 'react';

const Replies = ({
  replies,
  commentId,
  postNum
}: {
  replies: boolean;
  commentId: number;
  postNum: string;
}) => {
  const { data: replyList } = useQuery({
    queryKey: ['replyList', commentId],
    queryFn: () => {
      return getReply(commentId);
    },
    enabled: !!commentId && !!replies
  });
  const id = useId();

  return (
    <Container>
      {replies && replyList && (
        <>
          {replyList.data.map((reply: Reply, idx: number) => (
            <CommentProto
              profileUrl={reply.profileUrl}
              nickname={reply.nickname}
              content={reply.content}
              createdAt={reply.createdAt}
              id={reply.id}
              comment={false}
              postNum={postNum}
              parentCommentId={commentId}
              key={id + idx}
              userId={reply.userId}
            />
          ))}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding-left: 44px;
`;

export default Replies;
