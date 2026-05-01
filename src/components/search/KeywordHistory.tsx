import { useContext } from 'react';
import { SearchContext } from '@/context/contexts';

import Icon from '@/components/common/Icon';

import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { css, cx } from 'styled-system/css';
import { LineH18, Semibold } from '@/styles/styles';
import { FlexCenter } from '@/styles/layout';

const KeywordHistory = ({ keyword }: { keyword: string }) => {
  const { setSearch } = useContext(SearchContext);
  const handleSearchKeyword = () => {
    setSearch(keyword);
  };

  return (
    <div className={FlexCenter}>
      <div
        className={cx(FlexCenter)}
        onClick={handleSearchKeyword}>
        <Icon {...iconPropsGenerator('search-history', '24')} />
      </div>
      <span
        className={cx(Keyword, LineH18, Semibold)}
        onClick={handleSearchKeyword}>
        {keyword}
      </span>
    </div>
  );
};

const Keyword = css`
  padding-left: 6px;
  color: var(--colors-main-dark);
  font-size: var(--font-sizes-sm);
`;

export default KeywordHistory;
