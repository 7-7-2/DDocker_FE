import Icon from '@/components/common/Icon';
import MiniProfile from '@/components/common/MiniProfile';
import { SEARCH_TEXTS } from '@/constants/search';
import { SimplifyUser } from '@/types/types';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { Align, Between, Flex } from '@/styles/layout';
import { RecentSearch, DeleteAllBtn } from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import { useNavigate } from 'react-router-dom';

interface SearchList {
  users: SimplifyUser[];
  search: string;
}

const SearchListItem = ({ users, search }: SearchList) => {
  const navigate = useNavigate();
  const handleToProfile = (userId: string) => () => navigate(userId);

  return (
    <>
      {/* 1. 검색기록 컴포넌트 => 분리 후 캐시 스토리지*/}
      {users.length > 0 && !search && (
        <Wrapper className={cx(Align, Between)}>
          <span className={RecentSearch}>{SEARCH_TEXTS.recentSearch}</span>
          <span
            className={DeleteAllBtn}
            onTouchEnd={() => {}}>
            {SEARCH_TEXTS.deleteAllBtn}
          </span>
        </Wrapper>
      )}
      {/* 2. 검색값 존재시 검색결과 */}
      {/* 3. 검색값 5개 이상일 시 더보기 버튼 => 무한스크롤 */}
      {users &&
        users.map((user: SimplifyUser) => (
          <Container
            key={user.userId}
            className={cx(Align, Between)}>
            <MiniProfile
              url={user.url}
              nickname={user.nickname}
              caffeine={user.caffeine}
              onClick={handleToProfile(`/profile/${user.userId}`)}
            />
            <div
              className={Flex}
              onTouchEnd={() => {}}>
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
