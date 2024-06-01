import MiniProfile from '@/components/common/MiniProfile';
import { SimplifyUser, SearchList } from '@/types/types';
import { Align, Between } from '@/styles/layout';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import { useSetHistory } from '@/hooks/search/useSetHistory';
import { memo, lazy, useState, Suspense } from 'react';

const SearchMore = lazy(() => import('@/components/search/SearchMore'));
const SearchMoreList = lazy(() => import('@/components/search/SearchMoreList'));

const SearchListItem = memo(({ users, search }: SearchList) => {
  const [loadMore, setLoadMore] = useState(false);

  const { mutate, mutateHistory } = useSetHistory();
  const handleAddUserHistory = (user: SimplifyUser) => () => {
    mutate(user);
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
            <div onClick={handleAddUserHistory(user)}>
              <MiniProfile
                url={user.url}
                nickname={user.nickname}
                caffeine={user.caffeine}
                userId={user.userId}
                mini={true}
              />
            </div>
          </Container>
        ))}
      {users.length == 5 && !loadMore && (
        <Suspense>
          <SearchMore onClick={handleSearchMore({ keyword: search })} />
        </Suspense>
      )}
      {loadMore && (
        <Suspense>
          <SearchMoreList search={search} />
        </Suspense>
      )}
    </>
  );
});

const Container = styled.div`
  margin: 20px 0;
`;
export default SearchListItem;
