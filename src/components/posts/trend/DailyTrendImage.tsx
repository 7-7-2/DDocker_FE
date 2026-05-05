import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { styled } from 'styled-system/jsx';
import { useLikeOnPost } from '@/hooks/post/useLikeOnPost';
import { Transition } from '@/styles/styles';

const DailyTrendImage = ({
  src,
  onClick
}: {
  src: string;
  onClick: () => void;
}) => {
  return (
    <Image
      src={src}
      onClick={onClick}
    />
  );
};

const Image = styled.img`
  object-fit: cover;
  border-radius: 6px;
  height: 64px;
  width: 64px;
`;

export default DailyTrendImage;
