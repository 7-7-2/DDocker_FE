import { footerShowState } from '@/atoms/atoms';
import Button from '@/components/common/Button';
import { Center, Column } from '@/styles/layout';
import { LoginBtn, Semibold } from '@/styles/styles';
import { useSetRecoilState } from 'recoil';
import { css, cx } from 'styled-system/css';
import { CTA_TEXTS } from '@/constants/texts';
import { styled } from 'styled-system/jsx';

interface CTAprops {
  text: string;
  title?: string;
  actionText?: string;
  btn?: boolean;
  fn?: () => void;
}

const CTA = ({ text, actionText = '', btn = true, fn, title }: CTAprops) => {
  const setFooterState = useSetRecoilState(footerShowState);
  const handleActions = () => {
    actionText !== CTA_TEXTS.followDiscoveryAction &&
      fn &&
      setFooterState(false);
    fn && fn();
  };

  return (
    <Container className={cx(Column, Center)}>
      {title && <Title className={Semibold}>{title}</Title>}
      <Message>{text}</Message>
      {btn && actionText && (
        <Button
          className={cx(LoginBtn, BTN)}
          text={actionText}
          onClick={handleActions}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  color: var(--colors-mid-grey);
  font-size: var(--font-sizes-sm);
`;

const Title = styled.span`
  font-size: var(--font-sizes-base);
  color: var(--colors-mid-dark);
`;

const Message = styled.span`
  display: block;
  white-space: pre-line;
  text-align: center;
`;

const BTN = css`
  margin-top: var(--font-sizes-base);
`;

export default CTA;
