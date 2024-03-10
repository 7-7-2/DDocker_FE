import Icon from '@/components/common/Icon';
import { useRecoilValue } from 'recoil';
import ProfileImg from '@/components/profile/ProfileImg';
import { TEXT } from '@/constants/texts';
import { userInfoState } from '@/atoms/atoms';
import useGetUserInfo from '@/hooks/useGetUserInfo';
import convertBrandName from '@/utils/convertBrandName';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Between, Column, FlexCenter, Center, Align } from '@/styles/layout';
import { Border16, PrfileTitle, SmStyle, TextArea } from '@/styles/styles';

const ProfileDetail = ({ userId }: { userId: string | undefined }) => {
  const user = useRecoilValue(userInfoState);
  useGetUserInfo(userId);

  return (
    <Container className={cx(Column, Center)}>
      <ProfileImg imageUrl={user?.profileUrl} />
      <UserTitle className={cx(FlexCenter, PrfileTitle)}>
        {user.nickname}
      </UserTitle>
      <UserText className={cx(FlexCenter, SmStyle)}>
        {/* 상태메세지 Input 수정 후 추가 예정 */}
        {/* <span>{user.nickname}</span>
        <UserNameText>{user.nickname}</UserNameText> */}
      </UserText>
      <Info className={cx(Align, Between)}>
        <UserBrand className={cx(FlexCenter, Border16)}>
          <Icon {...iconPropsGenerator('brand')} />
          <div className={TextArea}>
            {user.brand && convertBrandName(user.brand)}
          </div>
        </UserBrand>
        <UserSubTitle className={cx(FlexCenter, Border16)}>
          <Icon {...iconPropsGenerator('coffeebean')} />
          <div
            className={
              TextArea
            }>{`${TEXT.addedcaffeine} ${user.sum} ${TEXT.mgLabel}`}</div>
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
