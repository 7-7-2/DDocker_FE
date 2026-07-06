import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Medium, Semibold } from '@/styles/styles';
import { Align, Between, Flex } from '@/styles/layout';

export const Option = ({
  icon,
  option,
  onClick,
  type
}: {
  option: string;
  onClick: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void);
  icon?: string;
  type?: string;
}) => {
  const leftIcon = type === 'left';

  return (
    <button
      className={cx(Flex, Align, Between)}
      value={option}
      onClick={onClick}>
      <div>
        {icon && !leftIcon && <Icon {...iconPropsGenerator(`${icon}`)} />}
        <OptionText className={cx(!leftIcon ? Medium : Semibold)}>
          {option}
        </OptionText>
      </div>
      {icon && leftIcon && <Icon {...iconPropsGenerator(`${icon}`)} />}
    </button>
  );
};

const OptionText = styled.span`
  font-size: var(--font-sizes-base);
  line-height: 22px;
  padding-left: 12px;
`;
