import MiniProfile from '@/components/common/MiniProfile';
import { TEXT } from '@/constants/texts';
import { SimplifyUser } from '@/types/types';
import { FlexCenter, Between, LineH18, Cursor } from '@/styles/layout';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const UserListItem: React.FC<{ users: SimplifyUser[] }> = ({ users }) => {
  return (
    <>
      {users.map(({ userId, NickName, caffeine }: SimplifyUser) => (
        <Container
          key={userId}
          className={cx(FlexCenter, Between)}>
          <MiniProfile
            userId={userId}
            NickName={NickName}
            caffeine={caffeine}
          />
          <DeleteBtn className={cx(Cursor, LineH18)}>
            {TEXT.deleteBtn}
          </DeleteBtn>
        </Container>
      ))}
    </>
  );
};

const Container = styled.div`
  margin: 10px 13px;
`;
const DeleteBtn = styled.button`
  width: 50px;
  height: 30px;
  border-radius: 6px;
  background-color: var(--colors-tertiary);
  font-size: var(--font-sizes-xs);
  font-weight: 500;
`;

export default UserListItem;
