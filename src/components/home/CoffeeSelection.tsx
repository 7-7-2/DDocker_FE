import CoffeeOptionSelection from '@/components/common/CoffeeOptionSelection';
import CoffeeMenuSelection from '@/components/home/CoffeeMenuSelection';
import { styled } from 'styled-system/jsx';

const CoffeeSelection = () => {
  return (
    <Container>
      <span>카페인 함량조회</span>
      <CoffeeMenuSelection />
      <CoffeeOptionSelection />
    </Container>
  );
};

const Container = styled.div`
  color: #313131;
  font-size: var(--font-sizes-sm);
  line-height: 22px;
`;

export default CoffeeSelection;
