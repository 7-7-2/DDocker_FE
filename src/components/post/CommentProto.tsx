import { styled } from 'styled-system/jsx';
import { Flex, Column } from '@/styles/layout';

import ImgContainer from '@/components/common/ImgContainer';
import timestampToDate from '@/utils/timestampToDate';
import { CommentProto } from '@/types/types';
import Reply from '@/components/post/Reply';

const CommentProto = ({
  comment = true,
  profileUrl,
  nickname,
  content,
  created_at,
  id
}: CommentProto) => {
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
                id={id}></Reply>
            )}
          </OnComment>
        </CommentDetail>
      </Container>
    </>
  );
};
const Container = styled.div`
  padding-bottom: 20px;
`;
const CommentDetail = styled.div`
  padding-left: 8px;
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
