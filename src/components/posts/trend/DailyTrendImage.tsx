import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { styled } from 'styled-system/jsx';

// 1. useMutation => myLike API
// 2. useQuery => myLike API
const DailyTrendImage = ({ src }: { src: string }) => {
  return (
    <Container>
      <Image src={src} />
      <IconContainer>
        <Icon {...iconPropsGenerator('like-white')} />
      </IconContainer>
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

const IconContainer = styled.div`
  position: absolute;
  bottom: 24px;
  right: 10px;
`;

export default DailyTrendImage;
