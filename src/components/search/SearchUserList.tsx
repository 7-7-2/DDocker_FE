import { memo, lazy, useState, Suspense } from 'react';

import MiniProfile from '@/components/common/MiniProfile';

import { useSetHistory } from '@/hooks/search/useSetHistory';
import { SimplifyUser, SearchUserListProps } from '@/types/types';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Between } from '@/styles/layout';
import { SEARCH_TEXTS } from '@/constants/search';

const SearchMore = lazy(() => import('@/components/search/SearchMore'));
const SearchMoreList = lazy(() => import('@/components/search/SearchMoreList'));

const SearchUserList = memo(({ users, search }: SearchUserListProps) => {
  const [loadMore, setLoadMore] = useState(false);
  const { mutate, mutateSearchText } = useSetHistory();
  const handleAddUserHistory = (user: SimplifyUser) => () => {
    mutate(user);
  };
  const handleSearchMore = () => () => {
    setLoadMore(true);
    // mutateHistory(user);
    mutateSearchText(search);
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
                caffeineSum={user.caffeineSum}
                userId={user.userId}
                mini={true}
              />
            </div>
          </Container>
        ))}
      {users.length == 5 && !loadMore && (
        <Suspense>
          {/* <SearchMore onClick={handleSearchMore({ keyword: search })} /> */}
          <SearchMore onClick={handleSearchMore} />
        </Suspense>
      )}
      {loadMore && (
        <Suspense>
          <SearchMoreList
            search={search}
            type={SEARCH_TEXTS.tabs[1]}
            initialCursor={
              users.length > 0
                ? btoa(
                    `${users[users.length - 1].nickname}:${users[users.length - 1].userId}`
                  )
                : null
            }
          />
        </Suspense>
      )}
    </>
  );
});

const Container = styled.div`
  margin: 20px 0;
`;
export default SearchUserList;
