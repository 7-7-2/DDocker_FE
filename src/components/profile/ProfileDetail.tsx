import Icon from '@/components/common/Icon';
import { TEXT } from '@/constants/texts';
import {
  userName,
  userNickName,
  userEmail,
  addedCoffee,
  brand
} from '@/constants/Profile';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { Between, Column, FlexCenter, Center, Align } from '@/styles/layout';
import { Border16, PrfileTitle, SmStyle, TextArea } from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const ProfileDetail = () => {
  return (
    <Container className={cx(Column, Center)}>
      <UserTitle className={cx(FlexCenter, PrfileTitle)}>
        {userNickName.loginName}
      </UserTitle>
      <UserText className={cx(FlexCenter, SmStyle)}>
        <span>{userName.user1}</span>
        <UserNameText>{userEmail.eMail}</UserNameText>
      </UserText>
      <Info className={cx(Align, Between)}>
        <UserBrand className={cx(FlexCenter, Border16)}>
          <Icon {...iconPropsGenerator('brand')} />
          <div className={TextArea}>{brand.brand1}</div>
        </UserBrand>
        <UserSubTitle className={cx(FlexCenter, Border16)}>
          <Icon {...iconPropsGenerator('coffeebean')} />
          <div
            className={
              TextArea
            }>{`${TEXT.addedcaffeine} ${addedCoffee.cafein} ${TEXT.mgLabel}`}</div>
        </UserSubTitle>
      </Info>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 16px;
`;
const UserTitle = styled.span`
  width: 200px;
  margin: 22px 0px 2px 0px;
`;
const UserText = styled.div`
  margin-bottom: 16px;
  gap: 4px;
`;
const UserNameText = styled.span`
  color: #767676 !important;
  font-weight: 400;
`;
const Info = styled.div`
  gap: 8px;
  width: auto;
`;
const UserBrand = styled.span`
  padding: 5px 12px 5px 5px;
  background-color: var(--colors-main);
`;
const UserSubTitle = styled.span`
  padding: 5px 12px 5px 5px;
  background-color: var(--colors-sub);
`;

export default ProfileDetail;
