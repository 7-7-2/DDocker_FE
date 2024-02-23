import { styled } from 'styled-system/jsx';
import { Flex, Column } from '@/styles/layout';
import { COMMENT_TEXTS } from '@/constants/texts';

import ImgContainer from '@/components/common/ImgContainer';
import timestampToDate from '@/utils/timestampToDate';
import { CommentProto } from '@/types/types';

const { reply } = COMMENT_TEXTS;

const CommentProto = ({
  comment = true,
  profileUrl,
  nickname,
  content,
  created_at
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
            {comment && <Reply>{reply}</Reply>}
          </OnComment>
        </CommentDetail>
      </Container>
    </>
  );
};
const Container = styled.div`
  /* padding-top: 12px; */
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
  color: #a6a6a6;
`;

const CommentedAt = styled.div``;

const Reply = styled.div`
  padding-left: 12px;
`;

export default CommentProto;

// 1. 댓글/답글 공통 사용 컴포넌트
// 2. comment : boolean => SHOW/HIDE 답글 달기
// 3. PRESENTATIONAL

//1. Comment => CommentProto를 Mapping하며 CheckReply를 덧붙임
//2. CommentProto => 개별 글 내용만 PRESENTATIONAL
//3. CheckReply => 답글 TOGGLE 및 답글(CommentProto를 Mapping)을 소유

/* {
  comment && CHECKREPLY => 
  CHECKREPLY는 
  1. replies(data, ueseQuery hook), 
  2. reply_count(props), 
  3. replies(hook state)를 보유
    } */
