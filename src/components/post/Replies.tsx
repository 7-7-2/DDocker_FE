import { useId } from 'react';
import { useQuery } from '@tanstack/react-query';

import Icon from '@/components/common/Icon';
import CommentProto from '@/components/post/CommentProto';

import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { getReply } from '@/api/post';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Reply } from '@/types/types';
import { Between, Flex } from '@/styles/layout';

const Replies = ({
  replies,
  commentId,
  postNum,
  handleOnClickReply
}: {
  replies: boolean;
  commentId: number;
  postNum: string;
  handleOnClickReply: (commentId: number, replyId: number) => void;
}) => {
  const id = useId();
  const { data: replyList } = useQuery({
    queryKey: ['replyList', commentId],
    queryFn: () => {
      return getReply(commentId);
    },
    enabled: !!commentId && !!replies
  });

  return (
    <Container>
      {replies &&
        replyList &&
        replyList.data.map((reply: Reply, idx: number) => (
          <div
            key={id + idx}
            className={cx(Flex, Between)}>
            <CommentProto
              profileUrl={reply.profileUrl}
              nickname={reply.nickname}
              content={reply.content}
              createdAt={reply.createdAt}
              id={reply.id}
              comment={false}
              postNum={postNum}
              parentCommentId={commentId}
              userId={reply.userId}
            />
            <button
              className={Flex}
              onClick={() => handleOnClickReply(commentId, reply.id)}>
              <Icon {...iconPropsGenerator('action-comment', '18')} />
            </button>
          </div>
        ))}
    </Container>
  );
};

const Container = styled.div`
  padding-left: 44px;
`;

export default Replies;
