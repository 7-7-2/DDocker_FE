import { useRecoilValue } from 'recoil';

import HeaderCloseIcon from '@/components/common/HeaderCloseIcon';
import HeaderIcons from '@/components/common/HeaderIcons';
import {
  headerTextState,
  headerLogoState,
  headerIconsState
} from '@/atoms/atoms';
import { styled } from 'styled-system/jsx';
import { cx, css } from 'styled-system/css';
import { Between, Flex, Align } from '@/styles/layout';

const Header = () => {
  const logo = useRecoilValue(headerLogoState);
  const text = useRecoilValue(headerTextState);
  const icon = useRecoilValue(headerIconsState);

  const icons = icon === 'icons';
  const close = icon === 'close';

  return (
    <Container className={cx(Flex, Between, Align)}>
      <Left>
        {logo && (
          <svg
            width={'80'}
            height={'15'}>
            <use href={`/sprite.svg#icon-ddocker`} />
          </svg>
        )}
      </Left>
      <Center className={icons ? IconsSpace : close ? CloseSpace : ''}>
        {text}
      </Center>
      <Right className={Flex}>
        {icons && <HeaderIcons />}
        {close && <HeaderCloseIcon />}
      </Right>
    </Container>
  );
};

const Container = styled.header`
  position: sticky;
  top: 0;
  padding: calc(env(safe-area-inset-top)) 20px 0;
  height: 46px;
  background-color: #fff;
  z-index: 99;
  box-shadow: -1px 1px 2px 0px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  display: inline-block;
`;

const Left = styled(Nav)``;

const Center = styled.h2`
  font-size: var(--font-sizes-lg);
  font-weight: 500;
`;

const Right = styled.span`
  gap: 15px;
`;

const IconsSpace = css`
  padding-left: 63px;
`;
const CloseSpace = css`
  padding-left: 24px;
`;

export default Header;
