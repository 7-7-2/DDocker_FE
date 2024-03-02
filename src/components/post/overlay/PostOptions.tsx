import { Column } from '@/styles/layout';
import { ReactNode } from 'react';
import { styled } from 'styled-system/jsx';

export const PostOptions = ({ children }: { children: ReactNode }) => {
  return <Overlay className={Column}>{children}</Overlay>;
};

const Overlay = styled.div`
  border-radius: 16px 16px 0 0;
  width: 100%;
  padding: 28px 0 28px 20px;
  /* height: 10%; */
  background-color: white;
  bottom: 50px;
  left: 0;
  position: absolute;
  z-index: 999;
  gap: 24px;
`;
