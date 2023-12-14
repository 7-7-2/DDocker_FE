import MiniProfile from '@/components/common/MiniProfile';
import { UserProfile } from '@/types/types';
import { FlexCenter } from '@/styles/layout';
import { styled } from 'styled-system/jsx';

const UserListItem: React.FC<{ users: UserProfile[] }> = ({ users }) => {
  // map 이 들어갈 자리
  return (
    <>
      {users.map(({ id, loginName, cafein }: UserProfile) => (
        <Container
          key={id}
          className={FlexCenter}>
          <MiniProfile
            loginName={loginName}
            cafein={cafein}
          />
          <DeleteBtn>삭제</DeleteBtn>
        </Container>
      ))}
    </>
  );
};

export default UserListItem;

const Container = styled.div`
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 13px;
`;

const DeleteBtn = styled.button`
  width: 50px;
  height: 30px;
  border-radius: 6px;
  background-color: var(--colors-tertiary);
  font-size: var(--font-sizes-xs);
  font-weight: 500;
  line-height: 20px;
`;
