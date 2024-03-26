import React from 'react';
import { useId } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getComments } from '@/api/post';
import Comment from '@/components/post/Comment';
import { styled } from 'styled-system/jsx';
import { COMMENT_TEXTS, POST_TEXTS } from '@/constants/texts';
import { PaddingTB60 } from '@/styles/styles';

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

  const mapComment = (comment: Comment, idx: number) => {
    return (
      <React.Fragment key={id + idx}>
        <Comment
          profileUrl={comment.profileUrl}
          nickname={comment.nickname}
          content={comment.content}
          created_at={comment.created_at}
          reply_count={comment.reply_count}
          id={comment.id}
        />
      </React.Fragment>
    );
  };

  return (
    <>
      {commentData && commentData.data.length !== 0 && (
        <Container>
          <Length>
            {commentCount}
            {count}
          </Length>
          {commentData.data.map(mapComment)}
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
