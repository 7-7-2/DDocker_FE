import MiniProfile from '@/components/common/MiniProfile';
import { Text } from '@/constants/texts';
import { UserProfile } from '@/types/types';
import { FlexCenter, Between, LineH18, Cursor } from '@/styles/layout';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const UserListItem: React.FC<{ users: UserProfile[] }> = ({ users }) => {
  return (
    <>
      {users.map(({ id, loginName, caffeine }: UserProfile) => (
        <Container
          key={id}
          className={cx(FlexCenter, Between)}>
          <MiniProfile
            loginName={loginName}
            caffeine={caffeine}
          />
          <DeleteBtn className={cx(Cursor, LineH18)}>
            {Text.DeleteBtn}
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
