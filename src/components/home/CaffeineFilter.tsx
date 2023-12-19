import Button from '@/components/common/Button';
import CaffeineInfo from '@/components/home/CaffeineInfo';
import CoffeeSelection from '@/components/home/CoffeeSelection';
import { BUTTON_TEXTS } from '@/constants/common';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { RegistBtn } from '@/styles/styles';
import { styled } from 'styled-system/jsx';

const CaffeineFilter = () => {
  return (
    <Container>
      <CoffeeSelection />
      <CaffeineInfo />
      <Button
        text={BUTTON_TEXTS.regist}
        onTouchEnd={useNavigateTo('/post/register')}
        className={RegistBtn}
      />
    </Container>
  );
};

export default CaffeineFilter;

const Container = styled.div`
  margin: 32px 0 32px;
`;
