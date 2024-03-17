import { brandState } from '@/atoms/atoms';
import { TREND_TEXTS } from '@/constants/texts';
import { SectionHeader } from '@/styles/styles';
import { useRecoilValue } from 'recoil';
import { css } from 'styled-system/css';

const PostsBrandPopular = () => {
  const selected = useRecoilValue(brandState);
  return (
    <div>
      <h3 className={SectionHeader}>
        <span className={Selected}>{selected}</span>
        {TREND_TEXTS.popular}
      </h3>
    </div>
  );
};
const Selected = css`
  color: var(--colors-main);
`;

export default PostsBrandPopular;
