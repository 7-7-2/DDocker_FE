import { SEARCH_TEXTS } from '@/constants/search';
import { Align, Between } from '@/styles/layout';
import { RecentSearch, DeleteAllBtn } from '@/styles/styles';
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { useSetHistory } from '@/hooks/search/useSetHistory';

const HistoryHeader = () => {
  const { reset } = useSetHistory();
  const emptyHistory = () => reset();
  return (
    <>
      <Wrapper className={cx(Align, Between)}>
        <span className={RecentSearch}>{SEARCH_TEXTS.recentSearch}</span>
        <span
          className={DeleteAllBtn}
          onClick={emptyHistory}>
          {SEARCH_TEXTS.deleteAllBtn}
        </span>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin: 0 0 -10px 0;
  padding: 20px 0;
`;

export default HistoryHeader;
