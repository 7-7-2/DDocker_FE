import MiniProfile from '@/components/common/MiniProfile';
import { SimplifyUser } from '@/types/types';
import { Align, Between } from '@/styles/layout';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import { useNavigate } from 'react-router-dom';
import { useSetHistory } from '@/hooks/useSetHistory';
import { memo } from 'react';

interface SearchList {
  users: SimplifyUser[];
}

const SearchListItem = memo(({ users }: SearchList) => {
  const navigate = useNavigate();
  const { mutate } = useSetHistory();
  const handleToProfile = (userId: string, user: SimplifyUser) => () => {
    mutate(user);
    navigate(userId);
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
    </>
  );
});

const Container = styled.div`
  margin: 10px 0;
`;
export default SearchListItem;
