import { coffeeInfoFormatter } from '@/utils/coffeeInfoFormatter';
import { CaffeineIntakeTypes } from '@/types/types';
import { COFFEE_HISTORY_TEXTS } from '@/constants/coffee';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Between, Column, Flex, FlexGrow } from '@/styles/layout';
import { Gap12, Semibold } from '@/styles/styles';

const { pre, suf } = COFFEE_HISTORY_TEXTS;
const DailyRecordsItem = ({ recodes }: { recodes: CaffeineIntakeTypes }) => {
  return (
    <DailyRecordItem className={cx(Flex, Between, Gap12)}>
      <Logo
        src={`/png/${recodes.brand}.png`}
        alt={recodes.brand}
      />
      <div className={cx(Column, FlexGrow)}>
        <span className={Semibold}>{recodes.productName}</span>
        <CoffeeOption>
          ({coffeeInfoFormatter(recodes).coffeeInfo[2]})
        </CoffeeOption>
      </div>
      <span className={cx(Semibold, Align)}>
        {pre}
        {recodes.caffeine}
        {suf}
      </span>
    </DailyRecordItem>
  );
};
const DailyRecordItem = styled.div`
  height: 56px;
  width: 100%;
  max-width: 500px;
  flex: 0 0 100%;
  padding: 8px 0;
  scroll-snap-align: start;
  font-size: var(--font-sizes-base);
  color: var(--colors-main-dark);
`;

const Logo = styled.img`
  width: 40px;
`;
const CoffeeOption = styled.span`
  font-size: var(--font-sizes-sm);
  color: var(--colors-mid-grey);
`;

export default DailyRecordsItem;
