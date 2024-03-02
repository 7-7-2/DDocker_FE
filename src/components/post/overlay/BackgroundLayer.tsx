import { styled } from 'styled-system/jsx';
export const BackgroundLayer = ({
  children,
  onTouchEnd
}: {
  children: React.ReactNode;
  onTouchEnd: () => void;
}) => {
  return (
    <>
      <Background onTouchEnd={onTouchEnd} />
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
  height: calc(100% - 50px);
  background-color: rgba(0, 0, 0, 0.55);
`;
