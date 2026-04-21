import FavoriteMenuItem from '@/components/post/postRegister/FavoriteMenuItem';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Flex } from '@/styles/layout';
import { useFavoriteMenu } from '@/hooks/post/useFavoriteMenu';
import { MouseEventHandler } from 'react';

const FavoriteMenuTab = ({
  type,
  backInitialTab
}: {
  type?: boolean;
  backInitialTab?: () => void;
}) => {
  const { res, deleteFavMenu } = useFavoriteMenu();

  // 삭제
  const deleteItem: MouseEventHandler<HTMLButtonElement> = e => {
    const id = Number(e.currentTarget.value);
    deleteFavMenu(id);
  };

  return (
    <Container className={cx(Flex)}>
      {res?.map(item => (
        <FavoriteMenuItem
          key={item.id}
          itemData={item}
          backInitialTab={backInitialTab}
          deleteItem={deleteItem}
          type={type ? true : false}
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
