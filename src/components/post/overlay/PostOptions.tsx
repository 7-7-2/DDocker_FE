import { Column, DVW } from '@/styles/layout';
import { ReactNode } from 'react';
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

export const PostOptions = ({ children }: { children: ReactNode }) => {
  return <Container className={cx(Column)}>{children}</Container>;
};

const Container = styled.div`
  border-radius: 16px 16px 0 0;
  padding: 30px 0 30px 20px;
  background-color: white;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  z-index: var(--z-index-modal);
  gap: 32px;
`;
