import { useRecoilValue } from 'recoil';
import { searchKeywordState, searchResultsState } from '@/atoms/atoms';
import Icon from '@/components/common/Icon';
import MiniProfile from '@/components/common/MiniProfile';
import { SEARCH_TEXTS } from '@/constants/search';
import { SimplifyUser } from '@/types/types';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { Align, Between, Flex } from '@/styles/layout';
import { RecentSearch, DeleteAllBtn } from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

// Feat: 검색 필터링 clear
// Feat: Delete 기능 추가해야함

const SearchListItem: React.FC<{ users: SimplifyUser[] }> = ({ users }) => {
  const inputValue = useRecoilValue(searchKeywordState);
  const searchResults = useRecoilValue(searchResultsState);

  const filteredResults = searchResults.filter(
    user => user.NickName?.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleDeleteAll = () => {
    console.log('1');
  };
  const handleInUsers = () => {
    console.log('1');
  };
  const handleDeleteBtn = () => {
    console.log('2');
  };

  return (
    <>
      {filteredResults.length > 0 && !inputValue && (
        <Wrapper className={cx(Flex, Align, Between)}>
          <span className={RecentSearch}>{SEARCH_TEXTS.recentSearch}</span>
          <span
            className={DeleteAllBtn}
            onTouchEnd={handleDeleteAll}>
            {SEARCH_TEXTS.deleteAllBtn}
          </span>
        </Wrapper>
      )}
      {filteredResults.map(({ userId, NickName, caffeine }: SimplifyUser) => (
        <Container
          key={userId}
          className={cx(Flex, Align, Between)}>
          <div onTouchEnd={handleInUsers}>
            <MiniProfile
              userId={userId}
              NickName={NickName}
              caffeine={caffeine}
            />
          </div>
          <div
            className={Flex}
            onTouchEnd={handleDeleteBtn}>
            <Icon {...iconPropsGenerator('cancel', '24')} />
          </div>
        </Container>
      ))}
    </>
  );
};

const Container = styled.div`
  margin: 10px 0;
`;
const Wrapper = styled.div`
  padding: 20px 0;
`;
export default SearchListItem;
