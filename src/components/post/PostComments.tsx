import React from 'react';
import { useId } from 'react';
import { useQuery } from '@tanstack/react-query';
import Comment from '@/components/post/Comment';
import { getComments } from '@/api/post';
import { CommentType } from '@/types/types';
import { COMMENT_TEXTS, POST_TEXTS } from '@/constants/texts';
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Center, Column } from '@/styles/layout';

const CTA = React.lazy(() => import('../common/CTA'));
const { count } = COMMENT_TEXTS;

const PostComments = ({
  postNum,
  commentCount
}: {
  postNum: string;
  commentCount: number;
}) => {
  const { data: commentData } = useQuery({
    queryKey: ['commentData', postNum],
    queryFn: () => {
      return getComments(postNum);
    },
    enabled: !!postNum
  });
  const id = useId();

  return (
    <>
      {commentData && commentData.data.length !== 0 && (
        <Container>
          <Length>
            {commentCount}
            {count}
          </Length>
          {commentData &&
            commentData.data.length !== 0 &&
            commentData.data.map((comment: CommentType, idx: number) => (
              <React.Fragment key={id + idx}>
                <Comment
                  profileUrl={comment.profileUrl}
                  nickname={comment.nickname}
                  content={comment.content}
                  createdAt={comment.createdAt}
                  replyCount={comment.replyCount}
                  postNum={postNum}
                  id={comment.id}
                  userId={comment.userId}
                />
              </React.Fragment>
            ))}
        </Container>
      )}
      {commentData && commentData.data.length === 0 && (
        <EmptyCommentContainer className={cx(Column, Center)}>
          <CTA
            btn={false}
            text={POST_TEXTS.noComments}
          />
        </EmptyCommentContainer>
      )}
    </>
  );
};

const Container = styled.div`
  padding-top: 16px;
`;

const Length = styled.div`
  padding-bottom: 12px;
  font-size: var(--font-sizes-sm);
  line-height: 22px;
  color: var(--colors-mid-grey);
`;

const EmptyCommentContainer = styled.div`
  min-height: 140px;
  flex-grow: 1;
`;

export default PostComments;
