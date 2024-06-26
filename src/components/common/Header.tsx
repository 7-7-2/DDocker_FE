import { useRecoilValue } from 'recoil';
import {
  headerTextState,
  headerLogoState,
  headerIconsState
} from '@/atoms/atoms';
import HeaderCloseIcon from '@/components/common/HeaderCloseIcon';
import HeaderIcons from '@/components/common/HeaderIcons';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import { Between, Flex, Align } from '@/styles/layout';
import { HeaderText, PaddingL63, PaddingL24 } from '@/styles/styles';

const Header = () => {
  const logo = useRecoilValue(headerLogoState);
  const text = useRecoilValue(headerTextState);
  const icon = useRecoilValue(headerIconsState);

  const icons = icon === 'icons';
  const close = icon === 'close';

  return (
    <Container className={cx(Between, Align)}>
      <Left onClick={useNavigateTo('/')}>
        {logo && (
          <svg
            width={'80'}
            height={'15'}>
            <use href={`/sprite.svg#icon-ddocker`} />
          </svg>
        )}
      </Left>
      <h2
        className={cx(
          icons ? PaddingL63 : close ? PaddingL24 : '',
          HeaderText
        )}>
        {text}
      </h2>
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
`;

const Nav = styled.nav`
  display: inline-block;
`;

const Left = styled(Nav)``;

const Right = styled.span`
  gap: 15px;
`;

export default Header;
