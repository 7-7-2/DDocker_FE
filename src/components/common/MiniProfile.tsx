import Icon from '@/components/common/Icon';
import { TEXT } from '@/constants/texts';
import { SimplifyUser } from '@/types/types';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { Column, Flex, FlexCenter, Justify, LineH18 } from '@/styles/layout';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const MiniProfile: React.FC<SimplifyUser> = ({ NickName, caffeine }) => {
  return (
    <Container className={Flex}>
      <div className={FlexCenter}>
        <Icon {...iconPropsGenerator('mini-user', '44')} />
      </div>
      <div className={cx(Column, Justify)}>
        <UserTitle className={LineH18}>{NickName}</UserTitle>
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
  font-weight: 600;
`;
const UserCafein = styled.span`
  font-size: var(--font-sizes-xs);
`;

export default MiniProfile;
