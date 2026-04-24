import { useState } from 'react';

import ImgContainer from '@/components/common/ImgContainer';
import timestampToDate from '@/utils/timestampToDate';
import NoProfileImg from '@/components/common/NoProfileImg';
import Reply from '@/components/post/Reply';

import { useNavigateTo } from '@/hooks/useNavigateTo';
import { CommentPrototype } from '@/types/types';

import { styled } from 'styled-system/jsx';
import { Flex, Column } from '@/styles/layout';

const CommentProto = ({
  comment = true,
  profileUrl,
  nickname,
  content,
  createdAt,
  id,
  userId
}: CommentPrototype) => {
  const [profile, setProfile] = useState(profileUrl);
  const handleImgError = () => setProfile('');
  const toProfilePage = useNavigateTo(`/profile/${userId}`);

  return (
    <>
      <Container className={Flex}>
        {profile && (
          <ImgContainer
            url={profile}
            comment={true}
            onClick={toProfilePage}
            onError={handleImgError}
          />
        )}
        {!profile && (
          <NoProfileImg
            onClick={toProfilePage}
            comment={true}
          />
        )}
        <CommentDetail className={Column}>
          <UserName>{nickname}</UserName>
          <CommentText>{content}</CommentText>
          <OnComment className={Flex}>
            <CommentedAt>{timestampToDate(createdAt)}</CommentedAt>
            {comment && (
              <Reply
                nickname={nickname}
                id={id}
              />
            )}
          </OnComment>
        </CommentDetail>
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
