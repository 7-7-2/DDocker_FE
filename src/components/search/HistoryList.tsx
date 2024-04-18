import { useQuery } from '@tanstack/react-query';
import useGetCacheData from '@/hooks/useGetCacheData';
import MiniProfile from '@/components/common/MiniProfile';
import { styled } from 'styled-system/jsx';
import { Align, Between, Flex } from '@/styles/layout';
import { cx } from 'styled-system/css';
import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { useSetHistory } from '@/hooks/search/useSetHistory';
import { SimplifyUser } from '@/types/types';
import KeywordHistory from '@/components/search/KeywordHistory';

const HistoryList = () => {
  const { data: cachedHistory } = useQuery({
    queryKey: ['cachedHistory'],
    queryFn: () => {
      return useGetCacheData('search', '/user');
    }
  });

  const { remove, removeHistory } = useSetHistory();
  const removeUserHistory = (user: SimplifyUser) => () => {
    remove(user);
  };
  const removeKeywordHistory = (keyword: SimplifyUser) => () => {
    removeHistory(keyword);
  };

  return (
    <>
      {cachedHistory &&
        cachedHistory.cacheData.map((user: any) =>
          user.userId ? (
            <Container
              key={user.userId}
              className={cx(Align, Between)}>
              <MiniProfile
                url={user.url}
                nickname={user.nickname}
                caffeine={user.caffeine}
                userId={user.userId}
              />
              <div
                className={Flex}
                onClick={removeUserHistory(user)}>
                <Icon {...iconPropsGenerator('cancel', '24')} />
              </div>
            </Container>
          ) : (
            <Container
              className={cx(Align, Between)}
              key={user.keyword}>
              <KeywordHistory keyword={user.keyword} />
              <div
                className={Flex}
                onClick={removeKeywordHistory(user)}>
                <Icon {...iconPropsGenerator('cancel', '24')} />
              </div>
            </Container>
          )
        )}
    </>
  );
};
const Container = styled.div`
  margin: 20px 0;
`;

export default HistoryList;
