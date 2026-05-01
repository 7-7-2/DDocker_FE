import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { css } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align } from '@/styles/layout';
import { Transition, CaffeineDetail } from '@/styles/styles';

const PostSocialCount = ({
  count,
  icon,
  size,
  onClick
}: {
  count: number;
  icon: string;
  size?: string;
  onClick?: () => void | ((postId: string) => void);
}) => {
  const iconSize = size ? '20' : undefined;
  return (
    <Container className={Align}>
      <div
        className={icon.includes('like') ? Transition : ''}
        onAnimationStart={onClick}>
        <Icon {...iconPropsGenerator(icon, iconSize)} />
      </div>
      <Count className={!size ? CaffeineDetail : SearchStyle}>{count}</Count>
    </Container>
  );
};

const Container = styled.div`
  gap: 4px;
`;

const Count = styled.span`
  width: fit-content;
  text-align: end;
`;

const SearchStyle = css`
  font-size: var(--font-sizes-xs);
  color: var(--colors-mid-grey);
  line-height: 20px;
  width: fit-content;
`;

export default PostSocialCount;
