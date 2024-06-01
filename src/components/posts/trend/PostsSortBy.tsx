import { TREND_TEXTS } from '@/constants/texts';
import { Semibold } from '@/styles/styles';
import { css, cx } from 'styled-system/css';

const PostsSortBy = ({
  sort,
  setSort
}: {
  sort: boolean;
  setSort: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const sortPopular = () => {
    setSort(false);
  };
  const sortRecent = () => {
    setSort(true);
  };

  return (
    <div className={Container}>
      <span
        className={sort ? Candidate : cx(Selected, Semibold)}
        onClick={sortPopular}>
        {TREND_TEXTS.popularity}
      </span>

      <span className={Candidate}>{TREND_TEXTS.divide}</span>

      <span
        className={sort ? cx(Selected, Semibold) : Candidate}
        onClick={sortRecent}>
        {TREND_TEXTS.latest}
      </span>
    </div>
  );
};

const Container = css`
  font-size: var(--font-sizes-xs);
  line-height: var(--font-sizes-xl);
  padding-bottom: 12px;
  margin-top: 28px;
  align-self: center;
  padding-right: 9px;
`;

const Selected = css`
  color: var(--colors-main);
`;
const Candidate = css`
  color: var(--colors-mid-grey);
`;
export default PostsSortBy;
