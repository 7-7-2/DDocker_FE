import Icon from '@/components/common/Icon';
import { TEXT } from '@/constants/texts';
import { SimplifyUser } from '@/types/types';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { Column, Flex, FlexCenter, Justify } from '@/styles/layout';
import { ProfileInfo, ProfileTitle } from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const MiniProfile: React.FC<SimplifyUser> = ({ NickName, caffeine }) => {
  return (
    <Container className={Flex}>
      <div className={FlexCenter}>
        <Icon {...iconPropsGenerator('mini-user', '44')} />
      </div>
      <div className={cx(Column, Justify)}>
        <span className={ProfileTitle}>{NickName}</span>
        <span
          className={
            ProfileInfo
          }>{`${TEXT.addedcaffeine} ${caffeine} ${TEXT.mgLabel}`}</span>
      </div>
    </Container>
  );
};

const Container = styled.div`
  gap: 12px;
`;

export default MiniProfile;
