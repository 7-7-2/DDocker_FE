import MiniProfile from '@/components/common/MiniProfile';
import { SimplifyUser, SearchList } from '@/types/types';
import { Align, Between } from '@/styles/layout';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import { useNavigate } from 'react-router-dom';
import { useSetHistory } from '@/hooks/search/useSetHistory';
import { memo, lazy, useState } from 'react';

const SearchMore = lazy(() => import('@/components/search/SearchMore'));
const SearchMoreList = lazy(() => import('@/components/search/SearchMoreList'));

const SearchListItem = memo(({ users, search }: SearchList) => {
  const navigate = useNavigate();
  const [loadMore, setLoadMore] = useState(false);

  const { mutate, mutateHistory } = useSetHistory();
  const handleToProfile = (userId: string, user: SimplifyUser) => () => {
    mutate(user);
    navigate(userId);
  };
  const handleSearchMore = (user: SimplifyUser) => () => {
    setLoadMore(true);
    mutateHistory(user);
  };

  return (
    <>
      {users &&
        users.map((user: SimplifyUser) => (
          <Container
            key={user.userId}
            className={cx(Align, Between)}>
            <MiniProfile
              url={user.url}
              nickname={user.nickname}
              caffeine={user.caffeine}
              onClick={handleToProfile(`/profile/${user.userId}`, user)}
            />
          </Container>
        ))}
      {users.length == 5 && !loadMore && (
        <SearchMore onClick={handleSearchMore({ keyword: search })} />
      )}
      {loadMore && <SearchMoreList search={search} />}
    </>
  );
});

const Container = styled.div`
  margin: 20px 0;
`;
export default SearchListItem;
