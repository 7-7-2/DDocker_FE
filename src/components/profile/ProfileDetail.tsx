import { styled } from 'styled-system/jsx';
import { userName, addedCoffee, brand } from '@/constants/Profile';
import { Flex } from '@/styles/layout';

const ProfileDetail = () => {
  return (
    <>
      <UserTitle className={Flex}>{userName.loginName}</UserTitle>
      <Info className={Flex}>
        <UserSubTitle className={Flex}>
          카페인 누적 {addedCoffee.cafein}mg
        </UserSubTitle>
        <UserBrand className={Flex}>{brand.brand1}</UserBrand>
      </Info>
    </>
  );
};

export default ProfileDetail;

const UserTitle = styled.span`
  width: 200px;
  color: var(--colors-main);
  font-weight: 700;
  margin-top: 22px;
`;

const Info = styled.div`
  justify-content: space-between;
  flex-direction: row;
`;

const UserSubTitle = styled.span`
  width: 200px;
`;
const UserBrand = styled.span`
  width: 100px;
  justify-content: flex-end;
  color: var(--colors-sub);
  font-weight: 700;
`;
