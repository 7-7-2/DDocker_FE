import Icon from '@/components/common/Icon';
import {
  userName,
  userNickName,
  userEmail,
  addedCoffee,
  brand
} from '@/constants/Profile';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { Flex, FlexCenter } from '@/styles/layout';
import { styled } from 'styled-system/jsx';

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
          <Icon {...iconPropsGenerator('brand')} />
          <TextArea>{brand.brand1}</TextArea>
        </UserBrand>
        <UserSubTitle className={Flex}>
          <Icon {...iconPropsGenerator('coffeebean')} />
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
  border: 1px solid var(--colors-tertiary);
  padding: 5px 12px 5px 5px;
  color: var(--colors-tertiary);
  font-size: var(--font-sizes-xs);
  font-weight: 500;
  border-radius: 16px;
  background-color: var(--colors-sub);
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
