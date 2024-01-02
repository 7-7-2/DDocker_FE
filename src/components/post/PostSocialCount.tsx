import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { styled } from 'styled-system/jsx';
import { Align } from '@/styles/layout';
import { CaffeineDetail } from '@/styles/styles';

const PostSocialCount = ({ count, icon }: { count: number; icon: string }) => {
  return (
    <Container className={Align}>
      <Icon {...iconPropsGenerator(icon)}></Icon>
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
`;

export default PostSocialCount;
