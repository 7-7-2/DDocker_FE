import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { BRAND_TEXTS } from '@/constants/texts';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Column } from '@/styles/layout';

const Tooltip = ({ anchor }: { anchor: number }) => {
  const anchorPoint = { left: `${anchor / 2 - 10}px` };

  return (
    <>
      <TooltipContainer
        className={cx(Column, Align)}
        style={anchorPoint}>
        <Icon {...iconPropsGenerator('toolTip-tail', '16')} />
        <TextBox>
          <span>{BRAND_TEXTS.tooltip}</span>
        </TextBox>
      </TooltipContainer>
    </>
  );
};
const TextBox = styled.div`
  position: relative;
  top: -6px;
  width: 205px;
  height: 60px;
  padding: 10px 14px;
  border-radius: 6px;
  background-color: #fff;
  color: var(--color-main-dark);
`;
const TooltipContainer = styled.div`
  position: absolute;
  top: 151px;
  z-index: 200;
  filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.15));
`;

export default Tooltip;
