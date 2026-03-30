import React from 'react';
import FooterIcon from '@/components/common/FooterIcon';

import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import { Flex, Between } from '@/styles/layout';

const icons = ['home', 'feed', 'register', 'stats', 'my'];

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
  background-color: #fff;
  padding: 8px 21px calc(14px + env(safe-area-inset-bottom));
  position: relative;
  &::before {
    content: '';
    top: 1px;
    right: 0;
    border-top: 1px solid #edecec;
    position: absolute;
    bottom: calc(63px + env(safe-area-inset-bottom));
    width: 50%;
  }
  &::after {
    content: '';
    border-top: 1px solid #edecec;
    position: absolute;
    top: 1px;
    left: 0;
    bottom: calc(63px + env(safe-area-inset-bottom));
    width: 50%;
  }
`;

export default Footer;
