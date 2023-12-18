import { Flex } from '@/styles/layout';
import { styled } from 'styled-system/jsx';

const SumByType = ({ amount, unit }: { amount: number; unit: string }) => {
  return (
    <div className={Flex}>
      <Amount>{amount}</Amount>
      &nbsp;
      <Unit>{unit}</Unit>
    </div>
  );
};

const Amount = styled.div`
  font-size: var(--font-sizes-xl);
  font-weight: 700;
  color: var(--colors-main);
  line-height: 28px;
`;

const Unit = styled.div`
  font-size: var(--font-sizes-sm);
  font-weight: 500;
  line-height: 28px;
  transform: translateY(7%);
`;

export default SumByType;
