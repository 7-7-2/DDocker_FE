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
      <Background onClick={onClick} />
      {children}
    </>
  );
};

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: calc(100%);
  background-color: rgba(0, 0, 0, 0.55);
`;
