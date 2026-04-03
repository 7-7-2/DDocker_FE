import FavoriteMenuItem from '@/components/post/postRegister/FavoriteMenuItem';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Flex } from '@/styles/layout';

// mock-up
const res = [
  {
    caffeine: 243,
    brand: 'ediya',
    productName: '아메리카노',
    size: 'Tall',
    intensity: '기본',
    shot: 0
  },
  {
    caffeine: 111,
    brand: 'starbucks',
    productName: '카페라떼',
    size: 'Tall',
    intensity: '기본',
    shot: 0
  }
];

const FavoriteMenuTab = ({
  backInitialTab
}: {
  backInitialTab: () => void;
}) => {
  // facvorite menu data api
  return (
    <Container className={cx(Flex)}>
      {res.map(item => (
        <FavoriteMenuItem
          itemData={item}
          backInitialTab={backInitialTab}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  flex-direction: column;
  margin-top: 10px;
  gap: 10px;
`;

export default FavoriteMenuTab;
