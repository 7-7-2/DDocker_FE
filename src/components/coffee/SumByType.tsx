import { Flex } from '@/styles/layout';
import { SumTypeAmount, SumTypeUnit } from '@/styles/styles';

const SumByType = ({ amount, unit }: { amount: number; unit: string }) => {
  return (
    <div className={Flex}>
      <div className={SumTypeAmount}>{amount}</div>
      &nbsp;
      <div className={SumTypeUnit}>{unit}</div>
    </div>
  );
};

export default SumByType;
