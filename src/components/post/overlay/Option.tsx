import Icon from '@/components/common/Icon';
import { Align, Flex } from '@/styles/layout';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

export const Option = ({
  icon,
  option,
  onClick
}: {
  icon: string;
  option: string;
  onClick:
    | (() => void)
    | ((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void);
}) => {
  return (
    <div className={cx(Flex, Align)}>
      <Icon
        {...iconPropsGenerator(`${icon}`)}
        onClick={onClick}
      />
      <OptionText onClick={onClick}>{option}</OptionText>
    </div>
  );
};

const OptionText = styled.span`
  font-size: var(--font-sizes-sm);
  line-height: 22px;
  padding-left: 12px;
`;
