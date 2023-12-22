import Icon from '@/components/common/Icon';
import CoffeeOptionSelection from '@/components/common/CoffeeOptionSelection';
import CoffeeMenuSelection from '@/components/home/CoffeeMenuSelection';
import { CAFFEINE_FILTER_TEXTS } from '@/constants/home';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Between, Flex } from '@/styles/layout';
import { Medium, Semibold } from '@/styles/styles';

const { title } = CAFFEINE_FILTER_TEXTS;

const CoffeeSelection = () => {
  return (
    <Container>
      <Title className={cx(Semibold, Flex, Between)}>
        <span>{title.title}</span>
        <ResetBtn
          className={cx(Flex, Align, Medium)}
          onTouchEnd={() => {
            console.log('reset');
          }}>
          <Icon {...iconPropsGenerator('reset', '14')} />
          {title.resetBtn}
        </ResetBtn>
      </Title>
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
const Title = styled.span`
  font-size: var(--font-sizes-base);
  line-height: 26px;
`;
const ResetBtn = styled.button`
  font-size: var(--font-sizes-sm);
  gap: 5px;
`;
export default CoffeeSelection;
