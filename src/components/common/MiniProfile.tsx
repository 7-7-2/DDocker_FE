import Icon from '@/components/common/Icon';
import { UserProfile } from '@/types/types';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { Flex, FlexCenter, Justify } from '@/styles/layout';
import { styled } from 'styled-system/jsx';

const MiniProfile: React.FC<UserProfile> = ({ loginName, cafein }) => {
  return (
    <Container className={Flex}>
      <User className={FlexCenter}>
        <Icon {...iconPropsGenerator('mini-user', '44')} />
      </User>
      <OtherUserInfo className={Justify}>
        <UserTitle>{loginName}</UserTitle>
        <UserCafein className={Flex}>누적 카페인 {cafein}mg</UserCafein>
      </OtherUserInfo>
    </Container>
  );
};

export default MiniProfile;

const Container = styled.div`
  flex-direction: row;
  gap: 6px;
`;
const User = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 9999px;
`;
const OtherUserInfo = styled.div`
  flex-direction: column;
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
