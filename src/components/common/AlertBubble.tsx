import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align } from '@/styles/layout';
import { InputFontSm } from '@/styles/styles';

const AlertBubble = ({
  type = null,
  location,
  message
}: {
  type?: string | null;
  location?: number;
  message: JSX.Element | string;
}) => {
  const tailPosition =
    type === 'trends' ? { left: `${location}px` } : { right: '20%' };

  return (
    <AlertBubbleContainer className={cx(Align)}>
      {type !== null && <AlertBubbleTail style={tailPosition} />}
      <Icon {...iconPropsGenerator('message', '15')} />
      <MessageText className={InputFontSm}>{message}</MessageText>
    </AlertBubbleContainer>
  );
};

const AlertBubbleContainer = styled.div`
  position: relative;
  padding: 0 16px;
  margin-top: 10px;
  height: 54px;
  background-color: var(--colors-main);
  color: #fff;
  border-radius: 16px;
`;

const AlertBubbleTail = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  bottom: -7px;
  transform: rotate(45deg);
  background-color: var(--colors-main);
  border-radius: 0 0 4px 0;
`;

const Left = css`
  left: 16%;
`;

const Right = css`
  right: 20%;
`;

const MessageText = styled.div`
  margin-left: 12px;
`;

export default AlertBubble;
