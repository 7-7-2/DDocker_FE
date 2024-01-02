import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { styled } from 'styled-system/jsx';
import { Flex, Column } from '@/styles/layout';
import { CommnetUser, CaffeineDetail, TextArea } from '@/styles/styles';
import { cx } from 'styled-system/css';

// 하드코딩 텍스트 데이터로 변경예정
const Comment = () => {
  return (
    <Container className={Flex}>
      <Icon {...iconPropsGenerator('comment-default', '36')} />
      <CommentDetail className={Column}>
        <div className={CommnetUser}>프리한 프리지아</div>
        <div className={CaffeineDetail}>커피 ㄲ</div>
        <OnComment className={cx(Flex, TextArea)}>
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

const OnComment = styled.div`
  color: #a6a6a6;
`;

const CommentedAt = styled.div``;

const Reply = styled.div`
  padding-left: 12px;
`;

export default Comment;
