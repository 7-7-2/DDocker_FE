import { useQuery } from '@tanstack/react-query';
import useGetCacheData from '@/hooks/useGetCacheData';
import MiniProfile from '@/components/common/MiniProfile';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-system/jsx';
import { Align, Between, Flex } from '@/styles/layout';
import { cx } from 'styled-system/css';
import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { useSetHistory } from '@/hooks/search/useSetHistory';
import { SimplifyUser } from '@/types/types';

const HistoryList = () => {
  const { data: cachedHistory } = useQuery({
    queryKey: ['cachedHistory'],
    queryFn: () => {
      return useGetCacheData('search', '/user');
    }
  });
  const navigate = useNavigate();
  const handleToProfile = (userId: string) => () => {
    navigate(userId);
  };
  const { remove } = useSetHistory();
  const removeHistory = (user: SimplifyUser) => () => {
    remove(user);
  };

  return (
    <>
      {cachedHistory &&
        cachedHistory.cacheData.map((user: any) => (
          <Container className={cx(Align, Between)}>
            <MiniProfile
              key={user.userId}
              url={user.url}
              nickname={user.nickname}
              caffeine={user.caffeine}
              onClick={handleToProfile(`/profile/${user.userId}`)}
            />
            <div
              className={Flex}
              onClick={removeHistory(user)}>
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

export default HistoryList;
