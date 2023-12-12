import { styled } from 'styled-system/jsx';
import { userName, addedCoffee, brand } from '@/constants/Profile';

const ProfileDetail = () => {
  return (
    <>
      <UserTitle>{userName.loginName}</UserTitle>
      <Info>
        <UserSubTitle>카페인 누적 {addedCoffee.cafein}mg</UserSubTitle>
        <UserBrand>{brand.brand1}</UserBrand>
      </Info>
    </>
  );
};

export default ProfileDetail;

const UserTitle = styled.span`
  width: 200px;
  color: var(--colors-main);
  font-weight: 700;
  display: flex;
  margin-top: 22px;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const UserSubTitle = styled.span`
  width: 200px;
  display: flex;
`;
const UserBrand = styled.span`
  width: 100px;
  display: flex;
  justify-content: flex-end;
  color: var(--colors-sub);
  font-weight: 700;
`;
