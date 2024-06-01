import { footerShowState } from '@/atoms/atoms';
import Button from '@/components/common/Button';
import { Center, Column } from '@/styles/layout';
import { LoginBtn } from '@/styles/styles';
import { useSetRecoilState } from 'recoil';
import { css, cx } from 'styled-system/css';
import { CTA_TEXTS } from '@/constants/texts';

interface CTA {
  text: string;
  actionText?: string;
  btn?: boolean;
  fn?: () => void;
}

const CTA = ({ text, actionText = '', btn = true, fn }: CTA) => {
  const setFooterState = useSetRecoilState(footerShowState);
  const handleActions = () => {
    actionText !== CTA_TEXTS.followDiscoveryAction &&
      fn &&
      setFooterState(false);
    fn && fn();
  };

  return (
    <div className={cx(Container, Column, Center)}>
      <span className={Text}>{text}</span>
      {btn && actionText && (
        <Button
          className={cx(LoginBtn, BTN)}
          text={actionText}
          onClick={handleActions}
        />
      )}
    </div>
  );
};

const Container = css`
  color: var(--colors-mid-grey);
  font-size: var(--font-sizes-sm);
`;

const Text = css`
  display: block;
  white-space: pre-line;
  text-align: center;
`;

const BTN = css`
  margin-top: var(--font-sizes-base);
`;

export default CTA;
