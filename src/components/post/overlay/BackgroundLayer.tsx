import { DVW } from '@/styles/layout';
import { styled } from 'styled-system/jsx';
export const BackgroundLayer = ({
  children,
  onClick
}: {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}) => {
  return (
    <>
      <Background
        onClick={onClick}
        className={DVW}
      />
      {children}
    </>
  );
};

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-index-background-layer);
  height: 100dvh;
  background-color: #000000;
  opacity: 60%;
`;
