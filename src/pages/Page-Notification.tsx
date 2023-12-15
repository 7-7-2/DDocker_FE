import NoticeItem from '@/components/notification/NoticeItem';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { styled } from 'styled-system/jsx';

const Notification = () => {
  useComposeHeader(false, '알림', 'close');
  return (
    <Container>
      <NoticeItem />
      <NoticeItem />
    </Container>
  );
};

const Container = styled.div`
  &:first-child {
    padding-top: 20px;
  }
`;

export default Notification;
