import Icon from '@/components/common/Icon';
import { TEXT } from '@/constants/texts';
import { SimplifyUser } from '@/types/types';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { Column, Flex, FlexCenter, Justify } from '@/styles/layout';
import { LineH18, Semibold } from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const MiniProfile: React.FC<SimplifyUser> = ({ NickName, caffeine }) => {
  return (
    <Container className={Flex}>
      <div className={FlexCenter}>
        <Icon {...iconPropsGenerator('mini-user', '44')} />
      </div>
      <div className={cx(Column, Justify)}>
        <UserTitle className={cx(LineH18, Semibold)}>{NickName}</UserTitle>
        <UserCafein
          className={cx(
            Flex,
            LineH18
          )}>{`${TEXT.addedcaffeine} ${caffeine} ${TEXT.mgLabel}`}</UserCafein>
      </div>
    </Container>
  );
};

const Container = styled.div`
  gap: 12px;
`;
const UserTitle = styled.span`
  font-size: var(--font-sizes-sm);
`;
const UserCafein = styled.span`
  font-size: var(--font-sizes-xs);
`;

export default MiniProfile;
