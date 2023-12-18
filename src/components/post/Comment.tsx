import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { styled } from 'styled-system/jsx';
import { Flex, Column } from '@/styles/layout';

// 하드코딩 텍스트 데이터로 변경예정
const Comment = () => {
  return (
    <Container className={Flex}>
      <Icon {...iconPropsGenerator('comment-default', '36')} />
      <CommentDetail className={Column}>
        <UserName>프리한 프리지아</UserName>
        <CommentText>커피 ㄲ</CommentText>
        <OnComment className={Flex}>
          <CommentedAt>23분 전</CommentedAt>
          <Reply>답글 달기</Reply>
        </OnComment>
      </CommentDetail>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 12px;
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

export default Comment;
