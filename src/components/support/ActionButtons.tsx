import Button from '@/components/common/Button';
import { ACTION_BTN_TEXTS, SUPPORT_TEXTS } from '@/constants/support';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Flex } from '@/styles/layout';
import { BtnColorWhite, DisabledBtn, RegistBtn } from '@/styles/styles';

const btn = ACTION_BTN_TEXTS;
const { type: tos } = SUPPORT_TEXTS.termsOfService;

const ActionButtons = ({
  type,
  handleOnClick
}: {
  type: string;
  handleOnClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <BtnsContainer className={Flex}>
      <Button
        text={btn.print}
        className={RegistBtn}
        onClick={handleOnClick}
      />
      <Button
        text={type === tos ? btn.navBtn[0] : btn.navBtn[1]}
        className={cx(RegistBtn, DisabledBtn)}
      />
    </BtnsContainer>
  );
};

const BtnsContainer = styled.div`
  margin: 16px 0;
  gap: 6px;
`;

export default ActionButtons;
