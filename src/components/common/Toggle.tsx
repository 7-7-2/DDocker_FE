import { MouseEventHandler } from 'react';

import { styled } from 'styled-system/jsx';
import { ToggleActiveColor, ToggleActiveState } from '@/styles/styles';

const Toggle = ({
  toggleState,
  onClick
}: {
  toggleState: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <ToggleContainer className={toggleState ? ToggleActiveColor : undefined}>
      <ToggleBtn
        className={toggleState ? ToggleActiveState : undefined}
        onClick={onClick}
      />
    </ToggleContainer>
  );
};

const ToggleContainer = styled.div`
  position: relative;
  width: 46px;
  height: 26px;
  background-color: #ddd;
  margin-top: 18px;
  border-radius: 60px;
`;

const ToggleBtn = styled.button`
  width: 22px;
  height: 22px;
  margin: 2px;
  border-radius: 50px;
  background-color: #fff;
`;

export default Toggle;
