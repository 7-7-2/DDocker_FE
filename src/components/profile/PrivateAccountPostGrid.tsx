import Icon from '@/components/common/Icon';

import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { PROFILE_TEXTS } from '@/constants/profile';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Regular } from '@/styles/styles';
import { Center, Column, Flex } from '@/styles/layout';

const { user } = PROFILE_TEXTS;
const PrivateAccountPostGrid = () => {
  return (
    <Container className={cx(Center, Flex)}>
      <div className={cx(Center, Column)}>
        <IconContainer className={cx(Center, Flex)}>
          <Icon {...iconPropsGenerator('lock', '34')} />
        </IconContainer>
        <Description className={Regular}>{user.another.private}</Description>
      </div>
    </Container>
  );
};

const Container = styled.div`
  gap: 16px;
  flex-grow: 1;
  margin-bottom: 10px;
`;
const IconContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 16px;
  background-color: var(--colors-tertiary);
`;
const Description = styled.span`
  white-space: pre-wrap;
  text-align: center;
  font-size: var(--font-sizes-sm);
  line-height: 22px;
  color: var(--colors-mid-grey);
`;

export default PrivateAccountPostGrid;
