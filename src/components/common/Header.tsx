import { lazy, Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-system/jsx';
import { cx, css } from 'styled-system/css';
import {
  headerTextState,
  headerLogoState,
  headerIconsState
} from '@/atoms/atoms';
import { Between, Flex, Align } from '@/styles/layout';

const HeaderIcons = lazy(() => import('./HeaderIcons'));
const HeaderCloseIcon = lazy(() => import('./HeaderCloseIcon'));

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
        <Suspense>
          {icons && <HeaderIcons />}
          {close && <HeaderCloseIcon />}
        </Suspense>
      </Right>
    </Container>
  );
};

const Container = styled.header`
  position: sticky;
  top: 0;
  margin: 0 20px;
  height: 46px;
  /* background-color: #fff; */
  z-index: 99;
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
