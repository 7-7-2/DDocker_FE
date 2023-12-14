import React from 'react';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import FooterIcon from '@/components/common/FooterIcon';
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
  margin: 0 20px;
`;

export default Footer;
