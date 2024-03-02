import Icon from '@/components/common/Icon';
import { Align, Flex } from '@/styles/layout';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

export const Option = ({
  icon,
  option,
  onTouchEnd,
  postId
}: {
  icon: string;
  option: string;
  onTouchEnd: () => void;
  postId: string;
}) => {
  return (
    <div className={cx(Flex, Align)}>
      <Icon
        {...iconPropsGenerator(`${icon}`)}
        onTouchEnd={onTouchEnd}
      />
      <OptionText>{option}</OptionText>
    </div>
  );
};

const OptionText = styled.span`
  font-size: var(--font-sizes-sm);
  line-height: 22px;
  padding-left: 12px;
`;
