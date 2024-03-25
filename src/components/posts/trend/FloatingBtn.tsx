import { css, cx } from 'styled-system/css';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import Icon from '@/components/common/Icon';
import { FlexCenter } from '@/styles/layout';

const FloatingBtn = ({
  targetRef
}: {
  targetRef: React.RefObject<HTMLDivElement>;
}) => {
  const toTop = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'center'
      });
    }
  };
  const handleToTop = () => toTop(targetRef);
  return (
    <div className={cx(Round, FlexCenter)}>
      <Icon
        {...iconPropsGenerator('floating-arrow')}
        onClick={handleToTop}
      />
    </div>
  );
};
const Round = css`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  bottom: calc(67px + env(safe-area-inset-bottom));
  right: 20px;
  background-color: var(--colors-main);
  filter: drop-shadow(8px 16px 16px rgba(0, 0, 0, 0.2));
`;
export default FloatingBtn;
