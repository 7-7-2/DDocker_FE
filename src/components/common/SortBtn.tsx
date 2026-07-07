import Icon from '@/components/common/Icon';

import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { styled } from 'styled-system/jsx';
import { Flex } from '@/styles/layout';
import { Medium } from '@/styles/styles';

const SortBtn = ({
  handleSortOption,
  isSelected
}: {
  handleSortOption: () => void;
  isSelected: string;
}) => {
  return (
    <Container
      className={Flex}
      onClick={handleSortOption}>
      <SortText className={Medium}>{isSelected}</SortText>
      <Icon {...iconPropsGenerator('sort', '20')} />
    </Container>
  );
};

const Container = styled.button`
  gap: 2px;
  justify-self: end;
  color: var(--colors-main-dark);
`;

const SortText = styled.span`
  font-size: var(--font-sizes-sm);
  line-height: 22px;
`;

export default SortBtn;
