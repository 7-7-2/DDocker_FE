import MiniProfile from '@/components/common/MiniProfile';
import Icon from '@/components/common/Icon';
import KeywordHistory from '@/components/search/KeywordHistory';

import { useSetHistory } from '@/hooks/search/useSetHistory';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { SimplifyUser } from '@/types/types';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Between, Flex } from '@/styles/layout';

const HistoryList = ({ cachedHistory }: { cachedHistory: SimplifyUser[] }) => {
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
        cachedHistory.map((item: any) =>
          item.userId ? (
            <Container
              key={item.userId}
              className={cx(Align, Between)}>
              <MiniProfile
                url={item.url}
                nickname={item.nickname}
                caffeineSum={item.caffeineSum}
                userId={item.userId}
                mini={true}
              />
              <div
                className={Flex}
                onClick={removeUserHistory(item)}>
                <Icon {...iconPropsGenerator('cancel-search', '18')} />
              </div>
            </Container>
          ) : (
            <Container
              className={cx(Align, Between)}
              key={item.keyword}>
              <KeywordHistory keyword={item} />
              <div
                className={Flex}
                onClick={removeKeywordHistory(item)}>
                <Icon {...iconPropsGenerator('cancel-search', '18')} />
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
