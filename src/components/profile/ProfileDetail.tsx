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
import {
  Between,
  Column,
  Flex,
  FlexCenter,
  TextBlack,
  TextGray,
  Border16
} from '@/styles/layout';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const ProfileDetail = () => {
  return (
    <Container className={cx(Column, FlexCenter)}>
      <UserTitle className={cx(FlexCenter, TextBlack)}>
        {userNickName.loginName}
      </UserTitle>
      <UserText className={FlexCenter}>
        <span className={TextBlack}>{userName.user1}</span>
        <span className={TextGray}>{userEmail.eMail}</span>
      </UserText>
      <Info className={cx(FlexCenter, Between)}>
        <UserBrand className={cx(Flex, Border16)}>
          <Icon {...iconPropsGenerator('brand')} />
          <TextArea>{brand.brand1}</TextArea>
        </UserBrand>
        <UserSubTitle className={cx(Flex, Border16)}>
          <Icon {...iconPropsGenerator('coffeebean')} />
          <TextArea>{`${TEXT.addedcaffeine} ${addedCoffee.cafein} ${TEXT.mgLabel}`}</TextArea>
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
  font-weight: 700;
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
const TextArea = styled.div`
  margin: 3px 0px 3px 0px;
  color: #fff;
  font-size: var(--font-sizes-xs);
  font-weight: 500;
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
