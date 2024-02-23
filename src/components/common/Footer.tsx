import React from 'react';
import FooterIcon from '@/components/common/FooterIcon';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import { Flex, Between } from '@/styles/layout';

const icons = ['home', 'feed', 'coffee', 'my'];

// LOGIC += if(INPUT FOCUS){DISPLAY NONE}
const Footer = () => {
  return (
    <Container className={cx(Flex, Between)}>
      {icons.map(item => (
        <React.Fragment key={item}>
          <FooterIcon icon={item} />
        </React.Fragment>
      ))}
    </Container>
  );
};

const Container = styled.footer`
  margin: 0 20px calc(env(safe-area-inset-bottom));
  padding: 8px 9px 0;
  &::before {
    content: '';
    right: 0;
    border-top: 1px solid #edecec;
    position: absolute;
    bottom: calc(47px + env(safe-area-inset-bottom));
    width: 50%;
  }
  &::after {
    content: '';
    border-top: 1px solid #edecec;
    position: absolute;
    left: 0;
    bottom: calc(47px + env(safe-area-inset-bottom));
    width: 50%;
  }
`;

export default Footer;
