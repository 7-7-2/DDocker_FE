import React from 'react';
import { useId } from 'react';
import { useQuery } from '@tanstack/react-query';
import Comment from '@/components/post/Comment';
import { getComments } from '@/api/post';
import { styled } from 'styled-system/jsx';
import { COMMENT_TEXTS, POST_TEXTS } from '@/constants/texts';
import { PaddingTB60 } from '@/styles/styles';
import { CommentType } from '@/types/types';

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
                  created_at={comment.created_at}
                  reply_count={comment.reply_count}
                  postNum={postNum}
                  id={comment.id}
                  public_id={comment.public_id}
                />
              </React.Fragment>
            ))}
        </Container>
      )}
      {commentData && commentData.data.length === 0 && (
        <div className={PaddingTB60}>
          <CTA
            btn={false}
            text={POST_TEXTS.noComments}
          />
        </div>
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

export default PostComments;
