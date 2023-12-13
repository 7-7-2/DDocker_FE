import Icon from 'components/common/Icon';
import { userNickName, addedCoffee } from '@/constants/Profile';
import { styled } from 'styled-system/jsx';
import { Flex, FlexCenter } from '@/styles/layout';

const MiniProfile = () => {
  return (
    <Container className={Flex}>
      <User className={FlexCenter}>
        <Icon
          id="icon-mini-user"
          size="44"
        />
      </User>
      <OtherUserInfo>
        <UserTitle>{userNickName.loginName1}</UserTitle>
        <UserCafein className={Flex}>
          누적 카페인 {addedCoffee.cafein1}mg
        </UserCafein>
      </OtherUserInfo>
    </Container>
  );
};

export default MiniProfile;

const Container = styled.div`
  flex-direction: row;
`;
const User = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 9999px;
`;
const OtherUserInfo = styled.div`
  flex-direction: column;
  display: inline-block;
`;
const UserTitle = styled.span`
  font-size: var(--font-sizes-sm);
  font-weight: 600;
  line-height: 18px;
`;
const UserCafein = styled.span`
  font-size: var(--font-sizes-xs);
  font-weight: 400;
  line-height: 18px;
`;
