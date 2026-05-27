import { useRecoilValue } from 'recoil';

import HeaderCloseIcon from '@/components/common/HeaderCloseIcon';
import HeaderActionIcon from '@/components/common/HeaderActionIcon';
import HeaderIcons from '@/components/common/HeaderIcons';
import HeaderBackIcon from '@/components/common/HeaderBackIcon';

import { useNavigateTo } from '@/hooks/useNavigateTo';
import {
  headerTextState,
  headerRightState,
  headerLeftState
} from '@/atoms/atoms';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Flex } from '@/styles/layout';
import { HeaderText } from '@/styles/styles';

const Header = () => {
  const navToHome = useNavigateTo('0');
  const left = useRecoilValue(headerLeftState);
  const text = useRecoilValue(headerTextState);
  const right = useRecoilValue(headerRightState);

  const logo = left === 'logo';
  const back = left === 'back';
  const icons = right === 'icons';
  const close = right === 'close';
  const action = right === 'action';

  return (
    <Container>
      <Left>
        {logo && (
          <nav onClick={navToHome}>
            <svg
              width={'80'}
              height={'15'}>
              <use href={`/sprite.svg#icon-ddocker`} />
            </svg>
          </nav>
        )}
        {back && <HeaderBackIcon />}
      </Left>
      <H2 className={cx(HeaderText)}>{text}</H2>
      <Right className={Flex}>
        {icons && <HeaderIcons />}
        {close && <HeaderCloseIcon />}
        {action && <HeaderActionIcon />}
      </Right>
    </Container>
  );
};

const Container = styled.header`
  height: 56px;
  padding: calc(env(safe-area-inset-top)) 20px 0;
  position: sticky;
  top: 0;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto 1fr;
  z-index: var(--z-index-header);
`;

const H2 = styled.h2`
  text-align: center;
`;

const Left = styled.div``;

const Right = styled.div`
  gap: 15px;
  justify-content: flex-end;
`;

export default Header;
