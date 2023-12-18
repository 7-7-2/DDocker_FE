import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import { Align, Flex } from '@/styles/layout';

const PostSocialCount = ({ count, icon }: { count: number; icon: string }) => {
  return (
    <Container className={cx(Flex, Align)}>
      <Icon {...iconPropsGenerator(icon)}></Icon>
      <Count>{count}</Count>
    </Container>
  );
};

const Container = styled.div`
  gap: 4px;
  padding-right: 4px;
`;

const Count = styled.span`
  font-size: var(--font-sizes-sm);
  width: 22px;
`;

export default PostSocialCount;
