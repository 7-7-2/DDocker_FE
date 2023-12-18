import Button from '@/components/common/Button';
import CaffeineInfo from '@/components/common/CaffeineInfo';
import CoffeeSelection from '@/components/home/CoffeeSelection';
import { BUTTON_TEXTS } from '@/constants/common';
import { RegistBtn } from '@/styles/styles';
import { styled } from 'styled-system/jsx';

const CaffeineFilter = () => {
  return (
    <Container>
      <CoffeeSelection />
      <CaffeineInfo />
      <Button
        text={BUTTON_TEXTS.regist}
        onTouchEnd={() => {
          console.log('hi');
        }}
        className={RegistBtn}
      />
    </Container>
  );
};

export default CaffeineFilter;

const Container = styled.div`
  margin: 32px 0 32px;
`;
