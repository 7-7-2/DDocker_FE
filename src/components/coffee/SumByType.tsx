import { Flex } from '@/styles/layout';
import { SumTypeAmount, SumTypeUnit, Blur } from '@/styles/styles';
import { cx, css } from 'styled-system/css';

const SumByType = ({
  amount,
  unit,
  blur
}: {
  amount: number;
  unit: string;
  blur: boolean;
}) => {
  return (
    <div className={blur ? cx(Flex, Blur) : Flex}>
      <div className={blur ? cx(SumTypeAmount, Grey) : SumTypeAmount}>
        {amount}
      </div>
      &nbsp;
      <div className={SumTypeUnit}>{unit}</div>
    </div>
  );
};

const Grey = css`
  color: #b8b8b8 !important;
`;

export default SumByType;
