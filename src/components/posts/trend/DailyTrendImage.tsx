import Icon from '@/components/common/Icon';
import { styled } from 'styled-system/jsx';

const DailyTrendImage = ({ src }: { src: string }) => {
  return (
    <Container>
      <Image src={src} />
    </Container>
  );
};

const Image = styled.img`
  border-radius: 16px;
  margin-bottom: 14px;
  min-width: 162px;
  height: 118px;
`;

const Container = styled.div`
  position: relative;
`;

export default DailyTrendImage;
