import { MouseEventHandler } from 'react';

import { styled } from 'styled-system/jsx';
import { ToggleActiveColor, ToggleActiveState } from '@/styles/styles';
import { Align } from '@/styles/layout';
import { cx } from 'styled-system/css';

const Toggle = ({
  toggleState,
  onClick
}: {
  toggleState: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <ToggleContainer
      onClick={onClick}
      className={cx(Align, toggleState ? ToggleActiveColor : undefined)}>
      <ToggleBtn className={toggleState ? ToggleActiveState : undefined} />
    </ToggleContainer>
  );
};

const ToggleContainer = styled.button`
  position: relative;
  width: 46px;
  height: 26px;
  background-color: #ddd;
  border-radius: 60px;
`;

const ToggleBtn = styled.div`
  width: 22px;
  height: 22px;
  margin: 2px;
  border-radius: 50px;
  background-color: #fff;
`;

export default Toggle;
