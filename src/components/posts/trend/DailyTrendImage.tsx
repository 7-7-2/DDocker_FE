import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { styled } from 'styled-system/jsx';
import { useLikeOnPost } from '@/hooks/post/useLikeOnPost';
import { Transition } from '@/styles/styles';

const DailyTrendImage = ({
  src,
  onClick,
  postId
}: {
  src: string;
  onClick: () => void;
  postId: string;
}) => {
  const { myLike, handleLikeOnPost } = useLikeOnPost(postId);
  return (
    <Container>
      <Image
        src={src}
        onClick={onClick}
      />
      <IconContainer>
        <div
          className={Transition}
          onAnimationStart={handleLikeOnPost}>
          <Icon
            {...iconPropsGenerator(
              myLike && myLike.success ? 'liked' : 'like-white'
            )}
          />
        </div>
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
