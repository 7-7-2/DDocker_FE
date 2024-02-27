import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { styled } from 'styled-system/jsx';
import { Align } from '@/styles/layout';
import { CaffeineDetail } from '@/styles/styles';

const PostSocialCount = ({
  count,
  icon,
  onTouchEnd
}: {
  count: number;
  icon: string;
  onTouchEnd?: () => void | ((postId: string) => void);
}) => {
  return (
    <Container className={Align}>
      {}
      <Icon
        {...iconPropsGenerator(icon)}
        onTouchEnd={onTouchEnd}></Icon>
      <Count className={CaffeineDetail}>{count}</Count>
    </Container>
  );
};

const Container = styled.div`
  gap: 4px;
  padding-right: 4px;
`;

const Count = styled.span`
  width: 22px;
  line-height: 22px;
  align-self: end;
`;

export default PostSocialCount;
