import Icon from '@/components/common/Icon';

import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { styled } from 'styled-system/jsx';
import { Flex } from '@/styles/layout';
import { Medium } from '@/styles/styles';
import { SEARCH_TEXTS } from '@/constants/search';

const SortBtn = ({
  btnState,
  handleOnClick
}: {
  btnState: boolean;
  handleOnClick: () => void;
}) => {
  return (
    <Container
      className={Flex}
      onClick={handleOnClick}>
      <SortText className={Medium}>
        {!btnState ? SEARCH_TEXTS.sortOption[0] : SEARCH_TEXTS.sortOption[1]}
      </SortText>
      <Icon {...iconPropsGenerator('sort', '20')} />
    </Container>
  );
};

const Container = styled.button`
  gap: 2px;
  justify-self: end;
`;

const SortText = styled.span`
  font-size: var(--font-sizes-sm);
  line-height: 20px;
  color: var(--colors-main-dark);
`;

export default SortBtn;
