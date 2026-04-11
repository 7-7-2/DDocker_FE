import { useRecoilValue } from 'recoil';
import {
  headerTextState,
  headerRightState,
  headerLeftState
} from '@/atoms/atoms';
import HeaderCloseIcon from '@/components/common/HeaderCloseIcon';
import HeaderIcons from '@/components/common/HeaderIcons';
import Icon from '@/components/common/Icon';

import { useNavigateTo } from '@/hooks/useNavigateTo';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Flex } from '@/styles/layout';
import { HeaderText } from '@/styles/styles';

const Header = () => {
  const left = useRecoilValue(headerLeftState);
  const text = useRecoilValue(headerTextState);
  const right = useRecoilValue(headerRightState);

  const logo = left === 'logo';
  const back = left === 'back';
  const icons = right === 'icons';
  const close = right === 'close';

  return (
    <Container>
      <Left onClick={logo ? useNavigateTo('/') : useNavigateTo('-1')}>
        {logo && (
          <svg
            width={'80'}
            height={'15'}>
            <use href={`/sprite.svg#icon-ddocker`} />
          </svg>
        )}
        {back && <Icon {...iconPropsGenerator('back')} />}
      </Left>
      <H2 className={cx(HeaderText)}>{text}</H2>
      <Right className={Flex}>
        {icons && <HeaderIcons />}
        {close && <HeaderCloseIcon />}
      </Right>
    </Container>
  );
};

const Container = styled.header`
  height: 56px;
  padding: calc(env(safe-area-inset-top)) 20px 0;
  position: sticky;
  top: 0;
  background-color: #fff;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto 1fr;
  z-index: 99;
`;

const H2 = styled.h2`
  text-align: center;
`;

const Left = styled.nav``;

const Right = styled.span`
  gap: 15px;
  justify-content: flex-end;
`;

export default Header;
