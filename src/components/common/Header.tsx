import { styled } from 'styled-system/jsx';
import { Between, Flex, Align } from '@/styles/layout';
import { cx } from 'styled-system/css';
import { HeaderType } from '@/types/types';

const Header = ({ logo, text, icons }: HeaderType) => {
  return (
    <Container className={cx(Flex, Between, Align)}>
      <Left>{logo}</Left>
      <Center>{text}</Center>
      <Right className={Flex}>{icons}</Right>
    </Container>
  );
};

const Container = styled.header`
  position: sticky;
  top: 0;
  margin: 0 20px;
  height: 46px;
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

export default Header;
