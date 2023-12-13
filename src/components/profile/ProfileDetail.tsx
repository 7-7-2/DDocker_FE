import { styled } from 'styled-system/jsx';
import {
  userName,
  userNickName,
  userEmail,
  addedCoffee,
  brand
} from '@/constants/Profile';
import { Flex, FlexCenter } from '@/styles/layout';
import Icon from '../common/Icon';

const ProfileDetail = () => {
  return (
    <Container className={FlexCenter}>
      <UserTitle className={FlexCenter}>{userNickName.loginName}</UserTitle>
      <UserText className={FlexCenter}>
        <span className={FlexCenter}>{userName.user1}</span>
        <span className={FlexCenter}>{userEmail.eMail}</span>
      </UserText>
      <Info className={FlexCenter}>
        <UserBrand className={Flex}>
          <Icon
            id="icon-brand"
            size="24"
          />
          <TextArea>{brand.brand1}</TextArea>
        </UserBrand>
        <UserSubTitle className={Flex}>
          <Icon
            id="icon-coffeebean"
            size="24"
          />
          <TextArea>카페인 누적 {addedCoffee.cafein}mg</TextArea>
        </UserSubTitle>
      </Info>
    </Container>
  );
};

export default ProfileDetail;

const Container = styled.div`
  flex-direction: column;
  margin-bottom: 16px;
`;

const UserTitle = styled.span`
  width: 200px;
  font-size: var(--font-sizes-xxl);
  font-weight: 700;
  margin: 22px 0px 2px 0px;
`;

const UserText = styled.div`
  flex-direction: row;
  font-size: var(--font-sizes-sm);
  margin-bottom: 16px;
  gap: 4px;
`;
const Info = styled.div`
  justify-content: space-between;
  flex-direction: row;
  gap: 8px;
`;

const UserSubTitle = styled.span`
  width: auto;
  border: 1px solid #ccc;
  padding: 5px 12px 5px 5px;
  color: var(--colors-sub);
  font-size: var(--font-sizes-xs);
  border-radius: 16px;
  background-color: #ccc;
`;

const TextArea = styled.div`
  margin: 3px 0px 3px 0px;
`;
const UserBrand = styled.span`
  width: auto;
  color: var(--colors-tertiary);
  font-size: var(--colors-sub);
  font-weight: 700;
  border: 1px solid;
  border-radius: 16px;
  padding: 5px 12px 5px 5px;
  background-color: #555;
`;
