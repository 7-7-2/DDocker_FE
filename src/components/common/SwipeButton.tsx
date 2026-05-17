import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { styled } from 'styled-system/jsx';
import { FlexCenter } from '@/styles/layout';

const SwipeButton = ({ handleOnClick }: { handleOnClick: () => void }) => {
  return (
    <Container
      className={FlexCenter}
      onClick={handleOnClick}>
      <Icon {...iconPropsGenerator('delete-comment')} />
    </Container>
  );
};

const Container = styled.button`
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  margin-left: 21px;
  scroll-snap-align: end;
  scroll-snap-stop: always;
  background-color: var(--colors-delete-red);
`;

export default SwipeButton;
