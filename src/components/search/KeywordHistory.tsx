import Icon from '@/components/common/Icon';
import { FlexCenter } from '@/styles/layout';
import { LineH18, Semibold } from '@/styles/styles';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { css, cx } from 'styled-system/css';
import { useContext } from 'react';
import { SearchContext } from '@/context/contexts';

const KeywordHistory = ({ keyword }: { keyword: string }) => {
  const { setSearch } = useContext(SearchContext);
  const handleSearchKeyword = () => {
    setSearch(keyword);
  };

  return (
    <div className={FlexCenter}>
      <div
        className={cx(Container, FlexCenter)}
        onClick={handleSearchKeyword}>
        <Icon {...iconPropsGenerator('search', '24')} />
      </div>
      <span
        className={cx(Keyword, LineH18, Semibold)}
        onClick={handleSearchKeyword}>
        {keyword}
      </span>
    </div>
  );
};

const Container = css`
  min-width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--colors-border-grey);
`;

const Keyword = css`
  padding-left: 12px;
  color: var(--colors-main-dark);

  font-size: var(--font-sizes-sm);
`;

export default KeywordHistory;
