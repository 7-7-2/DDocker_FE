import Icon from '@/components/common/Icon';
import MiniProfile from '@/components/common/MiniProfile';
import { SEARCH_TEXTS } from '@/constants/search';
import { SimplifyUser } from '@/types/types';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { Align, Between, Flex } from '@/styles/layout';
import { RecentSearch, DeleteAllBtn } from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

// Feat: 검색 필터링

const SearchListItem: React.FC<{ users: SimplifyUser[] }> = ({ users }) => {
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
      <Wrapper className={cx(Flex, Align, Between)}>
        <span className={RecentSearch}>{SEARCH_TEXTS.recentSearch}</span>
        <span
          className={DeleteAllBtn}
          onTouchEnd={handleDeleteAll}>
          {SEARCH_TEXTS.deleteAllBtn}
        </span>
      </Wrapper>
      {users.map(({ userId, NickName, caffeine }: SimplifyUser) => (
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
