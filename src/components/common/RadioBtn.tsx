import { MouseEventHandler } from 'react';

import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Medium } from '@/styles/styles';
import { Align, Flex } from '@/styles/layout';

const RadioBtn = ({
  option,
  selectedOption,
  selectIntensityOption
}: {
  option: string;
  selectedOption?: string | undefined;
  selectIntensityOption?: MouseEventHandler<HTMLButtonElement>;
}) => {
  const iconProps = selectedOption === option ? 'radio:active' : 'radio';

  return (
    <RadioContainer
      className={cx(Flex, Align, Medium)}
      onClick={selectIntensityOption}
      value={option}>
      <Icon {...iconPropsGenerator(`${iconProps}`, '20')} />
      {option}
    </RadioContainer>
  );
};
const RadioContainer = styled.button`
  gap: 6px;
  font-size: var(--font-sizes-sm);
  line-height: 22px;
`;

export default RadioBtn;
