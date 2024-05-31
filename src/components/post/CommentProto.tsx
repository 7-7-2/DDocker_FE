import React, { useState } from 'react';
import { styled } from 'styled-system/jsx';
import { Flex, Column } from '@/styles/layout';

import ImgContainer from '@/components/common/ImgContainer';
import timestampToDate from '@/utils/timestampToDate';
import { CommentPrototype } from '@/types/types';
import Reply from '@/components/post/Reply';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { useDetectSlide } from '@/hooks/post/useDetectSlide';
import { useSetRecoilState } from 'recoil';
import { commentState } from '@/atoms/atoms';
import { useIntersection } from '@/hooks/useIntersection';
import NoProfileImg from '@/components/common/NoProfileImg';

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
}: CommentPrototype) => {
  const { signedIn } = useGetSignedIn();
  const { userData } = useCachedUserInfo();
  const { nickname: myUsername } = userData;
  const myComment = nickname === myUsername;
  const [profile, setProfile] = useState(profileUrl);
  const handleImgError = () => setProfile('');

  const setSelectedComment = useSetRecoilState(commentState);
  const { scrollRef, setIsIntersected, isIntersected } = useDetectSlide(
    comment,
    id
  );

  const ref = useIntersection(
    (entry, observer) => {
      if (!isIntersected) {
        setIsIntersected(true);
        setSelectedComment({
          comment,
          commentId: id
        });
        observer.unobserve(entry.target);
      }
    },
    {
      threshold: 1
    }
  );

  return (
    <>
      <Container className={Flex}>
        {profile && (
          <ImgContainer
            url={profile}
            comment={true}
          />
        )}
        {!profile && (
          <NoProfileImg
            onClick={handleImgError}
            comment={true}
          />
        )}
        <CommentDetail
          className={Column}
          ref={scrollRef}>
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
          <>
            <Target ref={ref} />
            <CommentAction
              myComment={myComment}
              comment={comment}
              id={id}
              postNum={postNum}
              parentCommentId={parentCommentId}
            />
          </>
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

const Target = styled.div`
  padding: 1px;
`;

export default CommentProto;
