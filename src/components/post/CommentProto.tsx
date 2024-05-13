import React from 'react';
import { styled } from 'styled-system/jsx';
import { Flex, Column } from '@/styles/layout';

import ImgContainer from '@/components/common/ImgContainer';
import timestampToDate from '@/utils/timestampToDate';
import { CommentProto } from '@/types/types';
import Reply from '@/components/post/Reply';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';

const CommentAction = React.lazy(() => import('./CommentAction'));

const CommentProto = ({
  comment = true,
  profileUrl,
  nickname,
  content,
  created_at,
  postNum = '',
  id,
  parentCommentId
}: CommentProto) => {
  console.log('🚀 ~ id:', id);
  const { signedIn } = useGetSignedIn();
  const { userData } = useCachedUserInfo();
  const { nickname: myUsername } = userData;
  const myComment = nickname === myUsername;

  return (
    <>
      <Container className={Flex}>
        <ImgContainer
          url={profileUrl}
          comment={true}
        />
        <CommentDetail className={Column}>
          <UserName>{nickname}</UserName>
          <CommentText>{content}</CommentText>
          <OnComment className={Flex}>
            <CommentedAt>{timestampToDate(created_at)}</CommentedAt>
            {comment && (
              <Reply
                nickname={nickname}
                id={id}
              />
            )}
          </OnComment>
        </CommentDetail>
        {signedIn && (
          <CommentAction
            myComment={myComment}
            comment={comment}
            id={id}
            postNum={postNum}
            parentCommentId={parentCommentId}
          />
        )}
      </Container>
    </>
  );
};
const Container = styled.div`
  padding-bottom: 20px;
  margin-right: -20px;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
`;
const CommentDetail = styled.div`
  padding-left: 8px;
  padding-right: 20px;
  min-width: calc(100% - 36px);
  word-break: keep-all;
  word-wrap: break-word;
  scroll-snap-align: end;
  scroll-snap-stop: always;
`;
const UserName = styled.div`
  font-weight: 600;
  font-size: var(--font-sizes-sm);
  line-height: 22px;
`;

const CommentText = styled.div`
  font-size: var(--font-sizes-sm);
  line-height: 22px;
`;

const OnComment = styled.div`
  font-size: var(--font-sizes-xs);
  line-height: 20px;
  color: var(--colors-subtext);
`;

const CommentedAt = styled.div``;

export default CommentProto;
