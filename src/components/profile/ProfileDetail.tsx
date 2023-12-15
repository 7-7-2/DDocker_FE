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
import { Between, Column, Flex, FlexCenter } from '@/styles/layout';
import {
  TextBlack,
  TextGray,
  Border16,
  Bold,
  Regular,
  TextArea
} from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const ProfileDetail = () => {
  return (
    <Container className={cx(Column, FlexCenter)}>
      <UserTitle className={cx(FlexCenter, TextBlack, Bold)}>
        {userNickName.loginName}
      </UserTitle>
      <UserText className={cx(FlexCenter, Regular)}>
        <span className={TextBlack}>{userName.user1}</span>
        <span className={TextGray}>{userEmail.eMail}</span>
      </UserText>
      <Info className={cx(FlexCenter, Between)}>
        <UserBrand className={cx(Flex, Border16)}>
          <Icon {...iconPropsGenerator('brand')} />
          <div className={TextArea}>{brand.brand1}</div>
        </UserBrand>
        <UserSubTitle className={cx(Flex, Border16)}>
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
  font-size: var(--font-sizes-xxl);
  margin: 22px 0px 2px 0px;
`;
const UserText = styled.div`
  font-size: var(--font-sizes-sm);
  margin-bottom: 16px;
  gap: 4px;
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
