import Icon from '@/components/common/Icon';
import CoffeeMenuSelection from '@/components/common/coffeeSelection/CoffeeMenuSelection';
import CoffeeOptionSelection from '@/components/common/coffeeSelection/CoffeeOptionSelection';
import { CAFFEINE_FILTER_TEXTS } from '@/constants/home';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { useResetSelectedCoffee } from '@/hooks/useResetSelectedCoffee';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Between } from '@/styles/layout';
import { SmStyle, SumBoardTitle, SumTitle } from '@/styles/styles';

const { title } = CAFFEINE_FILTER_TEXTS;

const CoffeeSelection = () => {
  const touchResetBtn = useResetSelectedCoffee();

  return (
    <div className={SmStyle}>
      <Title className={cx(SumTitle, Between, Align)}>
        <span>{title.title}</span>
        <ResetBtn
          className={cx(Align, SumBoardTitle)}
          onClick={touchResetBtn}>
          <Icon {...iconPropsGenerator('reset', '14')} />
          {title.resetBtn}
        </ResetBtn>
      </Title>
      <CoffeeMenuSelection />
      <CoffeeOptionSelection />
    </div>
  );
};

const ResetBtn = styled.button`
  gap: 5px;
`;
const Title = styled.div`
  margin-bottom: 12px;
`;

export default CoffeeSelection;
