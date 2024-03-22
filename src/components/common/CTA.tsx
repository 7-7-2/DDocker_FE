import Button from '@/components/common/Button';
import { Center, Column } from '@/styles/layout';
import { LoginBtn, Medium } from '@/styles/styles';
import { css, cx } from 'styled-system/css';

interface CTA {
  text: string;
  actionText: string;
  btn?: boolean;
  fn: () => void;
}

const CTA = ({ text, actionText, btn = true, fn }: CTA) => {
  return (
    <div className={cx(Container, Column, Center)}>
      <span className={Text}>{text}</span>
      {btn && (
        <Button
          className={cx(LoginBtn, BTN)}
          text={actionText}
          onTouchEnd={fn}
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
