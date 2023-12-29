import MiniProfile from '@/components/common/MiniProfile';
import { TEXT } from '@/constants/texts';
import { SimplifyUser } from '@/types/types';
import { Align, Between } from '@/styles/layout';
import { PaddingT20, DelBtn, Cursor } from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const UserListItem: React.FC<{ users: SimplifyUser[] }> = ({ users }) => {
  return (
    <>
      {users.map(({ userId, NickName, caffeine }: SimplifyUser) => (
        <div
          key={userId}
          className={cx(Align, Between, PaddingT20)}>
          <MiniProfile
            userId={userId}
            NickName={NickName}
            caffeine={caffeine}
          />
          <DeleteBtn className={cx(Cursor, DelBtn)}>{TEXT.deleteBtn}</DeleteBtn>
        </div>
      ))}
    </>
  );
};

const DeleteBtn = styled.button`
  width: 50px;
  height: 30px;
  border-radius: 6px;
  background-color: var(--colors-tertiary);
`;

export default UserListItem;
